import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.tsx';
import Sortable from './components/Sortable.tsx';
import Dev from './components/Dev.tsx';
import Page404 from './components/Page404.tsx';

const basename =
  process.env.NODE_ENV === 'production' ? '/sortable-table-review/' : '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/sortable" element={<Sortable />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
