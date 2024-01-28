import { PokemonPage } from '../_components';
import classes from './page.module.css';

interface Props {
  params: {
    name: string;
  };
}

const Page = ({ params }: Props) => {
  return (
    <div className={classes.root}>
      <PokemonPage name={params.name} />
    </div>
  );
};

export default Page;
