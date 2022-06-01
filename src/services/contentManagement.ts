import http from './http';

type Slide = {
  ID: number;
  Path: string;
  Title: string;
  LinkURL: string;
  Width: number;
  Height: number;
  SortOrder: number;
};

type SlidePosting = {
  Title: string;
  LinkURL: string;
  SortOrder: number;
  ImageData: string;
};

const getSlides = (): Promise<Slide[]> => http.get('contentmanagement/banner');

const submitSlide = (slide: SlidePosting): Promise<Slide> =>
  http.post('contentmanagement/banner', slide);

const deleteSlide = (ID: number): Promise<Slide> => http.del(`contentmanagement/banner/${ID}`);

const contentManagemetService = {
  getSlides,
  submitSlide,
  deleteSlide,
};

export default contentManagemetService;
