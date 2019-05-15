// VOID
$('#void-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "terminal/voidData.js"
  }).remove();
  $.getScript("terminal/data/voidData.js");
});

$('#void-console13-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console12.js"
  }).remove();
  $.getScript("js/console13.js");
});

$('#void-console12-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console13.js"
  }).remove();
  $.getScript("js/console12.js");
});

// ARC
$('#arc-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "terminal/arcData.js"
  }).remove();
  $.getScript("terminal/data/arcData.js");
});

$('#arc-console13-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console12.js"
  }).remove();
  $.getScript("js/console13.js");
});

$('#arc-console12-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console13.js"
  }).remove();
  $.getScript("js/console12.js");
});


// SOLAR
$('#solar-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "terminal/solarData.js"
  }).remove();
  $.getScript("terminal/data/solarData.js");
});

$('#solar-console13-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console12.js"
  }).remove();
  $.getScript("js/console13.js");
});

$('#solar-console12-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console13.js"
  }).remove();
  $.getScript("js/console12.js");
});
