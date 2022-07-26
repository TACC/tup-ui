import React from 'react';
import { useProfile } from '@tacc/tup-ui/hooks';

const ProfileComponent: React.FC = () => {
  const profileQuery = useProfile();

  const profile = profileQuery.data;
  if (profile) {
    return (
      <div>
        User Profile
        <ul>
          <li>
            {profile.firstName} {profile.lastName}
          </li>
          <li>{profile.institution}</li>
          <li>{profile.country}</li>
        </ul>
      </div>
    );
  }
  return <div>User Profile</div>;
};

export default ProfileComponent;
