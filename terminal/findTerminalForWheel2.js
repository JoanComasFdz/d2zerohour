/*
Name changes:

console1PairResult -> firstConsolePairResult
console2PairResult -> secondConsolePairResult
console3PairResult -> secondConsolePairResult

c1w4li             -> w3li              // Wheel 3 list item
wheel4             -> wheel3

console1LeftValue -> firstConsoleLeftValue
*/

// There is a click on second wheel wheel.
// Oly firstConsoleLeftValue contains a value.
function findTerminalForWheel2(singe, secondConsoleNumber, data, firstConsoleLeftValue, firstConsoleRightValue, useLeftValueForThirdWheel) {
  const positionWhenSpliting = useLeftValueForThirdWheel ? 0 :  1
  const wheelNumber = useLeftValueForThirdWheel ? 3 : 4
  firstConsolePair = firstConsoleLeftValue + '-' + firstConsoleRightValue

  console.info(`Finding terminal for first console pair '${firstConsolePair}' with third wheel number '${wheelNumber}' and splitting position '${positionWhenSpliting}'...`)

  clearThirdWheel(secondConsoleNumber, wheelNumber)

  // There is no left and right variable naming from now on,
  // since it depends on the parameter positionWhenSpliting

  const secondConsolePairs = getSecondConsolePairsForFirstConsolePair(data[firstConsolePair])
  $(`#${singe}TabContent #console1${secondConsoleNumber} #console1PairResult span`).html(firstConsolePair);

  activateValuesInThirdWheel(secondConsolePairs, wheelNumber, positionWhenSpliting)

  if (secondConsolePairs.length === 0) {
    // There is no matching value on the third wheel.
    // Nothing else to do.
    console.info(`Finished finding terminal for wheel 1 because the are no matching values on the third wheel.`)
    return
  }

  if (secondConsolePairs.length > 1) {
    // There is more than 1 matching value on the third wheel.
    // It needs to be clicked manually.
    // Nothing else to do.
    console.info(`Finished finding terminal for wheel 1 because the are '${secondConsolePairs.length}' values matching on the third wheel. `)
    return
  }

  secondConsolePair = secondConsolePairs[0]
  secondConsoleValue = secondConsolePair.split('-')[positionWhenSpliting]
  console.info(`Found a single pair in the second console matching first console pair '${firstConsolePair}': ${secondConsolePair}`)
  
  $(`#${singe}TabContent #console1${secondConsoleNumber} #console2PairResult span`).html(secondConsolePair);
  $(`#${singe}TabContent #console1${secondConsoleNumber} #wheel${wheelNumber} #cn-button`).html(secondConsoleValue);

  const terminal = data[firstConsolePair][secondConsolePair]
  console.info (`Terminal is ${terminal}`)
  $(`#${singe}TabContent #console1${secondConsoleNumber} #nodeToActivateValue`).html(terminal);
  
  color = terminal.split(' ')[0];
  $(`#${singe}TabContent #console1${secondConsoleNumber} #nodeToActivateValue`).css('color', color)

  return
}