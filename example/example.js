const TSLSerial = require("../src/index.js");

let serial = new TSLSerial("COM3");

serial.emit("send", {
  address: 0, // TSL address, (INT)
  brightness: 3, // TSL Brightness
  tally1: 1, // GREEN (BOOL, 0,1)
  tally2: 1, // RED (BOOL, 0,1)
  tally3: 1, // YELLOW (BOOL, 0,1)
  tally4: 1, // BLUE (BOOL, 0,1)
  label: "CAM1", // 16 char string
});

TSLSerial.getAllSerialPorts().then((res) => console.log("res:", res));
