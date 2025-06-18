export const getProfileImage = async (username: string) => {
  const token = localStorage.getItem(
    '6919cc24-33f4-4fb3-ae5a-fbb88c5170c9.0251ecdb-4e2d-4077-9498-40328ac794e9-login.windows.net-accesstoken-abc3be17-5b4c-48c7-9cd8-db28399d772b-0251ecdb-4e2d-4077-9498-40328ac794e9-api://b19c300a-00dc-4adc-bcd1-b678b25d7ad1/access_as_user--',
  );

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`/api/profiles/image/${username}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token).secret}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile image');
  }

  return await response.json();
};

export const getProfileInfo = async (username: string) => {
  const token = localStorage.getItem(
    '6919cc24-33f4-4fb3-ae5a-fbb88c5170c9.0251ecdb-4e2d-4077-9498-40328ac794e9-login.windows.net-accesstoken-abc3be17-5b4c-48c7-9cd8-db28399d772b-0251ecdb-4e2d-4077-9498-40328ac794e9-api://b19c300a-00dc-4adc-bcd1-b678b25d7ad1/access_as_user--',
  );

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`/api/profiles/${username}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token).secret}`,
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
