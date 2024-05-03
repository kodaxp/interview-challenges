import type {Pokemon} from "./types";

import {useState} from "react";

import {POKEMONS} from "./constants";
import PokemonCard from "./PokemonCard";

function App() {
  const [cart, setCart] = useState<Pokemon[]>(() =>
    JSON.parse(localStorage.getItem("cart") || "[]"),
  );

  const handleAdd = (pokemon: Pokemon) => {
    const newList = [...cart, pokemon];

    localStorage.setItem("cart", JSON.stringify(newList));
    setCart(newList);
  };

  const handleRemove = (id: string) => {
    const cleanList = cart.filter((pokemon) => pokemon.id !== id);
    const listFiltered = cart.filter((pokemon) => pokemon.id === id);

    if (listFiltered.length > 1) {
      const newList = [...cleanList, ...listFiltered.slice(1)];

      localStorage.setItem("cart", JSON.stringify(newList));
      setCart(newList);
    } else {
      localStorage.setItem("cart", JSON.stringify(cleanList));
      setCart(cleanList);
    }
  };

  const countInCart = (id: string) => cart.filter((pokemon) => pokemon.id === id).length;

  return (
    <>
      <nav>
        <input className="nes-input" id="name_field" placeholder="Charmander" type="text" />
      </nav>
      <section>
        {POKEMONS.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            count={countInCart}
            pokemon={pokemon}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">{cart.length} items</button>
      </aside>
    </>
  );
}

export default App;
