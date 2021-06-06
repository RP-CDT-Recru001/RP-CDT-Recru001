import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../rootReducer';

const featureFlags = (state: RootState) => state.featureFlagsSlice.flags;
const omdbFlags = (state: RootState) => state.featureFlagsSlice.flags.omdb;
const omdbCaching = (state: RootState) => state.featureFlagsSlice.flags.omdb.omdbCaching;
const omdbStateCaching = (state: RootState) => state.featureFlagsSlice.flags.omdb.omdbStateCaching;

export const featureFlagsSelector = createSelector(featureFlags, (data) => {
  return data;
});

export const omdbFlagsSelector = createSelector(omdbFlags, (data) => {
  return data;
});

export const omdbCachingSelector = createSelector(omdbCaching, (data) => {
  return data;
});

export const omdbStateCachingSelector = createSelector(omdbStateCaching, (data) => {
  return data;
});
