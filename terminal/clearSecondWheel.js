function clearSecondWheel(secondConsoleNumber) {
  // Make second wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#console1${secondConsoleNumber} #w2li` + i).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#console1${secondConsoleNumber} #wheel2 #cn-wrapper a`).removeClass(`active`);
  // Reset selected value
  console1RightValue = ``;
  $(`#console1${secondConsoleNumber} #wheel2 #cn-button`).html(console1RightValue);
  // Reset pair result ?
  $(`#console1${secondConsoleNumber} #console1PairResult span`).html(`-`);
}
