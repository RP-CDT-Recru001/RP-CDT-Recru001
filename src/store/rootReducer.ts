import { combineReducers } from '@reduxjs/toolkit';
import searchResultsSlice from './features/searchResult/searchResultsSlice';
import featureFlagsSlice from './features/featureFlags/featureFlagsSlice';

const rootReducer = combineReducers({ searchResultsSlice, featureFlagsSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
