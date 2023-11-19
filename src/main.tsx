import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DetailedItem from './components/details/DetailedItem';
import NotFound from './components/not-found/NotFound';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/page/:page/" element={<App />}>
          <Route path="details/:id" element={<DetailedItem />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
