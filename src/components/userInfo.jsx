import { useEffect, useState } from 'react';
import PageHeader from './common/pageHeader';
import { useAuth } from '../contexts/auth.context';
import { getUserById } from '../services/usersServices';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(undefined);
  const { user } = useAuth();

  useEffect(() => {
    const getUserDetails = async () => {
      const { data } = await getUserById(user._id);
      setUserInfo(data);
    };
    getUserDetails();
  }, [user._id]);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <PageHeader
        title='User Info'
        description={
          'more about: ' + `${userInfo.name.first} ${userInfo.name.last}`
        }
      />
      <div className='d-flex justify-content-center'>
        <table className='table table-primary' style={{ width: 'max-content' }}>
          <tbody>
            <tr className='table-primary'>
              <th className='table-primary'>Name:</th>
              <td className='table-primary'>{`${userInfo.name.first} ${userInfo.name.middle} ${userInfo.name.last}`}</td>
            </tr>

            <tr className='table-primary'>
              <th className='table-primary'>Phone:</th>
              <td className='table-primary'>{userInfo.phone}</td>
            </tr>

            <tr className='table-primary'>
              <th className='table-primary'>Image:</th>
              <td className='table-primary'>
                <img
                  src={userInfo.image.url}
                  className='img-thumbnail p-1'
                  style={{ width: '160px' }}
                  alt={userInfo.image.alt}
                />
              </td>
            </tr>

            <tr className='table-primary'>
              <th className='table-primary'>Address:</th>
              <td className='table-primary'>{`${userInfo.address.street} ${userInfo.address.houseNumber} ${userInfo.address.city} ${userInfo.address.zip} ${userInfo.address.country} ${userInfo.address.state}`}</td>
            </tr>

            <tr className='table-primary'>
              <th className='table-primary'>Is Business:</th>
              <td className='table-primary'>
                <i
                  className={userInfo.isBusiness ? 'bi bi-check' : 'bi bi-x'}
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;
