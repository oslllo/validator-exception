"use strict";

const isAssert = require("../");
const { JSDOM } = require("jsdom");
const is = require("oslllo-validator");
const { assert, expect } = require("chai");
const { falseException } = require("../src/error");

describe("test", () => {
    it("retuns the same number of validators as main", () => {
        assert.equal(Object.keys(is).length, Object.keys(isAssert).length - 1);
    });
    it("retuns validators with the same names as main", () => {
        var a = Object.keys(is);
        var b = Object.keys(isAssert);
        b.splice(b.indexOf("msg"), 1);
        assert.deepEqual(a, b);
    });
    it("does not throw if true", () => {
        assert.doesNotThrow(() => isAssert.string("123"));
        assert.doesNotThrow(() => isAssert.creditCard("375556917985515"));
        assert.doesNotThrow(() => isAssert.arrayLike({ length: 0 }));
        assert.doesNotThrow(() => isAssert.ascii("0987654321"));
        assert.doesNotThrow(() => isAssert.base32("ZG======"));
    });
    it("can throw if false", () => {
        expect(() => isAssert.string(123)).to.throw(
            Error,
            falseException(null, 123, "string").message
        );
        expect(() => isAssert.creditCard("5398228707871528")).to.throw(
            Error,
            falseException(null, "5398228707871528", "creditCard").message
        );
    });
    it("can throw with custom message", () => {
        var msg1 = "this is not a string";
        expect(() => isAssert.string(123, isAssert.msg(msg1))).to.throw(
            Error,
            falseException(msg1).message
        );
        var msg2 = "invalid credit card number";
        expect(() => {
            isAssert.creditCard("5398228707871528", isAssert.msg(msg2));
        }).to.throw(Error, falseException(msg2).message);
    });

    var isAssertBrowser, window;
    before((done) => {
        var options = { runScripts: "dangerously", resources: "usable" };
        JSDOM.fromFile("test/test.html", options)
            .then((dom) => {
                dom.window.document.addEventListener("DOMContentLoaded", () => {
                    setImmediate(() => {
                        window = dom.window;
                        isAssertBrowser = window.is;
                        done();
                    });
                });
            })
            .catch((err) => {
                process.stderr.write(`${err.message}\n`);
                /*eslint no-process-exit: "off", no-magic-numbers: "off" */
                process.exit(1);
            });
    });

    describe("test.browser", () => {
        it("loads validator into DOM", () => {
            assert.isTrue(
                typeof isAssertBrowser !== "undefined",
                "validator was not loaded into the DOM"
            );
            assert.isTrue(
                typeof isAssertBrowser === "object",
                "validator is not an object"
            );
        });
        it("can validate stuff in DOM", () => {
            assert.isTrue(isAssertBrowser.string("123"));
            assert.isTrue(isAssertBrowser.fn(window.alert));
            assert.isTrue(isAssertBrowser.element(window.document.createElement("div")));
        });
        it("can throw if false", () => {
            window.onerror = function (message, source, lineno, colno, error) {
                assert.isTrue(error instanceof Error);
                assert.equal(message, falseException(null, 123, "string").message);
            };
            try {
                isAssertBrowser.string(123);
            } catch (e) {} // eslint-disable-line no-empty
        });
        it("can throw with custom message", () => {
            var msg1 = "this is not a string";
            window.onerror = function (message, source, lineno, colno, error) {
                assert.isTrue(error instanceof Error);
                assert.equal(message, falseException(msg1).message);
            };
            try {
                isAssertBrowser.string(123, isAssertBrowser.msg(msg1));
            } catch (e) {} // eslint-disable-line no-empty
        });
    });
});
