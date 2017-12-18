import React from "react"
import Radium from "radium"
import colors from "../../colors"


class StateButton extends React.Component {

  clickHandler() {
    this.props.updateFunc(this.props.title)
  }

  render() {
    let style = {
      button: {
        display: "inline-block",
        fontSize: "0.8rem",
        width: "10.5rem",
        float: "left",
        padding: "3px 4px",
        textAlign: "center",
        color: colors[this.props.palette].white,
        backgroundColor: this.props.color,
        borderRadius: "15px",
        cursor: "pointer",
        transition: "background-color .4s",
        ":hover":{
          backgroundColor: this.props.bgColor
        }
      }
    }

    return (
      <div className="button" style={style.button}
        onClick={this.clickHandler.bind(this)}>
        {this.props.title}
      </div>
    )
  }

}

class StateSwitch extends React.Component {

  render() {
    const style = {
      outer: {
        fontSize: "0.8rem",
        minHeight: "15px",
        verticalAlign: "top",
        boxSizing: "border-box",
        marginTop: "8px",
        paddingBottom: "8px"
      },
      inner: {
        textAlign: "center",
        margin: "auto"
      },
      switchName: {
        display: "inline-block",
        margin: "8px",
        fontSize: "0.9rem"
      },
      switches: {
        display: "inline-block",
        verticalAlign: "middle",
      }
    }

    let types = this.props.states
    let buttons = []
    let color = ""
    let bgColor = ""
    for (var i=0; i < types.length; i++) {
      if (types[i] == this.props.switch) {
        color = colors[this.props.palette].buttonActive
        bgColor = colors[this.props.palette].buttonActive
      } else {
        color = colors[this.props.palette].button
        bgColor = colors[this.props.palette].buttonHover
      }
      let StyledButton = Radium(StateButton)
      buttons.push(
        <StyledButton key={i} title={types[i]}
          width={1/this.props.states.length}
          updateFunc={this.props.updateFunc}
          color={color} bgColor={bgColor}
          palette={this.props.palette}/>
      )
    }

    return(
      <div style={style.outer}>
        <div style={style.inner}>
          <div style= {style.switchName}>{this.props.name}:</div>
          <div className="switch" style={style.switches}>
            {buttons}
          </div>
        </div>
      </div>
    )
  }

}

export default StateSwitch
