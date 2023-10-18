import PageLayout from '../../components/pageLayout/PageLayout';
import Dashboard from './Content/Dashboard';

const DashboardPage = (props: any) => {
  return (
    <PageLayout title='Dashboard'>
      <Dashboard/>
    </PageLayout>
  );
}

export default DashboardPage