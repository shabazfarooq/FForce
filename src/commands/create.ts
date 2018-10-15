/**
 * Require(s)
 */
const Command = require('./Command');

/**
 * Define and export module
 */
module.exports = class Create extends Command {

  /**
   * Start
   */
  async start() {
    try {
      // Implement stuff..

    }
    catch (error) {
      console.log('failed..' + error);
      process.exit(1);
    }
  }
}