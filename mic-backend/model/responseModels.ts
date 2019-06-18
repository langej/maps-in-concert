import { getEventsFromArtist } from "../songkickhandler"

export interface Artist {
    id: number
    name: string
}

export interface City {
    id: number
    name: string
    country: string
    state?: string | undefined
}

export interface Venue {
    id: number
    name: string
    city: City
}

export interface Event {
    id: number
    name: string
    artists: Artist[]
    venue: {
        id: number
        name: string
    }
    location: {
        lng: string
        lat: string
        city: string
    }
    type: string
    info: {
        time: string
        date: string
    }
}
