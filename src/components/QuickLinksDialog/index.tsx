import GordonDialogBox from 'components/GordonDialogBox';
import LinkIcon from '@mui/icons-material/InsertLink';
import {
  ListItemIcon,
  ListItemText,
  ListSubheader,
  List,
  ListItem,
  CardHeader,
} from '@mui/material';
import CanvasIcon from './images/Canvas.ico';
import GordonIcon from './images/favicon.ico';
import GOIcon from './images/GoGordonFavicon.ico';
import MyGordonIcon from './images/MyGordonFavicon.ico';
import { PropsWithChildren } from 'react';
import styles from './QuickLinksDialog.module.css';
import styles2 from 'app.module.css';

type ListItemProps = {
  name: string;
  href: string;
  icon?: { src: string; alt: string };
};

const academicLinks: ListItemProps[] = [
  {
    href: 'https://www.gordon.edu',
    name: 'Gordon College',
    icon: {
      src: GordonIcon,
      alt: 'Gordon Logo',
    },
  },
  {
    href: 'https://my.gordon.edu',
    name: 'My Gordon',
    icon: { src: MyGordonIcon, alt: 'My Gordon Logo' },
  },
  {
    href: 'https://go.gordon.edu',
    name: 'Go Gordon',
    icon: { src: GOIcon, alt: 'Go Gordon Logo' },
  },
  {
    href: 'https://canvas.gordon.edu',
    name: 'Canvas',
    icon: { src: CanvasIcon, alt: 'Canvas Logo' },
  },
];

const otherLinks: ListItemProps[] = [
  {
    href: 'https://athletics.gordon.edu/',
    name: 'Fighting Scots',
  },
  { href: 'https://stories.gordon.edu/', name: 'The Bell' },
  { href: 'https://www.gordon.edu/titleix', name: 'Sexual Discrimination and Harassment' },
  { href: 'https://www.gordon.edu/map', name: 'Gordon College Maps' },
  { href: 'https://outlook.office.com/mail/', name: 'Gordon Email' },
];

type Props = {
  handleLinkClose: () => void;
  linkopen: boolean;
};

const GordonQuickLinksDialog = ({ linkopen, handleLinkClose }: Props) => {
  return (
    <GordonDialogBox
      aria-labelledby="useful-links"
      open={linkopen}
      title=""
      buttonClicked={handleLinkClose}
      buttonName="Close"
    >
      <CardHeader title="Useful Links" className={styles2.gc360_header} />
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            className={styles.quick_links_dialog_link_text}
            disableSticky
          >
            Academics
          </ListSubheader>
        }
      >
        {academicLinks.map((link) => (
          <ListItemLink {...link} />
        ))}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            className={styles.quick_links_dialog_link_text}
            disableSticky
          >
            Information
          </ListSubheader>
        }
      >
        {otherLinks.map((link) => (
          <ListItemLink {...link} />
        ))}
      </List>
    </GordonDialogBox>
  );
};

const iconStyle = { width: '1.5rem' };

function ListItemLink({ href, name, icon }: PropsWithChildren<ListItemProps>) {
  return (
    <ListItem target="_blank" rel="noopener" className="gc360_text_link" component="a" href={href}>
      <ListItemIcon>
        {icon ? (
          <img src={icon.src} alt={icon.alt} style={iconStyle} />
        ) : (
          <LinkIcon style={iconStyle} />
        )}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default GordonQuickLinksDialog;
