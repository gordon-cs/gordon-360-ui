import http from './http';

export type AcademicTerm = {
  YearCode: string;
  TermCode: string;
  BeginDate: string;
  EndDate: string;
  Description: string;
};

export const getAllTerms = (): Promise<AcademicTerm[]> => http.get('academicterm/allterms');

export const getCurrentTerm = (): Promise<AcademicTerm> => http.get('academicterm/currentterm');

export const getUndergradTerms = async (): Promise<AcademicTerm[]> => {
  const allTerms = await getAllTerms();
  return allTerms.filter((term) => ['FA', 'SP', 'SU'].includes(term.TermCode));
};

const academicTermService = {
  getAllTerms,
  getCurrentTerm,
  getUndergradTerms,
};

export default academicTermService;
