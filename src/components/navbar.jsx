import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';
import { useSearch } from '../contexts/search.context';
import DarkMode from './modeDark';

const NavBar = () => {
  const { user } = useAuth();
  const { searchTerm, setSearchTerm, clearTerm } = useSearch();

  // useEffect =
  //   (() => {
  //     const get fullUserData= async ()=>{
  //     const {data}= await getFullUser();)

  //   }fullUserData()
  //   },
  //   []);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       if (fullUser?._id) {
  //         const { data } = await getFullUser(fullUser._id);
  //         setUserData(data);
  //       }
  //     } catch (error) {
  //       toast('🦄 error on receiving the user info', {
  //         position: 'top-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light',
  //       });
  //     }
  //     getUserData();
  //   };
  // },[fullUser]);

  return (
    <nav className='navbar navbar-expand-sm navbar-light shadow-sm fw-bold '>
      <div className='container px-2'>
        <NavLink to='/' className='navbar-brand mx-2 fs-3 appName p-2'>
          Bcard<i className='bi bi-person-badge'></i>
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#main-navbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='main-navbar'>
          <ul className='navbar-nav me-auto mb-2 mb-sm-0 '>
            <li className='nav-item'>
              <NavLink to='/about' className='nav-link'>
                About
              </NavLink>
            </li>

            {user && (
              <li className='nav-item'>
                <NavLink to='/cards-fav' className='nav-link'>
                  Favorites
                </NavLink>
              </li>
            )}

            {(user?.isBusiness || user?.isAdmin) && (
              <li className='nav-item'>
                <NavLink to='/my-cards' className='nav-link'>
                  My Cards
                </NavLink>
              </li>
            )}

            {user?.isAdmin && (
              <li className='nav-item'>
                <NavLink to='/sandbox' className='nav-link'>
                  Sandbox
                </NavLink>
              </li>
            )}
          </ul>

          <ul className='navbar-nav ms-auto mb-2 mb-sm-0 mx-2 '>
            <li
              className='nav-item border focus-ring my-2 mx-1 border border-0'
              style={{
                display: 'flex',
                paddingInline: '2px',
              }}
            >
              <input
                type='text'
                placeholder={'Search...'}
                autocomplete='off'
                onkeydown='TopNavBar.googleSearchAttachKeyPressHandler(event)'
                aria-label='Search field'
                onChange={(e) => setSearchTerm(e.target.value)}
                oninput='TopNavBar.searchWithSuggestions(this)'
                onfocus='TopNavBar.searchWithSuggestions(this)'
                onBlur='TopNavBar.searchFieldLostFocus(event)'
                value={searchTerm}
                style={{ outline: 'none', paddingLeft: '20px' }}
                className='border border-0 rounded-start-pill focus-ring-light'
              />
              <button
                className='border border-0 bg-light-subtle rounded-end-pill'
                style={{ paddingRight: '17px' }}
              >
                {!searchTerm ? (
                  <i className='bi bi-search fs-5'></i>
                ) : (
                  <i className='bi bi-x fs-5' onClick={clearTerm}></i>
                )}
              </button>
            </li>

            <li className='nav-item mx-1 my-auto'>
              <DarkMode />
            </li>

            {!user && (
              <>
                <li className='nav-item'>
                  <NavLink to='/sign-up' className='nav-link'>
                    Sign Up
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/sign-in' className='nav-link'>
                    Sign In
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <li className='nav-item'>
                <div className='nav-link dropdown-center '>
                  <i
                    // src={fullUser.image?.url}
                    // alt={fullUser.image?.alt}
                    // className='fs-3 mx-1 my-auto'
                    className='bi bi-person-circle fs-3 text-black mx-1 my-auto personLink '
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  ></i>
                  <ul className='dropdown-menu bg-black linkHover'>
                    <li>
                      <NavLink
                        to='/user-info'
                        className='nav-link text-info dropdown-item '
                      >
                        User info
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/user-info-edit'
                        className='nav-link text-info  dropdown-item'
                      >
                        Edit user info
                      </NavLink>
                    </li>
                    <li className='text-info'>
                      <hr className='dropdown-divider ' />
                    </li>

                    <li className='nav-item'>
                      <NavLink
                        to='/sign-out'
                        className='nav-link text-info ms-3'
                      >
                        Sign out
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
