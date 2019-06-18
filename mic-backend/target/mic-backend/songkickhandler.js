"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var axios_1 = require("axios");
var config_1 = require("../config");
var DOMAIN = "https://api.songkick.com/api/3.0";
exports.searchArtist = function (req, res) {
    var name = req.params.name;
    var url = DOMAIN + "/search/artists.json?apikey=" + config_1.SONGKICK_API_KEY + "&query=" + name;
    var artists = new Array();
    axios_1["default"].get(url)
        .then(function (response) {
        response.data.resultsPage.results.artist.map(function (artist) {
            artists.push({
                id: artist.id,
                name: artist.displayName
            });
        });
        res.json(artists);
    })["catch"](function (reason) {
        console.log(reason);
    });
};
exports.searchVenue = function (req, res) {
    var name = req.params.name;
    var url = DOMAIN + "/search/venues.json?apikey=" + config_1.SONGKICK_API_KEY + "&query=" + name;
    var venues = new Array();
    axios_1["default"].get(url)
        .then(function (response) {
        response.data.resultsPage.results.venue.map(function (venue) {
            venues.push({
                id: venue.id,
                name: venue.displayName,
                city: {
                    id: venue.city.id,
                    name: venue.city.name,
                    country: venue.city.country.displayName
                }
            });
        });
        res.json(venues);
    })["catch"](function (reason) {
        console.log(reason);
    });
};
exports.searchLocation = function (req, res) {
    var name = req.params.name;
    var url = DOMAIN + "/search/locations.json?apikey=" + config_1.SONGKICK_API_KEY + "&query=" + name;
    var locations = new Array();
    axios_1["default"].get(url)
        .then(function (response) {
        response.data.resultsPage.results.location.map(function (city) {
            var state = city.city.state
                ? city.city.state.displayName
                : undefined;
            locations.push({
                id: city.metroArea.id,
                name: city.city.displayName,
                country: city.city.country.displayName,
                state: state
            });
        });
        res.json(locations);
    })["catch"](function (reason) {
        console.log(reason);
    });
};
exports.getEventsFromGeolocation = function (req, res) {
    var longitude = req.params.longitude;
    var latitude = req.params.latitude;
    var url = "https://api.songkick.com/api/3.0/events.json?apikey=" + config_1.SONGKICK_API_KEY + "&location=geo:" + latitude + "," + longitude;
    collectAllEvents(url, res)
        .then(function (events) {
        res.end(JSON.stringify({ finished: "ok" }));
    })["catch"](function (reason) {
        console.log(reason);
        res.status(400).send("Bad Request");
    });
};
exports.getEventsFromArtist = function (req, res) {
    var id = req.params.id;
    var url = DOMAIN + "/artists/" + id + "/calendar.json?apikey=" + config_1.SONGKICK_API_KEY;
    collectAllEvents(url, res)
        .then(function (events) {
        res.end(JSON.stringify({ finished: "ok" }));
    })["catch"](function (reason) {
        console.log(reason);
        res.status(400).send("Bad Request");
    });
};
exports.getEventsFromLocation = function (req, res) {
    var id = req.params.id;
    var url = DOMAIN + "/metro_areas/" + id + "/calendar.json?apikey=" + config_1.SONGKICK_API_KEY;
    collectAllEvents(url, res)
        .then(function (events) {
        res.end();
    })["catch"](function (reason) {
        console.log(reason);
        res.status(400).send("Bad Request");
    });
};
exports.getEventsFromVenue = function (req, res) {
    var id = req.params.id;
    var url = DOMAIN + "/venues/" + id + "/calendar.json?apikey=" + config_1.SONGKICK_API_KEY;
    collectAllEvents(url, res)
        .then(function (events) {
        res.end(JSON.stringify({ finished: "ok" }));
    })["catch"](function (reason) {
        console.log(reason);
        res.status(400).send("Bad Request");
    });
};
var collectAllEvents = function (url, res) { return __awaiter(_this, void 0, void 0, function () {
    var events, response, data, pages, i, response_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                events = new Array();
                return [4 /*yield*/, axios_1["default"].get(url)];
            case 1:
                response = _a.sent();
                data = response.data;
                pages = data.resultsPage.totalEntries / data.resultsPage.perPage;
                console.log("total: " + data.resultsPage.totalEntries);
                writeEventsToStream(data, res);
                if (!(data.resultsPage.totalEntries <= 50)) return [3 /*break*/, 2];
                return [2 /*return*/, events];
            case 2:
                i = 2;
                _a.label = 3;
            case 3:
                if (!(i <= pages + 1)) return [3 /*break*/, 9];
                process.stdout.write(i + "|");
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, axios_1["default"].get(url + "&page=" + i)];
            case 5:
                response_1 = _a.sent();
                writeEventsToStream(response_1.data, res);
                process.stdout.write("ok|");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7:
                setTimeout(function () {
                    "";
                }, 200);
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 3];
            case 9:
                console.log("|finished");
                _a.label = 10;
            case 10: return [2 /*return*/, events];
        }
    });
}); };
var writeEventsToStream = function (data, res) {
    data.resultsPage.results.event.map(function (elem) {
        var artists = new Array();
        elem.performance.map(function (artist) {
            artists.push({
                id: artist.id,
                name: artist.displayName
            });
        });
        var event = {
            type: elem.type,
            id: elem.id,
            name: elem.displayName,
            venue: {
                id: elem.venue.id,
                name: elem.venue.displayName
            },
            location: {
                city: elem.location.city,
                lat: elem.location.lat,
                lng: elem.location.lng
            },
            artists: artists,
            info: {
                time: elem.start.time,
                date: elem.start.date
            }
        };
        res.write(JSON.stringify(event));
    });
};
