import * as React from 'react';
import styles from './List.module.css';

export interface ListProps {
  items: Array<{
    id: string | number;
    content: React.ReactNode;
  }>;
  onItemClick?: (id: string | number) => void;
  className?: string;
}

export class List extends React.Component<ListProps> {
  handleItemClick = (id: string | number) => {
    const { onItemClick } = this.props;
    if (onItemClick) {
      onItemClick(id);
    }
  };

  render() {
    const { items, className } = this.props;
    const listClassName = className ? `${styles.list} ${className}` : styles.list;

    return (
      <ul className={listClassName}>
        {items.map(item => (
          <li
            key={item.id}
            className={styles.listItem}
            onClick={() => this.handleItemClick(item.id)}
          >
            {item.content}
          </li>
        ))}
      </ul>
    );
  }
}
