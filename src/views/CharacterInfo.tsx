import { ChangeEvent } from "react";

import origins from "../data/origins";
import races from "../data/races";
import backgrounds from "../data/backgrounds";

import { Race } from "../interfaces";

interface CharacterInfoProps {
  characterName: string;
  race: Race;
  subrace: string;
  origin: string;
  background: string;
  handleCharacterNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRaceChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSubraceChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleOriginChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleBackgroundChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  characterName,
  race,
  subrace,
  origin,
  background,
  handleCharacterNameChange,
  handleBackgroundChange,
  handleOriginChange,
  handleRaceChange,
  handleSubraceChange,
}) => {
  return (
    <>
      <div className="border my-2 mx-5 p-4 rounded-md">
        <section className="flex mb-6">
          <div className="flex flex-col w-3/5">
            <label className="label">Character Name:</label>
            <input
              type="text"
              placeholder="Tav"
              value={characterName}
              onChange={handleCharacterNameChange}
              className="bg-dark border font-white py-1 px-2 border-x-transparent border-t-transparent"
            />
          </div>
          <div className="flex flex-col w-2/5 ml-4">
            <label className="label">Origin:</label>
            <select
              value={origin}
              onChange={handleOriginChange}
              className="bg-dark border py-1 px-1 border-r-8 border-t-transparent border-x-transparent"
            >
              {origins.map((origin) => (
                <option value={origin.name} key={origin.name}>
                  {origin.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="flex mb-6">
          <div
            className={
              race.subraces ? "flex flex-col w-1/2" : "flex flex-col w-full"
            }
          >
            <label className="label">Race:</label>
            <select
              value={race.name}
              onChange={handleRaceChange}
              className="bg-dark border py-1 px-1 border-r-8 border-t-transparent border-x-transparent"
            >
              {races.map((race) => (
                <option key={race.name} value={race.name}>
                  {race.name}
                </option>
              ))}
            </select>
          </div>
          {race.subraces ? (
            <div className="flex flex-col w-1/2 ml-4">
              <label className="label">Subrace:</label>
              <select
                value={subrace}
                onChange={handleSubraceChange}
                className="bg-dark border py-1 px-1 border-r-8 border-t-transparent border-x-transparent"
              >
                {race.subraces?.map((subrace) => (
                  <option key={subrace.name} value={subrace.name}>
                    {subrace.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}
        </section>
        <section className="flex flex-col">
          <label className="label">Background</label>
          <select
            value={background}
            onChange={handleBackgroundChange}
            className="w-full bg-dark border py-1 px-1 border-r-8 border-t-transparent border-x-transparent"
          >
            {backgrounds.map((background) => (
              <option key={background.name}>{background.name}</option>
            ))}
          </select>
        </section>
      </div>
    </>
  );
};

export default CharacterInfo;
