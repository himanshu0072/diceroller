import React, { useState } from "react";
import "./App.css";

const number = [1, 2, 3, 4, 5, 6];

function App() {
  const maxLimit = 10;
  const [chosenNumber, setChosenNumber] = useState(null);
  const [rolledNumber, setRolledNumber] = useState(null);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);
  const [wins, setWins] = useState(0);
  const [loss, setLoss] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [limit, setLimit] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const getChosenNumber = (event, num) => {
    const selectedNumber = parseInt(event.target.textContent);
    setChosenNumber(selectedNumber);
    setMsg(null);
    setSelectedNumber(num);
  };

  const rollDice = () => {
    if (limit < maxLimit && !isRolling) {
      setIsRolling(true); // Start rolling animation

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * number.length);
        const rolledValue = number[randomIndex];
        setRolledNumber(rolledValue);
        setLimit(limit + 1);
        setIsRolling(false); // Reset rolling animation

        // Call checkWinning after setting rolledNumber
        if (chosenNumber === rolledValue) {
          setStatus("You Guessed right✅");
          setWins(wins + 1);
        } else {
          setStatus("You are wrong ❌");
          setChosenNumber(null);
          setLoss(loss + 1);
          setMsg("Choose again !🫤");
        }
      }, 1000); // Adjust the duration as needed
    }
  };

  const resetAll = () => {
    setChosenNumber(null);
    setLimit(0);
    setRolledNumber(null);
    setLoss(0);
    setWins(0);
    setSelectedNumber(null);
    setStatus(null);
  };

  return (
    <>
      <div className="heading">
        <h1>Guess & Roll</h1>
      </div>
      <div className="Score">
        <h2>
          <span className="win">Win = {wins}</span>,{" "}
          <span className="loss">Loss = {loss}</span>
        </h2>
      </div>
      <div className="main">
        <div className="left">
          <div className="details">
            <h2>Choose your number first</h2>
            <div className="ButtonSelector">
              {number.map((num) => (
                <button
                  key={num}
                  onClick={(event) => getChosenNumber(event, num)}
                  className={selectedNumber === num ? "selected" : ""}
                  disabled={limit === maxLimit}
                >
                  {num}
                </button>
              ))}
            </div>
            <p>Total tries left: {maxLimit - limit}</p>
            {chosenNumber !== null && <h3>You have chosen: {chosenNumber}</h3>}
            <h2 className="msg">{msg}</h2>
          </div>
        </div>

        <div className="right">
          <div className="App">
            <div className={`Container ${isRolling ? "rolling" : ""}`}>
              <span className="text">
                {rolledNumber !== null ? rolledNumber : "Start"}
              </span>
            </div>
          </div>
          <div className="roller">
            <button
              onClick={rollDice}
              disabled={chosenNumber === null || limit >= maxLimit}
            >
              Roll
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="result">{status}</h1>
        <div id="retry">
          {limit >= maxLimit && <button onClick={resetAll}>Replay 🔁</button>}
        </div>
      </div>
      <div className="owner">
        {" "}
        Powered by -{" "}
        <a
          href="https://connectit000.000webhostapp.com/himanshu/"
          target="_blank"
          rel="noreferrer"
        >
          Himanshu Prajapati
        </a>
      </div>
    </>
  );
}

export default App;
