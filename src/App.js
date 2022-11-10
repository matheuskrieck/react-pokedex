import React, { useEffect, useState } from "react";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Searchbar";
import { FavoriteProvider } from "./contexts/favoritesContext";

const favoritesKey = "f";
function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const itemsPerPage = 24;
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itemsPerPage, itemsPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  function updateFavoritePokemons(name) {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }

    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if(!result) {
      setNotFound(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
          <div className="not-found-text"><p>Not found! Try again...
          </p>
          <img width="150px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0f2e8b07-4a84-4ea8-9170-797302474b7b/davazny-4770d748-9e73-413e-846b-b0e579a11180.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBmMmU4YjA3LTRhODQtNGVhOC05MTcwLTc5NzMwMjQ3NGI3YlwvZGF2YXpueS00NzcwZDc0OC05ZTczLTQxM2UtODQ2Yi1iMGU1NzlhMTExODAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5BMZ9ZlkslsuOLqxcMy0Z97FKJXgVpsEl9PSHGIjVSU" alt="Sad Togepi" />
          </div>
        ) :
        (<Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />)}
      </div>
    </FavoriteProvider>
  );
}

export default App;