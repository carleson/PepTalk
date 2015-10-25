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
  "#1. You are great!",
  "#2. You can do it!",
  "#3. You have amazing potential",
  "#4. You can do it!",
  "#5. You have amazing potential",
  "#6. You may not be there yet but you are closer than you was yesterday",
  "#7. This will not kill you",
  "#8. You are one tough bitch. Now go prove it",
  "#9. Believe in yourself, you are great",
  "#10. You can always Do More than you think you can",
  "#11. Small changes eventually add up to huge results",
  "#12. Be the type of person you want to meet",
  "#13. You have not failed until you quit trying",
  "#14. In the middle of every difficulty lies opportunity",
  "#15. The best revenge is massive success",
  "#16. This too shall pass",
  "#17. It doesn’t matter who you are, where you come from. The ability to triumph begins with you.",
  "#18. Trust yourself. You know more than you think you do",
  "#19. Live the life you have imagined",
  "#20. Life is 10 percent what happens to me and 90 percent how I react to it",
  "#21. We cannot direct the wind but we can adjust the sails"
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

function GetPepTalk() {
  return PepTalks[GetRandomPage()];
}

function GetRandomPage(){
  var number = 0;
  do {
       number = Math.floor((Math.random() * PepTalks.length-1) + 1);
     }
  while (number == Page);
  Page = number;  
  return number;
}

// Prepare the accelerometer
Accel.init();

//Next Features
//Settings - Background Color,Text color, Text style, Numbers 
//Splashscreen
//Icon
//More texts

