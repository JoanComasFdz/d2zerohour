function activateValuesInSecondWheel(secondConsoleNumber, valuesToActivate) {
  console.info(`Activating in second wheel values belonging to first console selected value: ${JSON.stringify(valuesToActivate)}...`);
  for (let i = 0; i < valuesToActivate.length; i++) {
    const valueToActivate = valuesToActivate[i];
    $(`#console1${secondConsoleNumber} #wheel2 #w2li` + valueToActivate).removeClass("overlay");
    console.info(`Activated value in second wheel: ${valueToActivate}.`);
  }
}
