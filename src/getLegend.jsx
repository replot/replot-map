import React from "react"
import Humanize from "humanize-plus"

const getLegend = (gradient, scale, title, isBackgroundDark) => {
  const HEIGHT = 15
  const WIDTH = 30
  const FONT_SIZE = 14
  const FONT_HEIGHT = 12
  const PADDING_X = 30
  let paddingY = title ? 30 : 20
  let titleHeight = title ? FONT_HEIGHT : 0
  let background = isBackgroundDark ? "#000000" : "#ffffff"
  let text_color = isBackgroundDark ? "#ffffff" : "#000000"

  let legend = []
  legend.push(
    <rect key="background" x={-PADDING_X} y={-paddingY}
      height={FONT_HEIGHT + HEIGHT + paddingY * 1.5 + titleHeight}
      width={WIDTH * 10 + PADDING_X * 2}
      fill={background} fillOpacity="0.5"/>
  )

  if (title) {
    legend.push(
      <text key="title" x={-PADDING_X + 10} y={-HEIGHT/2} fontSize={FONT_SIZE}
        fill={text_color}>{title}</text>
    )
  }

  legend.push(
    <linearGradient id="gradient" key="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={gradient[0].color} />
      <stop offset="100%" stopColor={gradient[99].color} />
    </linearGradient>
  )
  legend.push(
    <rect key="rect" x={0} y={-HEIGHT/2 + titleHeight}
      height={HEIGHT} width={WIDTH * 10} fill={"url(#gradient)"}/>
  )

  for (let i = 0; i < 10; i++) {
    if (i%2 === 0) {
      let value = parseFloat(gradient[i*10].weight.toFixed(2))
      let printValue = humanizeValue(value, scale)
      legend.push(
        <text key={"label" + i} x={i * WIDTH} y={HEIGHT + FONT_HEIGHT + titleHeight}
          fontSize={FONT_SIZE} fill={text_color} textAnchor="middle">{printValue}</text>
      )
    }
  }
  let value = parseFloat(gradient[99].weight.toFixed(2))
  let printValue = humanizeValue(value, scale)
  legend.push(
    <text key={"endLabel"} x={10 * WIDTH} y={HEIGHT + FONT_HEIGHT + titleHeight}
      fontSize={FONT_SIZE} fill={text_color} textAnchor="middle">{printValue}</text>
  )

  return legend
}

const humanizeValue = (value, scale) => {
  if (value < 1 && value > -1){
    if (scale == "lin") {
      return +value.toFixed(3)
    } else if (scale == "log") {
      return +value.toFixed(5)
    }
    return +value.toFixed(3)
  } else if (value < 1000 && value > -1000){
    return +value.toFixed(1)
  } else {
    return Humanize.compactInteger(value, 1)
  }
}

export default getLegend
