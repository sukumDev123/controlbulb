const firebase = require("firebase");
const config = require("./config");
const logicFile = require("./logic");
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
      exports_updateTimeOpen(keyObjects, dataObjects, firebase);
      exports_updateTimeClose(keyObjects, dataObjects, firebase);
    }
    // console.log();
  }, 5000);

  /**
   *
   * @param {Array} keys this array
   * @param {*} datas this object
   */
  const exports_updateTimeOpen = (keys, datas, firebase) => {
    keys.forEach(key => {
      if (datas[key].setOpen) {
        if (datas[key].timeStart) {
          console.log("Time start working.");
          const calTimeToOpen = logicFile.calTime(datas[key].timeStart);
          if (!calTimeToOpen) {
            const newData = {
              createAt: datas[key].createAt,
              key: datas[key].key,
              nameBulb: datas[key].nameBulb,
              pinMode: datas[key].pinMode,
              setClose: datas[key].setClose,
              setOpen: false,
              statusBulb: 1,
              timeClose: datas[key].timeClose,
              timeStart: 0
            };
            logicFile.updateToRTDB(newData, firebase, key);
          } else {
            return 0;
          }
        }
      }
    });
  };
  /**
   *
   * @param {Array} keys this array
   * @param {*} datas this object
   */
  const exports_updateTimeClose = (keys, datas, firebase) => {
    keys.forEach(key => {
      if (datas[key].setClose) {
        if (datas[key].timeClose) {
          console.log("Time stop working.");

          const calTimeToOpen = logicFile.calTime(datas[key].timeClose);
          if (!calTimeToOpen) {
            const newData = {
              createAt: datas[key].createAt,
              key: datas[key].key,
              nameBulb: datas[key].nameBulb,
              pinMode: datas[key].pinMode,
              setClose: false,
              setOpen: datas[key].setOpen,
              statusBulb: 0,
              timeClose: 0,
              timeStart: datas[key].timeStart
            };
            logicFile.updateToRTDB(newData, firebase, key);
          } else {
            return 0;
          }
        }
      }
    });
  };
} else {
  console.log("You not have api key.");
}
