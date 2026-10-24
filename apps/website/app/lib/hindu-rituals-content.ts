import kebabCase from "lodash.kebabcase";

import type { StaticPageContent } from "./static-page-content";

interface Ritual {
  question: string;
  answer: string;
}

const createContents = (rituals: Ritual[]) =>
  rituals
    .map(({ question }, index) => `${index + 1}. [${question}](#${kebabCase(question)})`)
    .join("\n");

const createSection = ({ question, answer }: Ritual) => `## ${question}\n\n${answer}`;

const INTRODUCTION = `Hinduism is not only a religion but a way of life. It is known as *Sanaathana Dharma*. According to the Bhagavad Geetha, *sanaathana* means that which cannot be destroyed by fire, weapons, water or air, and which is present in all living and non-living beings. *Dharma* is the way of life: the total of all *aachaaraas*, the customs and rituals.

Sanaathana Dharma has its foundation in scientific spirituality. In ancient Hindu literature, science and spirituality go together. The 40th chapter of the Yajurveda, the Eesaavaasya Upanishad, teaches us to use scientific knowledge to solve the problems of life and spiritual knowledge to attain immortality through a philosophical outlook.

Every *aachaaraa* has a spiritual component, and without spirituality nothing exists in Sanaathana Dharma. Hindu dharma was not created by an individual, prophet or incarnation, so spirituality is part of every custom in the daily life of a Hindu.

*Aachaaraas* are to be followed for the merits we find in them from our own experience. You need not follow a teacher blindly or accept advice without reasoning. They are meant for the prosperity of human beings, and that should be the focus of practicing them.

> Achaaryaath paadam aadatthe
> paadam sishya swamedhayaa
> paadam sa brahmachaaribhya
> sesham kaala kramena cha

This is an important teaching from the *smruthis*. A person gets one quarter of knowledge from the teacher (*achaarya*), one quarter by thinking for themselves, one quarter by discussing with others, and the last quarter over a lifetime, by adding to, removing, correcting and refining the *aachaaraas* already known.

> Aachaaraath labhathe hi ayu:
> aachaaraath dhanamakshayam
> aachaaraath labhathe suprajaa:
> aachaaro ahanthya lakshanam

*Aachaaraas* are followed for psychological and physical health and long life, for prosperity, and for strong family and social bonds. According to the *dharmasaastra*, they also give us a fine personality and a dharmic outlook and vision.

In India, people have followed *aachaaraas* for these psychological, physical, family, social and national benefits. It is your right and your duty to understand the meaning of each one scientifically, rationally and logically, and to follow it systematically in your life.`;

const RITUALS: Ritual[] = [
  {
    question: "Why do we light a lamp?",
    answer: `In almost every Indian home a lamp is lit daily before the altar of the Lord. In some houses it is lit at dawn, in some twice a day, at dawn and dusk, and in a few it is kept burning continuously (*Akhanda Deepa*). All auspicious functions begin with the lighting of a lamp, which is often kept burning through the whole occasion.

Light symbolizes knowledge, and darkness, ignorance. The Lord is the "Knowledge Principle" (*Chaitanya*), the source, enlivener and illuminator of all knowledge. Hence light is worshipped as the Lord himself.

Knowledge removes ignorance just as light removes darkness. Knowledge is also a lasting inner wealth through which all outer achievement is possible. Hence we light the lamp to bow down to knowledge as the greatest of all forms of wealth.

Why not light a bulb or tube light? That too would remove darkness. But the traditional oil lamp has a further spiritual significance. The oil or ghee in the lamp symbolizes our *vaasanas*, or negative tendencies, and the wick, the ego. When lit by spiritual knowledge, the *vaasanas* are slowly exhausted and the ego finally perishes. The flame of a lamp always burns upwards, and in the same way we should acquire the kind of knowledge that takes us toward higher ideals.

While lighting the lamp we pray:

> Deepajyothi parabrahma
> Deepa sarva tamopahaha
> Deepena saadhyate saram
> Sandhyaa deepo namostute

I prostrate to the dawn and dusk lamp, whose light is the Knowledge Principle (the Supreme Lord), which removes the darkness of ignorance and by which all can be achieved in life.`,
  },
  {
    question: "Why do we have a prayer room?",
    answer: `Most Indian homes have a prayer room or altar. A lamp is lit and the Lord is worshipped each day. Other spiritual practices such as *japa* (repeating the Lord's name), meditation, *paaraayana* (reading the scriptures), prayers and devotional singing are also done here. Special worship is done on auspicious occasions like birthdays, anniversaries and festivals. Each member of the family, young or old, communes with and worships the Divine here.

The Lord is the entire creation, and so the true owner of the house we live in. The prayer room is the master room of the house, and we are the earthly occupants of His property. This idea rids us of false pride and possessiveness.

The ideal attitude is to regard the Lord as the true owner of our homes and ourselves as caretakers of His home. If that is difficult, we can at least think of Him as a very welcome guest. Just as we would give an important guest the best comfort, so we welcome the Lord's presence in our homes with a prayer room or altar that is kept clean and well decorated at all times.

The Lord is also all-pervading. To remind us that He lives in our homes with us, we have prayer rooms. Without the grace of the Lord, no task can be accomplished successfully or easily, and we invoke His grace by communing with Him in the prayer room each day and on special occasions.

Each room in a house is dedicated to a function: the bedroom for resting, the drawing room for receiving guests, the kitchen for cooking. The furniture, decor and atmosphere of each room suit its purpose. In the same way, meditation, worship and prayer need a fitting atmosphere, and hence the prayer room.

Sacred thoughts and sound vibrations are believed to fill the place and influence the minds of those who spend time there, gathered through regular meditation, worship and chanting. Even when we are tired or agitated, sitting in the prayer room for a while helps us feel calm, rejuvenated and spiritually uplifted.`,
  },
  {
    question: "Why do we do Namaste?",
    answer: `Indians greet each other with *namaste*. The two palms are placed together in front of the chest and the head bows while saying the word. The greeting is for everyone: people younger than us, of our own age, older than us, friends and even strangers.

The *shaastras* describe five forms of formal traditional greeting, of which *namaskaaram* is one. It is often understood as prostration, but it actually means paying homage, as we do today when we greet each other with a *namaste*.

*Namaste* can be a casual or formal greeting, a cultural convention or an act of worship, but there is more to it than meets the eye. In Sanskrit, *namah* + *te* = *namaste*, meaning "I bow to you": my greetings, salutations or prostration to you. *Namaha* can also be read as "na ma" (not mine), with the spiritual meaning of reducing one's ego in the presence of another.

The real meeting between people is the meeting of their minds. When we greet another with *namaste*, it means "may our minds meet," shown by the folded palms held before the chest. Bowing the head is a gracious way of offering friendship in love and humility.

The spiritual meaning is deeper still. The life force, the divinity, the Self or the Lord in me is the same in all. Recognizing this oneness with the meeting of the palms, we salute with a bowed head the divinity in the person we meet. That is why we sometimes close our eyes as we do *namaste* to a revered person or to the Lord, as if to look within. The gesture is often accompanied by words like "Ram Ram," "Jai Shri Krishna," "Namo Narayana," "Jai Siya Ram" or "Om Shanti," which also recognize this divinity.

When we know this significance, our greeting is no longer a superficial gesture or word but paves the way for a deeper communion with another in an atmosphere of love and respect.`,
  },
  {
    question: "Why do we prostrate before parents and elders?",
    answer: `Indians prostrate before their parents, elders, teachers and noble souls by touching their feet. The elder in turn blesses us by placing a hand on or over our head. Prostration is done daily when we meet elders and especially on important occasions such as the beginning of a new task, birthdays and festivals. In some traditional circles, prostration is accompanied by *abhivaadana*, which introduces oneself and announces one's family and social standing.

Man stands on his feet. Touching the feet in prostration is a sign of respect for the age, maturity, nobility and divinity that our elders personify. It symbolizes our recognition of their selfless love for us and the sacrifices they have made for our welfare. It is a way of humbly acknowledging the greatness of another. This tradition reflects the strong family ties that have been one of India's enduring strengths.

The good wishes (*sankalpa*) and blessings (*aashirvaada*) of elders are highly valued in India, and we prostrate to seek them. Good thoughts create positive vibrations, and good wishes from a heart full of love and nobility have great strength. When we prostrate with humility and respect, we invoke the blessings of elders, which are believed to flow to us as positive energy.

The different forms of showing respect are:

- **Pratuthana:** Rising to welcome a person.
- **Namaskaara:** Paying homage in the form of *namaste*.
- **Upasangrahan:** Touching the feet of elders or teachers.
- **Shaashtaanga:** Prostrating fully, with the feet, knees, stomach, chest, forehead and arms touching the ground in front of the elder.
- **Pratyabivaadana:** Returning a greeting.

The scriptures prescribe who should prostrate to whom. In ascending order of importance, wealth, family name, age, moral strength and spiritual knowledge qualified a person to receive respect. This is why a king, though the ruler of the land, would prostrate before a spiritual master. The epics *Ramayana* and *Mahabharata* have many stories that highlight this.`,
  },
  {
    question: "Why do we wear marks (tilak, pottu and the like) on the forehead?",
    answer: `The *tilak* or *pottu* invokes a feeling of sanctity in the wearer and in others. It is recognized as a religious mark. Its form and colour vary with the religious sect or the form of the Lord worshipped. Vishnu worshippers apply a *chandan* tilak shaped like a "U," Shiva worshippers a *tripundra* of *bhasma*, and Devi worshippers a red dot of *kumkum*.

The tilak covers the spot between the eyebrows, the seat of memory and thinking, known as the *Aajna Chakra* in the language of Yoga. It is applied with the prayer: "May I remember the Lord. May this pious feeling pervade all my activities. May I be righteous in my deeds." Even when we temporarily forget this prayerful attitude, the mark on another person reminds us of our resolve. The tilak is thus a blessing of the Lord and a protection against wrong tendencies.

Traditionally it is said that the forehead, and especially the spot between the eyebrows, is where we feel energy most strongly, and that worry generates heat there and can cause a headache. The cool paste of *chandan* or *bhasma* is believed to soothe the forehead. Sometimes the entire forehead is covered with *chandan* or *bhasma*. Reusable plastic stick bindis serve as decoration but are not applied with this intention.`,
  },
  {
    question: "Why do we not touch papers, books and people with the feet?",
    answer: `To Indians, knowledge is sacred and divine, so it must be given respect at all times. Nowadays we separate subjects into sacred and secular, but in ancient India every subject, academic or spiritual, was considered divine and was taught by the *guru* in the *gurukula*.

The custom of not stepping on educational tools is a frequent reminder of the high place knowledge holds in Indian culture. From an early age, it builds a deep reverence for books and education. This is also why we worship books, vehicles and instruments once a year on Saraswathi Pooja or Ayudha Pooja day, dedicated to the Goddess of Learning. Each day before starting our studies, we pray:

> Saraswati namasthubhyam
> Varade kaama roopini
> Vidyaarambham karishyaami
> Sidhirbhavatu me sadaa

O Goddess Saraswati, giver of boons and fulfiller of wishes, I prostrate to You before starting my studies. May You always fulfill me.

### Why is it disrespectful to touch another person with the feet?

Man is regarded as the most beautiful, living, breathing temple of the Lord. Touching another person with the feet is like disrespecting the divinity within them. This calls for an immediate apology, offered with reverence and humility.`,
  },
  {
    question: "Why do we apply the holy ash?",
    answer: `The ash of any burnt object is not regarded as holy ash. *Bhasma* (the holy ash) is the ash from the *homa* (sacrificial fire), where special wood is offered along with ghee and other herbs as worship of the Lord. It can also come from pouring ash over the deity as *abhisheka*, after which it is distributed as *bhasma*.

*Bhasma* is generally applied on the forehead. Some apply it on the upper arms, chest and other parts of the body, and some ascetics rub it all over the body. Many people also eat a pinch of it each time they receive it.

The word *bhasma* means "that by which our sins are destroyed and the Lord is remembered." *Bha* stands for *bhartsanam* ("to destroy") and *sma* for *smaranam* ("to remember"). Applying *bhasma* therefore signifies the destruction of evil and the remembrance of the divine. It is called *vibhuti* ("glory") because it gives glory to the one who applies it, and *raksha* ("protection") because it protects the wearer from ill health and evil by purifying them.

*Homa*, the offering of oblations into the fire with sacred chants, signifies the offering or surrender of the ego and selfish desires into the flame of knowledge or a noble and selfless cause. The resulting ash signifies the purity of mind that comes from such actions.

The fire of knowledge burns the oblation and the wood, which stand for ignorance and inertia. The ash we apply reminds us to burn away false identification with the body and become free of the limits of birth and death. This is not a gloomy reminder of death but a pointer to the fact that time and tide wait for none.

*Bhasma* is specially associated with Lord Shiva, who applies it all over His body. Devotees of Shiva apply it as a *tripundra*. When it is applied with a red spot at the center, the mark symbolizes Shiva-Shakti, the unity of energy and matter that creates the entire seen and unseen universe.

> Tryambakam yajaamahe
> Sugandhim pushtivardhanam
> Urvaa rukamiva bhandhanaan
> Mrytyor muksheeyamaa amrutaat

We worship the three-eyed Lord Shiva, who nourishes and spreads fragrance in our lives. May He free us from the shackles of sorrow, change and death, effortlessly, like the fall of a ripe brinjal from its stem.`,
  },
  {
    question: "Why do we offer food to the Lord before eating it?",
    answer: `Indians offer food to the Lord and later eat it as *prasaada*, a holy gift from the Lord. In our daily worship (*pooja*) we also offer *naivedyam* (food) to the Lord.

The Lord is omnipotent and omniscient. Man is a part, while the Lord is the totality. All that we do is by His strength and knowledge alone, so what we receive as a result of our actions is really His. We acknowledge this by offering food to Him, as in the Hindi words "tera tujko arpan": I offer what is Yours to You. Afterwards it is like a gift from Him, graced by His divine touch.

Knowing this changes our attitude to food and to eating. The food offered will naturally be pure and the best. We share what we get with others before eating it. We do not demand, complain or criticize the quality of the food we get, but eat it with cheerful acceptance (*prasaada buddhi*).

Before a meal, we sprinkle water around the plate as an act of purification. Five morsels of food are placed on the side of the plate, acknowledging the debt we owe to:

- the divine forces (*devta runa*), for their grace and protection;
- our ancestors (*pitru runa*), for our lineage and family culture;
- the sages (*rishi runa*), who realized, maintained and handed down our religion and culture;
- our fellow beings (*manushya runa*), who make up the society without which we could not live as we do; and
- other living beings (*bhuta runa*), for serving us selflessly.

Then the food is offered to the Lord, the life force who is also within us as the five life-giving functions of the body, with this chant:

> praanaaya swaahaa,
> apaanaaya swaahaa,
> vyaanaaya swaahaa,
> udaanaaya swaahaa,
> samaanaaya swaahaa,
> brahmane swaahaa

After the offering, the food is eaten as *prasaada*, blessed food.`,
  },
  {
    question: "Why do we fast?",
    answer: `Most devout Indians fast regularly or on special occasions such as festivals. On such days they do not eat at all, eat once, or make do with fruits or a special diet of simple food.

Fasting in Sanskrit is *upavaasa*. *Upa* means "near" and *vaasa* means "to stay," so *upavaasa* means staying near the Lord, attaining close mental closeness with Him. What does this have to do with food?

A lot of our time and energy goes into getting food, preparing, cooking, eating and digesting it. Certain foods also make our minds dull and agitated. So on certain days we decide to save time and conserve energy by eating simple, light food or not eating at all, so that the mind becomes alert and pure. The mind, otherwise occupied with thoughts of food, can then entertain noble thoughts and stay with the Lord. Since it is a self-imposed discipline, it is usually followed with joy.

Every system also needs a break and an overhaul to work at its best, and rest and a change of diet during fasting are good for the digestive system and the whole body.

The more we indulge the senses, the more they demand. Fasting helps us gain control over our senses, sublimate our desires and keep our minds poised and at peace.

Fasting should not make us weak or irritable, or create an urge to indulge later. That happens when there is no noble goal behind the fast.

The Bhagavad Gita urges us to eat appropriately, neither too little nor too much (*yukta-aahaara*), and to eat simple, pure and healthy food (a *saatvik* diet) even when not fasting.`,
  },
  {
    question: "Why do we do pradakshina (circumambulate)?",
    answer: `We cannot draw a circle without a center point. The Lord is the center, source and essence of our lives. Recognizing Him as the focal point of our lives, we go about our daily chores. This is the significance of *pradakshina*.

Every point on the circumference of a circle is also the same distance from the center. This means that wherever or whoever we are, we are equally close to the Lord. His grace flows toward us without partiality.`,
  },
  {
    question: "Why is pradakshina done only in a clockwise manner?",
    answer: `The reason is not, as one person said, to avoid a traffic jam! As we do *pradakshina*, the Lord is always on our right. In India the right side symbolizes auspiciousness. As we walk around the sanctum sanctorum, we remind ourselves to lead an auspicious life of righteousness, with the Lord, the indispensable source of help and strength, as our guide, our "right hand."

The scriptures say *matrudevo bhava, pitrudevo bhava, acharyadevo bhava*: may you consider your parents and teachers as you would the Lord. With this in mind, we also do *pradakshina* around our parents and divine personages.

After the traditional worship (*pooja*) is complete, we customarily do *pradakshina* around ourselves. In this way we recognize and remember the supreme divinity within us, which alone is shown as the form of the Lord we worship outside.`,
  },
  {
    question: "Why do we regard trees and plants as sacred?",
    answer: `The Lord, the life in us, pervades all living beings, plants and animals alike, and so all of them are regarded as sacred. Human life on earth depends on plants and trees, which give us the vital things that make life possible: food, oxygen, clothing, shelter, medicines and more. Hence in India we are taught to regard trees and plants as sacred.

Indian scriptures tell us to plant ten trees if, for any reason, we have to cut one. We are advised to use parts of trees and plants only as much as is needed for food, fuel, shelter and the like. We are also urged to apologize to a plant or tree before cutting it, to avoid the sin called *soona*.

Certain trees and plants with tremendous beneficial qualities, such as *tulasi* and *peepal*, are worshipped to this day. It is believed that divine beings manifest as trees and plants, and many people worship them to fulfill their wishes or to please the Lord.`,
  },
  {
    question: "Why do we ring the bell in a temple?",
    answer: `Is it to wake up the Lord? But the Lord never sleeps. Is it to let the Lord know we have come? He does not need to be told, as He knows all. Is it to ask permission to enter His home? It is a homecoming, so entry needs no permission, and the Lord welcomes us at all times. Then why do we ring the bell?

The ringing of the bell makes an auspicious sound, regarded as the sound *Om*, the universal name of the Lord. There should be auspiciousness within and without, to gain the vision of the Lord, who is all-auspiciousness.

We also ring the bell during the ritual *aarati*, sometimes along with the auspicious sounds of the conch and other instruments. The bell, conch and other instruments also help drown out inauspicious or irrelevant noises and comments that might disturb or distract worshippers from their devotion, concentration and inner peace.

As we start the daily worship (*pooja*), we ring the bell and chant:

> Aagamaarthamtu devaanaam
> gamanaarthamtu rakshasaam
> Kurve ghantaaravam tatra
> devataahvaahna lakshanam

I ring this bell to invoke divinity, so that virtuous and noble forces enter (my home and heart) and demonic and evil forces, within and without, depart.`,
  },
  {
    question: "Why do we worship the kalasha?",
    answer: `First of all, what is a *kalasha*? A brass, mud or copper pot is filled with water. Mango leaves are placed in the mouth of the pot and a coconut is placed over it. A red or white thread is tied around its neck, or sometimes all around it in an intricate diamond-shaped pattern. The pot may be decorated with designs. Such a pot is a *kalasha*.

When the pot is filled with water or rice, it is called *purnakumbha*. It represents the inert body which, when filled with the divine life force, gains the power to do all the wonderful things that make life what it is.

A *kalasha* is placed with due rituals on all important occasions such as the traditional house warming (*grihapravesa*), weddings and daily worship. It is placed near the entrance as a sign of welcome, and is also used in the traditional way when receiving holy personages.

Why do we worship the *kalasha*? Before creation came into being, Lord Vishnu was reclining on His snake-bed in the milky ocean. From His navel emerged a lotus, from which appeared Lord Brahma, the creator, who then created this world.

The water in the *kalasha* symbolizes the primordial water from which all creation emerged. It is the giver of life to all and has the potential of creating innumerable names and forms, the inert objects and the sentient beings and all that is auspicious in the world. The leaves and coconut represent creation, and the thread represents the love that binds all in creation. The *kalasha* is therefore considered auspicious and worshipped. The waters of all the holy rivers, the knowledge of all the Vedas and the blessings of all the deities are invoked in the *kalasha*, and its water is then used for all the rituals, including the *abhisheka*.

The consecration of a temple (*kumbhaabhisheka*) is done in a grand manner with elaborate rituals, including pouring one or more *kalashas* of holy water on top of the temple. When the *asuras* and *devas* churned the milky ocean, the Lord appeared bearing the pot of nectar that gave everlasting life. The *kalasha* thus also symbolizes immortality.

Men and women of wisdom are full and complete (*poornatvam*) because they identify with the infinite Truth. They brim with joy and love and respect all that is auspicious. We greet them with a *purnakumbha* ("full pot"), acknowledging their greatness and welcoming them respectfully and reverently with a "full heart."`,
  },
  {
    question: "Why do we consider the lotus as special?",
    answer: `The lotus is the symbol of truth, auspiciousness and beauty (*satyam, shivam, sundaram*). The Lord is also of that nature, and so His various aspects are compared to a lotus: lotus eyes, lotus feet, lotus hands, the lotus of the heart and so on.

The lotus blooms with the rising sun and closes at night. In the same way, our minds open and expand with the light of knowledge. The lotus grows even in slushy areas, yet remains beautiful and untainted despite its surroundings. It reminds us that we too can and should strive to stay pure and beautiful within, under all circumstances.

The lotus leaf never gets wet even though it is always in water. It symbolizes the person of wisdom (*gyaani*), who stays ever joyous, unaffected by the world of sorrow and change. This is revealed in a verse from the Bhagavad Geeta:

> Brahmanyaadhaaya karmaani
> Sangam tyaktvaa karoti yaha
> Lipyate na sa paapena
> Padma patram ivaambhasaa

One who does actions offering them to Brahman (the Supreme), giving up attachment, is not tainted by sin, just as a lotus leaf is not wet by the water on it.

From this we learn that what is natural to the person of wisdom becomes a discipline to be practiced by all *saadhakas*, spiritual seekers and devotees.

The Yoga Shaastras describe certain energy centers in the body called chakras. Each is associated with a lotus with a certain number of petals. For example, a lotus with a thousand petals represents the *Sahasra* chakra at the top of the head, which opens when the yogi attains Realization. The lotus posture (*padmaasana*) is also recommended for meditation.

A lotus emerged from the navel of Lord Vishnu, and Lord Brahma was born from it to create the world. The lotus therefore symbolizes the link between the creator and the supreme Cause. It also symbolizes *Brahmaloka*, the abode of Lord Brahma. The auspicious sign of the swastika is said to have evolved from the lotus.`,
  },
  {
    question: "Why do we worship tulasi?",
    answer: `In Sanskrit, *tulanaa naasti athaiva tulasi*: that which is incomparable in its qualities is the *tulasi*.

For Indians it is one of the most sacred plants. It is the only thing used in worship that, once used, can be washed and used again in *pooja*, because it is regarded as so self-purifying.

One story says that Tulasi was the devoted wife of Shankhachuda, a celestial being. She believed that Lord Krishna had tricked her into sinning, so she cursed Him to become a stone (*shaaligraama*). Seeing her devotion and her commitment to righteousness, the Lord blessed her, saying that she would become the worshipped plant *tulasi*, which would adorn His head, and that all offerings would be incomplete without the *tulasi* leaf. Hence the worship of *tulasi*.

She also symbolizes Goddess Lakshmi, the consort of Lord Vishnu. Those who wish to be righteous and have a happy family life worship the *tulasi*.

*Tulasi* is married to the Lord with all the pomp and show of any wedding, because, according to another legend, the Lord blessed her to be His consort.

Satyabhama once weighed Lord Krishna against all her legendary wealth. The scales did not balance until Rukmini placed a single *tulasi* leaf on them with devotion. The *tulasi* thus showed the world that even a small offering made with devotion means more to the Lord than all the wealth in the world.

The *tulasi* leaf also has great medicinal value and is used to treat various ailments, including the common cold.

> Yanmule sarvatirhaani
> Yannagre sarvadevataa
> Yanmadhye sarvavedaascha
> Tulasi taam namaamyaham

I bow down to the *tulasi*, at whose base are all the holy places, at whose top reside all the deities, and in whose middle are all the Vedas.`,
  },
  {
    question: "Why do we blow the conch?",
    answer: `When the conch is blown, the primordial sound of *Om* comes from it. *Om* is an auspicious sound that the Lord chanted before creating the world. It represents the world and the Truth behind it.

As the story goes, the demon Shankhaasura defeated the *devas* and the Vedas and went to the bottom of the ocean. The *devas* appealed to Lord Vishnu for help. He took the *Matsya Avataara*, the fish incarnation, and killed Shankhaasura. The Lord blew the conch-shaped bone of the demon's ear and head, and the sound of *Om* came out, from which the Vedas emerged.

All the knowledge in the Vedas is an elaboration of *Om*. The conch is called *shankha* after Shankhaasura. The conch blown by the Lord is called *Paanchajanya*, and He carries it at all times in one of His four hands. It represents *dharma*, or righteousness, one of the four goals of life (*purushaarthas*). The sound of the conch is thus also the victory call of good over evil.

Another well-known purpose of blowing the conch and other instruments, which traditionally make auspicious sounds, is to drown out negative comments or noises that might disturb the atmosphere or the minds of worshippers.

Ancient India lived in her villages. Each village had a primary temple and several small ones. During the *aarati* after all-important *poojas* and on sacred occasions, the conch would be blown. Since villages were generally small, the sound could be heard all over the village. People who could not make it to the temple were reminded to stop whatever they were doing, at least for a few seconds, and mentally bow to the Lord. The conch sound lifted people's minds to a prayerful attitude even in the middle of their busy daily routine.

The conch is placed at the altar in temples and homes next to the Lord as a symbol of *Naada Brahma* (Truth), the Vedas, *Om*, *dharma*, victory and auspiciousness. It is often used to give devotees *thirtha* (sanctified water) to raise their minds to the highest Truth. It is worshipped with this verse:

> Twam puraa saagarot pannaha
> Vishnunaa vidhrutahakare
> Devaischa poojitha sarvahi
> Panchjanya namostu te

Salutations to Panchajanya, the conch born of the ocean, held in the hand of Lord Vishnu and worshipped by all the *devas*.`,
  },
  {
    question: "Why do we say shaanti thrice?",
    answer: `*Shaanti* means "peace," a natural state of being. Disturbances are created either by others or by us. For example, peace already exists in a place until someone makes noise. Peace therefore underlies all our agitations, and when the agitations end, peace is naturally experienced since it was already there. Where there is peace, there is happiness, and so everyone, without exception, wants peace in their life.

Peace within or without can seem very hard to reach because it is covered by our own agitations. A rare few manage to stay peaceful within even in the midst of external agitation and trouble. To invoke peace, we chant prayers. By chanting prayers, troubles end and peace is experienced within, whatever the external disturbances. All such prayers end by chanting *shaanti* thrice.

It is believed that *trivaram satyam*: that which is said thrice comes true. To emphasize a point, we repeat it three times. In a court of law, too, the person taking the witness stand says, "I shall speak the truth, the whole truth and nothing but the truth."

We chant *shaanti* thrice to stress our intense desire for peace. All obstacles, problems and sorrows come from three sources:

- **Aadhidaivika:** the unseen divine forces over which we have little or no control, such as earthquakes, floods and volcanic eruptions.
- **Aadhibhautika:** the known factors around us, such as accidents, human contacts, pollution and crime.
- **Aadhyaatmika:** the troubles of the body and mind within us.

We sincerely pray to the Lord that, at least while we undertake special tasks or even in our daily lives, there are no problems, or that problems from these three sources are kept to a minimum. May peace alone prevail. Hence *shaanti* is chanted thrice.

It is chanted aloud the first time, addressing the unseen forces. It is chanted softer the second time, directed to our immediate surroundings and those around us, and softest the third time, as it is addressed to oneself.`,
  },
  {
    question: "Why do we offer a coconut?",
    answer: `In India, one of the most common offerings in a temple is a coconut. It is also offered on occasions like weddings, festivals, and the first use of a new vehicle, bridge or house. It is offered into the sacrificial fire during *homa*. The coconut is broken and placed before the Lord, and is later distributed as *prasaada*.

The fibre covering of the dried coconut is removed except for a tuft on top. The marks on the coconut make it look like a human head. Breaking the coconut symbolizes breaking the ego. The juice inside, representing our inner tendencies (*vaasanas*), is offered along with the white kernel, the mind, to the Lord. A mind purified by the Lord's touch is received as *prasaada*, a holy gift.

In the traditional *abhishekha* ritual, done in all temples and many homes, several materials are poured over the deity, such as milk, curd, honey, tender coconut water, sandal paste and holy ash. Each has a specific significance of bestowing certain benefits on worshippers. Tender coconut water is used in *abhisheka* because it is believed to bestow spiritual growth on the seeker.

The coconut also symbolizes selfless service. Every part of the tree (trunk, leaves, fruit, coir and more) is used in countless ways, for thatches, mats, tasty dishes, oil, soap and so on. The tree takes in salty water from the earth and converts it into sweet, nutritious water that is especially beneficial to sick people. It is used in many ayurvedic medicines and in other alternative medicinal systems.

The three marks on the coconut are even thought to represent the three-eyed Lord Shiva, and so it is considered a means to fulfill our wishes.`,
  },
  {
    question: "Why do we chant Om?",
    answer: `*Om* is one of the most chanted sound symbols in India. It is believed to have a profound effect on the body and mind of the one who chants and on the surroundings. Most mantras and Vedic prayers start with *Om*.

All auspicious actions begin with *Om*. It is even used as a greeting, as in "Om" or "Hari Om." It is repeated as a mantra or meditated upon, and its form is worshipped, contemplated and used as an auspicious sign.

*Om* is the universal name of the Lord. It is made up of the letters A (as in "around"), U (as in "put") and M (as in "mum"). The sound starts at the base of the throat as "A." When the lips come together, "U" is formed, and when the lips close, all sound ends in "M."

The three letters symbolize the three states (waking, dream and deep sleep), the three deities (Brahma, Vishnu and Shiva), the three Vedas (Rig, Yajur and Sama), the three worlds (*Bhuh, Bhuvah, Suvah*) and more. The Lord is all of these and beyond.

The formless, attributeless Lord (*Brahman*) is represented by the silence between two chants of *Om*. *Om* is also called *pranava*, meaning "that (symbol or sound) by which the Lord is praised." The entire essence of the Vedas is held in the word *Om*. It is said that the Lord began creating the world after chanting *Om* and *atha*. Its sound is therefore considered to make an auspicious beginning for any task we undertake. The *Om* chant should have the resounding sound of a bell (*aaooommm*).

*Om* is written in different ways in different places. The most common form symbolizes Lord Ganesha. The upper curve is the head, the large lower one the stomach, the side one the trunk, and the semicircular mark with the dot the sweetmeat ball (*modaka*) in Lord Ganesha's hand. *Om* thus symbolizes everything: the means and the goal of life, the world and the Truth behind it, the material and the sacred, all form and the formless.`,
  },
  {
    question: "Why do we do aarati?",
    answer: `Toward the end of every ritual worship (*pooja* or *bhajan*) of the Lord, or to welcome an honored guest or saint, we perform the *aarati*. It is always accompanied by the ringing of the bell and sometimes by singing, playing musical instruments and clapping.

It is one of the sixteen steps (*shodasha upachaara*) of the *pooja* ritual. It is done with a lighted lamp in the right hand, waved in a clockwise circle to light up the entire form of the Lord. Each part is revealed individually, and also the whole form. As the light is waved, we chant prayers mentally or aloud, or simply behold the beautiful form of the Lord lit by the lamp. At the end of the *aarati* we place our hands over the flame and then gently touch our eyes and the top of the head.

We have seen and taken part in this ritual since childhood. Let us find out why we do the *aarati*.

Having worshipped the Lord of love by performing *abhisheka*, decorating the image and offering fruits and delicacies, we see the beauty of the Lord in all His glory. Our minds focus on each limb of the Lord as the lamp lights it up. It is like a silent, open-eyed meditation on His beauty. The singing, clapping and ringing of the bell show the joy and auspiciousness that come with the vision of the Lord.

*Aarati* is often performed with camphor, which has a telling spiritual significance. Camphor, when lit, burns itself out completely without leaving a trace. It represents our inherent tendencies (*vaasanas*). When lit by the fire of knowledge that illumines the Lord (Truth), our *vaasanas* burn themselves out completely, leaving no trace of the ego that makes us feel separate from the Lord.

While camphor burns to reveal the glory of the Lord, it also gives off a pleasant perfume as it sacrifices itself. In our spiritual progress, even as we serve the *guru* and society, we should willingly sacrifice ourselves and all we have to spread the "perfume" of love to all.

We often wait a long while to see the illumined Lord, but when the *aarati* is actually performed, our eyes close automatically, as if to look within. This signifies that each of us is a temple of the Lord.

Just as the priest reveals the form of the Lord with the *aarati* flame, so the *guru* reveals the divinity within each of us with the "flame" of knowledge. At the end of the *aarati* we place our hands over the flame and touch our eyes and the top of the head. It means: may the light that illuminated the Lord light up my vision, and may my vision be divine and my thoughts noble and beautiful.

The philosophical meaning of *aarati* goes further. The sun, moon, stars, lightning and fire are the natural sources of light, and the Lord is the source of this wondrous phenomenon of the universe. It is due to Him alone that all else exists and shines. As we light up the Lord with the *aarati* flame, we turn our attention to the very source of all light, which symbolizes knowledge and life.

The sun is also the presiding deity of the intellect, the moon of the mind, and fire of speech. The Lord is the supreme consciousness that illuminates all of them. Without Him, the intellect cannot think, the mind cannot feel and the tongue cannot speak. The Lord is beyond mind, intellect and speech. How can this limited equipment illuminate the Lord? Therefore, as we perform the *aarati*, we chant:

> Na tatra suryo bhaati na chandra taarakam
> Nemaa vidyuto bhaanti kutoyamagnib
> Tameva bhaantam anubhaati sarvam
> Tasya bhasa sarvam idam vibhaati

He is there where the sun does not shine, nor the moon, stars and lightning. What then to say of this small flame in my hand? Everything in the universe shines only after the Lord, and by His light alone are we all illumined.

— Swami Chinmayananda`,
  },
];

export const HINDU_RITUALS: StaticPageContent = {
  title: "Hindu Rituals & Routines",
  subtitle: "Why do we follow them?",
  description:
    "Why Hindus light a lamp, say namaste, ring the temple bell, chant Om and more: 22 questions about Hindu rituals and routines, answered for Bal Vihar students.",
  content: [
    INTRODUCTION,
    "## Contents",
    createContents(RITUALS),
    ...RITUALS.map(createSection),
  ].join("\n\n"),
  singleColumn: true,
};
