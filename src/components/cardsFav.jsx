import PageHeader from './common/pageHeader';
import { useAuth } from '../contexts/auth.context';
import { useSearch } from '../contexts/search.context';

import Card from './card';

import { useAllCards } from '../hooks/useAllCards';
import { favCards } from '../services/cardsService';
import { toast } from 'react-toastify';

const CardsFav = () => {
  let { cards, refetchCards } = useAllCards();
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
        title='My Favorite Cards'
        description='your favorite cards are in the list below'
      />

      <div
        className='row overflow-y-scroll mh-100 mt-4 '
        style={{ height: '800px' }}
      >
        <div className='d-flex justify-content-flex-start flex-wrap'>
          {!cards ? (
            <p>no cards...</p>
          ) : (
            cards
              .filter((card) => card.likes.includes(user._id))
              .map((card) => (
                <Card
                  onLiked={async () => {
                    try {
                      await favCards(card._id);
                      await refetchCards();
                    } catch {
                      toast('🤯 please try again later', {});
                    }
                  }}
                  card={card}
                  key={card._id}
                  liked={true}
                  hideControls
                />
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default CardsFav;
