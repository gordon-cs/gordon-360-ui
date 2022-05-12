import http from './http';

type SearchResult = {
  FirstName: string;
  NickName: string;
  LastName: string;
  MaidenName: string;
  UserName: string;
  ConcatonatedInfo: string;
};

const search = async (query: string): Promise<SearchResult[]> => {
  // Replace period or space with a slash: 'first.last' or 'first last' become 'first/last'
  const searchQuery = query.toLowerCase().trim().replace(/\.|\s/g, '/');
  return await http.get(`accounts/search/${searchQuery}`);
};

const peopleSearchService = {
  search,
};

export default peopleSearchService;
