import {
    searchArtist,
    searchVenue,
    searchLocation,
    getEventsFromGeolocation,
    getEventsFromArtist,
    getEventsFromVenue,
    getEventsFromLocation
} from "./songkickhandler"
import { PORT } from "../config"
import { getSetlistsFromArtist } from "./setlistFMHandler"

const express = require("express")

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.get("/search/artist/:name", searchArtist)
app.get("/search/venue/:name", searchVenue)
app.get("/search/location/:name", searchLocation)

app.get("/get/events/geo/:longitude/:latitude", getEventsFromGeolocation)
app.get("/get/events/artist/:id", getEventsFromArtist)
app.get("/get/events/venue/:id", getEventsFromVenue)
app.get("/get/events/location/:id", getEventsFromLocation)

app.get("/get/setlist/:name", getSetlistsFromArtist)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))
