import React from "react"
import colors from "../colors"


class ScatterKeyValueRow extends React.Component {

  changeHandlerShoe(e) {
    this.props.updateShoeData({
      gender: this.props.gender,
      height: this.props.height,
      weight: this.props.weight,
      shoeSize: e.target.value || "0",
    })
  }

  changeHandlerWeight(e) {
    this.props.updateWeightData({
      gender: this.props.gender,
      height: this.props.height,
      weight: e.target.value || "0",
      shoeSize: this.props.shoeSize,
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "80px",
        color: colors[this.props.palette].body.text,
        fontSize: "0.8rem",
      },
      input: {
        backgroundColor: colors[this.props.palette].inputBackground,
        height: "25px",
        width: "7rem",
        color: colors[this.props.palette].body.text,
        borderColor: colors[this.props.palette].input,
        textAlign: "center",
        fontSize: "0.8rem"
      }
    }

    return(
      <tr>
        <td style={style.cell}>{this.props.height}</td>
        <td style={style.cell}>
          <input style={style.input} type="text" value={parseFloat(this.props.weight)}
          onChange={this.changeHandlerWeight.bind(this)} />
        </td>
        <td style={style.cell}>
          <input style={style.input} type="text" value={parseFloat(this.props.shoeSize)}
          onChange={this.changeHandlerShoe.bind(this)} />
        </td>
      </tr>
    )
  }

}

class ScatterKeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        display:"inline-block",
        verticalAlign:"top",
        padding:"20px 20px",
        color: colors[this.props.palette].white,
        maxHeight: "350px",
        overflow: "auto",
      },
      cell: {
        minWidth: "100px",
        color: colors[this.props.palette].white,
        fontSize: "1.2rem",
      }
    }
    let rows = []
    rows.push(
      <tr key="labels">
        <td style={style.cell}> Height </td>
        <td style={style.cell}> Weight </td>
        <td style={style.cell}> Shoe Size </td>
      </tr>
    )
    for (let dataPoint of this.props.data) {
      rows.push(
        <ScatterKeyValueRow key={dataPoint.gender.concat(dataPoint.weight)}
          gender={dataPoint.gender} height={dataPoint.height}
          weight={dataPoint.weight} shoeSize={dataPoint.shoeSize}
          updateShoeData={this.props.updateShoeData.bind(this)}
          updateWeightData={this.props.updateWeightData.bind(this)}
          palette={this.props.palette}/>
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

export default ScatterKeyValueTable
