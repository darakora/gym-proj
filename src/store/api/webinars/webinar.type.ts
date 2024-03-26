export interface RequestData {
  startYear: number;
  startMonth: number;
  startDay: number;
}

export interface RequestID {
  id: string;
}

export interface RequestQuestionData {
  webinarId: string;
  text: string;
}

export interface PayLoad {
  payload: RequestQuestionData;
}
