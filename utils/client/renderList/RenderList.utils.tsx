import { Component } from "react";

interface IRenderListProps<DataType> {
  items: Array<DataType>;
  renderNoContent?: JSX.Element | (() => JSX.Element);
  renderItem(
    item: DataType,
    index: number,
    items: Array<DataType>
  ): JSX.Element;
}

/**
 * Renders a list of items
 */
export class RenderList<DataType> extends Component<
  IRenderListProps<DataType>
> {
  constructor(props: IRenderListProps<DataType>) {
    super(props);
  }

  private renderListItem = (
    item: DataType,
    index: number,
    array: Array<DataType>
  ): JSX.Element => {
    return this.props.renderItem(item, index, array);
  };

  render(): JSX.Element | Array<JSX.Element> {
    const { items, renderNoContent = <></> } = this.props;

    if (items.length === 0) {
      return typeof renderNoContent === `function`
        ? renderNoContent()
        : renderNoContent;
    }

    return items.map(this.renderListItem);
  }
}
