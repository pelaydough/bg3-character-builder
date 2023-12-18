import { ChangeEvent } from "react";

interface Ability {
  name: string;
  score: number;
  plusOne: boolean;
  plusTwo: boolean;
}

interface AbilitiesProps {
  abilities: Ability[];
  abilityPoints: number;
  addAbilityPoint: (abilityName: string) => void;
  subtractAbilityPoint: (abilityName: string) => void;
  checkProficiencyToggle: (
    abilityName: string,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  resetAbilityPoints: () => void;
}

const Abilities: React.FC<AbilitiesProps> = ({
  abilities,
  abilityPoints,
  addAbilityPoint,
  subtractAbilityPoint,
  checkProficiencyToggle,
  resetAbilityPoints,
}) => {
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
