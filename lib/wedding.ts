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

/** One person's account of a chapter — always given in their own words. */
export type StoryVoice = {
  name: string;
  paragraphs: string[];
};

export type FullStoryPhase = {
  id: string;
  index: string;
  dateLabel: string;
  title: string;
  tone: PhotoTone;
  image?: WeddingImage;
  voices: StoryVoice[];
};

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
  body: "We did not find each other by accident. From a mutual friend's introduction to two years spent mostly a continent apart, every step of our story was ordered — and we are still amazed at how kindly it was written.",
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "met",
    index: "01.",
    date: "February 2023",
    title: "How we met",
    body: "A mutual friend introduced us by sharing our contacts. Joash's first message arrived on the 12th of February — Abigael had prayed and fasted before agreeing to it; Joash, newly arrived in Australia, had prayed for God to show him where his wife would come from.",
    tone: "ember",
    image: {
      src: "/images/img1.jpg",
      alt: "Joash and Abigail on a hillside beneath the wind turbines",
    },
  },
  {
    id: "grew",
    index: "02.",
    date: "2023 – 2024",
    title: "Growing together",
    body: "Two years of long-distance friendship — prayer, hymns, daily calls, and a season of silence that tested us both. We learned that love holds together on honesty more than proximity, and that God can be trusted with every mile in between.",
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
    body: "Joash proposed the only way that made sense for two people who had written each other across continents — on the final page of a book, after months of hidden notes. Abigael read it in a single day, turned to the last page, and said a joyful yes.",
    tone: "dusk",
    image: {
      src: "/images/img4.jpg",
      alt: "Joash and Abigail dressed for a celebration, smiling together",
    },
  },
];

export const STORY_CTA = {
  label: "Read our full story",
  href: "/our-story",
};

/* -------------------------------------------------------------------------- */
/* The full story — every phase, in both our words.                          */

export const FULL_STORY_INTRO = {
  eyebrow: "Our Story, In Full",
  headingLead: "Every chapter,",
  headingEm: "as we lived it",
  body: "This is our story — a testimony of what God can do when you trust Him with one of the most important decisions you will ever make. Told here in both our own words, exactly as we lived it.",
};

export const FULL_STORY_CLOSING = "To God be all the glory.";

export const FULL_STORY_PHASES: FullStoryPhase[] = [
  {
    id: "how-we-met",
    index: "01.",
    dateLabel: "February 2023",
    title: "How we met",
    tone: "ember",
    image: {
      src: "/images/img5.jpg",
      alt: "Joash and Abigail sitting together outdoors",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "In January 2023, a mutual friend asked if he could introduce us by sharing my contact with Joash. I hesitated — relationships felt like too big a step to enter carelessly — but after praying it through with a close friend, I found peace. On the 10th of February, after a time of prayer and fasting, I agreed to share my contact. I wanted to start this the right way, with God first.",
          "Two days later, on the 12th of February 2023, a simple message from Joash appeared on my phone. I had no idea that ordinary message was the first page of a story God had already begun writing. From there our friendship grew through prayer, daily devotions, singing hymns together, and long conversations over voice and video calls — one step at a time, with God leading. Honestly, I think I knew fairly early that this was the one.",
          "As our confidence in this journey grew, I visited Joash's parents, and later told my own — bringing this first phase to a beautiful close.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "At the start of 2023, after much prayer, I asked a close friend to help me in the search for a wife. It had been a year since I'd moved from Kenya to Australia for further studies, and I was asking God whether my better half would come from home or from somewhere new. I left it in His hands.",
          "A few weeks later my friend called, certain he had found the one — Abigael. \"So quick,\" I thought. She was hesitant to share her contact at first, but a few days later she agreed, along with a few photos. Modest and simple, I remember thinking.",
          "On the 12th of February 2023, I finally reached out. That first conversation is still vivid to me — how easily we connected despite different networks and different corners of the world. Our age gap gave me pause, but her maturity and thoughtfulness answered it well. We prayed together, sang together, and talked through what a true home built on faith would look like. I'm grateful, looking back, for the distance between us in that season — it kept us from the danger of physical intimacy so many young couples fall into too soon, and it taught us to trust God's guidance over our own judgment. \"For we live by faith and not by sight\" became real for us.",
          "A few months in, Abigael met my family, and I encouraged her to tell her parents about us too — the right thing to do. That she was willing to confirmed how seriously she was taking this. That was the introduction phase.",
        ],
      },
    ],
  },
  {
    id: "language-of-patience",
    index: "02.",
    dateLabel: "2023",
    title: "The language of patience",
    tone: "clay",
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "Like every meaningful relationship, phase two tested us. Distance, misunderstandings, and communication challenges became opportunities to grow in patience and dependence on God. I had already decided Joash was the one, and telling our parents about him felt like a wonderful step forward.",
          "Then our communication slowed. I kept wondering what I'd done wrong but could find no answer, and I cried more than I want to admit — I couldn't imagine losing the first relationship I had invested so much in, to the point of telling my parents. Still, I held on to the belief that if God was in our story, He would lead us through it. Before I could give up entirely, I called our mutual friend, shared my heart, and resolved to pray for ten days. On the seventh day, I felt led to call Joash. He asked if the silence had affected me — it had — and he apologised honestly and explained himself. That conversation began our restoration. We learned that love is strengthened by grace, honest communication, and clear expectations.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "This was the hardest phase of our relationship. As the early excitement faded, we had to deal with the realities of distance and mismatched expectations. I still felt something special between us, but I was treading carefully — I didn't want to be the kind of man who trifles with someone's heart. When things began moving faster than I expected, I got cold feet. Juggling work and school gave me the perfect excuse to disappear.",
          "It took me two months to reach out again, with some mediation from my close friend. It was a hard, lengthy conversation — I had put Abigael through real emotional turmoil, and I apologised sincerely and promised to make things right. I was pleasantly surprised, and grateful, that she was still willing to work on us. Even through her tears, she could see some light ahead. We both learned how important it is to set clear expectations at every stage of a relationship, starting with being open and honest with one another. Coming out of it felt like coming out of a storm — so that's what I call this phase.",
        ],
      },
    ],
  },
  {
    id: "growing-together",
    index: "03.",
    dateLabel: "2024",
    title: "Growing together",
    tone: "dusk",
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "It is by God's grace that we made it through. We intentionally worked through our communication challenges, learning to express our fears honestly, listen carefully, and trust each other despite the miles between us. Though we could not see each other in person, our friendship continued to grow stronger through all of 2024 — more intentional, more honest, more open with one another.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "We were now ready to explore the most exciting phase yet, before we'd even had the chance to meet in person — I called this the norming phase. With clearly set expectations and boundaries, things began to normalise. Because of our time zone differences, we set the expectation for how many times a week we'd call each other, and for how long. We were intentional with every interaction, and our trust in each other grew rapidly. We learned that long-distance relationships can only work when there is absolute honesty and trust.",
        ],
      },
    ],
  },
  {
    id: "first-meet-up",
    index: "04.",
    dateLabel: "February 2025",
    title: "Our first physical meet-up",
    tone: "ember",
    image: {
      src: "/images/img1.jpg",
      alt: "Joash and Abigail on a hillside beneath the wind turbines",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "This was my favourite chapter — the one we had prayed and waited nearly two years for. On Monday the 3rd of February 2025, we finally saw each other face to face for the very first time. It's a moment I'll never forget — we even recorded our first video together, a sweet memory that still brings a smile to my face. The days that followed took us to Ngong Hills, where we honestly shared our strengths, weaknesses, fears, and the reasons we believed God was leading us toward marriage. To this day, I believe Ngong Hills holds some of our sweetest memories.",
          "We travelled to my home, and on the 8th of February, Joash met my parents — another beautiful milestone in our journey. On the 13th, we travelled to Mombasa with a fellow couple, where we intentionally answered every question we had written down for each other. The next day we explored Mombasa, talked until nearly 3am, and made memories we'll cherish forever. Then Sabbath came, and we worshipped together in church.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "After much prayer and consideration, I was affirmed in my decision to travel back to Kenya to meet Abigael for the very first time. I asked God to open the way and to give me assurance this was the right step. Through His providence, I managed to secure a flight ticket for half the market price — that, to me, was the assurance I was looking for. I still recall that first day we met physically. I could see the anxiety written all over Abigael's face — honestly, we were both anxious, so much that we couldn't even eat that morning. But we were so excited to finally meet after nearly two years of waiting.",
          "Since my stay in Kenya was short, we made every moment count. We spent much of our initial days at Ngong Hills, pouring out our hearts to each other, and it became clear our values and principles on marriage were perfectly aligned. Meeting Abigael's parents for the first time was also a memorable experience. To affirm our decision further, we travelled to Mombasa by train — we had agreed to write down every question we had for each other and try to answer them all during the five-hour journey. I was still praying for a clear sign, and that prayer was answered while we were in Mombasa, during a small altercation between us. The way Abigael handled the reconciliation told me everything I needed to know.",
        ],
      },
    ],
  },
  {
    id: "courtship",
    index: "05.",
    dateLabel: "February 2025",
    title: "The courtship journey",
    tone: "clay",
    image: {
      src: "/images/img2.jpg",
      alt: "Joash and Abigail travelling together by train",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "Phase five marked the beginning of our courtship. On the 16th of February 2025, as we travelled back from Mombasa on the Premium SGR, Joash asked me to be his courtship partner. With all my heart, I said a big \"Yes!\" Tears of joy filled my eyes as we dedicated our courtship to the Lord right there on the train. By then, I had come to know Joash as a caring, kind, loving, God-fearing, and faithful man, and every day I found myself growing more certain that God had brought us together for His purpose.",
          "As our time together came to an end, the 19th of February became one of the most emotional days of our journey. His family, friends, and I accompanied Joash to the airport as he returned to Australia. Having felt like we had known each other forever, saying goodbye after only sixteen days together was incredibly difficult. Though he was leaving physically, he remained in my heart and mind. I had consciously chosen him as my life partner, and we left the airport holding on to one hope: that in God's perfect time, He would bring us together again.",
          "Later in 2025, we began premarital counselling over Zoom with our pastor, who recommended the book I Married You by Walter Trobisch. Toward the end of the year, Joash surprised me with a copy, with handwritten notes tucked into its pages, and asked me to read it from beginning to end.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "On our way back to Nairobi, I asked Abigael to officially become my courtship partner. She said yes — she had chosen me too. We were entering a more intimate phase, so we established boundaries for this chapter, choosing patience and faithfulness even in our smaller engagements. It had been barely three weeks since we'd met in person, but I felt a quiet assurance that God was leading us to this moment. It was time for me to go back to Australia, and this was truly a difficult moment for us. I remember our last family dinner before I left — the table was quiet, both of us reminiscing over how wonderful our short time together had been. At the airport, I took my mother aside and whispered to her, \"Take care of her for me. We have loved each other.\"",
          "Later, Abigael and I began premarital counselling with our pastor, and these sessions turned out to be a defining moment for us — our eyes were opened to see marriage for its true purpose, not just its novelty. A book called I Married You was recommended to us, which would go on to become the very book I used to propose to Abigael.",
        ],
      },
    ],
  },
  {
    id: "engagement",
    index: "06.",
    dateLabel: "December 2025",
    title: "The engagement",
    tone: "dusk",
    image: {
      src: "/images/img4.jpg",
      alt: "Joash and Abigail dressed for a celebration, smiling together",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "On the 30th of December 2025, I reached the final page of I Married You. Joash had given me one special instruction — do not open the last page until you have read every page before it. The book was so inspiring, filled with sticky notes carrying beautiful promises and heartfelt commitments for our future, that I could not stop reading. I finished the entire book in a single day.",
          "Then I turned to the final page. Waiting for me was the greatest surprise I had ever imagined — a heartfelt marriage proposal. With tears of joy and a heart already deeply in love, I said a big, joyful \"Yes!\" It was the most creative and memorable engagement I could have ever asked for. From that beautiful moment, we began planning our wedding for the 6th of September 2026, and today I look forward to walking down the aisle to the man I chose.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "It was the close of the year 2025, and I had a deep conviction that it was time. Abigael and I had basically been in a long-distance courtship for some time, and the idea came to me one night. I woke up and immediately picked up I Married You by Walter Trobisch, a book I had just finished reading and resonated deeply with. I began writing sticky notes on its most significant pages, connecting the author's experiences with our own. Toward the end of the book, I declared my commitment to take our relationship to the next level, and finished it by writing a marriage proposal on the very last page — with instructions that Abigael could only read from beginning to end, never skipping ahead.",
          "I was pleasantly surprised when Abigael told me she had finished reading the book just a day after receiving it. But most importantly — she said yes. We immediately set the wedding date for the 6th of September 2026. This is the day the Lord has made; we will rejoice and be glad in it.",
        ],
      },
    ],
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
