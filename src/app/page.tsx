import {
  Header,
  Hero,
  Workbench,
  Marquee,
  ModesIntro,
  ModesAccordion,
  FunnelStatement,
  Numbers,
  Pricing,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Workbench />
        <Marquee />
        <ModesIntro />
        <ModesAccordion />
        <FunnelStatement />
        <Numbers />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
