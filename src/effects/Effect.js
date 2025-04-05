/**
 * @module p5.sound
 * @submodule p5.sound
 * @for p5.sound
 */

import { Context as ToneContext } from "tone/build/esm/core/context/Context.js";

/**
 * Base class for sound effects in p5.sound.
 * Provides basic connect and disconnect functionality.
 * @class Effect
 * @constructor
 */
class Effect {
  constructor() {
    this.output = ToneContext.destination; // Default output
  }

  /**
   * Connect the effect to a destination.
   * @method connect
   * @for Effect
   * @param {Object} destination A p5.sound object or a Web Audio API node.
   */
  connect(destination) {
    if (destination) {
      if (typeof destination.getNode === 'function') {
        this.output = destination.getNode();
        if (this.input) {
          this.input.connect(this.output);
        }
      } else {
        this.output = destination;
        if (this.input) {
          this.input.connect(this.output);
        }
      }
    } else {
      this.output = ToneContext.destination;
      if (this.input) {
        this.input.connect(this.output);
      }
    }
  }

  /**
   * Disconnect the effect from its output.
   * @method disconnect
   * @for Effect
   */
  disconnect() {
    if (this.input && this.output) {
      this.input.disconnect(this.output);
      this.output = ToneContext.destination; // Reset to default
      this.input.connect(this.output); // Reconnect to default
    } else if (this.output) {
      if (typeof this.output.disconnect === 'function') {
        this.output.disconnect(ToneContext.destination);
        this.output = ToneContext.destination;
      }
    }
  }

  /**
   * Get the Web Audio API node(s) associated with this effect.
   * Should be overridden by subclasses to return the specific node.
   * @method getNode
   * @for Effect
   * @return {Object} The Web Audio API node.
   */
  getNode() {
    return null;
  }
}

export default Effect;