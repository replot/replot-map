import React from "react"
import PropTypes from "prop-types"
import {Resize, Tooltip} from "replot-core"
import Region from "./Region.jsx"

class Map extends React.Component {

  constructor(){
    super()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null
    }
  }

  activateTooltip(data, title) {
    let newContents = "No data supplied"
    if (data) {
      if (this.props.tooltipContents){
        newContents = this.props.tooltipContents(title, data)
      }
      else {
        newContents = (
          <div>
            <span>Location: {title}</span><br/>
            <span>{this.props.weightKey}: {data[this.props.weightKey]}</span>
          </div>
        )
      }
    }
    this.setState({
      tooltipContents: newContents,
      mouseOver: true,
    })
  }

  deactivateTooltip() {
    this.setState({
      mouseOver: false
    })
  }

  updateMousePos(e) {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - 10
    })
  }

  extractValues() {
    // extrac the values and keys to create colors
    let data = []
    for (let i = 0; i < this.props.data.length; i ++){
      data.push({
        area: this.props.data[i][this.props.IDKey],
        weight: this.props.data[i][this.props.weightKey],
        raw: this.props.data[i]
      })
    }
    return data
  }

  render() {
    // call this function only in case of colorRange
    let data =  this.extractValues()

    let map = <Region
      paths={this.props.paths} width={this.props.width}
      zoomIDKey={this.props.zoomID} zoomScale={this.props.zoomScale}
      pathIDKey={this.props.pathIDKey} pathTitleKey={this.props.pathTitleKey}
      data={data} IDKey={this.props.IDKey} weightKey={this.props.weightKey}
      scale={this.props.scale} colorKey={this.props.colorKey}
      colorRange={[this.props.colorRangeHigh, this.props.colorRangeLow]}
      colorCatgories={this.props.colorCatgories}
      activateTooltip={this.activateTooltip.bind(this)}
      deactivateTooltip={this.deactivateTooltip.bind(this)}
      />

    return(
        <div onMouseMove={this.props.tooltip ? this.updateMousePos.bind(this) : null}>
          {this.props.tooltip &&
            <Tooltip
              x={this.state.mouseX} y={this.state.mouseY}
              active={this.state.mouseOver}
              contents={this.state.tooltipContents}
              colorScheme={this.props.tooltipColor}
            />
          }
          {map}
        </div>
      )
  }
}

class MapResponsive extends React.Component {

  render() {

    return (
      <Resize width={this.props.width}>
        <Map {...this.props} />
      </Resize>
    )
  }
}

MapResponsive.defaultProps = {
  width: 800
}

Map.defaultProps = {
  IDKey: "ID",
  weightKey: "weight",
  pathIDKey: "id",
  pathTitleKey: "title",
  colorRangeLow: "#ffffff",
  colorRangeHigh: "#225588",
  scale: "lin",
  width: 800,
  tooltip: true
  // initialAnimation: true,
}

Map.propTypes = {
  data: PropTypes.array.isRequired,
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
  IDKey: PropTypes.string,
  weightKey: PropTypes.string,
  pathIDKey: PropTypes.string,
  pathTitleKey: PropTypes.string,
  colorKey: PropTypes.string,
  colorRangeLow: PropTypes.string,
  colorRangeHigh: PropTypes.string,
  colorCatgories: PropTypes.string,
  scale: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  zoomID: PropTypes.string,
  zoomScale: PropTypes.number,
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func
}

export default MapResponsive
