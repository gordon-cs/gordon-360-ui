import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import 'cropperjs/dist/cropper.css';
import { useWindowSize } from 'hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Dropzone from 'react-dropzone';
import styles from './PhotoCropper.module.css';
import SimpleSnackbar from 'components/Snackbar';

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (dataUrl: string | undefined) => void;
};

const enum UploadStep {
  Upload,
  Crop,
}

const CROP_DIM = 1200; // Minimum dimensions of cropped image in pixels

const PhotoCropper = ({ open, onClose, onSubmit }: PropTypes) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: AlertColor | null;
    open: boolean;
  }>({ message: '', severity: null, open: false });
  const [cropperData, setCropperData] = useState<{
    cropBoxDim: number | undefined;
    aspectRatio: number;
  }>({ cropBoxDim: undefined, aspectRatio: 1 });
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const [width, height] = useWindowSize();

  const createSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const step = preview ? UploadStep.Crop : UploadStep.Upload;

  const handleClosePreview = () => {
    onClose();
    setPreview(null);
  };

  const handleSubmit = () => {
    const croppedImage = cropperRef.current?.cropper
      .getCroppedCanvas({ width: CROP_DIM })
      .toDataURL();

    onSubmit(croppedImage);
  };

  const maxCropPreviewWidth = () => {
    const breakpointWidth = 960;
    const smallScreenRatio = 0.75;
    const largeScreenRatio = 0.525;
    const maxHeightRatio = 0.5;

    const aspect = cropperData.aspectRatio;

    var maxWidth = width * (width < breakpointWidth ? smallScreenRatio : largeScreenRatio);
    var correspondingHeight = maxWidth / aspect;
    var maxHeight = height * maxHeightRatio;
    var correspondingWidth = maxHeight * aspect;
    if (correspondingHeight > maxHeight) {
      return correspondingWidth;
    } else {
      return maxWidth;
    }
  };

  const onDropAccepted = (files: File[]) => {
    const previewImageFile = files.at(0);
    if (previewImageFile) {
      const fileURL = URL.createObjectURL(previewImageFile);

      const newImage = new Image();
      newImage.onload = () => {
        if (newImage.width < CROP_DIM || newImage.height < CROP_DIM) {
          createSnackbar(
            'Image is too small. Image dimensions must be at least 1200 x 1200 pixels.',
            'info',
          );
        } else {
          const maxWidth = maxCropPreviewWidth();
          const displayWidth = Math.min(newImage.width, maxWidth);
          const cropDim = (CROP_DIM * displayWidth) / newImage.width;
          setCropperData({
            aspectRatio: newImage.width / newImage.height,
            cropBoxDim: cropDim,
          });
          setPreview(fileURL);
        }
      };
      newImage.src = fileURL;
    }
  };

  const onDropRejected = () => {
    createSnackbar('This image is invalid. Only PNG and JPEG images are allowed.', 'info');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (cropperRef.current?.cropper) {
        const data = cropperRef.current.cropper.getCropBoxData();

        switch (e.code) {
          case 'ArrowUp':
            data.top -= 5;
            break;
          case 'ArrowDown':
            data.top += 5;
            break;
          case 'ArrowRight':
            data.left += 5;
            break;
          case 'ArrowLeft':
            data.left -= 5;
            break;
          case 'Equal':
            data.height += 5;
            data.width += 5;
            break;
          case 'Minus':
            data.height -= 5;
            data.width -= 5;
            break;
        }

        cropperRef.current.cropper.setCropBoxData(data);
      }
    };
    // Keyboard support for cropping
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="simple-dialog-title">Choose a Photo to Upload</DialogTitle>
        <DialogContent className={styles.dialog_content}>
          <DialogContentText>
            {step === UploadStep.Upload ? (
              'Drag & Drop a picture, or Click to Browse Files'
            ) : (
              <>
                Use the arrow keys to move the crop box.
                <br />
                Use <code>+</code> or <code>-</code> to resize the image.
              </>
            )}
          </DialogContentText>
          {!preview ? (
            <Dropzone
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
              accept={{
                'image/*': ['.jpeg', ',jpg', '.png'],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section className={styles.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                </section>
              )}
            </Dropzone>
          ) : (
            <>
              <Cropper
                ref={cropperRef}
                src={preview}
                style={{
                  maxWidth: maxCropPreviewWidth(),
                  maxHeight: maxCropPreviewWidth() / cropperData.aspectRatio,
                }}
                autoCropArea={1}
                viewMode={3}
                aspectRatio={1}
                highlight={false}
                background={false}
                zoomable={false}
                dragMode={'none'}
                minCropBoxWidth={cropperData.cropBoxDim}
                minCropBoxHeight={cropperData.cropBoxDim}
              />
              <Button variant="contained" onClick={() => setPreview(null)}>
                Choose Another Image
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="neutral" onClick={handleClosePreview}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!preview}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default PhotoCropper;
