import React from "react"
import ReactDOM from "react-dom"
import {Map} from "../src/index.jsx"
import CHILE from "./samples/Chile.js"

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
        {ID: "CL-AI", weight: 12},
        {ID: "CL-AN", weight: 13},
        {ID: "CL-AP", weight: 14},
        {ID: "CL-AR", weight: 15},
        {ID: "CL-AT", weight: 16},
        {ID: "CL-BI", weight: 17},
        {ID: "CL-CO", weight: 18},
        {ID: "CL-LI", weight: 19},
        {ID: "CL-LL", weight: 20},
        {ID: "CL-LR", weight: 21},
        {ID: "CL-MA", weight: 22},
        {ID: "CL-RM", weight: 24},
        {ID: "CL-TA", weight: 25},
        {ID: "CL-VS", weight : 26}
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
        <h1 style={{textAlign: "left", color: "#000000"}}> Map for Replot </h1>
        <h3 style={{textAlign: "left", color: "#000000"}}>Citizenship</h3>

        <div style={{width:"70%", display:"inline-block", float:"left", paddingLeft:"50px"}}>
          <Map
            data={this.state.data}
            paths={CHILE.svg.g.path}
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
