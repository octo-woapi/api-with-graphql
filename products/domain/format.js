const DEFAULT_PRICE = 0
const DEFAULT_WEIGHT = 0

function formatInputs (inputs) {
  if (!inputs.price) {
    inputs.price = DEFAULT_PRICE
  } else {
    inputs.price = parseFloat(inputs.price)
  }
  if (!inputs.weight) {
    inputs.weight = DEFAULT_WEIGHT
  } else {
    inputs.weight = parseFloat(inputs.weight)
  }
  return inputs
}

module.exports = formatInputs
