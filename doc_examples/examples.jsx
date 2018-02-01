import React from "react"
import ReactDOM from "react-dom"
import BasicExample from "./BasicExample.jsx"
// import AdvancedExample from "./AdvancedExample.jsx"
import WidthExample from "./WidthExample.jsx"
import ColorExample from "./ColorExample.jsx"
import ScaleExample from "./ScaleExample.jsx"
import ZoomExample from "./ZoomExample.jsx"
import ZoomNullExample from "./ZoomNullExample.jsx"
import TooltipDarkExample from "./TooltipDarkExample.jsx"
import TooltipOffExample from "./TooltipOffExample.jsx"
import TooltipCustomExample from "./TooltipCustomExample.jsx"

ReactDOM.render(
  <BasicExample />,
  document.getElementById("basic-example")
)

// ReactDOM.render(
//   <AdvancedExample />,
//   document.getElementById("advanced-example")
// )

ReactDOM.render(
  <WidthExample />,
  document.getElementById("width-example")
)

ReactDOM.render(
  <ColorExample />,
  document.getElementById("color-example")
)

ReactDOM.render(
  <ScaleExample />,
  document.getElementById("scale-example")
)

ReactDOM.render(
  <ZoomExample />,
  document.getElementById("zoom-example")
)

ReactDOM.render(
  <ZoomNullExample />,
  document.getElementById("zoom-null-example")
)

ReactDOM.render(
  <TooltipDarkExample />,
  document.getElementById("tooltip-dark-example")
)

ReactDOM.render(
  <TooltipOffExample />,
  document.getElementById("tooltip-off-example")
)

ReactDOM.render(
  <TooltipCustomExample />,
  document.getElementById("tooltip-custom-example")
)
