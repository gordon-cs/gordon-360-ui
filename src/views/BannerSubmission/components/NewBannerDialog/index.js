import { Button, TextField, Typography } from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Dropzone from 'react-dropzone';
import cmsService from 'services/cms';
import styles from './NewBannerDialog.module.css';

const NewBannerDialog = ({ open, setOpen, createSnackbar, addBanner }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [image, setImage] = useState(null);

  function handleWindowClose() {
    setOpen(false);
    setTitle('');
    setLink('');
    setImage(null);
    setSortOrder(0);
  }

  async function handleSubmit() {
    let bannerItem = {
      Title: title,
      LinkURL: link,
      SortOrder: sortOrder,
      ImageData: image,
    };

    let result = await cmsService.submitSlide(bannerItem);
    if (result === undefined) {
      createSnackbar('Sorry, banner submission failed', 'error');
    } else {
      createSnackbar('Successfully submitted banner', 'success');
      handleWindowClose();
      addBanner(result);
    }
  }

  return (
    <GordonDialogBox
      open={open}
      title="Add a new Banner"
      buttonClicked={handleSubmit}
      buttonName={'Submit'}
      isButtonDisabled={!Boolean(title && image && sortOrder)}
      cancelButtonClicked={handleWindowClose}
      cancelButtonName="Cancel"
    >
      <TextField
        label="Banner Title"
        variant="filled"
        margin="dense"
        fullWidth
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        helperText="Enter title to show if image fails to load"
        required
      />

      <TextField
        variant="filled"
        label="Banner Link URL"
        margin="dense"
        fullWidth
        name="link"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        helperText="Enter URL that banner should link to, if any"
      />

      {image ? (
        <>
          <img src={image} alt="banner preview" className={styles.image_preview} />
          <Button variant="contained" onClick={() => setImage(null)}>
            Remove picture
          </Button>
        </>
      ) : (
        <Dropzone
          onDropAccepted={([file]) => {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.onerror = () =>
              createSnackbar(
                'Image failed to load. Please try a different image or contact CTS for help.',
                'error',
              );

            reader.readAsDataURL(file);
          }}
          onDropRejected={() =>
            createSnackbar('Invalid image file. Only PNG and JPEG images are accepted.', 'error')
          }
          accept="image/jpeg, image/jpg, image/png"
          maxFiles={1}
        >
          {({ getRootProps, getInputProps }) => (
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography>
                {isMobile
                  ? 'Tap Image to Browse Files'
                  : 'Drag & Drop Picture, or Click to Browse Files'}
              </Typography>
            </div>
          )}
        </Dropzone>
      )}

      <TextField
        id="outlined-number"
        variant="filled"
        label="Sort Order"
        type="number"
        margin="dense"
        fullWidth
        name="sortOrder"
        value={sortOrder}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => setSortOrder(event.target.value)}
        required
      />
    </GordonDialogBox>
  );
};

export default NewBannerDialog;
