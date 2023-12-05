import { useState } from "react";
import NewGame from "./components/NewGame";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import { levels } from "./levels";
import { useRef } from "react";

const getRndInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function App() {
  const [player, setPlayer] = useState();
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(100);
  const [gameLaunch, setGameLaunch] = useState(true);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [current, setCurrent] = useState(-1);

  const timeoutIdRef = useRef(null);
  const rounds = useRef(0);
  const currentInt = useRef(0);

  let pace = 1000;
  let levelsAmount;

  const gameSetHandler = (level, name) => {
    /*const levelIndex = levels.findIndex((el) => el.name === level);
    const levelAmount = levels[levelIndex].amount;*/

    const { amount } = levels.find((el) => el.name === level);
    levelsAmount = amount;

    const circlesArray = Array.from({ length: levelsAmount }, (_, i) => i);

    setCircles(circlesArray);
    setPlayer({
      level: level,
      name: name,
    });
    setGameLaunch(!gameLaunch);
    setGameOn(!gameOn);
    randNumbers();
  };

  const stopHandler = () => {
    setGameOn((prevLaunch) => !prevLaunch);
    setGameOver((prevLaunch) => !prevLaunch);
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;
  };

  const closeHandler = () => {
    setGameOver(!gameOver);
    setGameLaunch(!gameLaunch);
    setScore(0);
  };

  const clickHandler = (id) => {
    if (current !== id) {
      stopHandler();
      return;
    }
    setScore(score + 10);
    rounds.current--;
  };

  const randNumbers = () => {
    if (rounds.current >= 3) {
      stopHandler();
      return;
    }
    let nextActive;
    do {
      nextActive = getRndInt(0, levelsAmount);
    } while (nextActive === currentInt.current);

    setCurrent(nextActive);
    currentInt.current = nextActive;
    rounds.current++;
    timeoutIdRef.current = setTimeout(randNumbers, pace);
    pace -= 15;
    console.log(nextActive);
  };

  return (
    <>
      <h1>Balls of Steel</h1>
      {gameLaunch && <NewGame onclick={gameSetHandler} />}
      {gameOn && (
        <Game
          score={score}
          circles={circles}
          stopHandler={stopHandler}
          clickHandler={clickHandler}
          current={current}
        />
      )}
      {gameOver && (
        <GameOver closeHandler={closeHandler} {...player} score={score} />
      )}
    </>
  );
}

export default App;
