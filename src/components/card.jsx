import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

const Card = ({
  hideControls,
  onLiked,
  liked = false,
  card: {
    _id,
    title,
    subtitle,
    description,
    address,
    phone,
    image: { url, alt },
    bizNumber,
  },
}) => {
  const { user } = useAuth();

  return (
    <div
      className='card m-3 position-relative'
      style={{ width: '17rem', height: '35rem', cursor:'pointer' }}
    >
      <img src={url} className='card-img-top' alt={alt} />
      <div className='card-body'>
        <h3 className='card-title text-center'>{title}</h3>
        <h5 className='card-title text-center'>{subtitle}</h5>
        <p className='card-text text-center'>{description}</p>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='fw-bold'>Phone: </span> {phone}
          </li>
          <li className='list-group-item'>
            <span className='fw-bold'>Address: </span>
            {`${address.street} ${address.houseNumber} ${address.city}`}
          </li>
          <li className='list-group-item mb-2'>
            <span className='fw-bold'>Business Num: </span> {bizNumber}
          </li>
        </ul>

        {user && (
          <>
            {liked ? (
              <i
                className='bi bi-suit-heart-fill mb-2 position-absolute '
                style={{ bottom: '2vmin', color: 'red', left: '2vmin' }}
                onClick={() => {
                  onLiked();
                }}
              ></i>
            ) : (
              <i
                className='bi bi-suit-heart mb-2 position-absolute '
                style={{ bottom: '2vmin', left: '2vmin' }}
                onClick={onLiked}
              ></i>
            )}
          </>
        )}

        <Link
          to={`/card-details/${_id}`}
          className='card-link ms-3 mb-2 position-absolute'
          style={{ bottom: '2vmin', left: '4vmin' }}
        >
          <i className='bi bi-telephone' style={{ color: 'black' }}></i>
        </Link>

        {(user?.isBusiness || user?.isAdmin) && !hideControls && (
          <>
            <Link
              to={`/my-cards/delete/${_id}`}
              className='card-link mb-2 position-absolute'
              style={{ bottom: '2vmin', right: '6vmin' }}
            >
              <i className='bi bi-trash3' style={{ color: 'black' }}></i>
            </Link>

            <Link
              to={`/my-cards/edit/${_id}`}
              className='card-link mb-2 position-absolute'
              style={{ bottom: '2vmin', right: '2vmin' }}
            >
              <i className='bi bi-pen' style={{ color: 'black' }}></i>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
