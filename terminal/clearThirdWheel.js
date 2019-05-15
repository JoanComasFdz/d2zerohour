function clearThirdWheel(thirdWheelNumber) {
  // Make third wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $(`#console12 #w${thirdWheelNumber}li${i}`).addClass("overlay");
  }
  // Remove yellow highight.
  $(`#console12 #wheel${thirdWheelNumber} #cn-wrapper a`).removeClass('active');
  // Reset selected value
  // console1RightValue = ''
  $(`#console12 #wheel${thirdWheelNumber} #cn-button`).html('');
  // Reset pair result ?
  $(`#console12 #console2PairResult span`).html('-');
}
