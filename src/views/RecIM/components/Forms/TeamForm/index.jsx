import { useState, useMemo, useEffect } from 'react';
import Form from '../Form';
import { createTeam, editTeam, getTeamStatusTypes } from 'services/recim/team';
import { useUser } from 'hooks';

const TeamForm = ({
  isAdmin,
  team,
  closeWithSnackbar,
  openTeamForm,
  setOpenTeamForm,
  activityID,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    Name: false,
    ActivityID: false,
    Logo: false,
    statusID: false,
  });

  const { profile } = useUser();
  const [teamStatus, setTeamStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTeamStatus(await getTeamStatusTypes());
      setLoading(false);
    };
    loadData();
  }, [profile]);

  const createTeamFields = [
    {
      label: 'Name',
      name: 'Name',
      type: 'text',
      error: errorStatus.Name,
      helperText: '*Required',
      required: true,
    },
  ];
  if (team && isAdmin) {
    createTeamFields.push({
      label: 'Team Status',
      name: 'StatusID',
      type: 'select',
      menuItems: teamStatus.map((type) => {
        return type.Description;
      }),
      error: errorStatus.statusID,
      helperText: '*Required',
      required: true,
    });
  }

  const currentInfo = useMemo(() => {
    if (team) {
      return {
        Name: team.Name,
        ActivityID: Number(activityID),
        StatusID:
          teamStatus.find((type) => type.Description === team.Status) == null
            ? ''
            : teamStatus.find((type) => type.Description === team.Status).Description,
        Logo: null,
      };
    }
    return {
      Name: '',
      ActivityID: Number(activityID),
      Logo: null,
    };
  }, [activityID, team, teamStatus]);

  const errorCases = (field, value) => {
    switch (field) {
      default:
        return false;
    }
  };

  const handleConfirm = (newInfo, handleWindowClose, setSaving) => {
    setSaving(true);

    let teamRequest = { ...currentInfo, ...newInfo };

    if (team) {
      teamRequest.StatusID = teamStatus.find(
        (type) => type.Description === teamRequest.StatusID,
      ).ID;

      editTeam(team.ID, teamRequest).then(() => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Team edited successfully',
        });

        handleWindowClose();
      });
    } else {
      createTeam(profile.AD_Username, teamRequest).then((createdTeam) => {
        setSaving(false);
        closeWithSnackbar(createdTeam.ID, {
          type: 'success',
          message: 'Team created successfully',
        });

        handleWindowClose();
      });
    }
  };

  return (
    <Form
      formTitle={{ name: 'Team', formType: team ? 'Edit' : 'Create' }}
      fields={createTeamFields}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      setOpenForm={setOpenTeamForm}
      openForm={openTeamForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default TeamForm;
