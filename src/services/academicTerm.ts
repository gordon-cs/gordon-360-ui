import http from './http';

export type AcademicTerm = {
  YearCode: string;
  TermCode: string;
  BeginDate: string;
  EndDate: string;
  Description: string;
};

export const getAllTerms = (): Promise<AcademicTerm[]> => http.get('/academicterm/allterms');

export const getCurrentTerm = (): Promise<AcademicTerm> => http.get('/academicterm/currentterm');

const academicTermService = {
  getAllTerms,
  getCurrentTerm,
};

export default academicTermService;
