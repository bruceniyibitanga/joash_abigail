import { Details } from "@/components/sections/details";
import { Hero } from "@/components/sections/hero";
import { Rsvp } from "@/components/sections/rsvp";
import { Schedule } from "@/components/sections/schedule";
import { SiteFooter } from "@/components/sections/site-footer";
import { Story } from "@/components/sections/story";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1">
        <Story />
        <Schedule />
        <Details />
        <Rsvp />
      </main>
      <SiteFooter />
    </>
  );
}
