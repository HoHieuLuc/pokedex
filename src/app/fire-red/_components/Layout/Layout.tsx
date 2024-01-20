import '../../theme.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className='root'>{children}</div>;
};

export default Layout;
