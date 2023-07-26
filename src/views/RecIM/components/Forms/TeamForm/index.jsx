import { useState, useMemo, useEffect } from 'react';
import Form from '../Form';
import { createTeam, editTeam, getTeamAffiliations, getTeamStatusTypes } from 'services/recim/team';
import { useUser } from 'hooks';

const TeamForm = ({
  isAdmin,
  team,
  onClose,
  createSnackbar,
  openTeamForm,
  setOpenTeamForm,
  activityID,
}) => {
  const { profile } = useUser();
  const [teamStatus, setTeamStatus] = useState([]);
  const [affiliations, setAffiliations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTeamStatus(await getTeamStatusTypes());
      setAffiliations(await getTeamAffiliations());
      setLoading(false);
    };
    loadData();
  }, [profile]);

  const createTeamFields = [
    {
      label: 'Name',
      name: 'Name',
      type: 'text',
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Affiliation',
      name: 'Affiliation',
      type: 'select',
      menuItems: affiliations.map((type) => type.Description),
      helperText: '*Required',
    },
  ];

  if (team && isAdmin) {
    createTeamFields.push({
      label: 'Team Status',
      name: 'StatusID',
      type: 'select',
      menuItems: teamStatus.map((type) => type.Description),
      helperText: '*Required',
      required: true,
    });
  }
  console.log(team);
  console.log(affiliations);

  const currentInfo = useMemo(() => {
    if (team) {
      return {
        Name: team.Name,
        ActivityID: Number(activityID),
        StatusID:
          teamStatus.find((type) => type.Description === team.Status) == null
            ? ''
            : teamStatus.find((type) => type.Description === team.Status).Description,
        Affiliation: team.Affiliation,
      };
    }
    return {
      Name: '',
      ActivityID: Number(activityID),
    };
  }, [activityID, team, teamStatus]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let teamRequest = { ...currentInfo, ...newInfo };

    if (team) {
      teamRequest.StatusID = teamStatus.find(
        (type) => type.Description === teamRequest.StatusID,
      ).ID;

      editTeam(team.ID, teamRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Team ${teamRequest.Name} has been edited successfully`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(
            `There was a problem editing your team ${teamRequest.Name}: ${reason.title}`,
            'error',
          );
        });
    } else {
      createTeam(profile.AD_Username, teamRequest)
        .then((createdTeam) => {
          setSaving(false);
          createSnackbar(`Team ${teamRequest.Name} has been created successfully`, 'success');
          onClose(createdTeam.ID);
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(
            `There was a problem creating your team ${teamRequest.Name}: ${reason.title}`,
            'error',
          );
        });
    }
  };

  return (
    <Form
      formTitles={{ name: 'Team', formType: team ? 'Edit' : 'Create' }}
      fields={[createTeamFields]}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenTeamForm}
      openForm={openTeamForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default TeamForm;
