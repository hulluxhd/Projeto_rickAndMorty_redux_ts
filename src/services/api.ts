import axios from "axios"
export const rickandmortyapi = axios.create({
    baseURL: "https://rickandmortyapi.com/api"
})