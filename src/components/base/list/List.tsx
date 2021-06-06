import React from 'react';
import Row, { BaseRowItem } from './Row';

type StripItem<T> = Omit<T, 'item'>;

export interface ListProps<T, C> {
  data: T[];
  keyProp: keyof T;
  ItemComponent: React.FunctionComponent<C & BaseRowItem<T>>;
  itemComponentProps: StripItem<C>;
}

//eslint-disable-next-line
const List = <DataType extends Record<string, any>, ComponentProps>({
  data,
  keyProp,
  ItemComponent,
  itemComponentProps
}: //instad of explicit types I could try infer data type from item component prop
ListProps<DataType, ComponentProps>): React.ReactElement => {
  return (
    <React.Fragment>
      {data.map((item: DataType) => {
        const key = item[keyProp];
        const combinedProps = { item, ...itemComponentProps } as ComponentProps & BaseRowItem<DataType>;
        return (
          <Row<DataType, ComponentProps & BaseRowItem<DataType>>
            key={key}
            rowKey={key}
            ItemComponent={ItemComponent}
            itemComponentProps={combinedProps}
          />
        );
      })}
    </React.Fragment>
  );
};

export default List;
