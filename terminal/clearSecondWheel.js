function clearSecondWheel() {
  // Make second wheel items look deactivated.
  for (let i = 1; i <= 12; i++) {
    $('#console12 #w2li' + i).addClass("overlay");
  }
  // Remove yellow highight.
  $('#console12 #wheel2 #cn-wrapper a').removeClass('active');
  // Reset selected value
  console1RightValue = '';
  $('#console12 #wheel2 #cn-button').html(console1RightValue);
  // Reset pair result ?
  $('#console12 #console1PairResult span').html('-');
}
