import { useState } from "react";

import abilitiesData from "../data/abilities";

const Abilities = () => {
  const [abilities, setAbilities] = useState(abilitiesData);
  const [abilityPoints, setAbilityPoints] = useState(27);

  const findSelectedAbility = (abilityName: string) => {
    const selectedAbility = abilities.find(
      (ability) => ability.name === abilityName
    );

    return selectedAbility;
  };

  const addAbilityPoint = (abilityName: string) => {
    const selectedAbility = findSelectedAbility(abilityName);

    // Needs to check if score > 13. If so, deduct two points from abilityPoints.
    if (selectedAbility) {
      if (selectedAbility.score < 13 && abilityPoints >= 1) {
        setAbilities((prevAbilities) =>
          prevAbilities.map((ability) =>
            ability.name === abilityName
              ? { ...ability, score: ability.score + 1 }
              : ability
          )
        );

        setAbilityPoints((prevPoints) => prevPoints - 1);
      }

      if (selectedAbility.score >= 13 && abilityPoints >= 2) {
        setAbilities((prevAbilities) =>
          prevAbilities.map((ability) =>
            ability.name === abilityName
              ? { ...ability, score: ability.score + 1 }
              : ability
          )
        );

        setAbilityPoints((prevPoints) => prevPoints - 2);
      }
    }
  };

  const plusTwoChecked = (abilityName: string) => {
    const selectedAbility = findSelectedAbility(abilityName);

    if (selectedAbility) {
      setAbilities((prevAbilities) =>
        prevAbilities.map((ability) =>
          ability.name === abilityName && ability.plusTwo == false
            ? {
                ...ability,
                score: ability.score + 2,
                plusTwo: true,
                plusOne: false,
              }
            : ability.plusTwo == true
            ? { ...ability, score: ability.score - 2, plusTwo: false }
            : ability
        )
      );
    }
  };

  const plusOneChecked = (abilityName: string) => {
    const selectedAbility = findSelectedAbility(abilityName);

    if (selectedAbility) {
      setAbilities((prevAbilities) =>
        prevAbilities.map((ability) =>
          ability.name === abilityName && ability.plusOne == false
            ? {
                ...ability,
                score: ability.score + 1,
                plusTwo: false,
                plusOne: true,
              }
            : ability.plusOne == true
            ? { ...ability, score: ability.score - 1, plusOne: false }
            : ability
        )
      );
    }
  };

  const subtractAbilityPoint = (abilityName: string) => {
    const selectedAbility = findSelectedAbility(abilityName);

    if (selectedAbility) {
      setAbilities((prevAbilities) =>
        prevAbilities.map((ability) =>
          ability.name === abilityName
            ? { ...ability, score: ability.score - 1 }
            : ability
        )
      );

      if (selectedAbility.score < 14) {
        setAbilityPoints((prevPoints) => prevPoints + 1);
      }

      if (selectedAbility.score >= 14) {
        setAbilityPoints((prevPoints) => prevPoints + 2);
      }
    }
  };

  const resetAbilityPoints = () => {
    setAbilities((prevAbilities) =>
      prevAbilities.map((ability) => ability && { ...ability, score: 8 })
    );

    setAbilityPoints(27);
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
                disabled={ability.score > 14 || abilityPoints == 0}
                className="border rounded-full p-2"
                onClick={() => addAbilityPoint(ability.name)}
              >
                +
              </button>
            </div>
            <div>
              <input
                // checked={ability.plusTwo}
                name="abilityProficiency"
                type="radio"
              />
              <input
                // checked={ability.plusOne}
                name="abilityProficiency"
                type="radio"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="border py-1 px-2 rounded-md"
        onClick={resetAbilityPoints}
      >
        Reset
      </button>
    </div>
  );
};

export default Abilities;
