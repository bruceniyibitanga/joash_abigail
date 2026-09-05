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
  /** Verbatim excerpt from the couple's own story — never paraphrased. */
  body: string;
  /** Whose words `body` quotes. */
  voice: string;
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
  bride: "Abigael",
  groom: "Joash",
  displayName: "Joash & Abigael",
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
  src: "https://lh3.googleusercontent.com/pw/AP1GczMcKV54Cgdb0x9dauwz8X9K-X3R3sI4tYTnm26RgReIQqexyJpChgU032MotygmzeiopfEqsJrg6M1oFHWQlANCPJ42QO3xIZZmJTGtmXZquJJWlyfOnK56DkddvMlVDOBDLD_dEYIcy1-4lt42725oMw=w1155-h1738-s-no-gm?authuser=0",
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
  body: "This is our story. A story that needs to be told. A story that needs to be heard. It's a testimony of what God can do, when you trust Him with one of the most important decisions you will ever make.",
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "met",
    index: "01.",
    date: "February 2023",
    title: "How we met",
    voice: "Abigael",
    body: "On the 12th of February 2023, a simple message from Joash appeared on my phone. He introduced himself and shared why he had reached out. Little did I know that this ordinary message would become the first page of a beautiful story God had already begun writing.",
    tone: "ember",
    image: {
      src: "/images/img1.jpg",
      alt: "Joash and Abigael on a hillside beneath the wind turbines",
    },
  },
  {
    id: "grew",
    index: "02.",
    date: "2023 – 2024",
    title: "Growing together",
    voice: "Abigael",
    body: "It is by God's grace that we made it this far. We intentionally worked through our communication challenges. We learnt to express our fears honestly, listen carefully, and trust each other despite the miles between us. This lasted the whole of 2024.",
    tone: "clay",
    image: {
      src: "/images/img2.jpg",
      alt: "Joash and Abigael travelling together by train",
    },
  },
  {
    id: "yes",
    index: "03.",
    date: "December 2025",
    title: "The promise",
    voice: "Abigael",
    body: "Waiting for me was the greatest surprise I had ever imagined — a heartfelt marriage proposal. With tears of joy and a heart already deeply in love with my J, I said a big, joyful \"Yes!\" It was the most creative and memorable engagement I could have ever asked for.",
    tone: "dusk",
    image: {
      src: "/images/img4.jpg",
      alt: "Joash and Abigael dressed for a celebration, smiling together",
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
  body: "This is our story. A story that needs to be told. A story that needs to be heard. It's a testimony of what God can do, when you trust Him with one of the most important decisions you will ever make. This is the story of Abigael & Joash…",
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
      alt: "Joash and Abigael sitting together outdoors",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "In January 2023, a mutual friend asked if he could introduce Joash and I by sharing my contact. I hesitated for a while because that was not my focus at that time. Also, relationships are such a big step in life so I was really cautious to start the first one, but after praying with one of my girlfriends, I found peace and agreed to share my contact on the 10th of February after praying and fasting because I wanted to start with God.",
          "On the 12th of February 2023, a simple message from Joash appeared on my phone. He introduced himself and shared why he had reached out. Little did I know that this ordinary message would become the first page of a beautiful story God had already begun writing.",
          "From that day, our friendship blossomed through prayer, daily devotions, singing hymns together, and heartfelt conversations in WhatsApp voice and video calls, we allowed God to lead us one step at a time. Honestly, at this point, as they say, ladies always know when they know that they know that this is the one. This was me.",
          "As our friendship grew, so did the confidence that this journey was worth sharing with those closest to us. I visited Joash's parents, and later shared our friendship with my own parents, bringing this beautiful first phase to a close.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "At the beginning of the year 2023, after much prayer and consideration, I consulted with a very close friend on matters concerning Marriage. It had been one year since I moved from my home country Kenya to Australia to pursue further studies. I trusted him to help me with the search. Having travelled to a completely new country, I was still seeking God to know His will. Would my better half come from across the border or from my roots? I left it in God's hands.",
          "A few weeks later, I receive a call from my friend. He tells me that he is positive he found the one. Her name is Abigael. \"So quick!!!\" I thought to myself. \"But there is one problem,\" he says. \"She is a bit hesitant about sharing her contacts with you.\" So we gave it a few days, and she finally agreed to share her contacts with a few pictures. \"Very modest and simple in dress,\" I thought to myself as I looked at the pictures.",
          "On the 12th February 2023, I finally reached out to Abigael and introduced myself. I remember that first conversation like it was yesterday! One thing that stood out to me was how fast we were able to connect even though we were using different networks from different physical locations. There was definitely something special here. Our age difference threw me back a little bit, but she made it up with her thoughtful and mature ways of engagement. We prayed together, sang together, and exchanged our thoughts on marriage and the principles of making a true Adventist Home. Looking back, I thank God for the distance that existed between myself and Abigael at this stage of the relationship. It took away the danger of physical intimacy, which many young people fall into too early in their relationships. Most importantly, it made us learn to trust in God's guidance more than our own judgement. The verse \"for we live by faith and not by sight\" became a reality for us.",
          "A few months into our conversations, Abigael had a chance to meet my family members and spend some time with them. I also suggested that she tell her parents about our intentional friendship, for this was the right thing to do. Her willingness to do this confirmed to me that she was truly committed and serious about our blossoming relationship. This was the introduction phase.",
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
    image: {
      src: "https://lh3.googleusercontent.com/pw/AP1GczMCE57Gtu7ZQjJ9MyDJHwDz-1FJeirqY4OlVp1LY7P1SqUJ2nIsr_TTycIVqEbTv6KuO5322Q-5RvWYQLwUKFEV_K_trmCJgmQIAmSlgROPqkmuAWdgu1O4SqCEyryVfwi6YlvL5EZc3NqXtUH5hdx_9w=w1158-h1738-s-no-gm?authuser=0",
      alt: "Joash and Abigael in green grass field"
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "Like every meaningful relationship, in phase two we experienced seasons that tested us. Distance, misunderstandings, and communication challenges became opportunities for growth, patience, and dependence on God. As I said earlier, I had already made up my mind that Joash was the one. I was so excited to see our relationship grow, and telling our parents about it felt like a beautiful step forward.",
          "Soon after, our communication became less frequent. I kept asking myself whether I had done something wrong, but I could find no answer. I would cry most of the time, and I could not imagine losing this first relationship that I had already invested emotionally in, to the point of informing my parents. Even then, I held on to the belief that if God was in our story, He would lead us through it. Before I could give it all up, I called our Eliezer, shared my heart, and later resolved to pray for ten days. On the seventh day, after speaking with our mutual friend, I felt impressed to call Joash. He asked if the silence had affected me. I admitted that it surely did, and he sincerely apologized, explained his silence, and that honest conversation marked the beginning of restoration. This season taught us that love is strengthened by grace, honest communication, and clear expectations.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "This turned out to be the most trying phase of our relationship. As the initial excitement of getting to know each other was slowly fading away, Abigael and I had to deal with the realities of distance, communication, and alignment of expectations. Even though I still felt that there was something special about this relationship, I was treading carefully, for I did not want to be part of the congregation that delights in the trifling of other people's hearts. So when things began to move faster than I had expected, I developed cold feet. Juggling between work and school, I had the perfect excuse to disappear. However, I was wrong in thinking that, by simply going quiet without notice, I would just make things go away. It took me two months before I reached out to Abigael again, and that with additional mediation by my close friend. It is another day that I vividly recall. It was a hard and lengthy conversation. I had put her through a lot of emotional turmoil. I sincerely apologised and promised to make things right again. I was pleasantly surprised that Abigael was still willing to work on the relationship. It seemed like she could still see through the tears. Though albeit dim, she could see some light at the end of the tunnel. One positive lesson that we both learnt in this phase is the importance of setting clear expectations at every stage of the relationship. The first step towards setting clear expectations is being open and honest with one another. Coming out of this phase felt like we had just come out of a storm. So I called it the storming phase.",
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
    image: {
      src: "https://lh3.googleusercontent.com/pw/AP1GczOS3ijIcEpfrAITwy-Z-LKcMvDgzdPbnDow7rCZs52L4LKq8GKWY4D47d6FvyanbYDoAfkHheuuhZFAWF3_IV_vfziHk7cTK3ZEQwRpEFGqHDU5GUBpLEUx4ZJc3sgsfWLqVCjJhkFT0dAhNGJhzGUQ6A=w1158-h1738-s-no-gm?authuser=0",
      alt: "Joash and Abigael in a park"
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "It is by God's grace that we made it this far. We intentionally worked through our communication challenges. We learnt to express our fears honestly, listen carefully, and trust each other despite the miles between us. Though we could not see each other in person, our friendship continued to grow stronger. This lasted the whole of 2024. We learnt to be more intentional, honest and open to one another.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "Abigael and I were now ready to explore the most exciting phase before we had the chance to physically meet up. I called this stage the Norming Phase. With clearly set expectations and boundaries, things began to normalize. Because of our time zone differences, we even set the expectation for the number of times we would call each other every week and how long the calls should be. We were very intentional with every interaction. Slowly but surely, our communication was improving. Our trust in each other was also growing rapidly. We quickly learnt that long-distance relationships can only work when there is absolute honesty and trust.",
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
      alt: "Joash and Abigael on a hillside beneath the wind turbines",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "Phase Four was my favourite chapter, the chapter we had prayed and waited for…On Monday, 3rd February 2025, after nearly two years of friendship, we finally saw each other face to face for the very first time. It was a moment I'll never forget. We even recorded our first video together, a sweet memory that still brings a smile to my face. The next few days would be spent at Ngong Hills, where we honestly shared our strengths, weaknesses, fears, and the reasons we believed God was leading us toward marriage. We reflected on our past journeys and everything God had taught us through our long-distance friendship. To this day, I believe Ngong Hills holds some of our sweetest memories. We travelled to my home, and on the 8th of February, Joash met my parents, another beautiful milestone in our journey.",
          "On the 13th of February, we travelled to Mombasa with our friends, a fellow couple, where we intentionally answered every question we had written down for each other. The following day, we explored the beauty of Mombasa, talked until nearly 3:00 a.m., and created memories we'll cherish forever. Sabbath came and we worshipped together in church.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "After much prayer and consideration, I was affirmed in my decision to travel back to Kenya to meet with Abigael for the very first time. I prayed and asked God to open the way and provide the means for me to travel back home. I also asked for the assurance that this was the right step to take. Through God's providence, I managed to secure a flight ticket for half the market price. This, to me, was the assurance I was looking for. I travelled back home with much anticipation. I still recall that first day that we met physically. I could see the anxiety written all over Abigael's face. Actually, we were both anxious. We couldn't even eat that morning. However, we were so excited to finally meet each other after nearly two years of waiting. Since my stay in Kenya was only for a short while, we had to make each moment count. We also needed to know each other more so that we could affirm our decision to proceed or not to proceed. We spent much of our initial days in Ngong Hills pouring out our hearts to each other. It was clear to me that our values and principles on marriage were perfectly aligned.",
          "Meeting Abigael's parents for the first time was also a very interesting experience. To affirm our decisions further, we travelled to Mombasa by train. Abigael and I had agreed to write down all the questions we had for each other, and we would try to answer all of them during the five-hour journey to Mombasa. It was a thrilling experience. However, I was still praying for God to give me a clear sign. This prayer would be answered while in Mombasa, when Abigael and I had a little altercation. I saw how she handled the reconciliation process, and this affirmed me in my decision.",
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
      alt: "Joash and Abigael travelling together by train",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "Phase Five marked the beginning of our courtship. On the 16th of February 2025, as we travelled back from Mombasa on the Premium SGR, Joash asked me to be his courtship partner. With all my heart, I said a big \"Yes!\" Tears of joy filled my eyes as we dedicated our courtship to the Lord right there on the train. I couldn't believe how faithfully God had led us to that moment. By then, I had come to know Joash as a caring, kind, loving, God-fearing, and faithful man. Every day, I found myself growing in love and in the quiet assurance that God had brought us together for His purpose.",
          "As our time together came to an end, the 19th of February 2025 became one of the most emotional days of our journey. His family, friends, and I accompanied Joash to the airport as he returned to Australia. Having felt like we had known each other forever, saying goodbye after only sixteen days together was incredibly difficult. As he checked in, I could no longer hold back my tears. Though he was physically leaving, he remained in my heart and in my mind. I had consciously chosen him as my life partner, and we left the airport holding on to one hope: that in God's perfect time, He would bring us together again. AMEN.",
          "Later in 2025, we began Zoom premarital counseling with our pastor, who recommended the book I Married You by Walter Trobisch. Towards the end of the year, Joash surprised me with a copy of the book, placing handwritten notes on different pages and asking me to read it from beginning to end.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "On our way back to Nairobi, I asked Abigael to become my courtship partner officially. She said YES! She had chosen me as well! We were now entering into a more intimate phase, so we had to establish boundaries for this chapter. We had to be patient and faithful even in our little engagements. It was barely 3 weeks since we had met, but I could feel a sense of quiet assurance that God was leading, and that He had brought us to this moment. I chose her. It was time for me to go back to Australia. This was truly a difficult moment for us. I remember the last dinner that we had with family just before my departure. The table was quiet. Abigael and I were both reminiscing about how wonderful our time together was, even though it was a short while. At the airport, I took my mom aside and whispered to her ear, saying, \"Take care of her for me. We have loved each other!\"",
          "Later, Abigael and I decided to take pre-marital counselling sessions with our Pastor. These counselling sessions turned out to be a defining moment in our relationship. Our eyes were opened such that we began to see Marriage for its true purpose, not just for its novelty. A book called \"I Married You\" was recommended to us by the Pastor, which turned out to be the book I would use to make a marriage proposal to Abigael.",
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
      alt: "Joash and Abigael dressed for a celebration, smiling together",
    },
    voices: [
      {
        name: "Abigael",
        paragraphs: [
          "On 30th December 2025, I reached the final page of I Married You. Joash had given me one special instruction: do not open the last page until you have read every page before it. The book was so inspiring, and the sticky notes he had placed throughout it were filled with beautiful promises and heartfelt commitments for our future. I became so curious that I could not stop reading, and I finished the entire book in just one day.",
          "Then I turned to the final page.",
          "Waiting for me was the greatest surprise I had ever imagined - a heartfelt marriage proposal. With tears of joy and a heart already deeply in love with my J, I said a big, joyful \"Yes!\" It was the most creative and memorable engagement I could have ever asked for.",
          "From that beautiful moment, we began planning our wedding on 6th September 2026, and today I look forward to walking down the aisle to the man I chose.",
        ],
      },
      {
        name: "Joash",
        paragraphs: [
          "It was the close of the year 2025, and I had a deep conviction that it was time. Abigael and I had basically been in a 'long-distance Courtship' for some time. I had this brilliant idea come to mind at night. I woke up and immediately picked up the book \"I Married You\" by Walter Trobisch. I had just finished reading this book, and I resonated much with the experiences of the author. I began writing sticky notes on significant parts of the book, connecting the experiences of the author with the experiences that Abigael and I had together. Towards the end of the book, I declared my commitment to take our relationship to the next level, and finished the book by writing a marriage proposal on the last page. The instructions for Abigael, as she read through this book, were that she could only read from beginning to end and not the other way around. I was pleasantly surprised when Abigael told me that she had finished reading the book just a day after she received it from overseas. But most importantly, SHE SAID YES!!.. We immediately set up the date for the wedding as September 6th, 2026. This is the day the Lord has made! We will rejoice and be glad in it!!!..",
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
        id: "singing",
        time: "10:30",
        title: "Singing Session",
        body: "A time of congregational praise and worship",
      },
      {
        id: "processional",
        time: "11:00",
        title: "Processional",
        body: "Bridal party entry/processional",
      },
      {
        id: "sermon",
        time: "12:00",
        title: "Wedding Sermon",
        body: "A message from the Bible on the covenant we are about to make.",
      },
      {
        id: "vows",
        time: "12:30",
        title: "Marriage Vows",
        body: "Vows made by bride and groom",
      },
      {
        id: "register",
        time: "12:40",
        title: "Signing of the register",
        body: "The paperwork, made joyful by the people watching it happen.",
      },
      {
        id: "music",
        time: "1:00",
        title: "Special Music",
        body: "A time of special music by different singing groups",
      },
      {
        id: "recessional",
        time: "1:30",
        title: "Recessional",
        body: "Bride and groom exit the church",
      }
    ],
  },
  {
    id: "photos",
    label: "Photo Session",
    venue: "Jakin Gardens",
    window: "2:00 PM — 3:00 PM",
    events: [
      {
        id: "photo",
        time: "2:00",
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
        time: "3:00",
        title: "Welcome & grace",
        body: "Guests are seated, the couple is received, and we give thanks before we eat.",
        location: "Jakin Gardens",
      },
      {
        id: "meal",
        time: "3:15",
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
      alt: "Joash and Abigael sitting together on the grass outdoors",
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
