import './App.css';
import NavBar from './components/navbar';
import Footer from './components/footer';
import About from './components/about';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import { Routes, Route } from 'react-router-dom';
import SignOut from './components/signout';
import AllCards from './components/allCards';
import MyCards from './components/myCards';
import {
  ProtectedLoginRoute,
  ProtectedBizRoute,
  ProtectedAdminRoute,
} from './components/common/protectedRoutes';
import CardsCreate from './components/cardsCreate';
import CardDelete from './components/cardDelete';
import CardsEdit from './components/cardsEdit';
import CardDetails from './components/cardDetails';
import CardsFav from './components/cardsFav';
import { SearchProvider } from './contexts/search.context';
import UserInfo from './components/userInfo';
import UserInfoEdit from './components/userInfoEdit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sandbox from './components/sandbox';
import { useTheme } from './contexts/mode.context';

//
function App() {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={
        'App d-flex flex-column min-vh-100' +
        ' ' +
        (isDarkMode() ? 'dark' : 'light')
      }
    >
      <SearchProvider>
        <header>
          <NavBar />
        </header>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          progress={undefined}
          theme={isDarkMode() ? 'dark' : 'light'}
        />
        <main className={'container flex-fill mt-3 '}>
          <Routes>
            <Route path='/' element={<AllCards />} />
            <Route path='/about' element={<About />} />

            <Route
              path='/my-cards'
              element={
                <ProtectedBizRoute onlyBiz>
                  <MyCards />
                </ProtectedBizRoute>
              }
            />
            <Route
              path='/create-card'
              element={
                <ProtectedBizRoute onlyBiz>
                  <CardsCreate />
                </ProtectedBizRoute>
              }
            />
            <Route
              path='/my-cards/delete/:id'
              element={
                <ProtectedBizRoute onlyBiz>
                  <CardDelete />
                </ProtectedBizRoute>
              }
            />
            <Route
              path='/my-cards/edit/:id'
              element={
                <ProtectedBizRoute onlyBiz>
                  <CardsEdit />
                </ProtectedBizRoute>
              }
            />

            <Route
              path='/cards-fav'
              element={
                <ProtectedLoginRoute onlyLogin>
                  <CardsFav />
                </ProtectedLoginRoute>
              }
            />

            <Route
              path='/user-info'
              element={
                <ProtectedLoginRoute onlyLogin>
                  <UserInfo />
                </ProtectedLoginRoute>
              }
            />

            <Route
              path='/user-info-edit'
              element={
                <ProtectedLoginRoute onlyLogin>
                  <UserInfoEdit />
                </ProtectedLoginRoute>
              }
            />

            <Route path='/card-details/:id' element={<CardDetails />} />

            <Route
              path='/sandbox'
              element={
                <ProtectedAdminRoute onlyAdmin>
                  <Sandbox />
                </ProtectedAdminRoute>
              }
            />

            <Route path='/sign-in' element={<SignIn redirect='/' />} />
            <Route path='/sign-up' element={<SignUp redirect='/sign-in' />} />
            <Route path='/sign-out' element={<SignOut />} redirect='/' />
          </Routes>
        </main>
      </SearchProvider>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
