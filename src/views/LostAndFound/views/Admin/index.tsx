import styles from './LostAndFoundAdmin.module.css';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Stack,
} from '@mui/material';
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material';
import Header from 'views/LostAndFound/components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import GordonLoader from 'components/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import {
  getUrlParam,
  setUrlParam,
  clearUrlParams,
  formatDateString,
} from 'views/LostAndFound/components/Helpers';
import { Delete, Launch, Person, Storage } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SimpleSnackbar from 'components/Snackbar';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { differenceInCalendarDays } from 'date-fns';
import lostAndFoundService, { MissingItemReport, FoundItem } from 'services/lostAndFound';
import { useUser } from 'hooks';
import GordonDialogBox from 'components/GordonDialogBox';

const LostAndFoundAdmin = () => {
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [missingReports, setMissingReports] = useState<MissingItemReport[]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [status, setStatus] = useState(''); // Default value active
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  const pageSize = 25;
  const [lazyLoading, setLazyLoading] = useState(false);
  const [foundLazyLoading, setFoundLazyLoading] = useState(false);
  const [hasMoreFound, setHasMoreFound] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadMoreFoundRef = useRef<HTMLDivElement>(null);
  const [showMissingPopUp, setShowMissingPopUp] = useState(false);
  const [showFoundPopUp, setShowFoundPopUp] = useState(false);
  const [missingID, setMissingID] = useState('');
  const [foundID, setFoundID] = useState('');
  const [missingItem, setMissingItem] = useState<MissingItemReport | null>(null);
  const [foundItem, setFoundItem] = useState<FoundItem | null>(null);
  const [fetchMissingLoading, setFetchMissingLoading] = useState(false);
  const [fetchFoundLoading, setFetchFoundLoading] = useState(false);
  const user = useUser();
  const matchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [noMatchIsClicked, setNoMatchIsClicked] = useState(false);
  const [isNoMatchModalOpen, setNoMatchModalOpen] = useState(false);
  const [matchFoundIsClicked, setMatchFoundIsClicked] = useState(false);
  const [recentlyChecked, setRecentlyChecked] = useState(false);
  const [isMatchModalOpen, setMatchModalOpen] = useState(false);
  const contactedResponseTypes = [
    'Owner will pick up',
    'Owner does not want',
    'CheckedActionCustomResponse',
    'No response from owner',
  ];
  const [contactMethod, setContactMethod] = useState('');
  const [response, setResponse] = useState('');
  const [checkedActionCustomResponseVisible, setCheckedActionCustomResponseVisible] =
    useState<boolean>(false);
  const [customCheckedActionResponseValue, setCustomCheckedActionResponseValue] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { profile } = useUser();
  const username = profile?.AD_Username || '';

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!isAdmin && !isDev) {
      navigate('/lostandfound'); // Leave the page if user is not an admin
    }
  });

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // Fetch the missing item report from the backend.
  const fetchItem = async (itemType: string) => {
    try {
      if (itemType === 'missing') {
        const fetchedItem = await lostAndFoundService.getMissingItemReport(
          parseInt(missingID || ''),
        );
        setMissingItem(fetchedItem);
        setFetchMissingLoading(false);
      } else if (itemType === 'found') {
        const fetchedItem = await lostAndFoundService.getFoundItem(foundID || '');
        setFoundItem(fetchedItem);
        setFetchFoundLoading(false);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleNoMatchClick = () => {
    setNoMatchIsClicked(true);
    handleNoMatchSubmit(missingID);
    setNoMatchModalOpen(false);
  };

  const handleNoMatchModalClose = () => {
    setNoMatchModalOpen(false);
  };

  const handleNoMatchSubmit = async (itemId: string) => {
    if (!noMatchIsClicked) setNoMatchIsClicked(true);
    let requestData = {
      missingID: parseInt(itemId || ''),
      action: 'Checked',
      actionNote: '',
      actionDate: new Date().toISOString(),
      username: user.profile?.AD_Username || '',
      isPublic: false,
    };
    setLazyLoading(true);
    try {
      await lostAndFoundService.createAdminAction(parseInt(itemId ? itemId : ''), requestData);
      setShowMissingPopUp(false);
      setNoMatchIsClicked(false);
      const fetchedMissingReports = await lostAndFoundService.getMissingItemReports(
        status,
        category,
        color,
        keywords,
        undefined,
        pageSize,
      );
      setMissingReports(fetchedMissingReports);
    } catch {
      setErrorSnackbarOpen(true);
      console.error('No Match Submit Failed');
    } finally {
      try {
        if (
          status === getUrlParam('status', location, searchParams) &&
          category === getUrlParam('category', location, searchParams) &&
          color === getUrlParam('color', location, searchParams) &&
          keywords === getUrlParam('keywords', location, searchParams)
        ) {
          const fetchedMissingReports = await lostAndFoundService.getMissingItemReports(
            status,
            category,
            color,
            keywords,
            undefined,
            pageSize,
          );
          setMissingReports(fetchedMissingReports);
          setLoading(false);
          setLazyLoading(false);
        }
      } catch (error) {
        console.error('Error fetching missing or found items', error);
        createSnackbar(`Failed to load missing or found items`, error);
      }
      setLazyLoading(false);
    }
  };

  const updateForm = async (name: string, newValue: string) => {
    if (name === 'contactMethod') {
      setContactMethod(newValue);
    } else if (name === 'response') {
      setResponse(newValue);
    }
  };

  const handleMatchDetailsFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;
    updateForm(name, value);
  };

  const handleMatchClick = () => {
    setNoMatchIsClicked(true);
    handleMatchFoundSubmit(missingID, foundID);
    setMatchModalOpen(false);
  };

  const handleMatchModalClose = () => {
    setMatchModalOpen(false);
  };

  const handleMatchFoundSubmit = async (missingID: string, foundID: string) => {
    if (!foundItem) return;
    if (!matchFoundIsClicked) setMatchFoundIsClicked(true);
    const updatedFoundItem = {
      ...foundItem,
      matchingMissingID: missingID,
      status: 'found',
    };
    setLazyLoading(true);
    setFoundLazyLoading(true);
    try {
      if (response === 'CheckedActionCustomResponse') {
        setResponse(customCheckedActionResponseValue);
      }
      lostAndFoundService.linkReports(
        parseInt(missingID || ''),
        foundID,
        missingItem?.submitterUsername || '',
        missingItem?.firstName || '',
        missingItem?.lastName || '',
        missingItem?.phone || '',
        missingItem?.email || '',
        contactMethod,
        response,
      );
      setShowMissingPopUp(false);
      setShowFoundPopUp(false);
      setMatchFoundIsClicked(false);
      setNoMatchIsClicked(false);
      const fetchedMissingReports = await lostAndFoundService.getMissingItemReports(
        status,
        category,
        color,
        keywords,
        undefined,
        pageSize,
      );
      const fetchedFoundReports = await lostAndFoundService.getFoundItems(
        '',
        '',
        status || '',
        color || '',
        category || '',
        keywords || '',
      );
      setMissingReports(fetchedMissingReports);
      setFoundItems(fetchedFoundReports);
    } catch {
      setErrorSnackbarOpen(true);
      console.log('Match Found Failed');
    } finally {
      setLazyLoading(false);
      setFoundLazyLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    const result = await setDashboard();
    if (result) setDashboardData(result);
  };

  // Set Dashboard metrics
  const setDashboard = async () => {
    let today = new Date();
    let sevenDays = new Date(today.setDate(today.getDate() - 7));
    let fourteenDays = new Date(today.setDate(today.getDate() - 14));
    let twoMonths = new Date(today.setMonth(today.getMonth() - 2));
    let foundString = 'found';

    try {
      const greaterThanWeekReports = await lostAndFoundService.getMissingItemReports(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        sevenDays,
      );
      const greaterThanTwoWeeksReports = await lostAndFoundService.getMissingItemReports(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        fourteenDays,
      );
      const totalReports = await lostAndFoundService.getMissingItemsCount(
        username,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      const totalReportsCount = totalReports;
      const twoPlusWeeksCount = greaterThanTwoWeeksReports.length;
      const oneToTwoWeeksCount = greaterThanWeekReports.length - twoPlusWeeksCount;
      const lessThanWeekCount = totalReportsCount - oneToTwoWeeksCount - twoPlusWeeksCount;

      const totalFoundItems = await lostAndFoundService.getFoundItemsCount(
        username,
        '',
        '',
        '',
        '',
        '',
        '',
      );

      const foundPendingPickupItems = await lostAndFoundService.getFoundItemsCount(
        username,
        '',
        foundString,
        '',
        '',
        '',
        '',
      );

      const foundPendingCleanOutItems = await lostAndFoundService.getFoundItemsCount(
        username,
        twoMonths.toDateString(),
        '',
        '',
        '',
        '',
        '',
      );

      const totalFoundItemsCount = totalFoundItems;
      const pendingPickupCount = foundPendingPickupItems;
      const pendingCleanOutCount = foundPendingCleanOutItems;
      const otherInStockCount = totalFoundItemsCount - pendingCleanOutCount - pendingPickupCount;

      return {
        totalReportsCount,
        lessThanWeekCount,
        oneToTwoWeeksCount,
        twoPlusWeeksCount,
        totalFoundItemsCount,
        pendingPickupCount,
        pendingCleanOutCount,
        otherInStockCount,
      };
    } catch (error) {
      console.error('Error fetching missing or found items', error);
      createSnackbar(`Failed to load missing or found items`, error);
      return null;
    }
  };

  type DashboardData = {
    totalReportsCount: number;
    lessThanWeekCount: number;
    oneToTwoWeeksCount: number;
    twoPlusWeeksCount: number;
    totalFoundItemsCount: number;
    pendingPickupCount: number;
    pendingCleanOutCount: number;
    otherInStockCount: number;
  };

  // Generates a semi-circle dashboard component for checked dates
  // This code was largely generated by ChatGPT
  const SemiCircleDashboard = () => {
    fetchDashboardData();

    if (!dashboardData)
      return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <GordonLoader />
        </div>
      );

    const {
      totalReportsCount,
      lessThanWeekCount,
      oneToTwoWeeksCount,
      twoPlusWeeksCount,
      totalFoundItemsCount,
      pendingPickupCount,
      pendingCleanOutCount,
      otherInStockCount,
    } = dashboardData;

    const angle1 = (lessThanWeekCount / totalReportsCount) * 180;
    const angle2 = (oneToTwoWeeksCount / totalReportsCount) * 180;

    const start1 = 180;
    const start2 = start1 - angle1;
    const start3 = start2 - angle2;

    const polarToCartesian = (
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number,
    ) => {
      const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const centerX = 200;
    const centerY = 50;
    const radius = 80;

    const describeArc = (
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number,
    ) => {
      const start = polarToCartesian(x, y, radius, startAngle);
      const end = polarToCartesian(x, y, radius, endAngle);

      const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? '1' : '0';

      return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
        ' ',
      );
    };

    const angleR1 = (pendingPickupCount / totalFoundItemsCount) * 180;
    const angleR2 = (pendingCleanOutCount / totalFoundItemsCount) * 180;

    const startR1 = 180;
    const startR2 = startR1 - angleR1;
    const startR3 = startR2 - angleR2;

    return (
      <div
        style={{ marginRight: '5rem', marginLeft: '5rem', marginTop: '2rem', marginBottom: '2rem' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ textAlign: 'center', marginRight: '-15rem' }}>
            <svg transform="rotate(180)">
              <path
                d={describeArc(centerX, centerY, radius, start1, start2)}
                fill="none"
                stroke="var(--mui-palette-success-main)"
                strokeWidth="30"
              />
              <path
                d={describeArc(centerX, centerY, radius, start2, start3)}
                fill="none"
                stroke="var(--mui-palette-warning-main)"
                strokeWidth="30"
              />
              <path
                d={describeArc(centerX, centerY, radius, start3, 0)}
                fill="none"
                stroke="var(--mui-palette-error-main)"
                strokeWidth="30"
              />
            </svg>

            <div style={{ marginTop: '-5rem', marginRight: '6rem' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>Total: {totalReportsCount}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mui-palette-success-main)' }}>●</span> &lt; 1 Week:{' '}
                <span style={{ color: 'var(--mui-palette-success-main)' }}>
                  {lessThanWeekCount}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mui-palette-warning-main)' }}>●</span> 1–2 Weeks:{' '}
                <span style={{ color: 'var(--mui-palette-warning-main)' }}>
                  {oneToTwoWeeksCount}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mui-palette-error-main)' }}>●</span> 2+ Weeks:{' '}
                <span style={{ color: 'var(--mui-palette-error-main)' }}>{twoPlusWeeksCount}</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginRight: '-15rem' }}>
            <svg transform="rotate(180)">
              <path
                d={describeArc(centerX, centerY, radius, startR1, startR2)}
                fill="none"
                stroke="var(--mui-palette-success-main)"
                strokeWidth="30"
              />
              <path
                d={describeArc(centerX, centerY, radius, startR2, startR3)}
                fill="none"
                stroke="var(--mui-palette-error-main)"
                strokeWidth="30"
              />
              <path
                d={describeArc(centerX, centerY, radius, startR3, 0)}
                fill="none"
                stroke="#00AEEF"
                strokeWidth="30"
              />
            </svg>

            <div style={{ marginTop: '-5rem', marginRight: '6rem' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>Total: {totalFoundItemsCount}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mui-palette-success-main)' }}>●</span> Pending Pickup:{' '}
                <span style={{ color: 'var(--mui-palette-success-main)' }}>
                  {pendingPickupCount}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--mui-palette-error-main)' }}>●</span> Pending Cleanout:{' '}
                <span style={{ color: 'var(--mui-palette-error-main)' }}>
                  {pendingCleanOutCount}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <span style={{ color: '#00AEEF' }}>●</span> Other In-stock:{' '}
                <span style={{ color: '#00AEEF' }}>{otherInStockCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fetch initial reports when filters change
  useEffect(() => {
    const updateFilters = async () => {
      setLazyLoading(true);
      setFoundLazyLoading(true);
      let today = new Date();
      let sevenDays = new Date(today.setDate(today.getDate() - 7));
      try {
        if (
          status === getUrlParam('status', location, searchParams) &&
          category === getUrlParam('category', location, searchParams) &&
          color === getUrlParam('color', location, searchParams) &&
          keywords === getUrlParam('keywords', location, searchParams)
        ) {
          const fetchedMissingReports = await lostAndFoundService.getMissingItemReports(
            status,
            category,
            color,
            keywords,
            undefined,
            pageSize,
            recentlyChecked ? undefined : sevenDays,
          );
          const fetchedFoundReports = await lostAndFoundService.getFoundItems(
            '',
            '',
            status || '',
            color || '',
            category || '',
            keywords || '',
          );
          setMissingReports(fetchedMissingReports);
          setFoundItems(fetchedFoundReports);
          setLoading(false);
          setLazyLoading(false);
          setFoundLazyLoading(false);
        }
      } catch (error) {
        console.error('Error fetching missing or found items', error);
        createSnackbar(`Failed to load missing or found items`, error);
      }
    };
    // Check if the keywords have changed, and make the API request only if they have been stable
    // to avoid making excessive API requests when users are typing keywords
    const checkForChanges = () => {
      if (currKeywords === keywords) {
        updateFilters();
      }
    };

    let currKeywords = keywords;
    if (pageLoaded) {
      setLoading(true);
      setLazyLoading(true);
      setFoundLazyLoading(true);
      setTimeout(() => {
        checkForChanges();
      }, 700);
    }
  }, [status, category, color, keywords, pageLoaded, recentlyChecked]);

  useEffect(() => {
    const updateFilters = () => {
      // Set the filter values based on the url query params
      let queryValue = getUrlParam('status', location, searchParams);
      if (status !== queryValue) {
        setStatus(queryValue);
      }
      queryValue = getUrlParam('color', location, searchParams);
      if (color !== queryValue) {
        setColor(queryValue);
      }
      queryValue = getUrlParam('category', location, searchParams);
      if (category !== queryValue) {
        setCategory(queryValue);
      }
      queryValue = getUrlParam('keywords', location, searchParams);
      if (keywords !== queryValue) {
        setKeywords(queryValue);
      }
    };
    updateFilters();
  }, [category, color, keywords, searchParams, status]);

  // Intersection Observer to trigger lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreMissingReports();
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, lazyLoading, hasMore, status, category, color, keywords, missingReports]);

  // Intersection Observer to trigger lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver((foundEntries) => {
      if (foundEntries[0].isIntersecting) {
        loadMoreFoundItems();
      }
    });
    if (loadMoreFoundRef.current) {
      observer.observe(loadMoreFoundRef.current);
    }
    return () => {
      if (loadMoreFoundRef.current) {
        observer.unobserve(loadMoreFoundRef.current);
      }
    };
  }, [
    loadMoreFoundRef,
    foundLazyLoading,
    hasMoreFound,
    status,
    color,
    category,
    keywords,
    foundItems,
  ]);

  useEffect(() => {
    if (missingID) {
      fetchItem('missing');
    }
  }, [missingID]);

  useEffect(() => {
    if (foundID) {
      fetchItem('found');
    }
  }, [foundID]);

  useEffect(() => {
    if (showMissingPopUp && showFoundPopUp && matchButtonRef.current) {
      matchButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showMissingPopUp, showFoundPopUp]);

  useEffect(() => {
    setCheckedActionCustomResponseVisible(response === 'CheckedActionCustomResponse');
  }, [response]);

  const yellowDateThreshold = 7;
  const redDateThreshold = 14;

  // Return a color based on how long ago a date was.
  const dateAgeColor = (date: string) => {
    let dateGiven = Date.parse(date);
    let today = new Date();
    let dayDiff = differenceInCalendarDays(today, dateGiven);
    // Return the color corresponding to the age of the date
    if (dayDiff < yellowDateThreshold) {
      return 'var(--mui-palette-success-main)';
    } else if (dayDiff < redDateThreshold) {
      return 'var(--mui-palette-warning-main)';
    } else {
      return 'var(--mui-palette-error-main)';
    }
  };

  const foundItemColor = (report: FoundItem) => {
    let dateCreated = new Date(report.dateCreated);
    let today = new Date();
    let twoMonths = new Date(today.setMonth(today.getMonth() - 2));
    console.log(report.status);
    if (report.status === 'found') {
      return 'var(--mui-palette-success-main)';
    } else if (dateCreated < twoMonths) {
      return 'var(--mui-palette-error-main)';
    } else {
      return '#00AEEF';
    }
  };

  const handleRecentCheckboxClick = () => {
    recentlyChecked ? setRecentlyChecked(false) : setRecentlyChecked(true);
  };

  // Lazy loading helper: load more reports
  const loadMoreMissingReports = async () => {
    if (lazyLoading || !hasMore) return;
    setLazyLoading(true);
    // Use the last report's recordID as the lastId; if none, it remains undefined.
    const lastId =
      missingReports.length > 0 ? missingReports[missingReports.length - 1].recordID : undefined;
    try {
      const moreReports = await lostAndFoundService.getMissingItemReports(
        status,
        category,
        color,
        keywords,
        lastId,
        pageSize,
      );
      if (moreReports.length < pageSize) {
        setHasMore(false);
      } else {
        setMissingReports((prev) => [...prev, ...moreReports]);
      }
    } catch (error) {
      console.error('Error loading more reports', error);
      createSnackbar(`Failed to load more missing item reports`, error);
    } finally {
      setLazyLoading(false);
    }
  };

  // Lazy loading helper: load more reports
  const loadMoreFoundItems = async () => {
    if (foundLazyLoading || !hasMoreFound) return;
    //setFoundLazyLoading(true);
    // Use the last report's recordID as the lastId; if none, it remains undefined.
    const lastId = foundItems.length > 0 ? foundItems[foundItems.length - 1].recordID : undefined;
    try {
      const moreReports = await lostAndFoundService.getFoundItems(
        lastId,
        '',
        status || '',
        color || '',
        category || '',
        keywords || '',
      );
      if (moreReports.length < pageSize) {
        setHasMoreFound(false);
      } else {
        setFoundItems((prev) => [...prev, ...moreReports]);
      }
    } catch (error) {
      console.error('Error loading more reports', error);
      createSnackbar(`Failed to load more found item reports`, error);
    } finally {
      setFoundLazyLoading(false);
    }
  };

  // Find and format the last checked date based on the list of admin actions for a given report.
  const displayLastCheckedDate = (report: MissingItemReport) => {
    let dateString = report.adminActions?.findLast((action) => {
      return action.action === 'Checked';
    })?.actionDate;
    if (dateString !== '' && dateString !== undefined) {
      return formatDateString(dateString);
    }
    return 'Never';
  };

  const handleMissingItemClick = (missingID: string) => {
    setFetchMissingLoading(true);
    setShowMissingPopUp(!showMissingPopUp);
    setMissingID(missingID);
  };

  const handleFoundItemClick = (foundID: string) => {
    setFetchFoundLoading(true);
    setShowFoundPopUp(!showFoundPopUp);
    setFoundID(foundID);
  };

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

  const FoundItemCleanout = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('founditemcleanout');
      }}
    >
      <Delete />
      <span className={styles.spacing}></span>
      <b>Found Item Cleanout</b>
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
            <Grid container item xs={12}>
              {FoundItemCleanout}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  const MissingItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'space-between'}>
        <Grid item xs={2}>
          Date Lost
        </Grid>
        <Grid item xs={2.5}>
          Location
        </Grid>
        <Grid item xs={2.5}>
          Category
        </Grid>
        <Grid item xs={3}>
          Description
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </>
  );

  const FoundItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'space-between'}>
        <Grid item xs={2}>
          Tag #
        </Grid>
        <Grid item xs={2}>
          Date Found
        </Grid>
        <Grid item xs={2}>
          Location
        </Grid>
        <Grid item xs={2.5}>
          Category
        </Grid>
        <Grid item xs={3}>
          Description
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </>
  );

  const SkeletonPopUp = () => {
    return (
      <>
        <Grid container className={styles.popUpCard}>
          <Grid container className={styles.popUpHeader}>
            <Grid item height={'1.5em'} width={'5rem'} className={styles.skeletonAnimation} />
            <Grid item height={'1.5em'} width={'8rem'} className={styles.skeletonAnimation} />
            <Grid item height={'1.5em'} width={'10rem'} className={styles.skeletonAnimation} />
            <Grid item height={'2em'} width={'3.8rem'} className={styles.skeletonAnimation} />
          </Grid>
          <Grid container direction={'row'}>
            <Grid
              container
              justifyContent={'space-between'}
              direction={'column'}
              className={styles.popUpBodyLeft}
            >
              <Grid
                item
                height={'3em'}
                width={'8rem'}
                marginBottom={'2em'}
                className={styles.skeletonAnimation}
              />
              <Grid
                item
                height={'3em'}
                width={'8rem'}
                marginBottom={'2em'}
                className={styles.skeletonAnimation}
              />
              <Grid
                item
                height={'3em'}
                width={'8rem'}
                marginBottom={'2em'}
                className={styles.skeletonAnimation}
              />
            </Grid>
            <Grid container direction={'column'} className={styles.popUpBodyRight}>
              <Grid item xs={6.5}>
                <Grid
                  item
                  height={'6em'}
                  width={'23em'}
                  marginBottom={'2em'}
                  className={styles.skeletonAnimation}
                />
                <Grid
                  item
                  height={'6em'}
                  width={'23em'}
                  marginBottom={'2em'}
                  className={styles.skeletonAnimation}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const MissingItemPopUp = () => {
    if (!missingItem) return null;

    return (
      <>
        <Grid container className={styles.popUpCard}>
          <Grid container className={styles.popUpHeader}>
            <Grid item fontSize={'1.3em'}>
              <div>{formatDateString(missingItem.dateLost)}</div>
            </Grid>
            <Grid item fontSize={'1.2em'}>
              <div>
                <b>
                  {missingItem.firstName}
                  <span>&nbsp;</span>
                  {missingItem.lastName}
                </b>
              </div>
            </Grid>
            <Grid item fontSize={'0.8em'}>
              <div>{missingItem.email}</div>
              <div>{missingItem.phone}</div>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  setShowMissingPopUp(!showMissingPopUp);
                  setMissingID('');
                }}
              >
                <CloseIcon className={styles.xIcon} />
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'}>
            <Grid container direction={'column'} className={styles.popUpBodyLeft}>
              <Grid item>
                <span className={styles.smallText}>Category:</span>
                <div className={styles.bolderText}>{missingItem.category}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Brand/Make:</span>
                <div className={styles.bolderText}>{missingItem.brand}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Colors:</span>
                <div className={styles.bolderText}>{missingItem.colors.join(', ')}</div>
              </Grid>
            </Grid>
            <Grid container direction={'column'} className={styles.popUpBodyRight}>
              <Grid item xs={6.5}>
                <Grid item>
                  <span className={styles.smallText}>Location:</span>
                  <div className={styles.regText}>{missingItem.locationLost}</div>
                </Grid>
                <Grid item>
                  <span className={styles.smallText}>Description:</span>
                  <div className={styles.regText}>{missingItem.description}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item margin={'2rem'}>
            <Link
              href={`lostandfound/lostandfoundadmin/missingitemdatabase/${missingID}`}
              className={`gc360_text_link`}
            >
              Go to Full Details <Launch />
            </Link>
          </Grid>
          <Grid item className={styles.buttonAlign}>
            <Button
              color="success"
              variant="contained"
              className={styles.markButton}
              disabled={noMatchIsClicked}
              onClick={() => {
                setNoMatchModalOpen(true);
              }}
            >
              <b>Mark No Match Found</b>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  const FoundItemPopUp = () => {
    if (!foundItem) return null;

    return (
      <>
        <Grid container className={styles.popUpCard}>
          <Grid container className={styles.popUpHeader}>
            <Grid item fontSize={'1.3em'}>
              <div>{formatDateString(foundItem.dateFound)}</div>
            </Grid>
            <Grid item fontSize={'1.2em'}>
              <div>
                <b>
                  {foundItem.ownerFirstName || foundItem.ownerLastName
                    ? `${foundItem.ownerFirstName || ''} ${foundItem.ownerLastName || ''}`
                    : 'Unknown'}
                </b>
              </div>
            </Grid>
            <Grid item fontSize={'0.8em'}>
              <div>{foundItem.ownerEmail}</div>
              <div>{foundItem.ownerPhone}</div>
            </Grid>
            <Grid item fontSize={'1.4em'}>
              <div>{foundItem.recordID}</div>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  setShowFoundPopUp(!showFoundPopUp);
                  setFoundID('');
                }}
              >
                <CloseIcon className={styles.xIcon} />
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'}>
            <Grid container direction={'column'} className={styles.popUpBodyLeft}>
              <Grid item>
                <span className={styles.smallText}>Category:</span>
                <div className={styles.bolderText}>{foundItem.category}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Brand/Make:</span>
                <div className={styles.bolderText}>{foundItem.brand}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Colors:</span>
                <div className={styles.bolderText}>{foundItem.colors.join(', ')}</div>
              </Grid>
            </Grid>
            <Grid container direction={'column'} className={styles.popUpBodyRight}>
              <Grid item xs={6.5}>
                <Grid item>
                  <span className={styles.smallText}>Location:</span>
                  <div className={styles.regText}>{foundItem.locationFound}</div>
                </Grid>
                <Grid item>
                  <span className={styles.smallText}>Description:</span>
                  <div className={styles.regText}>{foundItem.description}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item margin={'2rem'}>
            <Link
              href={`lostandfound/lostandfoundadmin/founditemdatabase/${foundID}`}
              className={`gc360_text_link`}
            >
              Go to Full Details <Launch />
            </Link>
          </Grid>
        </Grid>
      </>
    );
  };

  type NoMatchConfirmationModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
  };

  const NoMatchConfirmationModal: React.FC<NoMatchConfirmationModalProps> = ({
    open,
    onClose,
    onSubmit,
  }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle className={styles.modalTitle}>Mark as Checked</DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center">
            Confirm you could not find any <u>in-stock</u> items matching this one, and mark this
            report as checked on this date.
          </Typography>
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Button onClick={onClose} className={styles.cancelButton}>
            Keep Looking
          </Button>
          <Button onClick={onSubmit} className={styles.submitButton}>
            Confirmed, I didn't find any matching items
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  type MatchConfirmationModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
  };

  const MatchConfirmationModal: React.FC<MatchConfirmationModalProps> = ({
    open,
    onClose,
    onSubmit,
  }) => {
    if (!missingItem) return null;

    return (
      <GordonDialogBox
        open={open}
        title="Confirm Match?"
        buttonName="Link Reports As Found"
        buttonClicked={onSubmit}
        cancelButtonName="Cancel"
        cancelButtonClicked={onClose}
      >
        <Typography variant="body1" align="center">
          Confirm the details of these items match, and you’d like to mark them both as found.
        </Typography>
        <br />
        <Typography variant="body1" align="center">
          Contact the reporting party and inform them their item has been found.
        </Typography>
        <Grid container direction={'row'}>
          <Grid container direction={'column'} className={styles.popUpBodyLeft} margin={'0.5rem'}>
            <Grid item>
              <span className={styles.smallText}>Owner's Name</span>
              <div className={styles.bolderText}>
                {missingItem.firstName} {missingItem.lastName}
              </div>
            </Grid>
            <Grid item>
              <span className={styles.smallText}>Owner's Contact Info:</span>
              <div className={styles.bolderText}>Email: {missingItem.email}</div>
              <div className={styles.bolderText}>Phone: {missingItem.phone}</div>
            </Grid>
          </Grid>
          <Grid container direction={'column'} className={styles.popUpBodyRight}>
            <Grid item xs={6.5}>
              <Grid item>
                <span className={styles.smallText}>Owner Contacted:</span>
                <FormControl fullWidth>
                  <InputLabel>Contact Method</InputLabel>
                  <Select
                    fullWidth
                    value={contactMethod}
                    variant="filled"
                    label="Contact Method"
                    name="contactMethod"
                    onChange={handleMatchDetailsFormChange}
                  >
                    <MenuItem value={'Email'}>Email</MenuItem>
                    <MenuItem value={'Phone'}>Phone</MenuItem>
                  </Select>
                </FormControl>
                <Grid item marginTop={2}>
                  <FormControl fullWidth>
                    <InputLabel>Response</InputLabel>
                    <Select
                      fullWidth
                      value={response}
                      variant="filled"
                      label="Response"
                      name="response"
                      onChange={handleMatchDetailsFormChange}
                    >
                      {contactedResponseTypes.map((responseType) => (
                        <MenuItem value={responseType}>
                          {responseType === 'Owner will pick up'
                            ? 'Owner will pick up'
                            : responseType === 'Owner does not want'
                              ? 'Owner does not want'
                              : responseType === 'CheckedActionCustomResponse'
                                ? 'Enter response manually'
                                : responseType === 'No response from owner'
                                  ? 'No response'
                                  : responseType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {checkedActionCustomResponseVisible ? (
                  <Grid item xs={6.5} marginTop={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label={"Owner's Response"}
                      name="customOwnerResponse"
                      value={customCheckedActionResponseValue}
                      onChange={(ev) => setCustomCheckedActionResponseValue(ev.target.value)}
                    />
                  </Grid>
                ) : undefined}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </GordonDialogBox>
    );
  };

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
        <Grid item xs={12} md={11} marginTop={5}>
          <CardHeader title={'Comparison View'} className={styles.title}></CardHeader>
        </Grid>
        <Grid container xs={12} md={12} justifyContent={'center'}>
          <Card style={{ width: '91.8%' }}>
            <SemiCircleDashboard />
          </Card>
        </Grid>
        <Grid item xs={11} marginTop={3}>
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
              {/* Keywords, Status, Color, Category, and Clear button on a single row */}
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={isMobile} lg={4}>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={styles.itemsList} spacing={6}>
        <Grid item xs={12} md={6}>
          <CardHeader
            className={styles.titleSecondary}
            title={
              <span>
                Pending{' '}
                <b>
                  <u>Lost</u>
                </b>{' '}
                Item Reports
              </span>
            }
            action={
              <>
                <Checkbox
                  checked={recentlyChecked}
                  onChange={handleRecentCheckboxClick}
                  size="small"
                />
                <span>
                  Show <b className={styles.recentlyChecked}> Recently </b> Checked
                </span>
              </>
            }
          ></CardHeader>
          {showMissingPopUp ? (
            <>
              <CardContent className={styles.infoText} />
              {fetchMissingLoading ? (
                <SkeletonPopUp />
              ) : (
                <>
                  <MissingItemPopUp />
                </>
              )}
            </>
          ) : (
            <>
              <CardContent className={styles.infoText}>
                <InfoOutlinedIcon />
                <span>&nbsp;</span>
                <span>Click on a report to view details</span>
              </CardContent>
              {!isMobile && MissingItemsListHeader}
              <div className={styles.scrollBox}>
                {/*Show a loader when lazy loading */}
                {lazyLoading ? (
                  <GordonLoader />
                ) : (
                  <>
                    {missingReports.map((missingReport) =>
                      isMobile ? (
                        <Grid
                          container
                          direction="row"
                          justifyContent={'space-between'}
                          alignItems="center"
                          key={missingReport.recordID}
                          className={`${styles.reportRow} ${styles.clickableRow}`}
                          onClick={() => handleMissingItemClick(String(missingReport.recordID))}
                          tabIndex={0}
                        >
                          <Grid item xs={11.5}>
                            <Stack spacing={0.5}>
                              <div>Date Lost: {formatDateString(missingReport.dateLost)}</div>
                              <div>Location Lost: {missingReport.locationLost}</div>
                              <div>Category: {missingReport.category}</div>
                              <div>Description: {missingReport.description}</div>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <CircleIcon
                              sx={{
                                color: dateAgeColor(displayLastCheckedDate(missingReport)),
                                fontSize: 10,
                              }}
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid
                          container
                          justifyContent={'space-between'}
                          key={missingReport.recordID}
                          className={`${styles.reportRow} ${styles.clickableRow}`}
                          onClick={() => handleMissingItemClick(String(missingReport.recordID))}
                          tabIndex={0}
                        >
                          <Grid item md={2}>
                            {formatDateString(missingReport.dateLost)}
                          </Grid>
                          <Grid item md={2.5}>
                            <div className={styles.dataCell}>{missingReport.locationLost}</div>
                          </Grid>
                          <Grid item md={2.5}>
                            <div className={styles.dataCell}>{missingReport.category}</div>
                          </Grid>
                          <Grid item md={3}>
                            <div className={styles.dataCell}>{missingReport.description}</div>
                          </Grid>
                          <Grid item md={0.5} className={styles.dataCell}>
                            <CircleIcon
                              sx={{
                                color: dateAgeColor(displayLastCheckedDate(missingReport)),
                                fontSize: 10,
                              }}
                            />
                          </Grid>
                        </Grid>
                      ),
                    )}

                    {/* Sentinel element for lazy loading */}
                    <div ref={loadMoreRef} />
                  </>
                )}
              </div>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <CardHeader
            className={styles.titleSecondary}
            title={
              <span>
                In-Stock{' '}
                <b>
                  <u>Found</u>
                </b>{' '}
                Items
              </span>
            }
          >
            <span>View All</span>
          </CardHeader>
          {showFoundPopUp ? (
            <>
              <CardContent className={styles.infoText} />
              {fetchFoundLoading ? <SkeletonPopUp /> : <FoundItemPopUp />}
            </>
          ) : (
            <>
              <CardContent className={styles.infoText}>
                <InfoOutlinedIcon />
                <span>&nbsp;</span>
                <span>Click on an item to view details</span>
              </CardContent>
              {!isMobile && FoundItemsListHeader}
              <div className={styles.scrollBox}>
                {foundLazyLoading ? (
                  <GordonLoader />
                ) : (
                  <>
                    {foundItems.map((foundItem) =>
                      isMobile ? (
                        <Grid
                          container
                          direction="row"
                          justifyContent={'space-between'}
                          alignItems="center"
                          key={foundItem.recordID}
                          className={`${styles.reportRow} ${styles.clickableRow}`}
                          onClick={() => handleFoundItemClick(String(foundItem.recordID))}
                          tabIndex={0}
                        >
                          <Grid item xs={11.5}>
                            <Stack spacing={0.5}>
                              <div>Tag #: {foundItem.recordID}</div>
                              <div>Date Found: {formatDateString(foundItem.dateFound)}</div>
                              <div>Location Found: {foundItem.locationFound}</div>
                              <div>Category: {foundItem.category}</div>
                              <div>Description: {foundItem.description}</div>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <CircleIcon sx={{ color: foundItemColor(foundItem), fontSize: 10 }} />
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid
                          container
                          justifyContent={'space-between'}
                          key={foundItem.recordID}
                          className={`${styles.reportRow} ${styles.clickableRow}`}
                          onClick={() => handleFoundItemClick(String(foundItem.recordID))}
                          tabIndex={0}
                        >
                          <Grid item xs={2}>
                            <div className={styles.dataCell}>{foundItem.recordID}</div>
                          </Grid>
                          <Grid item xs={2}>
                            {formatDateString(foundItem.dateFound)}
                          </Grid>
                          <Grid item xs={2}>
                            <div className={styles.dataCell}>{foundItem.locationFound}</div>
                          </Grid>
                          <Grid item xs={2.5}>
                            <div className={styles.dataCell}>{foundItem.category}</div>
                          </Grid>
                          <Grid item xs={3}>
                            <div className={styles.dataCell}>{foundItem.description}</div>
                          </Grid>
                          <Grid item xs={0.5} className={styles.dataCell}>
                            <div>
                              <>
                                <CircleIcon
                                  sx={{ color: foundItemColor(foundItem), fontSize: 10 }}
                                />
                              </>
                            </div>
                          </Grid>
                        </Grid>
                      ),
                    )}
                    {/* Sentinel element for lazy loading */}
                    <div ref={loadMoreFoundRef} />
                  </>
                )}
              </div>
            </>
          )}
        </Grid>
      </Grid>
      {showMissingPopUp && showFoundPopUp ? (
        <Card>
          <CardContent>
            <Grid container justifyContent={'center'}>
              <Button
                ref={matchButtonRef}
                className={styles.matchButton}
                onClick={() => {
                  setMatchModalOpen(true);
                }}
                disabled={matchFoundIsClicked}
                variant="contained"
                color="secondary"
              >
                <ContentCopyRoundedIcon />
                <b>Match Found</b>
              </Button>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <div></div>
      )}
      <MatchConfirmationModal
        open={isMatchModalOpen}
        onClose={handleMatchModalClose}
        onSubmit={handleMatchClick}
      />
      <NoMatchConfirmationModal
        open={isNoMatchModalOpen}
        onClose={handleNoMatchModalClose}
        onSubmit={handleNoMatchClick}
      />
      <SimpleSnackbar
        open={errorSnackbarOpen}
        onClose={() => {
          setErrorSnackbarOpen(false);
        }}
        severity="error"
        text="No Match Submit Failed."
      />
      ``{' '}
    </>
  );
};

export default LostAndFoundAdmin;
