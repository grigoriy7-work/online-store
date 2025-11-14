import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

export const ProtectedRoute: FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};
