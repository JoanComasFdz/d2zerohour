function clearSecondWheel(singe, firstConsoleNumber, secondConsoleNumber) {
  // Make second wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #w2li` + i).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #wheel2 #cn-wrapper a`).removeClass(`active`);
  // Reset selected value
  // console1RightValue = ``;
  $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #wheel2 #cn-button`).html('');
  // Reset pair result ?
  $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #console${firstConsoleNumber}PairResult span`).html(`-`);

  $(`#${singe}TabContent #${singe}-console${firstConsoleNumber}${secondConsoleNumber} #nodeToActivateValue`).html('Nope');
  $(`#${singe}TabContent #${singe}-console${firstConsoleNumber}${secondConsoleNumber} #nodeToActivateValue`).css('color', 'gray')
}
