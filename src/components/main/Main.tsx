import { Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { color } from '../../css/colors';
import { setupOmdbCaching } from '../../store/features/searchResult/searchResultsSlice';
import MovieList from './movie/MovieList';
import SearchBar from './searchbar/SearchBar';

//testable
//eslint-disable-next-line
export const setup = (dispatch: Dispatch<any>) => {
  //cahce results and searches locally to save requests
  const omdbFlags = { omdbCaching: true, omdbStateCaching: false };
  dispatch(setupOmdbCaching(omdbFlags));
};

const Main: React.FunctionComponent<Record<string, never>> = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    setup(dispatch);
  }, [dispatch]);

  return (
    <Content>
      <SearchBar />
      <Wrapper>
        <MovieList />
      </Wrapper>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: ${color('BACKGROUND_MIN')};
  background: -webkit-linear-gradient(to right, ${color('BACKGROUND_MIN')}, ${color('BACKGROUND_MAX')});
  background: linear-gradient(to right, ${color('BACKGROUND_MIN')}, ${color('BACKGROUND_MAX')});
  z-index: -10;
`;

const Wrapper = styled.div``;

export default Main;
