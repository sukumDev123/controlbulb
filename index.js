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
    keyObjects = Object.keys(snapshot.val());
    dataObjects = snapshot.val();
  });
  setInterval(() => {
    if (keyObjects.length > 0) {
      console.log("Doing now 5 s.");
      const updateonissuccess = aboutTime.updateTimeOpen(
        keyObjects,
        dataObjects,
        firebase
      );
      const updateoffissuccess = aboutTime.updateTimeClose(
        keyObjects,
        dataObjects,
        firebase
      );
      if (updateoffissuccess || updateonissuccess) {
        keyObjects = [];
      }
      keyObjects = keyObjects.filter(
        key => dataObjects[key].setOpen || dataObjects[key].setClose
      );
      console.log("This filed set time :", keyObjects);
    }
  }, 1000);
} else {
  console.log("You not have api key.");
}
