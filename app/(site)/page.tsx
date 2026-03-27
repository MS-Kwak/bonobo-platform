import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { TrustBand } from '@/components/sections/trust-band';
import { Services } from '@/components/sections/services';
import { References } from '@/components/sections/references';
import { CTA } from '@/components/sections/cta';
import { Process } from '@/components/sections/process';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <TrustBand />
      <Services />
      <References />
      <CTA />
      <Process />
    </>
  );
}
