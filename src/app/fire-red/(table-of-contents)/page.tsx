import { TableOfContents } from './_components';
import classes from './page.module.css';

export const metadata = {
  title: 'Pokedex | Fire Red - Table of Contents',
};

const Page = () => {
  return (
    <div className={classes.root}>
      <TableOfContents />
    </div>
  );
};

export default Page;
