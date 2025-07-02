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

export const getCurrentTermForFinalExams = (): Promise<AcademicTerm> =>
  http.get('academicterm/currentfinalexamterm');

const academicTermService = {
  getAllTerms,
  getCurrentTerm,
  getCurrentTermForFinalExams,
};

export default academicTermService;
