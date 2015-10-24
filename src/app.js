/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var PepTalks = [
  "You are great!",
  "You can do it!",
  "You have amazing potential",
  "You can do it!",
  "You have amazing potential",
  "You may not be there yet but you are closer than you was yesterday",
  "This will not kill you",
  "You are one tough bitch. Now go prove it",
  "Believe in yourself, you are great",
  "You can always Do More than you think you can",
  "Small chenges eventually add up to huge results",
  "Be the type of person you want to meet",
  "You have not failed until you quit trying"
];
var Page = 0;

var main = new UI.Card({
  title: 'PepTalk',
  icon: 'images/menu_icon.png',
  subtitle: '',
  body: GetPepTalk()
});

main.show();

main.on('click', 'select', function(e) {
  main.body(GetPepTalk());
  });

main.on('accelTap', function(e) {
   Vibe.vibrate('short');
   main.body(GetPepTalk());   
  });

function GetPepTalk(){
  var text = PepTalks[Page];
  if (Page < PepTalks.length)
    {Page = Page+1;}
  else
    {Page = 0;}
  
  return text;
}

// Prepare the accelerometer
Accel.init();

