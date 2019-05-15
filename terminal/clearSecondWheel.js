function clearSecondWheel(secondConsoleNumber) {
  // Make second wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#${singe}-console1${secondConsoleNumber} #w2li` + i).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#${singe}-console1${secondConsoleNumber} #wheel2 #cn-wrapper a`).removeClass(`active`);
  // Reset selected value
  console1RightValue = ``;
  $(`#${singe}-console1${secondConsoleNumber} #wheel2 #cn-button`).html(console1RightValue);
  // Reset pair result ?
  $(`#${singe}-console1${secondConsoleNumber} #console1PairResult span`).html(`-`);
}
