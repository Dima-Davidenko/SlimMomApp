import { Navigate } from 'react-router-dom';

interface IProps {
  defaultRoute: string;
}

const PrivateRoute: React.FC<React.PropsWithChildren<IProps>> = ({ children, defaultRoute }) => {
  const isLoggedIn = false;

  return <>{isLoggedIn ? children : <Navigate to={defaultRoute} />}</>;
};

export default PrivateRoute;
