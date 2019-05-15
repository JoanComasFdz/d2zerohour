function clearThirdWheel(secondConsoleNumber, thirdWheelNumber) {
  // Make third wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#console1${secondConsoleNumber} #w${thirdWheelNumber}li${i}`).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#console1${secondConsoleNumber} #wheel${thirdWheelNumber} #cn-wrapper a`).removeClass(`active`);
  // Reset selected value
  // console1RightValue = ``
  $(`#console1${secondConsoleNumber} #wheel${thirdWheelNumber} #cn-button`).html(``);
  // Reset pair result ?
  $(`#console1${secondConsoleNumber} #console2PairResult span`).html(`-`);
}
