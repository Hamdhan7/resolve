import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Tickets | OneHelp',
  description: 'View and track the status of your submitted tickets on OneHelp.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
