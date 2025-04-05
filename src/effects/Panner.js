/**
 * @module p5.sound
 * @submodule p5.sound
 * @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";
import { Panner as TonePanner} from "tone/build/esm/component/channel/Panner.js";
import { clamp } from '../Utils';
import Effect from './Effect'; // Import the Effect superclass

/**
 * A panning effect.
 * @class Panner
 * @constructor
 * @extends Effect
 * @example
 * <div>
 * <code>
 * let panner, lfo, soundfile, cnv;
 *
 * function preload() {
 * soundfile = loadSound('/assets/beat.mp3');
 * }
 *
 * function setup() {
 * cnv = createCanvas(100, 100);
 * background(220);
 * cnv.mousePressed(startSound);
 *
 * panner = new p5.Panner();
 * lfo = new p5.Oscillator(1);
 * //disconnect lfo from speakers because we don't want to hear it!
 * lfo.disconnect();
 * panner.pan(lfo);
 *
 * soundfile.loop();
 * soundfile.disconnect();
 * soundfile.connect(panner);
 *
 * }
 *
 * function startSound() {
 * lfo.start();
 * soundfile.start();
 * }
 * </code>
 * </div>
 */
class Panner extends Effect { // Extend Effect
  constructor() {
    super(); // Call superclass constructor
    this.panner= new TonePanner(0).toDestination();
    this.input = this.panner; // Set this.input
  }

  /**
   * Pan a sound source left or right.
   * @method pan
   * @for Panner
   * @param {Number, Object}  panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or an audio rate signal such as an LFO.
   */
  pan(p) {
    if (typeof p === "object") {
      p.getNode().connect(this.panner.pan);
      return;
    }
    this.panner.pan.rampTo(clamp(p, -1, 1), 0.01);
  }

  /**
   * Get the Web Audio API node.
   * @method getNode
   * @for Panner
   * @return {Object} The Web Audio API node.
   */
  getNode() {
    return this.panner;
  }
}

export default Panner;