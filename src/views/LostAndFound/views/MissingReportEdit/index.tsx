import Header from 'views/LostAndFound/components/Header';
import ReportForm from 'views/LostAndFound/components/ReportForm';

const MissingItemFormEdit = () => {
  return (
    <>
      <Header />
      <ReportForm formType={'edit'} />
    </>
  );
};

export default MissingItemFormEdit;
