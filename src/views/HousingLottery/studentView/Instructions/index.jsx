import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../HousingLottery.module.css';

const Instructions = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Instructions (As easy as 1, 2, 3!)
      </Typography>
      <Typography variant="body1" paragraph>
        1. Review FAQs
      </Typography>
      <Typography variant="body1" paragraph>
        2. Access questionnaire
      </Typography>
      <Typography variant="body1" paragraph>
        3. Complete questionnaire by providing name(s), email(s), and housing preferences by Friday, Apr. 21 at noon.
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="housing-lottery-faq-content"
          id="housing-lottery-faq-header"
        >
          <Typography variant="h5">Housing Lottery FAQ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            <strong>1. Who should complete the questionnaire?</strong><br/>
            Anyone who has not yet secured housing for the Fall 2022 semester should participate in the lottery by completing the questionnaire.
          </Typography>
          {/* Repeat for other questions */}
          <Typography variant="body1" paragraph>
            <strong>3. How can I learn more about my housing options?</strong><br/>
            Please visit <Link href="https://www.gordon.edu/residencehalls">our residence halls</Link> for information about our residence halls. Room cost information can be obtained by visiting <Link href="https://www.gordon.edu/roomcosts">room costs</Link>.
          </Typography>
          {/* Include all other FAQ items in a similar manner */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Instructions;
