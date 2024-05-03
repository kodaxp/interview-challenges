import type {Pokemon} from "./types";

import {memo} from "react";

type PokemonCardProps = {
  pokemon: Pokemon;
  onAdd: (pokemon: Pokemon) => void;
  count: (id: string) => number;
  onRemove: (id: string) => void;
};

function PokemonCard({pokemon, onAdd, count, onRemove}: PokemonCardProps) {
  return (
    <article key={pokemon.id}>
      <img className="nes-container" src={pokemon.image} />
      <div>
        <p>
          {pokemon.name} {count(pokemon.id)}
        </p>
        <p>{pokemon.description}</p>
      </div>
      {count(pokemon.id) === 0 ? (
        <button className="nes-btn" onClick={() => onAdd(pokemon)}>
          Agregar
        </button>
      ) : (
        <>
          <button className="nes-btn" onClick={() => onAdd(pokemon)}>
            +
          </button>
          <button className="nes-btn" onClick={() => onRemove(pokemon.id)}>
            -
          </button>
        </>
      )}
    </article>
  );
}

export default memo(PokemonCard, (prevProp, prop) => prevProp.count === prop.count);
