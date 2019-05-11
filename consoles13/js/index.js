
var firstConsolePair = ''
var secondConsolePair = ''

var firstConsoleLeftValue = ''
var firstConsoleRightValue = ''

var secondConsoleLeftValue = ''
var secondConsoleRightValue = ''

var combosCsv = `1-1,2-12,8-10,White1
1-1,4-5,6-5,Red2
1-2,1-4,11-4,Red1
1-7,12-3,8-4,Yellow3
1-10,7-11,3-12,Red6
1-12,1-1,5-4,Cyan3
2-4,1-6,3-10,Green2
2-5,11-2,3-5,Yellow2
2-6,5-4,10-3,Cyan1
2-7,2-11,9-10,Yellow6
2-9,12-3,10-2,Purple5
3-3,1-3,6-8,Green7
4-3,2-4,2-9,Green1
4-3,2-11,4-7,Purple6
4-6,5-6,5-12,Blue4
4-8,12-8,9-3,White5
4-9,9-4,5-5,Yellow1
5-6,7-3,7-10,Red5
5-9,11-7,12-10,Purple7
6-5,6-10,1-1,Purple1
6-9,12-10,8-5,White7
6-11,11-4,12-4,Cyan4
7-2,8-3,3-12,White6
7-4,2-7,7-9,Green5
7-9,6-5,5-12,Yellow4
7-12,1-2,5-4,Blue5
8-4,5-8,9-4,Cyan2
8-5,11-8,11-11,Cyan7
8-6,2-9,2-10,White3
8-6,9-2,12-12,Yellow5
8-10,5-6,11-11,Red3
8-12,5-9,9-4,Cyan6
9-3,12-7,12-12,Green3
9-7,7-8,12-7,Purple4
9-9,8-10,8-6,Purple2
10-2,3-8,9-3,White2
10-3,2-3,7-11,Green4
10-5,6-2,3-9,Blue2
10-12,11-5,8-12,Green6
11-1,5-7,10-2,Blue6
11-4,2-8,4-8,Blue7
11-4,4-11,12-3,Yellow7
11-4,5-4,7-6,Red4
11-6,12-8,11-11,Red7
11-7,6-3,12-5,Purple3
11-11,7-3,8-11,Blue3
12-2,11-4,2-11,Cyan5
12-5,7-1,5-7,White4
12-5,12-11,4-4,Blue1`

// PARSE CSV
var data = {}
var combos = combosCsv.split(/\r\n|\n/);
for (let i = 0; i < combos.length; i++) {
  const element = combos[i];
  const values = element.split(',')

  const color = values[3].substring(0, values[3].length-1)

  const countToNumber = values[3].length-1
  const number = values[3][countToNumber]

  const terminal = color + ' ' + number

  if (!data[values[0]])
  {
    data[values[0]] = {}
  }
  data[values[0]][values[2]] = terminal
}

console.info(data) // The array looks like: data['1-2']['3-4'] = 'White 1'

// DEFINE CLICK HANDLERS

function wheel1Clicked() 
{
  // Clear wheels
  for (let i = 1; i <= 12; i++) {
    $('#w2li'+i).addClass("overlay")
    $('#w3li'+i).addClass("overlay")
  }

  $('#wheel2 #cn-wrapper a').removeClass('active');
  $('#wheel3 #cn-wrapper a').removeClass('active');

  firstConsoleRightValue = ''
  secondConsoleLeftValue  = ''

  $('#wheel2 #cn-button').html(firstConsoleRightValue);
  $('#wheel3 #cn-button').html(secondConsoleLeftValue );

  $('#secondConsolePairResult span').html('-');

  const firstConsoleKeys = Object.keys(data)
  for (let i = 0; i < firstConsoleKeys.length; i++) {
    const element = firstConsoleKeys[i];
    console.info(`Analyzing element ${JSON.stringify(element)} for left value ${firstConsoleLeftValue}`)
    if (element.split('-')[0] === firstConsoleLeftValue) {
      // ACTIVATE POSSIBLE VALUE ON CONSOLE 1 RIGHT WHEEL
      console.info(`Found that ${element} starts with ${firstConsoleLeftValue}...`)
      const rightValue = element.split('-')[1]
      $('#w2li'+rightValue).removeClass("overlay")
      console.info(`Activated ${rightValue}`)
    } else {
      console.info(`Found that ${element} does not start with ${firstConsoleLeftValue}  `)
    }
  }

  findTerminal(true)
}

function wheel2Clicked() {
  // Clear third wheel
  for (let i = 1; i <= 12; i++) {
    $('#w3li'+i).addClass("overlay")
  }
  $('#wheel3 #cn-wrapper a').removeClass('active');
  secondConsoleLeftValue  = ''
  $('#wheel3 #cn-button').html(secondConsoleLeftValue );
  $('#secondConsolePairResult span').html('-');

  findTerminal(true)
}

function wheel3Clicked() {
  findTerminal(true)
}

function w1ClickHandler(event) {
  firstConsoleLeftValue = $(this).attr("data-number");
  $('#wheel1 #cn-button').html(firstConsoleLeftValue);

  $('#wheel1 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');  

  // Clear temrinal
  $('#nodeToActivateValue').html('Nope');
  var nodeToActivate = document.getElementById('nodeToActivateValue');
  nodeToActivate.style.color = 'gray';
  
  wheel1Clicked();
}

function w2ClickHandler(event) {
  firstConsoleRightValue = $(this).attr("data-number");
  $('#wheel2 #cn-button').html(firstConsoleRightValue);
  //
  $('#wheel2 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');  
  
  wheel2Clicked();
}

function w3ClickHandler(event) {
  secondConsoleLeftValue = $(this).attr("data-number");
  console.info(`console 2 wheel3 value ${secondConsoleLeftValue}`)
  $('#wheel3 #cn-button').html(secondConsoleLeftValue);
  //
  $('#wheel3 #cn-wrapper a').removeClass('active');
  $(this).addClass('active');
  
  wheel3Clicked();
}

// SET CLICK HANDLERS

$('#wheel1 #cn-wrapper a').click(w1ClickHandler);  

$('#wheel2 #cn-wrapper a').click(w2ClickHandler);

$('#wheel3 #cn-wrapper a').click(w3ClickHandler);





/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
// EventListener | @jon_neal | //github.com/jonathantneal/EventListener
!window.addEventListener && window.Element && (function () {
    function addToPrototype(name, method) {
        Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
    }
 
    var registry = [];
 
    addToPrototype("addEventListener", function (type, listener) {
        var target = this;
 
        registry.unshift({
            __listener: function (event) {
                event.currentTarget = target;
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
                event.preventDefault = function () { event.returnValue = false };
                event.relatedTarget = event.fromElement || null;
                event.stopPropagation = function () { event.cancelBubble = true };
                event.relatedTarget = event.fromElement || null;
                event.target = event.srcElement || target;
                event.timeStamp = +new Date;
 
                listener.call(target, event);
            },
            listener: listener,
            target: target,
            type: type
        });
 
        this.attachEvent("on" + type, registry[0].__listener);
    });
 
    addToPrototype("removeEventListener", function (type, listener) {
        for (var index = 0, length = registry.length; index < length; ++index) {
            if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
            }
        }
    });
 
    addToPrototype("dispatchEvent", function (eventObject) {
        try {
            return this.fireEvent("on" + eventObject.type, eventObject);
        } catch (error) {
            for (var index = 0, length = registry.length; index < length; ++index) {
                if (registry[index].target == this && registry[index].type == eventObject.type) {
                    registry[index].call(this, eventObject);
                }
            }
        }
    });
})();