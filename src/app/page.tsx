import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Link from 'next/link';

export default function HomePage() {

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Link href='/fire-red'>Fire red</Link>
    </>
  );
}
