import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../rootReducer';
import { iterate } from 'iterare';
import { loadedMovies } from '../searchResultsSlice';
import { ImdbMovie } from '../../../../services/api/omdb';

const currentRequest = (state: RootState) => state.searchResultsSlice.request;
const currentSearchResults = (state: RootState) => state.searchResultsSlice.data;

export const currentSearchResultsSelector = createSelector(currentSearchResults, (data) => {
  return iterate(data)
    .map((imdbId) => loadedMovies.get(imdbId))
    .toArray()
    .reverse() as ImdbMovie[];
});

export const currentRequestSelector = createSelector(currentRequest, (data) => {
  return data;
});
