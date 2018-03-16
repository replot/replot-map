import React from "react"
import PropTypes from "prop-types"
import {GradientLegend} from "replot-core"
import extractValues from "./extractValues.js"
import getTranslations from "./getTranslations.js"
import {generateGradient, matchColorsToValues, isBackgroundDark} from "./getMapColoring.js"

class MapChart extends React.PureComponent {

  constructor(props) {
    super(props)
    this.zoomPath = null
    this.state = {
      initialHeight: 0,
      initialWidth: 0,
      currentHeight: 0,
      translateX: 0,
      translateY: 0,
      scale: 1
    }
  }

  componentDidMount() {
    let mapBBox = this.svgMap.getBBox()
    let scale = this.props.width/mapBBox.width
    let currentHeight = mapBBox.height * scale

    if (this.props.zoomScale) {
      scale *= this.props.zoomScale
    }

    let translations = getTranslations(this.props.width, currentHeight, scale, this.props.zoomID, this.zoomPath)
    let translateX = translations[0]
    let translateY = translations[1]

    this.setState({ initialHeight: mapBBox.height, initialWidth: mapBBox.width,
      currentHeight: currentHeight, scale: scale,
      translateX: translateX, translateY: translateY })
  }

  // Prop change - Respond if width, zoomID, or zoomScale changes.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.width !== this.props.width ||
      prevProps.zoomScale !== this.props.zoomScale ||
      prevProps.zoomID !== this.props.zoomID) {

      let scale = this.props.width/this.state.initialWidth
      let currentHeight = this.state.initialHeight * scale

      if (this.props.zoomScale) {
        scale *= this.props.zoomScale
      }

      let translations = getTranslations(this.props.width, currentHeight, scale, this.props.zoomID, this.zoomPath)
      let translateX = translations[0]
      let translateY = translations[1]

      this.setState({ currentHeight: currentHeight, scale: scale,
        translateX: translateX, translateY: translateY })
    }
  }

  render () {
    let IDList = []
    for (let area of this.props.paths) {
      IDList.push(area[this.props.pathIDKey])
    }

    let extractedData = extractValues(this.props.data, this.props.geoCode, this.props.weightKey)
    let mapColors = {}
    let legend
    if (this.props.colorFunc) {
      let IDs = new Set(IDList)
      for (let e of extractedData) {
        mapColors[e.area] = {
          color: this.props.colorFunc(e.area, e.weight),
          opacity: 1,
          raw: e.raw
        }
        IDs.delete(e.area)
      }
      for (let id of IDs.values()) {
        mapColors[id] = {
          color: (this.props.noDataColor ? this.props.noDataColor : this.props.colorRangeLow),
          opacity: this.props.noDataOpacity
        }
      }
      legend = <rect key="placeholder" x={-30} y={-20} height={71} width={360} fillOpacity="0"/>
    } else {
      let colorRange = [this.props.colorRangeHigh, this.props.colorRangeLow]
      let mapGradient = generateGradient(this.props.scale, extractedData, this.props.colorKey, colorRange, this.props.colorCatgories)
      mapColors = matchColorsToValues(mapGradient, this.props.noDataColor, this.props.noDataOpacity, IDList, extractedData)
      legend = GradientLegend(mapGradient, this.props.scale, this.props.legendTitle, isBackgroundDark(colorRange))
    }

    let correctionX = 0
    let correctionY = 0
    let startIndex = 0
    if (this.props.paths[0].id === "correction") {
      correctionX = this.props.paths[0].x
      correctionY = this.props.paths[0].y
      startIndex = 1
    }

    let paths = []
    for (let i = startIndex; i < this.props.paths.length; i++) {
      let area = this.props.paths[i]
      let id = area[this.props.pathIDKey]
      let title = area[this.props.pathTitleKey]
      let ref = this.props.zoomID && id === this.props.zoomID ?
        (node) => this.zoomPath = node : null
      paths.push(
        <path key={id} id={id} title={title} ref={ref}
          fill={mapColors[id].color} opacity={mapColors[id].opacity}
          onMouseOver={this.props.activateTooltip.bind(this, mapColors[id].raw, title)}
          onMouseOut={this.props.deactivateTooltip.bind(this)}
          d={area.d} />
      )
    }

    return(
      <div>
        <svg
          ref={(node) => this.svgMap = node}
          width={this.props.width}
          height={this.state.currentHeight}
        >
          <g transform={`translate(${this.state.translateX},${this.state.translateY}),
            scale(${this.state.scale})`}>
            <g transform={`translate(${correctionX},${correctionY})`}>{paths}</g>
          </g>
          <g transform={`translate(${30},${this.state.currentHeight-50})`}>
            {legend}
          </g>
        </svg>
      </div>
    )
  }
}

MapChart.defaultProps = {
  geoCode: "ID",
  weightKey: "weight",
  pathIDKey: "id",
  pathTitleKey: "title",
  colorRangeLow: "#ffffff",
  colorRangeHigh: "#225588",
  noDataOpacity: 0.5,
  scale: "lin",
  width: 800,
}

MapChart.propTypes = {
  data: PropTypes.array.isRequired,
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
  geoCode: PropTypes.string,
  weightKey: PropTypes.string,
  pathIDKey: PropTypes.string,
  pathTitleKey: PropTypes.string,
  colorKey: PropTypes.string,
  colorRangeLow: PropTypes.string,
  colorRangeHigh: PropTypes.string,
  colorCatgories: PropTypes.string,
  colorFunc: PropTypes.func,
  noDataOpacity: PropTypes.number,
  noDataColor: PropTypes.string,
  scale: PropTypes.string,
  legendTitle: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  zoomID: PropTypes.string,
  zoomScale: PropTypes.number,
}

export default MapChart
