import {
    Divider,
    Grid,
    List,
    ListItem,
    Switch,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core/';
import LockIcon from '@material-ui/icons/Lock';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { Link } from 'react-router-dom';
import styles from './MembershipInfoCard.module.css';
//https://mui.com/components/switches/
import membershipService from 'services/membership';
import activity from 'services/activity';
import { useEffect, useState } from 'react';

const PrivacyToggle = ({ element, createSnackbar }) => {
        async function loadPrivacy() {
                const involvement = await activity.get(element.ActivityCode);
                    element.IsInvolvementPrivate=involvement.Privacy;
        }
        loadPrivacy();

    const isOnline = useNetworkStatus();

    const [checked] = useState(element.Privacy);

    const toggleMembershipPrivacy = async (element) => {
        try {
            await membershipService.toggleMembershipPrivacy(element);
            createSnackbar(element.Privacy ? 'Membership Shown' : 'Membership Hidden', 'success');
            element.Privacy = !element.Privacy
        } catch {
            createSnackbar('Privacy Change Failed', 'error');
        }
    };


    return (
        <Grid container item xs={4} alignItems="center">
            <Grid item xs={12} align="center">
                {isOnline &&
                    (element.IsInvolvementPrivate ? (
                        <LockIcon className={styles.lock_icon} />
                    ) : (
                        <Switch
                            onChange={() => {
                                toggleMembershipPrivacy(element);
                            }}
                            checked={!checked}
                            key={element.ActivityDescription + element.ActivityCode}
                        />
                    ))}
            </Grid>
            <Grid item xs={12} align="center">
                <Typography>
                    {element.Privacy || element.IsInvolvementPrivate ? 'Private' : 'Public'}
                </Typography>
            </Grid>
        </Grid>
    );

};

const OnlineOnlyLink = ({ element, children }) => {
    const isOnline = useNetworkStatus();
    const showPrivate = element.IsInvolvementPrivate || element.Privacy;
    if (isOnline) {
        return (
            <Link
                className={`gc360_text_link ${showPrivate ? styles.private_membership : styles.public_membership
                    }`}
                to={`/activity/${element.SessionCode}/${element.ActivityCode}`}
            >
                {children}
            </Link>
        );
    } else {
        return (
            <div className={`${showPrivate ? styles.private_membership : styles.public_membership}`}>
                {children}
            </div>
        );
    }
};


const MembershipInfoCard = ({ myProf, membership, createSnackbar }) => {
    //the whole list refreshes when privacy changes here
    const isOnline = useNetworkStatus();

    return (
        <>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                className={styles.membership_info_card}
            >
                <Grid
                    container
                    item
                    xs={8}
                    sm={9}
                    lg={8}
                    xl={9}
                    justifyContent="flex-start"
                    alignItems="center"
                    className={styles.membership_info_card_description}
                >
                    <Grid item xs={8}>
                        <List>
                            <ListItem
                                className={styles.my_profile_info_card_description_text}
                                key={membership[0].ActivityCode}
                            >
                                <Accordion>
                                    <AccordionSummary>
                                        <Typography fontWeight="fontWeightBold">
                                            {membership[0].ActivityDescription}
                                        </Typography>
                                    </AccordionSummary>
                                    {membership.map((element) => (
                                        <AccordionDetails>
                                            <OnlineOnlyLink element={element}>
                                                <Typography>
                                                    {element.SessionDescription +
                                                        ' (' +
                                                        element.ParticipationDescription +
                                                        ')'}
                                                </Typography>
                                            </OnlineOnlyLink>
                                            {myProf && (
                                                <PrivacyToggle
                                                    key={element.ActivityCode + element.ActivityDescription}
                                                    element={element}
                                                    createSnackbar={createSnackbar}
                                                ></PrivacyToggle>
                                            )}
                                        </AccordionDetails>
                                    ))}
                                </Accordion>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={4}
                    sm={3}
                    lg={4}
                    xl={3}
                    className={styles.membership_info_card_image}
                    alignItems="center"
                >
                    {/* <OnlineOnlyLink> */}
                    <img src={membership[0].ActivityImagePath} alt="" className={isOnline ? 'active' : ''} />
                    {/* </OnlineOnlyLink> */}
                </Grid>
            </Grid>
            <Divider />
        </>
    );
};

export default MembershipInfoCard;
