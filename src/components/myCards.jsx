import PageHeader from './common/pageHeader';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';
import { useSearch } from '../contexts/search.context';

import Card from './card';
import { favCards } from '../services/cardsService';

import { useMyCards } from '../hooks/useMyCards';
import { toast } from 'react-toastify';

const MyCards = () => {
  let { cards, refetchCards } = useMyCards();
  const { user } = useAuth();
  const { searchTerm } = useSearch();

  if (searchTerm !== '') {
    cards = cards.filter(
      (card) =>
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
        title='My Cards'
        description='your cards are in the list below. you can create new cards and edit them.'
      />

      <div className='row'>
        <Link className='someLink fs-5 fw-bold ms-3' to='/create-card'>
          Create a New Card
        </Link>
      </div>

      <div
        className='row overflow-y-scroll mh-100 mt-4'
        style={{ height: '800px' }}
      >
        <div className='d-flex justify-content-flex-start flex-wrap '>
          {!cards ? (
            <p>no cards...</p>
          ) : (
            cards.map((card) => (
              <Card
                onLiked={async () => {
                  try {
                    await favCards(card._id);
                    await refetchCards();
                  } catch (e) {
                    toast('🦄 please try again later', {});
                    console.log(e);
                  }
                }}
                liked={card.likes.includes(user._id)}
                card={card}
                key={card._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyCards;
