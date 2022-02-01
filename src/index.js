const EventEmitter = require("events").EventEmitter;
const SerialPort = require("serialport");

class TSLSerial extends EventEmitter {
  constructor(path = "") {
    super();
    this.path = path;
    try {
      this.serialPort = new SerialPort(this.path, {
        baudRate: 38400,
        parity: "even",
        stopBits: 1,
        dataBits: 8,
      });
    } catch (err) {
      console.log(err);
    }
    this.on("send", (data) => {
      buffer = this.generateTSLBuffer(data);
      this.serialPort.write(buffer);
    });
    this.serialPort.on("error", (err) => console.error(err));
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
    let serialPorts = [];
    await SerialPort.list().then((ports) => {
      ports.map((port) => serialPorts.push(port.path));
    });
    return serialPorts;
  }
}

module.exports = TSLSerial;
