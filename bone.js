"use strict";

const bluebird = require('bluebird');
const mongoose = require('mongoose');

bluebird.promisifyAll(mongoose);

module.exports = function attachMongoose(skinny, options) {
    skinny.on('*initialize', function *initializeMongoose() {
        yield mongoose.connectAsync(options.url, options.options || {});
    });

    skinny.on('*shutdown', function *shutdownMongoose() {
        yield mongoose.disconnectAsync();
    });
};