import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State to hold all the pokemon info from the API
  const [pokemonData, setPokemonData] = useState(null)
  // State for what pokemon we want to look up
  const [name, setName] = useState('charizard')
  // State for the text in the search box
  const [searchInput, setSearchInput] = useState('')

  // Fetch pokemon data whenever `name` changes
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemonData(data))
      .catch(() => alert('Pokemon not found!'))
  }, [name])

  // When the search button is clicked, update the name to search for
  function handleSearch() {
    setName(searchInput.toLowerCase())
  }

  return (
    <div className="pokedex">
      {/* Top bar with the "camera lens" like a real Pokedex */}
      <div className="pokedex-top">
        <div className="lens"></div>
        <div className="small-lights">
          <span className="light red"></span>
          <span className="light yellow"></span>
          <span className="light green"></span>
        </div>
      </div>

      {/* Search box */}
      <div className="search">
        <input
          type="text"
          placeholder="Enter a pokemon name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Only show the entry once the data has loaded */}
      {pokemonData && (
        <div className="entry">
          <h1>{pokemonData.name}</h1>

          <img
            className="sprite"
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />

          {/* Types, e.g. fire / flying */}
          <div className="types">
            {pokemonData.types.map((t) => (
              <span key={t.type.name} className="type">{t.type.name}</span>
            ))}
          </div>

          <p>Height: {pokemonData.height / 10} m</p>
          <p>Weight: {pokemonData.weight / 10} kg</p>
          <p>Base Experience: {pokemonData.base_experience}</p>

          {/* Abilities list */}
          <h2>Abilities</h2>
          <ul>
            {pokemonData.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>

          {/* Stats with simple bars */}
          <h2>Stats</h2>
          {pokemonData.stats.map((s) => (
            <div key={s.stat.name} className="stat">
              <span className="stat-name">{s.stat.name}</span>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${s.base_stat}%` }}
                ></div>
              </div>
              <span>{s.base_stat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App