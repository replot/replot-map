import React from "react"
import getMap from "./mapping.jsx"
import {Tooltip} from "replot-core"

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

  activateTooltip(data) {
    let newContents = "No data supplied"
    if (data) {
      if (this.props.tooltipContents){
        newContents = this.props.tooltipContents(data)
      }
      else {
        newContents = (
          <div>
            <span>{this.props.IDKey}: {data[this.props.IDKey]}</span><br/>
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
    console.log(data)
    return data
  }

  render() {

    let region = this.props.region

    // call this function only in case of colorRange
    let data =  this.extractValues()

    let map = getMap(region, data, this.props.IDKey, this.props.weightKey, this.props.scale,
      this.props.colorKey, this.props.colorRange, this.props.colorCatgories, this.props.width,
      this.activateTooltip.bind(this), this.deactivateTooltip.bind(this))

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

Map.defaultProps = {
  region: "World",
  IDKey: "ID",
  weightKey: "weight",
  colorKey: "",
  colorRange: ["#000000", "#e8e8e8"],
  colorCatgories: "",
  scale: "lin",
  tooltip: true
  // initialAnimation: true,
}

export default Map
