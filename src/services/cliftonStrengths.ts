import http from './http';

type CliftonStrengthName =
  | 'Achiever'
  | 'Arranger'
  | 'Belief'
  | 'Consistency'
  | 'Deliberative'
  | 'Discipline'
  | 'Focus'
  | 'Responsibility'
  | 'Restorative'
  | 'Activator'
  | 'Command'
  | 'Communication'
  | 'Competition'
  | 'Maximizer'
  | 'Self-Assurance'
  | 'Significance'
  | 'Woo'
  | 'Adaptability'
  | 'Connectedness'
  | 'Developer'
  | 'Empathy'
  | 'Harmony'
  | 'Includer'
  | 'Individualization'
  | 'Positivity'
  | 'Relator'
  | 'Analytical'
  | 'Context'
  | 'Futuristic'
  | 'Ideation'
  | 'Input'
  | 'Intellection'
  | 'Learner'
  | 'Strategic';

type CliftonStrengthsCategory = 'Executing' | 'Influencing' | 'Relationship' | 'Thinking';

const categoryPerStrengthName = (strength: CliftonStrengthName): CliftonStrengthsCategory => {
  switch (strength) {
    case 'Achiever':
    case 'Arranger':
    case 'Belief':
    case 'Consistency':
    case 'Deliberative':
    case 'Discipline':
    case 'Focus':
    case 'Responsibility':
    case 'Restorative':
      return 'Executing';

    case 'Activator':
    case 'Command':
    case 'Communication':
    case 'Competition':
    case 'Maximizer':
    case 'Self-Assurance':
    case 'Significance':
    case 'Woo':
      return 'Influencing';

    case 'Adaptability':
    case 'Connectedness':
    case 'Developer':
    case 'Empathy':
    case 'Harmony':
    case 'Includer':
    case 'Individualization':
    case 'Positivity':
    case 'Relator':
      return 'Relationship';

    case 'Analytical':
    case 'Context':
    case 'Futuristic':
    case 'Ideation':
    case 'Input':
    case 'Intellection':
    case 'Learner':
    case 'Strategic':
      return 'Thinking';

    default:
      throw new TypeError(`Could not find category for clifton strength ${strength}`);
  }
};

export enum CliftonStrengthColors {
  Executing = '#9070bf',
  Influencing = '#c88a2e',
  Relationship = '#2486af',
  Thinking = '#3c9b1f',
}

enum CliftonStrengthLinks {
  Achiever = 'https://www.gallup.com/cliftonstrengths/en/252134/achiever-theme.aspx',
  Arranger = 'https://www.gallup.com/cliftonstrengths/en/252161/arranger-theme.aspx',
  Belief = 'https://www.gallup.com/cliftonstrengths/en/252170/belief-theme.aspx',
  Consistency = 'https://www.gallup.com/cliftonstrengths/en/252203/consistency-theme.aspx',
  Deliberative = 'https://www.gallup.com/cliftonstrengths/en/252215/deliberative-theme.aspx',
  Discipline = 'https://www.gallup.com/cliftonstrengths/en/252227/discipline-theme.aspx',
  Focus = 'https://www.gallup.com/cliftonstrengths/en/252239/focus-theme.aspx',
  Responsibility = 'https://www.gallup.com/cliftonstrengths/en/252320/responsibility-theme.aspx',
  Restorative = 'https://www.gallup.com/cliftonstrengths/en/252323/restorative-theme.aspx',
  Activator = 'https://www.gallup.com/cliftonstrengths/en/252140/activator-theme.aspx',
  Command = 'https://www.gallup.com/cliftonstrengths/en/252176/command-theme.aspx',
  Communication = 'https://www.gallup.com/cliftonstrengths/en/252185/communication-theme.aspx',
  Competition = 'https://www.gallup.com/cliftonstrengths/en/252191/competition-theme.aspx',
  Maximizer = 'https://www.gallup.com/cliftonstrengths/en/252299/maximizer-theme.aspx',
  'Self-Assurance' = 'https://www.gallup.com/cliftonstrengths/en/252332/self-assurance-theme.aspx',
  Significance = 'https://www.gallup.com/cliftonstrengths/en/252341/significance-theme.aspx',
  Woo = 'https://www.gallup.com/cliftonstrengths/en/252359/woo-theme.aspx',
  Adaptability = 'https://www.gallup.com/cliftonstrengths/en/252146/adaptability-theme.aspx',
  Connectedness = 'https://www.gallup.com/cliftonstrengths/en/252197/connectedness-theme.aspx',
  Developer = 'https://www.gallup.com/cliftonstrengths/en/252224/developer-theme.aspx',
  Empathy = 'https://www.gallup.com/cliftonstrengths/en/252236/empathy-theme.aspx',
  Harmony = 'https://www.gallup.com/cliftonstrengths/en/252254/harmony-theme.aspx',
  Includer = 'https://www.gallup.com/cliftonstrengths/en/252266/includer-theme.aspx',
  Individualization = 'https://www.gallup.com/cliftonstrengths/en/252272/individualization-theme.aspx',
  Positivity = 'https://www.gallup.com/cliftonstrengths/en/252305/positivity-theme.aspx',
  Relator = 'https://www.gallup.com/cliftonstrengths/en/252311/relator-theme.aspx',
  Analytical = 'https://www.gallup.com/cliftonstrengths/en/252152/analytical-theme.aspx',
  Context = 'https://www.gallup.com/cliftonstrengths/en/252209/context-theme.aspx',
  Futuristic = 'https://www.gallup.com/cliftonstrengths/en/252248/futuristic-theme.aspx',
  Ideation = 'https://www.gallup.com/cliftonstrengths/en/252260/ideation-theme.aspx',
  Input = 'https://www.gallup.com/cliftonstrengths/en/252278/input-theme.aspx',
  Intellection = 'https://www.gallup.com/cliftonstrengths/en/252284/intellection-theme.aspx',
  Learner = 'https://www.gallup.com/cliftonstrengths/en/252293/learner-theme.aspx',
  Strategic = 'https://www.gallup.com/cliftonstrengths/en/252350/strategic-theme.aspx',
}

type CliftonStrength = {
  name: CliftonStrengthName;
  category: CliftonStrengthsCategory;
  color: CliftonStrengthColors;
  link: string;
};

type CliftonStrengthsViewModel = {
  AccessCode: string;
  Email: string;
  DateCompleted: string;
  Themes: CliftonStrengthName[];
  Private: boolean;
};

export type CliftonStrengths = {
  AccessCode: string;
  Email: string;
  DateCompleted: Date;
  Themes: CliftonStrength[];
  Private: boolean;
};

const strengthDetails = (name: CliftonStrengthName): CliftonStrength => {
  const category = categoryPerStrengthName(name);
  return {
    name,
    category,
    color: CliftonStrengthColors[category],
    link: CliftonStrengthLinks[name],
  };
};

export const getCliftonStrengths = async (username: string): Promise<CliftonStrengths | null> =>
  http.get<CliftonStrengthsViewModel | null>(`profiles/${username}/clifton/`).then((cs) =>
    cs
      ? {
          ...cs,
          Themes: cs.Themes.map(strengthDetails),
          DateCompleted: new Date(cs.DateCompleted),
        }
      : null,
  );

export const togglePrivacy = async (): Promise<boolean> =>
  http.get<boolean>(`profiles/clifton/privacy`);
