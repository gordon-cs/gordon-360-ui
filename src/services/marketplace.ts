import { getToken } from 'services/auth';
import http from './http';
import userService from 'services/user';
import { get } from 'lodash';

export type MarketplaceCategory = { Id: number; Category: string };
export type MarketplaceCondition = { Id: number; Condition: string };

export const getProfileImage = async (username: string) => {
  const token = await getToken();

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`/api/profiles/image/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile image');
  }

  return await response.json();
};

export const getProfileInfo = async (username: string) => {
  const token = await getToken();

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`/api/profiles/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile info');
  }

  const data = await response.json();

  return {
    NickName: data.NickName,
    LastName: data.LastName,
  };
};

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
  http.get<MarketplaceCategory[]>('/marketplace/categories');

const getConditions = (): Promise<MarketplaceCondition[]> =>
  http.get<MarketplaceCondition[]>('/marketplace/conditions');

/**
 * Get all marketplace listings.
 */
const getAllListings = (): Promise<MarketplaceListing[]> =>
  http.get<MarketplaceListing[]>('/marketplace');

/**
 * Get a specific listing by ID.
 */
const getListingById = (listingId: number): Promise<MarketplaceListing> =>
  http.get<MarketplaceListing>(`/marketplace/${listingId}`);

/**
 * Create a new listing.
 * Accepts a listing object with ImagesBase64 (array of base64 strings).
 */
const createListing = (listing: InitMarketplaceListing): Promise<MarketplaceListing> =>
  http.post<MarketplaceListing>('/marketplace', listing);

/**
 * Update an existing listing.
 */
const updateListing = (
  listingId: number,
  updatedListing: Partial<InitMarketplaceListing>,
): Promise<MarketplaceListing> =>
  http.put<MarketplaceListing>(`/marketplace/${listingId}`, updatedListing);

/**
 * Delete a listing (SiteAdmin only).
 */
const deleteListing = (listingId: number): Promise<void> =>
  http.del<void>(`/marketplace/${listingId}`);

/**
 * Change the status of a listing.
 */
const changeListingStatus = (listingId: number, status: string): Promise<MarketplaceListing> =>
  http.put<MarketplaceListing>(`/marketplace/${listingId}/status`, status);

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

  return http.get<MarketplaceListing[]>(`/marketplace/filter${http.toQueryString(query)}`);
};

/**
 * Get the number of listings
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

  return http.get<number>(`/marketplace/count${http.toQueryString(query)}`);
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
};

export default marketplaceService;
