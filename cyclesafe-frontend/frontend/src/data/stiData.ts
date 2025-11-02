// src/data/stiData.ts
export interface STIData {
  id: number;
  name: string;
  description: string;
  moreInfo: string;
}

export const stiData: STIData[] = [
  {
    id: 1,
    name: "HIV / AIDS",
    description:
      "A viral infection that weakens the immune system. Regular testing, PrEP, and ART treatments are key to prevention and management.",
    moreInfo: "https://www.who.int/news-room/fact-sheets/detail/hiv-aids",
  },
  {
    id: 2,
    name: "Chlamydia",
    description:
      "A common bacterial infection, often asymptomatic but can lead to infertility if untreated. Easily cured with antibiotics.",
    moreInfo: "https://www.cdc.gov/std/chlamydia/stdfact-chlamydia.htm",
  },
  {
    id: 3,
    name: "Gonorrhea",
    description:
      "A bacterial infection transmitted through sexual contact. Some strains are antibiotic resistant, so prompt treatment is vital.",
    moreInfo: "https://www.mayoclinic.org/diseases-conditions/gonorrhea/symptoms-causes/syc-20351774",
  },
  {
    id: 4,
    name: "Syphilis",
    description:
      "A multi-stage bacterial infection that can cause severe health issues if untreated. Early detection ensures full recovery.",
    moreInfo: "https://www.cdc.gov/std/syphilis/stdfact-syphilis.htm",
  },
  {
    id: 5,
    name: "HPV",
    description:
      "The most common viral STI. Certain strains can cause cancer — vaccination and regular screening are recommended.",
    moreInfo: "https://www.who.int/news-room/fact-sheets/detail/human-papillomavirus-(hpv)-and-cervical-cancer",
  },
  {
    id: 6,
    name: "Herpes (HSV)",
    description:
      "A viral infection causing recurrent sores. While incurable, antivirals can manage symptoms and reduce transmission.",
    moreInfo: "https://www.cdc.gov/std/herpes/stdfact-herpes.htm",
  },
  {
    id: 7,
    name: "Trichomoniasis",
    description:
      "A curable infection caused by a parasite. Common but often asymptomatic — testing and treatment are simple and effective.",
    moreInfo: "https://www.who.int/news-room/fact-sheets/detail/trichomoniasis",
  },
  {
    id: 8,
    name: "Hepatitis B",
    description:
      "A liver infection caused by the Hepatitis B virus. Preventable through vaccination and safe sex practices.",
    moreInfo: "https://www.cdc.gov/hepatitis/hbv/index.htm",
  },
];
