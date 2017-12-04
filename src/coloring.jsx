
class Coloring {

  constructor (IDList, IDKey, weightKey, scale, data, colorKey, colorRange, colorCatgories){
    this.IDList = IDList
    this.IDKey = IDKey
    this.weightKey = weightKey
    this.scale = scale
    this.colorKey = colorKey
    this.colorRange = colorRange
    this.colorCatgories = colorCatgories
    this.data = data.sort(function compare(a,b) {
      if (a.weight < b.weight) return -1
      if (a.weight > b.weight) return 1
      return 0
    })
  }

  /* Chose the right function based on props */
  generate() {
    if(this.colorKey){}
    if(this.colorRange){
      let range = this.getRange()
      // let count = this.getCount()
      let count = 100
      this.colorGradient = this.generateColor(this.colorRange[0], this.colorRange[1], count, range)
      return this.matchColorsToValues(this.colorGradient)
    }
    if(this.colorCatgories){}
  }

  getRange(){
    let max = this.data[0].weight
    let min = this.data[0].weight
    for (let dataPoint of this.data){
      if (dataPoint.weight > max) {
        max = dataPoint.weight
      }
      if (dataPoint.weight < min) {
        min = dataPoint.weight
      }
    }
    return {min: min, max: max}
  }

   hex (c) {
    let s = "0123456789abcdef"
    let i = parseInt (c)
    if (i == 0 || isNaN (c))
      return "00";
    i = Math.round (Math.min (Math.max (0, i), 255));
    return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16)
  }

  /* Convert an RGB triplet to a hex string */
   convertToHex (rgb) {
    return this.hex(rgb[0]) + this.hex(rgb[1]) +this.hex(rgb[2])
  }

  /* Remove '#' in color hex string */
   trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

  /* Convert a hex string to an RGB triplet */
   convertToRGB (hex) {
    let color = []
    color[0] = parseInt ((this.trim(hex)).substring (0, 2), 16)
    color[1] = parseInt ((this.trim(hex)).substring (2, 4), 16)
    color[2] = parseInt ((this.trim(hex)).substring (4, 6), 16)
    return color
  }

   generateColor(colorStart,colorEnd,colorCount, weightRange){

  	// The beginning of your gradient
  	let start = this.convertToRGB (colorStart)

  	// The end of your gradient
  	let end   = this.convertToRGB (colorEnd)

  	// The number of colors to compute
  	let len = colorCount;


  	//Alpha blending amount
  	let alpha = 0.0
  	let saida = []
    let minWeight = weightRange.min
    let weight, valueRatio, pow10
    if (this.scale === "lin") {
      valueRatio = (weightRange.max - weightRange.min) / (colorCount-1)
    } else if (this.scale === "log") {
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

      if (this.scale === "lin") {
        weight = parseFloat((minWeight + ((i) * valueRatio)).toFixed(8))
      } else if (this.scale === "log") {
        if (weightRange.min === 0) {
          pow10 = i * valueRatio
        } else {
          pow10 = Math.log10(weightRange.min) + i*valueRatio
        }
        weight = parseFloat((Math.pow(10,pow10)).toFixed(8))
      }

  		saida.push({
        color: '#' + this.convertToHex(c),
        weight: weight
      })
  	}
  	return saida
  }


  matchColorsToValues(colors) {
    let idToColor = {}
    let colorIndex = 0
    let IDs = new Set(this.IDList)

    for (let dataItem of this.data) {
      let weight = dataItem.weight
      while (weight > colors[colorIndex].weight) {
        colorIndex++
      }
      idToColor[dataItem.area] = {
        weight: weight,
        color: colors[colorIndex].color,
        raw: dataItem.raw
      }
      IDs.delete(dataItem.area)
    }

    // Handle IDs without supplied weights
    for (let id of IDs.values()) {
      idToColor[id] = {
        color: colors[0].color
      }
    }

    return idToColor
  }

  colorToDarkness(hex) {
    let color = this.convertToRGB(hex)
    let darkness = 1 - (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2])/255
    return darkness
  }

  isBackgroundDark() {
    let colorA = this.colorToDarkness(this.colorRange[0])
    let colorB = this.colorToDarkness(this.colorRange[1])
    return Math.min(colorA, colorB) < 0.2 && Math.max(colorA, colorB) < 0.8
  }
}

export default Coloring
