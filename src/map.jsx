import React from "react"
import Mapping from "./mapping.jsx"
import Coloring from "./coloring.jsx"

class Map extends React.Component {

  constructor(props){
      super(props)
      // enhcance this part to support more than one country
      this.state = {
          countryName : this.props.data[0][this.props.countryKey],
          }
      }

  extractValues() {
    // extrac the values and keys to create colors
    let data = []
    for (let index in this.props.data){
      data.push({
      area: this.props.data[index][this.props.areaKey],
      value: this.props.data[index][this.props.valueKey]
        })
      }
    return data
  }

  render() {

    // call this function only in case of colorLinear
    let data =  this.extractValues()

    // call this function to get colors
    let colors = new Coloring(data, this.props.valueKey, this.props.colorKey, this.props.colorLinear, this.props.colorCatgories)
    colors = colors.generate()

    let map = new Mapping(colors)
    let curMap = map.getMap(this.state.countryName)
 
    return(
        <div>
          {curMap}
        </div>
      )
  }
}

Map.defaultProps = {
  countryKey: "country",
  areaKey: "",
  valueKey:"",
  colorKey: "",
  colorLinear: [],
  colorCatgories: ""
  // initialAnimation: true,
}

export default Map
