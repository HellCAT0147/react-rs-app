import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/Main';
import UncontrolledFormPage from '../../pages/UncontrolledForm';
import ReactHookFormPage from '../../pages/ReactHookForm';
import NotFoundPage from '../../pages/NotFound';

const CustomRoutes: React.FC = (): JSX.Element => (
  <Routes>
    <Route index element={<MainPage />} />
    <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
    <Route path="/hook" element={<ReactHookFormPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default CustomRoutes;
