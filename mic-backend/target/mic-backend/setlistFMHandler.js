"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var config_1 = require("../config");
exports.getSetlistsFromArtist = function (req, res) {
    axios_1["default"].get("https://api.setlist.fm/rest/1.0/search/setlists?artistName=" + req.params.name, {
        headers: {
            "x-api-key": config_1.SETLISTFM_API_KEY,
            Accept: "application/json"
        }
    })
        .then(function (response) {
        res.json(response.data);
    })["catch"](function (reason) {
        res.status("400");
    });
};
