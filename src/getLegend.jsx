import React from "react"
import Humanize from "humanize-plus"

const getLegend = (gradient, scale, isBackgroundDark) => {
  const HEIGHT = 15
  const WIDTH = 30
  const FONT_SIZE = 14
  const FONT_HEIGHT = 6
  const PADDING = 20
  let background = isBackgroundDark ? "#000000" : "#ffffff"
  let text_color = isBackgroundDark ? "#ffffff" : "#000000"

  let legend = []
  legend.push(
    <rect key="background" x={-PADDING} y={-PADDING}
      height={FONT_HEIGHT+HEIGHT+PADDING*1.5} width={WIDTH*10+PADDING*2}
      fill={background} fillOpacity="0.5"/>
  )

  for (let i = 0; i < 10; i++) {
    legend.push(
      <rect key={"rect" + i} x={i*WIDTH} y={FONT_HEIGHT} height={HEIGHT} width={WIDTH} fill={gradient[i*10].color}/>
    )
    if (i%2 === 0) {
      let value = parseFloat(gradient[i*10].weight.toFixed(2))
      let printValue = humanizeValue(value, scale)
      legend.push(
        <text key={"label" + i} x={i*WIDTH} y={0} fontSize={FONT_SIZE} fill={text_color} textAnchor="middle">{printValue}</text>
      )
    }
  }
  let value = parseFloat(gradient[99].weight.toFixed(2))
  let printValue = humanizeValue(value, scale)
  legend.push(
    <text key={"endLabel"} x={10*WIDTH} y={0} fontSize={FONT_SIZE} fill={text_color} textAnchor="middle">{printValue}</text>
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
