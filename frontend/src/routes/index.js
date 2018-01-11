// We only need to import the modules necessary for initial render
import DefaultLayout from '../layouts/DefaultLayout';
import Home from './Home';
import { injectReducer } from '../store/reducers';
import ROUTES from './routes';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
    path: '/',
    component: DefaultLayout,
    indexRoute: Home,
    childRoutes: ROUTES
});

export default createRoutes
