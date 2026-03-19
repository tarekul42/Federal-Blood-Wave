import { Navigate, Outlet } from 'react-router';

interface PrivateRouteProps {
  loginAuth: boolean;
}

const PrivateRoute = ({ loginAuth }: PrivateRouteProps) => {
  return loginAuth ? <Outlet /> : <Navigate to='/auth' replace={true} />;
};

export default PrivateRoute;