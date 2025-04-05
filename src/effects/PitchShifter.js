/**
 * @module p5.sound
 * @submodule p5.sound
 * @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { PitchShift as TonePitchShift } from "tone/build/esm/effect/PitchShift.js";
import Effect from './Effect'; // Import the Effect superclass

/**
 * Change the pitch of a sound.
 * @class PitchShifter
 * @constructor
 * @extends Effect
 * @example
 * <div>
 * <code>
 * let cnv, soundFile, pitchShifter;
 *
 * function preload() {
 * soundFile = loadSound('/assets/beatbox.mp3');
 * }
 *
 * function setup() {
 * cnv = createCanvas(100, 100);
 * cnv.mousePressed(startSound);
 * background(220);
 * textAlign(CENTER);
 * textSize(9);
 * text('click to play sound', width/2, height/2);
 * pitchShifter = new p5.PitchShifter();
 *
 * soundFile.disconnect();
 * soundFile.connect(pitchShifter);
 * //change the pitch and retrigger sample when done playing
 * soundFile.onended(changePitch);
 * }
 *
 * function startSound () {
 * soundFile.play();
 * }
 *
 * function changePitch () {
 * let pitchValue = random(-12, 12);
 * pitchShifter.shift(pitchValue);
 * soundFile.play();
 * }
 * </code>
 * </div>
 */
class PitchShifter extends Effect { // Extend Effect
  constructor(shiftValue = 1) {
    super(); // Call superclass constructor
    this.pitchshifter = new TonePitchShift(shiftValue).toDestination();
    this.input = this.pitchshifter; // Set this.input
  }

  /**
   * Shift the pitch of the source audio.
   * @method shift
   * @for PitchShifter
   * @param {Number} pitchValue amount of semitones to shift the pitch
   */
  shift(value) {
    if (value !== undefined) {
      this.pitchshifter.pitch = value;
    }
  }

  /**
   * Get the Web Audio API node.
   * @method getNode
   * @for PitchShifter
   * @return {Object} The Web Audio API node.
   */
  getNode() {
    return this.pitchshifter;
  }
}

export default PitchShifter;