import React from "react"
import PropTypes from "prop-types"
import DataTable from "../DataTable.jsx"
import ScatterKeyValueTable from "../ScatterKeyValueTable.jsx"
import OptionsPane from "./OptionsPane.jsx"
import FieldSwitch from "./FieldSwitch.jsx"
import BoolSwitch from "./BoolSwitch.jsx"
import StateSwitch from "./StateSwitch.jsx"
import NonSwitch from "./NonSwitch.jsx"
import colors from "../../colors"
import Radium from "radium"


class Toggle extends React.Component {

  render() {
    let palette = colors[this.props.palette]
    let style = {
      container: {
        padding: "10px 20px",
      },
      button: {
        fontSize: "1.2rem",
        fontWeight: "700",
        display: "inline-block",
        textAlign: "left",
        padding: "5px 10px 5px 0px",
        marginLeft: "10px",
        marginRight: "30px",
        color: palette.optionsPane.paneHeader.text,
        cursor: "pointer",
      },
      activeButton: {
        fontSize: "1.2rem",
        fontWeight: "700",
        display: "inline-block",
        textAlign: "left",
        padding: "5px 10px 5px 0px",
        marginLeft: "5px",
        marginRight: "30px",
        color: palette.optionsPane.paneHeader.text,
        borderBottom: palette.optionsPane.paneHeader.activeBorder
      },
    }

    let dataLabelStyle = style.button
    let optionsLabelStyle = style.activeButton

    if (this.props.active == "data") {
      dataLabelStyle = style.activeButton
      optionsLabelStyle = style.button
    }

    return (
      <div style={style.container}>
        <div onClick={this.props.handleData} style={dataLabelStyle}>
          Data
        </div>
        <div onClick={this.props.handleOptions} style={optionsLabelStyle}>
          Options
        </div>
      </div>
    )
  }
}


class ComponentContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: {},
      active: "data"
    }
    for (let option of this.props.optionList){
      this.state.options[option.optionName] = option.initialValue
    }
    this.state.options["axisStyle"] = {}
    for (let option of this.props.axisColorOptions){
      this.state.options["axisStyle"][option.optionName] = option.initialValue
    }
    this.state.options["legendStyle"] = {}
    for (let option of this.props.legendColorOptions){
      this.state.options["legendStyle"][option.optionName] = option.initialValue
    }
    this.state.options["graphStyle"] = {}
    for (let option of this.props.graphStyle){
      this.state.options["graphStyle"][option.optionName] = option.initialValue
    }
    for (let option of this.props.colorOptions){
      this.state.options[option.optionName] = option.initialValue
    }
  }

  componentWillReceiveProps(nextProps) {
    let newOptions = {}
    newOptions["axisStyle"] = {}
    newOptions["legendStyle"] = {}
    newOptions["graphStyle"] = {}
    for (let option of nextProps.optionList){
      newOptions[option.optionName] = option.initialValue
    }
    for (let option of nextProps.axisColorOptions){
      newOptions["axisStyle"][option.optionName] = option.initialValue
    }
    for (let option of nextProps.legendColorOptions){
      newOptions["legendStyle"][option.optionName] = option.initialValue
    }
    for (let option of nextProps.graphStyle){
      newOptions["graphStyle"][option.optionName] = option.initialValue
    }
    this.setState({
      options: newOptions
    })
  }

  toggleData() {
    this.setState({
      active: "data"
    })
  }

  toggleOptions() {
    this.setState({
      active: "options"
    })
  }

  updateFuncGen(name){
    let updateFunc = function (newSetting) {
      let newOptions = this.state.options
      newOptions[name] = newSetting
      this.setState({options: newOptions})
    }
    return updateFunc
  }

  updateDataGen(titles, weight) {
    let updateData = function (mutatedObject) {
      let mutatedData = JSON.parse(JSON.stringify(this.state.options.data))
      let chosenIndex = -1
      for (let index=0; index < mutatedData.length; index++) {
        let match = true
        for (let title of titles) {
          if (mutatedData[index][title] != mutatedObject[title]){
            match = false
          }
        }
        if (match) {
          chosenIndex = index
          break
        }
      }
      if (chosenIndex > -1) {
        mutatedData[chosenIndex][weight] = parseInt(mutatedObject[weight])
        let newOptions = this.state.options
        newOptions.data = mutatedData
        this.setState({options: newOptions})
      }
    }
    return updateData
  }

  updateAxisColorGen(name){
    let updateColor = function (newSetting) {
      let newColors = this.state.options
      newColors["axisStyle"][name] = newSetting
      this.setState({options: newColors})
    }
    return updateColor
  }

  updateLegendColorGen(name){
    let updateColor = function (newSetting) {
      let newColors = this.state.options
      newColors["legendStyle"][name] = newSetting
      this.setState({options: newColors})
    }
    return updateColor
  }

  updateGraphStyleGen(name){
    let updateColor = function (newSetting) {
      let newColors = this.state.options
      newColors["graphStyle"][name] = newSetting
      this.setState({options: newColors})
    }
    return updateColor
  }

  updateScatterShoeData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.options.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].weight === mutatedObject.weight && mutatedData[index].height === mutatedObject.height) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].shoeSize = parseFloat(mutatedObject.shoeSize)
      let newOptions = this.state.options
      newOptions.data = mutatedData
      this.setState({options: newOptions})
    }
  }

  updateScatterWeightData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.options.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].gender === mutatedObject.gender && mutatedData[index].height === mutatedObject.height) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].weight = parseFloat(mutatedObject.weight)
      let newOptions = this.state.options
      newOptions.data = mutatedData
      this.setState({options: newOptions})
    }
  }

  render() {
    let switches = []
    let dataTable
    for (let option of this.props.optionList){
      if (option.optionType === "scatterData") {
        dataTable = (
          <ScatterKeyValueTable data={this.state.options.data}
            updateShoeData={this.updateScatterShoeData.bind(this)}
            updateWeightData={this.updateScatterWeightData.bind(this)}
            palette={this.props.palette}/>
        )
      }
      else if (option.optionType === "data"){
        dataTable = (
          <DataTable data={this.state.options.data}
            updateData={this.updateDataGen(option.keyList, option.weightKey).bind(this)}
            keyList={option.keyList} weightKey={option.weightKey}
            palette={this.props.palette}/>
        )
      }
      if (option.optionType === "bool") {
        switches.push(<BoolSwitch key={option.optionName} name={option.name}
          switch={this.state.options[option.optionName]}
          updateFunc={this.updateFuncGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      } else if (option.optionType === "field") {
        switches.push(<FieldSwitch key={option.optionName} name={option.name}
          switch={this.state.options[option.optionName]} input={option.input}
          updateFunc={this.updateFuncGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      } else if (option.optionType === "state") {
        switches.push(<StateSwitch key={option.optionName} name={option.name}
          switch={this.state.options[option.optionName]} states={option.states}
          updateFunc={this.updateFuncGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      } else if (option.optionType === "hidden") {
        switches.push(<NonSwitch key={option.optionName} name={option.name}
          switch={this.state.options[option.optionName]}
          palette={this.props.palette}/>)
      }
    }
    for (let option of this.props.axisColorOptions){
      if (option.optionType === "field") {
        switches.push(<FieldSwitch key={option.optionName} name={option.name}
          switch={this.state.options["axisStyle"][option.optionName]} input={option.input}
          updateFunc={this.updateAxisColorGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      }
    }

    for (let option of this.props.legendColorOptions){
      if (option.optionType === "field") {
        switches.push(<FieldSwitch key={option.optionName} name={option.name}
          switch={this.state.options["legendStyle"][option.optionName]} input={option.input}
          updateFunc={this.updateLegendColorGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      } else if (option.optionType === "bool") {
        switches.push(<BoolSwitch key={option.optionName} name={option.name}
          switch={this.state.options["legendStyle"][option.optionName]}
          updateFunc={this.updateLegendColorGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      }
    }

    for (let option of this.props.graphStyle){
      if (option.optionType === "field") {
        switches.push(<FieldSwitch key={option.optionName} name={option.name}
          switch={this.state.options["graphStyle"][option.optionName]} input={option.input}
          updateFunc={this.updateGraphStyleGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      }
    }

    for (let option of this.props.colorOptions){
      if (option.optionType === "field") {
        switches.push(<FieldSwitch key={option.optionName} name={option.name}
          switch={this.state.options[option.optionName]} input={option.input}
          updateFunc={this.updateFuncGen(option.optionName).bind(this)}
          palette={this.props.palette}/>)
      }
    }

    let newChild = React.cloneElement(this.props.children, this.state.options)

    let style = {
      chart: {
        width: "58%",
        display: "inline-block",
        verticalAlign: "top",
        "@media (max-width: 800px)": {
          width: "100%",
        }
      },
      optionsData: {
        width: "33%",
        display: "inline-block",
        verticalAlign: "top",
        marginLeft: "5%",
        maxWidth: "550px",
        padding: "10px",
        border: "solid 1px rgba(0, 0, 0, 0.2)",
        boxShadow: "-2px 2px 5px rgba(0, 0, 0, 0.2)",
        "@media (max-width: 800px)": {
          display: "none"
        }
      }
    }
    return (
      <div>
        <div style={style.chart}>
          {newChild}
        </div>
        <div style={style.optionsData}>
          <Toggle handleData={this.toggleData.bind(this)}
            handleOptions={this.toggleOptions.bind(this)}
            active={this.state.active}
            palette={this.props.palette}/>
          {this.state.active == "options" &&
            <OptionsPane>
              {switches}
            </OptionsPane>
          }
          {this.state.active == "data" &&
            <div>
              {dataTable}
            </div>
          }
        </div>
      </div>
    )
  }

}

ComponentContainer.defaultProps = {
  axisColorOptions: [],
  legendColorOptions: [],
  graphStyle: [],
  colorOptions: []
}

ComponentContainer.propTypes = {
  optionList: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired
}

export default Radium(ComponentContainer)
