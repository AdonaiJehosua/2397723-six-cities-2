import React, { useEffect, useState } from 'react';
import { Offer } from '../../types/offer';

type CardProps = {
  offer: Offer;
  isOrdinaryCard?: boolean;
}

function PremiumLabel(): React.JSX.Element {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}

export default function Card({ offer, isOrdinaryCard = true }: CardProps): React.JSX.Element {

  const [active, setActive] = useState<string>();

  useEffect(() => {
    setActive('b312baee-786b-43bd-9fba-c19f0da74abc');
  }, [active]);

  return (
    <article
      className={`${isOrdinaryCard ? 'cities__card' : 'favorites__card'} place-card`}
      style={{
        opacity: active === offer.id ? '0.6' : ''
      }}
    >
      {offer.isPremium && <PremiumLabel />}
      <div className={`${isOrdinaryCard ? 'cities__image-wrapper' : 'favorites__image-wrapper'} place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isOrdinaryCard ? '260' : '150'}
            height={isOrdinaryCard ? '200' : '110'}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${!isOrdinaryCard ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / 5 * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article >
  );
}
