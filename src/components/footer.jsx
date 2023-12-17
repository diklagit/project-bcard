import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

/*const links = new Map([
  ['/cards-fav', [{ link: '/about', label: 'About' },{ link: '/my-cards', label: 'My Cards' }]],
  ['/sign-up', [{ link: '/about', label: 'About' }]],
  ['/sign-in', [{ link: '/about', label: 'About' }]],
]);
*/
const Footer = () => {
  const { pathname: path } = useLocation();
  const [linkDetails, setLinkDetails] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const hideFavFooter =
      path === '/cards-fav' ||
      path === '/sign-up' ||
      path === '/sign-in' ||
      !user;

    const hideMyCardsFooter =
      path.includes('/my-cards') ||
      path === '/sign-up' ||
      path === '/sign-in' ||
      !(user?.isBusiness || user?.isAdmin);

    const hideAboutFooter = path === '/about';

    const linkDetails = [{ link: '', label: '' }];
    if (!hideAboutFooter) {
      linkDetails.push({
        icon: 'bi bi-exclamation-circle-fill',
        link: '/about',
        label: 'About',
      });
    }

    if (!hideFavFooter) {
      linkDetails.push({
        icon: 'bi bi-heart-fill',
        link: '/cards-fav',
        label: 'Favorites',
      });
    }
    if (!hideMyCardsFooter) {
      linkDetails.push({
        icon: 'bi bi-person-square',
        link: '/my-cards',
        label: 'My Cards',
      });
    }
    setLinkDetails(linkDetails);
  }, [path, user]);

  return (
    <nav>
      <div className='container '>
        <footer className='py-1 my-1 fw-bold'>
          <ul className='nav justify-content-center border-bottom'>
            {linkDetails.map(({ icon, link, label }, index) => (
              <li key={index} className='nav-item  '>
                <a
                  href={link}
                  className='nav-link text-black px-3 my-1 d-flex justify-content-center align-items-center d-flex flex-column'
                >
                  <i className={icon}></i>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className='text-center text-black mt-2'>© Bcard 2023</p>
        </footer>
      </div>
    </nav>
  );
};

export default Footer;
