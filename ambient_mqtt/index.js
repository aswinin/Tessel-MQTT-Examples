var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['A']);
var mqtt = require('mqtt')

var myName = "Bruce5";

client  = mqtt.connect('mqtt://162.243.219.88',1883)

client.on('connect', function () {
  console.log("Connected");
  client.subscribe('tesselData');
  ambient.on('ready', function () {
    setInterval( function () {
      ambient.getLightLevel( function(err, lightdata) {
        if (err) console.log(err);
        ambient.getSoundLevel( function(err, sounddata) {
          if (err) console.log(err);
          var data = {name:myName,date:new Date(), soundLevel:sounddata,lightLevel:lightdata};
          client.publish('tesselData', JSON.stringify(data));
          console.log(JSON.stringify(data));
        });
      });
    },500);
  });    
})
