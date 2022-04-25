import http from './http';

enum CliftonStrengthsCategory {
  Executing = 'Executing',
  Influencing = 'Influencing',
  Relationship = 'Relationship',
  Thinking = 'Thinking',
}

enum CliftonStrength {
  Achiever = 'Achiever',
  Arranger = 'Arranger',
  Belief = 'Belief',
  Consistency = 'Consistency',
  Deliberative = 'Deliberative',
  Discipline = 'Discipline',
  Focus = 'Focus',
  Responsibility = 'Responsibility',
  Restorative = 'Restorative',
  Activator = 'Activator',
  Command = 'Command',
  Communication = 'Communication',
  Competition = 'Competition',
  Maximizer = 'Maximizer',
  'Self-Assurance' = 'Self-Assurance',
  Significance = 'Significance',
  Woo = 'Woo',
  Adaptability = 'Adaptability',
  Connectedness = 'Connectedness',
  Developer = 'Developer',
  Empathy = 'Empathy',
  Harmony = 'Harmony',
  Includer = 'Includer',
  Individualization = 'Individualization',
  Positivity = 'Positivity',
  Relator = 'Relator',
  Analytical = 'Analytical',
  Context = 'Context',
  Futuristic = 'Futuristic',
  Ideation = 'Ideation',
  Input = 'Input',
  Intellection = 'Intellection',
  Learner = 'Learner',
  Strategic = 'Strategic',
}

const CliftonStrengthsCategoryPerStrength = {
  [CliftonStrength.Achiever]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Arranger]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Belief]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Consistency]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Deliberative]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Discipline]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Focus]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Responsibility]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Restorative]: CliftonStrengthsCategory.Executing,
  [CliftonStrength.Activator]: CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Command]: CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Communication]: CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Competition]: CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Maximizer]: CliftonStrengthsCategory.Influencing,
  'Self-Assurance': CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Significance]: CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Woo]: CliftonStrengthsCategory.Influencing,
  [CliftonStrength.Adaptability]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Connectedness]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Developer]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Empathy]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Harmony]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Includer]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Individualization]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Positivity]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Relator]: CliftonStrengthsCategory.Relationship,
  [CliftonStrength.Analytical]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Context]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Futuristic]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Ideation]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Input]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Intellection]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Learner]: CliftonStrengthsCategory.Thinking,
  [CliftonStrength.Strategic]: CliftonStrengthsCategory.Thinking,
};

enum CliftonStrengthColors {
  Executing = '#9070bf',
  Influencing = '#c88a2e',
  Relationship = '#2486af',
  Thinking = '#3c9b1f',
}

const cliftonStrengthLinks = {
  [CliftonStrength.Achiever]:
    'https://www.gallup.com/cliftonstrengths/en/252134/achiever-theme.aspx',
  [CliftonStrength.Arranger]:
    'https://www.gallup.com/cliftonstrengths/en/252161/arranger-theme.aspx',
  [CliftonStrength.Belief]: 'https://www.gallup.com/cliftonstrengths/en/252170/belief-theme.aspx',
  [CliftonStrength.Consistency]:
    'https://www.gallup.com/cliftonstrengths/en/252203/consistency-theme.aspx',
  [CliftonStrength.Deliberative]:
    'https://www.gallup.com/cliftonstrengths/en/252215/deliberative-theme.aspx',
  [CliftonStrength.Discipline]:
    'https://www.gallup.com/cliftonstrengths/en/252227/discipline-theme.aspx',
  [CliftonStrength.Focus]: 'https://www.gallup.com/cliftonstrengths/en/252239/focus-theme.aspx',
  [CliftonStrength.Responsibility]:
    'https://www.gallup.com/cliftonstrengths/en/252320/responsibility-theme.aspx',
  [CliftonStrength.Restorative]:
    'https://www.gallup.com/cliftonstrengths/en/252323/restorative-theme.aspx',
  [CliftonStrength.Activator]:
    'https://www.gallup.com/cliftonstrengths/en/252140/activator-theme.aspx',
  [CliftonStrength.Command]: 'https://www.gallup.com/cliftonstrengths/en/252176/command-theme.aspx',
  [CliftonStrength.Communication]:
    'https://www.gallup.com/cliftonstrengths/en/252185/communication-theme.aspx',
  [CliftonStrength.Competition]:
    'https://www.gallup.com/cliftonstrengths/en/252191/competition-theme.aspx',
  [CliftonStrength.Maximizer]:
    'https://www.gallup.com/cliftonstrengths/en/252299/maximizer-theme.aspx',
  'Self-Assurance':
    '[CliftonStrength.https]://www.gallup.com/cliftonstrengths/en/252332/self-assurance-theme.aspx',
  [CliftonStrength.Significance]:
    'https://www.gallup.com/cliftonstrengths/en/252341/significance-theme.aspx',
  [CliftonStrength.Woo]: 'https://www.gallup.com/cliftonstrengths/en/252359/woo-theme.aspx',
  [CliftonStrength.Adaptability]:
    'https://www.gallup.com/cliftonstrengths/en/252146/adaptability-theme.aspx',
  [CliftonStrength.Connectedness]:
    'https://www.gallup.com/cliftonstrengths/en/252197/connectedness-theme.aspx',
  [CliftonStrength.Developer]:
    'https://www.gallup.com/cliftonstrengths/en/252224/developer-theme.aspx',
  [CliftonStrength.Empathy]: 'https://www.gallup.com/cliftonstrengths/en/252236/empathy-theme.aspx',
  [CliftonStrength.Harmony]: 'https://www.gallup.com/cliftonstrengths/en/252254/harmony-theme.aspx',
  [CliftonStrength.Includer]:
    'https://www.gallup.com/cliftonstrengths/en/252266/includer-theme.aspx',
  [CliftonStrength.Individualization]:
    '[CliftonStrength.https]://www.gallup.com/cliftonstrengths/en/252272/individualization-theme.aspx',
  [CliftonStrength.Positivity]:
    'https://www.gallup.com/cliftonstrengths/en/252305/positivity-theme.aspx',
  [CliftonStrength.Relator]: 'https://www.gallup.com/cliftonstrengths/en/252311/relator-theme.aspx',
  [CliftonStrength.Analytical]:
    'https://www.gallup.com/cliftonstrengths/en/252152/analytical-theme.aspx',
  [CliftonStrength.Context]: 'https://www.gallup.com/cliftonstrengths/en/252209/context-theme.aspx',
  [CliftonStrength.Futuristic]:
    'https://www.gallup.com/cliftonstrengths/en/252248/futuristic-theme.aspx',
  [CliftonStrength.Ideation]:
    'https://www.gallup.com/cliftonstrengths/en/252260/ideation-theme.aspx',
  [CliftonStrength.Input]: 'https://www.gallup.com/cliftonstrengths/en/252278/input-theme.aspx',
  [CliftonStrength.Intellection]:
    'https://www.gallup.com/cliftonstrengths/en/252284/intellection-theme.aspx',
  [CliftonStrength.Learner]: 'https://www.gallup.com/cliftonstrengths/en/252293/learner-theme.aspx',
  [CliftonStrength.Strategic]:
    'https://www.gallup.com/cliftonstrengths/en/252350/strategic-theme.aspx',
};

// TODO: Refactor to not depend on array indexing to find link
export type CliftonStrengths = {
  Strengths: CliftonStrength[];
  Categories: CliftonStrengthsCategory[];
  Colors: CliftonStrengthColors[];
  Links: string[];
};

export const getCliftonStrengths = async (
  username: string,
): Promise<CliftonStrengths | undefined> => {
  const Strengths = await http.get<CliftonStrength[]>(`profiles/clifton/${username}/`);

  if (Strengths.length) {
    const Categories = Strengths.map((strength) => CliftonStrengthsCategoryPerStrength[strength]);
    return {
      Strengths,
      Categories,
      Colors: Categories.map((category) => CliftonStrengthColors[category]),
      Links: Strengths.map((strength) => cliftonStrengthLinks[strength]),
    };
  } else {
    return undefined;
  }
};
