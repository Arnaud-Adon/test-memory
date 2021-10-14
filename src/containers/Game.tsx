import React, { useEffect, useState } from "react";
import CardsBlock from "../components/Cards/CardsBlock";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Modal from "react-modal";
import { scoreRecord, getRecords } from "../services/api";
import { IScore } from "../models/api";

const Game = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [timeRelease, setTimeRelease] = useState<string>("");
  const [scores, setScores] = useState<IScore[]>([]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: 0,
      marginRight: "-50%",
      width: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const startGame = () => {
    setStart(true);
    setRestart(false);
    setModalIsOpen(false);
  };

  const restartGame = () => {
    setModalIsOpen(true);
    setStart(false);
    setRestart(true);
    setEnd(false);
    setFinish(false);
  };

  const endGame = (): void => {
    setEnd(true);
    setFinish(false);
    setModalIsOpen(true);
  };

  const success = (): void => {
    setFinish(true);
    setEnd(false);
    setModalIsOpen(true);
  };

  const getTimeRelease = (time: string): void => {
    setTimeRelease(time);
  };

  useEffect(() => {
    async function getStart() {
      setModalIsOpen(true);
      await getRecords().then((scores) => {
        scores.sort(
          (a, b) => Number(a.time.split(":")[1]) - Number(b.time.split(":")[1])
        );
        setScores(scores);
      });
    }
    getStart();
  }, []);

  useEffect(() => {
    if (timeRelease !== "") {
      scoreRecord(timeRelease);
    }
  }, [timeRelease]);

  return (
    <div className="container-game">
      <CardsBlock restart={restart} success={success} />
      <ProgressBar
        start={start}
        restart={restart}
        finish={finish}
        getTimeRelease={getTimeRelease}
        endGame={endGame}
      />
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} style={customStyles}>
          {end && (
            <div>
              <p>Votre temps est ecoulé</p>

              <button onClick={restartGame}>Voulez-vous recommencer ?</button>
            </div>
          )}
          {finish && (
            <div>
              <p>Bravo à vous, vous avez trouvé tous les doublons</p>
              <p>Votre temps est de {timeRelease}</p>
              <button onClick={restartGame}>Voulez-vous recommencer ?</button>
            </div>
          )}
          {!start && (
            <div>
              <h2>
                <strong>
                  Retrouver tous les doublons dans le temps imparti
                </strong>
              </h2>
              <h3>Liste des meilleurs temps</h3>
              <ul className="score-list">
                {scores.map((score, index) => {
                  const { id, time } = score;
                  if (index < 6) {
                    return <li key={id}>{time}</li>;
                  }
                })}
              </ul>
              <button onClick={startGame}>Commencer</button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Game;
