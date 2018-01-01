const extractValues = (data, IDKey, weightKey) => {
  // extrac the values and keys to create colors
  let values = []
  for (let i = 0; i < data.length; i ++){
    values.push({
      area: data[i][IDKey],
      weight: data[i][weightKey],
      raw: data[i]
    })
  }
  return values
}

export default extractValues
