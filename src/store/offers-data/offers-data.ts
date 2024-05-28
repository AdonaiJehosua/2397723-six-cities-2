import { createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const/const';
import { OfferData } from '../../types/offer';
import { fetchOffers } from '../api-actions';

const initialState: {
  offers: OfferData[];
  isOffersLoading: boolean;
  hasError: boolean;
} = {
  offers: [],
  isOffersLoading: false,
  hasError: false
};

export const offersData = createSlice({
  name: NameSpaces.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      });
  }
});
