import React from 'react';
import { Review } from '../../types';
import { humanizeDate, ratingToPercent } from '../../utils';

type Props = {
  review: Review;
}

export function ReviewsItem({ review }: Props): React.JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
        <span className="offer__user-status">
          {review.user.isPro ? 'Pro' : ''}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingToPercent(review.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{humanizeDate(review.date)}</time>
      </div>
    </li>
  );
}
