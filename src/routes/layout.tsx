import { Outlet } from '@edenx/runtime/router';
import './index.css';

const Layout = (): JSX.Element => (
  <div>
    <Outlet />
  </div>
);

export default Layout;
