import React, { useEffect, useState, FunctionComponent } from "react";
import { IMAGES } from "../../mocks/images";
import { IImage } from "../../models/image";
import Card from "./Card";
import "./CardsBlock.css";

type OwnProps = {
  success: Function;
  restart: boolean;
};
const CardsBlock: FunctionComponent<OwnProps> = ({ success, restart }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [oldSelection, setOldSelection] = useState<number[]>([]);
  const [nbSelection, setNbSelection] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(true);
  const [resultValue, setResultValue] = useState<number[][]>([]);

  const generateRandomGridValues = (): number[][] => {
    let tab: number[][] = [];
    let nbImagePosition = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      let row: number[] = [];
      for (let j = 0; j < 4; j++) {
        let end = false;
        while (!end) {
          const randomValue = Math.floor(Math.random() * 8);
          if (nbImagePosition[randomValue] < 2) {
            row.push(randomValue + 1);
            nbImagePosition[randomValue]++;
            end = true;
          }
        }
      }
      tab.push(row);
    }
    return tab;
  };

  const defaultValues = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const getImage = (valeur: number): IImage => {
    let image: any;
    switch (valeur) {
      case 1:
        image = IMAGES[0];
        break;
      case 2:
        image = IMAGES[1];
        break;
      case 3:
        image = IMAGES[2];
        break;
      case 4:
        image = IMAGES[3];
        break;
      case 5:
        image = IMAGES[4];
        break;
      case 6:
        image = IMAGES[5];
        break;
      case 7:
        image = IMAGES[6];
        break;
      case 8:
        image = IMAGES[7];
        break;
      default:
        console.log(`Aucune valeur associée`);
        break;
    }
    return image;
  };

  const allResultFounded = () => {
    for (let row in grid) {
      for (let col in grid[row]) {
        if (grid[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCard = (
    row: number,
    col: number,
    selection: number,
    isReady: boolean
  ): void => {
    if (isReady) {
      setNbSelection(selection);
      grid[row][col] = resultValue[row][col];
      setGrid([...grid]);

      if (selection > 1) {
        setReady(false);
        setTimeout(() => {
          if (
            grid[row][col] !== resultValue[oldSelection[0]][oldSelection[1]]
          ) {
            grid[row][col] = 0;
            grid[oldSelection[0]][oldSelection[1]] = 0;
          }
          setNbSelection(0);
          setGrid([...grid]);
          setReady(true);
        }, 1000);
      } else {
        setOldSelection([row, col]);
      }
    }
    if (allResultFounded()) {
      success();
    }
  };

  const renderCards = () => {
    let result: any = [];
    let index = 0;
    for (let row in grid) {
      for (let col in grid[row]) {
        if (grid[row][col] === 0) {
          result.push(
            <div
              key={index}
              onClick={() =>
                handleCard(Number(row), Number(col), nbSelection + 1, ready)
              }
              style={{
                width: 100,
                height: 100,
                background: "dimgrey",
                border: "1px solid black",
              }}
            ></div>
          );
          index++;
        } else {
          let image = getImage(grid[row][col]);
          result.push(<Card image={image} />);
        }
      }
    }
    return result;
  };

  useEffect(() => {
    setGrid(defaultValues);
    setResultValue(generateRandomGridValues());
  }, []);

  useEffect(() => {
    if (restart) {
      setNbSelection(0);
      setGrid(defaultValues);
      setResultValue(generateRandomGridValues());
    }
  }, [restart]);

  return <div className="container-cards-clock">{renderCards()}</div>;
};

export default CardsBlock;
