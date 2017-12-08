import React from "react"
import {Map} from "../../../src/index.jsx"
import ComponentContainer from "../CompContainer/ComponentContainer.jsx"
import colors from "../../colors"
import INDIA from "../sampleMaps/India.js"

class MapExampleIndia extends React.Component {

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
            {code: "IN-AN", population: 379944, area: "Andaman and Nicobar Islands"},
            {code: "IN-AP", population: 49386799, area: "Andhra Pradesh"},
            {code: "IN-AR", population: 1382611, area: "Arunachal Pradesh"},
            {code: "IN-AS", population: 31169272, area: "Assam"},
            {code: "IN-BR", population: 103804637, area: "Bihar"},
            {code: "IN-CH", population: 1055450, area: "Chandigarh"},
            {code: "IN-CT", population: 25540196, area: "Chhattisgarh"},
            {code: "IN-DD", population: 242911, area: "Daman and Diu"},
            {code: "IN-DL", population: 16753235, area: "Delhi"},
            {code: "IN-DN", population: 342853, area: "Dadra and Nagar Haveli"},
            {code: "IN-GA", population: 1457723, area: "Goa"},
            {code: "IN-GJ", population: 60383628, area: "Gujarat"},
            {code: "IN-HP", population: 6864602, area: "Himachal Pradesh"},
            {code: "IN-HR", population: 25353081, area: "Haryana"},
            {code: "IN-JH", population: 32966238, area: "Jharkhand"},
            {code: "IN-JK", population: 12548926, area: "Jammu and Kashmir"},
            {code: "IN-KA", population: 61130704, area: "Karnataka"},
            {code: "IN-KL", population: 33387677, area: "Kerala"},
            {code: "IN-LD", population: 64429, area: "Lakshadweep"},
            {code: "IN-MH", population: 112372972, area: "Maharashtra"},
            {code: "IN-ML", population: 2964007, area: "Meghalaya"},
            {code: "IN-MN", population: 2721756, area: "Manipur"},
            {code: "IN-MP", population: 72597565, area: "Madhya Pradesh"},
            {code: "IN-MZ", population: 1091014, area: "Mizoram"},
            {code: "IN-NL", population: 1980602, area: "Nagaland"},
            {code: "IN-OR", population: 41947358, area: "Odisha"},
            {code: "IN-PB", population: 27704236, area: "Punjab"},
            {code: "IN-PY", population: 1244464, area: "Puducherry"},
            {code: "IN-RJ", population: 68621012, area: "Rajasthan"},
            {code: "IN-SK", population: 607688, area: "Sikkim"},
            {code: "IN-TG", population: 35286757, area: "Telangana"},
            {code: "IN-TN", population: 72138958, area: "Tamil Nadu"},
            {code: "IN-TR", population: 3671032, area: "Tripura"},
            {code: "IN-UP", population: 199281477, area: "Uttar Pradesh"},
            {code: "IN-UT", population: 10116752, area: "Uttarakhand"},
            {code: "IN-WB", population: 91347736, area: "West Bengal"},
          ]},
          {optionName: "width", name: "Width", optionType: "field", input: "string", initialValue: "98%"},
          {optionName: "colorRangeHigh", name: "Color Range (High)", optionType: "field", input: "string", initialValue: "#225588"},
          {optionName: "colorRangeLow", name: "Color Range (Low)", optionType: "field", input: "string", initialValue: "#ffffff"},
          {optionName: "scale", name: "Scale", optionType: "state", states: ["lin", "log"], initialValue: "lin"},
          {optionName: "zoomScale", name: "Zoom Scale", optionType: "field", input: "number", initialValue: 1},
          {optionName: "zoomID", name: "Zoom Focus (Code)", optionType: "field", input: "string", initialValue: "N/A"},
          {optionName: "tooltip", name: "Tooltip", optionType: "bool", initialValue: true},
          {optionName: "tooltipColor", name: "Tooltip Color", optionType: "state", states:["dark","light"], initialValue: "dark"},
          {optionName: "IDKey", name: "ID", optionType: "hidden", initialValue: "code"},
          {optionName: "weightKey", name: "Weight", optionType: "hidden", initialValue: "population"},
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
        <h1 style={style.title}>Populations in India</h1>
        <br />
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <Map data={this.state.optionList[0].initialValue}
            paths={INDIA.svg.g.path}/>
        </ComponentContainer>
      </div>
    )
  }
}

export default MapExampleIndia
