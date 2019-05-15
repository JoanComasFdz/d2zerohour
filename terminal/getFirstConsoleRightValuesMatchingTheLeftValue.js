function getFirstConsoleRightValuesMatchingTheLeftValue(data, firstConsoleLeftValue) {
  console.info(`Getting pairs where left value matches the first console selected value: ${firstConsoleLeftValue}...`);
  var matchingRightValues = [];
  const firstConsolePairs = Object.keys(data);
  for (let i = 0; i < firstConsolePairs.length; i++) {
    const element = firstConsolePairs[i];
    const elementValues = element.split('-');
    const leftValue = elementValues[0];
    if (leftValue !== firstConsoleLeftValue) {
      console.info(`Discarding element ${JSON.stringify(element)} since its left value is not: ${firstConsoleLeftValue}.`);
      continue;
    }
    const firstConsoleMatchingRightValue = elementValues[1];
    console.info(`Adding matching second wheel right value '${firstConsoleMatchingRightValue}' since its left value is ${firstConsoleLeftValue}.`);
    matchingRightValues.push(firstConsoleMatchingRightValue);
  }
  return matchingRightValues;
}
