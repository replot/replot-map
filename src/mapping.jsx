import React from "react"
import US from "./countries/US.jsx"
import Chile from "./countries/Chile.jsx"
import World from "./countries/World.jsx"

function getMap(region, data, IDKey, weightKey, scale, colorKey, colorRange, colorCatgories, width) {

  let curMap
  if (region === "US") {
    curMap = (
      <US width={width} data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorRange={colorRange} colorCatgories={colorCatgories}/>
    )
  } else if (region === "Chile") {
    curMap = (
      <Chile width={width} data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorRange={colorRange} colorCatgories={colorCatgories}/>
    )
  } else if (region === "World") {
    curMap = (
    <World width={width} data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
      colorKey={colorKey} colorRange={colorRange} colorCatgories={colorCatgories}/>
    )
  }

  return curMap
}

export default getMap
