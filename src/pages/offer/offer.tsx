import {
  CommentForm,
  PremiumLabel,
  ReviewsList,
  Map,
  NearPlacesList,
  OfferBookmarkButton
} from '../../components';
import { ratingToPercent } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchNearPlaces, fetchOffer, fetchReviews } from '../../store/api-actions';
import { Helmet } from 'react-helmet-async';
import { getOffer, getOfferError } from '../../store/offer-data/offer-data.selectors';
import { getRandomNearPlaces } from '../../store/near-places-data/near-places-data.selectors';
import { getReviews } from '../../store/reviews-data/reviews-data.selectors';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import { changeHoveredOffer } from '../../store/app-data/app-data';

const MAX_IMAGE_COUNT = 6;

export default function Offer(): React.JSX.Element | undefined {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const offerError = useAppSelector(getOfferError);
  const nearPlaces = useAppSelector(getRandomNearPlaces);
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(changeHoveredOffer(undefined));
      dispatch(fetchOffer(id));
      dispatch(fetchNearPlaces(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  if (offerError) {
    navigate(AppRoute.NotFound);
  }

  if (offer) {
    const mapPlaces = [...nearPlaces, offer];

    return (
      <>
        <Helmet title='Offer' />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.slice(0, MAX_IMAGE_COUNT - 1).map((image) => (
                  <div key={image} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium && <PremiumLabel isOfferMark />}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <OfferBookmarkButton offerId={offer.id} status={offer.isFavorite} />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: ratingToPercent(offer.rating) }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {offer.host.name}
                    </span>
                    {offer.host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
                  {reviews && <ReviewsList reviews={reviews} />}
                  {authorizationStatus === AuthorizationStatus.Auth && <CommentForm offerId={offer.id} />}
                </section>
              </div>
            </div>
            <div style={{ padding: '0 58px', maxWidth: '1144px', margin: 'auto' }}>
              {nearPlaces && <Map offers={mapPlaces} className='offer__map' currentOfferId={offer.id}/>}
            </div>
          </section>
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="container">
              {nearPlaces && <NearPlacesList nearPlaces={nearPlaces} />}
            </div>
          </section>
        </main>
      </>
    );
  }
}
