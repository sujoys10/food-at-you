import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PublicRoute } from './Router/PublicRoute';
import { ProtectedRoute } from './Router/ProtectedRoute';
import { LayoutSpinner } from './components/Spinner';

//general pages
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));

//user pages
const Home = lazy(() => import('./pages/user/Home'));
const Item = lazy(() => import('./pages/user/Item'));
const Cart = lazy(() => import('./pages/user/Cart'));
const Order = lazy(() => import('./pages/user/Order'));
const Profile = lazy(() => import('./pages/user/Profile'));

//vendor pages
const Menu = lazy(() => import('./pages/vendor/Menu'));
const EditItem = lazy(() => import('./pages/vendor/EditItem'));
const Dashboard = lazy(() => import('./pages/vendor/Dashboard'));
const VendorProfile = lazy(() => import('./pages/vendor/VendorProfile'));
const AddItem = lazy(() => import('./pages/vendor/AddItem'));


function App() {
  return (
    <div className="App">
        <Suspense fallback={<LayoutSpinner />}>
          <Switch>
              <PublicRoute exact path="/" component={Auth} />
              <ProtectedRoute path="/home" role={"USER"} component={Home} />
              <ProtectedRoute path="/profile" role={"USER"} component={Profile} />
              <ProtectedRoute path="/item/:id" role={"USER"} component={Item} />
              <ProtectedRoute path="/cart" role={"USER"} component={Cart} />
              <ProtectedRoute path="/place-order" role={"USER"} component={Order} />
              <ProtectedRoute path="/dashboard" role={"VENDOR"} component={Dashboard} />
              <ProtectedRoute path="/vendor-profile" role={"VENDOR"} component={VendorProfile} />
              <ProtectedRoute path="/menu" role={"VENDOR"} component={Menu} />
              <ProtectedRoute path="/addItem" role={"VENDOR"} component={AddItem} />
              <ProtectedRoute path="/editItem/:id" role={"VENDOR"} component={EditItem} />
              <Route component={NotFound}/>
          </Switch>
        </Suspense>
    </div>
  );
}

export default App;
