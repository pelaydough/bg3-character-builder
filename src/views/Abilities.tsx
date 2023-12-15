import { ChangeEvent, useState } from "react";

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

  const checkProficiencyToggle = (
    abilityName: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedAbility = findSelectedAbility(abilityName);

    if (selectedAbility) {
      if (event.target.name === "plusOneChecked") {
        setAbilities((prevAbilities) =>
          prevAbilities.map((ability) =>
            ability.name === abilityName &&
            ability.plusOne == false &&
            ability.plusTwo == true
              ? {
                  ...ability,
                  score: ability.score - 1,
                  plusOne: true,
                  plusTwo: false,
                }
              : ability.name === abilityName && ability.plusOne == false
              ? {
                  ...ability,
                  score: ability.score + 1,
                  plusOne: true,
                  plusTwo: false,
                }
              : ability.name === abilityName && ability.plusOne == true
              ? {
                  ...ability,
                  score: ability.score - 1,
                  plusOne: false,
                }
              : ability
          )
        );
      }

      if (event.target.name === "plusTwoChecked") {
        setAbilities((prevAbilities) =>
          prevAbilities.map((ability) =>
            ability.name === abilityName &&
            ability.plusTwo == false &&
            ability.plusOne == true
              ? {
                  ...ability,
                  score: ability.score + 1,
                  plusOne: false,
                  plusTwo: true,
                }
              : ability.name === abilityName && ability.plusTwo == false
              ? {
                  ...ability,
                  score: ability.score + 2,
                  plusOne: false,
                  plusTwo: true,
                }
              : ability.name === abilityName && ability.plusTwo == true
              ? {
                  ...ability,
                  score: ability.score - 2,
                  plusTwo: false,
                }
              : ability
          )
        );
      }
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
            <span>+1</span>
            <span>+2</span>
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
                onChange={(event) =>
                  checkProficiencyToggle(ability.name, event)
                }
                name="plusOneChecked"
                type="checkbox"
                checked={ability.plusOne}
              />
              <input
                onChange={(event) =>
                  checkProficiencyToggle(ability.name, event)
                }
                name="plusTwoChecked"
                type="checkbox"
                checked={ability.plusTwo}
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
