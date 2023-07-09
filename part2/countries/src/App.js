import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Content from './components/Content'
import getAllCountries from './services/countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    getAllCountries()
    .then(initialCountries => {
      setAllCountries(initialCountries)
    })
  }, [])

  const handleFilterChange = (e) => {
    let newFilter = e.target.value
    setFilter(newFilter)

    if(newFilter !== '') {
      let nameMatcher = new RegExp(newFilter, 'i')
      const newFilteredCountries = allCountries.filter(country => country.name.common.match(nameMatcher))
      setFilteredCountries(newFilteredCountries)
    } else {
      setFilteredCountries([])
    }
  }  

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Content countries={filteredCountries} setCountries={setFilteredCountries} />
    </div>
  )
} 

export default App