import axios from 'axios'

const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAllCountries = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

export default getAllCountries