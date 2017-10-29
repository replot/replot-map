import React from "react"
import ReactDOM from "react-dom"
import {Table} from "../src/index.jsx"
import USA from "./samples/USA.js"

ReactDOM.render(
  <Table paths={USA.svg.g.path} />,
  document.getElementById("react-app")
)
