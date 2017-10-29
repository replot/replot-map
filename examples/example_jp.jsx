import React from "react"
import ReactDOM from "react-dom"
import Map from "../src/index.jsx"
import JAPAN from "./samples/Japan.js"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      country: this.props.country,
      abbreviation: this.props.abbreviation,
      citizenship: e.target.value
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
        color: "#000000"
      }
    }

    return(
      <tr key={this.props.country.concat(this.props.abbreviation)}>
        <td style={style.cell}>{this.props.abbreviation}</td>
        <td style={style.cell}>
          <input type="text" value={parseFloat(this.props.citizenship)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }

}

class KeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        float: "left",
      }
    }
    let rows = []
    for (let dataPoint of this.props.data) {
      rows.push(
        <KeyValueRow key={dataPoint.country.concat(dataPoint.abbreviation)}
          country={dataPoint.country} abbreviation={dataPoint.abbreviation} citizenship={dataPoint.citizenship}
          updateData={this.props.updateData.bind(this)} />
      )
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}


class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {ID: "JP-01", weight: 5485952}, //Hokkaido
        {ID: "JP-02", weight: 1362820}, //Aomori
        {ID: "JP-03", weight: 1314076}, //Iwate
        {ID: "JP-04", weight: 2326735}, //Miyagi
        {ID: "JP-05", weight: 1074858}, //Akita
        {ID: "JP-06", weight: 1161214}, //Yamagata
        {ID: "JP-07", weight: 1989834}, //Fukushima
        {ID: "JP-08", weight: 2957706}, //Ibaraki
        {ID: "JP-09", weight: 2000010}, //Tochigi
        {ID: "JP-10", weight: 2000514}, //Gunma
        {ID: "JP-11", weight: 7207139}, //Saitama
        {ID: "JP-12", weight: 6214148}, //Chiba
        {ID: "JP-13", weight: 13195974}, //Tokyo
        {ID: "JP-14", weight: 9058094}, //Kanagawa
        {ID: "JP-15", weight: 2362158}, //Niigata
        {ID: "JP-16", weight: 1087745}, //Toyama
        {ID: "JP-17", weight: 1166309}, //Ishikawa
        {ID: "JP-18", weight: 802906}, //Fukui
        {ID: "JP-19", weight: 857459}, //Yamanashi
        {ID: "JP-20", weight: 2142167}, //Nagano
        {ID: "JP-21", weight: 2070908}, //Gifu
        {ID: "JP-22", weight: 3749274}, //Shizuoka
        {ID: "JP-23", weight: 7416336}, //Aichi
        {ID: "JP-24", weight: 1847223}, //Mie
        {ID: "JP-25", weight: 1413513}, //Shiga
        {ID: "JP-26", weight: 2631671}, //Kyoto
        {ID: "JP-27", weight: 8861012}, //Osaka
        {ID: "JP-28", weight: 5581968}, //Hyogo
        {ID: "JP-29", weight: 1395845}, //Nara
        {ID: "JP-30", weight: 995010}, //Wakayama
        {ID: "JP-31", weight: 585494}, //Tottori
        {ID: "JP-32", weight: 712292}, //Shimane
        {ID: "JP-33", weight: 1940559}, //Okayama
        {ID: "JP-34", weight: 2855045}, //Hiroshima
        {ID: "JP-35", weight: 1442428}, //Yamaguchi
        {ID: "JP-36", weight: 780236}, //Tokushima
        {ID: "JP-37", weight: 991947}, //Kagawa
        {ID: "JP-38", weight: 1423406}, //Ehime
        {ID: "JP-39", weight: 758469}, //Kochi
        {ID: "JP-40", weight: 5079291}, //Fukuoka
        {ID: "JP-41", weight: 846787}, //Saga
        {ID: "JP-42", weight: 1417423}, //Nagasaki
        {ID: "JP-43", weight: 1812575}, //Kumamoto
        {ID: "JP-44", weight: 1191430}, //Oita
        {ID: "JP-45", weight: 1130983}, //Miyazaki
        {ID: "JP-46", weight: 1698695}, //Kagoshima
        {ID: "JP-47", weight: 1401066} //Okinawa
      ]
    }
  }

  updateData(mutatedObject) {
      let mutatedData = JSON.parse(JSON.stringify(this.state.data))
      let chosenIndex = -1
      for (let index=0; index < mutatedData.length; index++) {
        if (mutatedData[index].country === mutatedObject.country && mutatedData[index].abbreviation === mutatedObject.abbreviation) {
          chosenIndex = index
          break
        }
      }
      if (chosenIndex > -1) {
        mutatedData[chosenIndex].citizenship = parseFloat(mutatedObject.citizenship)
        this.setState({data: mutatedData})
      }
    }

// <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />

  render() {

    return(
      <div className="container">
        <h1 style={{textAlign: "left", color: "#000000"}}>Populations in Japan</h1>
        <h3 style={{textAlign: "left", color: "#000000"}}>by Prefectures</h3>

        <div style={{width:"70%", display:"inline-block", float:"left", paddingLeft:"50px"}}>
          <Map
            data={this.state.data}
            paths={JAPAN.svg.g.path}
          />
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
