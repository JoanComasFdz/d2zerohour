$('#console12-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console13.js"
  }).remove();
  $.getScript("js/console12.js");
});

$('#console13-tab').click(function(e) {
  $('html').find('script').filter(function(){
    return $(this).attr('src') === "js/console12.js"
  }).remove();
  $.getScript("js/console13.js");
});