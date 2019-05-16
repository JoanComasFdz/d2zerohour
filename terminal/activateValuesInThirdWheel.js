function activateValuesInThirdWheel(firstConsoleNumber, secondConsoleNumber, secondConsolePairs, wheelNumber, positionWhenSpliting) {
  console.info(`Activating in third wheel ('${wheelNumber}', array position '${positionWhenSpliting}') values from pair: ${JSON.stringify(secondConsolePairs)}...`);
  for (let i = 0; i < secondConsolePairs.length; i++) {
    const pair = secondConsolePairs[i];
    console.info(pair);
    const pairValues = pair.split('-');
    const valueToActivate = pairValues[positionWhenSpliting];
    $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #w${wheelNumber}li${valueToActivate}`).removeClass("overlay");
    console.info(`Activated value in third wheel: ${valueToActivate}.`);
  }
}
