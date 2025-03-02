import Header from 'views/LostAndFound/components/Header';
import ItemForm from 'views/LostAndFound/components/ItemForm';

const MissingItemFormEdit = () => {
  return (
    <>
      <Header />
      <ItemForm formType={'edit'} />
    </>
  );
};

export default MissingItemFormEdit;
