/**
 * Words of Gandhi
 *
 * Source: https://github.com/carleson/Gandhi
 *
 * This is a simple quote appliaction with random Mahatma Gandhi quotes.
 * http://www.brainyquote.com/quotes/authors/m/mahatma_gandhi.html
 *
 */

// DEBUGGING
var DEBUG = true;
var VERSION = 0.5;

// INCLUDES
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var Settings = require('settings');

// GLOBAL VARIABLES
var main;
var default_text_color = "#000000";
var default_background_color = "#ffffff"
var config_background_color;
var config_text_color;
var config_splashscreen = true;
var config_shake = true;
var splashscreenTimer = 0;
var Page = 0;
var colorHex;
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
  "Small changes eventually add up to huge results",
  "Be the type of person you want to meet",
  "You have not failed until you quit trying",
  "In the middle of every difficulty lies opportunity",
  "The best revenge is massive success",
  "This too shall pass",
  "Trust yourself. You know more than you think you do",
  "Live the life you have imagined",
  "Life is 10 percent what happens to me and 90 percent how I react to it",
  "We cannot direct the wind but we can adjust the sails",
  "You miss 100% of the shots you don’t take",
  "Every strike brings me closer to the next home run",
  "Eighty percent of success is showing up",
  "Your time is limited, so don’t waste it living someone else’s life",
  "Winning isn’t everything, but wanting to win is.",
  "You are a product of your decisions",
  "Whether you think you can or you think you can’t, you’re right"
];


// EVENT LISTENERS
Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
  var url = 'http://carleson.github.io/Pebble/Peptalk/index.html';
  console.log('Showing configuration page: ' + url);

  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  if(DEBUG) console.log('Configuration page returned: ' + JSON.stringify(configData));

  //Save configuration
  Settings.data({
  name: 'Peptalk',
  splashscreen: configData['splashscreen'],
  shake: configData['shake'], 
  background_color:   configData['background_color'],
  text_color:   configData['text_color'],
  });
  
  if(DEBUG) displayConfig();
  LoadConfiguration();
  GetNewCard();
});

// CONFIGURATION
LoadConfiguration();

// WINDOWS
var wind = new UI.Window({ fullscreen: true });
var image = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: 'images/Peptalk.png'
});

if (config_splashscreen === true)
{
  if(DEBUG) console.log( "Display SplashScreen..." );
  wind.add(image);
  wind.show();
  splashscreenTimer = 2000;
}

  main = new UI.Card({
  title: 'Peptalk',
  icon: 'images/Peptalk28.png',
  subtitle: '',
  scrollable: true,
  backgroundColor: config_background_color,
  bodyColor: config_text_color,
  body: GetQuote()
});

setTimeout(function() {
  // Display the mainScreen
  main.show();
  // Hide the splashScreen to avoid showing it when the user press Back.
  if (config_splashscreen === true)
  {
    wind.hide();
  }
}, splashscreenTimer);

main.on('click', 'select', function(e) {
  GetNewCard();
  });

main.on('accelTap', function(e) {
   if (config_shake)
     {
       Vibe.vibrate('short');
       GetNewCard();
     }
  });

main.on('longSelect', function(e) {
  if(DEBUG) displayConfig();
});

// UTILITY FUNCTIONS

function LoadConfiguration()
{
  if(DEBUG) console.log( "Method call: LoadConfiguration()" );
  config_splashscreen = Settings.data('splashscreen');
  config_shake = Settings.data('shake');
  config_background_color = parseColor(Settings.data('background_color'));
  if (config_background_color == '') config_background_color = default_background_color
  
  config_text_color = parseColor(Settings.data('text_color'));
  if (config_text_color == '') config_text_color = default_text_color;
}

function GetNewCard() {
  if(DEBUG) console.log( "Method call: GetNewCard()" );
  main.body(GetPepTalk());
  main.backgroundColor(config_background_color);
  main.bodyColor(config_text_color);
}

function GetPepTalk() {
  if(DEBUG) console.log( "Method call: GetPepTalk()" );
  return PepTalks[GetRandomPage()];
}

function GetRandomPage(){
    if(DEBUG) console.log( "Method call: GetRandomPage()" );
  var number = 0;
  do {
       number = Math.floor((Math.random() * Quotes.length-1) + 1);
     }
  while (number == Page);
  Page = number;  
  return number;
}

function parseColor(color) {
  if(DEBUG) console.log("Method call: parseColor()");
  if(DEBUG) console.log(color); 
  var fixed_color = '';
  if (typeof(color) != 'undefined' && color != null)
    {
      fixed_color = '#' + color.toString().slice(2);
      if(DEBUG) console.log(fixed_color);      
    }
  if(DEBUG) console.log( "Converting color: " + color + "into: " + fixed_color);
	return fixed_color;
};

function displayConfig()
{
  if(DEBUG) console.log( "Method call: displayConfig()" );
  console.log("------------------------------------------");
  console.log("Settings:");       
  var options = Settings.data();
  console.log(JSON.stringify(options));       
  console.log(" ");
  console.log("Variables:");
  console.log("Debug: " + DEBUG);
  console.log("Version: " + VERSION);
  console.log("default_text_color: " +  default_text_color);
  console.log("default_background_color: " +  default_background_color);
  console.log("config_background_color: " + config_background_color);
  console.log("config_text_color: " + config_text_color);
  console.log("config_splashscreen: " + config_splashscreen);
  console.log("config_shake: " + config_shake);
  console.log("splashscreenTimer: " + splashscreenTimer);
  console.log("------------------------------------------");
};


// Prepare the accelerometer
if (config_shake) Accel.init();