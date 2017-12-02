import React from "react"
import {Map} from "../../../src/index.jsx"
import ComponentContainer from "../CompContainer/ComponentContainer.jsx"
import colors from "../../colors"
import SAUDI_ARABIA from "../sampleMaps/SaudiArabia.js"

class MapExampleSaudiArabia extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      optionList: [
        {
          optionName: "data",
          optionType: "data",
          keyList:["area","code"],
          weightKey:"population",
          initialValue: [
            {code: "SA-01", population: 8276700, area: "Ar Riyāḑ"},
            {code: "SA-02", population: 8479400, area: "Makkah"},
            {code: "SA-03", population: 2154100, area: "Al Madīnah"},
            {code: "SA-04", population: 4977500, area: "Ash Sharqīyah"},
            {code: "SA-05", population: 1464800, area: "Al Qaşīm"},
            {code: "SA-06", population: 715400, area: "Ḩā'il"},
            {code: "SA-07", population: 946300, area: "Tabūk"},
            {code: "SA-08", population: 383100, area: "Al Ḩudūd ash Shamālīyah"},
            {code: "SA-09", population: 1636600, area: "Jīzān"},
            {code: "SA-10", population: 607100, area: "Najrān"},
            {code: "SA-11", population: 491900, area: "Al Bāḩah"},
            {code: "SA-12", population: 528400, area: "Al Jawf"},
            {code: "SA-14", population: 2288500, area: "'Asir"},
          ]},
          // {optionName: "width", prefecture: "Width", optionType: "field", input: "string", initialValue: "98%"},
          // {optionName: "width", prefecture: "Width", optionType: "field", input: "number", initialValue: 450},
      ]
    }
  }

  render() {
    let style = {
      title: {
        fontSize: "45px",
        color: colors[this.props.palette].body.text,
        padding: 15,
      },
      container: {
        padding: "80px 0px",
      },
    }
    return(
      <div className="container" style={style.container}>
        <h1 style={style.title}>Populations in Saudi Arabia</h1>
        <br />
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <Map data={this.state.optionList[0].initialValue}
            paths={SAUDI_ARABIA.svg.g.path} weightKey="population" IDKey="code"
            colorRange={["#225588", "#ffffff"]}/>
        </ComponentContainer>
      </div>
    )
  }
}

export default MapExampleSaudiArabia
