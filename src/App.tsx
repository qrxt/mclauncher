// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import React from "react";

import { css } from "@emotion/react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Index() {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("settings.title")}</p>

      <ul>
        <li>
          <Link to="/first">to first</Link>
        </li>
        <li>
          <Link to="/second">to second</Link>
        </li>
      </ul>
    </div>
  );
}

function FirstPage() {
  return (
    <div>
      <a href="/">back</a>
      <p>first page content</p>
    </div>
  );
}

function SecondPage() {
  return (
    <div>
      <a href="/">back</a>
      <p>second page content</p>
    </div>
  );
}

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  // return (
  //   <div className="container">
  //     <h1>Welcome to Tauri!</h1>

  //     <div className="row">
  //       <a href="https://vitejs.dev">
  //         <img src="/vite.svg" className="logo vite" alt="Vite logo" />
  //       </a>
  //       <a href="https://tauri.app">
  //         <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
  //       </a>
  //       <a href="https://reactjs.org">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>

  //     <p>Click on the Tauri, Vite, and React logos to learn more.</p>

  //     <div className="row">
  //       <div>
  //         <input
  //           id="greet-input"
  //           onChange={(e) => setName(e.currentTarget.value)}
  //           placeholder="Enter a name..."
  //         />
  //         <button type="button" onClick={() => greet()}>
  //           Greet
  //         </button>
  //       </div>
  //     </div>
  //     <p>{greetMsg}</p>
  //   </div>
  // );

  const style = css`
    color: tomato;
    font-size: 3rem;
  `;

  // return <div css={style}>Hello!</div>;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="first" element={<FirstPage />} />
          <Route path="second" element={<SecondPage />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
