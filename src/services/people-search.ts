import http from './http';

type SearchResult = {
  FirstName: string;
  NickName: string;
  LastName: string;
  MaidenName: string;
  UserName: string;
  ConcatonatedInfo: string;
};

const search = async (query: string): Promise<[number, SearchResult[]]> => {
  // Replace period or space with a slash: 'first.last' or 'first last' become 'first/last'
  const searchQuery = query.trim().replace(/\.|\s/g, '/');
  const searchResults: SearchResult[] = await http.get(`accounts/search/${searchQuery}`);
  return [Date.now(), searchResults];
};

const peopleSearchService = {
  search,
};

export default peopleSearchService;
