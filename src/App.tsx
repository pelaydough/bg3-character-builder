import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <section className="flex items-center border-b py-4 pl-3 pr-4 justify-between">
        <h3 className="font-semibold text-2xl">BG3 Character Creator</h3>
        <nav>
          <a className="mr-5">Character Creator</a>
          <span className="mr-5">|</span>
          <a className="mr-5">About</a>
          <span className="mr-5">|</span>
          <a>More Stuff</a>
        </nav>
      </section>
    </>
  );
}

export default App;
