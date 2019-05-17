console.info(`Using singe: ${singe}`)

var console1Pair = ``
var console2Pair = ``

var console1LeftValue = ``
var console1RightValue = ``

var console2LeftValue = ``
var console2RightValue = ``

var dataForConsoles1And2 = parseCSVForConsole1And(2)

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  findTerminalForWheel1(singe, 1, 2, dataForConsoles1And2, console1LeftValue, false)
}

function wheel2Clicked() {
  findTerminalForWheel2(singe, 1, 2, dataForConsoles1And2, console1LeftValue, console1RightValue, false)
}

function wheel4Clicked() {
  findTerminalForWheel3(singe, 1, 2, dataForConsoles1And2, console1LeftValue, console1RightValue, console2RightValue, false)
}

function c1w1ClickHandler(event) {
  event.preventDefault();
  console1LeftValue = $(this).attr("data-number");
  $(`#${singe}-console12 #wheel1 #cn-button`).html(console1LeftValue);

  $(`#${singe}-console12 #wheel1 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);  

  // Clear temrinal
  $(`#${singe}-console12 #nodeToActivateValue`).html(`Nope`);
  var nodeToActivate = $(`#${singe}-console12 #nodeToActivateValue`);
  nodeToActivate.css(`color`, `gray`);
  
  wheel1Clicked();
}

function c1w2ClickHandler(event) {
  event.preventDefault();
  console1RightValue = $(this).attr("data-number");
  $(`#${singe}-console12 #wheel2 #cn-button`).html(console1RightValue);
  //
  $(`#${singe}-console12 #wheel2 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);  
  
  wheel2Clicked();
}

function c1w4ClickHandler(event) {
  event.preventDefault();
  console2RightValue = $(this).attr("data-number");
  console.info(`console 2 wheel4 value ${console2RightValue}`)
  $(`#${singe}-console12 #wheel4 #cn-button`).html(console2RightValue);
  //
  $(`#${singe}-console12 #wheel4 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);
  
  wheel4Clicked();
}

// SET CLICK HANDLERS

$(`#${singe}-console12 #wheel1 #cn-wrapper a`).click(c1w1ClickHandler);  

$(`#${singe}-console12 #wheel2 #cn-wrapper a`).click(c1w2ClickHandler);

$(`#${singe}-console12 #wheel4 #cn-wrapper a`).click(c1w4ClickHandler);
