import React, {useContext} from "react";
import favoriteContext from "../contexts/favoritesContext";

const Pokemon = (props) => {
  const { favoritePokemons, updateFavoritePokemons } = useContext(favoriteContext);
  const { pokemon } = props;
  
  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name);
  };

  const heart = favoritePokemons.includes(pokemon.name) ? "❤️" : "🖤";

  const pokemonGifs = "https://projectpokemon.org/images/sprites-models/bw-animated/";

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <img
          className="pokemon-image"
          alt={pokemon.name}
          src={(pokemon.id < 10) ? `${pokemonGifs}00${pokemon.id}.gif` : (pokemon.id < 100) ? `${pokemonGifs}0${pokemon.id}.gif` : (pokemon.id < 650) ? `${pokemonGifs}${pokemon.id}.gif` : pokemon.sprites.front_default}
          // src={pokemon.sprites.front_default}
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, index) => {
              return (
                <div key={index} className={type.type.name}>
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <button className="pokemon-heart-btn" onClick={onHeartClick} >{heart}</button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
