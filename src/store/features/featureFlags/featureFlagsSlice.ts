import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImdbMovie } from '../../../services/api/omdb';

//eslint-disable-next-line
export const loadedMovies: Map<string, ImdbMovie> = new Map();
export const searches: Map<string, string | undefined> = new Map();

export interface OmdbFlags {
  omdbCaching: boolean; //cache omdb searches and results
  omdbStateCaching: boolean; //will cache state if omdbCaching enabled
}

interface SearchResultsInitialState {
  flags: {
    omdb: OmdbFlags;
  };
}

const initialState: SearchResultsInitialState = {
  flags: { omdb: { omdbCaching: false, omdbStateCaching: false } }
};

const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    setOmdbCaching: (state, action: PayloadAction<boolean>) => {
      state.flags.omdb.omdbCaching = action.payload;
    },
    setOmdbStateCaching: (state, action: PayloadAction<boolean>) => {
      state.flags.omdb.omdbStateCaching = action.payload;
    },
    setOmdbFlags: (state, action: PayloadAction<OmdbFlags>) => {
      state.flags.omdb = action.payload;
    }
  }
});

export const { setOmdbCaching, setOmdbStateCaching, setOmdbFlags } = featureFlagsSlice.actions;
export default featureFlagsSlice.reducer;
