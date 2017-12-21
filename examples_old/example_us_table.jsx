import React from "react"
import ReactDOM from "react-dom"
import {Table, USA} from "../index.js"

ReactDOM.render(
  <Table paths={USA} />,
  document.getElementById("react-app")
)
