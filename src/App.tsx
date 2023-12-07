import { useState, ChangeEvent } from "react";

import origins from "./data/origins";
import races from "./data/races";

import "./App.css";

function App() {
  const [race, setRace] = useState(races[0]);
  const [subrace, setSubrace] = useState("Black Dragonborn");
  const [origin, setOrigin] = useState(origins[0].name);

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
      <div className="border my-2 mx-5 p-4 rounded-md">
        <section className="flex mb-4">
          <div className="flex flex-col w-3/5">
            <label className="mb-2 text-xs">Character Name:</label>
            <input
              type="text"
              className="bg-dark border font-white py-1 px-2 border-x-transparent border-t-transparent"
            />
          </div>
          <div className="flex flex-col w-2/5 ml-4">
            <label className="mb-2 text-xs">Origin:</label>
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
        <section className="flex">
          <div
            className={
              race.subraces ? "flex flex-col w-1/2" : "flex flex-col w-full"
            }
          >
            <label className="mb-2 text-xs">Race:</label>
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
              <label className="mb-2 text-xs">Subrace:</label>
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
      </div>
    </>
  );
}

export default App;
