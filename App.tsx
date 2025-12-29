
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';
import Ad320x50 from './components/Ad320x50';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import MyListPage from './pages/MyListPage';
import ViewAllPage from './pages/ViewAllPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <HeaderBar />
        <main className="flex-grow pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/view/:category" element={<ViewAllPage />} />
            <Route path="/:type/:id" element={<DetailPage />} />
            <Route path="/my-list" element={<MyListPage />} />
          </Routes>
        </main>
        <Ad320x50 />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
