var tessel = require('tessel');
var mqtt = require('mqtt');

var led = tessel.led[3];

var myName = "YourDeviceName";

client  = mqtt.connect('mqtt://162.243.219.88',1883)

client.on('connect', function () {
  console.log("Connected");
  client.subscribe('tesselLED');    
})

client.on('message', function (topic, message) {
  var jsMessage = JSON.parse(message.toString());
  if(jsMessage.name == myName)
  {
    if(jsMessage.data == "toggle")
    {
      led.toggle();
    }
  }
});
