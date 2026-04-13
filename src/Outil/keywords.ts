import { Zone, ZoneId, ScoringResult, ConfidenceLevel } from './types';

export const ZONES: Record<ZoneId, Zone> = {
  sudan: {
    id: 'sudan',
    name: 'Soudan',
    flag: '🇸🇩',
    color: '#1ABC9C',
    cities: ['الفاشر', 'دارفور', 'جنينة', 'الخرطوم', 'أم درمان', 'بحر الغزال', 'كسلا'],
    keywords: {
      strong: [
        'الفاشر', 'حصار الفاشر', 'RSF الفاشر', 'قصف الفاشر', 'حميدتي الفاشر',
        'مجزرة الفاشر', 'هجوم RSF الفاشر', 'SAF الفاشر', 'نزوح الفاشر',
        'El Fasher siege', 'RSF El Fasher', 'Fasher bombing', 'El Fasher massacre',
        'RSF attack hospital', 'Darfur massacre', 'West Darfur massacre'
      ],
      medium: [
        'دارفور', 'جنينة', 'الخرطوم', 'كردفان', 'حميدتي', 'الدعم السريع',
        'قوات الدعم السريع', 'SAF', '-armed conflict Sudan', 'civilians killed Sudan'
      ],
      weak: [
        'قصف', 'اشتباك', 'نزوح', 'حرق قري', 'اغتصاب جماعي', 'مجزرة', 'حصار',
        'shelling', 'clashes', 'displacement'
      ],
      negative: [
        'دارفور كافيه', 'مجزرة أسعار', 'حصار المنافسين', 'دارفور ترافل',
        'سودان سياحة', 'Darfur cafe', 'Darfur travel', 'Darfur safari'
      ],
      boost: [
        'war crime', 'ethnic cleansing', 'UNHCR', 'ICRC', 'MSF', 'genocide',
        'eyewitness', 'mass grave', 'civilian target', 'humanitarian crisis'
      ]
    }
  },
  gaza: {
    id: 'gaza',
    name: 'Gaza',
    flag: '🇵🇸',
    color: '#E74C3C',
    cities: ['غزة', 'رفح', 'خان يونس', 'دير البلح', 'جباليا', 'بيت لاهيا', 'النصيرات'],
    keywords: {
      strong: [
        'غزة قصف', 'رفح مجزرة', 'خان يونس قصف', 'مستشفى الشفاء', 'طوفان الأقصى',
        'قصف رفح', 'مجزرة نصيرات', 'مجزرة رفح', 'غزة مذبحة', 'مستشفى قصف',
        'hospital bombing Gaza', 'Rafah massacre', 'Khan Yunis bombing', 'Nuseirat massacre'
      ],
      medium: [
        'غزة', 'رفح', 'خان يونس', 'IDF', 'حماس', 'القسام', 'جيش الاحتلال',
        'غزة قطاع', 'الضفة الغربية', 'القدس'
      ],
      weak: [
        'قصف', 'مجزرة', 'حصار', 'نزوح', 'شهيد', 'غارة جوية', ' bombardment'
      ],
      negative: [
        'غزة كافيه', 'غزة مطعم', 'غزة فيلم', 'غزة شاطئ', 'غزة بيت', 'tourism Gaza'
      ],
      boost: [
        'UNRWA', 'war crime', 'genocide', 'ceasefire violation', 'civilian casualties',
        'children killed', 'UN report', 'ICJ'
      ]
    }
  },
  ukraine: {
    id: 'ukraine',
    name: 'Ukraine',
    flag: '🇺🇦',
    color: '#3498DB',
    cities: ['Харьков', 'Одесса', 'Киев', 'Запорожье', 'Днепр', 'Херсон', 'Луганск'],
    keywords: {
      strong: [
        'شاهيد', 'шахед', 'обстрел Харьков', 'Маріуполь Буча', 'ракетный удар Киев',
        'Shahed attack', 'Kharkiv strike', 'Kyiv missile', 'Bucha massacre Ukraine'
      ],
      medium: [
        'Харьков', 'Одесса', 'Киев', 'Запорожье', 'ЗСУ', 'ВСУ', 'шахед 136',
        'Ukraine war', 'Russian invasion', 'Kursk'
      ],
      weak: [
        'обстрел', 'бомбардировка', 'авиаудар', 'геноцид', 'missile strike'
      ],
      negative: [
        'war thunder', 'игра', 'ценовая война', 'warzone game', 'price war Ukraine'
      ],
      boost: [
        'HIMARS', 'Bayraktar', 'ICJ', 'war crime', 'NATO', 'civilian infrastructure'
      ]
    }
  },
  sahel: {
    id: 'sahel',
    name: 'Sahel',
    flag: '🌍',
    color: '#F39C12',
    cities: ['Mopti', 'Gao', 'Tessalit', 'Kidal', 'Bamako', 'Niger', 'Burkina Faso'],
    keywords: {
      strong: [
        'JNIM', 'ISGS', 'embuscade FAMa', 'EEI Mali', 'Katiba Macina',
        'FAMa killed', 'Barkhane attack', 'Jihadist ambush Sahel'
      ],
      medium: [
        'Mopti', 'Gao', 'Tessalit', 'Barkhane', 'FAMa', 'G5 Sahel',
        'Mali jihadist', 'Burkina attack'
      ],
      weak: [
        'attaque jihadiste', 'milice', 'insurrection', 'terrorist attack'
      ],
      negative: [
        'djihad prix', 'guerre prix', 'djihad food', 'restaurant Sahel'
      ],
      boost: [
        'village brûlé', 'déplacés internes', 'UN peacekeeping', 'humanitarian crisis Sahel'
      ]
    }
  },
  drc: {
    id: 'drc',
    name: 'RDC',
    flag: '🇨🇩',
    color: '#9B59B6',
    cities: ['Goma', 'Kinshasa', 'Beni', 'Butembo', 'Nord-Kivu', 'Ituri', 'Kivu'],
    keywords: {
      strong: [
        'M23 Kinshasa', 'Rwanda DRC', ' massacre Beni', 'AFRICA army DRC',
        'M23 Goma', 'RD Congo war', 'Nord-Kivu massacre'
      ],
      medium: [
        'Goma', 'Kinshasa', 'Beni', 'Butembo', 'Nord-Kivu', 'Ituri',
        'FDLR', 'Wazalendo'
      ],
      weak: [
        'combats', 'violences', 'déplacés', 'conflit', 'clashes DRC'
      ],
      negative: [
        'RDC restaurant', 'Kinshasa hotel', 'voiture RDC'
      ],
      boost: [
        'massacre', 'enfants soldats', 'violences sexuelles', 'MONUSCO'
      ]
    }
  },
  myanmar: {
    id: 'myanmar',
    name: 'Myanmar',
    flag: '🇲🇲',
    color: '#E67E22',
    cities: ['Yangon', 'Mandalay', 'Kachin', 'Shan', 'Rakhine', 'Chin'],
    keywords: {
      strong: [
        'Myanmar coup', 'Rohingya genocide', 'Kachin massacre', ' Sagaing',
        'junta Myanmar', 'PDF Myanmar', 'Arakan army'
      ],
      medium: [
        'Yangon', 'Mandalay', 'Kachin', 'CDN', 'SAC', 'NUG Myanmar'
      ],
      weak: [
        'bombardement', 'attaques', 'réfugiés', 'conflit civil'
      ],
      negative: [
        'Myanmar cuisine', 'Myanmar restaurant', 'travel Myanmar'
      ],
      boost: [
        'war crime', 'ethnic cleansing', 'UNHCR', 'arbitrary detention'
      ]
    }
  },
  yemen: {
    id: 'yemen',
    name: 'Yémen',
    flag: '🇾🇪',
    color: '#16A085',
    cities: ['Sanaa', 'Hodeida', 'Aden', 'Taiz', 'Marib', 'Saada'],
    keywords: {
      strong: [
        'Houthi attack', 'Saadi strike', 'Yemen war', 'Hodeidah port',
        'civilians killed Yemen', 'Houthi escalation'
      ],
      medium: [
        'Sanaa', 'Hodeida', 'Aden', 'Taiz', 'Marib', 'Houthis', 'Saudi coalition'
      ],
      weak: [
        'قصف', 'هجوم', 'نزوح', 'غارة', 'bombardement'
      ],
      negative: [
        'Yemen coffee', 'Yemen hotel', 'tourism Yemen'
      ],
      boost: [
        'UN aid', 'starvation', 'humanitarian crisis Yemen', 'civilian target'
      ]
    }
  },
  haiti: {
    id: 'haiti',
    name: 'Haïti',
    flag: '🇭🇹',
    color: '#1ABC9C',
    cities: ['Port-au-Prince', 'Cap-Haïtien', 'Gonaïves', 'Cité Soleil', 'Delmas'],
    keywords: {
      strong: [
        'Gang attack Haiti', 'Port-au-Prince massacre', 'Police killed Haiti',
        'MS-13 Haiti', 'Killer 509 Haiti', 'Gang war Haiti'
      ],
      medium: [
        'Port-au-Prince', 'Gonaïves', 'Cité Soleil', 'Delmas', 'Baldwin',
        'G9', 'Jimmy Chérizier'
      ],
      weak: [
        'enlèvement', 'ransom', ' Kidnapping', 'gang violence', 'assassinats'
      ],
      negative: [
        'Haiti music', 'Haiti beach', ' Haiti cuisine', 'vacances Haïti'
      ],
      boost: [
        'massacre', 'humanitarian crisis', 'MINUSTAH', 'civilians killed'
      ]
    }
  }
};

interface TransversalCategory {
  positive?: string[];
  negative?: string[];
}

interface TransversalKeywords {
  [category: string]: TransversalCategory;
}

interface TransversalLanguage {
  [category: string]: TransversalCategory;
}

interface TransversalData {
  [lang: string]: TransversalKeywords;
}

const TRANSVERSAL_KEYWORDS: TransversalData = {
  en: {
    hospital: {
      positive: ['hospital bombing', 'hospital strike', 'health facility attack'],
      negative: ['hospital day', 'veterinary hospital', 'animal hospital']
    },
    war: {
      negative: ['price war', 'trade war', 'star wars', 'war thunder', 'war game']
    },
    massacre_pos: {
      positive: ['civilian massacre', 'massacre confirmed']
    },
    massacre_neg: {
      negative: ['massacre prices', 'massacre deals']
    },
    attack: {
      negative: ['cyber attack', 'DDOS attack', 'spam attack']
    },
    killed: {
      negative: ['plants killed', 'game killed']
    }
  },
  fr: {
    guerre: {
      negative: ['guerre des prix', 'guerre commerciale', 'guerre mondiale']
    },
    massacre: {
      negative: ['massacre de prix', 'massacre soldes']
    },
    attentat: {
      negative: [' attentat cardiaque', 'attentat bombing']
    },
    tuerie: {
      negative: ['tuerie de poissons']
    }
  },
  ar: {
    qasf_neg: {
      negative: ['قصف أسعار', 'قصف مطعم']
    },
    majzara_neg: {
      negative: ['مجزرة أسعار', 'مجزرة مطاعم']
    }
  }
};

export function scorePost(text: string, zone?: ZoneId): ScoringResult {
  const textLower = text.toLowerCase();
  let score = 0;
  const triggers: string[] = [];

  if (zone && ZONES[zone]) {
    const zoneData = ZONES[zone];
    score += scoreKeywordList(textLower, zoneData.keywords.strong, 8, triggers);
    score += scoreKeywordList(textLower, zoneData.keywords.medium, 4, triggers);
    score += scoreKeywordList(textLower, zoneData.keywords.weak, 1, triggers);
    score -= scoreKeywordList(textLower, zoneData.keywords.negative, 6, triggers);
    score += scoreKeywordList(textLower, zoneData.keywords.boost, 3, triggers);

    for (const city of zoneData.cities) {
      if (textLower.includes(city.toLowerCase())) {
        score += 2;
        triggers.push(city);
      }
    }
  }

  for (const langData of Object.values(TRANSVERSAL_KEYWORDS)) {
    for (const category of Object.values(langData)) {
      if (category.negative) {
        score -= scoreKeywordList(textLower, category.negative, 4, triggers);
      }
      if (category.positive) {
        score += scoreKeywordList(textLower, category.positive, 5, triggers);
      }
    }
  }

  const confidence = getConfidenceFromScore(score);
  
  return { score: Math.max(0, score), triggers: [...new Set(triggers)], confidence };
}

function scoreKeywordList(text: string, keywords: string[], weight: number, triggers: string[]): number {
  let score = 0;
  for (const keyword of keywords) {
    if (text.includes(keyword.toLowerCase())) {
      score += weight;
      triggers.push(keyword);
    }
  }
  return score;
}

function getConfidenceFromScore(score: number): ConfidenceLevel {
  if (score >= 15) return 'CRITICAL';
  if (score >= 10) return 'HIGH';
  if (score >= 6) return 'MEDIUM';
  return 'LOW';
}

export function extractGeoloc(text: string, zone: ZoneId): string {
  if (!ZONES[zone]) return '';
  
  const zoneData = ZONES[zone];
  for (const city of zoneData.cities) {
    if (text.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }
  return '';
}

export function getAllZones(): Zone[] {
  return Object.values(ZONES);
}
