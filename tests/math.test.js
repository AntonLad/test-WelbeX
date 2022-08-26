const { sum } = require("../helpers/math") 

describe('test of smth', function() {
  test('sum two 0 ', function () {
    expect(sum(0, 0)).toBe(0)
  })
  test('sum two numb ', function () {
    expect(sum(100, 1000)).toBe(1100)
  })
  test('sum two numb1 ', function () {
    expect(sum(Number.MAX_VALUE, Number.MAX_VALUE)).toBe('incorrect data')
  })
})