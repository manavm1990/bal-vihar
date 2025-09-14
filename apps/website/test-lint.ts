// Test file with intentional linting violations
const unused_variable = 'hello'
var oldVar = 'should use const'
let x: any = 'no explicit any allowed'

function badFunction() {
  console.log('bad spacing and console.log not allowed')
  return x
}

// Missing semicolon, bad formatting
const obj = { a: 1, b: 2 }
