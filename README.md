# TSL Serial

## Description

Simple package to send TSL UMD data over serial (RS422/RS485)

## Getting started

```
npm install tslserial
```

### Example

```javascript
const TSLServer = require("tslserial");

TSLSerial.getAllSerialPorts(); // returns all serial ports

let serial = new TSLSerial("/dev/tty-usbserial1"); // Will open a serial port with the TSL required baud of 38400k, even parity, stopbits and databits of 8.

serial.emit("send", {
  address: 0, // TSL address, (INT)
  brightness: 3, // TSL Brightness
  tally1: 1, // GREEN (BOOL, 0,1)
  tally2: 1, // RED (BOOL, 0,1)
  tally3: 1, // YELLOW (BOOL, 0,1)
  tally4: 1, // BLUE (BOOL, 0,1)
  label: "CAM1", // 16 char string
});
```
