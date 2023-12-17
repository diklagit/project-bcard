import { useAuth } from '../../contexts/auth.context';
import { Navigate } from 'react-router-dom';

export const ProtectedBizRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();

  if (!user || (onlyBiz && !user.isBusiness)) {
    return <Navigate to='/sign-in' />;
  }

  return children;
};

export const ProtectedLoginRoute = ({ children, onlyLogin = false }) => {
  const { user } = useAuth();

  if (!user && onlyLogin) {
    return <Navigate to='/sign-in' />;
  }

  return children;
};

export const ProtectedAdminRoute = ({ children, onlyAdmin = false }) => {
  const { user } = useAuth();

  if (!user || (onlyAdmin && !user.isAdmin)) {
    return <Navigate to='/sign-in' />;
  }

  return children;
};

const ProtectedRoutes = {
  ProtectedBizRoute,
  ProtectedLoginRoute,
  ProtectedAdminRoute,
};

export default ProtectedRoutes;
