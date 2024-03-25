import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './instructions.module.css';

const Instructions = () => {
  return (
    
    <div>
      <Accordion>
        <AccordionSummary
          className={styles.housing_card_header} 
          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />} 
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
          <Typography variant="body1" paragraph>
            <strong>2. What happens if I do not complete the questionnaire by the deadline?</strong><br/>
            The questionnaire will remain open and can be completed after the deadline. 
            All late submissions will be placed on a housing waitlist and given a placement in July, as fall semester availability is much clearer by that time.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>3. How can I learn more about my housing options?</strong><br/>
            Please visit <Link href="https://www.gordon.edu/residencehalls"> our residence halls</Link> 
            for information about our residence halls. Room cost information can be obtained by visiting 
            <Link href="https://www.gordon.edu/roomcosts"> room costs </Link>.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>4. How will I learn my room assignment?</strong><br/>
            You will receive your room assignment via email no later than Friday, Apr.28.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>5. Do I need to be registered for classes to complete the questionnaire?</strong><br/>
            No, you should complete the questionnaire even if you are not yet registered for classes. 
            However, registration will be taken into consideration during the assigning process. See question #13.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>6.What if I complete the questionnaire, and then want to change my preferences?</strong><br/>
            Simply complete the questionnaire again. You can complete the questionnaire as many times as needed prior to the deadline. 
            Only your most recent submission will be taken into consideration.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>7. Do I need a roommate to complete the questionnaire?</strong><br/>
            No, you do not need a roommate to complete the questionnaire and receive a housing assignment. If you participate in the housing lottery without a roommate, you will be assigned a roommate. That assignment will be communicated via email.
          </Typography> 
          <Typography variant="body1" paragraph>
            <strong>8. I have a roommate (or two or three). Should we all complete separate questionnaires?</strong><br/>
            No. If you are applying as a group of two, three, or four, you should only complete one questionnaire. Each group will receive one lottery number, regardless of group size. The person listed first on the questionnaire will serve as the contact person for your group.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>9. Can I request to room with an incoming student?</strong><br/>
            Yes, just include “(incoming)” after listing their name on the questionnaire.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>10. What about suite mates?</strong><br/>
            There is a space to indicate suite mate requests on the questionnaire.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>11. Are single rooms available during the lottery?</strong><br/>
            No, single rooms were assigned during the Special Accommodations process.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>12. Can I request a specific room during the lottery?</strong><br/>
            Yes, there is a space on the form to indicate a specific room request. We will do our best to accommodate requests, but there is no guarantee.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>13. How will lottery order be determined?</strong><br/>
            Lottery order will be determined class-by-class (based on current academic standing), using a randomizer. 
            For example, if 40 current seniors register for the lottery, the names of those 40 seniors will be inputted, and assigning will begin with the lowest number. 
            Current juniors, current sophomores, and current freshman will follow, in that order. 
            Important note: the aforementioned process assumes that a student is registered for Fall 2023 classes and is not on chapel probation. 
            All students, regardless of class, who are not registered for classes by the beginning of the assignment process will be grouped together, given lottery numbers, and assigned after the current freshman class. 
            If one member of a group is not registered for classes, the entire group will be considered as unregistered. Students on chapel probation will be included with the unregistered group.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>14. I am a sophomore, and my roommate is a senior. With which class will our questionnaire be reviewed?</strong><br/>
            In situations where group members have different academic standings, the group will be considered to have the standing of the member with the highest standing. 
            To use the example from the question, a sophomore + senior group would be considered to have senior standing.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>15. Where can I learn my class standing?</strong><br/>
            You can visit <Link href="360.gordon.edu"> 360.gordon.edu </Link> to learn your class standing.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>16. What if I want housing other than what I receive?</strong><br/>
            It is our goal to accommodate every preference, but we are unfortunately unable to do so.
            If you want to request a different location after receiving your assignment, you can email Housing on or after July 1 to request that.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>17. How can I receive confirmation that my questionnaire has been received?</strong><br/>
            If you would like confirmation that your questionnaire has been received, you will need to select the “Send me an email receipt of my responses” box at the bottom of the questionnaire. 
            No other confirmation will be provided.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Instructions;
