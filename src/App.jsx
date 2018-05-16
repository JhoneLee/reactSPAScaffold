import React,{h,Component} from 'react';
import { Redirect,HashRouter as Router} from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
let App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route}/>
                    ))}
                    {(window.location.pathname.includes('index.html') || window.location.hash == '') && <Redirect to="/home" />}
                </div>
            </Router>
        </Provider>
    );
};

export default App;