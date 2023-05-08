import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import 'cropperjs/dist/cropper.css';
import { useWindowSize } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Dropzone from 'react-dropzone';
import styles from './IDUploader.module.css';

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (dataUrl: string | undefined) => void;
};

const enum UploadStep {
  Upload,
  Crop,
}

const CROP_DIM = 1200; // pixels

const PhotoCropper = ({ open, onClose, onSubmit }: PropTypes) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [cropperData, setCropperData] = useState<{
    cropBoxDim: number | undefined;
    aspectRatio: number;
  }>({ cropBoxDim: undefined, aspectRatio: 1 });
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const [width, height] = useWindowSize();

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

    /* this logic was probably great but I did not have time to learn it and fix it.
       The fix it needs is replacing use of innerWidth with this.props.width (converted
       from a string like 'xs' to a numerical size like 360
       If you have time, please: make this function better */

    const aspect = cropperData.aspectRatio;
    console.log('Cropper data aspect ratio is', aspect);

    var maxWidth = width * (width < breakpointWidth ? smallScreenRatio : largeScreenRatio);
    var correspondingHeight = maxWidth / aspect;
    var maxHeight = height * maxHeightRatio;
    var correspondingWidth = maxHeight * aspect;
    console.log(
      'Corresponding Width',
      correspondingWidth,
      'corresponding height',
      correspondingHeight,
    );
    console.log('max width', maxWidth, 'with max height', maxHeight);

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
          alert(
            'Sorry, your image is too small! Image dimensions must be at least 1200 x 1200 pixels.',
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
    alert('Sorry, invalid image file! Only PNG and JPEG images are accepted.');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (cropperRef.current?.cropper) {
        const data = cropperRef.current.cropper.getCropBoxData();

        if (e.code === 'ArrowUp') {
          data.top -= 5;
        } else if (e.code === 'ArrowDown') {
          data.top += 5;
        } else if (e.code === 'ArrowRight') {
          data.left += 5;
        } else if (e.code === 'ArrowLeft') {
          data.left -= 5;
        } else if (e.code === 'Equal') {
          data.height += 5;
          data.width += 5;
        } else if (e.code === 'Minus') {
          data.height -= 5;
          data.width -= 5;
        }

        cropperRef.current.cropper.setCropBoxData(data);
      }
    };
    // Keyboard support for cropping
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Dialog
      open={open}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={styles.gc360_id_dialog_title} id="simple-dialog-title">
        Choose Photo to Upload
      </DialogTitle>
      <DialogContent className={styles.gc360_id_dialog_content}>
        <DialogContentText className={styles.gc360_id_dialog_content_text}>
          {step === UploadStep.Upload ? (
            'Drag & Drop a picutre, or Click to Browse Files'
          ) : (
            <>
              Use the arrow keys to move the crop box.
              <br />
              Use <code>+</code> or <code>-</code> to resize.
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
              <section className={styles.gc360_id_dialog_content_dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
              </section>
            )}
          </Dropzone>
        ) : (
          <>
            <div className={styles.gc360_id_dialog_content_cropper}>
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
            </div>
            <Button
              variant="contained"
              onClick={() => setPreview(null)}
              className={styles.gc360_id_dialog_content_button}
            >
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
  );
};

export default PhotoCropper;
