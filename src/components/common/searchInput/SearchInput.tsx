import React, { useCallback, useState } from 'react';
import Input from '../../base/input/Input';
import Button from '../../base/button/Button';
import { Search } from '@material-ui/icons';
import { TextContentPath } from '../../base/text/Text';
import styled, { css, keyframes } from 'styled-components';

interface SearchInputProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  changeHandler?: (phrase: string) => void;
  clickHandler?: (phrase: string) => void;
  searchInput?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'name'>;
  searchButton?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'name'>;
  buttonText?: TextContentPath;
  className?: string;
  initialState?: boolean;
  //not implemented
  // debounce?: {
  //   apply: boolean;
  //   ms: number;
  // };
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  changeHandler,
  clickHandler,
  buttonText,
  searchInput,
  searchButton,
  className,
  initialState = false,
  children
}): React.ReactElement => {
  const [phrase, setPhrase] = useState<string>('');
  const [searchToggle, setSearchToggle] = useState<boolean>(initialState);

  const localChangeHandler = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      ev.preventDefault();
      //add debounce
      if (phrase !== ev.target.value) {
        setPhrase(ev.target.value);
        changeHandler && changeHandler(ev.target.value);
      }
    },
    [changeHandler, phrase]
  );

  const localSubmitHandler = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!searchToggle) {
        setSearchToggle(true);
      } else {
        clickHandler && clickHandler(phrase);
      }
    },
    [clickHandler, phrase, searchToggle]
  );

  return (
    <SearchInputWrapper animate={searchToggle} className={className} onSubmit={localSubmitHandler}>
      {!!searchToggle && (
        <Input
          baseTheme={{ textColorScheme: 'PRIMARY', colorSheme: 'NONE' }}
          type="search"
          {...searchInput}
          name="search-input"
          onChange={localChangeHandler}
        />
      )}
      <Button
        type="submit"
        {...searchButton}
        name="search-button"
        icon={{ IconComponent: Search, baseTheme: { sizeScheme: 'L', textColorScheme: 'SECONDARY', colorSheme: 'NONE' } }}
        text={buttonText}
        baseTheme={{ colorSheme: 'SECONDARY' }}
      />
      {children}
    </SearchInputWrapper>
  );
};

export default SearchInput;

const stick = keyframes`
  from {
    position: relative;
  }

  to {
    position: fixed;
  }
`;

const SearchInputWrapper = styled.form<{ animate: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  position: relative;
  animation: ${(props) => (props.animate ? css`${stick} '0.2s linear` : '')};
`;
