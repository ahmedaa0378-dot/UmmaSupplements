/*
  All site content lives here for now, shaped the way it will be stored in Supabase
  (see supabase/schema.sql). The admin portal will edit these same records.

  Anything marked placeholder: true is not confirmed and must be replaced before launch.
*/
import { media } from "./media";

export type Pack = { id: string; label: string; note?: string; price: number; compareAt?: number };

/* A gallery slide is a photo, optionally with a short title and points laid over it. */
export type Slide = { image: string; alt: string; title?: string; points?: string[] };

export type Product = {
  slug: string;
  name: string;
  short: string;
  kind: "Food supplement" | "Personal care";
  size: string;
  image: string;
  imageAlt: string;
  gallery: Slide[];
  packs: Pack[]; // empty = price not set yet
  pricePlaceholder: boolean;
  intro: string;
  facts: { term: string; detail: string }[];
  ingredients: string;
  howTo: string[];
};

export const products: Product[] = [
  {
    slug: "halal-collagen",
    name: "Halal Collagen Protein",
    short: "Unflavoured bovine collagen peptides",
    kind: "Food supplement",
    size: "250 g, 25 servings",
    image: "/img/collagen-jar.webp",
    imageAlt: "UMMA Halal Collagen Protein jar, unflavoured, 250 g",
    gallery: [
      { image: "/img/collagen-jar.webp", alt: "UMMA Halal Collagen Protein jar, unflavoured, 250 g" },
      {
        image: media.scoopJar,
        alt: "A level scoop of collagen powder lifted from the open jar",
        title: "One level scoop is 10 g",
        points: ["25 servings in every jar", "Scoop included"],
      },
      {
        image: media.skin,
        alt: "A woman in a cream hijab with her eyes closed, hand resting on her cheek",
        title: "What collagen peptides are studied for",
        points: ["Skin hydration and elasticity", "Nail growth", "Joint comfort in active adults"],
      },
      {
        image: media.chai,
        alt: "A scoop of collagen powder held over a cup of chai",
        title: "Stir it into what you already drink",
        points: ["Chai or coffee", "Warm water", "Smoothies and yogurt"],
      },
      {
        image: media.powder,
        alt: "Fine off-white collagen powder in a ceramic bowl with a scoop",
        title: "Nothing else in the jar",
        points: ["100% bovine collagen peptides", "No flavour", "No added sugar", "No additives"],
      },
      { image: media.womanJar, alt: "A woman in a cream hijab stirring chai, with the UMMA jar on the counter" },
    ],
    packs: [
      { id: "collagen-1", label: "One jar", note: "25 days", price: 1800 },
      { id: "collagen-2", label: "Two jars", note: "50 days", price: 3240, compareAt: 3600 },
    ],
    pricePlaceholder: true,
    intro:
      "Collagen is a protein found in skin, hair, nails and joints. UMMA is hydrolysed bovine collagen with nothing added, so it stirs into what you already drink.",
    facts: [
      { term: "Source", detail: "100% bovine" },
      { term: "Collagen", detail: "Types I and III, hydrolysed" },
      { term: "Taste", detail: "Unflavoured, no sugar added, no additives" },
      { term: "Pack", detail: "250 g, 25 servings" },
    ],
    ingredients: "Hydrolysed bovine collagen peptides (100%).",
    howTo: [
      "Measure 10 g, which is one level scoop.",
      "Add it to 250 ml of warm water, coffee, a smoothie or yogurt.",
      "Stir well and drink. Once a day is enough.",
    ],
  },
  {
    slug: "halal-gelatin",
    name: "Halal Gelatin",
    short: "Pure bovine gelatin, unflavoured",
    kind: "Food supplement",
    size: "100 g, 10 servings",
    image: "/img/gelatin.webp",
    imageAlt: "UMMA Halal Gelatin pouch, unflavoured, 100 g",
    gallery: [
      { image: "/img/gelatin.webp", alt: "UMMA Halal Gelatin pouch, unflavoured, 100 g" },
      {
        image: media.gelatinDessert,
        alt: "Two glass cups of set fruit jelly with pomegranate seeds",
        title: "For jellies, puddings and desserts",
        points: ["Sets clear", "No taste of its own"],
      },
      {
        image: media.gelatinBloom,
        alt: "Gelatin powder blooming in a glass bowl of water",
        title: "One ingredient",
        points: ["100% bovine gelatin", "Unflavoured"],
      },
    ],
    packs: [],
    pricePlaceholder: true,
    intro: "Unflavoured bovine gelatin for desserts, jellies and home cooking.",
    facts: [
      { term: "Source", detail: "100% bovine" },
      { term: "Taste", detail: "Unflavoured" },
      { term: "Pack", detail: "100 g, 10 servings" },
    ],
    ingredients: "Bovine gelatin.",
    howTo: ["Usage directions will be added once the pack text is final."],
  },
  {
    slug: "henna-powder",
    name: "Henna Powder",
    short: "Finely milled henna leaf",
    kind: "Personal care",
    size: "250 g",
    image: "/img/henna.webp",
    imageAlt: "UMMA Premium Henna Powder pouch, 250 g",
    gallery: [
      { image: "/img/henna.webp", alt: "UMMA Premium Henna Powder pouch, 250 g" },
      {
        image: media.hennaPaste,
        alt: "A wooden bowl of smooth henna paste beside henna powder and leaves",
        title: "Mixes to a smooth paste",
        points: ["Add warm water", "Apply on clean, dry hair", "Leave 1 to 3 hours, then rinse"],
      },
      {
        image: media.hennaPowder,
        alt: "Henna powder sifted into a wooden bowl",
        title: "One ingredient",
        points: ["Henna leaf (Lawsonia inermis)", "Finely milled"],
      },
    ],
    packs: [],
    pricePlaceholder: true,
    intro: "Henna leaf, milled fine so it mixes to a smooth paste for hair.",
    facts: [
      { term: "Made from", detail: "Henna leaf (Lawsonia inermis)" },
      { term: "Pack", detail: "250 g" },
    ],
    ingredients: "Pure henna (Lawsonia inermis) leaf powder.",
    howTo: [
      "Mix with warm water to make a smooth paste.",
      "Apply evenly on clean, dry hair.",
      "Leave for 1 to 3 hours, then rinse thoroughly.",
    ],
  },
  {
    slug: "multani-mitti",
    name: "Multani Mitti",
    short: "Fuller's earth for face and neck",
    kind: "Personal care",
    size: "250 g",
    image: "/img/multani-mitti.webp",
    imageAlt: "UMMA Premium Multani Mitti pouch, 250 g",
    gallery: [
      { image: "/img/multani-mitti.webp", alt: "UMMA Premium Multani Mitti pouch, 250 g" },
      {
        image: media.multaniPaste,
        alt: "A bowl of clay paste with a brush, rose petals and rose water",
        title: "A face pack in three steps",
        points: ["Mix with rose water or plain water", "Apply on face and neck", "Rinse after 10 to 15 minutes"],
      },
    ],
    packs: [],
    pricePlaceholder: true,
    intro: "Natural fuller's earth, the clay generations of Indian homes have used as a face pack.",
    facts: [
      { term: "Made from", detail: "Multani mitti (fuller's earth)" },
      { term: "Pack", detail: "250 g" },
    ],
    ingredients: "Natural multani mitti (fuller's earth).",
    howTo: [
      "Mix 1 to 2 tablespoons with rose water or plain water to a smooth paste.",
      "Apply evenly on face and neck.",
      "Leave for 10 to 15 minutes, then rinse with water.",
    ],
  },
];

/* Shown only in the footer. */
export const certificate = {
  placeholder: true,
  issuer: "",
  number: "",
  validUntil: "",
  verifyUrl: "",
};

export const home = {
  announcement: {
    placeholder: true,
    text: "Launch offer: two jars of collagen for ₹3,240. You save ₹360.",
    href: "/products/halal-collagen",
  },
  hero: {
    heading: "Collagen for every day.",
    body: "Unflavoured bovine collagen peptides, types I and III. One scoop stirs into your chai, coffee or water.",
    primary: { label: "Shop collagen", href: "/products/halal-collagen" },
    secondary: { label: "Read the collagen guide", href: "/collagen-guide" },
    poster: media.heroPoster,
    video: media.heroVideo,
    alt: "The UMMA collagen jar on a stone plinth against a green wall, with leaf shadows moving across it",
  },
  benefits: {
    heading: "Where collagen sits in the body",
    body: "Collagen is the most common protein in the body. These are the places people take it for.",
    items: [
      {
        title: "Skin",
        body: "Collagen is the main protein in the skin's deeper layer. Skin hydration and elasticity are the most studied outcomes of collagen peptides.",
        image: media.skin,
        alt: "A woman in a cream hijab with her eyes closed, hand resting on her cheek",
      },
      {
        title: "Hair",
        body: "Hair grows from the skin, which is rich in collagen. Research on collagen and hair is still early, so we make no promises here.",
        image: media.hair,
        alt: "A wooden comb and a folded silk scarf on linen",
      },
      {
        title: "Nails",
        body: "A small study of women with brittle nails saw faster nail growth and fewer broken nails after 24 weeks of collagen peptides.",
        image: media.nails,
        alt: "A woman's hands around a cup of chai",
      },
      {
        title: "Joints",
        body: "Cartilage and tendons are largely collagen. A 24-week trial in active adults found less joint discomfort during activity.",
        image: media.joints,
        alt: "A woman in a hijab walking briskly through a park",
      },
    ],
  },
  research: {
    heading: "What the research says",
    body: "Published studies on collagen peptides, summarised plainly. They tested collagen peptides in general, not UMMA's product, and results differ from person to person.",
    studies: [
      {
        stat: "26 trials",
        label: "1,721 participants",
        detail:
          "A 2023 review pooled 26 randomised controlled trials and found that hydrolysed collagen improved skin hydration and elasticity compared with placebo.",
        source: "Pu et al., Nutrients, 2023",
        url: "https://pubmed.ncbi.nlm.nih.gov/37432180/",
      },
      {
        stat: "8 weeks",
        label: "69 women aged 35 to 55",
        detail:
          "In a double-blind trial, women taking 2.5 g or 5 g of collagen peptides daily had better skin elasticity than the placebo group.",
        source: "Proksch et al., Skin Pharmacology and Physiology, 2014",
        url: "https://pubmed.ncbi.nlm.nih.gov/23949208/",
      },
      {
        stat: "12% faster",
        label: "nail growth over 24 weeks",
        detail:
          "25 participants took 2.5 g of collagen peptides daily. Nails grew 12% faster and broke 42% less often. This study had no placebo group.",
        source: "Hexsel et al., Journal of Cosmetic Dermatology, 2017",
        url: "https://pubmed.ncbi.nlm.nih.gov/28786550/",
      },
      {
        stat: "24 weeks",
        label: "147 athletes, 10 g a day",
        detail:
          "Athletes without joint disease who took collagen hydrolysate reported less activity-related joint discomfort than those on placebo.",
        source: "Clark et al., Current Medical Research and Opinion, 2008",
        url: "https://pubmed.ncbi.nlm.nih.gov/18416885/",
      },
    ],
    note: "This product is a food supplement. It is not intended to diagnose, treat, cure or prevent any disease.",
  },
  ritual: {
    heading: "One scoop, once a day.",
    body: "It has no taste, so it goes into whatever is already in your cup.",
    films: [
      { shot: "Close on hands: a level scoop lifted from the jar.", video: media.ritual1 },
      { shot: "The scoop tipped into a cup of warm chai.", video: media.ritual2 },
      { shot: "She stirs, lifts the cup and smiles.", video: media.ritual3 },
    ],
  },
  banner: {
    heading: "Made for the women who look after everyone else.",
    body: "A small daily habit, shared across the breakfast table.",
    image: media.family,
    alt: "A mother and daughter in hijabs laughing over chai at the breakfast table",
  },
  valuePack: {
    placeholder: true,
    heading: "Two jars, fifty days.",
    body: "Collagen is a daily habit, so most people order two. The pair costs ₹3,240 instead of ₹3,600.",
    cta: { label: "Add two jars to cart", productSlug: "halal-collagen", packId: "collagen-2" },
  },
  faq: [
    {
      q: "What is in the jar?",
      a: "Hydrolysed bovine collagen peptides, types I and III. No flavour, no added sugar and no additives.",
    },
    {
      q: "How do I take it?",
      a: "Stir 10 g (one scoop) into 250 ml of warm water, coffee, a smoothie or yogurt, once a day.",
    },
    {
      q: "How long before I notice anything?",
      a: "The published studies ran for 8 to 24 weeks of daily use, so think in months, not days. Results differ from person to person.",
    },
    {
      q: "Is it halal?",
      a: "Yes. UMMA collagen comes from a halal bovine source. Certificate details are listed at the bottom of every page.",
    },
    {
      q: "Who should ask a doctor first?",
      a: "If you are pregnant, breastfeeding, taking medication or have a medical condition, please speak to a healthcare professional before use.",
    },
    {
      q: "Do you deliver across India, and is cash on delivery available?",
      a: "We will deliver across India. Delivery times and cash on delivery terms will be confirmed here at launch.",
    },
  ],
};

/*
  Reviews come only from customers with a delivered order. Until there are some, the site shows
  the layout with clearly marked sample cards. Never add invented reviews here.
*/
export type Review = { name: string; city: string; rating: number; date: string; title: string; body: string };
export const reviews: { items: Review[] } = { items: [] };

export const guide = {
  heading: "The collagen guide",
  intro: "The basics, without the jargon: what collagen is, which kind is in the jar and how to take it.",
  sections: [
    {
      id: "what-is-collagen",
      title: "What collagen is",
      image: media.powder,
      alt: "Fine off-white collagen powder in a ceramic bowl",
      body: [
        "Collagen is a structural protein. It makes up roughly a quarter to a third of all the protein in the body and is found in skin, bones, tendons and cartilage.",
        "The body builds its own collagen from the protein you eat, and it makes less of it as the years go by. That is why many adults choose to add collagen to their diet.",
      ],
    },
    {
      id: "hydrolysed",
      title: "What hydrolysed means",
      image: media.chai,
      alt: "A scoop of collagen powder held over a cup of chai",
      body: [
        "Whole collagen is a large, tough molecule. Hydrolysing breaks it into short chains called peptides.",
        "Peptides dissolve in hot or cold drinks without clumping, and the body takes them up as amino acids and small peptides. How finely collagen is hydrolysed matters more for absorption than which animal it came from.",
      ],
    },
    {
      id: "types",
      title: "Types I and III",
      image: media.skin,
      alt: "A woman in a cream hijab with her eyes closed",
      body: [
        "There are many types of collagen. Type I is the most common and is found in skin, bone and tendons. Type III sits alongside it in skin and blood vessels.",
        "Bovine collagen, the kind in UMMA, provides types I and III. Marine collagen is mostly type I.",
      ],
    },
    {
      id: "how-to-take",
      title: "How much and how long",
      image: media.scoopJar,
      alt: "A level scoop of collagen powder lifted from the open jar",
      body: [
        "One 10 g scoop a day is the serving on the pack. Published studies have used between 2.5 g and 10 g a day.",
        "Those studies ran for 8 to 24 weeks, so consistency matters more than timing. Take it at whatever point in the day you will remember, with or without food.",
      ],
    },
    {
      id: "who-should-check",
      title: "Who should check first",
      image: media.nails,
      alt: "A woman's hands around a cup of chai",
      body: [
        "Collagen is a food protein and has been well tolerated in published trials. If you are pregnant, breastfeeding, taking medication or have a medical condition, speak to a healthcare professional before you start.",
        "A food supplement does not replace a varied, balanced diet and a healthy lifestyle.",
      ],
    },
  ],
};

export const company = {
  marketedBy: "M/s Ziaam Corporation, Saidabad, Hyderabad 500059",
  phone: "+91 85558 19889",
  whatsapp: "918555819889",
  email: "ziaamcorporation@gmail.com",
  statements: [
    "Food supplement. Not for medicinal use.",
    "Food supplements should not be used as a substitute for a varied and balanced diet and a healthy lifestyle.",
    "Keep out of reach of children.",
  ],
};

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Collagen", href: "/products/halal-collagen" },
  { label: "Collagen guide", href: "/collagen-guide" },
  { label: "Reviews", href: "/#reviews" },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
