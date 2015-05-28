exports.int = function int(min, max){
  let range = max - min + 1
  return min + Math.floor(Math.random() * range)
}
