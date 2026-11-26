/*
  All site content lives here for now, shaped the way it will be stored in Supabase
  (see supabase/schema.sql). The admin portal will edit these same records.

  Anything marked placeholder: true is not confirmed and must be replaced before launch.
*/
import { media } from "./media";

export type Pack = { id: string; label: string; note?: string; price: number; compareAt?: number };

/*
  A gallery slide is a photo, optionally with a short title and points laid over it.
  A panel slide is a designed card instead: title and points on paper, with the pack beside them.
*/
export type Slide = {
  image: string;
  alt: string;
  title?: string;
  points?: string[];
  fit?: "contain";
  panel?: boolean;
  link?: { href: string; label: string };
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  kind: "Food supplement" | "Food" | "Personal care";
  size: string;
  image: string;
  imageAlt: string;
  tone: string; // the pack colour, used behind the product on cards
  gallery: Slide[];
  packs: Pack[]; // empty = price not set yet
  pricePlaceholder: boolean;
  intro: string;
  facts: { term: string; detail: string }[];
  ingredients: string;
  howTo: string[];
};

const collagenHowTo = [
  "Measure 10 g, which is one level scoop.",
  "Stir it into 250 ml of warm chai, coffee, water, a smoothie or yogurt.",
  "Drink it once a day, at whatever time you will remember.",
];

export const products: Product[] = [
  {
    slug: "collagen",
    name: "Halal Collagen Protein",
    short: "Bovine peptides, types I and III, unflavoured",
    kind: "Food supplement",
    size: "250 g, 25 servings",
    image: media.packBovine,
    imageAlt: "UMMA Halal Collagen Protein, unflavoured, 250 g tub",
    tone: "#0e3b2e",
    gallery: [
      { image: media.packBovine, alt: "UMMA Halal Collagen Protein, unflavoured, 250 g tub" },
      {
        image: media.scoopJar,
        alt: "A level scoop of collagen lifted from the open tub",
        title: "One level scoop, 10 g",
        points: ["25 servings in every tub", "Scoop inside"],
      },
      {
        image: media.chai,
        alt: "A scoop of collagen powder held over a cup of chai",
        title: "Disappears into your chai",
        points: ["Dissolves in hot or cold drinks", "No taste of its own"],
      },
      {
        image: media.panelBovine,
        alt: "UMMA Halal Collagen Protein tub",
        panel: true,
        title: "What's inside",
        points: [
          "Hydrolysed bovine collagen peptides, 100%",
          "Types I and III",
          "10 g in one level scoop",
          "No flavour, no added sugar, no additives",
          "250 g, 25 servings",
        ],
      },
      {
        image: media.panelBovine,
        alt: "UMMA Halal Collagen Protein tub",
        panel: true,
        title: "Certified halal",
        points: ["Bovine collagen from a certified halal supply", "Issuer, certificate number and expiry published in full"],
        link: { href: "#halal", label: "See certificate details" },
      },
      {
        image: media.skin,
        alt: "A woman in a hijab with her eyes closed, hand resting on her cheek",
        title: "What collagen peptides are studied for",
        points: ["Skin hydration and elasticity", "Nail growth", "Joint comfort in active adults"],
      },
      { image: media.womanJar, alt: "A woman in a hijab stirring chai with the UMMA tub on the counter" },
    ],
    packs: [
      { id: "collagen-1", label: "One tub", note: "25 days, ₹72 a day", price: 1800 },
      { id: "collagen-2", label: "Two tubs", note: "50 days, ₹65 a day", price: 3240, compareAt: 3600 },
    ],
    pricePlaceholder: true,
    intro:
      "Collagen is the protein that holds skin, joints, hair and nails together. This is hydrolysed bovine collagen with nothing added, so one scoop disappears into the chai you already drink.",
    facts: [
      { term: "Source", detail: "Bovine" },
      { term: "Collagen", detail: "Types I and III, hydrolysed" },
      { term: "Per scoop", detail: "10 g collagen peptides" },
      { term: "Taste", detail: "None. No added sugar, no additives" },
      { term: "Pack", detail: "250 g, 25 servings" },
    ],
    ingredients: "Hydrolysed bovine collagen peptides (100%).",
    howTo: collagenHowTo,
  },
  {
    slug: "marine-collagen",
    name: "Marine Collagen Peptides",
    short: "Type I, unflavoured",
    kind: "Food supplement",
    size: "250 g, 25 servings",
    image: media.packMarine,
    imageAlt: "UMMA Marine Collagen Peptides, unflavoured, 250 g pouch",
    tone: "#123f3e",
    gallery: [
      { image: media.packMarine, alt: "UMMA Marine Collagen Peptides, unflavoured, 250 g pouch" },
      {
        image: media.chai,
        alt: "A scoop of collagen powder held over a cup of chai",
        title: "Collagen from fish",
        points: ["Mainly type I collagen", "Hydrolysed into peptides", "Unflavoured"],
      },
      {
        image: media.powder,
        alt: "Fine collagen powder in a ceramic bowl with a scoop",
        title: "One scoop a day",
        points: ["10 g in your chai, coffee or water"],
      },
      {
        image: media.panelMarine,
        alt: "UMMA Marine Collagen Peptides pouch",
        panel: true,
        title: "What's inside",
        points: ["Hydrolysed marine collagen peptides, 100%", "Mainly type I, from fish", "10 g in one level scoop", "Unflavoured", "250 g, 25 servings"],
      },
    ],
    packs: [],
    pricePlaceholder: true,
    intro:
      "Collagen peptides from fish, mainly type I. A choice for anyone who prefers marine collagen to bovine. Unflavoured, so it disappears into your drink.",
    facts: [
      { term: "Source", detail: "Fish" },
      { term: "Collagen", detail: "Type I, hydrolysed" },
      { term: "Per scoop", detail: "10 g collagen peptides" },
      { term: "Pack", detail: "250 g, 25 servings" },
    ],
    ingredients: "Hydrolysed marine collagen peptides (type I, from fish).",
    howTo: collagenHowTo,
  },
  {
    slug: "perimenopause-blend",
    name: "Perimenopause Daily Nutrition Blend",
    short: "Daily nutrition blend, café mocha",
    kind: "Food supplement",
    size: "400 g, 20 servings",
    image: media.packPeri,
    imageAlt: "UMMA Perimenopause Daily Nutrition Blend, café mocha, 400 g tub",
    tone: "#5e1f2b",
    gallery: [
      { image: media.packPeri, alt: "UMMA Perimenopause Daily Nutrition Blend, café mocha, 400 g tub" },
      {
        image: media.nails,
        alt: "A woman's hands around a warm cup",
        title: "A warm cup, once a day",
        points: ["Café mocha flavour", "20 servings"],
      },
    ],
    packs: [],
    pricePlaceholder: true,
    intro:
      "A café mocha daily nutrition blend made for women in their forties, the years when the body starts to change. The full formula and ingredient list will be published here before launch.",
    facts: [
      { term: "Flavour", detail: "Café mocha" },
      { term: "Pack", detail: "400 g, 20 servings" },
    ],
    ingredients: "To be published with the final formula.",
    howTo: ["Serving directions will be published with the final formula."],
  },
  {
    slug: "gelatin",
    name: "Halal Gelatin",
    short: "Pure bovine gelatin, unflavoured",
    kind: "Food supplement",
    size: "100 g, 10 servings",
    image: media.packGelatin,
    imageAlt: "UMMA Halal Gelatin, unflavoured, 100 g pouch",
    tone: "#ede4d0",
    gallery: [
      { image: media.packGelatin, alt: "UMMA Halal Gelatin, unflavoured, 100 g pouch" },
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
        points: ["Bovine gelatin", "Unflavoured"],
      },
    ],
    packs: [],
    pricePlaceholder: true,
    intro: "Pure, unflavoured bovine gelatin. Use it in jellies, puddings and home cooking.",
    facts: [
      { term: "Source", detail: "Bovine" },
      { term: "Taste", detail: "Unflavoured" },
      { term: "Pack", detail: "100 g, 10 servings" },
    ],
    ingredients: "Bovine gelatin.",
    howTo: [
      "Sprinkle the gelatin over a little cold water and leave it to swell for 5 minutes.",
      "Warm gently and stir until it dissolves. Do not boil.",
      "Stir into your warm mixture, pour into moulds and chill until set.",
    ],
  },
  {
    slug: "henna",
    name: "Premium Henna Powder",
    short: "For hair, finely milled",
    kind: "Personal care",
    size: "250 g",
    image: media.packHenna,
    imageAlt: "UMMA Premium Henna Powder, 250 g pouch",
    tone: "#474d27",
    gallery: [
      { image: media.packHenna, alt: "UMMA Premium Henna Powder, 250 g pouch" },
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
    ingredients: "Henna (Lawsonia inermis) leaf powder.",
    howTo: [
      "Mix with warm water to a smooth paste.",
      "Apply evenly on clean, dry hair.",
      "Leave for 1 to 3 hours, then rinse thoroughly.",
    ],
  },
  {
    slug: "multani-mitti",
    name: "Multani Mitti",
    short: "Fuller's earth face pack",
    kind: "Personal care",
    size: "250 g",
    image: media.packMultani,
    imageAlt: "UMMA Premium Multani Mitti, fuller's earth, 250 g pouch",
    tone: "#86614a",
    gallery: [
      { image: media.packMultani, alt: "UMMA Premium Multani Mitti, fuller's earth, 250 g pouch" },
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
    ingredients: "Multani mitti (fuller's earth).",
    howTo: [
      "Mix 1 to 2 tablespoons with rose water or plain water to a smooth paste.",
      "Apply evenly on face and neck.",
      "Leave for 10 to 15 minutes, then rinse with water.",
    ],
  },
];

/* Shown in the footer, and linked from the buy box. */
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
    text: "Launch offer: two tubs of collagen for ₹3,240",
    href: "/products/collagen",
  },
  hero: {
    heading: "Looked after, quietly.",
    body: "Pure collagen peptides for the years when your body starts asking for a little more. One unflavoured scoop in your morning chai.",
    primary: { label: "Shop collagen", href: "/products/collagen" },
    note: "From ₹72 a day",
    wide: { video: media.heroFibresWide, poster: media.heroFibresWidePoster },
    tall: { video: media.heroFibresTall, poster: media.heroFibresTallPoster },
    product: { image: media.heroTub, alt: "UMMA Halal Collagen Protein, unflavoured, 250 g tub" },
    alt: "Fine green and gold fibres drift across ivory paper and twist into a slowly turning triple helix behind the tub",
  },
  facts: [
    { value: "10 g", label: "collagen in every scoop" },
    { value: "1", label: "ingredient, nothing added" },
    { value: "0 g", label: "added sugar" },
    { value: "Halal", label: "certified source" },
  ],
  story: {
    stat: "30%",
    statement: "of skin collagen can be lost in the first five years after menopause.",
    source: "Calleja-Agius, Muscat-Baron and Brincat, Menopause International, 2007",
    intro:
      "Collagen is the most abundant protein in the body. The body makes less of it every year from the mid-twenties, and the drop speeds up as oestrogen falls in the forties and fifties.",
    points: [
      {
        title: "Skin",
        body: "Collagen gives the deeper layer of skin its structure. As it falls, skin becomes thinner and loses some of its spring.",
        image: media.skin,
        alt: "A woman in a hijab with her eyes closed, hand resting on her cheek",
      },
      {
        title: "Joints",
        body: "Cartilage, tendons and ligaments are built largely from collagen. They take the load of every stair and every errand.",
        image: media.joints,
        alt: "A woman in a hijab walking briskly through a park",
      },
      {
        title: "Hair and nails",
        body: "Both grow from collagen-rich skin. Nails are often the first place women notice a change.",
        image: media.nails,
        alt: "A woman's hands around a cup of chai",
      },
    ],
    bridge:
      "Your body builds collagen from the protein you eat. Collagen peptides give it those building blocks in a form that dissolves in a cup of chai.",
  },
  research: {
    heading: "What the studies found",
    body: "Published trials of collagen peptides, summarised plainly. They studied collagen peptides in general, not UMMA's product, and results differ from person to person.",
    studies: [
      {
        stat: "26",
        label: "randomised trials, 1,721 people",
        detail:
          "A 2023 review pooled the trials and found collagen peptides improved skin hydration and elasticity compared with a placebo.",
        source: "Pu et al., Nutrients, 2023",
      },
      {
        stat: "8 weeks",
        label: "69 women aged 35 to 55",
        detail:
          "In a double-blind trial, women taking 2.5 g or 5 g of collagen peptides a day had better skin elasticity than the placebo group.",
        source: "Proksch et al., Skin Pharmacology and Physiology, 2014",
      },
      {
        stat: "12%",
        label: "faster nail growth in 24 weeks",
        detail:
          "25 women took 2.5 g of collagen peptides a day. Nails grew 12% faster and broke 42% less often. The study had no placebo group.",
        source: "Hexsel et al., Journal of Cosmetic Dermatology, 2017",
      },
      {
        stat: "10 g",
        label: "a day for 24 weeks, 147 athletes",
        detail:
          "Active adults without joint disease who took collagen hydrolysate reported less joint discomfort during activity than those on placebo.",
        source: "Clark et al., Current Medical Research and Opinion, 2008",
      },
    ],
    note: "UMMA collagen is a food supplement. It is not intended to diagnose, treat, cure or prevent any disease.",
  },
  ritual: {
    heading: "One scoop, once a day.",
    body: "It has no taste, so it goes into whatever is already in your cup.",
    films: [
      { shot: "A level scoop lifted from the tub.", video: media.ritual1, poster: media.scoopJar },
      { shot: "The scoop tipped into a cup of warm chai.", video: media.ritual2 },
      { shot: "She stirs, lifts the cup and smiles.", video: media.ritual3 },
    ],
  },
  spotlight: {
    slug: "perimenopause-blend",
    heading: "For the perimenopause years",
    body: "A café mocha daily blend made for women in their forties, when the body starts to change. One warm cup a day.",
    cta: "See the blend",
  },
  banner: {
    heading: "Made for the women who look after everyone else.",
    body: "A small daily habit, shared across the breakfast table.",
    image: media.family,
    alt: "A mother and daughter in hijabs laughing over chai at the breakfast table",
  },
  valuePack: {
    placeholder: true,
    heading: "Two tubs, fifty days.",
    body: "Collagen works as a daily habit, so most people order two. The pair is ₹3,240 instead of ₹3,600, which brings it to ₹65 a day.",
    cta: { label: "Add two tubs to cart", productSlug: "collagen", packId: "collagen-2" },
    image: media.range,
  },
  faq: [
    {
      q: "What is in the tub?",
      a: "Hydrolysed bovine collagen peptides, types I and III, and nothing else. No flavour, no added sugar and no additives.",
    },
    {
      q: "How do I take it?",
      a: "Stir 10 g (one level scoop) into 250 ml of warm chai, coffee, water, a smoothie or yogurt, once a day.",
    },
    {
      q: "How long before I notice anything?",
      a: "The published studies ran for 8 to 24 weeks of daily use, so think in months, not days. Results differ from person to person.",
    },
    {
      q: "Bovine or marine?",
      a: "Both are hydrolysed collagen peptides. Bovine provides types I and III; marine is mainly type I and suits anyone who prefers fish to beef. Choose the one that suits your diet.",
    },
    {
      q: "Is it halal?",
      a: "Yes. The certificate details, including the certifying body and certificate number, are listed at the bottom of every page.",
    },
    {
      q: "Who should ask a doctor first?",
      a: "If you are pregnant, breastfeeding, taking medication or have a medical condition, speak to a healthcare professional before use.",
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
  intro: "The basics, without the jargon: what collagen is, which kind is in the tub and how to take it.",
  sections: [
    {
      id: "what-is-collagen",
      title: "What collagen is",
      image: media.powder,
      alt: "Fine off-white collagen powder in a ceramic bowl",
      body: [
        "Collagen is a structural protein. It makes up roughly a quarter to a third of all the protein in the body and is found in skin, bones, tendons and cartilage.",
        "The body builds its own collagen from the protein you eat, and makes less of it as the years go by. For women, the fall speeds up around menopause.",
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
      title: "Types I and III, bovine or marine",
      image: media.skin,
      alt: "A woman in a hijab with her eyes closed",
      body: [
        "There are many types of collagen. Type I is the most common and is found in skin, bone and tendons. Type III sits alongside it in skin and blood vessels.",
        "Bovine collagen provides types I and III. Marine collagen is mainly type I. Both are hydrolysed peptides; choose the one that suits your diet.",
      ],
    },
    {
      id: "how-to-take",
      title: "How much and how long",
      image: media.scoopJar,
      alt: "A level scoop of collagen lifted from the open tub",
      body: [
        "One 10 g scoop a day is the serving on the pack. Published studies have used between 2.5 g and 10 g a day.",
        "Those studies ran for 8 to 24 weeks, so consistency matters more than timing. Take it whenever you will remember, with or without food.",
      ],
    },
    {
      id: "who-should-check",
      title: "Who should check first",
      image: media.nails,
      alt: "A woman's hands around a cup of chai",
      body: [
        "Collagen is a food protein and was well tolerated in the published trials. If you are pregnant, breastfeeding, taking medication or have a medical condition, speak to a healthcare professional before you start.",
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
  { label: "Collagen", href: "/products/collagen" },
  { label: "Perimenopause", href: "/products/perimenopause-blend" },
  { label: "Collagen guide", href: "/collagen-guide" },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

/* "What to check on any collagen": a buying guide that answers each check for UMMA. */
export const checks = {
  heading: "What to check on any collagen",
  intro: "Four things worth reading on the label before you buy, and how our collagen answers each.",
  rows: [
    {
      check: "Source and type",
      why: "Collagen comes from cattle, fish or pigs, and each gives different collagen types.",
      umma: "Bovine, types I and III. Certified halal.",
      link: { href: "#halal", label: "See certificate details" },
    },
    {
      check: "Dose per serving",
      why: "Published trials have used between 2.5 g and 10 g of collagen peptides a day.",
      umma: "10 g in one level scoop.",
    },
    {
      check: "What else is in the tub",
      why: "Flavours, sweeteners and additives are ingredients you may not want every day.",
      umma: "One ingredient. No flavour, no added sugar, no additives.",
    },
    {
      check: "Form",
      why: "Hydrolysed collagen is broken into short peptides, which dissolve in a drink.",
      umma: "Hydrolysed peptides. Dissolves in hot or cold drinks.",
    },
  ],
};

/* How the body makes collagen, for the guide. Textbook biology, no product claims. */
export const cycle = {
  heading: "How your body makes collagen",
  intro: "Collagen is not absorbed whole. Your body builds it, step by step, from the protein you eat.",
  steps: [
    {
      title: "Protein becomes amino acids",
      body: "Digestion breaks the protein in your food into amino acids. Collagen is rich in three of them: glycine, proline and hydroxyproline.",
    },
    {
      title: "Cells link them into chains",
      body: "Cells called fibroblasts join the amino acids into long chains. Vitamin C is needed for this step.",
    },
    {
      title: "Three chains twist into one",
      body: "Three chains wind around each other into a tight triple helix. This is the collagen molecule.",
    },
    {
      title: "Molecules bundle into fibres",
      body: "The molecules line up into fibres, which give skin, tendons and bone their structure.",
    },
  ],
  note: {
    title: "Pair it with vitamin C",
    body: "Your body needs vitamin C to form collagen. Amla, guava, oranges and lemon are everyday sources.",
  },
};

/* Myth and fact, for the guide. */
export const myths = {
  heading: "Myth and fact",
  items: [
    {
      myth: "Collagen works overnight.",
      fact: "Trials measured changes after eight weeks or more of daily use. Taking it every day matters more than the time of day.",
    },
    {
      myth: "More collagen is better.",
      fact: "Trials used 2.5 g to 10 g a day. One level scoop gives 10 g, so there is no need to take more.",
    },
    {
      myth: "You can only get collagen from supplements.",
      fact: "Your body makes its own from the protein you eat. Meat, fish, eggs, dal and paneer all provide the amino acids it uses.",
    },
    {
      myth: "Collagen stops ageing.",
      fact: "It doesn't. It is a protein, like the protein in your meals. Sleep, sun protection and a varied diet matter just as much.",
    },
  ],
};
