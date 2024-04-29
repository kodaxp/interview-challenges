import { useEffect, useState } from "react";

import api from "./api";
import { Pokemon } from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cartItems, setCartItems] = useState<Pokemon[]>([]);

  const handleAddToCart = (pokemon: Pokemon) => {
    if (cartItems.length < 3)
      setCartItems((prevItems) => [...prevItems, pokemon]);
  };

  useEffect(() => {
    api.list().then(setPokemons);
  }, []);

  return (
    <>
      <section>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <article key={pokemon.id}>
              <img className="nes-container" src={pokemon.image} />
              <div>
                <p>
                  {pokemon.name}{" "}
                  <span>
                    {pokemon.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </p>
                <p>{pokemon.description}</p>
              </div>
              <button
                className="nes-btn"
                onClick={() => handleAddToCart(pokemon)}
              >
                Agregar
              </button>
            </article>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </section>
      <aside>
        <button className="nes-btn is-primary">{cartItems.length} items</button>
      </aside>
    </>
  );
}

export default App;
