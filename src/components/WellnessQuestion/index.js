import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import GordonLoader from 'components/Loader';
import SymptomsDialog from 'components/SymptomsDialog';
import { useEffect, useState } from 'react';
import wellness, { StatusColor } from 'services/wellness';
import styles from './WellnessQuestion.module.css';

const WellnessQuestion = ({ setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState();
  const [wellnessQuestion, setWellnessQuestion] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    setLoading(true);
    const question = await wellness.getQuestion();
    setWellnessQuestion(question);
    setLoading(false);
  };

  const submitAnswer = () => {
    wellness.postAnswer(answer).then((status) => setStatus(status));
  };

  if (loading === true) {
    return <GordonLoader />;
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10} md={4}>
        <Card className={styles.wellness_question}>
          <CardHeader title="Wellness Check" className={styles.wellness_header} />
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl>
                  <FormLabel>{wellnessQuestion.question}</FormLabel>
                  <div style={{ height: '10px' }}></div>
                  {wellnessQuestion.symptoms.map((item, index) => (
                    <FormLabel key={index}>- {item}</FormLabel>
                  ))}
                  <br />
                  <RadioGroup>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label={`Yes`}
                      onChange={() => {
                        setAnswer(StatusColor.Yellow);
                      }}
                    />
                    <br></br>
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label={'No'}
                      onChange={() => {
                        setAnswer(StatusColor.Green);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Grid item>
            <Collapse in={!!answer}>
              <Grid
                container
                direction="column"
                align="center"
                className={styles[answer]}
                spacing={1}
              >
                <Grid item>
                  <Typography color="textPrimary" className={styles.left}>
                    {answer === StatusColor.Yellow
                      ? wellnessQuestion.yesPrompt
                      : wellnessQuestion.noPrompt}
                    {answer === StatusColor.Yellow ? (
                      <a href={wellnessQuestion.link} target="_blank" rel="noopener noreferrer">
                        this link
                      </a>
                    ) : null}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      answer === StatusColor.Yellow ? setIsDialogOpen(true) : submitAnswer();
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <div className={styles.wellness_header}>
            Questions? Email{' '}
            <a className={styles.contact_link} href="mailto:covid-19@gordon.edu">
              Covid-19@gordon.edu
            </a>
          </div>
          <SymptomsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} setStatus={setStatus} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default WellnessQuestion;
