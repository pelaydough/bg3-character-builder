import { useState, ChangeEvent } from "react";

import CharacterInfo from "./views/CharacterInfo";
import Abilities from "./views/Abilities";
import Tabs from "./views/Tabs";
import CharacterData from "./views/CharacterData";

import origins from "./data/origins";
import races from "./data/races";
import backgrounds from "./data/backgrounds";
import abilitiesData from "./data/abilities";

import "./App.css";

function App() {
  const [abilities, setAbilities] = useState(abilitiesData);
  const [abilityPoints, setAbilityPoints] = useState(27);
  const [characterName, setCharacterName] = useState("");
  const [race, setRace] = useState(races[0]);
  const [subrace, setSubrace] = useState("Black Dragonborn");
  const [origin, setOrigin] = useState(origins[0].name);
  const [background, setBackground] = useState(backgrounds[0].name);
  const [activeTab, setActiveTab] = useState("background");

  const findSelectedAbility = (abilityName: string) => {
    const selectedAbility = abilities.find(
      (ability) => ability.name === abilityName
    );

    return selectedAbility;
  };

  const addAbilityPoint = (abilityName: string) => {
    const selectedAbility = findSelectedAbility(abilityName);

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
      prevAbilities.map(
        (ability) =>
          ability && { ...ability, score: 8, plusOne: false, plusTwo: false }
      )
    );

    setAbilityPoints(27);
  };

  const handleCharacterNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selectedRace =
      races.find((race) => race.name === selectedName) || races[0];
    setRace(selectedRace);
    selectedRace.subraces
      ? setSubrace(selectedRace.subraces[0].name)
      : setSubrace("");
  };
  const handleSubraceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSubrace(event.target.value);
  };
  const handleOriginChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrigin(event.target.value);
  };
  const handleBackgroundChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBackground(event.target.value);
  };

  const renderInfoView = (activeTab: string) => {
    switch (activeTab) {
      case "background":
        return (
          <CharacterInfo
            characterName={characterName}
            race={race}
            subrace={subrace}
            origin={origin}
            background={background}
            handleCharacterNameChange={handleCharacterNameChange}
            handleBackgroundChange={handleBackgroundChange}
            handleOriginChange={handleOriginChange}
            handleRaceChange={handleRaceChange}
            handleSubraceChange={handleSubraceChange}
          />
        );
      case "abilities":
        return (
          <Abilities
            abilities={abilities}
            abilityPoints={abilityPoints}
            addAbilityPoint={addAbilityPoint}
            checkProficiencyToggle={checkProficiencyToggle}
            subtractAbilityPoint={subtractAbilityPoint}
            resetAbilityPoints={resetAbilityPoints}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <section className="flex items-center py-4 pl-3 pr-4 justify-between">
        <h3 className="font-semibold text-2xl text-yellow-500">
          BG3 Character Creator
        </h3>
        <nav>
          <a href="#">Character Creator</a>
          <span>|</span>
          <a>About</a>
          <span>|</span>
          <a>More Stuff</a>
        </nav>
      </section>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderInfoView(activeTab)}
      <CharacterData
        characterName={characterName}
        race={race}
        subrace={subrace}
        abilities={abilities}
      />
    </>
  );
}

export default App;
