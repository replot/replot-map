import React from "react"
import US from "./countries/US.jsx"
import Chile from "./countries/Chile.jsx"

class Mapping {
  constructor(colors){
    this.colors = colors
  }

  getMap(country){
    console.log(this.colors)
    let mapping = { "US": <US colors={this.colors}/>, "Chile": <Chile colors={this.colors} /> }
    let curMap = mapping[country]

    return curMap
  }
}

// export const mapping = { "US": <US colors={this.colors}/>, "Chile": <Chile colors={this.colors} /> }

export default Mapping
