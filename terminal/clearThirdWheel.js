function clearThirdWheel(secondConsoleNumber, thirdWheelNumber) {
  // Make third wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#${singe}-console1${secondConsoleNumber} #w${thirdWheelNumber}li${i}`).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#${singe}-console1${secondConsoleNumber} #wheel${thirdWheelNumber} #cn-wrapper a`).removeClass(`active`);
  // Reset selected value
  // console1RightValue = ``
  $(`#${singe}-console1${secondConsoleNumber} #wheel${thirdWheelNumber} #cn-button`).html(``);
  // Reset pair result ?
  $(`#${singe}-console1${secondConsoleNumber} #console2PairResult span`).html(`-`);
}
