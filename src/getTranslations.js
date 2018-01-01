const getTranslations = (width, height, scale, zoomIDKey, zoomPath) => {
  if (zoomIDKey && zoomPath) {
    // If zoomID is specified, translate the map to center on zoomID.
    let pathBBox = zoomPath.getBBox()
    let pathMidX = (pathBBox.x + pathBBox.width / 2) * scale
    let pathMidY = (pathBBox.y + pathBBox.height / 2) * scale
    return [(width / 2) - pathMidX, (height / 2) - pathMidY] //[x, y]
  }
  return [0, 0] //No translations needed.
}

export default getTranslations
