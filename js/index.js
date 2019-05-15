$('#console13-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console12.js"
  }).remove();
  $.getScript("js/console13.js");
});

$('#console12-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console13.js"
  }).remove();
  $.getScript("js/console12.js");
});

$('#void-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "terminal/voidData.js"
  }).remove();
  $.getScript("terminal/voidData.js");
});

$('#arc-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "terminal/arcData.js"
  }).remove();
  $.getScript("terminal/arcData.js");
});

$('#solar-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "terminal/solarData.js"
  }).remove();
  $.getScript("terminal/solarData.js");
});
