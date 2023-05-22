import GordonDialogBox from 'components/GordonDialogBox';
import LinkIcon from '@mui/icons-material/InsertLink';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem } from '@mui/material';
import CanvasIcon from './images/Canvas.ico';
import GordonIcon from './images/favicon.ico';
import GOIcon from './images/GoGordonFavicon.ico';
import MyGordonIcon from './images/MyGordonFavicon.ico';
import { PropsWithChildren } from 'react';

type ListItemProps = {
  name: string;
  href: string;
  icon?: { src: string; alt: string };
};

const customIconLinks: ListItemProps[] = [
  {
    href: 'https://www.gordon.edu',
    name: 'Gordon College',
    icon: {
      src: GordonIcon,
      alt: 'gordon',
    },
  },
  {
    href: 'https://my.gordon.edu',
    name: 'My Gordon',
    icon: { src: MyGordonIcon, alt: 'my gordon' },
  },
  { href: 'https://go.gordon.edu', name: 'Go Gordon', icon: { src: GOIcon, alt: 'go gordon' } },
  { href: 'https://canvas.gordon.edu', name: 'Canvas', icon: { src: CanvasIcon, alt: 'canvas' } },
];

const otherLinks: ListItemProps[] = [
  {
    href: 'https://athletics.gordon.edu/',
    name: 'Fighting Scots',
  },
  { href: 'https://stories.gordon.edu/', name: 'The Bell' },
  { href: 'https://www.gordon.edu/titleix', name: 'Sexual Discrimination and Harassment' },
  { href: 'https://www.gordon.edu/map', name: 'Gordon College Maps' },
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
      title="Useful Links"
      buttonClicked={handleLinkClose}
      buttonName="Close"
    >
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" disableSticky>
            Academics
          </ListSubheader>
        }
      >
        {customIconLinks.map((link) => (
          <ListItemLink {...link} />
        ))}
      </List>
      <List component="nav" subheader={<ListSubheader component="div">Information</ListSubheader>}>
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
