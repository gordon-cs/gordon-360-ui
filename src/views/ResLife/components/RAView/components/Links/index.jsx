import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const Links = () => (
  <Card>
    <CardHeader title={'Helpful Links'} className="gc360_header" />
    <CardContent>
      <Typography>
        <List>
          <ListItem>
            <Link
              href="https://go.gordon.edu/departments/physicalplant/ppwos/index.cfm"
              underline="hover"
              className={`gc360_text_link`}
              target="_blank"
            >
              <ListItemText primary="Work Requests"></ListItemText>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.gordon.edu/police"
              underline="hover"
              className={`gc360_text_link`}
              target="_blank"
            >
              <ListItemText primary="Gordon Police"></ListItemText>
            </Link>
          </ListItem>
        </List>
      </Typography>
    </CardContent>
  </Card>
);

export default Links;
