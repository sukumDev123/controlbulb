const logicFile = require("./logic");

/**
 *
 * @param {Array} keys this array
 * @param {*} datas this object
 */
exports.updateTimeOpen = (keys, datas, firebase) => {
  let createAt_Boolean = false;
  keys.forEach(key => {
    if (datas[key].setOpen) {
      if (datas[key].timeStart) {
        const calTimeToOpen = logicFile.calTime(datas[key].timeStart);
        if (!calTimeToOpen) {
          console.log("Time start working.");

          const newData = {
            createAt: +new Date(),
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
          createAt_Boolean = true;
        } else {
          return 0;
        }
      }
    }
  });
  return createAt_Boolean;
};
/**
 *
 * @param {Array} keys this array
 * @param {*} datas this object
 */
exports.updateTimeClose = (keys, datas, firebase) => {
  let createAt_Boolean = false;

  keys.forEach(key => {
    if (datas[key].setClose) {
      if (datas[key].timeClose) {
        const calTimeToOpen = logicFile.calTime(datas[key].timeClose);
        if (!calTimeToOpen) {
          console.log("Time stop working.");

          const newData = {
            createAt: 0,
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
          createAt_Boolean = true;
        } else {
          return 0;
        }
      }
    }
  });
  return createAt_Boolean;
};
