import type { Metadata } from "next";

import { FullStory } from "@/components/sections/full-story";
import { SiteFooter } from "@/components/sections/site-footer";
import { StoryPageHeader } from "@/components/sections/story-page-header";
import { COUPLE, WEDDING_DATE } from "@/lib/wedding";

const title = `Our Story — ${COUPLE.displayName}`;
const description = `The full story of how ${COUPLE.groom} and ${COUPLE.bride} met and came to be married on ${WEDDING_DATE.long}.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_KE",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function OurStoryPage() {
  return (
    <>
      <StoryPageHeader />
      <main className="flex-1">
        <FullStory />
      </main>
      <SiteFooter />
    </>
  );
}
