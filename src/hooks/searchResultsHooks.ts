import { useSelector } from 'react-redux';
import { currentSearchResultsSelector, currentRequestSelector } from '../store/features/searchResult/selectors/searchResultSelectors';

export function useOmdbSearchResults(): ReturnType<typeof currentSearchResultsSelector> {
  return useSelector(currentSearchResultsSelector);
}

export function useOmdbRequest(): ReturnType<typeof currentRequestSelector> {
  return useSelector(currentRequestSelector);
}
