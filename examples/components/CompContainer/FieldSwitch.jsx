import React from "react"
import Radium from "radium"
import colors from "../../colors"


class FieldSwitch extends React.Component {


  componentWillReceiveProp(nextProps){
    if (this.props.switch !== nextProps.switch){
      this.changeHandler.bind(this)
    }
  }

  changeHandler(e){
    let val
    if (this.props.input === "number") {
      val = parseFloat(e.target.value) || 1
    }
    else {
      val = String(e.target.value)
    }
    this.props.updateFunc(val)
  }

  render() {
    const style = {
      outer: {
        fontSize: "0.8rem",
        minHeight: "1.5rem",
        verticalAlign: "top",
        textAlign: "left",
        boxSizing: "border-box",
        marginTop: "8px",
        backgroundColor: colors[this.props.palette].optionsField,
        borderRadius: "15px",
        marginLeft: "15px",
        marginRight: "15px",
        border: `1px solid ${colors[this.props.palette].optionsFieldBorder}`
      },
      input: {
        borderRadius: "0px 15px 15px 0px",
        backgroundColor: colors[this.props.palette].optionsField,
        height: "1.5rem",
        width: "6rem",
        color: colors[this.props.palette].body.text,
        border: 0,
        textAlign: "right",
        fontSize: "0.8rem",
        display: "inline-block",
        float: "right",
        paddingRight: "10px",
        margin: "2px",
        ":focus":{
          outline: "none",
          color: colors[this.props.palette].inputText
        }
      }
    }

    return(
      <div style={style.outer}>
        <span style={{display: "inline-block",
          paddingLeft: "10px", verticalAlign: "middle",
          paddingTop: "5px", paddingBottom: "5px"}}>{this.props.name}: </span>
        <input type="text" style={style.input}
          value={this.props.input === "number" ? parseFloat(this.props.switch) : this.props.switch}
          onChange={this.changeHandler.bind(this)}/>
      </div>
    )
  }

}

export default Radium(FieldSwitch)
