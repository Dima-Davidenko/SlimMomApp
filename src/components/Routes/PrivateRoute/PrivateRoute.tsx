import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/auth/authSelectors';

interface IProps {
  defaultRoute: string;
}

const PrivateRoute: React.FC<React.PropsWithChildren<IProps>> = ({ children, defaultRoute }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <>{isLoggedIn ? children : <Navigate to={defaultRoute} />}</>;
};

export default PrivateRoute;
