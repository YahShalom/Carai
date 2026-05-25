import { getAllDemos } from './demo-apps/services/demoService';
import HomeShowcase from './components/HomeShowcase';

export const metadata = {
  title: 'Atelier AI — Luxury AI Demo Showcase',
  description: 'A cinematic AI showcase for fashion, beauty, and concierge brands.',
};

export default async function HomePage() {
  const demos = await getAllDemos();
  return <HomeShowcase demos={demos} />;
}
