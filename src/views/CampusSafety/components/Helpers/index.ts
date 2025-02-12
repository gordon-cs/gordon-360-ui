import { format } from 'date-fns';

// For date formatting
const dateFormat = 'MM/dd/yy';

function formatDateString(date: string) {
  return format(Date.parse(date), dateFormat);
}

export { formatDateString };
