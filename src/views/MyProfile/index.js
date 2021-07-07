import { useState, useEffect } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import user from 'services/user';
import Profile from 'components/Profile';

const MyProfile = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        setProfile(await user.getProfileInfo());
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }

    if (authentication) {
      loadProfile();
    } else {
      setProfile(null);
    }
  }, [authentication]);

  if (authentication) {
    return loading ? <GordonLoader /> : <Profile profile={profile} myProf />;
  }
  return <GordonUnauthorized feature={'your profile'} />;
};

export default MyProfile;
