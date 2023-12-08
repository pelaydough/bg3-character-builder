import { useState } from "react";

import abilitiesData from "../data/abilities";

const Abilities = () => {
  const [abilities, setAbilities] = useState(abilitiesData);
  const [abilityPoints, setAbilityPoints] = useState(27);

  const addAbilityPoint = (abilityName: string) => {
    const selectedAbility = abilities.find(
      (ability) => ability.name === abilityName
    );

    if (selectedAbility) {
      setAbilities((prevAbilities) =>
        prevAbilities.map((ability) =>
          ability.name === abilityName
            ? { ...ability, score: ability.score + 1 }
            : ability
        )
      );

      setAbilityPoints((prevPoints) => prevPoints - 1);
    }
  };

  const subtractAbilityPoint = (abilityName: string) => {
    const selectedAbility = abilities.find(
      (ability) => ability.name === abilityName
    );

    if (selectedAbility) {
      setAbilities((prevAbilities) =>
        prevAbilities.map((ability) =>
          ability.name === abilityName
            ? { ...ability, score: ability.score - 1 }
            : ability
        )
      );

      setAbilityPoints((prevPoints) => prevPoints + 1);
    }
  };

  return (
    <div className="border my-2 mx-5 p-4 rounded-md">
      <div className="flex justify-between">
        <div className="flex flex-col items-center w-4/5">
          <span>Ability Points</span>
          <span>{abilityPoints}</span>
        </div>
        <div>
          <span>Bonus</span>
          <div>
            <span>+2</span>
            <span>+1</span>
          </div>
        </div>
      </div>
      <div>
        {abilities.map((ability) => (
          <div
            key={ability.name}
            className="flex justify-between mb-4 last:mb-0 items-center"
          >
            <h3 className="w-1/4">{ability.name}</h3>
            <div className="w-1/6 flex items-center justify-around">
              <button
                disabled={ability.score < 9}
                className="border rounded-full p-2"
                onClick={() => subtractAbilityPoint(ability.name)}
              >
                -
              </button>
              <span>{ability.score}</span>
              <button
                disabled={ability.score > 14}
                className="border rounded-full p-2"
                onClick={() => addAbilityPoint(ability.name)}
              >
                +
              </button>
            </div>
            <div>
              <input type="checkbox" />
              <input type="checkbox" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abilities;
