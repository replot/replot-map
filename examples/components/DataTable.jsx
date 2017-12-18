import React from "react"
import colors from "../colors"


class DataRow extends React.Component {

  changeHandler(e) {
    let newData = {}
    for (let key of this.props.keyList) {
      newData[key] = this.props.data[key]
    }
    newData[this.props.weightKey] = e.target.value || 0
    this.props.updateData(newData)
  }

  render() {
    const style = {
      cell: {
        minWidth: "75px",
        color: colors[this.props.palette].body.text,
        fontSize: "0.8rem",
        fontWeight: "300",
      },
      input: {
        backgroundColor: colors[this.props.palette].inputBackground,
        height: "25px",
        width: "6.5rem",
        color: colors[this.props.palette].body.text,
        borderColor: colors[this.props.palette].input,
        textAlign: "center",
        fontSize: "0.8rem",
        fontWeight: "300",
      },
    }

    let columns = []
    for (let key of this.props.keyList) {
      columns.push(
        <td key={this.props.data[key] + this.props.row}
          style={style.cell}> {this.props.data[key]} </td>
      )
    }
    columns.push(
      <td key={this.props.weightKey + this.props.row} style={style.cell}>
        <input style={style.input} type="text" value={parseInt(this.props.data[this.props.weightKey])}
          onChange={this.changeHandler.bind(this)}/>
      </td>
    )

    return(
      <tr>
        {columns}
      </tr>
    )

  }
}

class DataTable extends React.Component {

  render() {
    const style = {
      container: {
        display:"inline-block",
        verticalAlign:"top",
        padding:"20px 20px",
        color: colors[this.props.palette].white,
        height: "45%",
        width: "100%",
        overflow: "auto",
      },
      cell: {
        minWidth: "85px",
        color: colors[this.props.palette].white,
        fontSize: "0.9rem",
        fontWeight: "700",
        paddingBottom: "12px",
      },
      table: {
        width: "90%"
      }
    }

    let rowCount = 0
    let rows = []

    let headings = []
    for (let key of this.props.keyList){
      headings.push(
        <td key={rowCount + key} style={style.cell}> {key.charAt(0).toUpperCase() + key.slice(1)} </td>
      )
    }
    headings.push(
      <td key={rowCount + this.props.weightKey} style={style.cell}> {this.props.weightKey.charAt(0).toUpperCase() + this.props.weightKey.slice(1)} </td>
    )
    rows.push(
      <tr key={"row" + rowCount}>
        {headings}
      </tr>
    )

    for (let dataPoint of this.props.data) {
      rowCount++
      rows.push(
        <DataRow key={"row" + rowCount} data={dataPoint}
          keyList={this.props.keyList} weightKey={this.props.weightKey} row={rowCount}
          updateData={this.props.updateData}
          palette={this.props.palette}/>
      )
    }

    return (
      <div style={style.container}>
        <table style={style.table}>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DataTable
