import React from "react"
import US from "./countries/US.jsx"
import World from "./countries/World.jsx"
import Region from "./Region.jsx"
import getAfghanistan from "./maps/afghanistan.js"
import getAlbania from "./maps/albania.js"
import getAmericanSamoa from "./maps/americanSamoa.js"
import getAndorra from "./maps/andorra.js"
import getAngola from "./maps/angola.js"
import getAnguilla from "./maps/anguilla.js"
import getAntiguaBarbuda from "./maps/antiguaBarbuda.js"
import getArgentina from "./maps/argentina.js"
import getArmenia from "./maps/armenia.js"
import getAruba from "./maps/aruba.js"
import getAustralia from "./maps/australia.js"
import getAustria from "./maps/austria.js"
import getAzerbaijan from "./maps/azerbaijan.js"
import getChile from "./maps/chile.js"
import getJapan from "./maps/japan.js"

function getMap(region, data, IDKey, weightKey, scale, colorKey, colorRange, colorCatgories, width, height, activateTooltip, deactivateTooltip) {
  let curMap
  if (region === "US") {
    curMap = (
      <US width={width} height={height} data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorRange={colorRange} colorCatgories={colorCatgories}
        activateTooltip={activateTooltip} deactivateTooltip={deactivateTooltip}/>
    )
  } else if (region === "World") {
    curMap = (
      <World width={width} height={height} data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorRange={colorRange} colorCatgories={colorCatgories}
        activateTooltip={activateTooltip} deactivateTooltip={deactivateTooltip}/>
    )
  } else {
    let regionMap
    switch (region) {
      case "Afghanistan":
        regionMap = getAfghanistan()
        break
      case "Albania":
        regionMap = getAlbania()
        break
      case "AmericanSamoa":
        regionMap = getAmericanSamoa()
        break
      case "Andorra":
        regionMap = getAndorra()
        break
      case "Angola":
        regionMap = getAngola()
        break
      case "Anguilla":
        regionMap = getAnguilla()
        break
      case "AntiguaBarbuda":
        regionMap = getAntiguaBarbuda()
        break
      case "Argentina":
        regionMap = getArgentina()
        break
      case "Armenia":
        regionMap = getArmenia()
        break
      case "Aruba":
        regionMap = getAruba()
        break
      case "Australia":
        regionMap = getAustralia()
        break
      case "Austria":
        regionMap = getAustria()
        break
      case "Azerbaijan":
        regionMap = getAzerbaijan()
        break
      case "Chile":
        regionMap = getChile()
        break
      case "Japan":
        regionMap = getJapan()
        break
      default:
        break
    }
    curMap = (
      <Region regionMap={regionMap}
        width={width} height={height} data={data} IDKey={IDKey} weightKey={weightKey} scale={scale}
        colorKey={colorKey} colorRange={colorRange} colorCatgories={colorCatgories}
        activateTooltip={activateTooltip} deactivateTooltip={deactivateTooltip}/>
    )
  }

  return curMap
}

export default getMap
