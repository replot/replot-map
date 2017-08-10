import React from "react"
import ReactDOM from "react-dom"
import Map from "../src/index.jsx"

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
        {"country": "US", "name": "Alabama", "abbreviation": "AL", "citizenship": 97.8},
        {"country": "US", "name": "Alaska", "abbreviation": "AK", "citizenship": 96.7},
        {"country": "US", "name": "Arizona", "abbreviation": "AZ", "citizenship": 91.8},
        {"country": "US", "name": "Arkansas", "abbreviation": "AR", "citizenship": 96.8},
        {"country": "US", "name": "California", "abbreviation": "CA", "citizenship": 86.1},
        {"country": "US", "name": "Colorado", "abbreviation": "CO", "citizenship": 94},
        {"country": "US", "name": "Connecticut", "abbreviation": "CT", "citizenship": 92.8},
        {"country": "US", "name": "Delaware", "abbreviation": "DE", "citizenship": 95.3},
        {"country": "US", "name": "District Of Columbia", "abbreviation": "DC", "citizenship": 91.5},
        {"country": "US", "name": "Florida", "abbreviation": "FL", "citizenship": 90.7},
        {"country": "US", "name": "Georgia", "abbreviation": "GA", "citizenship": 94.1},
        {"country": "US", "name": "Hawaii", "abbreviation": "HI", "citizenship": 92.4},
        {"country": "US", "name": "Idaho", "abbreviation": "ID", "citizenship": 96.1},
        {"country": "US", "name": "Illinois", "abbreviation": "IL", "citizenship": 92.7},
        {"country": "US", "name": "Indiana", "abbreviation": "IN", "citizenship": 96.9},
        {"country": "US", "name": "Iowa", "abbreviation": "IA", "citizenship": 97},
        {"country": "US", "name": "Kansas", "abbreviation": "KS", "citizenship": 95.6},
        {"country": "US", "name": "Kentucky", "abbreviation": "KY", "citizenship": 97.8},
        {"country": "US", "name": "Louisiana", "abbreviation": "LA", "citizenship": 97.6},
        {"country": "US", "name": "Maine", "abbreviation": "ME", "citizenship": 98.4},
        {"country": "US", "name": "Maryland", "abbreviation": "MD", "citizenship": 92.5},
        {"country": "US", "name": "Massachusetts", "abbreviation": "MA", "citizenship": 92.6},
        {"country": "US", "name": "Michigan", "abbreviation": "MI", "citizenship": 96.9},
        {"country": "US", "name": "Minnesota", "abbreviation": "MN", "citizenship": 96},
        {"country": "US", "name": "Mississippi", "abbreviation": "MS", "citizenship": 98.5},
        {"country": "US", "name": "Missouri", "abbreviation": "MO", "citizenship": 97.8},
        {"country": "US", "name": "Montana", "abbreviation": "MT", "citizenship": 99},
        {"country": "US", "name": "Nebraska", "abbreviation": "NE", "citizenship": 95.8},
        {"country": "US", "name": "Nevada", "abbreviation": "NV", "citizenship": 89.5},
        {"country": "US", "name": "New Hampshire", "abbreviation": "NH", "citizenship": 97.3},
        {"country": "US", "name": "New Jersey", "abbreviation": "NJ", "citizenship":89.8},
        {"country": "US", "name": "New Mexico", "abbreviation": "NM", "citizenship": 93.6},
        {"country": "US", "name": "New York", "abbreviation": "NY", "citizenship": 89.6},
        {"country": "US", "name": "North Carolina", "abbreviation": "NC", "citizenship": 94.9},
        {"country": "US", "name": "North Dakota", "abbreviation": "ND", "citizenship": 98.1},
        {"country": "US", "name": "Ohio", "abbreviation": "OH", "citizenship": 98},
        {"country": "US", "name": "Oklahoma", "abbreviation": "OK", "citizenship": 96.2},
        {"country": "US", "name": "Oregon", "abbreviation": "OR", "citizenship": 94.1},
        {"country": "US", "name": "Pennsylvania", "abbreviation": "PA", "citizenship": 97},
        {"country": "US", "name": "South Carolina", "abbreviation": "SC", "citizenship": 97},
        {"country": "US", "name": "South Dakota", "abbreviation": "SD", "citizenship": 98},
        {"country": "US", "name": "Tennessee", "abbreviation": "TN", "citizenship": 96.9},
        {"country": "US", "name": "Texas", "abbreviation": "TX", "citizenship": 89.2},
        {"country": "US", "name": "Utah", "abbreviation": "UT", "citizenship": 94.7},
        {"country": "US", "name": "Vermont", "abbreviation": "VT", "citizenship": 98.2},
        {"country": "US", "name": "Virginia", "abbreviation": "VA", "citizenship": 94.1},
        {"country": "US", "name": "Washington", "abbreviation": "WA", "citizenship": 92.8},
        {"country": "US", "name": "West Virginia", "abbreviation": "WV", "citizenship": 99.2},
        {"country": "US", "name": "Wisconsin", "abbreviation": "WI", "citizenship": 97.3},
        {"country": "US", "name": "Wyoming", "abbreviation": "WY", "citizenship": 97.7},
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

  render() {

    return(
      <div className="container">
        <h1 style={{textAlign: "left", color: "#000000"}}> Map for Replot </h1>
        <h3 style={{textAlign: "left", color: "#000000"}}>Citizenship</h3>

        <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />

        <div style={{width:"70%", display:"inline-block", float:"left", paddingLeft:"50px"}}>
          <Map data={this.state.data}
               titleKey="country"
               weightKey="citizenship"
               IDKey="abbreviation"
               scale="lin"
               colorRange={["#0f0f33", "#ffffff"]}
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
