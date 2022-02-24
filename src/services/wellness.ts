import http from './http';
import user from './user';

export enum StatusColor {
  Green = 'GREEN',
  Yellow = 'YELLOW',
  Red = 'RED',
}

type WellnessStatus = {
  Status: StatusColor;
  Created: Date;
  IsValid: Boolean;
  StatusDescription?: String;
};

type WellnessQuestion = {
  question: string;
  symptoms?: string[];
  yesPrompt: string;
  noPrompt: string;
  link?: string;
};

const getStatus = (): Promise<WellnessStatus> => http.get('wellness');

// TODO: Update WellnessService.PostStatus to return WellnessViewModel instead of raw DB Health_Status object
// TODO: Then, this function will return Promise<WellnessStatus> | void
const postAnswer = (status: StatusColor): Promise<unknown> | void => {
  try {
    return http.post('wellness', status);
  } catch (error) {
    return console.log(error);
  }
};

const getQuestion = async (): Promise<WellnessQuestion> => {
  const question: WellnessQuestion = await http.get('wellness/question');
  return formatQuestion(question);
};

const formatQuestion = async (question: WellnessQuestion): Promise<WellnessQuestion> => {
  const { FirstName, LastName } = await user.getProfileInfo();

  /* eslint-disable no-template-curly-in-string */
  question.question = question.question
    .replace('${user.FirstName}', `${FirstName}`)
    .replace('${user.LastName}', `${LastName}`);

  let [yesPrompt, link] = question.yesPrompt.split('https://');

  question.yesPrompt = yesPrompt
    .replace('${user.FirstName}', `${FirstName}`)
    .replace('${user.LastName}', `${LastName}`);
  question.link = 'https://' + link;

  question.noPrompt = question.noPrompt
    .replace('${user.FirstName}', `${FirstName}`)
    .replace('${user.LastName}', `${LastName}`);
  /* eslint-enable no-template-curly-in-string */

  question.symptoms = [
    'Fever or chills',
    'Cough',
    'Shortness of breath or difficulty breathing',
    'Fatigue',
    'Muscle or body aches',
    'Headache',
    'New loss of taste or smell',
    'Sore throat',
    'Congestion or runny nose',
    'Nausea or vomiting',
    'Diarrhea',
  ];

  return question;
};

const wellnessService = {
  getStatus,
  getQuestion,
  postAnswer,
};

export default wellnessService;
