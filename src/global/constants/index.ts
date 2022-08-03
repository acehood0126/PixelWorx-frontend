import {
  DISCORD,
  WEBSITE,
  GITHUB,
  // FACEBOOK,
  LINKEDIN,
  TWITTER,
} from "./svgs";

export const JobType = [
  "Software Engineering",
  "Web Development",
  "Marketing",
  "Sales",
  "Business Development",
  "Community Management",
  "Others",
];

export const ChainType = [
  "BTC",
  "SOL",
  "ETH",
  "ADA",
  "NEAR",
  "XRP",
  "DOGE",
  "DOT ",
  "DAI",
  "TRX",
  "AVAX",
  "Others",
];

export const PaymentType = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
  "Commissions",
  "Completion basis",
  "Others",
];

export const SocialLinks = [
  {
    name: "Discord",
    key: "discord",
    image: DISCORD,
  },
  {
    name: "Discord ID",
    key: "discordid",
    image: DISCORD,
  },
  // {
  //   name: "Facebook",
  //   key: "facebook",
  //   image: FACEBOOK,
  // },
  {
    name: "Twitter",
    key: "twitter",
    image: TWITTER,
  },
  {
    name: "Linkedin",
    key: "linkedin",
    image: LINKEDIN,
  },
  {
    name: "Github",
    key: "github",
    image: GITHUB,
  },
  {
    name: "Website",
    key: "website",
    image: WEBSITE,
  },
];

export const TimezoneTypes = [
  { name: "(GMT -12:00) Eniwetok, Kwajalein", value: "-12:00" },
  { name: "(GMT -11:00) Midway Island, Samoa", value: "-11:00" },
  { name: "(GMT -10:00) Hawaii", value: "-10:00" },
  { name: "(GMT -9:30) Taiohae", value: "-09:50" },
  { name: "(GMT -9:00) Alaska", value: "-09:00" },
  { name: "(GMT -8:00) Pacific Time (US &amp; Canada)", value: "-08:00" },
  { name: "(GMT -7:00) Mountain Time (US &amp; Canada)", value: "-07:00" },
  {
    name: "(GMT -6:00) Central Time (US &amp; Canada), Mexico City",
    value: "-06:00",
  },
  {
    name: "(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima",
    value: "-05:00",
  },
  { name: "(GMT -4:30) Caracas", value: "-04:50" },
  {
    name: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
    value: "-04:00",
  },
  { name: "(GMT -3:30) Newfoundland", value: "-03:50" },
  { name: "(GMT -3:00) Brazil, Buenos Aires, Georgetown", value: "-03:00" },
  { name: "(GMT -2:00) Mid-Atlantic", value: "-02:00" },
  {
    name: "(GMT -1:00) Azores, Cape Verde Islands",
    value: "-01:00",
  },
  {
    name: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
    value: "+00:00",
  },
  { name: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris", value: "+01:00" },
  { name: "(GMT +2:00) Kaliningrad, South Africa", value: "+02:00" },
  {
    name: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
    value: "+03:00",
  },
  { name: "(GMT +3:30) Tehran", value: "+03:50" },
  { name: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi", value: "+04:00" },
  { name: "(GMT +4:30) Kabul", value: "+04:50" },
  {
    name: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
    value: "+05:00",
  },
  { name: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi", value: "+05:50" },
  { name: "(GMT +5:45) Kathmandu, Pokhara", value: "+05:75" },
  { name: "(GMT +6:00) Almaty, Dhaka, Colombo", value: "+06:00" },
  { name: "(GMT +6:30) Yangon, Mandalay", value: "+06:50" },
  { name: "(GMT +7:00) Bangkok, Hanoi, Jakarta", value: "+07:00" },
  { name: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong", value: "+08:00" },
  { name: "(GMT +8:45) Eucla", value: "+08:75" },
  {
    name: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
    value: "+09:00",
  },
  { name: "(GMT +9:30) Adelaide, Darwin", value: "+09:50" },
  {
    name: "(GMT +10:00) Eastern Australia, Guam, Vladivostok",
    value: "+10:00",
  },
  { name: "(GMT +10:30) Lord Howe Island", value: "+10:50" },
  {
    name: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
    value: "+11:00",
  },
  { name: "(GMT +11:30) Norfolk Island", value: "+11:50" },
  {
    name: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
    value: "+12:00",
  },
  { name: "(GMT +12:45) Chatham Islands", value: "+12:75" },
  { name: "(GMT +13:00) Apia, Nukualofa", value: "+13:00" },
  { name: "(GMT +14:00) Line Islands, Tokelau", value: "+14:00" },
];

export const cardcounts = [
  { name: "4", value: 4 },
  { name: "8", value: 8 },
  { name: "16", value: 16 },
  { name: "40", value: 40 },
];
export const JOB_SEEKER = 1;
export const BUSINESS = 0;
