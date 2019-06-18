import { interval, fromEvent, Subject, from } from "rxjs"
import { scan, throttle } from "rxjs/operators"
import { showMarkerOnMap, getNewEventMarker } from "./maps"
import { Event } from "../../mic-backend/model/responseModels"
import { eventStore } from "./store"
import { hideMarkerPopup } from "./ui"

export const input$ = fromEvent(
    document.querySelector("#searchbar"),
    "input"
).pipe(throttle(() => interval(500)))

export const searchResultSubject = new Subject()
const searchResult$ = searchResultSubject.subscribe({
    next: result => {},
    error: () => {}
})

export const resultSubject = new Subject()

export const result$ = resultSubject.subscribe({
    next: (node: Event) => {
        const marker = getNewEventMarker(
            node.location.lat,
            node.location.lng,
            node.id
        )
        eventStore.pushEvent(node, marker)
        showMarkerOnMap(marker)
    },
    error: () => {},
    complete: () => {}
})

const clickOnMap$ = fromEvent(
    document.getElementById("map-container"),
    "mousedown"
)
clickOnMap$.subscribe({
    next: hideMarkerPopup
})
