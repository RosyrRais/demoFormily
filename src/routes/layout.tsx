import { Outlet } from '@edenx/runtime/router';

const Layout = (): JSX.Element => (
  <div>
    <Outlet />
  </div>
);

export default Layout;
