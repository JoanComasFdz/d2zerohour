console.info(`Using singe: ${singe}.`)
console.info(`Using consoles 1 + 3.`)

var console2LeftValue = ``
var console2RightValue = ``
var console2Pair = ``

var console3LeftValue = ``
var console3RightValue = ``
var console3Pair = ``

var dataForConsoles2And3 = parseCSVForConsole2And3()

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  findTerminalForWheel1(singe, 2, 3, dataForConsoles2And3, console2LeftValue, true)
}

function wheel2Clicked() {
  findTerminalForWheel2(singe, 2, 3, dataForConsoles2And3, console2LeftValue, console2RightValue, true)
}

function wheel3Clicked() {
  findTerminalForWheel3(singe, 2, 3, dataForConsoles2And3, console2LeftValue, console2RightValue, console3LeftValue, true)
}

function c1w1ClickHandler(event) {
  event.preventDefault();
  console2LeftValue = $(this).attr("data-number");
  $(`#${singe}-console23 #wheel1 #cn-button`).html(console2LeftValue);

  $(`#${singe}-console23 #wheel1 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);  

  // Clear temrinal
  $(`#${singe}-console23 #nodeToActivateValue`).html(`Nope`);
  var nodeToActivate = $(`#${singe}-console23 #nodeToActivateValue`);
  $(`#${singe}-console23 #nodeToActivateValue`).css(`color`, `gray`);
  
  wheel1Clicked();
}

function c1w2ClickHandler(event) {
  event.preventDefault();
  console2RightValue = $(this).attr("data-number");
  $(`#${singe}-console23 #wheel2 #cn-button`).html(console2RightValue);
  //
  $(`#${singe}-console23 #wheel2 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);  
  
  wheel2Clicked();
}

function c3w3ClickHandler(event) {
  event.preventDefault();
  console3LeftValue = $(this).attr("data-number");
  console.info(`console 2 wheel3 value ${console3LeftValue}`)
  $(`#${singe}-console23 #wheel3 #cn-button`).html(console3LeftValue);
  //
  $(`#${singe}-console23 #wheel3 #cn-wrapper a`).removeClass(`active`);
  $(this).addClass(`active`);
  
  wheel3Clicked();
}

// SET CLICK HANDLERS

$(`#${singe}-console23 #wheel1 #cn-wrapper a`).click(c1w1ClickHandler);  

$(`#${singe}-console23 #wheel2 #cn-wrapper a`).click(c1w2ClickHandler);

$(`#${singe}-console23 #wheel3 #cn-wrapper a`).click(c3w3ClickHandler);
