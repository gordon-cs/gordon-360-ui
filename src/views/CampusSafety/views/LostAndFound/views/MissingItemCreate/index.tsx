import Header from 'views/CampusSafety/components/Header';
import ItemForm from 'views/CampusSafety/components/ItemForm';

const MissingItemFormCreate = () => {
  return (
    <>
      <Header />
      <ItemForm formType={'create'} />
    </>
  );
};

export default MissingItemFormCreate;
