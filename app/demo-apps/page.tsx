import { getAllDemos } from './services/demoService';
import DemoAppsShowcase from './components/DemoAppsShowcase';

export const metadata = {
  title: 'Atelier AI Demos — Demo Apps',
  description: 'Explore luxury AI experiences in fashion, beauty, and concierge workflows.',
};

export default async function DemoAppsPage() {
  const demos = await getAllDemos();
  return <DemoAppsShowcase demos={demos} />;
}
