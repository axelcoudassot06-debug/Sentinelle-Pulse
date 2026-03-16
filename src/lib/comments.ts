export interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export const commentsData: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: "Jean-Michel Delaunay",
      avatar: "JD",
      date: "2026-03-15",
      content: "Excellent décryptage. L'analyse sur l'exigence sans engagement de Trump est particulièrement pertinente. Cela fait longtemps que je dis que l'Europe doit accélérer son autonomie stratégique. Le chiffre de 5% du PIB est ambitieux mais peut-être nécessaire face à la menace russe."
    },
    {
      id: "c2",
      author: "Marie-Odile François",
      avatar: "MF",
      date: "2026-03-14",
      content: "Article très documenté. J'apprécie particulièrement la chronologie qui permet de comprendre l'évolution depuis 2014. Cependant, je reste sceptique sur la faisabilité d'un tel effort budgétaire pour la France dans le contexte économique actuel."
    },
    {
      id: "c3",
      author: "Bernard Chesneau",
      avatar: "BC",
      date: "2026-03-14",
      content: "C'est exactement ce que j'analysais dans ma thèse. L'OTAN est en train de vivre une transformation historique. Merci pour cette synthèse claire."
    }
  ],
  "2": [
    {
      id: "c4",
      author: "Sophie Laurent",
      avatar: "SL",
      date: "2026-03-15",
      content: "La question du Groenland est fascinante. Trump a compris avant tout le monde que l'Arctique est le nouvel eldorado stratégique. L'analyse sur les routes maritimes est parfaite."
    },
    {
      id: "c5",
      author: "Philippe Garnier",
      avatar: "PG",
      date: "2026-03-14",
      content: "Étant géopoliticien spécialisé sur le grand Nord, je confirme que la compétition arctique s'intensifie. La Chine joue un rôle de plus en plus important via le statut d'observateur au Conseil arctique."
    },
    {
      id: "c6",
      author: "Claire Moreau",
      avatar: "CM",
      date: "2026-03-13",
      content: "Article très complet. J'ajoute que la Russie a désormais une flotte de brise-glaces nuclearieure à tout autre pays, ce qui leur donne un avantage logistique considérable."
    }
  ],
  "3": [
    {
      id: "c7",
      author: "Marc Antoine Roux",
      avatar: "MR",
      date: "2026-03-15",
      content: "Les tarifs de 20% sont un tournant majeur. Ce qui est intéressant, c'est l'effet sur les supply chains - les entreprises ne reviendront pas en arrière. L'analyse sur la relocalisation est juste."
    },
    {
      id: "c8",
      author: "Isabelle Berger",
      avatar: "IB",
      date: "2026-03-14",
      content: "Je travaille dans le commerce international et je vois effectivement une réorientation massive vers le Vietnam, l'Inde et le Mexique. C'est un séisme pour les exportateurs européens."
    },
    {
      id: "c9",
      author: "Thierry Dubois",
      avatar: "TD",
      date: "2026-03-13",
      content: "Les BRICS ne sont pas unis - c'est ce que beaucoup oublient. La Chine et l'Inde ont des intérêts divergents, notamment sur la question russe."
    }
  ],
  "4": [
    {
      id: "c10",
      author: "Catherine Soulé",
      avatar: "CS",
      date: "2026-03-15",
      content: "mBridge est effectivement une révolution silencieuse. La dédollarisation avance plus vite que prévu. Cela pourrait avoir des conséquences majeures pour le système financier international."
    },
    {
      id: "c11",
      author: "Richard Monet",
      avatar: "RM",
      date: "2026-03-14",
      content: "En tant qu'ancien de la BRI, je peux confirmer que le système mBridge prend de l'ampleur. Les banques centrales asiatiques sont de plus en plus prudentes avec le dollar."
    },
    {
      id: "c12",
      author: "Émilie Janssen",
      avatar: "EJ",
      date: "2026-03-13",
      content: "Article très éclairant sur un sujet technique mais crucial. La fin de la dominance du dollar n'est pas pour demain mais elle s'écrit aujourd'hui."
    }
  ],
  "5": [
    {
      id: "c13",
      author: "Nicolas Storm",
      avatar: "NS",
      date: "2026-03-15",
      content: "La cyberguerre est le nouveau champ de bataille. Les ransomwares contre les hôpitaux et les infrastructures critiques sont inquiétants. Bon overview des menaces."
    },
    {
      id: "c14",
      author: "Valérie Klein",
      avatar: "VK",
      date: "2026-03-14",
      content: "Experte en cybersécurité, je confirme que 2027 sera l'année des attaques par IA. Les deepfakes sont déjà un problème majeur pour les entreprises."
    },
    {
      id: "c15",
      author: "Alexis Durand",
      avatar: "AD",
      date: "2026-03-13",
      content: "L'Europe est en retard sur ce sujet. Le NIS2 est un bon début mais il faut investir davantage dans les compétences."
    }
  ],
  "6": [
    {
      id: "c16",
      author: "Pierre Lefebvre",
      avatar: "PL",
      date: "2026-03-15",
      content: "La guerre des semi-conducteurs est la guerre froide du XXIe siècle. TSMC est devenue une infraestructura stratégique essentielle. Très bon article."
    },
    {
      id: "c17",
      author: "Anne-Sophie Martin",
      avatar: "AM",
      date: "2026-03-14",
      content: "Je travaille dans l'industrie semiconductor. La dépendance à TSMC est inquiétante. L'Europe essaie de rattraper son retard avec l'IPCEI mais c'est un marathon."
    },
    {
      id: "c18",
      author: "Gilles Rousseau",
      avatar: "GR",
      date: "2026-03-13",
      content: "Les États-Unis ont compris que les puces sont l'arme du futur. Lrestriction sur les équipements ASML est un coup maestro."
    }
  ],
  "7": [
    {
      id: "c19",
      author: "Laura Fernandez",
      avatar: "LF",
      date: "2026-03-15",
      content: "Le LNG change la donne énergétique européenne. La France serait bien inspirée de relancer son programme nucléaire plutôt que d'importer du gaz américain."
    },
    {
      id: "c20",
      author: "Michel Bonnet",
      avatar: "MB",
      date: "2026-03-14",
      content: "Ancien du secteur énergétique, je confirme que la volatilité des prix a explosé depuis 2022. Les contrats long terme reprennentILNGuence."
    },
    {
      id: "c21",
      author: "Julie Nguyen",
      avatar: "JN",
      date: "2026-03-13",
      content: "Les terminaux GNL pullulent en Europe - c'est une vraie bombe à retardement carbone. Bon article qui expose les enjeux."
    }
  ],
  "8": [
    {
      id: "c22",
      author: "François Mercier",
      avatar: "FM",
      date: "2026-03-15",
      content: "Le Kazakhstan devient un acteur clé de l'uranium. La France dépend de plus en plus de l'import - c'est un enjeu de souveraineté."
    },
    {
      id: "c23",
      author: "Hélène Rossignol",
      avatar: "HR",
      date: "2026-03-14",
      content: "Le nucleaire renaît - c'est une bonne nouvelle pour la transition écologique. EPR2 et Small Modular Reactors sont les incontournances du futur."
    },
    {
      id: "c24",
      author: "Olivier Faure",
      avatar: "OF",
      date: "2026-03-13",
      content: "Uranium et géopolitique sont liés. Le Niger, le Kazakhstan, l'Australie - les flux mondiaux sont de plus en plus tendus."
    }
  ],
  "9": [
    {
      id: "c25",
      author: "Stéphane Collin",
      avatar: "SC",
      date: "2026-03-15",
      content: "Les Banques centrales rachètent de l'or massivement. C'est un signal fort - la fin de la confiance dans le système dollar."
    },
    {
      id: "c26",
      author: "Carole Blanchard",
      avatar: "CB",
      date: "2026-03-14",
      content: "Analyste financier depuis 20 ans - je n'ai jamais vu un tel mouvement sur l'or. Le supercycle est legitime avec l'inflation persistante."
    },
    {
      id: "c27",
      author: "David Lemarchand",
      avatar: "DL",
      date: "2026-03-13",
      content: "La Chine et la Russie accumulent de l'or comme réserve. C'est un repositionnement stratégique face aux sanctions occidentales."
    }
  ],
  "10": [
    {
      id: "c28",
      author: "Fabrice Michel",
      avatar: "FM",
      date: "2026-03-15",
      content: "Le crédit privé explose - c'est la financiarisation de l'économie réelle. Les taux sont attractifs mais les risques sont sous-estimés."
    },
    {
      id: "c29",
      author: "Nathalie Perrin",
      avatar: "NP",
      date: "2026-03-14",
      content: "Je gère un fonds de dette privée. LLPnie du marché est remarquable - les institutional investors sont affamés de rendements."
    },
    {
      id: "c30",
      author: "Vincent Blanc",
      avatar: "VB",
      date: "2026-03-13",
      content: "Les PME ont accès à des financements alternatifs - c'est une bonne nouvelle. Mais la réglementation doit s'adapter."
    }
  ],
  "11": [
    {
      id: "c31",
      author: "Sylvie Marchand",
      avatar: "SM",
      date: "2026-03-15",
      content: "Le nearshoring au Mexico transforme l'économie centro-américaine. Les flux USA-Mexico ont explosé depuis 2018."
    },
    {
      id: "c32",
      author: "Jacques Togo",
      avatar: "JT",
      date: "2026-03-14",
      content: "Expert supply chain - le Mexico USA corridor est le grand gagnant de la guerre commerciale. Les temps de transit ont réduitsignificativement."
    },
    {
      id: "c33",
      author: "Micheline Okonkwo",
      avatar: "MO",
      date: "2026-03-13",
      content: "Les nearshoring factories pullulent à Monterrey. C'est un boom économique sans précédent pour la région."
    }
  ],
  "12": [
    {
      id: "c34",
      author: "Bruno Moinet",
      avatar: "BM",
      date: "2026-03-15",
      content: "La crise de l'eau est sous-estimée. Le Moyen-Orient et l'Afrique du Nord sont déjà en stress hydrique extrême. C'est un facteur de conflit majeur."
    },
    {
      id: "c35",
      author: "Agnès Renard",
      avatar: "AR",
      date: "2026-03-14",
      content: "Hydrogène et désalinisation sont les pistes d'avenir. Mais cela demande des investissementsMassifs et une volonté politique."
    },
    {
      id: "c36",
      author: "Christophe Guérin",
      avatar: "CG",
      date: "2026-03-13",
      content: "L'eau sera le petróleo du XXIe siècle. Les pays qui maîtrisent l'eau ont un levier géopolitique considérable."
    }
  ],
  "13": [
    {
      id: "c37",
      author: "Annie Mercier",
      avatar: "AM",
      date: "2026-03-15",
      content: "Les nouvelles Routes de la Soie maritimes contourne les zones de conflit. La Belt and Road évolue vers une logique plus pragmatique."
    },
    {
      id: "c38",
      author: "Laurent Tellier",
      avatar: "LT",
      date: "2026-03-14",
      content: "Armateur depuis 25 ans - la crise de la mer Rouge a coûté des milliards à l'industrie. Le выбор (choix) est désormais stratégique."
    },
    {
      id: "c39",
      author: "Caroline Dubois",
      avatar: "CD",
      date: "2026-03-13",
      content: "Le fret aérien ne peut pas compenser le maritime. Les conteneurs autour du cap de Bonne-Espérance allonge les délais de 2 semaines."
    }
  ],
  "14": [
    {
      id: "c40",
      author: "Xavier Zhou",
      avatar: "XZ",
      date: "2026-03-15",
      content: "Le yuan devient une monnaie régionale en Asie. La convertibilité limitée reste un frein mais les accords bilatéraux contournent l'obstacle."
    },
    {
      id: "c41",
      author: "Annie Cheng",
      avatar: "AC",
      date: "2026-03-14",
      content: "La Chine pousse pour le yuan dans les échanges énergétiques. Le pétro-yuan avance doucement mais surely."
    },
    {
      id: "c42",
      author: "Jean-Luc Perrot",
      avatar: "JP",
      date: "2026-03-13",
      content: "Le plafond de verre du yuan est technique - contrôles de capital et marchés de capitaux sous-développés. La dollars sera dominant encore des décennies."
    }
  ]
};

export function getCommentsByArticleId(articleId: string): Comment[] {
  return commentsData[articleId] || [];
}
