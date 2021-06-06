import { useSelector } from 'react-redux';
import {
  featureFlagsSelector,
  omdbCachingSelector,
  omdbFlagsSelector,
  omdbStateCachingSelector
} from '../store/features/featureFlags/selectors/featureFlagsSelectors';

export function useOmdbCaching(): ReturnType<typeof omdbCachingSelector> {
  return useSelector(omdbCachingSelector);
}

export function useFeatureFlags(): ReturnType<typeof featureFlagsSelector> {
  return useSelector(featureFlagsSelector);
}

export function useOmdbFlags(): ReturnType<typeof omdbFlagsSelector> {
  return useSelector(omdbFlagsSelector);
}

export function useOmdbStateCaching(): ReturnType<typeof omdbStateCachingSelector> {
  return useSelector(omdbStateCachingSelector);
}
