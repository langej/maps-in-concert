import Axios from "axios"
import oboe from "oboe"

import { showMarkerOnMap, getNewEventMarker } from "./maps"
import { resultSubject } from "./streams"
import { resetMarkerStore, eventStore } from "./store"
import { showArtists } from "./ui"

const oboeParseString = "{type id name venue location artists info}"

export const getEventsFromGeolocation = (longitude, latitude) => {
    resetMarkerStore()
    eventStore.resetStore()
    oboe(`http://localhost:8080/get/events/geo/${longitude}/${latitude}`)
        .node(oboeParseString, node => {
            resultSubject.next(node)
        })
        .node("{finished}", node => {
            console.log("finished..")
        })
        .fail(reason => {
            console.log(reason)
        })
}

export const getEventsFromArtist = id => {
    resetMarkerStore()
    eventStore.resetStore()
    oboe(`http://localhost:8080/get/events/artist/${id}`)
        .node(oboeParseString, node => {
            resultSubject.next(node)
        })
        .node("{finished}", node => {
            console.log("finished..")
        })
        .fail(reason => {
            console.log(reason)
        })
}

export const getEventsFromVenue = id => {
    resetMarkerStore()
    eventStore.resetStore()
    oboe(`http://localhost:8080/get/events/venue/${id}`)
        .node(oboeParseString, node => {
            resultSubject.next(node)
        })
        .node("{finished}", node => {
            console.log("finished..")
        })
        .fail(reason => {
            console.log(reason)
        })
}

export const getEventsFromLocation = id => {
    resetMarkerStore()
    eventStore.resetStore()
    oboe(`http://localhost:8080/get/events/location/${id}`)
        .node(oboeParseString, node => {
            resultSubject.next(node)
        })
        .node("{finished}", node => {
            console.log("finished..")
        })
        .fail(reason => {
            console.log(reason)
        })
}

export const searchArtists = (name: string) => {
    Axios.get(`http://localhost:8080/search/artist/${name}`)
        .then(response => {
            showArtists(response.data)
        })
        .catch(reason => console.log(reason))
}
export const searchVenue = (name: string) => {}
export const searchLocation = (name: string) => {}
