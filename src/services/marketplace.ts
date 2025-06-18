import { getToken } from 'services/auth';

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
