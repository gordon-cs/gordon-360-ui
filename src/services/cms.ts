import http from './http';

type Slide = {
  ImagePath: string;
  AltTag: string;
  HasCaption: boolean;
  Title: string;
  SubTitle: string;
  Action: string;
  ActionLink: string;
  Width: number;
  Height: number;
  SortOrder: number;
};

const getSlides = (): Promise<Slide[]> => http.get('cms/slider');

const cmsService = {
  getSlides,
};

export default cmsService;
