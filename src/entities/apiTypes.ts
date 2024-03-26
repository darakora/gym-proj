export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  emailNotification: boolean;
  smsNotification: boolean;
  isConfirmed: boolean;
  profilePhotoUrl: string;
}
export interface BonusMaterials {
  webinars: [BonusMaterial];
  routines: [BonusMaterial];
  bodyPractices: [BonusMaterial];
  taping: [BonusMaterial];
  facial: [BonusMaterial];
  augengym: [BonusMaterial];
  neckExercises: [BonusMaterial];
  gast: [BonusMaterial];
  guasha: [BonusMaterial];
}

export interface BonusMaterial {
  id: number;
  title: string;
  contentUrl: string;
  seenStatus: 'None' | 'Seen' | 'Started';
  tabs: Tabs[];
}

export interface Tabs {
  name: string;
  html: string;
}

export interface Meditation {
  id: number;
  title: string;
  contentUrl: string;
  seenStatus: 'None' | 'Seen' | 'Started';
  tabs: Tabs[];
}

export interface Question {
  question: string;
  answer: string;
  isAnswered: boolean;
  questionDate: string;
  answerDate: string;
  name: string;
  surname: string;
  profilePhotoUrl: string;
  defendantName: string;
}

export interface UserQuestion {
  date: string;
  text: string;
  subject: string;
  answer: string;
  answerDate: string;
}

export interface Webinar {
  title: string;
  description: string;
  questions?: Question[];
  date: string;
  dateIso: string;
  isPassed: boolean;
  isSeen: boolean;
  likeCount: number;
  dislikeCount: number;
  id: string;
  likeStatus: string;
  webinarUrl: string;
  color: string;
  borderColor: string;
  recordingUrl: string;
  lengthMin: number;
}

export interface NotificationWebinars {
  webinarId: number;
  webinarTitle: string;
  description: string;
  date: string;
}

export interface NotificationQuestions {
  webinarTitle: string;
  question: string;
  answer: string;
  questionDate: string;
  answerDate: string;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
}

export interface Topic {
  path: string;
  text: string;
  displayName: string;
  videoUrl?: string;
  page?: {
    text: string;
    displayName: string;
    name: string;
  };
}
