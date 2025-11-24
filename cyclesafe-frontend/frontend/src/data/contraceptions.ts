import type { ContraceptionType } from "../types/types";

export const contraceptions: ContraceptionType[] = [
  {
    id: 1,
    name: "Birth Control Pills",
    description: "Daily hormone pills that prevent ovulation and help regulate menstrual cycles.",
    summary:
      "Birth control pills contain hormones (estrogen and/or progestin) that stop the ovaries from releasing an egg each month. Without an egg, pregnancy cannot happen. The pills also thicken cervical mucus, making it harder for sperm to enter the uterus. Because the hormones stabilize the menstrual cycle, many users experience lighter periods, reduced cramps, and more predictable cycles. Pills must be taken daily to remain effective.",
    image: "/Pills.jpeg",
    moreInfo: "https://youtu.be/7-7ZgVpUQWM",
    definitions: [
      "Ovulation: release of an egg from the ovary.",
      "Hormones: chemicals that control body functions such as mood, growth, and fertility.",
    ],
    ethicalNote:
      "Users should fully understand side effects and should never be pressured by partners or parents into using hormonal contraception.",
    pros: [
      "Highly effective when taken correctly.",
      "Helps regulate periods and reduce menstrual pain.",
      "Can improve acne and reduce heavy bleeding.",
      "Fertility returns quickly after stopping.",
    ],
    cons: [
      "Must be taken at the same time every day.",
      "Possible side effects include nausea, headaches, or mood changes.",
      "Not suitable for smokers over age 35.",
      "Does not offer protection against STIs.",
    ],
  },

  {
    id: 2,
    name: "Intrauterine Device (IUD)",
    description: "A tiny device placed inside the uterus to prevent pregnancy long-term.",
    summary:
      "An IUD is a small T-shaped device placed inside the uterus by a trained professional. Depending on the type, it either releases hormones or uses copper to prevent pregnancy. Both types work by stopping sperm from reaching or fertilizing an egg. Hormonal IUDs also thicken cervical mucus and can lighten periods over time. Copper IUDs create an environment where sperm cannot survive. Once inserted, an IUD can last between 5–12 years depending on the type, making it one of the most effective long-term contraceptives.",
    image: "/Intrauterine.jpeg",
    moreInfo: "https://www.kff.org/womens-health-policy/intrauterine-devices-iuds-access-for-women-in-the-u-s/",
    definitions: [
      "Uterus: the organ where a baby grows during pregnancy.",
      "Insertion: a medical procedure where a device is placed inside the body.",
      "Perforation: rare case where the device pokes the uterine wall.",
    ],
    ethicalNote:
      "Insertion must always be done with clear consent. No one should be forced into using an IUD.",
    pros: [
      "Provides long-term protection for 5–12 years depending on type.",
      "Very low maintenance once inserted.",
      "Fertility returns quickly after removal.",
      "Copper IUD has no hormones.",
    ],
    cons: [
      "Insertion may be painful or uncomfortable.",
      "Possible irregular bleeding after insertion.",
      "Does not prevent STIs.",
      "Rare risk of uterine perforation.",
    ],
  },

  {
    id: 3,
    name: "Condoms",
    description: "A barrier method that stops sperm from entering the vagina.",
    summary:
      "Condoms act as a physical barrier that prevents sperm from entering the vagina. This stops fertilization and dramatically lowers the risk of pregnancy. They are also one of the only contraceptive methods that protect against sexually transmitted infections (STIs). When used correctly and consistently, condoms are highly effective. Condoms come in different sizes, materials, and textures, making them accessible and suitable for nearly everyone.",
    image: "/condom.jpeg",
    moreInfo: "https://youtu.be/hNcDm37yj5Q",
    definitions: [
      "STIs: infections passed from one person to another during sex.",
      "Latex: a stretchy material made from rubber.",
    ],
    ethicalNote:
      "Condom use promotes shared responsibility and also protects both partners’ health.",
    pros: [
      "Protects against both pregnancy and STIs.",
      "Cheap and widely available.",
      "No hormones or medical procedures required.",
      "Easy to carry and use.",
    ],
    cons: [
      "May reduce sensitivity for some users.",
      "Can break or slip if not used correctly.",
      "Must be used every time during sex.",
      "Some people have latex allergies.",
    ],
  },

  {
    id: 4,
    name: "Contraceptive Implant",
    description: "A small rod placed under the skin that releases hormones to prevent pregnancy.",
    summary:
      "The contraceptive implant is a tiny flexible rod inserted under the skin of the upper arm. It releases the hormone progestin in small amounts each day. This prevents ovulation, thickens cervical mucus, and thins the uterine lining—making it extremely difficult for pregnancy to occur. The implant works for 3–5 years and has one of the highest effectiveness rates of all methods. Because it is long-lasting and low-maintenance, many people prefer it over daily or monthly options.",
    image: "/Implant.jpeg",
    moreInfo:
      "https://www.kff.org/womens-health-policy/contraceptive-experiences-coverage-and-preferences-findings-from-the-2024-kff-womens-health-survey/",
    definitions: [
      "Progestin: a hormone used in many contraceptives.",
      "Insertion: a medical procedure where a device is placed under the skin.",
    ],
    ethicalNote:
      "Users should receive full explanation of side effects before insertion.",
    pros: [
      "Very effective for several years.",
      "No daily action required.",
      "Safe for breastfeeding mothers.",
      "Private and discreet.",
    ],
    cons: [
      "Requires a healthcare provider for insertion and removal.",
      "May cause irregular bleeding or spotting.",
      "Does not prevent STIs.",
    ],
  },

  {
    id: 5,
    name: "Contraceptive Injection",
    description: "A hormonal shot taken every three months to prevent pregnancy.",
    summary:
      "The contraceptive injection works by releasing progestin into the body. This stops the ovaries from releasing eggs, thickens cervical mucus, and thins the uterine lining. The injection needs to be repeated every 12 weeks to remain effective. Many users enjoy the convenience because they do not need to remember daily pills. However, missing a scheduled injection can reduce effectiveness.",
    image: "/injection.jpeg",
    moreInfo: "https://youtu.be/MPaR2s776eo",
    definitions: [
      "Progestin: hormone that prevents ovulation.",
      "Cycle: the monthly pattern of menstruation.",
    ],
    ethicalNote:
      "Users must give consent for each repeat injection; no one should be pressured to continue.",
    pros: [
      "Highly effective when injections are taken on schedule.",
      "Only requires attention every 3 months.",
      "Can reduce menstrual pain and bleeding.",
    ],
    cons: [
      "Requires clinic visits or professional injection.",
      "May cause weight gain or mood changes.",
      "Possible delay in return to fertility.",
      "No STI protection.",
    ],
  },

  {
    id: 6,
    name: "Contraceptive Patch",
    description: "A small patch worn on the skin that releases hormones.",
    summary:
      "The contraceptive patch sticks to the skin and releases estrogen and progestin into the bloodstream. These hormones stop ovulation and stabilize the menstrual cycle. The patch is replaced weekly for three weeks, followed by a patch-free week. Users find it convenient because they only need to remember it once a week. It is especially useful for people who struggle with taking daily pills.",
    image: "/patch.jpeg",
    moreInfo: "https://www.plannedparenthood.org/learn/birth-control/birth-control-patch",
    definitions: [
      "Estrogen: a hormone involved in menstrual cycles.",
      "Absorption: how the skin takes in medication through a patch.",
    ],
    ethicalNote:
      "Users should be warned about possible skin irritation and hormone side effects.",
    pros: [
      "Convenient and easy to use.",
      "Only needs to be replaced once a week.",
      "Regulates cycles and reduces cramps.",
    ],
    cons: [
      "May cause skin irritation.",
      "May be less effective for people over 198 pounds (90 kg).",
      "Does not protect against STIs.",
    ],
  },

  {
    id: 7,
    name: "Contraceptive Ring",
    description: "A soft, flexible ring inserted into the vagina that releases hormones.",
    summary:
      "The vaginal ring is a small, bendable device placed inside the vagina. It releases estrogen and progestin which prevent ovulation, stabilize the menstrual cycle, and thicken cervical mucus. Each ring provides protection for one month. Users insert it themselves, leave it in for three weeks, and remove it for a week during menstruation. Many users appreciate its convenience, predictability, and low hormone dose.",
    image: "/Ring.jpeg",
    moreInfo: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6005526/",
    definitions: [
      "Insertion: placing the ring into the vagina.",
      "Hormonal regulation: controlling levels of estrogen and progestin.",
    ],
    ethicalNote:
      "Users should be comfortable with self-insertion; no one should feel pressured by a partner.",
    pros: [
      "Only needs replacement once a month.",
      "Low maintenance.",
      "Can make periods more regular and less painful.",
    ],
    cons: [
      "May cause vaginal irritation.",
      "Requires comfort with self-insertion.",
      "Does not protect against STIs.",
    ],
  },

  {
    id: 8,
    name: "Emergency Contraception",
    description: "Pills taken after unprotected sex to reduce chances of pregnancy.",
    summary:
      "Emergency contraception works primarily by delaying or preventing ovulation, giving sperm no egg to fertilize. It is most effective the sooner it is taken—ideally within 24 hours but still helpful within 3–5 days. EC does not end an existing pregnancy, nor does it harm a developing fetus. It is designed only for emergency use, such as after contraceptive accidents or unprotected sexual activity.",
    image: "/Emergency.png",
    moreInfo: "https://www.kff.org/womens-health-policy/emergency-contraception/",
    definitions: [
      "Unprotected sex: sex without contraception or with contraceptive failure.",
      "Cycle shift: temporary change in menstrual timing.",
    ],
    ethicalNote:
      "EC should not be judged or restricted; it is vital for survivors of sexual assault.",
    pros: [
      "Useful after accidents like condom breakage.",
      "Available over-the-counter in many places.",
    ],
    cons: [
      "Less effective than regular contraception.",
      "May cause nausea, vomiting, or cycle changes.",
      "Does not protect against STIs.",
    ],
  },

  {
    id: 9,
    name: "Sterilization",
    description: "A permanent surgical method to prevent pregnancy.",
    summary:
      "Sterilization is a permanent method for people who are certain they do not want children in the future. For women, the fallopian tubes are sealed or blocked, preventing eggs from meeting sperm. For men, a vasectomy blocks sperm from leaving the body. Both methods are highly effective and require no ongoing maintenance once healed. Because it is permanent, it should be chosen only after careful consideration.",
    image: "/Sterilization.jpeg",
    moreInfo:
      "https://www.kff.org/womens-health-policy/sterilization-or-permanent-contraception-as-a-family-planning-method/",
    definitions: [
      "Permanent: cannot be undone easily.",
      "Surgery: a medical procedure performed in an operating setting.",
    ],
    ethicalNote:
      "Sterilization must always be chosen freely and without pressure from family or partners.",
    pros: [
      "Permanent and highly effective.",
      "No ongoing maintenance required.",
    ],
    cons: [
      "Requires surgery and recovery.",
      "Irreversible in most cases.",
      "Does not protect against STIs.",
    ],
  },

  {
    id: 10,
    name: "Natural Family Planning",
    description: "Observing fertility signs to avoid or achieve pregnancy.",
    summary:
      "Natural family planning requires daily observation of fertility signs such as temperature, cervical mucus patterns, and menstrual timing. Users track these signals to identify fertile days and avoid intercourse or use condoms during that time. With proper education and consistent monitoring, it can be effective, but it requires discipline and strong cooperation between partners.",
    image: "/Natural.jpeg",
    moreInfo: "https://youtu.be/zurYP8yj26U",
    definitions: [
      "Fertile window: days when pregnancy is most likely.",
      "Cervical mucus: natural vaginal fluid that changes during the cycle.",
    ],
    ethicalNote:
      "Works best for couples who communicate clearly and consistently.",
    pros: [
      "No chemicals, hormones, or devices.",
      "Can help users understand their fertility.",
    ],
    cons: [
      "Requires daily tracking and discipline.",
      "Less effective than many modern methods.",
      "Does not protect against STIs.",
    ],
  },

  {
    id: 11,
    name: "Withdrawal Method",
    description: "Removing the penis before ejaculation to avoid pregnancy.",
    summary:
      "The withdrawal method depends on the male partner pulling out before ejaculation. This prevents most sperm from entering the reproductive tract. However, effectiveness is limited because pre-ejaculate may contain sperm and timing can be difficult. Although it is always available and free, it is significantly less reliable than modern contraceptive methods.",
    image: "/Withdrawal.jpeg",
    moreInfo: "https://youtu.be/qOwdupIlQDM",
    definitions: [
      "Ejaculation: release of semen from the penis.",
      "Pre-ejaculate: small amount of fluid released before ejaculation, may contain sperm.",
    ],
    ethicalNote:
      "Requires trust and honest communication between partners.",
    pros: [
      "Free and always available.",
      "No devices or chemicals.",
    ],
    cons: [
      "High failure rate due to timing errors.",
      "Requires strong self-control.",
      "Does not protect against STIs.",
    ],
  },

  {
    id: 12,
    name: "Fertility Awareness Methods",
    description: "Tracking ovulation and menstrual cycles to prevent pregnancy.",
    summary:
      "These methods involve tracking ovulation through temperature, cervical mucus, and counting cycle days. Users identify fertile days and avoid intercourse or use condoms during that time. When used correctly with proper training, these methods can be effective, but mistakes in tracking may reduce accuracy.",
    image: "/Fertility.jpeg",
    moreInfo:
      "https://www.kff.org/womens-health-policy/fertility-awareness-based-methods-to-prevent-pregnancy/",
    definitions: [
      "Basal temperature: body temperature when fully rested.",
      "Ovulation: release of an egg from the ovary.",
    ],
    ethicalNote:
      "Users must receive proper education to use the method effectively.",
    pros: [
      "No hormones or chemicals.",
      "Can help track reproductive health.",
    ],
    cons: [
      "Less effective without perfect tracking.",
      "No STI protection.",
    ],
  },

  {
    id: 13,
    name: "Spermicides",
    description: "Chemicals that disable or kill sperm, often used with condoms.",
    summary:
      "Spermicides are gels, foams, or films inserted into the vagina before sex. They work by blocking the entrance to the cervix and damaging sperm so they cannot reach the egg. While easy to use, spermicides are less effective alone and work best when combined with barrier methods like condoms.",
    image: "/Spermicides.jpeg",
    moreInfo: "https://youtu.be/SshiuWaDI5g",
    definitions: [
      "Spermicide: chemical that kills sperm.",
      "Barrier method: physical method that blocks sperm.",
    ],
    ethicalNote:
      "Often recommended as a backup method rather than used alone.",
    pros: [
      "Easy to use and widely available.",
      "Can be used with condoms for extra protection.",
    ],
    cons: [
      "Less effective when used alone.",
      "May cause irritation for some users.",
      "Does not protect against STIs.",
    ],
  },
];
