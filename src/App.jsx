import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'
import image3 from './assets/img/image3.webp'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)
  

  useEffect(() => {
    let id = getRandomNumber()
    if(searchInput) {
      id = searchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`
    
    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
    
  }

  const handleChange = event => {

    if(event.target.value === '') {
      return setSuggestedList()
    }


    const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

    axios.get(URL)
    .then(res => setSuggestedList(res.data.results))
    .catch(err => console.log(err))
  }

  
  return (
    <div className="App">
      <header className='header__app'>
        <img className='header__logo' src={image3} alt="Rick & Morty header" />
      </header>
      
    <div className='container'>
        <aside className='search-container'>
        
      <form onSubmit={handleSubmit}>
        <input className='form__input'
        id='idLocation'
        placeholder='Enter another number from 1 to 126' 
        type="text" 
        onChange={handleChange}
        />
        <button className='form__button'>🔍
        {/* <h3 className='form_button-txt'>GO!</h3> */}
        </button>
        <FilterList 
          suggestedList={suggestedList}
          setSearchInput={setSearchInput}
        />
      </form>
      </aside>
      {
        hasError ?
          <ErrorScreen />
          :
          <>
      <div>
      <LocationInfo location={location} />
      <div className='card-container'>
        {
          location?.residents.map(url => (
            <CardResident
              key={url} 
              url={url}
            />
          ))
        }
      </div>
      </div>
      
      </>
}
    </div>
    </div>
  )
}

export default App
