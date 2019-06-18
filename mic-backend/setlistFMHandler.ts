import Axios from "axios"
import { SETLISTFM_API_KEY } from "../config"

export const getSetlistsFromArtist = (req, res) => {
    Axios.get(
        `https://api.setlist.fm/rest/1.0/search/setlists?artistName=${
            req.params.name
        }`,
        {
            headers: {
                "x-api-key": SETLISTFM_API_KEY,
                Accept: "application/json"
            }
        }
    )
        .then(response => {
            res.json(response.data)
        })
        .catch(reason => {
            res.status("400")
        })
}
