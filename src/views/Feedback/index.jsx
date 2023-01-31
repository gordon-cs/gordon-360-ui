import GordonOffline from 'components/GordonOffline';
import useNetworkStatus from 'hooks/useNetworkStatus';
import styles from './Feedback.module.css';

const Feedback = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return (
      <div className={styles.feedback_form}>
        <iframe
          title="Feedback Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfB7MtIGiMbVcSOAbl38KWqKYU9NIEE-Sbi66rbpNPAmGBoqA/viewform?embedded=true"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading...
        </iframe>
      </div>
    );
  } else {
    return <GordonOffline feature="Submitting feedback" />;
  }
};

export default Feedback;
