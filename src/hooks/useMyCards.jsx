import { useState, useEffect } from 'react';
import cardsService from '../services/cardsService';

export const useMyCards = () => {
  const [cards, setCards] = useState();

  const refetchCards = async () => {
    const { data } = await cardsService.getMyCards();
    setCards(data);
  };

  useEffect(() => {
    refetchCards();
  }, []);

  return { cards, refetchCards };
};
