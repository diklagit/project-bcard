import { useState, useEffect } from 'react';
import cardsService from '../services/cardsService';

export const useAllCards = () => {
  const [cards, setCards] = useState();

  const refetchCards = async () => {
    const { data } = await cardsService.getAll();
    setCards(data);
  };

  useEffect(() => {
    refetchCards();
  }, []);

  return { refetchCards, cards };
};
