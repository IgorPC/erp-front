import PageLayout from '../../../components/pageLayout/PageLayout';
import Create from './Content/Create';

const CreatePage = (props: any) => {
  return (
    <PageLayout title='Create Product'>
      <Create/>
    </PageLayout>
  );
}

export default CreatePage