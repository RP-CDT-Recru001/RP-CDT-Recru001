import { Dispatch } from '@reduxjs/toolkit';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { px } from '../../../css/sizes';
import { useOmdbFlags } from '../../../hooks/featureFlagsHooks';
import { useOmdbRequest } from '../../../hooks/searchResultsHooks';
import { OmdbFlags } from '../../../store/features/featureFlags/featureFlagsSlice';
import { fetchByTitle } from '../../../store/features/searchResult/searchResultsSlice';
import Spinner from '../../base/spinner/Spinner';
import SearchInput from '../../common/searchInput/SearchInput';
import Text from '../../base/text/Text';
import { useTranslation } from 'react-i18next';
//testable
//eslint-disable-next-line
export const searchBarClickHandler = (dispatch: Dispatch<any>, query: string, opts: OmdbFlags) => {
  dispatch(fetchByTitle({ query: query, opts }));
};

const SearchBar: React.FunctionComponent<Record<string, never>> = (): React.ReactElement => {
  const dispatch = useDispatch();
  const omdbFlags = useOmdbFlags();
  const currentRequest = useOmdbRequest();
  const { t } = useTranslation();

  const changeHandler = (value: string) => {
    return;
  };

  const clickHandler = useCallback((value: string) => searchBarClickHandler(dispatch, value, omdbFlags), [dispatch, omdbFlags]);

  return (
    <StyledWrapper aria-label={t('main.search.label')}>
      <SearchInput changeHandler={changeHandler} clickHandler={clickHandler}>
        {!!currentRequest.inProgress && <StyledSpinner baseTheme={{ textColorScheme: 'PRIMARY', colorSheme: 'NONE', sizeScheme: 'MD' }} />}
      </SearchInput>
      {!!currentRequest.error.isCustom && currentRequest.error.isError && (
        <Text baseTheme={{ sizeScheme: 'SM' }}>{currentRequest.error.errorMessage}</Text>
      )}
      {!currentRequest.error.isCustom && currentRequest.error.isError && (
        <Text baseTheme={{ sizeScheme: 'SM' }} content="main.search.genericError" />
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  margin: ${px(10)};
  text-align: center;
`;

export default SearchBar;

const StyledSpinner = styled(Spinner)`
  position absolute;
  top: 50%;
  right: 0;
  transform: translate(115%, -50%)
`;
