import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";

let socket = io("http://localhost:3000/app");

function App() {
  const getVal = async (e) => {
    e.preventDefault();
    // const res = await axios.get("http://localhost:3000/scanner");
    // console.log(res);
    socket.emit("getstatus", { data: "Hi from react" });
    // socket.on("printstatus", (msg) => {
    //   console.log(`In react app--> ${msg}`);
    // });
  };

  return (
    <div className="App">
      <button onClick={(e) => getVal(e)}>Get VAL</button>
    </div>
  );
}

export default App;
