import http from './http';

export type SearchResult =
  | {
      type: 'person';
      UserName: string;
      FirstName: string;
      LastName: string;
      NickName?: string;
      MaidenName?: string;
      Involvements?: string[];
    }
  | {
      type: 'involvement';
      name: string;
    };

const search = async (
  query: string,
): Promise<[searchTime: number, searchResults: SearchResult[]]> => {
  const searchStartTime = Date.now();

  // Send query as-is (trimmed), encode it properly in URL by http.get
  const trimmedQuery = query.toLowerCase().trim();

  // Call the backend "search" endpoint which returns both people and involvement results
  const searchResults: SearchResult[] = await http.get(
    `accounts/search/${encodeURIComponent(trimmedQuery)}`,
  );

  return [searchStartTime, searchResults];
};

const quickSearchService = {
  search,
};

export default quickSearchService;
