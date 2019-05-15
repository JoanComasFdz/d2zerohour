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
function findTerminalForWheel2(data, firstConsoleLeftValue, firstConsoleRightValue, useLeftValueForThirdWheel) {
  const positionWhenSpliting = useLeftValueForThirdWheel ? 0 :  1
  const wheelNumber = useLeftValueForThirdWheel ? 3 : 4
  firstConsolePair = firstConsoleLeftValue + '-' + firstConsoleRightValue

  console.info(`Finding terminal for first console pair '${firstConsolePair}' with third wheel number '${wheelNumber}' and splitting position '${positionWhenSpliting}'...`)

  clearThirdWheel(wheelNumber)

  // There is no left and right variable naming from now on,
  // since it depends on the parameter positionWhenSpliting

  const secondConsolePairs = getSecondConsolePairsForFirstConsolePair(data[firstConsolePair])

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
  
  $('#console2PairResult span').html(firstConsolePair); 
  $(`#wheel${wheelNumber} #cn-button`).html(secondConsoleValue);

  const terminal = data[firstConsolePair][secondConsolePair]
  console.info (`Terminal is ${terminal}`)
  $('#nodeToActivateValue').html(terminal);
  color = terminal.split(' ')[0];
  var nodeToActivate = document.getElementById('nodeToActivateValue');
  nodeToActivate.style.color = color;

  return
}

function clearThirdWheel(thirdWheelNumber) {
    // Make third wheel items look deactivated.
    for (let i = 1; i <= 12; i++) {
      $(`#console12 #w${thirdWheelNumber}li${i}`).addClass("overlay")
    }
  
    // Remove yellow highight.
    $(`#console12 #wheel${thirdWheelNumber} #cn-wrapper a`).removeClass('active');
  
    // Reset selected value
    // console1RightValue = ''
    $(`#console12 #wheel${thirdWheelNumber} #cn-button`).html('');
  
    // Reset pair result ?
    $(`#console12 #console2PairResult span`).html('-');
}

function getSecondConsolePairsForFirstConsolePair(secondConsoleData) {
  console.info(`Getting pairs for second console from first console pair childs: ${JSON.stringifysecondConsoleData}...`)

  const secondConsolePairs = Object.keys(secondConsoleData)

  return secondConsolePairs
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