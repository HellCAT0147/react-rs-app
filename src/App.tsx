import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import UncontrolledFormPage from './pages/UncontrolledForm';
import ReactHookFormPage from './pages/ReactHookForm';
import NotFoundPage from './pages/NotFound';
import Header from './components/header/Header';

const App: React.FC = (): JSX.Element => (
  <>
    <Header />
    <Routes>
      <Route index element={<Main />} />
      <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
      <Route path="/hook" element={<ReactHookFormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
