import { Artist, Venue, City } from "../../mic-backend/model/responseModels"
import { eventStore } from "./store"

export const showArtists = (artists: Artist) => {}
export const showVenues = (venues: Venue) => {}
export const showLocations = (locations: City) => {}

export const showMarkerPopup = evt => {
    const event = eventStore.getEvent(evt.target.getData())
    const eventString = `
        title: ${event.name}<br>
        ${event.info.date} ${event.info.time ? `- ${event.info.time}` : ""}<br>
        artists: ${event.artists
            .map(artist => {
                return `${artist.name}`
            })
            .join(", ")}<br>
        venue: ${event.venue.name}<br>
        location: ${event.location.city}`

    const popup = document.getElementById("marker-popup")
    popup.innerHTML = eventString
    popup.style.top = evt.target.top
    popup.style.left = evt.target.left
    popup.style.visibility = "visible"
    console.log("visible")
}

export const hideMarkerPopup = () => {
    document.getElementById("marker-popup").style.visibility = "hidden"
    console.log("hidden")
}

export const showResultModal = () => {
    document.getElementById("result-modal").style.display = "block"
}

export const hideResultModal = () => {
    document.getElementById("result-modal").style.display = "none"
}
