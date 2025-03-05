import Header from 'views/LostAndFound/components/Header';
import ReportForm from 'views/LostAndFound/components/ReportForm';

const MissingItemFormCreate = () => {
  return (
    <>
      <Header />
      <ReportForm formType={'create'} />
    </>
  );
};

export default MissingItemFormCreate;
