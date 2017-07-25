
class Coloring {

  constructor (data, valueKey, colorKey, colorLinear, colorCatgories){
    this.data = data
    this.valueKey = valueKey
    this.colorKey = colorKey
    this.colorLinear = colorLinear
    this.colorCatgories = colorCatgories
  }

  /* Chose the right function based on props */
  generate() {
    if(this.colorKey){}
    if(this.colorLinear){
      /* Get the max and min of values  */
      // let count = this.getCount()
      console.log(this.data)
      let count = 100
      let colors = this.generateColor(this.colorLinear[0], this.colorLinear[1], count)
      return this.matchColorsToValues(colors)
    }
    if(this.colorCatgories){}
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

   generateColor(colorStart,colorEnd,colorCount){

  	// The beginning of your gradient
  	let start = this.convertToRGB (colorStart)

  	// The end of your gradient
  	let end   = this.convertToRGB (colorEnd)

  	// The number of colors to compute
  	let len = colorCount;

  	//Alpha blending amount
  	let alpha = 0.0
  	let saida = []

  	for (let i = 0; i < len; i++) {
  		let c = []
  		alpha += (1.0/len)

  		c[0] = start[0] * alpha + (1 - alpha) * end[0]
  		c[1] = start[1] * alpha + (1 - alpha) * end[1]
  		c[2] = start[2] * alpha + (1 - alpha) * end[2]

  		saida.push({
        color: '#' + this.convertToHex(c),
        value: i + 1
      })
  	}

  	return saida
  }


  matchColorsToValues(colors) {
    let merged = []
    let value = 0

    for (let i = 0; i < this.data.length; i++) {
        value = this.data[i].value
        for (let j = 0; j < colors.length; j++) {
            if (colors[j].value == Math.round(value)) {
                  merged.push({
                    value: value,
                    key: this.data[i].area,
                    color: colors[j].color
                  })
                }
            }
        }

    merged.sort(function(a, b){
    if(a.key < b.key) return -1
    if(a.key > b.key) return 1
    return 0
    })

      return merged
  }

}

export default Coloring
