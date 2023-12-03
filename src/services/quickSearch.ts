import http from './http';

export type SearchResult = {
  FirstName: string;
  NickName: string;
  LastName: string;
  MaidenName: string;
  UserName: string;
};

const search = async (
  query: string,
): Promise<[searchTime: number, searchResults: SearchResult[]]> => {
  const searchStartTime = Date.now();
  // Replace period or space with a slash: 'first.last' or 'first last' become 'first/last'
  const searchQuery = query.toLowerCase().trim().replace(/\.|\s/g, '/');
  const searchResults: SearchResult[] = await http.get(`accounts/search/${searchQuery}`);
  return [searchStartTime, searchResults];
};

const quickSearchService = {
  search,
};

export default quickSearchService;
