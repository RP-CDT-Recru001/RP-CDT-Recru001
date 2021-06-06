import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

export interface BaseRowItem<K> {
  item: K;
}

// export type RowItem<I, N> = I & BaseRowItem<N>;

export interface RowProps<C> {
  ItemComponent: React.FunctionComponent<C>;
  itemComponentProps: C;
  onClick?: (key: string) => void;
  rowKey: string;
}

const RowWrapper = styled.div``;

//eslint-disable-next-line
const Row = <ItemType, ComponentType extends BaseRowItem<ItemType>>({
  rowKey,
  ItemComponent,
  itemComponentProps,
  onClick
}: RowProps<ComponentType>): React.ReactElement => {
  const localClickHandler = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.preventDefault();
      !!onClick && onClick(rowKey);
    },
    [rowKey, onClick]
  );

  return (
    <RowWrapper onClick={localClickHandler}>
      <ItemComponent {...itemComponentProps} />
    </RowWrapper>
  );
};

export default React.memo(Row) as typeof Row;
