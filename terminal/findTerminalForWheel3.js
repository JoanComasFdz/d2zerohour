/*
Name changes:

console1PairResult -> firstConsolePairResult
console2PairResult -> secondConsolePairResult
console3PairResult -> secondConsolePairResult

c1w4li             -> w3li              // Wheel 3 list item
wheel4             -> wheel3

console1LeftValue -> firstConsoleLeftValue
*/

// There is a click on third wheel.
function findTerminalForWheel3(secondConsoleNumber, data, firstConsoleLeftValue, firstConsoleRightValue, secondConsoleValue, useLeftValueForThirdWheel) {
  const positionWhenSpliting = useLeftValueForThirdWheel ? 0 :  1
  const wheelNumber = useLeftValueForThirdWheel ? 3 : 4
  firstConsolePair = firstConsoleLeftValue + '-' + firstConsoleRightValue

  console.info(`Finding terminal for first console pair '${firstConsolePair}' with third wheel number '${wheelNumber}' and splitting position '${positionWhenSpliting}'...`)

  // There is no left and right variable naming from now on,
  // since it depends on the parameter positionWhenSpliting

  const secondConsolePair = getSecondConsolePair(data[firstConsolePair], secondConsoleValue, positionWhenSpliting)
  secondConsoleValue = secondConsolePair.split('-')[positionWhenSpliting]

  console.info(`Found a single pair in the second console matching first console pair '${firstConsolePair}': ${secondConsolePair}`)
    
  $(`#console1${secondConsoleNumber} #console2PairResult span`).html(secondConsolePair); 
  
  const terminal = data[firstConsolePair][secondConsolePair]
  console.info (`Terminal is ${terminal}`)
  $(`#console1${secondConsoleNumber} #nodeToActivateValue`).html(terminal);
  
  color = terminal.split(' ')[0];
  $(`#console1${secondConsoleNumber} #nodeToActivateValue`).css('color', color)

  return
}

function getSecondConsolePair(secondConsoleData, secondConsoleValue, positionWhenSpliting) {
  console.info(`Getting pairs for second console from first console pair childs: ${JSON.stringifysecondConsoleData}...`)

  const secondConsolePairs = Object.keys(secondConsoleData)
  for (let i = 0; i < secondConsolePairs.length; i++) {
    const pair = secondConsolePairs[i];
    const pairValues = pair.split('-')
    const pairValueToMatch = pairValues[positionWhenSpliting]
    if (pairValueToMatch === secondConsoleValue) {
      return pair
    }
  }

  return 'pair not found'
}