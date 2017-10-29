import React from "react"
import PropTypes from "prop-types"

class Table extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      container: {
        float: "left",
      },
      cell: {
        minWidth: "100px",
        color: "#000000"
      }
    }

    let rows = []
    rows.push(
      <tr>
        <td style={style.cell}>ID:</td>
        <td style={style.cell}>Title:</td>
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
  titleKey: "title"
}

Table.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
  idKey: PropTypes.string,
  titleKey: PropTypes.string
}

export default Table
