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
    moreInfo: "https://www.kff.org/global-health-policy/the-global-hiv-aids-epidemic/",
  },

  {
    id: 4,
    name: "Syphilis",
    description:
      "A multi-stage bacterial infection that can cause severe health issues if untreated. Early detection ensures full recovery.",
    moreInfo: "https://www.cdc.gov/std/syphilis/stdfact-syphilis.htm",
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
    moreInfo: "https://www.cdc.gov/std/trichomonas/stdfact-trichomoniasis.htm",
  },
  {
    id: 8,
    name: "Hepatitis B",
    description:
      "A liver infection caused by the Hepatitis B virus. Preventable through vaccination and safe sex practices.",
    moreInfo: "https://www.cdc.gov/hepatitis/hbv/index.htm",
  },
];
