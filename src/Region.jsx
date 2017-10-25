import React from "react"
import Coloring from "./coloring.jsx"

class Region extends React.Component {

  constructor(props) {
    super(props)
    this.IDList = []
    this.IDDict = {}
    for (let area of this.props.paths.svg.g.path) {
      let shortId = area.id.replace(/(.+)-/,"") //Remove the country code.
      this.IDList.push(shortId)
      this.IDDict[shortId] = area.title
    }
  }

  getLegend(colors){
    let legend = []

    for (let i = 0; i < 10; i++) {
      legend.push(
        <rect key={"rect" + i} x={i*40} y={8} height={20} width={40} fill={colors.colorGradient[i*10].color}/>
      )
      if (i%2 === 0) {
        legend.push(
          <text key={"label" + i} x={i*40} y={0} textAnchor="middle">{parseFloat(colors.colorGradient[i*10].weight.toFixed(2))}</text>
        )
      }
    }
    legend.push(
      <text key={"endLabel"} x={400} y={0} textAnchor="middle">{parseFloat(colors.colorGradient[99].weight.toFixed(2))}</text>
    )

    return (
      <g transform="translate(30, 675)">
        {legend}
      </g>
    )
  }

  render () {

    let xScale = 1
    let yScale = 1
    if (this.props.width && this.props.height) {
      xScale = this.props.width / 650
      yScale = this.props.height / 725
    } else if (this.props.width) {
      xScale = this.props.width / 650
      yScale = xScale
    } else if (this.props.height) {
      yScale = this.props.height / 725
      xScale = yScale
    }

    let colors = new Coloring(this.IDList, this.props.IDKey, this.props.weightKey, this.props.scale, this.props.data, this.props.colorKey, this.props.colorRange, this.props.colorCatgories)
    let mapColors = colors.generate()
    let legend = this.getLegend(colors)

    let paths = []
    for (let i = 0; i < this.props.paths.svg.g.path.length; i++) {
      let area = this.props.paths.svg.g.path[i]
      let shortId = area.id.replace(/(.+)-/,"") //Remove the country code.
      paths.push(
        <path key={area.id} id={area.id} title={area.title} fill={mapColors[shortId].color}
          onMouseOver={this.props.activateTooltip.bind(this, mapColors[shortId].raw, this.IDDict[shortId])}
          onMouseOut={this.props.deactivateTooltip.bind(this)}
          d={area.d} />
      )
    }

    return(
      <div>
        <svg width={650*xScale} height={725*yScale}>
          <g transform={`scale(${xScale} ${yScale})`}>
            {paths}
            {legend}
          </g>
        </svg>
      </div>
    )
  }
}

export default Region
