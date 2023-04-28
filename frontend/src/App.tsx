// import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './hooks/useUser';

import MainNav from './components/Navbar/MainNav';
import ProtectedLayout from './components/ProtectedLayout/ProtectedLayout';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import HomePage from './pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MainNav />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route element={< ProtectedLayout />}> */}
            <Route path="/notes" element={<NotesPage />} />
          {/* </Route> */}
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* <div>App</div> */}
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
