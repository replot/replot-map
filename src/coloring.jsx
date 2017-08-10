
class Coloring {

  constructor (IDList, IDKey, weightKey, scale, data, colorKey, colorLinear, colorCatgories){
    this.IDList = IDList
    this.IDKey = IDKey
    this.weightKey = weightKey
    this.scale = scale
    this.colorKey = colorKey
    this.colorLinear = colorLinear
    this.colorCatgories = colorCatgories
    this.data = data.sort(function compare(a,b) {
      if (a.area < b.area) return -1
      if (a.area > b.area) return 1
      return 0
    })
  }

  /* Chose the right function based on props */
  generate() {
    if(this.colorKey){}
    if(this.colorLinear){
      let range = this.getRange()
      // let count = this.getCount()
      let count = 100
      let colors = this.generateColor(this.colorLinear[0], this.colorLinear[1], count, range)
      return this.matchColorsToValues(colors)
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
    let weight, valueRatio, pow10
    if (this.scale === "lin") {
      valueRatio = (weightRange.max - weightRange.min) / colorCount
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
        weight = parseFloat(((i+1) * valueRatio).toFixed(4))
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

    console.log(saida)

  	return saida
  }


  matchColorsToValues(colors) {
    let mapped = []
    let area = {}
    let weight = 0
    let dataIndex = 0

    for (let i = 0; i < this.IDList.length; i++) {
      area = {}
      if (this.IDList[i] === this.data[dataIndex].area) {
        dataIndex += 1
        weight = this.data[dataIndex-1].weight
        for (let j = 0; j <= colors.length; j ++){
          if (weight <= colors[j].weight) {
            mapped.push({
              weight: weight,
              key: this.IDList[i],
              color: colors[j].color
            })
            break
          }
        }
      } else {
        mapped.push({
          weight: 0,
          key: this.IDList[i],
          color: colors[0].color
        })
      }
    }

    return mapped
  }

}

export default Coloring
