import React from "react";

import { Race, Ability } from "../interfaces";

interface CharacterDataProps {
  characterName: string;
  race: Race;
  subrace: string;
  abilities: Ability[];
  checkAbilityModifier: (abilityName: string) => string;
}

const CharacterData: React.FC<CharacterDataProps> = ({
  characterName,
  race,
  subrace,
  abilities,
  checkAbilityModifier,
}) => {
  return (
    <div className="border my-2 mx-5 p-4 rounded-md flex flex-col items-center">
      <h1 className="font-bold text-lg">
        {characterName ? characterName : "Tav"}
      </h1>
      <span className="mb-2">{subrace ? subrace : race.name}</span>
      <div className="flex w-1/2 justify-between">
        {abilities.map((ability) => (
          <div className="flex flex-col items-center">
            <span>{ability.acronym}</span>
            <div className="flex items-center">
              <span>{ability.score}</span>
              <span className="text-xs pl-1">
                ({checkAbilityModifier(ability.name)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterData;
