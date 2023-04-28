// import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './hooks/useUser';
// import { ProtectedLayout } from './components/_Layout/ProtectedLayout';

import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route element={< ProtectedLayout />}> */}
            <Route path="/" element={<NotesPage />} />
          {/* </Route> */}
        </Routes>
        <div>App</div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
