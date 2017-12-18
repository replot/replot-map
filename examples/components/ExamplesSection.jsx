import React from "react"
import SectionContainer from "./SectionContainer.jsx"
import MapExampleWorld from "./examples/MapExampleWorld.jsx"
import MapExampleUSA from "./examples/MapExampleUSA.jsx"
import MapExampleIndia from "./examples/MapExampleIndia.jsx"
import MapExampleJapan from "./examples/MapExampleJapan.jsx"
import MapExampleSaudiArabia from "./examples/MapExampleSaudiArabia.jsx"

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
