export interface IAddScoreResponse {
  message: string;
}

export interface IScore {
  id: string;
  time: string;
}

export interface IGetScoreResponse {
  scores: IScore[];
}
