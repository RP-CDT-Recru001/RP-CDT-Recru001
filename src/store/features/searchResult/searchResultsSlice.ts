import { createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import iterate from 'iterare';
import omdbApi, { ImdbMovie, instanceOfImdbMovie, OmdbError } from '../../../services/api/omdb';
import { AppThunk } from '../../store';
import { createStateError, StateError } from '../../storeUtils';
import { OmdbFlags, setOmdbFlags } from '../featureFlags/featureFlagsSlice';
import { debugMode } from '../../../services/utils/logging';
//eslint-disable-next-line

export const loadedMovies: Map<string, ImdbMovie> = new Map();
export const performedSearches: Map<string, string | undefined> = new Map();

interface SearchResultsInitialState {
  request: {
    error: StateError;
    inProgress: boolean;
  };
  data: Set<string>;
}

interface OmdbPayload {
  result: ImdbMovie | OmdbError;
  requestOpts: OmdbFetchParaps;
}

export interface OmdbFetchParaps {
  query: string;
  opts?: OmdbFlags;
}
const initialState: SearchResultsInitialState = {
  request: {
    error: {
      isError: false,
      errorMessage: ''
    },
    inProgress: false
  },
  data: new Set()
};

const emptyError: StateError = {
  isError: false,
  errorMessage: ''
};

//eslint-disable-next-line
const executeQuery = async (type: 'id' | 'title', { query, opts }: OmdbFetchParaps, dispatch: ThunkDispatch<any, any, any>) => {
  const fetchFunction = type === 'id' ? omdbApi.queryById : omdbApi.queryByTitle;
  if (!performedSearches.has(query)) {
    const result = await fetchFunction(query);
    return { result, requestOpts: { query, opts } };
  } else {
    //scroll to top
    const imdbId = performedSearches.get(query);
    //ToDo hardcoded text
    if (!imdbId) return { result: { Response: '', Error: 'Movie not found!' }, requestOpts: { query, opts } };
    dispatch(moveToTop({ query: imdbId, opts }));
  }
};

export const fetchByTitle = createAsyncThunk('searchResults/fetchByTitleStatus', async (opts: OmdbFetchParaps, thunkAPI): Promise<
  OmdbPayload | undefined
> => {
  return await executeQuery('title', opts, thunkAPI.dispatch);
});

export const fetchById = createAsyncThunk('searchResults/fetchByIdStatus', async (opts: OmdbFetchParaps, thunkAPI): Promise<
  OmdbPayload | undefined
> => {
  return await executeQuery('id', opts, thunkAPI.dispatch);
});

//should be replaced with generic local storage api
//ToDo Cache invalidation
export const storeSearches = (
  applyStore: boolean | undefined,
  objects: { movies?: boolean; searches?: boolean; state?: { cache: boolean | undefined; stateData: Set<string> } }
): void => {
  applyStore && objects.movies && localStorage.setItem('loadedMovies', JSON.stringify(Array.from(loadedMovies)));
  applyStore && objects.searches && localStorage.setItem('performedSearches', JSON.stringify(Array.from(performedSearches)));
  applyStore && objects.state?.cache && localStorage.setItem('stateData', JSON.stringify(Array.from(objects.state.stateData)));
  debugMode &&
    console.log('stored', localStorage.getItem('loadedMovies'), localStorage.getItem('loadedMovies'), localStorage.getItem('loadedMovies'));
};

const updateState = (state: SearchResultsInitialState, { result, requestOpts }: OmdbPayload) => {
  const { query, opts } = requestOpts;
  if (instanceOfImdbMovie(result)) {
    if (!state.data.has(result.imdbID)) {
      loadedMovies.set(result.imdbID, result);
      performedSearches.set(query, result.imdbID);
      state.data.add(result.imdbID);
      storeSearches(opts?.omdbCaching, { movies: true, searches: true });
      state.request.error = emptyError;
    }
  } else {
    performedSearches.set(query, undefined);
    storeSearches(opts?.omdbCaching, { searches: true });
    state.request.error = createStateError(result.Error, true);
  }
};

//define reducers outside of an slice for testability
const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    moveToTop: (state, action: PayloadAction<OmdbFetchParaps>) => {
      state.data.has(action.payload.query) && state.data.delete(action.payload.query);
      state.data.add(action.payload.query);
      storeSearches(action.payload.opts?.omdbCaching, { state: { cache: action.payload.opts?.omdbStateCaching, stateData: state.data } });
    },
    removeFromResults: (state, action: PayloadAction<OmdbFetchParaps>) => {
      state.data.has(action.payload.query) && state.data.delete(action.payload.query);
      storeSearches(action.payload.opts?.omdbCaching, { state: { cache: action.payload.opts?.omdbStateCaching, stateData: state.data } });
    },
    loadStoredData: (state, action: PayloadAction<OmdbFlags>) => {
      if (action.payload.omdbCaching) {
        const storagedLoadedMovies =
          !!localStorage.getItem('loadedMovies') &&
          (new Map(JSON.parse(localStorage.getItem('loadedMovies') as string)) as typeof loadedMovies);
        const storagedPerformedSearches =
          !!localStorage.getItem('performedSearches') &&
          (new Map(JSON.parse(localStorage.getItem('performedSearches') as string)) as typeof performedSearches);

        storagedPerformedSearches &&
          iterate(storagedPerformedSearches.keys()).forEach((search) => {
            !performedSearches.has(search) && performedSearches.set(search, storagedPerformedSearches.get(search));
          });

        storagedLoadedMovies &&
          storagedLoadedMovies.forEach((movie) => {
            !loadedMovies.has(movie.imdbID) && loadedMovies.set(movie.imdbID, movie);
          });
      }
      if (action.payload.omdbStateCaching) {
        const storagedSateData =
          !!localStorage.getItem('stateData') && new Set<string>(JSON.parse(localStorage.getItem('stateData') as string));

        if (storagedSateData) state.data = iterate(storagedSateData).concat(state.data).toSet();
      }
      debugMode && console.log('loaded', loadedMovies, performedSearches);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByTitle.fulfilled, (state, action) => {
      action.payload && updateState(state, action.payload);
      state.request.inProgress = false;
    });
    builder.addCase(fetchByTitle.rejected, (state, action) => {
      console.error(action.error);
      state.request.inProgress = false;
    });
    builder.addCase(fetchByTitle.pending, (state, action) => {
      state.request.inProgress = true;
      state.request.error = emptyError;
    });
    builder.addCase(fetchById.fulfilled, (state, action) => {
      action.payload && updateState(state, action.payload);
      state.request.inProgress = false;
    });
    builder.addCase(fetchById.rejected, (state, action) => {
      console.error(action.error);
      state.request.inProgress = false;
    });
    builder.addCase(fetchById.pending, (state, action) => {
      state.request.inProgress = true;
      state.request.error = emptyError;
    });
  }
});

export const setupOmdbCaching =
  (flags: OmdbFlags): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(loadStoredData(flags));
    dispatch(setOmdbFlags(flags));
  };

export const { moveToTop, removeFromResults, loadStoredData } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
