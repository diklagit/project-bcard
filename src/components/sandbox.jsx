import PageHeader from './common/pageHeader';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth.context';
import { useSearch } from '../contexts/search.context';
import {
  getAllUsers,
  updateBusiness,
  deleteUser,
} from '../services/usersServices';

const Sandbox = () => {
  let [usersInfo, setUsersInfo] = useState(undefined);
  const [chosenUser, setChosenUser] = useState([]);
  const { user } = useAuth();

  const { searchTerm } = useSearch();
  if (searchTerm !== '') {
    usersInfo = usersInfo.filter(
      (userInfo) => userInfo.name.first?.includes(searchTerm)
      //     userInfo.name.middle?.includes(searchTerm) ||
      //     userInfo.name.last?.includes(searchTerm)
    );
  }

  useEffect(() => {
    const getUsersDetails = async () => {
      const { data } = await getAllUsers(user._id);
      data.sort((a, b) => {
        const nameA = `${a.name.first} ${a.name.middle} ${a.name.last}`;
        const nameB = `${b.name.first} ${b.name.middle} ${b.name.last}`;

        // handle null or undefined
        if (!nameA && !nameB) {
          return 0;
        }
        if (!nameA) {
          return -1;
        }
        if (!nameB) {
          return 1;
        }

        const isHebrew = (s) => s[0] >= 'א' && s[0] <= 'ת';

        if (isHebrew(nameA) === isHebrew(nameB)) {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        }

        if (isHebrew(nameA)) {
          return -1;
        } /* isHebrew(nameB) */ else {
          return 1;
        }
      });
      //   const sortedUsers = await data.sort((a, b) => (a > b ? 0 : 1));
      console.log(data);
      setUsersInfo(data);
    };
    getUsersDetails();
  }, [user._id]);

  if (!usersInfo) {
    return null;
  }

  const toggleBusiness = (_id) => {
    updateBusiness(_id);
    const newUsersInfo = usersInfo.map((userInfo) => {
      if (_id !== userInfo._id) {
        return userInfo;
      }
      return {
        ...userInfo,
        isBusiness: !userInfo.isBusiness,
      };
    });
    setUsersInfo(newUsersInfo);
  };

  const deleteUserInfo = () => {
    try {
      if (chosenUser.includes(user._id)) {
        return;
      } else {
        chosenUser.forEach((_id) => {
          deleteUser(_id);
        });
        const newUsersInfo = usersInfo.filter(
          (userInfo) => !chosenUser.includes(userInfo._id)
        );
        setUsersInfo(newUsersInfo);
        setChosenUser([]);
      }
    } catch (err) {
      toast('🤯 please try again later', {});
      console.log(err);
    }
  };

  return (
    <>
      <PageHeader
        title='Sandbox'
        description='here you can edit the user`s list on your app, changing their status (from business user to private user or the opposite) and delete users'
      />

      <div
        className='row overflow-y-scroll mh-100 mt-4 d-flex justify-content-around'
        style={{ height: '800px' }}
      >
        <table
          className='table table-primary table-hover'
          style={{ width: '80%' }}
        >
          <thead className='sticky-top'>
            <tr>
              <th>
                <button onClick={deleteUserInfo} className='btn btn-danger '>
                  delete users
                </button>
              </th>
              <th>Name</th>
              <th>Is business</th>
            </tr>
          </thead>
          <tbody>
            {usersInfo.map((userInfo) => {
              const { first, middle, last } = userInfo.name;
              return (
                <tr
                  key={first + middle + last + Math.random()}
                  className='table-primary'
                >
                  <td>
                    <input
                      type='checkbox'
                      className='ms-5'
                      style={{ transform: 'scale(1.5)' }}
                      checked={chosenUser.includes(userInfo._id)}
                      onChange={() => {
                        let newChoseUser;
                        if (chosenUser.includes(userInfo._id)) {
                          newChoseUser = chosenUser.filter(
                            (x) => x !== userInfo._id
                          );
                        } else {
                          newChoseUser = [...chosenUser, userInfo._id];
                        }
                        setChosenUser(newChoseUser);
                      }}
                    />
                  </td>
                  <td className='ms-5'>{`${first} ${middle} ${last}`}</td>
                  <td>
                    <button
                      className={
                        userInfo.isBusiness ? 'bg-success' : 'bg-danger'
                      }
                      onClick={() => toggleBusiness(userInfo._id)}
                    >
                      <i
                        className={
                          userInfo.isBusiness ? 'bi bi-check' : 'bi bi-x'
                        }
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Sandbox;
