const EventEmitter = require("events").EventEmitter;
const SerialPort = require("serialport");

class TSLSerial extends EventEmitter {
  constructor(port = "") {
    super();
    this.port = port;
    this.on("send", (data) => {});
  }
  generateTSLBuffer({ address, label, tally1, tally2, tally3, tally4 }) {
    let bufferUmd = Buffer.alloc(18, 0);

    bufferUmd[0] = 0x80 + parseInt(address);
    bufferUmd.write(label, 2);

    let bufferTally = 0x30;

    if (tally1) {
      bufferTally |= 1;
    }
    if (tally2) {
      bufferTally |= 2;
    }
    if (tally3) {
      bufferTally |= 4;
    }
    if (tally4) {
      bufferTally |= 8;
    }
    bufferUmd[1] = bufferTally;

    return bufferUmd;
  }
  static async getAllSerialPorts() {
    serialPorts = [];
    await SerialPort.list().then((ports) => {
      ports.map((port) =>
        serialPorts.push({ path: port.path, enabled: false })
      );
    });
    return serialPorts;
  }
}

module.exports = TSLSerial;
