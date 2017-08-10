import React from "react"
import getMap from "./mapping.jsx"

class Map extends React.Component {

  extractValues() {
    // extrac the values and keys to create colors
    let data = []
    for (let i = 0; i < this.props.data.length; i ++){
      data.push({
        area: this.props.data[i][this.props.IDKey],
        weight: this.props.data[i][this.props.weightKey]
      })
    }
    return data
  }

  render() {

    let region = this.props.data[0][this.props.titleKey]

    // call this function only in case of colorRange
    let data =  this.extractValues()

    let map = getMap(region, data, this.props.IDKey, this.props.weightKey, this.props.scale,
      this.props.colorKey, this.props.colorRange, this.props.colorCatgories, this.props.width)

    return(
        <div>
          {map}
        </div>
      )
  }
}

Map.defaultProps = {
  titleKey: "region",
  IDKey: "",
  weightKey:"",
  colorKey: "",
  colorRange: [],
  colorCatgories: "",
  scale: "lin"
  // initialAnimation: true,
}

export default Map
