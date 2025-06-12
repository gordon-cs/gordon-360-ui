import http from './http';
//import Date from
// same type as in the view model

//hang with not loading backend
// poster view model
type BasePoster = {
  ACT_CDE: string;
  Title: string;
  Description: string;
  ImagePath: string;
  VisibleDate?: string;
  ExpirationDate?: string;
  UploaderADUSername: string;
  //Status: number;
};

//upload view model
type UploadPoster = {
  ACT_CDE: string;
  Title: string;
  Description: string;
  ImagePath: string;
  VisibleDate?: string;
  ExpirationDate?: string;
  UploaderADUSername: string;
  //Status: number;
};

//patch view model
type UpdatePoster = {
  Title: string;
  Description: string;
  ImagePath: string;
  VisibleDate?: string;
  ExpirationDate?: string;
  Status: number;
};

type Poster = BasePoster & {
  ID: number;
  Status: string;
};

type CreatedPoster = BasePoster & {
  ID: number;
  StatusID: number;
  Completed: boolean;
};

//refer to activty.ts and PosterViewModels on the back end
//Poster Routes
//same routes as in controller

const createPoster = (newPoster: UploadPoster): Promise<CreatedPoster> =>
  http.post(`posters`, newPoster);

const getPosters = (): Promise<Poster[]> => http.get(`posters/all`);

const getCurrentPosters = (): Promise<Poster[]> => http.get(`posters`);

const getCurrentPostersByActivityCode = (activityCode: string): Promise<Poster[]> =>
  http.get(`posters/activity/${activityCode}`);

const getPostersByUser = (userName: string): Promise<Poster[]> =>
  http.get(`posters/all/${userName}`);

const getPostersByActivity = (activityCode: string): Promise<Poster[]> =>
  http.get(`posters/all/activity/${activityCode}`);

const lookupPoster = (): Promise<Poster> => http.get(`posters/all/lookup`);

const getPosterById = (posterID: number): Promise<Poster> => http.get(`posters/${posterID}`);

const editPoster = (posterID: number): Promise<CreatedPoster> => http.patch(`posters/${posterID}`);

const deletePoster = (posterID: number): Promise<CreatedPoster> => http.del(`posters/${posterID}`);

export {
  createPoster,
  getPosters,
  getCurrentPosters,
  getCurrentPostersByActivityCode,
  getPostersByActivity,
  getPostersByUser,
  lookupPoster,
  getPosterById,
  editPoster,
  deletePoster,
};
