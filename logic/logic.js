exports.calTime = time => {
  const timeNeedToCal = time - +new Date();
  if (timeNeedToCal <= 0) {
    return 0;
  }
  return 1;
};
/**
 *
 * @param {*} data
 * @param {firebase} firebase
 * @param {String} key key of firebase child
 */
exports.updateToRTDB = (data, firebase, key) => {
  firebase
    .database()
    .ref(`bulb-parant/${key}`)
    .set({
      createAt: data.createAt,
      key: data.key,
      nameBulb: data.nameBulb,
      pinMode: data.pinMode,
      setClose: data.setClose,
      setOpen: data.setOpen,
      statusBulb: data.statusBulb,
      timeClose: data.timeClose,
      timeStart: data.timeStart
    });
};
