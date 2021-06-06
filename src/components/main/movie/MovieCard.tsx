import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { color } from '../../../css/colors';
import { px, size } from '../../../css/sizes';
import { ImdbMovie } from '../../../services/api/omdb';
import { BaseTheme } from '../../../css/theme';
import LabeledText from '../../common/text/LabeledText';
import { TextContentPath } from '../../base/text/Text';
import { camelCase } from 'lodash';
import MoreLessIcon from '../../common/icons/MoreLessIcon';
import CloseIcon from '../../common/icons/CloseIcon';
import { useTranslation } from 'react-i18next';

export interface MovieCardProps {
  item: ImdbMovie;
  closeHandler?: (id: string) => void;
}

const specialKeys: (keyof ImdbMovie)[] = ['Title', 'Plot', 'Ratings', 'Poster', 'imdbID'];
const baseTextTheme: Partial<BaseTheme> = { sizeScheme: 'XS', colorSheme: 'SECONDARY' };
const baseLabelTheme: Partial<BaseTheme> = { sizeScheme: 'XXS', colorSheme: 'SECONDARY' };

const MovieCard: React.FunctionComponent<MovieCardProps> = ({ item, closeHandler }): React.ReactElement => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggleCollapsed = useCallback((collapsed) => setMoreInfo(!collapsed), []);
  const remove = useCallback(() => closeHandler && closeHandler(item.imdbID), [closeHandler, item.imdbID]);

  return (
    <MovieWrapper>
      <LabeledText baseTextTheme={baseTextTheme} baseLabelTheme={baseLabelTheme} label="movieCard.labels.title" element="h2">
        {item.Title}
      </LabeledText>
      <LabeledText label={'movieCard.labels.plot'} baseTextTheme={baseTextTheme} baseLabelTheme={baseLabelTheme}>
        {item.Plot}
      </LabeledText>

      {!!moreInfo && (
        //temporary implementation, just list what's out there
        <MoreInfoWrapper>
          {Object.keys(item)
            .filter((key) => !specialKeys.includes(key as keyof ImdbMovie))
            .map((key) => {
              return (
                <LabeledText
                  key={key}
                  baseTextTheme={baseTextTheme}
                  label={`movieCard.labels.${camelCase(key)}` as TextContentPath}
                  baseLabelTheme={baseLabelTheme}
                >
                  {item[key as keyof ImdbMovie] as string}
                </LabeledText>
              );
            })}
        </MoreInfoWrapper>
      )}
      <StyledCloseIcon role="button" name={t('common.remove')} baseTheme={{ colorSheme: 'NONE', sizeScheme: 'SM' }} clickHandler={remove} />
      <StyledMoreLessIcon
        role="button"
        name={moreInfo ? t('common.showLess') : t('common.showMore')}
        baseTheme={{ colorSheme: 'NONE', sizeScheme: 'MD' }}
        clickHandler={toggleCollapsed}
      />
    </MovieWrapper>
  );
};

export default MovieCard;

const StyledMoreLessIcon = styled(MoreLessIcon)`
  position: absolute;
  right: ${px(5)};
  bottom: ${px(5)};
  &: hover {
    -webkit-box-shadow: 0px 0px ${px(2)} ${px(0.5)} ${(props) => props.theme.fontColor};
    box-shadow: 0px 0px ${px(2)} ${px(0.5)} ${(props) => props.theme.fontColor};
  } ;
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  right: ${px(5)};
  top: ${px(5)};
  &: hover {
    -webkit-box-shadow: 0px 0px ${px(2)} ${px(0.5)} ${(props) => props.theme.fontColor};
    box-shadow: 0px 0px ${px(2)} ${px(0.5)} ${(props) => props.theme.fontColor};
  } ;
`;

const MoreInfoWrapper = styled.div`
  position: relative;
`;

const MovieWrapper = styled.div`
  width: 70vw;
  margin: ${size('MARGIN_BASE')} ${size('MARGIN_BASE')};
  padding: ${px(5)} ${px(8)} ${px(20)} ${px(8)};
  position: relative;
  border: 2px solid ${color('FRAMING')};
  background-color: transparent;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: ${color('BACKGROUND_MIN')};
    background: -webkit-linear-gradient(
      to right,
      ${tinycolor(color('BACKGROUND_MIN')).lighten(7).toHexString()},
      ${tinycolor(color('BACKGROUND_MAX')).lighten(5).toHexString()}
    );
    background: linear-gradient(
      to right,
      ${tinycolor(color('BACKGROUND_MIN')).lighten(7).toHexString()},
      ${tinycolor(color('BACKGROUND_MAX')).lighten(5).toHexString()}
    );
    opacity: 0.5;
  }
`;
