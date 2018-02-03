import React from "react"
import {SectionContainer} from "replot-helpers"
import MapExampleWorld from "./MapExampleWorld.jsx"
import MapExampleUSA from "./MapExampleUSA.jsx"
import MapExampleIndia from "./MapExampleIndia.jsx"
import MapExampleJapan from "./MapExampleJapan.jsx"
import MapExampleSaudiArabia from "./MapExampleSaudiArabia.jsx"

class ExamplesSection extends React.Component {

  render() {
    return(
      <SectionContainer>
        <MapExampleWorld palette={this.props.palette} />
        <MapExampleUSA palette={this.props.palette} />
        <MapExampleIndia palette={this.props.palette} />
        <MapExampleJapan palette={this.props.palette} />
        <MapExampleSaudiArabia palette={this.props.palette} />
      </SectionContainer>
    )
  }

}

export default ExamplesSection
