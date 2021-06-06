import { Dispatch } from '@reduxjs/toolkit';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useOmdbFlags } from '../../../hooks/featureFlagsHooks';
import { useOmdbSearchResults } from '../../../hooks/searchResultsHooks';
import { ImdbMovie } from '../../../services/api/omdb';
import { OmdbFlags } from '../../../store/features/featureFlags/featureFlagsSlice';
import { removeFromResults } from '../../../store/features/searchResult/searchResultsSlice';
import List from '../../base/list/List';
import MovieCard, { MovieCardProps } from './MovieCard';

export interface ListProps {
  placeholder?: string;
}

//testable
//eslint-disable-next-line
export const removeMovie = (dispatch: Dispatch<any>, id: string, opts: OmdbFlags) => {
  dispatch(removeFromResults({ query: id, opts }));
};

const MovieList: React.FunctionComponent<ListProps> = ({ placeholder }): React.ReactElement => {
  const movies = useOmdbSearchResults();
  const omdbFlags = useOmdbFlags();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const remove = useCallback((id) => removeMovie(dispatch, id, omdbFlags), [dispatch, omdbFlags]);

  return (
    <StyledWrapper aria-label={t('main.movieList.results')}>
      <List<ImdbMovie, MovieCardProps>
        data={movies}
        ItemComponent={MovieCard}
        keyProp="imdbID"
        itemComponentProps={{ closeHandler: remove }}
      ></List>
    </StyledWrapper>
  );
};

export default MovieList;

const StyledWrapper = styled.section``;
