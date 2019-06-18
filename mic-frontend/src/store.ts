import { Event } from "../../mic-backend/model/responseModels"
import { removeMarker } from "./maps"

interface EventMarkerMap {
    event: Event
    marker: any
}

class EventStore {
    events: EventMarkerMap[]

    constructor() {
        this.events = new Array<EventMarkerMap>()
    }

    getEvent(id: number): Event {
        return this.events.find(it => {
            return it.event.id === id
        }).event
    }

    pushEvent(event: Event, marker: {}) {
        this.events.push({ event, marker })
    }

    resetStore() {
        this.events = new Array<EventMarkerMap>()
    }
}

export const eventStore = new EventStore()

export const markerStore = []

export const resetMarkerStore = () => {
    markerStore.map(marker => {
        removeMarker(marker)
    })
}
