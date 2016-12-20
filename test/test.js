/* global it, describe */
const assert = require('chai').assert;
const LineByLineReader = require('line-by-line');

const Marlin = require('../');

describe('Testing Marlin emulator functionality', () => {
  const marley = new Marlin();

  it('Has an initial position of X=0, Y=0, Z=0, E=0', async () => {
    const position = marley.position;
    const expectedPositon = {
      x: 0,
      y: 0,
      z: 0,
      e: 0,
    };

    assert.deepEqual(position, expectedPositon);
  });

  it('Processes a G4 command with a "seconds" or "S" parameter', async () => {
    const startTime = new Date().getTime();
    await marley.sendGcode('G4 S1');
    const endTime = new Date().getTime();
    const passedTime = endTime - startTime;
    assert(passedTime >= 1000, true);
    assert(passedTime < 1500, true);
  });

  it('Processes a G4 command with a "milliseconds" or "P" parameter', async () => {
    const startTime = new Date().getTime();
    await marley.sendGcode('G4 P100');
    const endTime = new Date().getTime();
    const passedTime = endTime - startTime;
    assert(passedTime >= 100, true);
    assert(passedTime < 150, true);
  });

  it('Has a position of X=10, Y=0, Z=0, E=0 after sent GCode "G1 X10"', async () => {
    await marley.sendGcode('G1 X10');
    const position = marley.position;
    const expectedPositon = {
      x: 10,
      y: 0,
      z: 0,
      e: 0,
    };
    assert.deepEqual(position, expectedPositon);
  });

  it('shouldnt queue commands when the buffer is full', async () => {
    const startTime = new Date().getTime();
    // Fill the buffer
    for (let i = 0; i < 33; i += 1) {
      await marley.sendGcode('G1 X10');
    }
    const endTime = new Date().getTime();
    const passedTime = endTime - startTime;
    assert.isAtLeast(passedTime, 2000);
  });

  it('should be able to consume a small gcode file', async () => {
    // The file provided is a 1mm cube, sliced for a Printrbot Play
    assert(true, false);
    // declare the gcode file path
    // instantiate the line reader
    // build the event handler for processing each line
  });
});
