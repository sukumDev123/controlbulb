const firebase = require("firebase");
const config = require("./config");
const aboutTime = require("./logic/updateTime");
if (config.apiKey) {
  firebase.initializeApp(config);
  let keyObjects = [];
  let dataObjects = [];
  const starCountRef = firebase.database().ref("bulb-parant");
  starCountRef.on("value", function(snapshot) {
    console.log("New data in realtime database.");
    // console.log(snapshot.val());
    keyObjects = Object.keys(snapshot.val());
    dataObjects = snapshot.val();
  });
  setInterval(() => {
    if (keyObjects.length > 0) {
      console.log("Doing now 5 s.");
      aboutTime.updateTimeOpen(keyObjects, dataObjects, firebase);
      aboutTime.updateTimeClose(keyObjects, dataObjects, firebase);
    }
    // console.log();
  }, 5000);
} else {
  console.log("You not have api key.");
}
