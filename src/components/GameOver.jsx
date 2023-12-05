function GameOver({ closeHandler, name, score, level }) {
  return (
    <div className="overlay">
      <div className="gameover_box">
        <h2>GAME OVER</h2>
        <div className="game_data">
          <p>{name}</p>
          <p>scored a total of </p>
          <p className="score">{score}</p>
          <p>on difficulty of </p>
          <p>{level}</p>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
          perferendis eaque repellat, magnam error vero debitis necessitatibus
          fugit ut a?
        </p>
        <button onClick={closeHandler}>CLOSE</button>
      </div>
    </div>
  );
}

export default GameOver;
