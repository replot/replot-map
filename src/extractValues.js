const extractValues = (data, geoCode, weightKey) => {
  // extrac the values and keys to create colors
  let values = []
  for (let i = 0; i < data.length; i ++){
    values.push({
      area: data[i][geoCode],
      weight: data[i][weightKey],
      raw: data[i]
    })
  }
  return values
}

export default extractValues
