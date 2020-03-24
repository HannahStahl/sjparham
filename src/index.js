import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter, Route, Switch,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';
import routes from './routes';

const Routes = ({ galleries, showFooter }) => (
  <Switch>
    <div className="page-container">
      {routes.map(({ path, name, Component }) => (
        <Route key={path} exact path={path}>
          {(props) => {
            let prevPathname;
            const { location } = props;
            if (location && location.state) {
              ({ prevPathname } = location.state);
            }
            let className = 'page ';
            let timeout = 300;
            if (name === 'Home') {
              className += 'home-page';
              timeout = 1300;
            } else {
              className += 'not-home-page';
              if (prevPathname === '/') {
                className += ' from-home-page';
                timeout = 1300;
              }
            }
            return (
              <CSSTransition
                in={props.match !== null}
                timeout={timeout}
                classNames="page"
                unmountOnExit
              >
                <div className={className}>
                  <NavBar />
                  <div className="page-content">
                    <Component {...props} galleries={galleries} />
                    <div className="footer-push" />
                  </div>
                  {window.location.pathname !== '/' && showFooter && <Footer />}
                </div>
              </CSSTransition>
            );
          }}
        </Route>
      ))}
    </div>
  </Switch>
);

const App = withRouter(() => {
  const [showFooter, setShowFooter] = useState(false);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    setShowFooter(false);
    if (window.location.pathname.includes('galleries')) {
      setTimeout(() => setShowFooter(true), 1000);
    } else {
      setShowFooter(true);
    }
    fetch(`${config.apiURL}/publishedCategories/${config.userID}`).then((res) => res.json()).then((categories) => {
      setGalleries(categories);
    });
  }, []);

  return (
    <>
      <div>
        <Routes galleries={galleries} showFooter={showFooter} />
      </div>
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
