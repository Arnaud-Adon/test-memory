import axios from "axios";
import { IAddScoreResponse, IGetScoreResponse, IScore } from "../models/api";

const ENDPOINT = "http://localhost:4000/api/";

export const scoreRecord = (time: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post<IAddScoreResponse>(
        `${ENDPOINT}/score`,
        {
          time,
        }
      );
      resolve(response.data.message);
    } catch (error) {
      reject(error);
    }
  });
};

export const getRecords = async (): Promise<IScore[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<IGetScoreResponse>(`${ENDPOINT}/score`);
      resolve(response.data.scores);
    } catch (error) {
      reject(error);
    }
  });
};
