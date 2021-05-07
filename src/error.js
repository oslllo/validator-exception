"use strict";

/**
 *
 * @param {String} message - Exception message
 * @param {*} argument - Argumetn value
 * @param {String} validator - Validator name string
 */
function falseException (message, argument, validator) {
  if (!argument) {
    return new Error(message);
  }

  return new Error(`${argument.toString()} is not a valid ${validator}`);
}

module.exports = { falseException };
