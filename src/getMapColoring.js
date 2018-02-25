const generateGradient = (scale, data, colorKey, colorRange, colorCatgories) => {
  if(colorKey){}

  if(colorRange){
    let range = getRange(data)
    let count = 100
    return generateColor(colorRange[0], colorRange[1], count, range, scale)
  }

  if(colorCatgories){}
}

const getRange = (data) => {
  let max = data[0].weight
  let min = data[0].weight
  for (let dataPoint of data){
    if (dataPoint.weight > max) {
      max = dataPoint.weight
    }
    if (dataPoint.weight < min) {
      min = dataPoint.weight
    }
  }
  return {min: min, max: max}
}

const generateColor = (colorStart,colorEnd,colorCount, weightRange, scale) => {

	// The beginning of your gradient
	let start = convertToRGB(colorStart)

	// The end of your gradient
	let end = convertToRGB(colorEnd)

	// The number of colors to compute
	let len = colorCount;

	//Alpha blending amount
	let alpha = 0.0
	let saida = []
  let minWeight = weightRange.min
  let weight, valueRatio, pow10
  if (scale === "lin") {
    valueRatio = (weightRange.max - weightRange.min) / (colorCount-1)
  } else if (scale === "log") {
    if (weightRange.min === 0) {
      valueRatio = Math.log10(weightRange.max) / (colorCount-1)
    } else {
      valueRatio = (Math.log10(weightRange.max) - Math.log10(weightRange.min)) / (colorCount-1)
    }
  }

	for (let i = 0; i < len; i++) {
		let c = []
		alpha += (1.0/len)

		c[0] = start[0] * alpha + (1 - alpha) * end[0]
		c[1] = start[1] * alpha + (1 - alpha) * end[1]
		c[2] = start[2] * alpha + (1 - alpha) * end[2]

    if (scale === "lin") {
      weight = parseFloat((minWeight + ((i) * valueRatio)).toFixed(8))
    } else if (scale === "log") {
      if (weightRange.min === 0) {
        pow10 = i * valueRatio
      } else {
        pow10 = Math.log10(weightRange.min) + i*valueRatio
      }
      weight = parseFloat((Math.pow(10,pow10)).toFixed(8))
    }

		saida.push({
      color: '#' + convertToHex(c),
      weight: weight
    })
	}
	return saida
}

const matchColorsToValues = (colors, noDataColor, noDataOpacity, IDList, data) => {
  let sortedData = data.sort(function compare(a,b) {
    if (a.weight < b.weight) return -1
    if (a.weight > b.weight) return 1
    return 0
  })

  let idToColor = {}
  let colorIndex = 0
  let IDs = new Set(IDList)

  for (let dataItem of sortedData) {
    let weight = dataItem.weight
    while (colorIndex < 99 && weight > colors[colorIndex].weight) {
      colorIndex++
    }
    idToColor[dataItem.area] = {
      weight: weight,
      color: colors[colorIndex].color,
      opacity: 1,
      raw: dataItem.raw
    }
    IDs.delete(dataItem.area)
  }

  // Handle IDs without supplied weights
  for (let id of IDs.values()) {
    idToColor[id] = {
      color: (noDataColor ? noDataColor : colors[0].color),
      opacity: noDataOpacity
    }
  }

  return idToColor
}

/* Convert a hex string to an RGB triplet */
const convertToRGB = (hex) => {
  let color = []
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16)
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16)
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16)
  return color
}

/* Convert an RGB triplet to a hex string */
const convertToHex = (rgb) => {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2])
}

/* Remove '#' in color hex string */
const trim = (s) => {
  return (s.charAt(0) == '#') ? s.substring(1, 7) : s
}

const hex = (c) => {
  let s = "0123456789abcdef"
  let i = parseInt (c)
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16)
}

const isBackgroundDark = (colorRange) => {
  let colorA = colorToDarkness(colorRange[0])
  let colorB = colorToDarkness(colorRange[1])
  return Math.min(colorA, colorB) < 0.2 && Math.max(colorA, colorB) < 0.8
}

const colorToDarkness = (hex) => {
  let color = convertToRGB(hex)
  let darkness = 1 - (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2])/255
  return darkness
}

export {generateGradient, matchColorsToValues, isBackgroundDark}
