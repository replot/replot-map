import React from "react"
import PropTypes from "prop-types"

class Table extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      container: {
        border: "solid 1px rgba(0, 0, 0, 0.2)",
        boxShadow: "-2px 2px 5px rgba(0, 0, 0, 0.2)",
        display:"inline-block",
        verticalAlign:"top",
        padding:"20px 40px",
        height: "45%",
        overflow: "auto",
      },
      header: {
        minWidth: "85px",
        color: this.props.textColor,
        fontSize: "0.9rem",
        fontWeight: "700",
        paddingBottom: "12px",
      },
      cell: {
        minWidth: "75px",
        color: this.props.textColor,
        fontSize: "0.8rem",
        fontWeight: "300",
      }
    }

    let rows = []
    rows.push(
      <tr>
        <td style={style.header}>ID:</td>
        <td style={style.header}>Title:</td>
      </tr>
    )

    for (let area of this.props.paths) {
      rows.push(
        <tr key={area[this.props.idKey]}>
          <td style={style.cell}>{area[this.props.idKey]}</td>
          <td style={style.cell}>{area[this.props.titleKey]}</td>
        </tr>
      )
    }

    return (
      <div style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

Table.defaultProps = {
  idKey: "id",
  titleKey: "title",
  textColor: "#000000"
}

Table.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
  idKey: PropTypes.string,
  titleKey: PropTypes.string,
  textColor: PropTypes.string
}

export default Table
