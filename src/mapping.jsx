import React from "react"
import US from "./countries/US.jsx"
import Chile from "./countries/Chile.jsx"
import World from "./countries/World.jsx"

function getMap(region, data, IDKey, weightKey, scale, colorKey, colorLinear, colorCatgories) {

  let curMap
  if (region === "US") {
    curMap = (
      <US data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorLinear={colorLinear} colorCatgories={colorCatgories}/>
    )
  } else if (region === "Chile") {
    curMap = (
      <Chile data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorLinear={colorLinear} colorCatgories={colorCatgories}/>
    )
  } else if (region === "World") {
    curMap = (
    <World data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
      colorKey={colorKey} colorLinear={colorLinear} colorCatgories={colorCatgories}/>
    )
  }

  return curMap
}

export default getMap
