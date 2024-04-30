import type {Pokemon} from "./types";

import {useState} from "react";

import {POKEMONS} from "./constants";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>(POKEMONS);
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Pokemon[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );

  const total = cart.reduce((acc, pokemon) => acc + pokemon.price, 0);

  const isInFavorites = (pokemon: Pokemon) => {
    return favorites.some((pokeFav) => pokeFav.id === pokemon.id);
  };

  const handleAddToCart = (pokemon: Pokemon) => {
    if (total + pokemon.price <= 10) setCart((prevState) => [...prevState, pokemon]);
  };

  const handleAddToFavorites = (pokemon: Pokemon) => {
    if (isInFavorites(pokemon)) {
      const newList = favorites.filter((item) => item.id !== pokemon.id);

      localStorage.setItem("favorites", JSON.stringify(newList));

      setFavorites(newList);

      return;
    }
    const newList = favorites.concat(pokemon);

    localStorage.setItem("favorites", JSON.stringify(newList));

    setFavorites(newList);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    if (!value) {
      setPokemons(POKEMONS);

      return;
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value),
    );

    setPokemons(filteredPokemons);
  };

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          onChange={handleSearch}
        />
      </nav>
      <section>
        {pokemons.map((pokemon) => {
          return (
            <article key={pokemon.id}>
              <figure onClick={() => handleAddToFavorites(pokemon)}>
                <i
                  className={`nes-icon is-medium heart ${
                    isInFavorites(pokemon) ? "" : "is-transparent"
                  }`}
                />
                <img className="nes-container" src={pokemon.image} />
              </figure>
              <div>
                <p>
                  {pokemon.name} (${pokemon.price})
                </p>
                <p>{pokemon.description}</p>
              </div>
              <button className="nes-btn" onClick={() => handleAddToCart(pokemon)}>
                Agregar
              </button>
            </article>
          );
        })}
      </section>
      <aside>
        <button className="nes-btn is-primary">
          {cart.length} items (total ${total})
        </button>
      </aside>
    </>
  );
}

export default App;
