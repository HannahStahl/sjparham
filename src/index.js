import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter, Route, Switch,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import About from './components/About';
import Galleries from './components/Galleries';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';

const routes = [
  { path: '/', Component: Home },
  { path: '/about', Component: About },
  { path: '/galleries', Component: Galleries },
  { path: '/galleries/:name', Component: Gallery },
  { path: '/contact', Component: Contact },
  // { path: undefined, Component: NotFound },
];

const Routes = ({ galleries }) => (
  <Switch>
    <Container className="container">
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match !== null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <Component galleries={galleries} />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </Container>
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
  }, [window.location.pathname]);

  return (
    <>
      <NavBar />
      <div className="page-content">
        <Routes galleries={galleries} />
      </div>
      {window.location.pathname !== '/' && showFooter && <Footer />}
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
