export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'economie' | 'geopolitique' | 'defense' | 'osint';
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
  trending?: boolean;
}

export const articles: Article[] = [
  {
    "id": "1",
    "title": "Supercycle de réarmement : la plus grande vague d'investissement défense depuis la Guerre froide",
    "excerpt": "Au sommet de La Haye, l'OTAN acte un objectif de 5% du PIB consacré à la défense d'ici 2035. Rheinmetall affiche 63,8 Md€ de commandes, le Golden Dome mobilise 25 Md$. Analyse des flux, bénéficiaires et risques d'exécution.",
    "content": "<DATA>5 %</DATA> du PIB consacré à la défense d'ici 2035<DATA>63,8 Md€</DATA> de commandes Rheinmetall (mars 2026)<DATA>25 Md$</DATA> budget Golden Dome approved<DATA>1 588 Md$</DATA> dépenses défense OTAN 2025\n\n## Contexte et Genèse\n\n### Du 2% au 5% : l'architecture d'une rupture stratégique\nPendant une décennie, le seuil des 2% du PIB consacré à la défense a constitué l'objectif de référence de l'OTAN — adopté au sommet du Pays de Galles en 2014 après l'annexion de la Crimée par la Russie. En 2015, seuls quatre membres sur trente-deux l'atteignaient. En 2025, la totalité des trente-deux membres respectent ce seuil pour la première fois de l'histoire de l'Alliance.\n\nMais cet accomplissement n'a duré que quelques mois. Au sommet de La Haye en juin 2025, les 32 membres de l'OTAN ont acté un objectif sans précédent : 5% du PIB consacré à la défense d'ici 2035, dont 3,5% en dépenses militaires stricto sensu.\n\nCe tournant stratégique — imposé par Trump, redouté par Bruxelles — enclenche un supercycle de réarmement dont les premières ondes de choc sont déjà visibles dans les carnets de commandes industriels.\n\n<QUOTE>Le supercycle de défense européen est désormais une réalité结构性. Les entreprises qui étaient en difficulté il y a trois ans affichent aujourd'hui des carnets de commandes historiques.</QUOTE>\n\n## Les Bénéficiaires Industriels\n\n| Entreprise | Carnet de commandes | Performance boursière 2025 |\n|------------|-------------------|--------------------------|\n| Rheinmetall | 63,8 Md€ | +152% |\n| Thales | 53,3 Md€ | +85% |\n| BAE Systems | - | +45% |\n| Leonardo | - | +38% |\n\n## Le Programme Golden Dome\n\nLe programme Golden Dome mobilise déjà 25 Md$ aux États-Unis. Le Congrès a approuvé le budget en juillet 2025, avec une dotation supplémentaire de 13,4 Md$ pour FY2026. Le potentiel total est estimé entre 175 et 542 Md$ sur 20 ans.\n\n## Perspectives et Recommandations\n\nCette analyse cartographie les flux, les bénéficiaires et les risques d'exécution d'un réarmement occidental dont l'ampleur n'a pas de précédent depuis la Guerre froide.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-15",
    "readTime": 23,
    "image": "https://images.unsplash.com/photo-1572949645079-64129567888cd?w=1200&q=80"
  },
  {
    "id": "2",
    "title": "Arctique : la nouvelle frontière énergétique et champ de bataille stratégique",
    "excerpt": "L'Arctique se réchauffe 4× plus vite que le reste de la planète. Trump veut le Groenland, la Chine intensifie sa présence, la Russie militarise ses côtes. Analyse de la compétition pour le Grand Nord.",
    "content": "<DATA>4×</DATA> plus vite que le reste de la planète<DATA>40 %</DATA> distance Asie-Europe via Route Nord-Est<DATA>90 Md</DATA> barils de pétrole estimés<DATA>44/50</DATA> matériaux critiques US présents au Groenland\n\n## Contexte\n\nL'Arctique se réchauffe 3 à 4 fois plus vite que le reste de la planète. Cette réalité climatique produit une transformation géopolitique sans précédent : ouverture de nouvelles routes maritimes réduisant de 30 à 50% les distances Asie-Europe, accès à des ressources estimées à 90 milliards de barils de pétrole et 47 000 milliards de m³ de gaz, exposition de gisements de 44 des 50 matériaux critiques listés par Washington.\n\n<QUOTE>Groenland « par tous les moyens », a réaffirmé Trump en janvier 2026, invoquant le Golden Dome et la sécurité nationale.</QUOTE>\n\n## Les Enjeux Stratégiques\n\n| Indicateur | Donnée | Source |\n|------------|--------|--------|\n| Réchauffement Arctique | 4× moyenne mondiale | GIEC 2022 |\n| Distance Shanghai-Rotterdam via Suez | 19 000 km |\n| Distance via Route Nord-Est | 12 000 km |\n| Réserves pétrole Arctique | 90 Md barils | USGS |\n| Matériaux critiques US au Groenland | 44/50 | GEUS |\n\n## La Compétition Internationale\n\nLa Chine intensifie sa présence via les pêcheurs-espions et ses capacités de surveillance. La Russie militarise ses côtes arctiques avec de nouvelles bases et systèmes de défense. Les trois puissances se préparant à contrôler cette nouvelle frontière.\n\nCette analyse cartographie la compétition pour le Grand Nord — ses ressources, ses routes, ses lignes de fracture.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-14",
    "readTime": 24,
    "image": "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1200&q=80"
  },
  {
    "id": "3",
    "title": "Guerre commerciale mondiale : la fin du libre-échange et ses conséquences",
    "excerpt": "145% de droits de douane sur la Chine, 25% sur l'acier mondial. L'administration Trump engage la plus vaste campagne tarifaire depuis les années 1930. Analyse des flux, gagnants et perdants.",
    "content": "<DATA>145 %</DATA> droits de douane sur la Chine (pic)<DATA>20 %</DATA> droit universel sur tous partenaires<DATA>25 %</DATA> droits sur acier et aluminium<DATA>18 Md€</DATA> valorisations export UE ciblées\n\n## Chronologie de l'Escalade\n\n### 1. De 2018 à 2026 : l'escalade tarifaire en huit actes\n\n| Période | Mesure | Cible | Riposte |\n|---------|--------|-------|----------|\n| Mars 2018 | Tarifs 25% acier / 10% aluminium | Monde | UE: contre-mesures symboliques |\n| 2018-2019 | Tarifs 25% sur 250 Md$ imports chinois | Chine | Chine: 185 Md$ de contre-mesures |\n| 2022-2024 | Maintien 90% tarifs + nouveaux tarifs tech | Chine (semi, EV, solaire) | Escalade sur VE, panneaux, batteries |\n| Janvier 2025 | 145% sur Chine, 25% acier, 20% universel | Monde entier | Ripostes chinoises et européennes |\n| Mars 2026 | Accord Busan: 10% pour 90 jours | Chine | Trêve fragile |\n\n## Les Conséquences Structurelles\n\nDepuis janvier 2025, l'administration Trump a engagé la plus vaste campagne de droits de douane depuis les années 1930. En mars 2026, l'accord Busan avec la Chine (tarifs ramenés à 10% pour 90 jours) offre une trêve fragile, mais la structure de la guerre commerciale est désormais permanente.\n\nL'Europe négocie, recadre ses chaînes d'approvisionnement, et cherche dans les BRICS+ de nouveaux débouchés.\n\n<QUOTE>Nous assistons à une restructuration fondamentale des chaînes de valeur mondiales. Les entreprises doivent désormais intégrer le risque tarifaire comme variable permanente.</QUOTE>\n\nCette analyse cartographie les flux, les gagnants, les perdants et les décisions actionnables dans un monde de tarifs élevés structurels.",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-13",
    "readTime": 17,
    "image": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80"
  },
  {
    "id": "4",
    "title": "Dédollarisation : mBridge et BRICS Pay redessinent la finance internationale",
    "excerpt": "mBridge a traité 54 M$ en 2022, BRICS Pay entre en déploiement actif. Objectif: réduire la dépendance au dollar et à SWIFT. Analyse de l'état réel de ces systèmes à horizon 2030.",
    "content": "<DATA>54 M$</DATA> volume pilote mBridge 2022<DATA>3 Md$+</DATA> volume estimé 2024-2025<DATA>13</DATA> membres BRICS+ (2025)<DATA>45 %</DATA> part commerce mondial BRICS+\n\n## Contexte : Pourquoi SWIFT est devenu une arme géopolitique\n\nSWIFT — Society for Worldwide Interbank Financial Telecommunication — est le système de messagerie interbancaire qui coordonne la quasi-totalité des règlements internationaux. Créé en 1973, il connecte plus de 11 000 institutions financières dans 200 pays.\n\nSon utilisation comme outil de sanction — particulièrement contre la Russie en 2022 — a accéléré les travaux sur des systèmes alternatifs.\n\n## Les Solutions Alternatives\n\n| Système | Volume 2022 | Volume estimé 2024 | Statut |\n|---------|-------------|-------------------|--------|\n| mBridge | 54 M$ | 3 Md$+ | Pilotage actif |\n| BRICS Pay | - | En déploiement | Cadre de référence adopté à Kazan |\n\n## Perspectives\n\nBRICS Pay, le système de messagerie interbancaire alternatif à SWIFT adopté en cadre de référence au sommet de Kazan (octobre 2024), est entré dans une phase de déploiement actif. L'objectif déclaré est clair : réduire la dépendance au dollar et à SWIFT pour le règlement des échanges intra-BRICS.\n\n<QUOTE>La dédollarisation n'est plus un projet politique, c'est une réalité technique en cours.</QUOTE>\n\nCette analyse cartographie l'état réel de ces systèmes — leur avancement, leurs limites structurelles, et les scénarios de déploiement à horizon 2030.",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-12",
    "readTime": 17,
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
  },
  {
    "id": "5",
    "title": "Guerre informationnelle : la cyberguerre étatique en 2025",
    "excerpt": "+67% d'attaques ransomware attribuées à des États. Le Golden Cyber Dome US doté de 3,2 Md$. La frontière entre cybercriminalité et cyberguerre a disparu. Cartographie des vecteurs et acteurs.",
    "content": "<DATA>+67 %</DATA> attaques ransomware étatiques (2025)<DATA>3,2 Md$</DATA> budget Golden Cyber Dome US<DATA>4,88 M$</DATA> coût moyen violation données<DATA>21 j</DATA> délai médian détection intrusion\n\n## Le Paysage des Menaces\n\n### 1. 2025-2026 : l'ère des cyberattaques hybrides d'État\n\nLa frontière entre cybercriminalité et cyberguerre d'État a disparu en 2025. Les groupes APT (Advanced Persistent Threats) opèrent désormais selon un modèle hybride : financement étatique, objectifs stratégiques, mais tactiques et outils empruntés aux groupes criminels.\n\n| Indicateur | Donnée 2024 | Donnée 2025 | Évolution |\n|------------|-------------|-------------|----------|\n| Attaques ransomware étatiques | - | +67% | Hausse massive |\n| Délai détection intrusion | 24 jours | 21 jours | Amélioration |\n| Coût moyen violation | 4,35 M$ | 4,88 M$ | +12% |\n\n## Les Acteurs Principaux\n\n**Corée du Nord** : Finance 40% de son programme de missiles via les cryptomonnaies volées lors de cyberattaques.\n\n**Russie** : Utilise ses groupes APT (Sandworm, Cozy Bear) comme force hybride contre les infrastructures occidentales.\n\n**Chine** : A déployé des capacités de frappe quantique contre des nœuds de communication militaires.\n\n<QUOTE>Les attaques de 2025 ont atteint un niveau de sophistication sans précédent. La moitié des entreprises françaises ont été ciblées au moins une fois.</QUOTE>\n\n## Le Budget Cyber Américain\n\nLes États-Unis ont lancé le programme 'Golden Cyber Dome' — un bouclier cyber automatisé adossé à l'IA — avec une dotation de 3,2 milliards de dollars dans le budget FY2026, dont 1,1 Md$ pour l'IA défensive automatisée.\n\nCette analyse cartographie les vecteurs d'attaque dominants, les acteurs étatiques, les bénéficiaires industriels et les décisions de posture pour les organisations exposées.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-11",
    "readTime": 18,
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
  },
  {
    "id": "6",
    "title": "Semi-conducteurs : la souveraineté technologique comme enjeu stratégique",
    "excerpt": "Taïwanfabrique 90%+ des puces les plus avancées. Le CHIPS Act US a mobilisé 52,7 Md$, l'EU Chips Act 43 Md€. Analyse des chaînes de dépendance et des scénarios de crise.",
    "content": "<DATA>90%+</DATA> production mondiale puces <5nm<DATA>52,7 Md$</DATA> CHIPS Act US<DATA>43 Md€</DATA> EU Chips Act<DATA>2030</DATA> horizon capacité production US<DATA>2028</DATA> livraison TSMC Arizona phase 2\n\n## Anatomie de la Dépendance\n\n### La chaîne de valeur semi-conducteurs\n\nLa chaîne de valeur des semi-conducteurs est l'une des plus complexes et des plus concentrées de l'économie mondiale. Elle se décompose en sept couches interdépendantes.\n\n| Couche | Description | Leaders | Concentration |\n|--------|-------------|---------|--------------|\n| Design (EDA) | Outils de conception | Cadence, Synopsys | USA 90% |\n| Fabrication | Production puces | TSMC, Samsung, Intel | Taïwan 90%+ (<5nm) |\n| Foundries | Fonderies | TSMC 60% monde | Taïwan dominant |\n| Equipements | Machines lithographie | ASML, Applied Materials | Pays-Bas, USA |\n| Materials | Wafer, produits chimiques | Shin-Etsu, Sumco | Japon 60% |\n| Packaging | Assemblage, test | ASE, Amkor | Taiwan, Chine |\n| Design chips | Conception finale | Apple, Nvidia, AMD | USA dominant |\n\n## Les Plans de Relocalisation\n\n**CHIPS and Science Act** : 52,7 Md$ de dotation totale, dont 39 Md$ pour la fabrication domestique. Première livraison TSMC Arizona (4nm) prévue 2025, phase 2 (3nm) en 2028.\n\n**EU Chips Act** : 43 Md€ de dotation. Objectif: 20% de la production mondiale en 2030.\n\n<QUOTE>Taïwan reste irremplaçable pour les nœuds les plus avancés. Même avec les investissements massifs, la dépendancestructurelle persistera au moins une décennie.</QUOTE>\n\nCette analyse cartographie les chaînes de dépendance, les progrès de la relocalisation, et les scénarios de crise.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-10",
    "readTime": 16,
    "image": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80"
  },
  {
    "id": "7",
    "title": "Indépendance énergétique européenne : du gazoduc au GNL",
    "excerpt": "De 40% à 8-10% de gaz russe en 5 ans. Le contrat de transit Ukraine a expiré. L'Europe compense par le GNL américain et qatari. Cartographie de la nouvelle géographie gazière européenne.",
    "content": "<DATA>8-10 %</DATA> part gaz russe (2026) vs 40% (2021)<DATA>50 %</DATA> part GNL américain dans imports EU<DATA>3×</DATA> multiplication capacités GNL depuis 2022<DATA>13</DATA> terminaux flottants FSRU déployés\n\n## La Rupture 2021-2026\n\nEn 2021, la Russie fournissait 40% du gaz naturel européen via des pipelines. En 2026, cette part est tombé à environ 8-10%, compensée par une montée en puissance spectaculaire du GNL américain (désormais premier fournisseur) et qatari.\n\nLe contrat de transit gazeux russo-ukrainien a expiré le 31 décembre 2024 sans renouvellement, coupant le dernier pipeline significatif en activité.\n\n## Les Flux de GNL\n\n| Pays fournisseur | Part imports EU GNL | Evolution |\n|------------------|---------------------|----------|\n| États-Unis | 50% | Devenu leader |\n| Qatar | 25% | Stable |\n| Russie | 8-10% | Effondrement |\n| Nigéria | 10% | En hausse |\n| Autres | 7% | - |\n\n## Les Terminaux GNL Européens\n\nL'Europe a déployé 13 terminaux flottants FSRU en urgence depuis 2022. Les capacités GNL européennes ont triplé, permettant de compenser la perte du gaz russe.\n\n<QUOTE>L'Europe a réussi sa transition d'urgence — mais à quel prix, et à quelle vulnérabilité nouvelle ?</QUOTE>\n\nCette analyse cartographie la nouvelle géographie gazière européenne, la guerre des contrats GNL entre Qatar et États-Unis, et les décisions de couverture pour les acteurs exposés aux spreads TTF/Henry Hub.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-09",
    "readTime": 17,
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
  },
  {
    "id": "8",
    "title": "Retour du nucléaire : la géopolitique de l'uranium",
    "excerpt": "31 réacteurs en construction dans le monde. Le Kazakhstan produit 43% de l'uranium mondial. L'Occident dépend à 35-40% de Rosatom pour l'enrichissement. Prix spot U3O8: +170% depuis 2021.",
    "content": "<DATA>43 %</DATA> production uranium Kazakhstan<DATA>+170 %</DATA> hausse prix spot U3O8 (2021-2024)<DATA>31</DATA> réacteurs en construction (2025)<DATA>35-40 %</DATA> dépendance enrichissement Rosatom\n\n## La Géopolitique de l'Uranium\n\n### 1. La chaîne du combustible nucléaire\n\nLe combustible nucléaire n'est pas simplement de l'uranium extrait du sol. Avant d'alimenter un réacteur, il passe par une chaîne de transformation complexe.\n\n| Étape | Description | Leaders | Risque |\n|-------|-------------|---------|--------|\n| Extraction | Mining uranium | Kazakhstan 43%, Australie 13% | Concentration |\n| Conversion | Yellowcake → UF6 | USA, Russie, Chine | Monopole |\n| Enrichissement | ↑ concentration U235 | Rosatom 35-40% occident | Dépendance РФ |\n| Fabrication | Combustible réacteurs | Westinghouse, Framatome | Limitée |\n\n## La Renaissance Nucléaire\n\nLe nucléaire civil connaît un retour en grâce sans précédent depuis Fukushima : 31 nouveaux réacteurs sont en construction dans le monde en 2025, dont 21 en Asie. Les gouvernements occidentaux réaffirment l'atome comme énergie bas-carbone dans leurs mix, et la COP28 a acté un objectif de triplement de la capacité nucléaire mondiale d'ici 2050.\n\n<QUOTE>L'Occident dépend à hauteur de 35-40% de l'enrichissement russe (Rosatom) pour alimenter ses réacteurs. Cette dépendance est le paradoxe stratégique de la renaissance nucléaire.</QUOTE>\n\nLe prix spot de l'U3O8 a bondi de +170% entre 2021 et 2024 avant de partiellement corriger (106$/lb peak).\n\nCette analyse cartographie la géopolitique de l'uranium et les décisions actionnables dans un secteur en pleine recomposition.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-08",
    "readTime": 21,
    "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7626a1?w=1200&q=80"
  },
  {
    "id": "9",
    "title": "Supercycle de l'or : le taux le plus élevé depuis 1967",
    "excerpt": "1 820 tonnes d'or achetées par les banques centrales en 2025 (+22%). La Pologne détient 15% de ses réserves en or. L'Inde 12%. Le prix spot atteint 3 150 $/oz. Analyse des dynamiques d'achat.",
    "content": "<DATA>1 820 t</DATA> achats or Banques Centrales 2025<DATA>+22 %</DATA> vs 2024 - record depuis 1967<DATA>15 %</DATA> part or réserves Pologne (vs 4% 2019)<DATA>12 %</DATA> part or réserves Inde<DATA>3 150 $/oz</DATA> prix spot or (mars 2026)\n\n## Pourquoi ce Supercycle ?\n\n### 2022 : le tournant historique — la leçon russe\n\nLe gel des 300 milliards de dollars de réserves de change russes par les États-Unis et l'Union européenne en mars 2022 a produit un choc psychologique durable dans toutes les banques centrales du monde.\n\nLe message était sans ambiguïté : les réserves en devises étrangères (dollars, euros, livres, yens) stockées dans des institutions occidentales peuvent être saisies en cas de conflit géopolitique.\n\n## Les Acheteuses Structurelles\n\n| Pays | Réserves or | Part totale | Evolution |\n|------|------------|-------------|----------|\n| Pologne | - | 15% | +11 pts depuis 2019 |\n| Inde | - | 12% | +3 pts |\n| Chine | Reprise achats | - | Retour actif |\n| Russie | Confisquées | 0% | Sanctions |\n\n## Perspectives\n\nCe mouvement n'est pas spéculatif : il est stratégique. Il traduit une défiance structurelle envers le dollar comme actif de réserve unique, une anticipation des risques de sanctions financières (l'épisode russe de 2022 a tout changé), et une couverture contre la dévaluation compétitive des grandes devises.\n\n<QUOTE>Les banques centrales ont intégré l'or comme assurance géopolitique. Cette tendance est structurelle et durera plusieurs années.</QUOTE>\n\nCette analyse cartographie les dynamiques d'achat, les signaux d'accélération, et les décisions d'allocation pour les investisseurs institutionnels et privés.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-07",
    "readTime": 17,
    "image": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80"
  },
  {
    "id": "10",
    "title": "Crédit privé : la financiarisation alternative et ses risques cachés",
    "excerpt": "2 000 Md$ d'actifs sous gestion. Rendements de 9,2% vs 4,1% taux directeur. Ares, Apollo, Blackstone dominent. Q2 2026: premiers stress-tests dédiés. Les questions de valorisation et liquidité émergent.",
    "content": "<DATA>2 000 Md$</DATA> AUM crédit privé mondial (2025)<DATA>9,2 %</DATA> rendement moyen direct lending<DATA>2,4×</DATA> performance vs taux directeur<DATA>Q2 2026</DATA> premiers stress-tests Fed/BCE\n\n## Genèse et Structure\n\n### Pourquoi le crédit privé a explosé : la régulation comme catalyseur\n\nLe crédit privé n'est pas une innovation financière née dans un laboratoire — c'est une réponse directe au retrait forcé des banques du marché du prêt aux entreprises de taille intermédiaire (ETI), sous l'effet des régulations Bâle III (2013) puis Bâle IV (appliquées depuis 2023).\n\n| Segment | AUM 2025 | Croissance 5 ans |\n|---------|----------|------------------|\n| Crédit privé US | 1 600 Md$ | +100% |\n| Crédit privé Europe | 450 Md€ | +80% |\n| Direct Lending | Dominant | - |\n| Real Assets | En croissance | - |\n\n## Les Acteurs Principaux\n\n**Ares Management, Apollo, Blackstone et Claremont** dominent un marché qui a capté ce que les banques ont abandonné sous l'effet des régulations Bâle III/IV.\n\n<QUOTE>Les rendements de 9,2%attirent massivement les fonds de pension, family offices et assureurs. Mais la liquidité reste le point faible de cette classe d'actifs.</QUOTE>\n\n## Les Signaux d'Alerte\n\nQ2 2026 verra les premiers stress-tests spécifiques au crédit privé — et les questions sur les valorisations, la liquidité et l'effet de levier caché commencent à émerger.\n\nCette analyse cartographie la structure du marché, ses rendements réels, et les signaux d'alerte à surveiller.",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-06",
    "readTime": 18,
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
  },
  {
    "id": "11",
    "title": "Nearshoring : la carte de la production mondiale se redessine",
    "excerpt": "-27% d'imports US depuis la Chine, +35% depuis le Mexique. VW double sa capacité à Puebla. Ternium investit 2,2 Md$ au MX. L'Europe redécouvre le Maroc, la Turquie et l'Europe centrale.",
    "content": "<DATA>-27 %</DATA> imports US depuis Chine (2022-2025)<DATA>+35 %</DATA> imports US depuis Mexique<DATA>2,2 Md$</DATA> investissement Ternium Puebla<DATA>2×</DATA> capacité VW Puebla\n\n## La Géographie Industrielle Post-2022\n\nLa guerre commerciale US-Chine initiée en 2018 et intensifiée en 2025 a produit un phénomène de 'trade diversion' — le détournement des flux commerciaux vers des pays tiers qui évitent les tarifs.\n\n## Les Flux Commerciaux\n\n| Indicateur | Avant 2022 | 2025 | Evolution |\n|------------|-----------|------|----------|\n| Imports US Chine | Référence | -27% | Baisse structurelle |\n| Imports US Mexique | Second | +35% | Devient #1 |\n| Part Chine commerce US | #1 | #2 | Reversement historique |\n\n## Les Investissements\n\n**Volkswagen** double sa capacité à Puebla (340 000 → 700 000 véhicules/an).\n\n**Ternium** investit 2,2 milliards de dollars dans une nouvelle aciérie à Pesquería (NL) — plus grand investissement sidérurgique MX en 20 ans.\n\n**Mexichem (Orbia)** accélère dans les matériaux de construction.\n\n<QUOTE>Le nearshoring transforme le México en plateforme industrielle majeure pour le marché nord-américain.</QUOTE>\n\nL'Europe, de son côté, redécouvre le Maroc, la Turquie et l'Europe centrale comme plateformes de near-shoring.\n\nCette analyse cartographie la recomposition des chaînes de valeur mondiales et les décisions d'allocation qu'elle génère.",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-05",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"
  },
  {
    "id": "12",
    "title": "Crise hydrique : la ressource que les marchés ignorent encore",
    "excerpt": "2,4 milliards de personnes en stress hydrique (+25% en 5 ans). L'Inde et le Pakistan produisent 30% du riz mondial. Nestlé India: pricing power +18%. Les utilities eau surperforment de 12% depuis 2023.",
    "content": "<DATA>2,4 Mrd</DATA> personnes en stress hydrique<DATA>+25 %</DATA> en 5 ans<DATA>30 %</DATA> production riz Inde + Pakistan<DATA>+18 %</DATA> pricing power Nestlé India<DATA>+12 %</DATA> surperformance utilities eau (2023-2025)\n\n## La Géographie du Stress Hydrique\n\n### Les Zones de Crise\n\n| Région | Niveau stress | Enjeu principal | Impact économique |\n|--------|--------------|-----------------|-------------------|\n| Punjab indo-pakistanais | Critique | 30% production riz mondial | Risque -20-30% rendements |\n| Proche-Orient | Extrême (>80%) | Quasi-zéro eau surface | Dessalement = 40% coût électricité |\n| Méditerranée | Severe | Sécheresse 2000 ans | Agriculture impactée |\n| Chine du Nord | Severe | Agriculture, industrie | Restrictions industrielles |\n\n## Les Opportunités d'Investissement\n\n**Nestlé India** affiche un pricing power de +18% sur ses produits liés à l'eau en 2025 — signal de rareté transmis aux prix à la consommation.\n\nLes utilities de traitement de l'eau cotées surperforment de 12% l'indice monde depuis 2023.\n\n<QUOTE>L'eau devient un actif stratégique. Les investisseurs institutionnels commencent à intégrer cette thématique.</QUOTE>\n\nCette analyse cartographie les zones de crise hydrique, les marchés agricoles sous tension, et les décisions d'allocation dans un thème d'investissement qui ne fait que commencer.",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-04",
    "readTime": 11,
    "image": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80"
  },
  {
    "id": "13",
    "title": "Fret maritime : la crise de la mer Rouge et ses conséquences structurelles",
    "excerpt": "BDI +42% au T4 2025. Cap de Bonne-Espérance: +26 jours de délai. Maersk: dividend yield 7,2%. La capacité mondiale a diminué de 8%. Analyse du marché du fret maritime.",
    "content": "<DATA>+42 %</DATA> Baltic Dry Index T4 2025 vs T4 2024<DATA>7,2 %</DATA> dividend yield Maersk<DATA>-8 %</DATA> capacité maritime mondiale effective<DATA>+26 j</DATA> délai via Cap vs Suez\n\n## La Crise de la Mer Rouge\n\n### 1. Le détournement qui dure\n\nDepuis décembre 2023, les attaques Houthies en mer Rouge ont contraint la quasi-totalité des compagnies maritimes à détourner leurs porte-conteneurs via le Cap de Bonne-Espérance.\n\n| Route | Distance | Délai supplémentaire | Surcoût |\n|-------|----------|---------------------|----------|\n| Shanghai-Rotterdam via Suez | 19 000 km | Référence | Référence |\n| Shanghai-Rotterdam via Cap | 29 000 km | +26 jours | +20-25% carburant |\n\n## Performances des Acteurs\n\n| Compagnie | Performance 2025 | Indicateur clé |\n|----------|-----------------|----------------|\n| Maersk | Record | Dividend yield 7,2% |\n| COSCO | Retour profitabilité | - |\n| Kuehne+Nagel | Marges reconstituées | +15% |\n\n<QUOTE>Le détournement de la mer Rouge n'est plus temporaire. Les armateurs intègrent cette nouvelle réalité dans leurs planning à long terme.</QUOTE>\n\nCette analyse cartographie les dynamiques du marché du fret maritime, les taux sur les routes clés, et les décisions d'allocation dans un secteur qui oscille entre crise et boom.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-03",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80"
  },
  {
    "id": "14",
    "title": "Family Offices : comment les grandes fortunes se repositionnent",
    "excerpt": "+18% d'allocation en or physique pour les family offices (+33% dans les vaults suisse et Dubai). Trusts du Liechtenstein: afflux de structures BRICS. Analyse des stratégies de repositionnement patrimonial.",
    "content": "<DATA>+18 %</DATA> allocation or physique family offices (2025)<DATA>+33 %</DATA> hausse dépôts vaults Suisse & Dubai<DATA>8-12 %</DATA> allocation offshore recommandée<DATA>4 000</DATA> family offices actifs dans le monde\n\n## Pourquoi ce Repositionnement ?\n\n### La logique géopolitique du repositionnement patrimonial\n\nLe gel des avoirs russes de 2022 a été le détonateur. Mais la tendance préexistait sous une forme plus discrète : les grandes fortunes — qu'elles soient russe, chinoise, moyen-orientale ou même européenne — ont toujours cherchées à diversifier leurs actifs au-delà de leur juridiction nationale.\n\n## Les Destinations Privilégiées\n\n| Destination | Type | Avantage | Evolution dépôt |\n|-------------|------|----------|------------------|\n| Suisse | Vaults | Neutralité, expertise | +33% |\n| Dubai | Vaults | Fiscalité, géopolitique | +33% |\n| Singapour | Hub | Asie, regulation | +25% |\n| Liechtenstein | Trusts | Protection juridique | +20% |\n\n## Les Allocations Recommandées\n\nPour les patrimoines >10 M€ exposés géopolitiquement, les family offices recommandent 8-12% en allocation offshore.\n\n<QUOTE>La fragmentation géopolitique pousse les patrimoines à se diversifier. C'est un mouvement structurel qui s'accélère.</QUOTE>\n\nCette analyse décrypte les stratégies de repositionnement patrimonial des family offices dans un contexte de fragmentation géopolitique, de risques de sanctions et de dédollarisation progressive.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-02",
    "readTime": 12,
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80"
  },
  {
    "id": "15",
    "title": "Marché du carbone : l'Europe crée les gagnants et perdants de la décarbonation",
    "excerpt": "EU ETS à 98€/tCO2 (+22% en un an). CBAM en déploiement complet. Allocation gratuite acier/ciment -45%. Recettes 2025: 50% fléchées vers le climat. Cartographie des flux financiers.",
    "content": "<DATA>98 €/tCO2</DATA> prix EU ETS (mars 2026)<DATA>+22 %</DATA> vs 2025<DATA>-45 %</DATA> réduction allocations gratuites acier/ciment<DATA>2024</DATA> CBAM déploiement complet\n\n## Architecture du Système\n\n### EU ETS Phase 4 : la mécanique d'un système en durcissement\n\nL'EU ETS est le plus grand marché du carbone au monde. Il couvre environ 40% des émissions de l'UE.\n\n## Les Indicateurs Clés\n\n| Indicateur | Donnée 2025 | Donnée 2026 | Evolution |\n|------------|-------------|--------------|----------|\n| Prix EU ETS | 80 €/tCO2 | 98 €/tCO2 | +22% |\n| Recettes totales | - | - | 50% vers climat |\n| Allocation acier/ciment | Référence | -45% | Durcissement |\n| CBAM | Partiel | Complet | Extension |\n\n## Les Gagnants et Perdants\n\n**Gagnants** :\n- Gestionnaires de certificats carbone\n- Énergies renouvelables\n- Utilities bas-carbone\n\n**Perdants** :\n- Industrie lourde européenne sans plan de décarbonation\n- Secteurs non couverts par le CBAM\n\n<QUOTE>Le prix du carbone atteint des niveaux qui commencent à transformer les décisions d'investissement industriel.</QUOTE>\n\nCette analyse cartographie les flux financiers du marché carbone et les décisions d'allocation qu'il génère.",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-01",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80"
  },
  {
    "id": "16",
    "title": "Informatique quantique : comment elle va transformer la finance d'ici 2030",
    "excerpt": "IBM Quantum Volume ×4 en 2025-2026 (8 192). Quantum desks JPM/BNP opérationnels en 2027. NIST finalise les standards post-quantiques en 2024. La menace sur le chiffrement est prise au sérieux.",
    "content": "<DATA>8 192</DATA> Quantum Volume IBM (2026)<DATA>×4</DATA> progression 2025-2026<DATA>2027</DATA> horizon quantum desks bancaires<DATA>2030-2035</DATA> fenêtre QC cryptanalytically relevant\n\n## L'État de l'Art en 2026\n\n### 1. Où en est vraiment l'informatique quantique ?\n\nL'informatique quantique souffre d'un problème de communication : les annonces sont spectaculaires, mais la réalité opérationnelle est encore modeste.\n\n## Les Progrès Techniques\n\n| Indicateur | 2024 | 2025 | 2026 | Evolution |\n|------------|------|------|------|----------|\n| IBM Quantum Volume | 2 048 | 4 096 | 8 192 | ×4 en 2 ans |\n| Qubits稳定 | 1 000+ | 1 500+ | 2 000+ | Progression |\n| Erreur qubits | 10⁻³ | 10⁻⁴ | 10⁻⁴ | Amélioration lente |\n\n## Les Cas d'Usage Financiers\n\n**Goldman Sachs** teste l'optimisation quantique de portefeuille sur des cas réels.\n\n**JPMorgan, BNP Paribas et Deutsche Bank** ont ouvert des 'quantum desks' attendus opérationnels en 2027.\n\n<QUOTE>Les institutions financières prepadent dès maintenant l'arrivée de l'informatique quantique. C'est un sujet de long terme mais stratégique.</QUOTE>\n\nCette analyse décrypte le calendrier réaliste, les cas d'usage financiers, et les opportunités d'investissement dans un thème à horizon 2028-2035.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-28",
    "readTime": 15,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&q=80"
  },
  {
    "id": "17",
    "title": "Défense européenne à 10 Mds£ : anatomie d'une transformation historique",
    "excerpt": "Au sommet de La Haye, les 32 membres de l'OTAN dépassent pour la première fois les 2% du PIB. Rheinmetall: 63,8 Md€ de backlog (+36%). Thales: +85% en Bourse. Le supercycle est enclenché.",
    "content": "<DATA>5 %</DATA> PIB défense OTAN objectif 2035<DATA>63,8 Md€</DATA> carnet commandes Rheinmetall<DATA>+85 %</DATA> performance Thales 12 mois<DATA>360 Md€</DATA> dépenses défense UE (2025)\n\n## Le Tournant de La Haye\n\n### Du 2% au 5% : la rupture stratégique de juin 2025\n\nPendant dix ans, l'objectif des 2% du PIB a été le marqueur de référence de l'engagement des alliés — et la source d'incessantes tensions entre Washington et une Europe perçue comme trop économe sur sa propre sécurité.\n\nEn juin 2025 à La Haye, cette époque s'est fermée. Pour la première fois de l'histoire de l'Alliance, les 32 membres dépassent simultanément le seuil de 2%.\n\n## Les Performances Boursières\n\n| Entreprise | Performance 2025 | Carnet commandes |\n|------------|-----------------|------------------|\n| Rheinmetall | +152% | 63,8 Md€ |\n| Thales | +85% | 53,3 Md€ |\n| BAE Systems | +45% | - |\n| Leonardo | +38% | - |\n| ETF EUAD | +49% | - |\n\n<QUOTE>Le supercycle de défense européen est enclenché. Les industriels bénéficient de commandes historiques et d'une visibilité sans précédent.</QUOTE>\n\nCette analyse cartographie le supercycle, ses bénéficiaires industriels, ses contraintes d'exécution, et le playbook d'allocation pour en capter la prime structurelle.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-27",
    "readTime": 16,
    "image": "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1200&q=80"
  },
  {
    "id": "18",
    "title": "Hypersoniques : la course aux armements et le bouclier avant 2030",
    "excerpt": "Russie: Kinzhal (Mach 10), Zircon, Avangard opérationnels. Chine: DF-17/DF-ZF depuis 2019. US: programmes en retard. L'OTAN n'aura aucune capacité d'interception systématique avant 2030.",
    "content": "<DATA>Mach 10</DATA> vitesse Kinzhal<DATA>144</DATA> missiles Kinzhal commandés (2025)<DATA>2030+</DATA> horizon interception OTAN<DATA>37 %</DATA> taux interception Kinzhal (sept. 2025)\n\n## L'Arsenal Hypersonique Mondial\n\n### 1. L'inventaire en mars 2026 : trois vitesses, trois niveaux de menace\n\nLa course aux armements hypersoniques oppose trois catégories d'acteurs :\n\n| Puissance | Systèmes | Statut | Horizon |\n|-----------|----------|--------|--------|\n| Russie | Kinzhal, Zircon, Avangard | Opérationnels | Maintenant |\n| Chine | DF-17, DF-ZF, DF-27 | En service/essais | 2019-2025 |\n| USA | HAWC, Dark Eagle, ARRW | Retards | 2028+ |\n| Inde | Shaurya, Hypersonic Technology Demonstrator | Tests | 2025+ |\n\n## Les Capacités Russes\n\n**Kinzhal** : Missile balistique hypersonique air-lancé, Mach 10, portée 1 500-2 000 km, utilisé en Ukraine depuis 2022. 144 missiles commandés en 2025 (vs 44 en 2024).\n\n**Zircon** : Missile de croisière hypersonique naval, Mach 8-9, portée 1 000 km.\n\n**Avangard** : Planeur stratégique hypersonique, Mach 20+.\n\n<QUOTE>L'OTAN ne disposera d'aucune capacité d'interception systématique des hypersoniques avancés avant 2030 au mieux. C'est une fenêtre de vulnérabilité sans précédent.</QUOTE>\n\nCette analyse cartographie la course aux armements hypersoniques, les leçons d'Ukraine, et les implications stratégiques pour la défense occidentale.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-26",
    "readTime": 13,
    "image": "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&q=80"
  },
  {
    "id": "19",
    "title": "Drones de guerre : le drone qui redéfinit la guerre moderne",
    "excerpt": "10 millions de drones FPV produits et déployés en Ukraine depuis 2022. Coût unitaire: 200-500$ vs 2M$ pour un missile Patriot. L'Europe accuse un retard structurel face à la Chine et les US.",
    "content": "<DATA>10 M</DATA> drones FPV produits/déployés Ukraine<DATA>100 Md$</DATA> marché UAV européen 10 ans<DATA>1:4 000</DATA> ratio coût FPV/Patriot<DATA>2026</DATA> UMEX Abu Dhabi - essaims autonomes\n\n## La Leçon Ukrainienne\n\n### Ukraine : le laboratoire mondial de la guerre par drones\n\nL'Ukraine est le premier conflit de haute intensité où les drones ont joué un rôle décisif à tous les niveaux du champ de bataille.\n\n## L'Écosystème Drone\n\n| Catégorie | Volume Ukraine | Coût unitaire | Ratio |\n|-----------|---------------|---------------|-------|\n| FPV drones | 10 millions | 200-500$ | Référence |\n| Lancet | - | 30 000$ | 1:70 |\n| Bayraktar TB2 | - | 2-5 M$ | 1:4 000 |\n| missiles Patriot | - | 2 M$ | - |\n\n## Le Retard Européen\n\nL'Europe accuse un retard structurel face à la Chine (DJI, CETC) et aux États-Unis (Anduril, Shield AI).\n\n<QUOTE>Le Drone-as-a-Service (DaaS) promet de transformer l'accès à la puissance aérienne pour les armées de toutes tailles.</QUOTE>\n\nCette analyse cartographie l'écosystème drone militaire, les leçons d'Ukraine, et les opportunités d'investissement dans la défense low-cost.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-25",
    "readTime": 11,
    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80"
  },
  {
    "id": "20",
    "title": "IA militaire : l'intelligence artificielle entre dans la chaîne de commandement",
    "excerpt": "France: lancement de l'IA de Défense (AIAD) en janvier 2026. US: CDAO doté de 1,8 Md$. Chine: intégrée dans la doctrine depuis 2017. L'Europe accuse 5 ans de retard. Le débat sur l'autonomie léthale.",
    "content": "<DATA>1,8 Md$</DATA> budget CDAO Pentagone (IA défense)<DATA>2026</DATA> lancement AIAD France<DATA>-30 %</DATA> coûts maintenance jumeaux numériques<DATA>5 ans</DATA> retard Europe vs US/Chine\n\n## Les Applications Militaires de l'IA\n\n### 1. L'IA dans la chaîne de commandement : quatre ruptures opérationnelles\n\nL'intelligence artificielle militaire ne se résume pas aux drones autonomes — c'est un ensemble de capacités transversales qui transforment chaque maillon de la chaîne opérationnelle.\n\n## Les Budgets\n\n| Pays | Programme | Budget | Statut |\n|------|-----------|--------|--------|\n| USA | CDAO (Chief Digital and AI Office) | 1,8 Md$/an | Opérationnel depuis 2023 |\n| France | AIAD (Agence IA Défense) | - | Lancé janvier 2026 |\n| Chine | Doctrine intégrée | Classifié | Depuis 2017 |\n| UK | AI Defence | En développement | - |\n\n## Les Retards Européens\n\nL'Europe accuse cinq ans de retard sur les États-Unis et la Chine dans les systèmes d'IA militaire. Consensus des think tanks (IISS, IFRI, CNAS) : mars 2026.\n\n<QUOTE>La question de l'autonomie léthale — qui décide de tirer ? — reste le débat éthique le plus urgent de la défense contemporaine.</QUOTE>\n\nCette analyse cartographie l'IA militaire : ses applications réelles, ses acteurs, et les décisions d'investissement.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-24",
    "readTime": 12,
    "image": "https://images.unsplash.com/photo-1532579005566-2d6424c1c891?w=1200&q=80"
  },
  {
    "id": "21",
    "title": "Arctique 2026 : l'épicentre de la compétition stratégique",
    "excerpt": "Trump veut des bases au Groenland pour le Golden Dome (25 Md$). Russie: renforcement de Mourmansk. Oreshnik testé à Mach 10. L'Arctique est le nouveau théâtre de la dissuasion stratégique.",
    "content": "<DATA>25 Md$</DATA> budget Golden Dome<DATA>50 %</DATA> surface glacée disparue<DATA>2024</DATA> premier exercice OTAN Arctique<DATA>Mach 10</DATA> vitesse Oreshnik\n\n## Le Golden Dome — Architecture & Enjeux\n\n### 1. Golden Dome : de Reagan au 21e siècle — la SDI revient\n\nLe programme Golden Dome, annoncé par décret présidentiel le 27 janvier 2025, est la plus grande initiative de défense antimissile américaine depuis l'Initiative de Défense Stratégique (SDI) de Reagan.\n\n## Les Capacitémilitaires Arctiques\n\n| Puissance | Capacité | Localisation |\n|------------|----------|--------------|\n| Russie | Flotte SNLE + Oreshnik | Mourmansk |\n| USA | SNLE | Base阿拉斯加 |\n| OTAN | Exercices | Groenland |\n| Chine | surveillance | Station Tremblade |\n\n## Les Enjeux\n\nTrump veut des bases américaines au Groenland pour déployer le Golden Dome. La Russie renforce simultanément ses positions à Mourmansk — hub de sa flotte sous-marine nucléaire.\n\n<QUOTE>L'Arctique est le nouveau théâtre de la dissuasion stratégique, où les hypersoniques russes, les SNLE américains et les ambitions chinoises se croisent.</QUOTE>\n\nCette analyse cartographie l'Arctique comme théâtre militaire et son articulation avec le programme Golden Dome.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-23",
    "readTime": 13,
    "image": "https://images.unsplash.com/photo-1603745259452-c11b7b1ed4b9?w=1200&q=80"
  },
  {
    "id": "22",
    "title": "ReArm Europe : le plus grand programme de réarmement de l'histoire européenne",
    "excerpt": "800 Md€ sur 5 ans. Rheinmetall: +152% en 2025. ETF EUAD: +49%. La consolidation industrielle s'accélère. Mais Bâle IV freine le financement bancaire. Analyse des flux et gagnants.",
    "content": "<DATA>800 Md€</DATA> plan ReArm Europe (5 ans)<DATA>+152 %</DATA> performance Rheinmetall 2025<DATA>+49 %</DATA> ETF EUAD 12 mois<DATA>2×</DATA> dépenses défense UE (2022-2025)\n\n## L'Architecture du Plan\n\n### ReArm Europe : trois piliers, une ambition\n\nLe Plan ReArm Europe repose sur trois piliers complémentaires :\n\n**Pilier 1** : Budgétaire — Les États membres sont autorisés à exclure leurs dépenses de défense du calcul du déficit excessif — ouvrant jusqu'à 650 Md€ d'espace budgétaire.\n\n**Pilier 2** : Prêts SAFE — 150 Md€ de financements souverains.\n\n**Pilier 3** : Mobilisation secteur privé.\n\n## Les Performances\n\n| Indicateur | Valeur | Evolution |\n|------------|--------|----------|\n| Dépenses défense UE | 360 Md€ (2025) | +50% vs 2022 |\n| Rheinmetall | +152% | Performance record |\n| Thales | +85% | Carnet 53,3 Md€ |\n| ETF EUAD | +49% | Surperformance |\n\n<QUOTE>La consolidation industrielle européenne s'accélère. Mais Bâle IV freine le financement bancaire des entreprises de défense.</QUOTE>\n\nCette analyse cartographie les flux du ReArm Europe, les bénéficiaires industriels, et le playbook d'allocation pour la plus grande opportunité sectorielle de la décennie.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-22",
    "readTime": 13,
    "image": "https://images.unsplash.com/photo-1603745259452-c11b7b1ed4b9?w=1200&q=80"
  },
  {
    "id": "23",
    "title": "SMR militaires : réacteurs modulaires pour bases isolées et nucléaire tactique",
    "excerpt": "Project Pele: démonstration complète en 2024. Oklo: contrat avec l'Air Force. Horizon 2028-2030 pour les premiers SMR opérationnels sur bases arctiques. Le lien avec la dépendance à Rosatom.",
    "content": "<DATA>2024</DATA> démonstration Project Pele<DATA>2030</DATA> horizon SMR militaires<DATA>35-40 %</DATA> dépendance enrichissement Rosatom<DATA>2028</DATA> premier SMR operational\n\n## SMR Militaires — État des Lieux\n\n### L'énergie comme capacité opérationnelle\n\nUne base militaire avancée dans l'Arctique consomme des quantités considérables d'énergie pour le chauffage, les communications, les radars et les systèmes d'armes.\n\n## Les Programmes\n\n| Programme | Développeur | Puissance | Statut |\n|-----------|-------------|-----------|--------|\n| Project Pele | BWXT | 1-5 MWe | Démo complète 2024 |\n| Aurora | Oklo Inc | 15 MWe | Contrat USAF |\n| eVinci | Westinghouse | 5 MWe | En développement |\n| Hermes | GEH | 50 MWe | Tests |\n\n## La Dépendance à Rosatom\n\nL'Occident dépend à 35-40% de l'enrichissement russe pour l'uranium civil. Cette dépendance civile a des implications militaires.\n\nLa loi US interdisant l'uranium russe enrichi (Prohibiting Act 2024) obligation de trouver des alternatives.\n\n<QUOTE>Les SMR militaires représentent une opportunité de réduire simultanément la dépendance énergétique et la dépendance à Rosatom.</QUOTE>\n\nCette analyse explore la convergence défense-énergie nucléaire, le calendrier des SMR militaires, et les implications pour les chaînes d'approvisionnement en uranium.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-21",
    "readTime": 6,
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80"
  },
  {
    "id": "24",
    "title": "Salt Typhoon : la guerre invisible dans les télécommunications",
    "excerpt": "Salt Typhoon a compromis 8 opérateurs télécoms US. Le sénateur Warner: 'pire hack de l'histoire américaine'. Phishing par LLM: taux de clic 3× supérieur. NIS2 en vigueur depuis octobre 2024. Marché: 266 Md$.",
    "content": "<DATA>8</DATA> opérateurs télécoms US compromis<DATA>266 Md$</DATA> marché cybersécurité 2025<DATA>3×</DATA> taux clic phishing IA vs manuel<DATA>Oct. 2024</DATA> NIS2 en vigueur\n\n## Salt Typhoon — L'Intrusion la Plus Grave\n\n### 1. Salt Typhoon : quand la Chine infiltre les écoutes légales américaines\n\nL'affaire Salt Typhoon est qualitativement différente des cyberattaques habituelles. Le groupe chinois a compromis les systèmes d'écoute légale (CALEA) d'au moins huit opérateurs américains — dont AT&T et Verizon.\n\n## Les Chiffres Clés\n\n| Indicateur | Donnée |\n|------------|--------|\n| Opérateurs compromis | 8 (AT&T, Verizon + 6 autres) |\n| Communications interceptées | Responsables gouvernementaux, candidats |\n| Délai détection | Plusieurs mois |\n| Statut mars 2026 | Réseaux potentiellement compromis |\n\n## Les Implications\n\nLe marché mondial de la cybersécurité atteint 266 Md$ en 2025 (+12-15% par an).\n\nNIS2 impose ses obligations depuis octobre 2024 — 100 000+ entités EU nouvellement soumises.\n\n<QUOTE>Le sénateur Mark Warner a qualifié l'incident de 'pire hack de l'histoire américaine'. C'est un avertissement sérieux sur la vulnérabilité des infrastructures critiques.</QUOTE>\n\nCette analyse cartographie les vecteurs de menace, les obligations réglementaires, et les allocations dans un marché cyber en hypercroissance structurelle.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-20",
    "readTime": 13,
    "image": "https://images.unsplash.com/photo-1563206767-5b1d97289374?w=1200&q=80"
  },
  {
    "id": "25",
    "title": "Ukraine : le conflit qui redessine l'ordre européen",
    "excerpt": "1,2M de pertes militaires russes, 500-600k ukrainiennes. La Russie n'a conquis moins de 1% de territoire supplémentaire depuis 2024. Les négociations de Genève ont échoué. Coût reconstruction: 500 Md€.",
    "content": "<DATA>1,2 M</DATA> pertes militaires russes (cumulées)<DATA>500-600k</DATA> pertes militaires ukrainiennes<DATA><1 %</DATA> territoire supplémentaire conquis (2024)<DATA>500 Md€</DATA> coût reconstruction Ukraine\n\n## Bilan Capacitaire — 4 Ans\n\n### 1. La comptabilité de la guerre d'usure\n\nQuatre ans après l'invasion russe à grande échelle du 24 février 2022, la guerre en Ukraine s'est muée en une guerre d'usure sans précédent depuis la Seconde Guerre mondiale.\n\n## Les Pertes\n\n| Camp | Tués | Blessés | Total |\n|------|------|---------|-------|\n| Russie | 325 000 | 875 000 | 1,2 M |\n| Ukraine | 100 000-140 000 | 400 000-460 000 | 500-600k |\n\n<QUOTE>Et pourtant, la Russie n'a conquis que moins de 1% de territoire ukrainien supplémentaire depuis 2024. C'est le paradoxe de cette guerre d'usure.</QUOTE>\n\n## Les Perspectives\n\nLes négociations de Genève ont échoué en moins de 24 heures. Les positions territoriales restent irréconciliables.\n\nCette analyse dresse le bilan capacitaire à mars 2026, cartographie la ligne de front, et évalue les scénarios de sortie et leurs implications pour la BITD européenne.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-19",
    "readTime": 16,
    "image": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80"
  },
  {
    "id": "26",
    "title": "Taïwan : l'épicentre de la prochaine crise mondiale",
    "excerpt": "89 avions militaires chinois détectés en un jour en décembre 2025. Record. Les US estiment que l'APL peut mener un large éventail d'opérations d'ici 2027. TSMC: 90%+ des puces <5nm. Le risque économique mondial.",
    "content": "<DATA>89</DATA> avions chinois détectés (29 déc. 2025)<DATA>2027</DATA> horizon capacité invasion APL<DATA>90%+</DATA> production mondiale puces <5nm (TSMC)<DATA>40 Md$</DATA> budget défense asymétrique Taïwan\n\n## La Coercition Graduelle\n\n### 1. La stratégie chinoise : de la coercition au blocus\n\nL'exercice du 29 décembre 2025 n'est pas un incident isolé — c'est l'étape la plus récente d'une escalade méthodique.\n\n## Les Exercices Chinois 2025-2026\n\n| Date | Nature | Effectifs | Message |\n|------|--------|-----------|---------|\n| Déc. 2025 | Blocus simulé | 89 avions, 28 navires | Record |\n| Fév. 2026 | Opération amphibie simulée | - | Escalade |\n| Mars 2026 | 'Normalisation de la coercition' | Taipei |常态化 |\n\n## Les Capacités Taïwanaises\n\nTaïwan propose un budget de défense asymétrique de 40 Md$ (2026-2033) : stratégie du porc-épic avec 200 000 drones + systèmes Drones.\n\n<QUOTE>Personne ne sait avec précision quand Xi Jinping décidera de bouger. Mais les capacités militaires chinoises s'approchent de la capacité de mener un large éventail d'opérations — blocus, frappes, invasion — d'ici 2027.</QUOTE>\n\nCette analyse cartographie les capacités militaires chinoises, la stratégie de défense asymétrique taïwanaise, et les implications économiques mondiales d'une crise dans le détroit.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-18",
    "readTime": 13,
    "image": "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=1200&q=80"
  },
  {
    "id": "27",
    "title": "Mer Rouge : le nouveau théâtre de guerre hybride",
    "excerpt": "300+ attaques Houthies depuis novembre 2023. +26 jours de délai via le Cap de Bonne-Espérance. Coût annuel du détournement: 140 Md$. EUNAVFOR Aspides: mandat défensif uniquement. Aucune solution en vue.",
    "content": "<DATA>300+</DATA> attaques Houthies (nov. 2023-mars 2026)<DATA>140 Md$</DATA> coût annuel détournement<DATA>+26 j</DATA> délai supplémentaire Cap vs Suez<DATA>23</DATA> États membres EUNAVFOR Aspides\n\n## Les Houthis — Acteur Non-Étatique Stratégique\n\n### 1. Comment un mouvement tribal est devenu une puissance maritime\n\nLes Houthis (Ansar Allah) ont démontré leur capacité à perturber le commerce mondial depuis le Yémen.\n\n## Les Attaques\n\n| Période | Attaques | Impact |\n|---------|-----------|--------|\n| Nov. 2023 - Mars 2026 | 300+ | Plus de 26 jours de délai |\n| Coût annuel | 140 Md$ | Assurances, carburant, délais |\n| Navires concernés | Mostly Israel-linked | Mais impact global |\n\n## Les Réponses\n\n**EUNAVFOR Aspides** : Mission défensive de protection des navires, sans mandat offensif contre les bases Houthies. 23 États membres participants.\n\n**USA** : Frappes directes contre les capacités Houthies, avec des résultats mitigés.\n\n<QUOTE>Les Houthis ont développé des capacités de missiles et drones de plus en plus sophistiquées (avec aide iranienne et pièces chinoises). Aucune solution diplomatique n'est en vue en mars 2026.</QUOTE>\n\nCette analyse cartographie la crise, les capacités militaires des Houthis, et les implications pour la Marine nationale française.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-17",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1583010788564-ac9da8f4442f?w=1200&q=80"
  },
  {
    "id": "28",
    "title": "Guerre sous-marine : les câbles et les marins comme nouveau théâtre stratégique",
    "excerpt": "400+ câbles sous-marins actifs. 95% du trafic internet international. Sabotage Nord Stream: premier acte de guerre sous-marine majeur. 50 SNLE en service. XLUUV: la nouvelle arme des profondeurs.",
    "content": "<DATA>400+</DATA> câbles sous-marins actifs<DATA>95 %</DATA> trafic internet international<DATA>50</DATA> SNLE en service (5 puissances)<DATA>300 km</DATA> pipeline Nord Stream détruit\n\n## La Vulnérabilité des Câbles Sous-Marins\n\n### 1. L'infrastructure la plus critique et la moins protégée du monde\n\nLe monde numérique repose sur 400+ câbles sous-marins qui transportent 95% du trafic internet international et la quasi-totalité des transactions financières mondiales.\n\n## L'Inventaire Sous-marin\n\n| Puissance | SNLE en service | Base principale |\n|-----------|-----------------|-----------------|\n| USA | 14 | Kings Bay, Bangor |\n| Russie | 14 | Mourmansk, Severodvinsk |\n| France | 4 | Île Longue |\n| Chine | 12+ | Sanya |\n| UK | 4 | Faslane |\n\n## Les Incidents\n\n**Septembre 2022** : Sabotage du gazoduc Nord Stream — premier acte de guerre sous-marine majeur. 300 km de pipeline détruit.\n\n**2024-2025** : Plusieurs câbles sectionnés en Baltique (Estlink-1, BCS East-West Interlink) — navires russes impliqués.\n\n<QUOTE>Les XLUUV (Extra-Large Unmanned Underwater Vehicles) émergent comme la nouvelle arme des profondeurs. C'est la bataille invisible pour la suprématie des fonds marins.</QUOTE>\n\nCette analyse cartographie la compétition sous-marine : cables, SNLE, drones, et la bataille invisible pour la suprématie des fonds marins.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-16",
    "readTime": 11,
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80"
  },
  {
    "id": "29",
    "title": "Chars de combat : l'avenir du combat blindé à l'ère des drones",
    "excerpt": "3 400+ chars russes détruits en Ukraine. MGCS (char 6e génération): programme en crise. Coût drone FPV: 200$ vs 3-4M$ pour un char. Le char: ni mort ni roi, mais transformé.",
    "content": "<DATA>3 400+</DATA> chars russes détruits/capturés (Oryx)<DATA>1 500+</DATA> chars produits Russie (2025)<DATA>2035</DATA> horizon MGCS<DATA>200 $</DATA> coût drone FPV anti-char\n\n## Les Leçons d'Ukraine\n\n### 1. Le char ni mort ni roi — mais transformé\n\nLa guerre en Ukraine a produit des leçons contradictoires sur le char de combat. Dans les premières semaines, des vidéos de chars russes détruits par des drones FPV à 300 dollars ont circulé mondialement.\n\n## Production et Pertes\n\n| Indicateur | Donnée |\n|------------|--------|\n| Chars russes détruits/capturés (Oryx) | 3 400+ |\n| Chars produits par Russie (2025) | 1 500+ |\n| T-72, T-80, T-90 | Principales pertes |\n| Leopard 2, Abrams | Aussi perdus |\n\n## Le Programme MGCS\n\nLe programme franco-allemand MGCS (Main Ground Combat System) — char de combat de 6e génération prévu pour 2035 — est en crise. Dassault et KNDS ne parviennent pas à s'accorder sur le partage des travaux.\n\n<QUOTE>Coût d'un drone FPV anti-char: 200$. Coût d'un char T-90 ou Leopard 2: 3-4 M$. Le ratio est de 1:15 000. Mais le char reste indispensable pour l'offensive blindée.</QUOTE>\n\nCette analyse cartographie les leçons blindées d'Ukraine et l'avenir du char dans un contexte de prolifération des drones.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-15",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1594729095093-5c4d86315416?w=1200&q=80"
  },
  {
    "id": "30",
    "title": "Artillerie : CAESAR, HIMARS, pénurie de 155 mm - la reine des batailles revient",
    "excerpt": "Ukraine: 5 000-7 000 obus/jour. Production européenne 2025: 1,1-1,3M (objectif: 2M). CAESAR: plus grande commande export Nexter. ATACMS: 300 km de portée. L'Europe n'est pas prête.",
    "content": "<DATA>5 000-7 000</DATA> obus 155mm consommés/jour Ukraine<DATA>1,1-1,3 M</DATA> obus produits Europe (2025)<DATA>300 km</DATA> portée ATACMS<DATA>77</DATA> CAESAR livrés/commandés Ukraine\n\n## L'Évolution Artillerie\n\n### Ukraine : l'artillerie longue portée kembali décisive\n\nLa guerre en Ukraine a confirmé ce que les guerres du Golfe et d'Afghanistan avaient temporairement masqué : contre un adversaire disposant d'une défense antiaérienne robuste, l'aviation ne peut pas opérer librement.\n\n## Production et Besoins\n\n| Indicateur | Donnée 2022 | Donnée 2025 | Objectif |\n|-----------|-------------|-------------|----------|\n| Production européenne | 700 000 | 1,1-1,3 M | 2 M |\n| Consommation Ukraine/jour | - | 5 000-7 000 | - |\n| Jours de consommation | - | - | Équivalent 4 jours prod |\n\n## Les Systèmes Clés\n\n**CAESAR** (Nexter/KNDS) : 77 systèmes livrés ou commandés pour l'Ukraine — plus grande commande export depuis la création du système.\n\n**HIMARS** (US) : Revolutionisé la frappe longue portée.\n\n**ATACMS** : 300 km de portée — autorisé à frapper en Russie depuis novembre.\n\n<QUOTE>L'Europe n'est pas prête à soutenir un conflit de haute intensité pendant plus de quelques semaines. La pénurie de munitions est le talon d'Achille de la défense européenne.</QUOTE>\n\nCette analyse cartographie la renaissance de l'artillerie, la crise des munitions, et les implications industrielles.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-14",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1508615039623-a25605d2b012?w=1200&q=80"
  },
  {
    "id": "31",
    "title": "Guerre électronique : la bataille du spectre électromagnétique",
    "excerpt": "500+ vols commerciaux perturbés par brouillage GPS en Baltique. Systèmes russes Krasukha-4: brouillage à 300 km. Taux de neutralisation drones: 40-70%. L'Europe lance le programme JAMMER avec Airbus.",
    "content": "<DATA>500+</DATA> vols commerciaux perturbés (Baltique)<DATA>300 km</DATA> portée brouillage Krasukha-4<DATA>40-70 %</DATA> taux neutralisation drones Ukraine<DATA>2026</DATA> lancement programme JAMMER EU\n\n## La Guerre Invisible\n\n### Le spectre électromagnétique comme champ de bataille\n\nLa guerre électronique (GE) — la capacité à exploiter, perturber et protéger le spectre électromagnétique — est le théâtre le moins visible et pourtant le plus décisif des conflits modernes.\n\n## Les Systèmes Russes\n\n| Système | Fonction | Portée |\n|---------|----------|--------|\n| Krasukha-4 | Brouillage AWACS, drones ISR | 300 km |\n| Pole-21 | Brouillage GPS | 150 km |\n| Rtut | Détection radars | - |\n| Divnomorye | Déception défense aérienne | - |\n\n## Les Incidents Documentés\n\n**2024-2025** : 500+ vols commerciaux perturbés par brouillage GPS en Finlande, Estonie, Pologne et-dessus de la Baltique. Attribution : systèmes russes de Kaliningrad et Saint-Pétersbourg.\n\n<QUOTE>La guerre électronique n'est pas un gadget de technician : c'est la condition de possibilité de toute la guerre de précision moderne.</QUOTE>\n\nCette analyse cartographie les capacités GE des puissances, les incidents documentés, et les enjeux industriels. L'Europe lance le programme JAMMER avec Airbus Defence & Space.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-13",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1200&q=80"
  },
  {
    "id": "32",
    "title": "Missiles de croisières : la précision comme arme stratégique du 21e siècle",
    "excerpt": "Storm Shadow: 250 km de portée. Kalibr: 1 500 km. Tomahawk: 2 500 km. Prolifération vers puissances moyennes et acteurs non-étatiques. L'équilibre régional redessiné.",
    "content": "<DATA>2 500 km</DATA> portée Tomahawk Block V<DATA>250 km</DATA> portée Storm Shadow/SCALP<DATA>1 500 km</DATA> portée Kalibr 3M-14<DATA>3 M$</DATA> coût unitaire Storm Shadow\n\n## L'Arsenal Mondial\n\n### Inventaire mondial des missiles de croisière en 2026\n\nLe missile de croisières — vol à faible altitude, guidage GPS/INS, charge militaire conventionnelle ou nucléaire — est devenu l'arme de précision longue portée dominante des conflits modernes.\n\n## Les Systèmes\n\n| Système | Pays | Portée | Mode de lancement |\n|---------|------|--------|-------------------|\n| Tomahawk Block V | USA | 2 500 km | Naval-Sol, Sol-Sol |\n| Storm Shadow/SCALP | FR/UK | 250-500 km | Air-Sol |\n| JASSM-ER | USA | 1 000 km | Air-Sol |\n| Kalibr | Russie | 1 500 km | Naval-Sol, Sous-marin |\n| BrahMos | Inde | 450 km | Naval-Sol, Air-Sol |\n\n## La Prolifération\n\nLa prolifération de ces systèmes — désormais accessible à des puissances moyennes et à des acteurs non-étatiques (Houthis, Hezbollah) — redéfinit les équilibres régionaux.\n\n<QUOTE>Le coût d'un Storm Shadow (3 M$) contre 300 000$ pour un Shahed-136 iranien. L'asymétrie économique change la donne tactique.</QUOTE>\n\nCette analyse cartographie l'arsenal mondial des missiles de croisières, leurs performances documentées, et les enjeux de prolifération.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-12",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
  },
  {
    "id": "33",
    "title": "Nucléaire sous-marin : la modernisation silencieuse des arsenaux",
    "excerpt": "5 puissances nuclearisent modernisent simultanément leurs SNLE. US: Columbia (12 units, 1er opérationnel 2031). France: SNLE 3G (2035+). Chine: Type 096 + JL-3. Coût cumulé: 1 000+ Md$ sur 30 ans.",
    "content": "<DATA>12</DATA> SNLE Columbia commandés US<DATA>2031</DATA> premier SNLE Columbia opérationnel<DATA>1 000+ Md$</DATA> coût cumulé 30 ans<DATA>2035+</DATA> horizon SNLE 3G France\n\n## La Modernisation en Cours\n\n### Cinq puissances, cinq programmes simultanés\n\nCinq puissances nuclearisent modernisent simultanément leurs forces nucléaire sous-marines — un phénomène sans précédent depuis la Guerre froide.\n\n## Les Programmes\n\n| Puissance | Programme | SNLE actuels | Successeur | Coût estimé | Horizon |\n|-----------|-----------|--------------|-------------|-------------|----------|\n| USA | Columbia | 14 Ohio | 12 Columbia | 130 Md$ | 2031 |\n| Russie | Borei-A | 12 | 5 Borei-A | 40 Md$ | 2025-2030 |\n| France | Le Triomphant | 4 | SNLE 3G | - | 2035+ |\n| UK | Dreadnought | 4 | Dreadnought | 31 Md$ | 2030+ |\n| Chine | Type 094 | 6-8 | Type 096 | Classifié | 2030+ |\n\n<QUOTE>Ce réarmement nucléaire sous-marin silencieux — estimé à plus de 1 000 Md$ cumulés sur 30 ans — est le programme d'armement le plus coûteux de l'histoire.</QUOTE>\n\nCette analyse cartographie les programmes en cours, les implications stratégiques, et les opportunités industrielles.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-11",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1609450567271-1d3ff1da3b4e?w=1200&q=80"
  },
  {
    "id": "34",
    "title": "Guerre hybride : la déstabilisation de l'Europe sous le seuil de l'article 5",
    "excerpt": "600+ incidents hybrides attribués à la Russie en Europe depuis 2022. Câbles sectionnés en Baltique, incendies suspects, tentatives d'assassinat. Operation Baltic Sentry: réponse de l'OTAN.",
    "content": "<DATA>600+</DATA> incidents hybrides (2022-2025)<DATA>300 km</DATA> pipeline Nord Stream détruit<DATA>24h</DATA> délai entre opération et attribution\n\n## La Doctrine Hybride Russe\n\n### La doctrine Gérassimov révisée : la guerre sans guerre déclarée\n\nLa doctrine de guerre hybride russe repose sur un principe fondamental : atteindre les objectifs stratégiques d'un conflit — déstabiliser, fragiliser, dissuader — sans franchir le seuil d'une guerre déclarée.\n\n## Les Incidents Documentés\n\n| Type | Exemples | Impact |\n|------|----------|--------|\n| Sabotages cables | Estlink-1, BCS East-West Interlink | Vulnerabilité infrastructurelle |\n| Incendies suspects | Pologne, Allemagne, Finlande, UK | Destruction logistique |\n| Tentatives assassinat | Industriels défense Europe O. | Ciblage décideurs |\n| Cyberattaques | Hôpitaux, mairies, énergie | Perturbation services |\n| Désinformation | Campagnes massives | Manipulation opinion |\n\n## La Réponse\n\nL'OTAN a lancé Operation Baltic Sentry : surveillance renforcée des câbles et infrastructures sous-marines en Baltique.\n\n<QUOTE>Ces incidents partagent une caractéristique : ils restent sous le seuil de l'article 5 — suffisamment ambigus pour maintenir le déni plausible russe, suffisamment coûteux pour fragiliser les sociétés européennes.</QUOTE>\n\nCette analyse cartographie la doctrine hybride russe, ses manifestations documentées, et les réponses possibles.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-10",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=1200&q=80"
  },
  {
    "id": "35",
    "title": "AUKUS : le transfert technologique et la réaction française",
    "excerpt": "369 Md$ pour les sous-marins australiens. 1re base à Perth en 2032. Rotations US/UK dès 2027. La France a partiellement récupéré ses relations. L'accord redessine durablement l'Indo-Pacifique.",
    "content": "<DATA>369 Md$</DATA> coût total sous-marins australiens<DATA>2032</DATA> horizon première base Perth<DATA>2027</DATA> rotations sous-marins US/UK<DATA>3</DATA> Virginia class acheté par Australia\n\n## La Genèse et le Séisme\n\n### AUKUS : le coup stratégique qui a fracturé les alliances\n\nL'annonce d'AUKUS le 15 septembre 2021 a été délibérément gardée secrète de la France jusqu'à la veille — un choix américain et australien qui a été perçu à Paris comme une trahison d'alliance.\n\n## Le Contenu de l'Accord\n\n| Élément | Détail |\n|---------|--------|\n| Sous-marins | 3 Virginia class (dès 2027) + design UK |\n| Technologie | Partage propulsion nucléaire |\n| Base | HMAS Stirling, Perth |\n| Coût estimé | 369 Md$ (CBO australien) |\n\n## Les Retombées pour la France\n\nLa France a partiellement récupéré ses relations diplomatiques avec Washington et Canberra. Un compensationsur les capacités de défense a été négocié.\n\n<QUOTE>L'accord redessine durablement les équilibres stratégiques dans l'Indo-Pacifique. La France doit maintenant définir sa propre stratégie dans la région.</QUOTE>\n\nCette analyse fait le point sur AUKUS en mars 2026, ses progrès, ses tensions internes, et ses implications pour la défense européenne.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-09",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1533321950979-0cc6064d2bbf?w=1200&q=80"
  },
  {
    "id": "36",
    "title": "Sahel : le retrait français et la recomposition géopolitique africaine",
    "excerpt": "Retrait du Mali, Burkina Faso, Niger (2022-2023). 5 000+ combattants Wagner/Africa Corps déployés. La Russie, la TurquIE et la Chine fill the void. La France sort affaiblie. Analyse de la recomposition.",
    "content": "<DATA>3</DATA> pays Sahélien demander retrait France<DATA>5 000+</DATA> combattants Wagner/Africa Corps<DATA>2022-2023</DATA> retraits Barkhane et Sabre\n\n## Le Retrait Français\n\n### La débâcle française : contexte, causes, conséquences\n\nLe retrait de la France d'Afrique de l'Ouest n'est pas le résultat d'une défaite militaire — les forces françaises n'ont jamais été battues sur le terrain. C'est une défaite politique et de perception.\n\n## Les Acteurs qui Comblent le Vide\n\n| Puissance | Présence | Type d'engagement |\n|-----------|----------|-------------------|\n| Russie | 5 000+ combattants | Wagner → Africa Corps |\n| TurquIE | Bayraktar TB2, instructeurs | Équipements, formation |\n| Chine | Bases, formations | Investissements infra |\n\n## Les Conséquences\n\nLes juntes sahéliennes — portées par des coups d'État successifs et une rhétorique anti-française — ont demandé le départ des forces françaises Barkhane et Sabre.\n\n<QUOTE>L'Afrique est devenue le théâtre d'une compétition militaire et d'influence entre puissances dont la France sort affaiblie mais pas exclue définitivement.</QUOTE>\n\nCette analyse cartographie la recomposition géopolitique militaire africaine et ses enjeux pour la défense française.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-08",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=1200&q=80"
  },
  {
    "id": "37",
    "title": "Course aux armements nucleaires : la modernisation simultanée des arsenaux",
    "excerpt": "Chine: ~500 têtes nucleaires en 2025 (vs 200 en 2020), objectif 1 000 d'ici 2030. B-21 Raider: premier vol opérationnel 2023. RS-28 Sarmat déployé. New START expiré. L'architecture de contrôle s'effondre.",
    "content": "<DATA>500</DATA> têtes nucleaires chinoises (2025)<DATA>1 000</DATA> objectif Chine 2030<DATA>2023</DATA> premier vol B- Raider<DATA>Fév. 2026</DATA> expiration New START\n\n## La Fin des Traités\n\n### La désintégration de l'architecture de contrôle des armements\n\nL'architecture internationale de contrôle des armements nucleaires construite depuis les années 1970 s'est effondrée méthodiquement.\n\n## L'État des Arsenaux\n\n| Puissance | Têtes deployées | Têtes stock | Modernisation |\n|-----------|-----------------|-------------|---------------|\n| USA | 1 650 | 3 700 | B-21, Columbia, Sarmat |\n| Russie | 1 550 | 4 500 | Sarmat, Avangard |\n| Chine | 500 | 500 | Accélération massive |\n| France | 280 | 300 | M51.3, SNLE 3G |\n| UK | 120 | 195 | Dreadnought |\n\n## Les Systèmes Nouveaux\n\n**B-21 Raider** : Premier bombardier furtif nucleaire de 6e génération. Premier vol opérationnel 2023. Northrop Grumman. 692 M$/unité.\n\n**RS-28 Sarmat** ('Satan II') : 18 000 km, 10 têtes MIRV. Tests partiels 2022-2023.\n\n<QUOTE>Pour la première fois depuis la fin de la Guerre froide, trois puissances nucleaires majeures modernisent simultanément leurs triades. C'est une course aux armements silencieuse mais bien réelle.</QUOTE>\n\nCette analyse cartographie la course aux armements nucleaires de la décennie et ses implications pour la stabilité stratégique.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-07",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
  },
  {
    "id": "38",
    "title": "Autonomie stratégique européenne : peut-on se défendre sans les États-Unis ?",
    "excerpt": "SCAF en crise, MGCS en retard, Eurodrone bloqué. Les achats ReArm Europe vont surtout aux US (F-35, HIMARS, Patriot). Horizon 2035-2040: l'autonomie reste un objectif plus qu'une réalité.",
    "content": "<DATA>2040</DATA> horizon autonomie revendiquée<DATA>2035</DATA> horizon SCAF/MGCS<DATA>25 %</DATA> achats défense EU hors EU<DATA>100 %</DATA> dépendance lanceurs spatiaux US\n\n## Les Programmes Structurants\n\n### SCAF, MGCS, Eurodrone : le tableau de bord de l'autonomie\n\n| Programme | Pays | Objectif | Statut | Problème principal |\n|-----------|------|----------|--------|---------------------|\n| SCAF | FR-DE-ES | Chasseur 6e gen | En retard | Partage moteur Dassault/Airbus |\n| MGCS | FR-DE | Char 6e gen | En crise | Partage Rheinmetall/KNDS |\n| Eurodrone | EU | Drone MALE | Bloqué | Financement |\n\n## Les Achats Réels\n\nMalgré les discours sur l'autonomie, les achats ReArm Europe vont massivement aux États-Unis :\n\n- **F-35** : Allemagne (35), Pays-Bas (52+), Belgique (34), Finlande (64), Danemark\n- **HIMARS** : Multiples pays EU\n- **Patriot** : Système adopté par plusieurs pays\n\n<QUOTE>L'autonomie stratégique européenne reste un objectif proclamé depuis 2017 (discours de la Sorbonne). En 2026, le bilan est contrasté : les programmes structurants accumulent les retards.</QUOTE>\n\nCette analyse fait le bilan et cartographie les chemins possibles vers une défense européenne plus autonome.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-06",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1561476429-0f9622c19ad2?w=1200&q=80"
  },
  {
    "id": "39",
    "title": "Marchés d'armement : la géopolitique des contrats et la montée de la Corée du Sud",
    "excerpt": "US: 40% des export. France: 2e avec Rafale et FDI. Corée du Sud: K2, K9, FA-50 cartonnent en Pologne. La Chine développe ses export. ITAR: outil de compétition commerciale.",
    "content": "<DATA>40 %</DATA> part USA marché armement<DATA>11 %</DATA> part France<DATA>180+212+48</DATA> K2+K9+FA-50 Pologne\n\n## La Competition Mondiale\n\n### Les grands acteurs en 2026\n\n| Exportateur | Part marché | Produits phares | Clients principaux |\n|-------------|------------|-----------------|-------------------|\n| USA | ~40% | F-35, F-16, HIMARS, Patriot | EU, Japon, Inde, Golfe |\n| France | ~11% | Rafale, FDI, Mistral | Égypte, Qatar, Inde, UAE |\n| Russie | ~5% | S-400, Su-35 | Chine, Inde, Algérie (en baisse) |\n| Chine | En hausse | J-10C, Wing Loong, VT-4 | Pays émergent |\n| Corée du Sud | En hausse | K2, K9, FA-50 | Pologne, Norvège, Turkey |\n\n## L'Émergence Coréenne\n\nLa Corée du Sud s'impose comme un nouvel acteur majeur :\n\n- **Pologne** : 180 K2 (chars), 212 K9 ( canons automoteurs), 48 FA-50 (avions)\n- **Norvège** : K9 pour l'artillerie\n- **Turquiye** : Competiteur sur les drones\n\n<QUOTE>L'ITAR (International Traffic in Arms Regulations) est utilisé comme outil de compétition commerciale pour blocker les export européennes contenant des composants américains.</QUOTE>\n\nCette analyse cartographie la géopolitique des marchés d'armement en 2026 et les stratégies des exportateurs.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-05",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1200&q=80"
  },
  {
    "id": "40",
    "title": "Pénurie de munitions : l'Europe face à son déficit industriel le plus urgent",
    "excerpt": "700 000 obus/an avant 2022, objectif 2M, réalité 1,1-1,3M. Poudres propulsives, forges, main-d'œuvre spécialisée: les goulots sont structurels. 40+ Usines fermées depuis la Guerre froide.",
    "content": "<DATA>700 000</DATA> obus/an production 2022<DATA>2 M</DATA> objectif UE 2025<DATA>1,1-1,3 M</DATA> production réelle 2025<DATA>40+</DATA> Usines munitions fermées depuis GW\n\n## Anatomie de la Pénurie\n\n### Pourquoi l'Europe ne peut pas produire 2 millions d'obus\n\nLa production d'un obus de 155 mm est un processus industriel complexe impliquant une dizaine d'étapes.\n\n## Les Goulots d'Étranglement\n\n| Composant | Problème | Délai reconstruction |\n|-----------|----------|---------------------|\n| Poudres propulsives | Capacités insuffisantes | 3-5 ans |\n| Forges | Fermetures post-Guerre froide | 5+ ans |\n| Main-d'œuvre | Compétences perdues | 3-4 ans |\n| Cuivre/Laiton | Approvisionnement | - |\n\n## Les Chiffres\n\n| Indicateur | Avant 2022 | 2025 | Objectif |\n|-----------|-----------|------|----------|\n| Production EU | 700 000 | 1,1-1,3 M | 2 M |\n| Consommation Ukraine/jour | - | 5 000-7 000 | - |\n| Jours de stock | - | ~4 jours | - |\n\n<QUOTE>Le dividende de la paix a vidé l'outil industriel en 30 ans. La reconstruction prendra une décennie.</QUOTE>\n\nCette analyse cartographie la grande pénurie et les efforts de reconstruction industrielle européenne.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-04",
    "readTime": 9,
    "image": "https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&q=80"
  },
  {
    "id": "41",
    "title": "DefTech européenne : les licornes de défense de demain",
    "excerpt": "Helsing: 1er champion européen de l'IA militaire (>1 Md€). TEKEVER: déployé par Frontex. 2 Md€ levés en 2024-2025 vs 30 Md$ aux US. Anduril: le benchmark. L'écosystème européen émerge.",
    "content": "<DATA>2 Md€</DATA> levés DefTech EU (2024-2025)<DATA>30 Md$</DATA> levés DefTech US (2024)<DATA>1 Md€</DATA> valorisation Helsing<DATA>2024</DATA> série A Helsing\n\n## Les Champions Émergents\n\n### L'écosystème DefTech européen — les acteurs à surveiller\n\n| Startup | Pays | Spécialité | Valorisation | Clients |\n|---------|------|------------|---------------|----------|\n| Helsing | DE/UK | IA combat, drones | >1 Md€ | Bundeswehr |\n| TEKEVER | Portugal | Drones MALE surveillance | - | Frontex, Marines |\n| Exail | France | Drones sous-marins | - | Marine nationale |\n| Archer | UK | IA commandement | - | UK MoD |\n\n## Le Retard Européen\n\nLe capital-risque défense européen a levé plus de 2 Md€ en 2024-2025 — encore loin des 30 Md$ levés aux États-Unis par Anduril, Shield AI et Palantir.\n\n<QUOTE>Helsing est considéré comme le premier champion européen de l'IA militaire. Sa série A (2024) et sa référence par le Bundeswehr marquent un tournant.</QUOTE>\n\nCette analyse cartographie l'écosystème DefTech européen, ses champions émergents et ses opportunités d'investissement.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-03",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80"
  },
  {
    "id": "42",
    "title": "Financement de la défense : les nouveaux véhicules pour contourner le paradoxe ESG",
    "excerpt": "BEI: financement munitions/missiles = 0€. Bâle IV alourdit les ratios pour industries 'controversées'. Prêts SAFE (150 Md€): contournement partiel. Révision partielle de la politique BEI en cours.",
    "content": "<DATA>0 €</DATA> financement munitions BEI<DATA>150 Md€</DATA> prêts SAFE ReArm Europe<DATA>2025</DATA> application Bâle IV\n\n## Le Paradoxe ESG - Défense\n\n### ESG vs Défense : quand l'investissement responsable exclut la sécurité nationale\n\nLa logique ESG a conduit à l'exclusion progressive du secteur défense des portfolios 'durables'.\n\n## Les Obstacles\n\n| Obstacle | Impact | Solution |\n|----------|-------|----------|\n| BEI | Munitions/missiles exclus | Révision partielle |\n| Bâle IV | Ratios alourdis | Prêts souverains |\n| Investisseurs | Exclusions massives | Exceptions |\n\n## Les Nouvelles Solutions\n\n**Prêts SAFE** : 150 Md€ de financements souverains dans le cadre ReArm Europe — contournement partiel de l'exclusion bancaire classique.\n\n**Révision politique BEI** : Premiers pas vers le financement d'équipements non-létaux. Munitions et missiles toujours exclus.\n\n<QUOTE>Les PME sous-traitantes de la BITD européenne — qui fabriquent les composants des missiles, des obus, des blindés — ont du mal à accéder aux financements bancaires classiques.</QUOTE>\n\nCette analyse cartographie les nouveaux véhicules de financement qui émergent pour contourner les obstacles.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-02",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
  },
  {
    "id": "43",
    "title": "Guerre spatiale : quand le conflit devient le 1er théâtre stratégique",
    "excerpt": "6 000+ satellites Starlink opérationnels. Starshield: connectivité tactique révolutionnaire en Ukraine. Chine: 55 satellites militaires en 2024. ASAT: missiles cinétiques, lasers. L'OTAN déclare l'espace 'domaine opérationnel' en 2019.",
    "content": "<DATA>6 000+</DATA> satellites Starlink opérationnels<DATA>55</DATA> satellites militaires Chine (2024)<DATA>2019</DATA>OTAN déclare espace 'domaine opérationnel'\n\n## Starshield & la Révolution Connectivité\n\n### La victoire de la connectivité commerciale en guerre\n\nL'impact de Starlink/Starshield sur la guerre en Ukraine a dépassé toutes les prévisions.\n\n## Les Capacités Spatiales\n\n| Système | Capacité | Fonction |\n|---------|----------|----------|\n| Starlink | 6 000+ satellites | Connectivité globale |\n| Starshield | Version militaire DoD | Tactique militaire |\n| BeiDou | Constellation complète | Positionnement |\n| DA-ASAT | Missile cinétique | Destruction satellites |\n\n## Les Menaces\n\nLa Chine a lancé 55 satellites militaires en 2024 — renseignement, surveillance, communication, positionnement.\n\nLa Russie et la Chine développent des capacités ASAT : missiles cinétiques, lasers, brouillage électronique.\n\n## L'OTAN\n\nL'OTAN a déclaré l'espace 'domaine opérationnel' en 2019 — le 5e domaine après terre, mer, air, cyber. Les doctrines et budgets suivent progressivement.\n\n<QUOTE>L'espace est devenu le théâtre militaire le plus stratégique de la décennie. La connectivité spatiale est désormais une capacité de combat déterminante.</QUOTE>\n\nCette analyse cartographie la guerre spatiale en cours et ses implications pour la défense occidentale.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-02-01",
    "readTime": 11,
    "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
  }
];

export const categories = [
  { id: 'economie', name: 'Economie', color: '#059669' },
  { id: 'geopolitique', name: 'Geopolitique', color: '#7C3AED' },
  { id: 'defense', name: 'Defense', color: '#DC2626' },
  { id: 'osint', name: 'OSINT', color: '#0891B2' }
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(a => a.category === category);
}

export function getTrendingArticles(): Article[] {
  return articles.filter(a => a.trending);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find(a => a.featured);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.excerpt.toLowerCase().includes(q)
  );
}
