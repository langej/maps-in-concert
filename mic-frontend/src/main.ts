import { moveMapToGeolocation } from "./maps"
import { getEventsFromGeolocation } from "./requestHandler"
import { input$ } from "./streams"

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        moveMapToGeolocation(latitude, longitude)
        getEventsFromGeolocation(longitude, latitude)
    })
}

input$.subscribe({
    next: input => {},
    error: reason => {
        console.log(reason)
    }
})
