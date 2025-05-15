import Header from 'views/LostAndFound/components/Header';
import ItemForm from 'views/LostAndFound/components/ItemForm';

const MissingItemFormCreate = () => {
  return (
    <>
      <Header />
      <ItemForm formType={'create'} />
    </>
  );
};

export default MissingItemFormCreate;
