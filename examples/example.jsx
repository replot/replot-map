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
               countryKey="country"
               areaKey="abbreviation"
               valueKey="citizenship"
               colorLinear={["#0f0f33", "#ffffff"]}
             />


             <svg width="1048px" height="700px" viewBox="0 0 1048 429" version="1.1">
                 <defs></defs>
                 <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                     <g id="Desktop-HD" transform="translate(-354.000000, -150.000000)">
                         <text id="Country" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="385" y="307">Country</tspan>
                         </text>
                         <text id="Value" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="385" y="364">Value </tspan>
                         </text>
                         <text id="Animation" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="385" y="424">Animation </tspan>
                         </text>
                         <text id="Area" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1001" y="308">Area</tspan>
                         </text>
                         <text id="Colors" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1001" y="525">Colors </tspan>
                         </text>
                         <text id="City-/-State" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1167" y="243">City / State </tspan>
                         </text>
                         <text id="Region" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1167" y="352">Region </tspan>
                         </text>
                         <text id="Linear-coloring" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1167" y="467">Linear coloring </tspan>
                         </text>
                         <text id="Color-by-#tags" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1167" y="519">Color by #tags </tspan>
                         </text>
                         <path d="M712,258 C712,258 710.255792,297.242328 679.5,303.5 C648.744208,309.757672 481,305 481,305" id="Line" stroke="#979797" stroke-linecap="square"></path>
                         <path d="M716,215 L713,314 C713,314 711.255792,353.242328 680.5,359.5 C649.744208,365.757672 482,361 482,361" id="Line" stroke="#979797" stroke-linecap="square"></path>
                         <path d="M718,272 L715,371 C715,371 713.255792,410.242328 682.5,416.5 C651.744208,422.757672 484,418 484,418" id="Line" stroke="#979797" stroke-linecap="square"></path>
                         <path d="M976,249 L977,476 C977,476 975.255792,515.242328 944.5,521.5 C913.744208,527.757672 721,524 721,524" id="Line" stroke="#979797" stroke-linecap="square" transform="translate(849.000000, 387.059408) scale(-1, 1) translate(-849.000000, -387.059408) "></path>
                         <path d="M990,258 C990,258 987.991518,297.242328 952.575758,303.5 C917.159997,309.757672 724,305 724,305" id="Line" stroke="#979797" stroke-linecap="square" transform="translate(857.000000, 282.365733) scale(-1, 1) translate(-857.000000, -282.365733) "></path>
                         <path d="M1079.5,295.5 L1142.5,239.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
                         <path d="M1079.5,352.5 L1142.5,296.5" id="Line" stroke="#979797" stroke-linecap="square" transform="translate(1111.000000, 324.500000) scale(1, -1) translate(-1111.000000, -324.500000) "></path>
                         <path d="M1079.5,516.5 L1142.5,460.5" id="Line" stroke="#979797" stroke-linecap="square"></path>
                         <path d="M1079.5,573.5 L1142.5,517.5" id="Line" stroke="#979797" stroke-linecap="square" transform="translate(1111.000000, 545.500000) scale(1, -1) translate(-1111.000000, -545.500000) "></path>
                         <path d="M1082.5,517.5 L1156.5,517.5" id="Line" stroke="#979797" stroke-linecap="square" transform="translate(1119.500000, 517.500000) scale(1, -1) translate(-1119.500000, -517.500000) "></path>
                         <circle id="Oval" stroke="#979797" fill="#FFFFFF" cx="723" cy="211" r="60"></circle>
                         <text id="Replot--map" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#80B0BC">
                             <tspan x="700.225" y="204">Replot</tspan>
                             <tspan x="705.775" y="238">Map </tspan>
                         </text>
                         <text id="Provided-by-the-user" font-family="Avenir-Medium, Avenir" font-size="25" font-weight="400" fill="#979898">
                             <tspan x="1167" y="573">Provided by the user</tspan>
                         </text>
                     </g>
                 </g>
             </svg>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
