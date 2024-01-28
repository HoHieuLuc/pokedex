import { TableOfContents } from './_components';
import classes from './page.module.css';

const Page = () => {
  return (
    <div className={classes.root}>
      <TableOfContents />
    </div>
  );
};

export default Page;
