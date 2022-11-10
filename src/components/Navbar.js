import React, { useContext } from "react";
import favoriteContext from "../contexts/favoritesContext";

const Navbar = () => {
  const { favoritePokemons } = useContext(favoriteContext);

  const logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <>
      <nav>
        <div>
          <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
        </div>
        <div>❤️ {favoritePokemons.length} favorites</div>
      </nav>
    </>
  );
};

export default Navbar;
