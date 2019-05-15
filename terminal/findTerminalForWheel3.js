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
function findTerminalForWheel3(data, firstConsoleLeftValue, firstConsoleRightValue, secondConsoleValue, useLeftValueForThirdWheel) {
  const positionWhenSpliting = useLeftValueForThirdWheel ? 0 :  1
  const wheelNumber = useLeftValueForThirdWheel ? 3 : 4
  firstConsolePair = firstConsoleLeftValue + '-' + firstConsoleRightValue

  console.info(`Finding terminal for first console pair '${firstConsolePair}' with third wheel number '${wheelNumber}' and splitting position '${positionWhenSpliting}'...`)

  // There is no left and right variable naming from now on,
  // since it depends on the parameter positionWhenSpliting

  const secondConsolePair = getSecondConsolePair(data[firstConsolePair], secondConsoleValue, positionWhenSpliting)
  secondConsoleValue = secondConsolePair.split('-')[positionWhenSpliting]

  console.info(`Found a single pair in the second console matching first console pair '${firstConsolePair}': ${secondConsolePair}`)
    
  $('#console2PairResult span').html(firstConsolePair); 
  
  const terminal = data[firstConsolePair][secondConsolePair]
  console.info (`Terminal is ${terminal}`)
  $('#nodeToActivateValue').html(terminal);
  color = terminal.split(' ')[0];
  var nodeToActivate = document.getElementById('nodeToActivateValue');
  nodeToActivate.style.color = color;

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

function activateValuesInThirdWheel(secondConsolePairs, wheelNumber, positionWhenSpliting) {
  console.info(`Activating in third wheel ('${wheelNumber}', array position '${positionWhenSpliting}') values from pair: ${JSON.stringify(secondConsolePairs)}...`)

  for (let i = 0; i < secondConsolePairs.length; i++) {
    const pair = secondConsolePairs[i];
    console.info(pair)
    const pairValues = pair.split('-')
    const valueToActivate = pairValues[positionWhenSpliting]
    $(`#w${wheelNumber}li${valueToActivate}`).removeClass("overlay")
    console.info(`Activated value in third wheel: ${valueToActivate}.`)
  }
}