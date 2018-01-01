import React from "react"
import getTranslations from "./getTranslations.js"
import getLegend from "./getLegend.jsx"
import {generateGradient, matchColorsToValues, isBackgroundDark} from "./getMapColoring.js"

class Region extends React.Component {

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

    let translations = getTranslations(this.props.width, currentHeight, scale, this.props.zoomIDKey, this.zoomPath)
    let translateX = translations[0]
    let translateY = translations[1]

    this.setState({ initialHeight: mapBBox.height, initialWidth: mapBBox.width,
      currentHeight: currentHeight, scale: scale,
      translateX: translateX, translateY: translateY })
  }

  // Prop change - Respond if width, zoomIDKey, or zoomScale changes.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.width !== this.props.width ||
      prevProps.zoomScale !== this.props.zoomScale ||
      prevProps.zoomIDKey !== this.props.zoomIDKey) {

      let scale = this.props.width/this.state.initialWidth
      let currentHeight = this.state.initialHeight * scale

      if (this.props.zoomScale) {
        scale *= this.props.zoomScale
      }

      let translations = getTranslations(this.props.width, currentHeight, scale, this.props.zoomIDKey, this.zoomPath)
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

    let mapGradient = generateGradient(this.props.scale, this.props.data, this.props.colorKey, this.props.colorRange, this.props.colorCatgories)
    let mapColors = matchColorsToValues(mapGradient, IDList, this.props.data)
    let legend = getLegend(mapGradient, this.props.scale, isBackgroundDark(this.props.colorRange))

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
      let ref = this.props.zoomIDKey && id === this.props.zoomIDKey ?
        (node) => this.zoomPath = node : null
      paths.push(
        <path key={id} id={id} title={title} ref={ref} fill={mapColors[id].color}
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

export default Region
