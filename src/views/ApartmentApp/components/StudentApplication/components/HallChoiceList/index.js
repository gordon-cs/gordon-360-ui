import { Button, Card, CardContent, CardHeader, Grid, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// eslint-disable-next-line no-unused-vars
import { Dispatch, SetStateAction, useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import housing from 'services/housing';
// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';
import HallChoiceListItem from './components/HallChoiceListItem';

/**
 * @typedef { import('services/housing').ApartmentHall } ApartmentHall
 * @typedef { import('services/housing').ApartmentChoice } ApartmentChoice
 */

/**
 * Renders a list of selection boxes to choosing preferred halls
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list item
 * @param {ApartmentChoice[]} props.apartmentChoices Array of apartment choices
 * @param {Function} props.onHallAdd Callback for "Add Hall" button
 * @param {Function} props.onHallInputChange Callback for dropdown menu change
 * @param {Function} props.onHallRemove Callback for remove hall button
 * @returns {JSX.Element} JSX Element for the hall list
 */
const HallChoiceList = ({
  disabled,
  apartmentChoices,
  onHallAdd,
  onHallInputChange,
  onHallRemove,
}) => {
  /** @type {[ApartmentHall[], Dispatch<SetStateAction<ApartmentHall[]>>]} Array of apartment halls */
  const [halls, setHalls] = useState([]); // array of hall names from backend

  useEffect(() => {
    /**
     * Get the list of apartment halls from the database
     * (Coming soon: list of apartment halls filtered by gender of the current user)
     *
     * @async
     * @function loadHalls
     */
    const loadApartmentHalls = async () => {
      setHalls(await housing.getApartmentHalls());
    };

    loadApartmentHalls();
  }, []);

  return (
    <Card>
      <CardHeader title="Preferred Halls" className={styles.apartment_card_header} />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <List
              className={styles.hall_list}
              aria-label="apartment preferred halls"
              disablePadding
            >
              {apartmentChoices?.length > 0 &&
                apartmentChoices.map((hallInfo, index) => (
                  <HallChoiceListItem
                    key={index + hallInfo.HallRank + hallInfo.HallName}
                    disabled={disabled}
                    index={index}
                    hallRank={hallInfo.HallRank}
                    hallName={hallInfo.HallName}
                    apartmentChoices={apartmentChoices}
                    halls={halls}
                    onHallInputChange={onHallInputChange}
                    onHallRemove={onHallRemove}
                  />
                ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={disabled}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon fontSize="inherit" />}
              onClick={onHallAdd}
            >
              Add a Hall
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HallChoiceList;
