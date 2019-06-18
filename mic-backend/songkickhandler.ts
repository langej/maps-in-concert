import Axios from "axios"
import { SONGKICK_API_KEY } from "../config"
import { Artist, Venue, City, Event } from "./model/responseModels"
import { ResultsPage } from "./model/songkickModel"

const DOMAIN = "https://api.songkick.com/api/3.0"

export const searchArtist = (req, res) => {
    const name = req.params.name
    const url = `${DOMAIN}/search/artists.json?apikey=${SONGKICK_API_KEY}&query=${name}`
    const artists = new Array<Artist>()
    Axios.get(url)
        .then(response => {
            response.data.resultsPage.results.artist.map(artist => {
                artists.push({
                    id: artist.id,
                    name: artist.displayName
                })
            })
            res.json(artists)
        })
        .catch(reason => {
            console.log(reason)
        })
}

export const searchVenue = (req, res) => {
    const name = req.params.name
    const url = `${DOMAIN}/search/venues.json?apikey=${SONGKICK_API_KEY}&query=${name}`
    const venues = new Array<Venue>()
    Axios.get(url)
        .then(response => {
            response.data.resultsPage.results.venue.map(venue => {
                venues.push({
                    id: venue.id,
                    name: venue.displayName,
                    city: {
                        id: venue.city.id,
                        name: venue.city.name,
                        country: venue.city.country.displayName
                    }
                })
            })
            res.json(venues)
        })
        .catch(reason => {
            console.log(reason)
        })
}

export const searchLocation = (req, res) => {
    const name = req.params.name
    const url = `${DOMAIN}/search/locations.json?apikey=${SONGKICK_API_KEY}&query=${name}`
    const locations = new Array<City>()
    Axios.get(url)
        .then(response => {
            response.data.resultsPage.results.location.map(city => {
                const state = city.city.state
                    ? city.city.state.displayName
                    : undefined
                locations.push({
                    id: city.metroArea.id,
                    name: city.city.displayName,
                    country: city.city.country.displayName,
                    state: state
                })
            })
            res.json(locations)
        })
        .catch(reason => {
            console.log(reason)
        })
}

export const getEventsFromGeolocation = (req, res) => {
    const longitude = req.params.longitude
    const latitude = req.params.latitude
    const url = `https://api.songkick.com/api/3.0/events.json?apikey=${SONGKICK_API_KEY}&location=geo:${latitude},${longitude}`

    collectAllEvents(url, res)
        .then(events => {
            res.end(JSON.stringify({ finished: "ok" }))
        })
        .catch(reason => {
            console.log(reason)
            res.status(400).send("Bad Request")
        })
}

export const getEventsFromArtist = (req, res) => {
    const id = req.params.id
    const url = `${DOMAIN}/artists/${id}/calendar.json?apikey=${SONGKICK_API_KEY}`

    collectAllEvents(url, res)
        .then(events => {
            res.end(JSON.stringify({ finished: "ok" }))
        })
        .catch(reason => {
            console.log(reason)
            res.status(400).send("Bad Request")
        })
}

export const getEventsFromLocation = (req, res) => {
    const id = req.params.id
    const url = `${DOMAIN}/metro_areas/${id}/calendar.json?apikey=${SONGKICK_API_KEY}`

    collectAllEvents(url, res)
        .then(events => {
            res.end()
        })
        .catch(reason => {
            console.log(reason)
            res.status(400).send("Bad Request")
        })
}

export const getEventsFromVenue = (req, res) => {
    const id = req.params.id
    const url = `${DOMAIN}/venues/${id}/calendar.json?apikey=${SONGKICK_API_KEY}`

    collectAllEvents(url, res)
        .then(events => {
            res.end(JSON.stringify({ finished: "ok" }))
        })
        .catch(reason => {
            console.log(reason)
            res.status(400).send("Bad Request")
        })
}

const collectAllEvents = async (url, res) => {
    let events = new Array<Event>()
    const response = await Axios.get(url)
    const data: ResultsPage = response.data

    const pages = data.resultsPage.totalEntries / data.resultsPage.perPage
    console.log(`total: ${data.resultsPage.totalEntries}`)
    writeEventsToStream(data, res)
    if (data.resultsPage.totalEntries <= 50) {
        return events
    } else {
        for (let i = 2; i <= pages + 1; i++) {
            process.stdout.write(i + "|")
            try {
                const response = await Axios.get(`${url}&page=${i}`)
                writeEventsToStream(response.data, res)

                process.stdout.write("ok|")
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                ""
            }, 200)
        }
        console.log("|finished")
    }
    return events
}

const writeEventsToStream = (data: ResultsPage, res) => {
    data.resultsPage.results.event.map((elem: any) => {
        const artists = new Array<Artist>()
        elem.performance.map(artist => {
            artists.push({
                id: artist.id,
                name: artist.displayName
            })
        })
        const event = {
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
        }
        res.write(JSON.stringify(event))
    })
}
