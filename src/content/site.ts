/*
  All site content lives here for now, shaped the way it will be stored in Supabase
  (see supabase/schema.sql). The admin portal will edit these same records.

  Anything marked placeholder: true is not confirmed and must be replaced before launch.
*/

export type Pack = { id: string; label: string; note?: string; price: number; compareAt?: number };

export type Product = {
  slug: string;
  name: string;
  short: string;
  kind: "Food supplement" | "Personal care";
  size: string;
  image: string;
  imageAlt: string;
  portrait: boolean;
  packs: Pack[]; // empty = price not set yet
  pricePlaceholder: boolean;
  intro: string;
  facts: { term: string; detail: string }[];
  ingredients: string;
  howTo: string[];
  heroFilm: string; // shot description for the product film
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
    portrait: false,
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
    heroFilm: "Box reveal: the carton opens, the jar lifts out, the halal mark turns to camera.",
  },
  {
    slug: "halal-gelatin",
    name: "Halal Gelatin",
    short: "Pure bovine gelatin, unflavoured",
    kind: "Food supplement",
    size: "100 g, 10 servings",
    image: "/img/gelatin.webp",
    imageAlt: "UMMA Halal Gelatin pouch, unflavoured, 100 g",
    portrait: true,
    packs: [],
    pricePlaceholder: true,
    intro: "Unflavoured bovine gelatin for desserts, jellies and home cooking, from a halal source.",
    facts: [
      { term: "Source", detail: "100% bovine" },
      { term: "Taste", detail: "Unflavoured" },
      { term: "Pack", detail: "100 g, 10 servings" },
    ],
    ingredients: "Bovine gelatin.",
    howTo: ["Usage directions will be added once the pack text is final."],
    heroFilm: "Gelatin bloomed in a glass bowl, then poured into a dessert mould.",
  },
  {
    slug: "henna-powder",
    name: "Henna Powder",
    short: "Finely milled henna leaf",
    kind: "Personal care",
    size: "250 g",
    image: "/img/henna.webp",
    imageAlt: "UMMA Premium Henna Powder pouch, 250 g",
    portrait: true,
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
    heroFilm: "Henna powder sifted into a bowl, warm water poured in, stirred to a paste.",
  },
  {
    slug: "multani-mitti",
    name: "Multani Mitti",
    short: "Fuller's earth for face and neck",
    kind: "Personal care",
    size: "250 g",
    image: "/img/multani-mitti.webp",
    imageAlt: "UMMA Premium Multani Mitti pouch, 250 g",
    portrait: true,
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
    heroFilm: "Clay and rose water mixed in a small bowl, brushed on the back of a hand.",
  },
];

export const certificate = {
  placeholder: true,
  product: "Halal Collagen Protein",
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
    heading: "Halal collagen you can verify.",
    body: "Unflavoured bovine collagen peptides. The halal certificate is published here in full, with its issuer, number, expiry date and a link to check it yourself.",
    primary: { label: "Shop collagen", href: "/products/halal-collagen" },
    secondary: { label: "See the certificate", href: "/halal" },
    // Films are AI-generated from the real pack photo and hosted on Higgsfield for now.
    // Move them to Supabase Storage when it is connected.
    poster: "https://d2ol7oe51mr4n9.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/06eb989d-d92a-441b-8b5c-0b2e519c5598.jpg",
    video: "https://d2ol7oe51mr4n9.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/526eca9d-f45a-40bc-8e58-eb8d9c250d11.mp4",
    film: "Morning ritual, 8 seconds: a woman in a hijab stirs one scoop into her cup, then sets the jar down with the halal mark facing camera.",
  },
  ritual: {
    heading: "One scoop, once a day.",
    body: "It has no taste, so it goes into whatever is already in your cup.",
    films: [
      { shot: "Close on hands: a level scoop lifted from the jar.", video: "https://d2ol7oe51mr4n9.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/58b1b798-b2dc-439f-a09e-9e3875cfa136.mp4" },
      { shot: "The scoop tipped into a cup of warm chai.", video: "https://d2ol7oe51mr4n9.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/e828905c-766e-40ab-960a-c1448e94c3bb.mp4" },
      { shot: "She stirs, lifts the cup and smiles. Hijab, soft morning light.", video: "https://d2ol7oe51mr4n9.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/6ad5ea70-659b-4ea1-a77c-788ddbbbdd02.mp4" },
    ],
  },
  films: {
    heading: "How it fits into her day",
    body: "Four moments in the day when one scoop fits in.",
    items: [
      { title: "After fajr", shot: "Kitchen counter at dawn, scoop into warm water. Woman, late 30s, hijab." },
      { title: "With morning chai", shot: "Two cups on a tray, she stirs one. Abaya, family home." },
      { title: "At her desk", shot: "Office mug, jar beside a laptop. Woman, 40s, hijab." },
      { title: "In a smoothie", shot: "Blender, fruit, one scoop. Woman, 50s, hijab, daughter beside her." },
    ],
  },
  valuePack: {
    placeholder: true,
    heading: "Two jars, fifty days.",
    body: "Collagen is a daily habit, so most people order two. The pair costs ₹3,240 instead of ₹3,600.",
    cta: { label: "Add two jars to cart", productSlug: "halal-collagen", packId: "collagen-2" },
  },
  faq: [
    {
      q: "Is it halal?",
      a: "Yes. UMMA collagen comes from a halal bovine source. The certificate will be published on this site, with a link to verify it with the certifying body, before we take our first order.",
    },
    {
      q: "What is in the jar?",
      a: "Hydrolysed bovine collagen peptides, types I and III. No flavour, no added sugar and no additives.",
    },
    {
      q: "How do I take it?",
      a: "Stir 10 g (one scoop) into 250 ml of warm water, coffee, a smoothie or yogurt, once a day.",
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
  { label: "Halal promise", href: "/halal" },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
