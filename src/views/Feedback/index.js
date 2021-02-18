import React from 'react';

import './feedback.css';
import { useNetworkStatus } from '../../contexts/NetworkContext';
import OfflinePanel from '../../components/OfflinePanel';

const Feedback = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return (
      <div class="form">
        <iframe
          title="Feedback Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfB7MtIGiMbVcSOAbl38KWqKYU9NIEE-Sbi66rbpNPAmGBoqA/viewform?embedded=true"
          width="100%"
          height="100%"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading...
        </iframe>
      </div>
    );
  } else {
    return <OfflinePanel componentName="Feedback" />;
  }
};

export default Feedback;
