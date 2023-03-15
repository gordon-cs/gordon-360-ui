import { isValid, format } from 'date-fns';

const standardDate = (date, includeTime) => {
  if (!isValid(date)) date = new Date(Date.parse(date)); // try parsing if invalid
  if (!isValid(date)) {
    // if still invalid (perhaps null)
    console.log('standardDate called with an invalid or null date');
    return;
  }
  let formattedDate = includeTime ? format(date, 'MMM d h:mmaaa') : format(date, 'MMM d');
  return formattedDate;
};

const formatDateTimeRange = (startDateTime, endDateTime) => {
  if (!isValid(startDateTime)) startDateTime = new Date(Date.parse(startDateTime));
  if (!isValid(endDateTime)) endDateTime = new Date(Date.parse(endDateTime));

  // Jan 1 3:00pm - 6:00pm
  let isOneDay = format(startDateTime, 'MM dd yyyy') === format(endDateTime, 'MM dd yyyy');
  if (isOneDay) {
    let endTime = format(endDateTime, 'h:mmaaa').replace(':00', '');
    return `${standardDate(startDateTime, true).replace(':00', '')} - ${endTime}`;
  }
  // Jan 1 3:00pm - Jan 31 3:00pm
  let isOneYear = startDateTime.getFullYear() === endDateTime.getFullYear();
  if (isOneYear) {
    return `${standardDate(startDateTime)} - ${standardDate(endDateTime)}`;
  }
  // Jan 1 2023 3:00pm - Jan 1 2024 3:00pm
  return `${format(startDateTime, 'MMM d yyyy')} - ${format(endDateTime, 'MMM d yyyy')}`;
};

/**********************************************************
/*Following functions are solely related to photo submission*
/**********************************************************/

let photoDialogErrorTimeout = null;
let photoDialogError = null;
let aspectRatio = null;

async function clearPhotoDialogErrorTimeout() {
  clearTimeout(photoDialogErrorTimeout);
  photoDialogErrorTimeout = null;
  photoDialogError = null;
}

function createPhotoDialogBoxMessage(cropperImageData, isMobile) {
  let message = '';
  // If an error occured and there's no currently running timeout, the error is displayed
  // and a timeout for that error message is created
  if (photoDialogError !== null) {
    message = "<span style={{ color: '#B63228' }}>{photoDialogError}</span>";
    if (photoDialogErrorTimeout === null) {
      // Shows the error message for 6 seconds and then returns back to normal text
      photoDialogErrorTimeout = setTimeout(() => {
        photoDialogErrorTimeout = null;
        photoDialogError = null;
      }, 6000);
    }
  }

  // If no error occured and the cropper is shown, the cropper text is displayed
  else if (cropperImageData) {
    message = 'Drag & Drop Picture, or Click to Browse Files';
  }

  // If no error occured and the cropper is not shown, the pick a file text is displayed
  else {
    message = isMobile
      ? 'Tap Image to Browse Files'
      : 'Drag & Drop Picture, or Click to Browse Files';
  }
  return message;
}

/**
 * Handles the acceptance of the user dropping an image in the Photo Uploader in submission
 *
 * @param {*} fileList The image dropped in the Dropzone of the Photo Uploader
 */
// function onDropAccepted(fileList) {
//     let previewImageFile = fileList[0];
//     let reader = new FileReader();
//     reader.onload = () => {
//       imageOnLoadHelper(reader), aspectRatio
//     };

//     reader.readAsDataURL(previewImageFile);
// }

/**
 * Handles the rejection of the user dropping an invalid file in the Photo Updater Dialog Box
 * Copied from Identification
 */
async function onDropRejected() {
  await clearPhotoDialogErrorTimeout();
  photoDialogError = 'Sorry, invalid image file! Only PNG and JPEG images are accepted.';
  return photoDialogError;
}

function imageOnLoadHelper(reader) {
  let dataURL = reader.result.toString();
  let i = new Image();
  i.onload = async () => {
    let aRatio = i.width / i.height;
    aspectRatio = aRatio;
    photoDialogError = null;
  };
  i.src = dataURL;
}

export {
  standardDate,
  formatDateTimeRange,
  createPhotoDialogBoxMessage,
  imageOnLoadHelper,
  onDropRejected,
};
