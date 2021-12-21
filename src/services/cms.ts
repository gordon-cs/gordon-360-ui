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

const getSlides = (): Promise<Slide[]> => http.get('cms/banner');

const submitSlide = (slide: Slide): Promise<Slide> => http.post('cms/banner', slide);

const deleteSlide = (ID: number): Promise<Slide> => http.del(`cms/banner/${ID}`);

const cmsService = {
  getSlides,
  submitSlide,
  deleteSlide,
};

export default cmsService;
