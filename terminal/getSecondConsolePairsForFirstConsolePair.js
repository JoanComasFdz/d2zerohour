function getSecondConsolePairsForFirstConsolePair(secondConsoleData) {
  console.info(`Getting pairs for second console from first console pair childs: ${JSON.stringify(secondConsoleData)}...`);
  const secondConsolePairs = Object.keys(secondConsoleData);
  return secondConsolePairs;
}
