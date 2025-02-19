import Header from 'views/CampusSafety/components/Header';
import ItemForm from 'views/CampusSafety/components/ItemForm';

const MissingItemFormEdit = () => {
  return (
    <>
      <Header />
      <ItemForm formType={'edit'} />
    </>
  );
};

export default MissingItemFormEdit;
