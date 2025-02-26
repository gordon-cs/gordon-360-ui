import styles from './LostAndFoundAdmin.module.css';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from '@mui/material';
import { Grid, Button } from '@mui/material';
import Header from 'views/LostAndFound/components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import { getUrlParam, setUrlParam, clearUrlParams } from 'views/LostAndFound/components/Helpers';
import { Construction, Person, Storage } from '@mui/icons-material';
import lostAndFoundService, { MissingItemReport, FoundItem } from 'services/lostAndFound';

const LostAndFoundAdmin = () => {
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [reports, setReports] = useState<MissingItemReport[]>([]);
  const [status, setStatus] = useState(''); // Default value active
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    if (!isAdmin && !isDev) {
      navigate('/lostandfound'); // Leave the page if user is not an admin
    }
  });

  const LostItemDatabase = (
    <>
      <Grid container rowGap={1}>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate('missingitemdatabase?status=active');
            }}
          >
            <Storage />
            <span className={styles.spacing}></span>
            <b>Lost Items Database</b>
          </Button>
        </Grid>
      </Grid>
    </>
  );

  const ReportLostItem = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('reportitemforothers');
      }}
    >
      <Person />
      <span className={styles.spacing}></span>
      <b>Report Item for Others</b>
    </Button>
  );

  const lostItemsCard = (
    <>
      <Card>
        <CardHeader title="Lost Items" />
        <CardContent>
          <Grid container rowGap={2}>
            <Grid container item xs={12}>
              {LostItemDatabase}
            </Grid>
            <Grid container item xs={12}>
              {ReportLostItem}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  const FoundItemDatabase = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('founditemdatabase');
      }}
    >
      <Storage />
      <span className={styles.spacing}></span>
      <b>Found Items Database</b>
    </Button>
  );

  const EnterFoundItem = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('founditemform');
      }}
    >
      <Person />
      <span className={styles.spacing}></span>
      <b>Enter Found Item</b>
    </Button>
  );

  const FoundItemsCard = (
    <>
      <Card>
        <CardHeader title="Found Items" />
        <CardContent>
          <Grid container rowGap={2}>
            <Grid container item xs={12}>
              {FoundItemDatabase}
            </Grid>
            <Grid container item xs={12}>
              {EnterFoundItem}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  const MissingItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'center'}>
        <Grid container item xs={11.85}>
          <Grid item xs={2}>
            Date Lost
          </Grid>
          <Grid item xs={2}>
            Owner's Name
          </Grid>
          <Grid item xs={2}>
            Location
          </Grid>
          <Grid item xs={1.5}>
            Category
          </Grid>
          <Grid item xs={3}>
            Description
          </Grid>
          <Grid item xs={1} className={styles.noWrap}>
            Last Checked
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
    </>
  );

  const FoundItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'left'}>
        <Grid container item xs={5.9}>
          <Grid item xs={1}>
            Tag #
          </Grid>
          <Grid item xs={1}>
            Date Lost
          </Grid>
          <Grid item xs={1}>
            Location
          </Grid>
          <Grid item xs={0.75}>
            Category
          </Grid>
          <Grid item xs={1.5}>
            Description
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Header />
      <Grid container justifyContent={'center'}>
        <Grid item xs={11}>
          <Card>
            <CardHeader title={'Gordon Lost & Found Admin'} className={styles.title}></CardHeader>
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {lostItemsCard}
                </Grid>
                <Grid item xs={12} md={6}>
                  {FoundItemsCard}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={11} marginTop={6}>
          <CardHeader title={'Comparison View'} className={styles.title}></CardHeader>
        </Grid>
        <Grid item xs={11} marginTop={6}>
          <Card className={styles.filterCardPosition}>
            <CardHeader
              title={
                <span className={styles.filterTitleText}>
                  <b>Filters: </b>
                </span>
              }
              className={styles.filterTitle}
            ></CardHeader>
            <CardContent className={styles.filterContainer}>
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item sm={6}>
                  {/* Keywords, Status, Color, Category, and Clear button on a single row */}
                  <Grid container spacing={isMobile ? 1 : 2}>
                    <Grid item>
                      <TextField
                        label="Keywords"
                        variant="outlined"
                        size="small"
                        value={keywords}
                        onChange={(e) => setUrlParam('keywords', e.target.value, setSearchParams)}
                        className={styles.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={status}
                          onChange={(e) => setUrlParam('status', e.target.value, setSearchParams)}
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="expired">Expired</MenuItem>
                          <MenuItem value="found">Found</MenuItem>
                          <MenuItem value="deleted">Deleted</MenuItem>
                          <MenuItem value="PickedUp">PickedUp</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                          value={color}
                          onChange={(e) => setUrlParam('color', e.target.value, setSearchParams)}
                        >
                          <MenuItem value="">All</MenuItem>
                          {LFColors.map((colorOption) => (
                            <MenuItem key={colorOption} value={colorOption}>
                              {colorOption}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={category}
                          onChange={(e) => setUrlParam('category', e.target.value, setSearchParams)}
                        >
                          <MenuItem value="">All</MenuItem>
                          {LFCategories.map((categoryOption) => (
                            <MenuItem key={categoryOption} value={categoryOption}>
                              {categoryOption}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={isMobile}>
                      <Button
                        onClick={() => {
                          clearUrlParams(setSearchParams);
                        }}
                        variant="contained"
                        color="error"
                        fullWidth
                      >
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container xs={2}>
          {MissingItemsListHeader}
          {FoundItemsListHeader}
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundAdmin;
