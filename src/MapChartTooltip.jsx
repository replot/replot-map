import React from "react"
import PropTypes from "prop-types"
import {Resize, Tooltip} from "replot-core"
import MapChart from "./MapChart.jsx"

class MapChartTooltip extends React.PureComponent {

  constructor(){
    super()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null
    }
    this.updateMousePos = this.updateMousePos.bind(this)
    this.activateTooltip = this.activateTooltip.bind(this)
    this.deactivateTooltip = this.deactivateTooltip.bind(this)
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

  render() {
    return(
      <div onMouseMove={this.props.tooltip ? this.updateMousePos : null}>
        <MapChart
          {...this.props}
          activateTooltip={this.activateTooltip}
          deactivateTooltip={this.deactivateTooltip}
        />
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
      </div>
    )
  }
}

MapChartTooltip.defaultProps = {
  tooltip: true
}

MapChartTooltip.propTypes = {
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func,
}


class MapChartResponsive extends React.Component {

  render() {
    return (
      <Resize width={this.props.width}>
        <MapChartTooltip {...this.props} />
      </Resize>
    )
  }
}

MapChartResponsive.defaultProps = {
  width: 800
}


export default MapChartResponsive
