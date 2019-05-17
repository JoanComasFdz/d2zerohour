console.info(`Using singe: ${singe}`)

var console1Pair = ``
var console3Pair = ``

var console1LeftValue = ``
var console1RightValue = ``

var console2LeftValue = ``
var console2RightValue = ``

var dataForConsoles1And3 = parseCSVForConsole1And(3)

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  findTerminalForWheel1(singe, 1, 3, dataForConsoles1And3, console1LeftValue, true)
}

function wheel2Clicked() {
  findTerminalForWheel2(singe, 1, 3, dataForConsoles1And3, console1LeftValue, console1RightValue, true)
}

function wheel3Clicked() {
  findTerminalForWheel3(singe, 1, 3, dataForConsoles1And3, console1LeftValue, console1RightValue, console2LeftValue, true)
}

function c1w1ClickHandler(event) {
  event.preventDefault();
  console1LeftValue = $(this).attr("data-number");
  $(`#${singe}-console13 #wheel1 #cn-button`).html(console1LeftValue);

  $(`#${singe}-console13 #wheel1 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);  

  // Clear temrinal
  $(`#${singe}-console13 #nodeToActivateValue`).html(`Nope`);
  var nodeToActivate = $(`#${singe}-console13 #nodeToActivateValue`);
  $(`#${singe}-console13 #nodeToActivateValue`).css(`color`, `gray`);
  
  wheel1Clicked();
}

function c1w2ClickHandler(event) {
  event.preventDefault();
  console1RightValue = $(this).attr("data-number");
  $(`#${singe}-console13 #wheel2 #cn-button`).html(console1RightValue);
  //
  $(`#${singe}-console13 #wheel2 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);  
  
  wheel2Clicked();
}

function c3w3ClickHandler(event) {
  event.preventDefault();
  console2LeftValue = $(this).attr("data-number");
  console.info(`console 2 wheel3 value ${console2LeftValue}`)
  $(`#${singe}-console13 #wheel3 #cn-button`).html(console2LeftValue);
  //
  $(`#${singe}-console13 #wheel3 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);
  
  wheel3Clicked();
}

// SET CLICK HANDLERS

$(`#${singe}-console13 #wheel1 #cn-wrapper a`).click(c1w1ClickHandler);  

$(`#${singe}-console13 #wheel2 #cn-wrapper a`).click(c1w2ClickHandler);

$(`#${singe}-console13 #wheel3 #cn-wrapper a`).click(c3w3ClickHandler);
