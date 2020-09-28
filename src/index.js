"use strict";

const { falseException } = require("./error");
const validators = require("oslllo-validator");

/**
 * @name Message
 * @description Creates an instance with a custom message to be used for when
 * an exception is thrown. This will also make it easier to identify so as to
 * not mistake it for a validator argument.
 * @param {String} text - Custom excelption message value.
 * @returns {Message}
 */
function Message (text) {
    this.text = text;
}

var assert = {
    msg: function (message) {
        return new Message(message);
    },
};

/**
 * @name assertify
 * @description - Converts an `oslllo-validator` function to make it throw an
 * exception on failure instead of returning false.
 * @param {Function} validator - The validator we want to aplly assertion to.
 * @returns {Function}
 */
function assertify (validator) {
    return function () {
        /* eslint prefer-rest-params: "off" */
        if (!validators[validator](...arguments)) {
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = arguments[i];
                if (arg instanceof Message) {
                    throw falseException(arg.text);
                }
            }
            throw falseException(null, arguments[0], validator);
        }

        return true;
    };
}

for (var validator in validators) {
    assert[validator] = assertify(validator);
}

module.exports = assert;
