/**
 * Single source of truth for all wedding content.
 *
 * Everything the page renders comes from here, so when the Supabase backend is
 * added these exports can be replaced by data-fetching functions returning the
 * same shapes without touching a single component.
 */

export type Couple = {
  bride: string;
  groom: string;
  /** Display order for the title lockup. */
  displayName: string;
};

export type WeddingDate = {
  /** ISO 8601, used for <time dateTime> and future date maths. */
  iso: string;
  long: string;
  short: string;
  city: string;
};

export type Scripture = {
  text: string;
  reference: string;
};

export type StoryChapter = {
  id: string;
  index: string;
  date: string;
  title: string;
  body: string;
  /** Tints the placeholder frame until real photography is dropped in. */
  tone: PhotoTone;
  image?: WeddingImage;
};

/**
 * A photograph slot. Paths are plain strings rather than static imports so the
 * same shape can later come straight from Supabase storage URLs.
 */
export type WeddingImage = {
  src: string;
  /** Meaningful alt text — these are photographs of real people. */
  alt: string;
};

export type ScheduleEvent = {
  id: string;
  time: string;
  title: string;
  body: string;
  location?: string;
};

export type SchedulePart = {
  id: string;
  label: string;
  venue: string;
  window: string;
  events: ScheduleEvent[];
};

export type DetailCard = {
  id: string;
  label: string;
  title: string;
  body: string;
  /** Only some cards carry an image, to keep the grid from feeling heavy. */
  photo?: PhotoTone;
  image?: WeddingImage;
};

export type PhotoTone = "ember" | "clay" | "dusk";

/* -------------------------------------------------------------------------- */

export const COUPLE: Couple = {
  bride: "Abigail",
  groom: "Joash",
  displayName: "Joash & Abigail",
};

export const WEDDING_DATE: WeddingDate = {
  iso: "2026-09-06T10:30:00+03:00",
  long: "Sunday, 6 September 2026",
  short: "06 · 09 · 26",
  city: "Ongata Rongai, Kenya",
};

/** Anchor verse for the day — used in the hero and repeated in the footer. */
export const ANCHOR_SCRIPTURE: Scripture = {
  text: "Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken.",
  reference: "Ecclesiastes 4:12",
};

export const BLESSING_SCRIPTURE: Scripture = {
  text: "Therefore what God has joined together, let no one separate.",
  reference: "Mark 10:9",
};

export const HERO_IMAGE: WeddingImage = {
  src: "/images/img3_hero.jpg",
  alt: `${COUPLE.groom} and ${COUPLE.bride} seated together, laughing`,
};

export const NAV_LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#day", label: "The Day" },
  { href: "#details", label: "Details" },
  { href: "#rsvp", label: "RSVP" },
] as const;

/* -------------------------------------------------------------------------- */

export const STORY_INTRO = {
  eyebrow: "Our Story",
  headingLead: "Two people, one",
  headingEm: "faithful God",
  body: "We did not find each other by accident. Looking back, every step was ordered — and we are still amazed at how kindly it was written.",
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "met",
    index: "01.",
    date: "March 2019",
    title: "How we met",
    body: "We were both serving on the same Sabbath programme — Abigail on the praise team, Joash reading the scripture. A conversation that was meant to last five minutes lasted the whole afternoon, and neither of us has run out of things to say since.",
    tone: "ember",
    image: {
      src: "/images/img1.jpg",
      alt: "Joash and Abigail on a hillside beneath the wind turbines",
    },
  },
  {
    id: "grew",
    index: "02.",
    date: "August 2023",
    title: "Growing together",
    body: "Years of studying the Word side by side, praying through the hard seasons, and learning what it means to put someone else first. Friendship first, then prayer, then a quiet certainty that this was the person to walk with.",
    tone: "clay",
    image: {
      src: "/images/img2.jpg",
      alt: "Joash and Abigail travelling together by train",
    },
  },
  {
    id: "yes",
    index: "03.",
    date: "December 2025",
    title: "The promise",
    body: "He asked with both families near and his knees shaking. She said yes before he finished. We knelt right there and gave thanks, because this was never ours to arrange in the first place.",
    tone: "dusk",
    image: {
      src: "/images/img4.jpg",
      alt: "Joash and Abigail dressed for a celebration, smiling together",
    },
  },
];

/* -------------------------------------------------------------------------- */

export const SCHEDULE: SchedulePart[] = [
  {
    id: "ceremony",
    label: "The Ceremony",
    venue: "Laiser Hill SDA Church",
    window: "10:30 AM — 1:00 PM",
    events: [
      {
        id: "arrive",
        time: "10:00",
        title: "Guests arrive",
        body: "Come early, find a seat, and greet the family. We would love to begin on time.",
        location: "Laiser Hill SDA Church",
      },
      {
        id: "processional",
        time: "10:30",
        title: "Processional & opening hymn",
        body: "We enter together and lift the first song. Please join in — the singing is the whole point.",
      },
      {
        id: "word",
        time: "11:00",
        title: "Worship & the Word",
        body: "A time of praise, and a short charge from Scripture on the covenant we are about to make.",
      },
      {
        id: "vows",
        time: "11:40",
        title: "Vows",
        body: "The promises themselves. Spoken before God, and before every person in the room.",
      },
      {
        id: "prayer",
        time: "12:15",
        title: "Prayer of dedication",
        body: "Our families gather around us to pray a blessing over this new home.",
      },
      {
        id: "register",
        time: "12:40",
        title: "Signing of the register",
        body: "The paperwork, made joyful by the people watching it happen.",
      },
      {
        id: "recessional",
        time: "1:00",
        title: "Recessional",
        body: "We walk out as husband and wife. Then we make our way to Jakin Gardens.",
      },
    ],
  },
  {
    id: "photos",
    label: "Photo Session",
    venue: "Jakin Gardens",
    window: "1:30 PM — 2:30 PM",
    events: [
      {
        id: "photo",
        time: "1:30",
        title: "Main photo session",
        body: "The bridal party steps away for photographs while guests are welcomed into the gardens.",
        location: "Jakin Gardens",
      },
    ],
  },
  {
    id: "reception",
    label: "The Reception",
    venue: "Jakin Gardens",
    window: "2:30 PM — 6:30 PM",
    events: [
      {
        id: "welcome",
        time: "2:30",
        title: "Welcome & grace",
        body: "Guests are seated, the couple is received, and we give thanks before we eat.",
        location: "Jakin Gardens",
      },
      {
        id: "meal",
        time: "3:00",
        title: "The meal is served",
        body: "Plenty of it, with vegetarian options throughout. Tell us on your RSVP and we will make sure you are looked after.",
      },
      {
        id: "speeches",
        time: "4:00",
        title: "Speeches & words of blessing",
        body: "Family, friends, and both sets of parents. Each speaker has a time limit. We shall see.",
      },
      {
        id: "cake",
        time: "4:45",
        title: "Cutting of the cake",
        body: "The first thing we do together, and the first thing we share with you.",
      },
      {
        id: "gifts",
        time: "5:15",
        title: "Gifts & thanksgiving",
        body: "A time of giving and a song of thanks for everyone who carried us here.",
      },
      {
        id: "closing",
        time: "6:00",
        title: "Closing prayer & send-off",
        body: "We close the day the way we opened it — together, in prayer.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export const DETAILS: DetailCard[] = [
  {
    id: "ceremony-venue",
    label: "Ceremony",
    title: "Laiser Hill SDA Church",
    body: "JP4M+838, Ongata Rongai, Kenya. Doors open at 10:00 AM and the processional begins promptly at 10:30 AM.",
    photo: "clay",
    image: {
      src: "/images/church.png",
      alt: "Laiser Hill Seventh-day Adventist Church, surrounded by trees",
    },
  },
  {
    id: "reception-venue",
    label: "Reception",
    title: "Jakin Gardens, Ongata Rongai",
    body: "Photographs from 1:30 PM and the reception from 2:30 PM until 6:30 PM. It is a short drive from the church, and the gardens are open the moment you arrive.",
    photo: "dusk",
    image: {
      src: "/images/img5.jpg",
      alt: "Joash and Abigail sitting together on the grass outdoors",
    },
  },
  {
    id: "travel",
    label: "Getting There",
    title: "Driving, matatu, or ride share",
    body: "Ongata Rongai is roughly forty minutes from Nairobi CBD along Magadi Road, longer if traffic decides otherwise. Parking is available at both venues, and a ride share is the easy option if you would rather not drive.",
  },
  {
    id: "dress",
    label: "Dress Code",
    title: "Garden formal",
    body: "Picture a bright afternoon among green lawns and open sky — we would love to see you dressed elegantly and modestly for the occasion.",
  },
  {
    id: "children",
    label: "The Little Ones",
    title: "Children are welcome",
    body: "Bring them. There is space to run at the gardens, and the day is far better with them in it.",
  },
  {
    id: "gifts",
    label: "Gifts",
    title: "Your presence, first",
    body: "Having you there is genuinely the gift. If you would still like to bless our new home, there will be a gifts table at the reception during the thanksgiving hour.",
  },
];

/* -------------------------------------------------------------------------- */

export const RSVP_CONTENT = {
  eyebrow: "RSVP",
  headingLead: "Come and",
  headingEm: "rejoice with us",
  intro:
    "Kindly respond ASAP so we can plan the seating and the meal well.",
  successTitle: "Thank you — we cannot wait to see you.",
  successBody:
    "Your response has been noted. If anything changes, simply submit the form again and we will use your latest answer.",
} as const;

export const RSVP_DEADLINE = "1 August 2026";
