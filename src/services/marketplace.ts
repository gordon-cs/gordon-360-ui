import http from './http';

export type MarketplaceCategory = { Id: number; Category: string };
export type MarketplaceCondition = { Id: number; Condition: string };

export type AdminThreadFilterOptions = {
  categoryId?: number;
  statusId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  desc?: boolean;
  page?: number;
  pageSize?: number;
};

const getAdminThreads = (options: AdminThreadFilterOptions): Promise<MarketplaceListing[]> => {
  const query: Record<string, string> = {};
  if (options.categoryId !== undefined) query.categoryId = options.categoryId.toString();
  if (options.statusId !== undefined) query.statusId = options.statusId.toString();
  if (options.minPrice !== undefined) query.minPrice = options.minPrice.toString();
  if (options.maxPrice !== undefined) query.maxPrice = options.maxPrice.toString();
  if (options.search !== undefined) query.search = options.search;
  if (options.sortBy !== undefined) query.sortBy = options.sortBy;
  if (options.desc !== undefined) query.desc = options.desc ? 'true' : 'false';
  if (options.page !== undefined) query.page = options.page.toString();
  if (options.pageSize !== undefined) query.pageSize = options.pageSize.toString();

  return http.get<MarketplaceListing[]>(`marketplace/admin/threads${http.toQueryString(query)}`);
};

const getAdminThreadsCount = (
  options: Omit<AdminThreadFilterOptions, 'sortBy' | 'desc' | 'page' | 'pageSize'>,
): Promise<number> => {
  const query: Record<string, string> = {};
  if (options.categoryId !== undefined) query.categoryId = options.categoryId.toString();
  if (options.statusId !== undefined) query.statusId = options.statusId.toString();
  if (options.minPrice !== undefined) query.minPrice = options.minPrice.toString();
  if (options.maxPrice !== undefined) query.maxPrice = options.maxPrice.toString();
  if (options.search !== undefined) query.search = options.search;

  return http.get<number>(`marketplace/admin/threads/count${http.toQueryString(query)}`);
};

const getThreadEditHistory = (threadId: number): Promise<MarketplaceListing[]> =>
  http.get<MarketplaceListing[]>(`marketplace/admin/threads/${threadId}/history`);

// Marketplace Listing object, representing the model of a listing for communication with the backend.
export type MarketplaceListing = {
  Id: number;
  Name: string;
  Detail: string;
  Price: number;
  PosterUsername: string;
  CategoryId: number;
  CategoryName: string;
  ConditionId: number;
  ConditionName: string;
  StatusId: number;
  StatusName: string;
  ImagePaths: string[];
  PostedAt: string;
};

/**
 * Add a new category (Admin only).
 * @param categoryName name of the category to be added
 * @returns the category object created
 */
const addCategory = (categoryName: string): Promise<MarketplaceCategory> =>
  http.post<MarketplaceCategory>('marketplace/categories', categoryName);

/**
 * Add a new condition (Admin only).
 * @param conditionName name of the condition to be added
 * @returns the condition object created
 */
const addCondition = (conditionName: string): Promise<MarketplaceCondition> =>
  http.post<MarketplaceCondition>('marketplace/conditions', conditionName);

/**
 * Initial Marketplace Listing object for creating a new listing (without Id, StatusId, etc.).
 * ImagesBase64 is an array of base64-encoded image strings.
 */
export type InitMarketplaceListing = {
  Name: string;
  Detail: string;
  Price: number;
  CategoryId: number;
  ConditionId: number;
  ImagesBase64?: string[];
};

const getCategories = (): Promise<MarketplaceCategory[]> =>
  http.get<MarketplaceCategory[]>('marketplace/categories');

const getConditions = (): Promise<MarketplaceCondition[]> =>
  http.get<MarketplaceCondition[]>('marketplace/conditions');

/**
 * Get all marketplace listings.
 * @returns an array of MarketplaceListing objects
 */
const getAllListings = (): Promise<MarketplaceListing[]> =>
  http.get<MarketplaceListing[]>('marketplace');

/**
 * Get a specific listing by ID.
 * @param listingId the ID of the listings to retrieve
 * @returns the MarketplaceListing object
 */
const getListingById = (listingId: number): Promise<MarketplaceListing> =>
  http.get<MarketplaceListing>(`marketplace/${listingId}`);

/**
 * Create a new listing.
 * Accepts a listing object with ImagesBase64 (array of base64 strings).
 * @param listing the listing data to create
 * @returns the created MarketplaceListing object
 */
const createListing = (listing: InitMarketplaceListing): Promise<MarketplaceListing> =>
  http.post<MarketplaceListing>('marketplace', listing);

/**
 * Update an existing listing.
 * @param listingId the ID of the listing to update
 * @param updatedListing the updated listing data (partial InitMarketplaceListing)
 * @returns the updated MarketplaceListing object
 */
const updateListing = (
  listingId: number,
  updatedListing: Partial<InitMarketplaceListing>,
): Promise<MarketplaceListing> =>
  http.put<MarketplaceListing>(`marketplace/${listingId}`, updatedListing);

/**
 * Delete a listing (SiteAdmin only).
 * @param listingId the ID of the listing to delete
 * @returns a promise that resolves when the listing is deleted
 */
const deleteListing = (listingId: number): Promise<void> =>
  http.del<void>(`marketplace/${listingId}`);

/**
 * Change the status of a listing.
 * @param listingId the ID of the listing to change
 * @param status the new status to set
 * @returns the updated MarketplaceListing object
 */
const changeListingStatus = (listingId: number, status: string): Promise<MarketplaceListing> =>
  http.put<MarketplaceListing>(`marketplace/${listingId}/status`, status);

/**
 * Get filtered listings.
 * Now supports search, sortBy, and desc parameters.
 */

const getFilteredListings = (
  categoryId?: number,
  statusId?: number,
  minPrice?: number,
  maxPrice?: number,
  search?: string,
  sortBy?: string,
  desc?: boolean,
  page: number = 1,
  pageSize: number = 20,
): Promise<MarketplaceListing[]> => {
  const query: Record<string, string> = {};
  if (categoryId !== undefined) query.categoryId = categoryId.toString();
  if (statusId !== undefined) query.statusId = statusId.toString();
  if (minPrice !== undefined) query.minPrice = minPrice.toString();
  if (maxPrice !== undefined) query.maxPrice = maxPrice.toString();
  if (search !== undefined) query.search = search;
  if (sortBy !== undefined) query.sortBy = sortBy;
  if (desc !== undefined) query.desc = desc ? 'true' : 'false';
  query.page = page.toString();
  query.pageSize = pageSize.toString();

  return http.get<MarketplaceListing[]>(`marketplace/filter${http.toQueryString(query)}`);
};

/**
 * Get the number of listings that match the given filters
 * @param categoryId the category ID to filter by
 * @param statusId the status ID to filter by
 * @param minPrice the lowest price to filter by
 * @param maxPrice the highest price to filter by
 * @param search a search term to filter listings by name or detail
 * @returns the listings that match the filters
 */
const getFilteredListingsCount = (
  categoryId?: number,
  statusId?: number,
  minPrice?: number,
  maxPrice?: number,
  search?: string,
): Promise<number> => {
  const query: Record<string, string> = {};
  if (categoryId !== undefined) query.categoryId = categoryId.toString();
  if (statusId !== undefined) query.statusId = statusId.toString();
  if (minPrice !== undefined) query.minPrice = minPrice.toString();
  if (maxPrice !== undefined) query.maxPrice = maxPrice.toString();
  if (search !== undefined) query.search = search;

  return http.get<number>(`marketplace/count${http.toQueryString(query)}`);
};

/**
 * Get the listings posted by the current user.
 * @returns an array of MarketplaceListing objects
 */
const getMyListings = (): Promise<MarketplaceListing[]> => {
  return http.get<MarketplaceListing[]>('marketplace/mylistings');
};

const marketplaceService = {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  changeListingStatus,
  getFilteredListings,
  getFilteredListingsCount,
  getCategories,
  getConditions,
  getMyListings,
  addCategory,
  addCondition,
  getAdminThreads,
  getAdminThreadsCount,
  getThreadEditHistory,
};

export default marketplaceService;
