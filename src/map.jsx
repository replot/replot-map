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

    // call this function only in case of colorLinear
    let data =  this.extractValues()

    // call this function to get colors
    // let colors = new Coloring(data, this.props.valueKey, this.props.colorKey, this.props.colorLinear, this.props.colorCatgories)
    // colors = colors.generate()

    let map = getMap(region, data, this.props.IDKey, this.props.weightKey, this.props.scale,
      this.props.colorKey, this.props.colorLinear, this.props.colorCatgories)

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
  colorLinear: [],
  colorCatgories: "",
  scale: "lin"
  // initialAnimation: true,
}

export default Map
