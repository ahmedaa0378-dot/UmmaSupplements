/*
  Generated imagery and films, hosted on Higgsfield for now. Move these to Supabase Storage
  when it is connected and update the URLs here (or in the admin portal later).
  The lifestyle images are AI-generated models, not customers.
*/
const gen = "https://d8j0ntlcm91z4.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/";
const up = "https://d2ol7oe51mr4n9.cloudfront.net/user_3ERuOLOcSAKrbtluQTkpx3uZlfE/";

export const media = {
  // Hero background: jar on a stone plinth, leaf shadows moving. No people.
  heroVideo: up + "939ba24a-7ab1-471c-89c5-985b05a817f6.mp4",
  heroPoster: up + "5da6b2eb-2e67-4cf2-9abe-868d3386d9dd.jpg",

  // Daily ritual films
  ritual1: up + "58b1b798-b2dc-439f-a09e-9e3875cfa136.mp4",
  ritual2: up + "e828905c-766e-40ab-960a-c1448e94c3bb.mp4",
  ritual3: up + "6ad5ea70-659b-4ea1-a77c-788ddbbbdd02.mp4",

  // Benefit and lifestyle images
  skin: gen + "hf_20261121_224330_cbbddd60-4e25-412d-963c-fc32c438d05b.png",
  hair: gen + "hf_20261121_224252_7a32f2ca-2bbc-4071-a608-ac351487d9a7.png",
  nails: gen + "hf_20261121_224330_25c1d54c-96ec-420b-99fd-bdb56aa02535.png",
  joints: gen + "hf_20261121_224252_699bb583-2601-42b4-b839-ce87f9e28d68.png",
  family: gen + "hf_20261121_224330_851b11d5-a346-4490-adff-37f197a1e508.png",

  // Collagen gallery
  scoopJar: gen + "hf_20261121_221107_c47c686b-aacf-480a-aec9-9e85477eeba4.png",
  chai: gen + "hf_20261121_221107_ab31a37b-ce91-4af5-a7a2-185378280a9e.png",
  womanJar: gen + "hf_20261121_221106_a6703fda-7f78-4b83-86ce-5e5a8da5879f.png",
  powder: gen + "hf_20261121_224452_4b1573bc-34e6-452a-9343-61566049a4c2.png",

  // Other products
  gelatinDessert: gen + "hf_20261121_224451_2640dba5-c389-4545-9af1-76e1ad4d3452.png",
  gelatinBloom: gen + "hf_20261121_224452_95162f6e-7d6e-4bc3-9f28-673def4ba0d0.png",
  hennaPaste: gen + "hf_20261121_224253_8bf12757-38a5-4d80-bca0-30b2aaed4ba7.png",
  hennaPowder: gen + "hf_20261121_224252_5dfefd87-ffcd-4fe7-b7d3-0e494fad9b70.png",
  multaniPaste: gen + "hf_20261121_224453_898eeef0-0124-465d-a3f0-8e9aad9ae72e.png",
};
