import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteHeaderNav } from '@/components/site-header-nav';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout {...baseOptions()}>
      <SiteHeaderNav />
      {children}
    </HomeLayout>
  );
}
