"use strict";
exports.__esModule = true;
var facebookOauth2_1 = require("./facebookOauth2");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// Creates a Passport configuration for Google
var FacebookPassport = (function () {
    function FacebookPassport() {
        var _this = this;
        this.clientId = facebookOauth2_1["default"].id;
        this.secretId = facebookOauth2_1["default"].secret;
        passport.use(new FacebookStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "http://tasteoflife.azurewebsites.net/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log('validating facebook profile:' + JSON.stringify(profile));
                _this.userId = profile.id;
                _this.displayName = profile.displayName;
                _this.email = profile.emails[0].value;
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return FacebookPassport;
}());
exports["default"] = FacebookPassport;
