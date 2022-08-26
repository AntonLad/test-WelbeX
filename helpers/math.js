exports.sum = function sum(a, b) {
  if (a === Number.MAX_VALUE) return 'incorrect data'
  if (b === Number.MAX_VALUE) return 'incorrect data'
  const res = a + b
  if (res === Infinity) {
    return 'incorrect data'
  }
  return res 
}

exports.sub = function sum(a, b) {
  return a - b 
}



