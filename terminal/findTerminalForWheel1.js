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

  clearSecondWheel()
  clearThirdWheel(wheelNumber)

  const matchingRightValues = getFirstConsoleRightValuesMatchingTheLeftValue(data, firstConsoleLeftValue)

  activateValuesInSecondWheel(matchingRightValues)

  if (matchingRightValues.length === 0) {
    // There is no matching value on the second wheel.
    // Nothing else to do.
    console.info(`Finished finding terminal for wheel 1 because the are no matching values on the second wheel.`)
    return
  }

  if (matchingRightValues.length > 1) {
    // There is more than 1 matching value on the second wheel.
    // It needs to be clicked manually.
    // Nothing else to do.
    console.info(`Finished finding terminal for wheel 1 because the are '${matchingRightValues.length}' values matching on the second wheel. `)
    return
  }

  firstConsolePair = matchingRightValues[0]
  console.info(`Found a single pair matching first console left value '${firstConsoleLeftValue}': ${firstConsolePair}`)

  $('#firstConsolePairResult span').html(firstConsolePair); 


  return


  firstConsolePair =  firstConsoleLeftValue + '-' + potentialFirstConsoleRightValue
  console.info(`firstConsolePair = ${firstConsolePair}`)
  $('#firstConsolePairResult span').html(firstConsolePair);

  if(firstConsolePairKeys.length == 1)
  {
    // Only one possibility found under firstConsolePair, so no need to search further,
    // just use that one.
    const key = firstConsolePairKeys[0]
    const element = data[firstConsolePair][key]
    console.info(`There is only one possible combo, so lets print this: ${JSON.stringify(element)}`)
    $('#nodeToActivateValue').html(element);
    color = element.split(' ')[0];
    var nodeToActivate = document.getElementById('nodeToActivateValue');
    nodeToActivate.style.color = color;

    secondConsoleValueToSelect = key.split('-')[positionWhenSpliting]
    $(`#wheel${wheelNumber} #cn-button`).html(secondConsoleValueToSelect);
    $('#secondConsolePairResult span').html(key);
    firstConsolePair = ''

    console.info(`Console 1 Pair has only one combo and it has been automatically selected: ${JSON.stringify(element)}`)

    return
  }

  console.info(`Console 1 has more that 1 combo.`)
  // Console 1 has more than 1 combos.

  secondConsolePair =  secondConsoleLeftValue + '-' + secondConsoleRightValue 
  console.info(`secondConsolePair = ${secondConsolePair}`)
  $('#secondConsolePairResult span').html(secondConsolePair);

  thirdWheelSelectedValue = secondConsolePair.split('-')[positionWhenSpliting]
  if (secondConsolePair.length > 1 && thirdWheelSelectedValue !== '')  {

    console.info(`Wheel 3 value has been clicked, see if there is only one combo with it...`)

    var elementsMatchingThirdWheelValue = 0
    var lastElementMatchingThirdWheelValue = ''
    for (let i = 0; i < firstConsolePairKeys.length; i++) {
      const element = firstConsolePairKeys[i];
      var elementPotentialMatchingValue = element.split('-')[positionWhenSpliting]
      console.info(`Analyzing element: ${JSON.stringify(element)}, does it match with wheel 3 value ${thirdWheelSelectedValue}?`)
      if (elementPotentialMatchingValue === thirdWheelSelectedValue  ) {
        elementsMatchingThirdWheelValue++
        lastElementMatchingThirdWheelValue = element
        console.info(`Yes, element: ${JSON.stringify(element)} matches ${thirdWheelSelectedValue }.`)
      } else {
        console.info(`No, element: ${JSON.stringify(element)} does not match ${thirdWheelSelectedValue }.`)

      }
    }

    if (elementsMatchingThirdWheelValue === 1) {
      console.info (`There is only 1 combo matching ${thirdWheelSelectedValue }, select it automatically: ${lastElementMatchingThirdWheelValue}`)
      secondConsolePair = lastElementMatchingThirdWheelValue
      $('#secondConsolePairResult span').html(secondConsolePair);
      const terminal = data[firstConsolePair][secondConsolePair]
      console.info (`Terminal is ${terminal}`)
      $('#nodeToActivateValue').html(terminal);
      color = terminal.split(' ')[0];
      var nodeToActivate = document.getElementById('nodeToActivateValue');
      nodeToActivate.style.color = color;
      
      return
    }
  }

  console.info(`Console 1 pair exists, has more than one combo, and the console 2 left value has more than one combo...`)

  if (!data[firstConsolePair]) {
    console.info('ENTERED VERY LAST IF !!!!')
  } else {
    console.info('ENTERED VERY LAST IF ELSE !!!!')
    $('#nodeToActivateValue').html('Ok, select next pair.');
    var nodeToActivate = document.getElementById('nodeToActivateValue');
    nodeToActivate.style.color = 'green'; 

    if(data[firstConsolePair][secondConsolePair]) {
      console.info("Console 1 Console 2 pair found!")
      $('#nodeToActivateValue').html(data[firstConsolePair][secondConsolePair]);
      color = data[firstConsolePair][secondConsolePair].split(' ')[0];
      var nodeToActivate = document.getElementById('nodeToActivateValue');
      nodeToActivate.style.color = color; 
    } else {
      console.info(`Console 1 Console 3 pair NOT found: ${firstConsolePair} and ${secondConsolePair}`)
      $('#nodeToActivateValue').html('Nope');
      var nodeToActivate = document.getElementById('nodeToActivateValue');
      nodeToActivate.style.color = 'gray'; 
    }
  }
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

