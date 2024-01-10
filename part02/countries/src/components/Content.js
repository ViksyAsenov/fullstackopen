import Country from "./Country"

const Content = ({ countries, setCountries }) => {
    if(countries.length === 0) {
        return <p>No countries found with that filter</p>
    }

    if(countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if(countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return (
        <ul>
            {countries.map(country => {
                return <li key={country.name.common}>{country.name.common} <button onClick={() => setCountries([country])}>Show</button></li>
            })}
        </ul>
    )
}

export default Content