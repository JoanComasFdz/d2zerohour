function clearThirdWheel(singe, firstConsoleNumber, secondConsoleNumber, thirdWheelNumber) {
  // Make third wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #w${thirdWheelNumber}li${i}`).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #wheel${thirdWheelNumber} #cn-wrapper a`).removeClass(`active`);
  // Reset selected value
  // console1RightValue = ``
  $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #wheel${thirdWheelNumber} #cn-button`).html(``);
  // Reset pair result ?
  $(`#${singe}-console${firstConsoleNumber}${secondConsoleNumber} #console2PairResult span`).html(`-`);

  $(`#${singe}TabContent #${singe}-console${firstConsoleNumber}${secondConsoleNumber} #nodeToActivateValue`).html('Nope');
  $(`#${singe}TabContent #${singe}-console${firstConsoleNumber}${secondConsoleNumber} #nodeToActivateValue`).css('color', 'gray')
  
}
