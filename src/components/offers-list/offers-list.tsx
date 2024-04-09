import React from 'react';
import Card from '../card/card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
}

export default function OffersList({ offers }: OffersListProps): React.JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} />)};
    </div>
  );
}
