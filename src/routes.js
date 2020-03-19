import Home from './components/Home';
import About from './components/About';
import Galleries from './components/Galleries';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
// import NotFound from './components/NotFound';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
  { path: '/galleries', name: 'Galleries', Component: Galleries },
  { path: '/galleries/:name', name: 'Gallery', Component: Gallery },
  { path: '/contact', name: 'Contact', Component: Contact },
  // { path: undefined, name: 'Not Found', Component: NotFound },
];

export default routes;
