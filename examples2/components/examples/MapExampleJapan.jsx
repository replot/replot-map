import React from "react"
import {Map} from "../../../src/index.jsx"
import ComponentContainer from "../CompContainer/ComponentContainer.jsx"
import colors from "../../colors"
import JAPAN from "../sampleMaps/Japan.js"

class MapExampleJapan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      optionList: [
        {
          optionName: "data",
          optionType: "data",
          keyList:["prefecture","code"],
          weightKey:"population",
          initialValue: [
            {code: "JP-01", population: 5485952, prefecture: "Hokkaido"},
            {code: "JP-02", population: 1362820, prefecture: "Aomori"},
            {code: "JP-03", population: 1314076, prefecture: "Iwate"},
            {code: "JP-04", population: 2326735, prefecture: "Miyagi"},
            {code: "JP-05", population: 1074858, prefecture: "Akita"},
            {code: "JP-06", population: 1161214, prefecture: "Yamagata"},
            {code: "JP-07", population: 1989834, prefecture: "Fukushima"},
            {code: "JP-08", population: 2957706, prefecture: "Ibaraki"},
            {code: "JP-09", population: 2000010, prefecture: "Tochigi"},
            {code: "JP-10", population: 2000514, prefecture: "Gunma"},
            {code: "JP-11", population: 7207139, prefecture: "Saitama"},
            {code: "JP-12", population: 6214148, prefecture: "Chiba"},
            {code: "JP-13", population: 13195974, prefecture: "Tokyo"},
            {code: "JP-14", population: 9058094, prefecture: "Kanagawa"},
            {code: "JP-15", population: 2362158, prefecture: "Niigata"},
            {code: "JP-16", population: 1087745, prefecture: "Toyama"},
            {code: "JP-17", population: 1166309, prefecture: "Ishikawa"},
            {code: "JP-18", population: 802906, prefecture: "Fukui"},
            {code: "JP-19", population: 857459, prefecture: "Yamanashi"},
            {code: "JP-20", population: 2142167, prefecture: "Nagano"},
            {code: "JP-21", population: 2070908, prefecture: "Gifu"},
            {code: "JP-22", population: 3749274, prefecture: "Shizuoka"},
            {code: "JP-23", population: 7416336, prefecture: "Aichi"},
            {code: "JP-24", population: 1847223, prefecture: "Mie"},
            {code: "JP-25", population: 1413513, prefecture: "Shiga"},
            {code: "JP-26", population: 2631671, prefecture: "Kyoto"},
            {code: "JP-27", population: 8861012, prefecture: "Osaka"},
            {code: "JP-28", population: 5581968, prefecture: "Hyogo"},
            {code: "JP-29", population: 1395845, prefecture: "Nara"},
            {code: "JP-30", population: 995010, prefecture: "Wakayama"},
            {code: "JP-31", population: 585494, prefecture: "Tottori"},
            {code: "JP-32", population: 712292, prefecture: "Shimane"},
            {code: "JP-33", population: 1940559, prefecture: "Okayama"},
            {code: "JP-34", population: 2855045, prefecture: "Hiroshima"},
            {code: "JP-35", population: 1442428, prefecture: "Yamaguchi"},
            {code: "JP-36", population: 780236, prefecture: "Tokushima"},
            {code: "JP-37", population: 991947, prefecture: "Kagawa"},
            {code: "JP-38", population: 1423406, prefecture: "Ehime"},
            {code: "JP-39", population: 758469, prefecture: "Kochi"},
            {code: "JP-40", population: 5079291, prefecture: "Fukuoka"},
            {code: "JP-41", population: 846787, prefecture: "Saga"},
            {code: "JP-42", population: 1417423, prefecture: "Nagasaki"},
            {code: "JP-43", population: 1812575, prefecture: "Kumamoto"},
            {code: "JP-44", population: 1191430, prefecture: "Oita"},
            {code: "JP-45", population: 1130983, prefecture: "Miyazaki"},
            {code: "JP-46", population: 1698695, prefecture: "Kagoshima"},
            {code: "JP-47", population: 1401066, prefecture: "Okinawa"}
          ]},
          {optionName: "width", name: "Width", optionType: "field", input: "number", initialValue: 700},
          {optionName: "colorRangeLow", name: "Color Range (High)", optionType: "field", input: "string", initialValue: "#225588"},
          {optionName: "colorRangeHigh", name: "Color Range (Low)", optionType: "field", input: "string", initialValue: "#ffffff"},
          {optionName: "scale", name: "Scale", optionType: "state", states: ["lin", "log"], initialValue: "lin"},
          {optionName: "zoomScale", name: "Zoom Scale", optionType: "field", input: "number", initialValue: 1},
          {optionName: "zoomIDKey", name: "Zoom Focus (Code)", optionType: "field", input: "string", initialValue: "N/A"},
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
        <h1 style={style.title}>Populations in Japan</h1>
        <br />
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <Map data={this.state.optionList[0].initialValue}
            paths={JAPAN.svg.g.path}/>
        </ComponentContainer>
      </div>
    )
  }
}

export default MapExampleJapan
