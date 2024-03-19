import { useEffect, useState } from "react";
import "./App.css";
import backendUrl from "./config";

function Validator({ number, onGuess }) {
  const [guess, setGuess] = useState("");

  const handleGuess = () => {
    if (guess !== "") {
      onGuess(guess);
      setGuess("");
    }
  };

  return (
    <div>
      <input
        id="numberInput"
        type="number"
        min="1"
        max="100"
        value={guess}
        onChange={(e) => {
          let value = parseInt(e.target.value);

          if (!isNaN(value) && value >= 1 && value <= 100) {
            setGuess(value);
          } else {
            setGuess("");
          }
        }}
      />
      <button className="default-button" onClick={handleGuess}>
        Guess
      </button>
    </div>
  );
}

function App() {
  const [number, setNumber] = useState(null);
  const [tries, setTries] = useState(10);
  const [message, setMessage] = useState(
    "The number is between 1 and 100. Good Luck!",
  );
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const getAndSetNumber = async function () {
      try {
        const response = await fetch(backendUrl);

        const data = await response.json();

        if (data.success) {
          setNumber(data.number);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAndSetNumber();
  }, []);

  const handleGuess = (guess) => {
    if (guess === number) {
      setMessage("Congratulations! You guessed the number!");
      setGameOver(true);
    } else {
      setTries((prevTries) => prevTries - 1);
      if (tries === 1) {
        setMessage(`Game Over! The number was ${number}.`);
        setGameOver(true);
      } else {
        setMessage(
          `Wrong guess! ${
            guess > number ? "Try a lower number." : "Try a higher number."
          } Tries left: ${tries - 1}`,
        );
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Guess the number</h1>
        {gameOver ? (
          <div>
            <p>{message}</p>
            <button className="default-button" onClick={handleRestart}>
              Restart
            </button>
          </div>
        ) : (
          <div>
            <p>{message}</p>
            {number && <Validator number={number} onGuess={handleGuess} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
