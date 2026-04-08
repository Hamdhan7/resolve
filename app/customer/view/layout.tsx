import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Tickets | Resolv.lk',
  description: 'View and track the status of your submitted tickets on Resolv.lk.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
