import type { StaticImageData } from "next/image";
import diwaliLamps from "../assets/about-india/diwali-lamps.jpg";
import durgaPuja from "../assets/about-india/durga-puja.jpg";
import flagOfIndia from "../assets/about-india/flag-of-india.svg";
import holi from "../assets/about-india/holi.jpg";
import janmashtami from "../assets/about-india/janmashtami.jpg";
import lionCapital from "../assets/about-india/lion-capital-sarnath.jpg";
import onamBoatRace from "../assets/about-india/onam-boat-race.jpg";
import pongal from "../assets/about-india/pongal.jpg";
import republicDay from "../assets/about-india/republic-day-parade.jpg";
import type { StaticPageContent } from "./static-page-content";

interface PhotoCredit {
  work: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

interface FestivalPhoto {
  title: string;
  alt: string;
  src: StaticImageData;
  credit: PhotoCredit;
}

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

const LION_CAPITAL_CREDIT: PhotoCredit = {
  work: "Lion capital of Ashoka, Sarnath",
  author: "lisa bat",
  license: "CC BY 2.0",
  licenseUrl: CC_BY_2,
  sourceUrl: `${COMMONS}Lion_capital_of_Ashoka,_Sarnath.jpg`,
};

export const FESTIVAL_PHOTOS: FestivalPhoto[] = [
  {
    title: "Republic Day",
    alt: "The Karnataka tableau, topped by a craftsman at work, rolling down Rajpath in the 2011 Republic Day parade",
    src: republicDay,
    credit: {
      work: "The Karnataka tableau passes through the Rajpath during the Republic Day Parade, 2011",
      author: "Ministry of Defence, Government of India",
      license: "GODL-India",
      licenseUrl: "https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf",
      sourceUrl: `${COMMONS}The_Karnataka_tableau_passes_through_the_Rajpath_during_the_Republic_Day_Parade,_2011.jpg`,
    },
  },
  {
    title: "Pongal",
    alt: "A brass pot of freshly cooked rice for Pongal, beside lemons, turmeric and a banana",
    src: pongal,
    credit: {
      work: "Ponga soru- Kovai- Tamil Nadu",
      author: "Lohith Aswa M",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}Ponga_soru-_Kovai-_Tamil_Nadu.jpg`,
    },
  },
  {
    title: "Holi",
    alt: "A boy with a pink-colored face holding an orange water pistol during Holi",
    src: holi,
    credit: {
      work: "Holi Festival of Colors",
      author: "Ramesh Lalwani",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl: `${COMMONS}Holi_Festival_of_Colors.jpg`,
    },
  },
  {
    title: "Janmashtami",
    alt: "A crowd at sunset in front of a temple chariot during Janmashtami celebrations at Udupi",
    src: janmashtami,
    credit: {
      work: "Celebrations of Krishna Janmashtami",
      author: "KrishnaKumarKarthik (Dharwad)",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}Celebrations_of_Krishna_Janmashtami.jpg`,
    },
  },
  {
    title: "Onam",
    alt: "Long black snake boats with crews of rowers racing on a Kerala river during Onam",
    src: onamBoatRace,
    credit: {
      work: "Aranmula-boat race- Kerala-India-1",
      author: "Arun Sinha",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl: `${COMMONS}Aranmula-boat_race-_Kerala-India-1.jpg`,
    },
  },
  {
    title: "Durga Puja",
    alt: "Goddess Durga with many arms on her lion, with her children beside her, at a Durga Puja pandal in Kolkata",
    src: durgaPuja,
    credit: {
      work: "2016 Durga Puja Kolkata Shobhabazar Sarbojonin (9)",
      author: "Sumit Surai",
      license: "CC BY-SA 3.0",
      licenseUrl: CC_BY_SA_3,
      sourceUrl: `${COMMONS}2016_Durga_Puja_Kolkata_Shobhabazar_Sarbojonin_(9).jpg`,
    },
  },
  {
    title: "Diwali",
    alt: "Lit clay oil lamps on a bed of rice and coins during Diwali",
    src: diwaliLamps,
    credit: {
      work: "Diwali Oil lamps Darjeeling",
      author: "Benoy",
      license: "CC BY-SA 3.0",
      licenseUrl: CC_BY_SA_3,
      sourceUrl: `${COMMONS}Diwali_Oil_lamps_Darjeeling.jpg`,
    },
  },
];

export const PHOTO_CREDITS: PhotoCredit[] = [
  LION_CAPITAL_CREDIT,
  ...FESTIVAL_PHOTOS.map(({ credit }) => credit),
];

export const INDIA_OVERVIEW: StaticPageContent = {
  title: "About India",
  description:
    "India's land and people, national emblem, flag and national song, plus the public holidays and religious festivals celebrated across the country.",
  images: { flagOfIndia, lionCapital },
  content: `## India: The Land and Its People

India became an independent nation on August 15, 1947, after a long and historic struggle for freedom led by Mahatma Gandhi, India's apostle of truth and non-violence. The Constitution of the Indian Republic came into force on January 26, 1950.

India is a Union of 28 states and 8 union territories. The states are Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Chhattisgarh, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand and West Bengal. The union territories are the Andaman and Nicobar Islands, Chandigarh, Dadra and Nagar Haveli and Daman and Diu, Delhi, Jammu and Kashmir, Ladakh, Lakshadweep and Puducherry.

India, with an area of about 1.3 million square miles, is a subcontinent. The peninsula is separated from mainland Asia by the Himalayas. The country lies about 8 degrees north of the Equator and is surrounded by the Bay of Bengal on the east, the Arabian Sea on the west and the Indian Ocean to the south.

India is one of the most diverse countries in the world. Over thousands of years, settlers, traders and travellers from many lands came to the country and merged with the local population. This explains the rich variety of cultures, languages and traditions found across India.

The Constitution recognizes 22 languages, and many more dialects are spoken. Languages of the Indo-Aryan family, which descend from Sanskrit, are spoken mainly in the north, and Dravidian languages such as Tamil, Telugu, Kannada and Malayalam mainly in the south. Hindi, written in the Devanagari script, is the most widely spoken language: about 44 percent of people gave it as their mother tongue in the 2011 Census. Hindi and English are the official languages of the Union government, and India has no single national language.

*Adapted from a brief courtesy of the Consulate General of India, Chicago.*

## The National Emblem

![The Lion Capital of Ashoka in the Sarnath Museum: four lions back to back above a wheel-decorated abacus and a lotus base](lionCapital)

The National Emblem of India is a replica of the Lion Capital of Sarnath, near Varanasi in Uttar Pradesh. The Lion Capital was erected in the third century BC by Emperor Ashoka to mark the spot where Buddha first proclaimed his gospel of peace and emancipation to the four quarters of the universe. The National Emblem is thus symbolic of contemporary India's reaffirmation of its ancient commitment to world peace and good will.

The four lions (one hidden from view) symbolize power, courage and confidence and rest on a circular abacus. The abacus is girded by four smaller animals, the guardians of the four directions: the lion of the North, the elephant of the East, the horse of the South and the bull of the West. In the original capital, the abacus rests on a lotus in full bloom, exemplifying the fountainhead of life and creative inspiration. The motto *Satyameva Jayate*, inscribed below the emblem in Devanagari script, means "Truth Alone Triumphs."

## The National Flag

![The flag of India: saffron, white and green bands with a navy 24-spoke wheel in the center](flagOfIndia)

The Indian flag was designed as a symbol of freedom. The late Prime Minister Nehru called it a flag not only of freedom for ourselves but a symbol of freedom to all people. Wherever it may go, it will bring a message that India wants to be friends with every country in the world.

The flag is a horizontal tricolor of deep saffron on top, white in the middle and dark green at the bottom, in equal proportions. The ratio of the width to the length of the flag is two to three. In the center of the white band is a wheel in navy blue, the Dharma Chakra, or wheel of law, taken from the Sarnath Lion Capital. Its diameter is about the width of the white band, and it has 24 spokes.

Saffron stands for courage, sacrifice and the spirit of renunciation. White stands for purity and truth. Green stands for faith and fertility, on which all life depends. The Ashoka wheel in the center of the white band is the wheel of law.

## National Song: Vande Mataram

> Vande Mataram, Vande Mataram,
> Sujalaam Suphalaam, Malayaja Sheetalaam,
> Sashya Shyamalaam Mataram
> Vande Mataram.

> Shubhra Jyotsana Pulakita Yamineem
> Phulla Kusumita Druma Dala Shobhineem
> Suhasineem Sumadhura Bhashineem
> Sukhadaam Vardaam Mataram
> Vande Mataram

*Bankim Chandra Chatterjee*

### Translation

I bow to my motherland, endowed with sweet waters, sweet fruits and sweet cooling hilly breezes, enriched with green fields. I bow to my mother-land.

The nights are in ecstasy with the light of the moon. The grass, the petals and the leaves show her utterances, always offering good to all, boons to all. I bow to my mother-land.

## Public Holidays and Religious Festivals

India celebrates festivals of many faiths through the year. See the [calendar](/calendar) for this year's dates.

### National days

- **Republic Day:** January 26 marks the adoption of the Constitution in 1950 and is India's National Day. Celebrations in the state capitals are colorful. In New Delhi, a magnificent parade of the armed forces and civilians is followed by an impressive cultural pageant and a colorful folk-dance festival.
- **Independence Day:** August 15 marks the anniversary of independence in 1947 and is celebrated with due solemnity. The national flag is hoisted and the occasion is marked as a day of dedication.
- **Gandhi Jayanti:** October 2 is the birth anniversary of Mahatma Gandhi, the Father of the Nation. Special prayers are offered at the Gandhi Samadhi at Rajghat, Delhi, and celebrations are held all over the country.
- **Children's Day:** November 14, the birth anniversary of Jawaharlal Nehru, is celebrated throughout the country as Children's Day. Groups of children take part in rallies and cultural programs.

### Hindu festivals

- **Pongal:** A three-day harvest festival, one of the most joyful events in the South. In Tamil Nadu, newly harvested rice is ceremonially cooked. In Karnataka the festival is called Sankranti, and cows and bullocks are gaily decorated and fed on Pongal (a sweet preparation of rice). In the evening, the cattle are led out in procession to the beat of drums and music.
- **Holi:** The most boisterous of all Hindu festivals, observed all over the North. It heralds the end of the cold weather. Men, women and children revel in throwing colored powder and squirting colored water on each other. Greetings and sweets are exchanged.
- **Baisakhi:** The Hindu solar New Year. People bathe in rivers and go to temples to offer *puja* (worship). It is of special significance to Sikhs, because on this day in 1699 Guru Gobind Singh organized them into the *Khalsa*, the brotherhood of man. In Punjab, farmers start harvesting on this day, with great fanfare, and villagers perform the Bhangra folk dance.
- **Janmashtami:** The birth of Lord Krishna, the incarnation of Vishnu and the speaker of the Bhagavad Gita (Song Celestial), is observed all over India. It is celebrated with special splendor at Mathura and Brindavan, where Lord Krishna spent his childhood. Night-long prayers are offered and religious hymns are sung in temples. Scenes from Lord Krishna's early life are enacted.
- **Onam:** Kerala's principal festival, celebrated with great enthusiasm. It is primarily a harvest festival. The most exciting part of the festival is the snake-boat race held at several places in the palm-fringed lagoons.
- **Dussehra and Durga Puja:** Among the most popular of all festivals, it symbolizes the triumph of good over evil. Every region observes this ten-day festival in a special way. In the North, *Ram Lila* recitations and music recall the life of the legendary hero Rama. Large effigies of Ravana, stuffed with firecrackers, explode to the cheers of thousands of spectators. In Kulu, against a backdrop of snow-covered mountains, villagers dressed in their colorful best assemble to take out processions of local deities, accompanied by music on pipes and drums. In Karnataka, Dussehra is celebrated with magnificent pomp and pageantry. In Bengal and the East it is called Durga Puja: images of Goddess Durga are worshipped for four days and, on the last day, taken out in a procession and immersed in a river or the sea.
- **Diwali:** The festival of lights, one of the most beautiful of Indian festivals. It comes about three weeks after Dussehra and celebrates the return of Rama to Ayodhya after his 14-year exile. Countless flickering oil lamps and lights are lit in houses all over the country, making it a night of enchantment. Worship of Lakshmi, the Goddess of wealth, and fireworks and festivities are an essential part of the occasion.

### Festivals of other faiths

- **Mahavir Jayanti:** The anniversary of the birth of Vardhamana Mahavira, the 24th *Tirthankara*, more than 2,500 years ago. The festival attracts pilgrims from all parts of the country to the ancient Jain shrines at Girnar and Palitana in Gujarat.
- **Buddha Purnima:** Marks the birth and enlightenment of Buddha.
- **Guru Nanak Jayanti:** Also known as *Gurupurab*, it is the birth anniversary of Guru Nanak, who founded the Sikh faith. For two days and the nights preceding the festival, the *Granth Sahib* (Holy Book) is read, and on the day of the festival it is taken out in a grand procession. The celebrations at Amritsar are especially impressive.
- **Muharram:** Commemorates the martyrdom of Imam Hussain, grandson of the Prophet Muhammad, and is observed by Shia Muslims, who take out processions of colorfully decorated *Tazias*, paper and bamboo replicas of the martyr's tomb at Karbala in Iraq. The processions are especially impressive at Lucknow. In parts of the South, tiger dancers (men painted over with stripes and wearing tiger masks) lead the procession.
- **Eid al-Adha (Id-Uz-Zuha):** Commemorates the sacrifice of Abraham. Muslims offer prayers all around the country.
- **Eid al-Fitr (Id-Ul-Fitr):** Celebrates the end of Ramadan, the Muslim month of fasting. It is an occasion of feasting and rejoicing. The faithful gather in mosques to pray, and friends and relatives meet to exchange greetings.
- **Good Friday and Easter:** Services and recitals of religious music are held in hundreds of churches all over India on Good Friday. The Christian belief in the resurrection of Christ is celebrated with enthusiasm on Easter by members of the community, and processions are taken out in some parts of the country.
- **Christmas:** Celebrated by Christians and non-Christians with special enthusiasm. The bigger cities like Delhi, Mumbai and Kolkata wear a festive look as Christmas bazaars and festivities are organized.
- **Khordad Sal:** The birth anniversary of the Prophet Zarathustra (Zoroaster), who was born at the beginning of the 1st millennium BC. It is one of the most important Parsi festivals.`,
};
