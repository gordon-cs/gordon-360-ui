import http from './http';

/**
 * Poster Service and Types
 *
 * This file defines TypeScript types that represent the Poster view models used
 * throughout the frontend, matching the structure expected by the backend API.
 *
 * - BasePoster: properties of a given poster
 * - UploadPoster: data required when creating a new poster (same as BasePoster).
 * - UpdatePoster: properties allowed to be updated for an existing poster.
 * - Poster: full poster model including backend-generated fields like ID and Status.
 * - CreatedPoster: represents posters returned after creation with additional status info.
 *
 * The file also exports functions for interacting with the backend Poster API endpoints,
 * including creating, retrieving, updating, hiding, and deleting posters.
 *
 * Each function returns a Promise with the expected typed response, ensuring type safety
 * when communicating with the backend.
 *
 * These types and functions should be kept in sync with the backend PosterViewModels and
 * controller routes to maintain consistency across the application.
 */

// poster view model
type BasePoster = {
  ACT_CDE: string;
  Title: string;
  Description: string;
  ImagePath: string;
  VisibleDate?: string;
  ExpirationDate?: string;
  UploaderADUsername: string;
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
  UploaderADUsername: string;
  //Status: number;
};

//patch view model
type UpdatePoster = {
  Title: string;
  Description: string;
  ImagePath: string;
  VisibleDate?: string;
  ExpirationDate?: string;
  Status: number; // Determines if the poster is visible or not
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

const editPoster = (posterID: number, updatedData: Partial<UpdatePoster>): Promise<CreatedPoster> =>
  http.patch(`posters/${posterID}`, updatedData);

const deletePoster = (posterID: number): Promise<CreatedPoster> => http.del(`posters/${posterID}`);

const hidePoster = (posterID: number): Promise<CreatedPoster> =>
  http.post(`posters/hide/${posterID}`);

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
  hidePoster,
};
