import { useState, ChangeEvent } from "react";

import CharacterInfo from "./views/CharacterInfo";
import Abilities from "./views/Abilities";
import Tabs from "./views/Tabs";

import origins from "./data/origins";
import races from "./data/races";
import backgrounds from "./data/backgrounds";

import "./App.css";

function App() {
  const [race, setRace] = useState(races[0]);
  const [subrace, setSubrace] = useState("Black Dragonborn");
  const [origin, setOrigin] = useState(origins[0].name);
  const [background, setBackground] = useState(backgrounds[0].name);
  const [activeTab, setActiveTab] = useState("background");

  const handleRaceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selectedRace =
      races.find((race) => race.name === selectedName) || races[0];
    setRace(selectedRace);
    selectedRace.subraces ? setSubrace(selectedRace.subraces[0].name) : null;
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
            race={race}
            subrace={subrace}
            origin={origin}
            background={background}
            handleBackgroundChange={handleBackgroundChange}
            handleOriginChange={handleOriginChange}
            handleRaceChange={handleRaceChange}
            handleSubraceChange={handleSubraceChange}
          />
        );
      case "abilities":
        return <Abilities />;
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
    </>
  );
}

export default App;
