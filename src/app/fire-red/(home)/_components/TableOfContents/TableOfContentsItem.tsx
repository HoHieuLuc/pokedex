import { Text } from '@/app/fire-red/_components';
import { TableOfContent } from './table-of-contents';
import classes from './TableOfContentsItem.module.css';

interface Props extends TableOfContent {
  active: boolean;
}

const TableOfContentsItem = ({ active, title, type }: Props) => {
  return (
    <Text
      variant={type === 'heading' ? 'orange' : undefined}
      className={classes.root}
      data-active={active}
    >
      {title}
    </Text>
  );
};
export default TableOfContentsItem;
