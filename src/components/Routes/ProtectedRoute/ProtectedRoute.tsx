import { Navigate } from 'react-router-dom';

interface IProps {
  defaultRoute: string;
}

const ProtectedRoute: React.FC<React.PropsWithChildren<IProps>> = ({ children, defaultRoute }) => {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <Navigate to={defaultRoute} /> : children}</>;
};

export default ProtectedRoute;
