import React from "react"
import colors from "../../colors"


class NonSwitch extends React.Component {

  render() {
    const style = {
      outer: {
        fontSize: "0.8rem",
        minHeight: "15px",
        verticalAlign: "top",
        textAlign: "left",
        boxSizing: "border-box",
        marginTop: "5px",
        backgroundColor: colors[this.props.palette].optionsField,
        borderRadius: "15px",
        marginLeft: "15px",
        marginRight: "15px",
      },
      name: {
        display: "inline-block",
        paddingRight: "10px",
        paddingLeft: "10px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderRadius: "15px 0px 0px 15px",
        backgroundColor: colors[this.props.palette].optionsField
      },
      switchString: {
        display: "inline-block",
        paddingRight: "10px",
        paddingLeft: "10px",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderRadius: "0px 15px 15px 0px",
        float: "right"
      }
    }

    return(
      <div style={style.outer}>
        <span style={style.name}>{this.props.name}:</span>
        <span style={style.switchString}>{this.props.switch.toString()}</span>
      </div>
    )
  }

}

export default NonSwitch
