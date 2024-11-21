import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';
import Mst_State from './pages/System/Mst_State';
import Mst_Company from './pages/System/Mst_Company';

import MasterPage from './layout/MasterPage';
import Mst_Location from './pages/System/Mst_Location';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <MasterPage>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="POS | Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/system/state"
          element={
            <>
              <PageTitle title="POS | State" />
              <Mst_State />
            </>
          }
        />
        <Route
          path="/system/company"
          element={
            <>
              <PageTitle title="POS | Company" />
              <Mst_Company />
            </>
          }
        />
        <Route
          path="/system/location"
          element={
            <>
              <PageTitle title="POS | Location" />
              <Mst_Location />
            </>
          }
        />
      </Routes>
    </MasterPage>
  );
}

export default App;
