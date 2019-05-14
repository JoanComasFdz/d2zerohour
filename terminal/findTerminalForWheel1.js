/*
Name changes:

console1PairResult -> firstConsolePairResult
console2PairResult -> secondConsolePairResult
console3PairResult -> secondConsolePairResult

c1w4li             -> w3li              // Wheel 3 list item
wheel4             -> wheel3

console1LeftValue -> firstConsoleLeftValue
*/

// There is a click on first wheel.
// Oly firstConsoleLeftValue contains a value.
function findTerminalForWheel1(data, firstConsoleLeftValue, useLeftValueForThirdWheel) {
  const positionWhenSpliting = useLeftValueForThirdWheel ? 0 :  1
  const wheelNumber = useLeftValueForThirdWheel ? 3 : 4

  console.info(`Finding terminal for wheel 1 with third wheel numner '${wheelNumber}' and splitting position '${positionWhenSpliting}'...`)

  clearSecondWheel()
  clearThirdWheel(wheelNumber)

  const matchingRightValuesForFirstConsoleLeftValue = getFirstConsoleRightValuesMatchingTheLeftValue(data, firstConsoleLeftValue)

  activateValuesInSecondWheel(matchingRightValuesForFirstConsoleLeftValue)

  if (matchingRightValuesForFirstConsoleLeftValue.length === 0) {
    // There is no matching value on the second wheel.
    // Nothing else to do.
    console.info(`Finished finding terminal for wheel 1 because the are no matching values on the second wheel.`)
    return
  }

  if (matchingRightValuesForFirstConsoleLeftValue.length > 1) {
    // There is more than 1 matching value on the second wheel.
    // It needs to be clicked manually.
    // Nothing else to do.
    console.info(`Finished finding terminal for wheel 1 because the are '${matchingRightValuesForFirstConsoleLeftValue.length}' values matching on the second wheel. `)
    return
  }

  firstConsoleRightValue = matchingRightValuesForFirstConsoleLeftValue[0]
  firstConsolePair = firstConsoleLeftValue + '-' + firstConsoleRightValue
  console.info(`Found a single pair matching first console left value '${firstConsoleLeftValue}': ${firstConsolePair}`)
  
  $('#console1PairResult span').html(firstConsolePair); 
  $(`#wheel2 #cn-button`).html(firstConsoleRightValue);

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

function clearSecondWheel() {
  // Make second wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $('#console12 #w2li'+i).addClass("overlay")
  }

  // Remove yellow highight.
  $('#console12 #wheel2 #cn-wrapper a').removeClass('active');

  // Reset selected value
  console1RightValue = ''
  $('#console12 #wheel2 #cn-button').html(console1RightValue);

  // Reset pair result ?
  $('#console12 #console1PairResult span').html('-');
}

function clearThirdWheel(thirdWheelNumber) {
    // Make third wheel items look deactivated.
    for (let i = 1; i <= 12; i++) {
      $(`#console12 #w${thirdWheelNumber}li${i}`).addClass("overlay")
    }
  
    // Remove yellow highight.
    $(`#console12 #wheel${thirdWheelNumber} #cn-wrapper a`).removeClass('active');
  
    // Reset selected value
    console1RightValue = ''
    $(`#console12 #wheel${thirdWheelNumber} #cn-button`).html(console1RightValue);
  
    // Reset pair result ?
    $(`#console12 #console2PairResult span`).html('-');
}

function getFirstConsoleRightValuesMatchingTheLeftValue(data, firstConsoleLeftValue) {
  console.info(`Getting pairs where left value matches the first console selected value: ${firstConsoleLeftValue}...`)

  var matchingRightValues = []
  const firstConsolePairs = Object.keys(data)
  for (let i = 0; i < firstConsolePairs.length; i++) {
    const element = firstConsolePairs[i];
    const elementValues = element.split('-')
    const leftValue = elementValues[0]
    if (leftValue !== firstConsoleLeftValue) {
      console.info(`Discarding element ${JSON.stringify(element)} since its left value is not: ${firstConsoleLeftValue}.`)    
      continue
    }

    const firstConsoleMatchingRightValue = elementValues[1]
    console.info(`Adding matching second wheel right value '${firstConsoleMatchingRightValue}' since its left value is ${firstConsoleLeftValue}.`)
    matchingRightValues.push(firstConsoleMatchingRightValue)
  }

  return matchingRightValues
}

function activateValuesInSecondWheel(valuesToActivate) {
  console.info(`Activating in second wheel values belonging to first console selected value: ${JSON.stringify(valuesToActivate)}...`)

  for (let i = 0; i < valuesToActivate.length; i++) {
    const valueToActivate = valuesToActivate[i];
    $('#w2li'+valueToActivate).removeClass("overlay")
    console.info(`Activated value in second wheel: ${valueToActivate}.`)
  }
}

function getSecondConsolePairsForFirstConsolePair(secondConsoleData) {
  console.info(`Getting pairs for second console from first console pair childs: ${JSON.stringifysecondConsoleData}...`)

  const secondConsolePairs = Object.keys(secondConsoleData)

  return secondConsolePairs
}

function activateValuesInThirdWheel(secondConsolePairs, wheelNumber, positionWhenSpliting) {
  console.info(`Activating in third wheel values from: ${JSON.stringify(secondConsolePairs)}...`)

  for (let i = 0; i < secondConsolePairs.length; i++) {
    const pair = secondConsolePairs[i];
    console.info(pair)
    const pairValues = pair.split('-')
    const valueToActivate = pairValues[positionWhenSpliting]
    $(`#w${wheelNumber}li${valueToActivate}`).removeClass("overlay")
    console.info(`Activated value in third wheel: ${valueToActivate}.`)
  }
}