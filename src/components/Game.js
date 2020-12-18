import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import {AppBar , Toolbar, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? ` move ${move}` : "Start";
      return (
        <li key={move}>
          <Button variant="contained" color="primary" onClick={() => jumpTo(move)}>{destination}</Button>
        
        </li>
      );
    });

  return (
    <>
         <div>
    <AppBar>
    <Toolbar>
        <Typography variant="h5" align="center">tic tac toe</Typography>
    </Toolbar>
    </AppBar>
    </div>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
      </div>
    </>
  );
};

export default Game;
