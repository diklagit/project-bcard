import PageHeader from './common/pageHeader';
import { Link } from 'react-router-dom';
import Card from './card';
import { toast } from 'react-toastify';
import { useAllCards } from '../hooks/useAllCards';
import { useAuth } from '../contexts/auth.context';
import { useSearch } from '../contexts/search.context';
import { favCards } from '../services/cardsService';

const AllCards = () => {
  let { cards, refetchCards } = useAllCards();
  const { user } = useAuth();
  const { searchTerm } = useSearch();
  if (searchTerm !== '') {
    cards = cards.filter(
      (card) =>
        // Object.values(card).some(
        //   (val) =>
        //     (typeof val === 'string' && val.includes(searchTerm)) ||
        //     (Number.isFinite(val) && val.toString().includes(searchTerm))
        // )
        card.title?.includes(searchTerm) ||
        card.subtitle?.includes(searchTerm) ||
        card.description?.includes(searchTerm) ||
        card.address.city?.includes(searchTerm) ||
        card.address.street?.includes(searchTerm) ||
        (Number.isFinite(card.address.houseNumber) &&
          card.address.houseNumber.toString().includes(searchTerm)) ||
        (Number(card.phone) && card.phone.toString().includes(searchTerm))
    );
  }

  return (
    <>
      <PageHeader
        title={
          <>
            Bcard<i className='bi bi-person-badge'></i> Cards Page
          </>
        }
        description='welcome to Bcard! here you can see business cards, sign up and select your favorite cards, and if you have business of your own you can even create cards, share them on this board and get more exposure for your business. good luck:)'
      />

      {user?.isAdmin && (
        <div className='row'>
          <Link
            to={`/sandbox`}
            className='icon-link icon-link-hover someLink fs-6 fw-bold ms-3'
            style={{
              'icon-link-transform': 'translate3d(0, -.125rem, 0)',
            }}
          >
            <i className='bi bi-folder-symlink' aria-hidden='true'></i>
            Sandbox
          </Link>
        </div>
      )}

      {user && (
        <div className='row mt-2'>
          <Link className='someLink fs-6 fw-bold ms-3' to={`/cards-fav`}>
            go to favorite cards page
          </Link>
        </div>
      )}

      <div
        className='row overflow-y-scroll mh-100 mt-4'
        style={{ height: '800px' }}
      >
        <div className='d-flex justify-content-flex-start flex-wrap'>
          {!cards ? (
            <p>no cards...</p>
          ) : (
            user &&
            cards.map((card) => (
              <Card
                onLiked={async () => {
                  //send request to unlike
                  //ask for all cards again
                  try {
                    await favCards(card._id);
                    await refetchCards();
                  } catch (e) {
                    toast('🤯 please try again later', {});
                    console.log(e);
                  }
                }}
                liked={card.likes.includes(user._id)}
                card={card}
                key={card._id}
                hideControls
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllCards;
