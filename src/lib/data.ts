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
    "title": "OTAN: De 2% à 5% du PIB - La nouvelle ère du réarmement",
    "excerpt": "■ Contexte & genèse",
    "content": "■ Contexte & genèse\n\n1. Du 2 % au 5 % : l'architecture d'une rupture stratégique\n\nPendant une décennie, le seuil des 2 % du PIB consacré à la défense a constitué l'objectif de référence de l'OTAN — adopté au sommet du Pays de Galles en 2014 après l'annexion de la Crimée par la Russie. En 2015, seuls quatre membres sur trente-deux l'atteignaient. En 2025, la totalité des trente-deux membres respectent ce seuil pour la première fois de l'histoire de l'Alliance.\n\nMais cet accomplissement n'a duré que quelques semaines comme objectif. Au sommet de La Haye des 24 et 25 juin 2025 — premier grand sommet de la deuxième présidence Trump — les chefs d'État et de gouvernement ont acté un objectif d'une tout autre ampleur : 5 % du PIB consacré à la défense au sens large d'ici 2035. La structure est double : au moins 3,5 % pour les dépenses militaires stricto sensu (équipements, personnel, opérations) et jusqu'à 1,5 % pour les dépenses connexes (cybersécurité, infrastructures critiques, résilience civile, mobilité militaire).\n\n1.1 Le paradoxe Trump : l'exigence sans l'engagement\n\nDonald Trump est le principal architecte de cette hausse. Depuis son investiture en janvier 2025, il a fait de la contribution européenne à la défense une condition de l'engagement américain dans l'Alliance, semant le doute sur l'article 5 lui-même. Le résultat est sans équivoque : les alliés ont capitulé sur les chiffres. Mais la contrepartie attendue — une confirmation explicite de l'engagement américain — n'a pas été obtenue. Trump a déclaré à l'issue du sommet que cela « dépend de la définition que vous en donnez », entretenant l'ambiguïté stratégique qui force les Européens à accélérer leur réarmement autonome.\n\n■ Chronologie\n\n2. La montée en puissance : dix ans d'escalade budgétaire\n\nChronologie du réarmement occidental (2014–2026)\n\n■ Situation actuelle — Mars 2026\n\n3. État des lieux : qui dépense quoi ?\n\nDépenses défense des principaux membres OTAN — 2025 (es...",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 14,
    "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=80",
    "featured": true,
    "trending": true
  },
  {
    "id": "2",
    "title": "Arctique 2027: La course aux territoires glacés",
    "excerpt": "■ Contexte & genèse",
    "content": "■ Contexte & genèse\n\n1. La géographie de la fonte : un double effet tectonique\n\nLe Forum du Cercle Arctique, réuni à Rome début mars 2026, a confirmé ce qui est désormais incontestable dans les cercles scientifiques : la banquise arctique disparaît à une vitesse que les modèles climatiques des années 2000 n'avaient pas anticipée. Le Passage du Nord-Est (Route maritime du Nord, RMN) est aujourd'hui accessible neuf mois par an grâce à la flotte de brise-glaces nucléaires russes et aux investissements d'infrastructures portuaires. En 2023, le volume transporté sur la RMN a atteint un record de 35 millions de tonnes.\n\nCette fonte produit deux effets géopolitiques de premier ordre. Le premier est logistique : les routes maritimes arctiques réduisent de 30 à 50 % la distance entre l'Asie et l'Europe par rapport au canal de Suez, avec un gain de 14 à 20 jours de transit. Le second est extractif : la déglaciation expose progressivement des ressources énergétiques et minérales parmi les plus importantes du monde — jusqu'ici physiquement inaccessibles.\n\n1.1 La Course aux ressources : l'inventaire stratégique\n\n■ Acteurs & compétition\n\n2. Les cinq acteurs de la compétition arctique\n\nL'Arctique met en présence cinq catégories d'acteurs aux intérêts partiellement convergents et partiellement conflictuels : la Russie (puissance arctique historique), les États-Unis (puissance militaire et demandeur de ressources), la Chine (puissance extrarégionale à ambitions croissantes), les riverains nordiques membres de l'OTAN (Norvège, Danemark/Groenland, Canada, Finlande, Islande), et l'Union européenne (consommatrice d'énergie et de minerais critiques).\n\n■ Groenland — crise & enjeux 2026\n\n3. La crise du Groenland : anatomie d'un bras de fer\n\nDepuis le 4 janvier 2026, Donald Trump a réaffirmé vouloir placer le Groenland sous contrôle américain, invoquant successivement des arguments de sécurité nationale (Golden Dome, surveillance sous-marine russe) et des...",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 14,
    "image": "https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=1200&q=80",
    "featured": true,
    "trending": true
  },
  {
    "id": "3",
    "title": "Guerre commerciale: Les tarifs Trump secouent l'économie mondiale",
    "excerpt": "■ Chronologie",
    "content": "■ Chronologie\n\n1. De 2018 à 2026 : l'escalade tarifaire en huit actes\n\n■ Impact sectoriel Europe\n\n2. Impact sur l'Europe : secteurs, flux et contre-mesures\n\nL'Union européenne exporte environ 500 milliards de dollars de biens vers les États-Unis par an. Avec un droit universel de 20 % et des tarifs sectoriels (25 % acier-aluminium, menace sur automobiles), l'impact potentiel est considérable. L'UE a préparé deux listes de contre-mesures représentant environ 18 milliards d'euros de droits additionnels sur les exportaciones américaines — mais ne les a pas encore déclenchées, préférant la négociation.\n\n■ Impact sur les BRICS & émergents\n\n3. Les BRICS+ : bénéficiaires involontaires ou victimes collatérales ?\n\nLa guerre commerciale US-Chine crée des effets de détournement massifs. Les pays capables de jouer le rôle d'intermédiaire — manufacturier pour la Chine ou assemblant des composants chinois — bénéficient de flux de commandes redirigés. Mais les BRICS dans leur ensemble font face à un dilemme : se rapprolier de Pékin au risque de subir des sanctions secondaires américaines, ou ménager Washington au risque d'être perçus comme des partenaires de second rang.\n\n■ Réorientation des supply chains\n\n4. Reconfiguration mondiale des chaînes de valeur\n\nLe vrai impact à long terme des tarifs Trump 2.0 n'est pas le coût direct — c'est la reconfiguration structurelle des chaînes d'approvisionnement mondiales. Les entreprises ne peuvent pas absorber indéfiniment des droits de 20 à 145 % : elles relocalisent, elles diversifient leurs fournisseurs, ou elles absorbent les marges. Cette transformation est irréversible : une fois une supply chain reconfigurée, elle ne revient pas à son état antérieur même si les tarifs disparaissent.\n\n■ Prospective\n\n5. Trois scénarios à horizon 2027\n\n■ Cartographie & Actions\n\n6. Cartographie actionnable\n\n6.2 Playbook stratégique : trois horizons\n\n■ Conclusion\n\nLa fin du libre-échange comme cadre par déf...",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
    "featured": false,
    "trending": true
  },
  {
    "id": "4",
    "title": "mBridge: Le système de paiement qui défie le dollar",
    "excerpt": "■ Contexte & genèse",
    "content": "■ Contexte & genèse\n\n1. Pourquoi SWIFT est devenu une arme géopolitique\n\nSWIFT — Society for Worldwide Interbank Financial Telecommunication — est le système de messagerie interbancaire qui coordonne la quasi-totalité des règlements internationaux. Créé en 1973, il connecte plus de 11 000 institutions financières dans 200 pays. Sa gouvernance est belge, mais son architecture est profondément imbriquée dans le système bancaire correspondant en dollars américains.\n\nL'exclusion de la Russie du réseau SWIFT en mars 2022 — décision sans précédent dans l'histoire du système financier international — a constitué un signal d'alarme pour toutes les puissances qui se savent potentiellement exposées aux sanctions occidentales. Elle a démontré que l'infrastructure financière internationale pouvait être utilisée comme instrument de coercition géopolitique. La réaction a été immédiate dans les capitales de Pékin, Moscou, New Delhi, Riyad et Téhéran.\n\n■ Anatomie de mBridge\n\n2. mBridge : architecture, avancement et limites\n\nmBridge (Multiple Central Bank Digital Currency Bridge) est le projet le plus avancé de règlement multidevises via thérapeutiens numériques de banques centrales (MNBC). Il a été développé sous l'égide du Centre d'Innovation de la BRI de Hong Kong, en collaboration avec la Banque populaire de Chine, la Banque centrale des ÉAU, la Banque de Thaïlande et l'Autorité monétaire de Hong Kong.\n\n2.1 L'architecture technique de mBridge\n\nmBridge repose sur une blockchain permissioned (accès contrôlé) baptisée mBridge Ledger, développée à partir de la technologie PBFT (Practical Byzantine Fault Tolerance). Chaque banque centrale participante opère un nœud. Les règlements s'effectuent en MNBC (monnaies numériques de banque centrale) — e-CNY pour la Chine, e-Dirham pour les ÉAU, CBDC-Bath pour la Thaïlande. La conversion entre devises est atomique (simultanée), éliminant le risque de règlement Herstatt qui affecte les échanges de change traditi...",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80",
    "featured": false,
    "trending": true
  },
  {
    "id": "5",
    "title": "Cybersécurité 2027: Les nouvelles menaces numériques",
    "excerpt": "■ Le paysage des menaces",
    "content": "■ Le paysage des menaces\n\n1. 2025–2026 : l'ère des cyberattaques hybrides d'État\n\nLa frontière entre cybercriminalité et cyberguerre d'État a disparu en 2025. Les groupes APT (Advanced Persistent Threats) opèrent désormais selon un modèle hybride : financement étatique, objectifs stratégiques, mais tactiques et outils empruntés aux groupes criminels. La Corée du Nord finance 40 % de son programme de missiles via les cryptomonnaies volées lors de cyberattaques. La Russie utilise ses groupes APT (Sandworm, Cozy Bear) comme force de frappe contre les infrastructures ukrainiennes et européennes. La Chine (Volt Typhoon, Salt Typhoon) a compromis plusieurs opérateurs de télécommunications américains en 2024–2025.\n\n■ IA offensive\n\n2. L'IA dans le cyberespace : amplificateur et démocratisateur de la menace\n\nL'intelligence artificielle change radicalement l'équation offensive dans le cyberespace. Côté attaquant : les modèles de langage permettent de générer des emails de phishing personnalisés à l'échelle (spear phishing automatisé), de rédiger du code malveillant sans expertise technique profonde, et d'automatiser la reconnaissance des surfaces d'attaque. Côté défenseur : l'IA permet la détection comportementale en temps réel, la corrélation d'événements à grande échelle, et la réponse automatisée aux incidents.\n\n■ Infrastructures critiques\n\n3. La chaîne critique sous tension : énergie, eau, santé, transport\n\nLes attaques contre les infrastructures critiques ont quintuplé depuis 2020. La logique est militaire : déstabiliser la société civile, forcer des arbitrages politiques, tester la résilience adversaire en temps de paix. Les secteurs les plus touchés en 2025 sont l'énergie (46 % des incidents), la santé (23 %), les transports (18 %) et l'eau (13 %).\n\n■ Industrie de la cyberdéfense\n\n4. Les bénéficiaires industriels : anatomie d'un marché en hypercroissance\n\nLe marché mondial de la cybersécurité atteignait 266 milliards de dollars en ...",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "6",
    "title": "Semi-conducteurs: La guerre des puces US-CHINE",
    "excerpt": "■ Anatomie de la dépendance",
    "content": "■ Anatomie de la dépendance\n\n1. La chaîne de valeur semi-conducteurs : une dépendance en couches\n\nLa chaîne de valeur des semi-conducteurs est l'une des plus complexes et des plus concentrées de l'économie mondiale. Elle se décompose en sept couches interdépendantes, chacune avec ses propres concentrations géographiques et ses propres risques.\n\n■ CHIPS Act — Bilan 2026\n\n2. Le CHIPS Act et ses équivalents : l'état des lieux en mars 2026\n\nLe CHIPS and Science Act américain, signé en août 2022, est la plus grande initiative industrielle américaine depuis la Seconde Guerre mondiale dans le secteur manufacturier. Il alloue 39 milliards de dollars de subventions directes à la fabrication de semi-conducteurs sur le sol américain, 11 milliards pour la R&D, et prévoit un crédit d'impôt de 25 % pour les dépenses d'investissement dans les usines de puces.\n\n■ La Chine face aux restrictions\n\n3. La Chine : contournement ou rattrapage ?\n\nLes restrictions américaines sur les exportateurs de semi-conducteurs avancés vers la Chine (Entity List, interdiction ASML EUV depuis 2023, extension aux machines DUV ArF depuis 2024) ont pour objectif de maintenir la Chine à au moins deux générations technologiques de retard. L'évaluation en mars 2026 est nuancée.\n\nD'un côté, SMIC — le principal fondeur chinois — est bloqué à 7 nm sans EUV, et les tentatives de gravure en 5 nm par voie alternative (multi-patterning DUV) donnent des rendements insuffisants pour une production de masse rentable. De l'autre, Huawei a surpris le monde entier avec le Mate 60 Pro équipé d'une puce 7 nm SMIC en 2023, prouvant que la Chine peut produire des puces avancées — à des coûts prohibitifs.\n\n■ Prospective\n\n4. Scénarios à horizon 2030\n\n■ Cartographie & Actions\n\n5. Cartographie actionnable\n\n5.2 Playbook stratégique : trois horizons\n\n■ Conclusion\n\nLa souveraineté technologique : un défi de génération\n\nLe CHIPS Act américain et l'EU Chips Act sont des efforts sérieux...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "7",
    "title": "LNG Europe 2027: Le gaz liquéfié change la donne",
    "excerpt": "■ La rupture 2021–2026",
    "content": "■ La rupture 2021–2026\n\n1. De la dépendance au gazoduc à la diversification forcée\n\nLa transformation de l'approvisionnement gazier européen entre 2021 et 2026 est l'un des plus grands chocs d'infrastructure énergétique de l'histoire économique récente. En l'espace de trois ans, l'Europe a réussi à se sevrer de 30 points de pourcentage de dépendance au gaz russe — un exploit logistique et financier considérable, réalisé dans l'urgence et à un coût très élevé pour les industriels et les ménages européens.\n\n■ La nouvelle géographie gazière\n\n2. La triangulaire gazière : États-Unis, Qatar, Norvège\n\nL'Europe de 2026 s'approvisionne selon une géographie radicalement différente de 2021. Trois fournisseurs dominent : les États-Unis (GNL, ~50 % des imports GNL européens), le Qatar (GNL, ~15 %), et la Norvège (gazoduc, ~30 % de la consommation totale). Le gaz russe subsiste marginalement via le TurkStream (Balkans, Turquise) et quelques contrats bilatéraux.\n\n■ La guerre des prix\n\n3. TTF vs Henry Hub : la mécanique des spreads et des arbitrages\n\nLe marché du GNL est devenu un marché mondial arbitrageable. Les cargaisons GNL se dirigent vers le marché qui offre le meilleur prix net après transport. Le spread TTF-Henry Hub (prix européen moins prix américain) est le déterminant principal de la direction des flux atlantiques. Quand le spread est élevé (>5 $/MMBtu), les exportateurs américains redirigent leurs cargaisons vers l'Europe. Quand il est faible ou négatif, elles vont vers l'Asie.\n\n■ TurkStream & gaz résiduel russe\n\n4. Le gaz russe résiduel : TurkStream et les dépendances persistantes\n\nMalgré la rupture spectaculaire de la dépendance gazière européenne, le gaz russe n'a pas complètement disparu du mix européen. Le gazoduc TurkStream (capacité 31,5 Mrd m³/an) continue d'approvisionner la Turquise, la Bulgarie, la Serbie, la Hongratie et une partie de la Slovaquie. Ces pays restent dans une zone grise : officiellement alignés sur les sanct...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1474314170901-f351b68f544f?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "8",
    "title": "Uranium civil: La renaissance du nucléaire",
    "excerpt": "■ La géopolitique de l'uranium",
    "content": "■ La géopolitique de l'uranium\n\n1. La chaîne du combustible nucléaire : une dépendance en trois couches\n\nLe combustible nucléaire n'est pas simplement de l'uranium extrait du sol. Avant d'alimenter un réacteur, il passe par une chaîne de transformation complexe en quatre étapes, chacune avec ses propres concentrations géographiques et ses propres risques de dépendance géopolitique.\n\n■ Kazatomprom & le marché\n\n2. Kazatomprom : le géant discret qui contrôle 43 % de l'offre mondiale\n\nKazatomprom, entreprise publique kazakhe cotée à Londres et Astana, est le premier producteur mondial d'uranium depuis 2009. Avec une production de 21 000 à 22 000 tonnes d'uranium (tU) par an, il représente à lui seul 43 % de l'offre mondiale — une concentration sans équivalent dans le secteur des matières premières stratégiques.\n\nLe Kazakhstan joue un rôle de pivot géopolitique : il exporte vers la Chine, la Russie, l'Europe et les États-Unis. Il est l'un des rares producteurs à avoir maintenu ses relations commerciales avec tous ces acteurs simultanément, naviguant entre les pressions de Moscou (via l'Organisation du traité de sécurité collective) et les sollicitations occidentales (accès prioritaire à l'uranium hors-Russie). Le principal risque pour Kazatomprom en 2026 est opérationnel : pénuries d'acide sulfurique et de puits de forage qui ont contraint l'entreprise à réduire ses objectifs de production en 2024.\n\n■ Orano, Cameco & l'Occident\n\n3. Les champions occidentaux : Orano et Cameco face à Rosatom\n\nFace à la dépendance à Rosatom, deux acteurs occidentaux jouent un rôle stratégique central : Orano (France) et Cameco (Canada). Ensemble, ils couvrent les étapes de mining, de conversion et partiellement d'enrichissement — mais restent insuffisants pour compenser l'empreinte de Rosatom à court terme.\n\n■ SMR — La promesse & la réalité\n\n4. Les SMR : la révolution qui prend du retard\n\nLes Small Modular Reactors (SMR) — réacteurs modulaires de moin...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 12,
    "image": "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "9",
    "title": "Or: Les banques centrales reprennent le contrôle",
    "excerpt": "■ Pourquoi ce supercycle ?",
    "content": "■ Pourquoi ce supercycle ?\n\n1. 2022 : le tournant historique — la leçon russe\n\nLe gel des 300 milliards de dollars de réserves de change russes par les États-Unis et l'Union européenne en mars 2022 a produit un choc psychologique durable dans toutes les banques centrales du monde. Le message était sans ambiguïté : les réserves en devises étrangères (dollars, euros, livres, yens) stockées dans des institutions occidentales peuvent être saisies en cas de conflit géopolitique. L'or physique détenu sur le territoire national ne peut pas l'être.\n\nCe moment a accéléré un mouvement qui était déjà en cours depuis la crise financière de 2008 : la diversification des réserves de change hors du dollar américain. Mais il lui a donné une urgence et une dimension qualitativement différente. Ce n'est plus seulement une question de rendement ou de diversification de portefeuille — c'est une question de souveraineté financière.\n\n1.1 La dédollarisation comme moteur structurel\n\nLes réserves mondiales en dollars américains ont reculé de 72 % en 1999 à 58 % en 2025. Ce recul est graduel mais continu. L'or est le seul actif de réserve qui bénéficie de cette rotation : il n'est la dette de personne, il ne peut pas être sanctionné, et il est universellement accepté. La logique est claire pour toute banque centrale cherchant à réduire son exposition géopolitique au dollar.\n\n■ Cartographie des acheteurs\n\n2. Qui achète ? La géographie des achats 2024–2025\n\n■ Dynamiques de prix\n\n3. Prix de l'or : les fondamentaux d'un marché structurellement haussier\n\nL'or a atteint 3 150 dollars l'once en mars 2026, battant successivement tous ses records historiques. Ce mouvement n'est pas alimenté par la spéculation retail : il est porté par la demande institutionnelle (banques centrales) et par des flux d'ETF soutenus. La demande joaillière, en revanche, a reculé en Inde et en Chine sous l'effet de la hausse des prix — signe que ce marché est désormais conduit par la log...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 11,
    "image": "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "10",
    "title": "Crédit privé: Le boom des crédits aux entreprises",
    "excerpt": "■ Genèse & Structure",
    "content": "■ Genèse & Structure\n\n1. Pourquoi le crédit privé a explosé : la régulation comme catalyseur\n\nLe crédit privé n'est pas une innovation financière née dans un laboratoire — c'est une réponse directe au retrait forcé des banques du marché du prêt aux entreprises de taille intermédiaire (ETI), sous l'effet des régulations Bâle III (2013) puis Bâle IV (application 2025). Les ratios de fonds propres imposés aux banques ont rendu économiquement non-rentable le prêt aux entreprises non-investment grade de taille moyenne. Les gestionnaires alternatifs ont comblé ce vide.\n\nLa hausse des taux de 2022–2024 a paradoxalement accéléré cette tendance. Les prêts à taux variable (SOFR + spread) des fonds de crédit privé offrent désormais des rendements de 8 à 12 % — bien supérieurs aux obligations high yield cotées (5–6 %) et aux bons du Trésor (4–5 %). Pour les investisseurs institutionnels à la recherche de rendement dans un contexte de obligations peu attractives, la proposition est irrésistible.\n\n■ Les acteurs dominants\n\n2. La cartographie des géants : Ares, Apollo, Blackstone, Claremont\n\n■ La géographie EU–US\n\n3. États-Unis vs Europe : deux marchés, deux maturités\n\nLe marché américain du crédit privé (1 600 milliards de dollars) est bien plus mature que le marché européen (450 milliards d'euros). Cette asymétrie reflète des différences structurelles : les entreprises américaines sont culturellement plus à l'aise avec la dette non-bancaire, le cadre juridique de la faillite (Chapter 11) offre une sécurité aux prêteurs, et l'écosystème du private equity américain est plus développé, générant davantage de deals pour les prêteurs directs.\n\n■ Risques & Stress-tests\n\n4. Les risques cachés : ce que les stress-tests Q2 2026 vont révéler\n\nLa Fed et la BCE ont annoncé les premiers stress-tests dédiés au crédit privé pour Q2 2026. C'est la reconnaissance officielle que ce marché est devenu systémiquement important. Les régulateurs ont identifié trois ...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 11,
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "11",
    "title": "Supply Chain: Le Nouveau Circuit Mexico-USA",
    "excerpt": "■ La recomposition des flux",
    "content": "■ La recomposition des flux\n\n1. La géographie industrielle post-2022 : les flux qui se redessinent\n\nLa guerre commerciale US-Chine initiée en 2018 et intensifiée en 2025 a produit un phénomène que les économistes appellent le 'trade diversion' — le détournement des flux commerciaux vers des pays tiers qui évitent les tarifs. Le Mexique est le grand bénéficiaire de ce phénomène, porté par trois avantages structurels : la proximité géographique des États-Unis, l'accord USMCA (successeur de l'ALENA), et une main-d'œuvre qualifiée à des coûts bien inférieurs aux États-Unis.\n\n■ Le near-shoring européen\n\n2. L'Europe reconfigure : Maroc, Turquise, Europe centrale\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable\n\n3.2 Playbook stratégique\n\n■ Conclusion\n\nLa nouvelle géographie industrielle mondiale\n\nINDUSTRIE & GÉOPOLITIQUE  ■  SUPPLY CHAIN • NEAR-SHORING • LATAM\n\nRapprochement Supply Chain Europe-Mexique\nFriend-shoring industriel : comment la guerre commerciale US-Chine redessine la carte de la production mondiale\n\nPar Axel Coudassot-Berducou  —  Sentinelle Pulse   |   Mars 2026   |   OSINT & Géopolitique\n\nLes importations américaines en provenance de Chine ont chuté de 27 % entre 2022 et 2025. Dans le même temps, les importations en provenance du Mexique ont bondi de 35 %, faisant du pays aztèque le premier partenaire commercial des États-Unis devant la Chine pour la première fois depuis 2003. Volkswagen double sa capacité à Puebla. Ternium investit 2,2 milliards de dollars dans une nouvelle aciérie à Pesquería. Mexichem (rebaptisé Orbia) accélère dans les matériaux de construction. L'Europe, de son côté, redécouvre le Maroc, la Turquise et l'Europe centrale comme plateformes de near-shoring. Cette analyse cartographie la recomposition des chaînes de valeur mondiales et les décisions d'allocation qu'elle génère.\n\n−27 %\nChute des imports US depuis la Chine (2022–2025)\nPremière réduction structurelle depuis l'entrée Chine OMC...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 6,
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "12",
    "title": "Pénurie d'eau: La crise mondiale silencieuse",
    "excerpt": "■ La géographie du stress hydrique",
    "content": "■ La géographie du stress hydrique\n\n1. La carte des zones de crise : où l'eau manque structurellement\n\n■ Les marchés de l'eau\n\n2. La valorisation de l'eau : un marché en construction\n\nL'eau reste paradoxalement l'une des ressources les moins valorisées par les marchés financiers — alors qu'elle est structurellement plus rare que le pétrole dans de nombreuses régions. Trois segments financiers captent désormais cette thématique : les utilities de traitement (Veolia, Xylem, Pentair), les marchés de droits d'eau (Californie, Australie), et l'agribusiness exposé au pricing power hydrique.\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable\n\n3.2 Playbook stratégique\n\n■ Conclusion\n\nL'eau : l'actif que les marchés ne savent pas encore valoriser\n\nRESSOURCES CRITIQUES  ■  EAU • STRESS HYDRIQUE • AGRICULTURE MONDIALE\n\nPénurie d'Eau 2026\nStress hydrique, marchés agricoles et valorisation de l'eau : la ressource rare que les marchés ignorent encore\n\nPar Axel Coudassot-Berducou  —  Sentinelle Pulse   |   Mars 2026   |   OSINT & Géopolitique\n\n2,4 milliards de personnes vivent aujourd'hui en situation de stress hydrique — une hausse de 25 % en cinq ans. L'Inde et le Pakistan, qui produisent ensemble 30 % du riz mondial, font face à une crise des nappes phréatiques sans précédent : le Punjab indien pompe 25 % de plus que la recharge annuelle. La Méditerranée connaît ses pires sécheresses depuis 2 000 ans. Et pourtant, l'eau reste l'une des ressources les moins valorisées par les marchés financiers. Nestlé India affiche un pricing power de +18 % sur ses produits liés à l'eau en 2025. Les utilities de traitement de l'eau cotées surperforment de 12 % l'indice monde depuis 2023. Cette analyse cartographie les zones de crise hydrique, les marchés agricoles sous tension, et les décisions d'allocation dans un thème d'investissement qui ne fait que commencer.\n\n2,4 Md\nPersonnes en stress hydrique sévère (2025)\n+25 % en 5 ans — WWAP/UNESCO |",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 7,
    "image": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "13",
    "title": "Fret maritime: Les nouvelles Routes de la Soie",
    "excerpt": "■ La crise de la mer Rouge",
    "content": "■ La crise de la mer Rouge\n\n1. La mer Rouge et le Cap de Bonne-Espérance : un détournement qui dure\n\nDepuis décembre 2023, les attaques Houthies en mer Rouge ont contraint la quasi-totalité des compagnies maritimes à détourner leurs porte-conteneurs via le Cap de Bonne-Espérance. Ce détournement ajoute 7 000 à 10 000 km au trajet Shanghai-Rotterdam, augmentant les délais de 20 à 30 jours et consommant 20 à 25 % de carburant supplémentaire. En mars 2026, aucune solution diplomatique n'est en vue — les Houthis continuent de cibler les navires liés à Israël ou aux pays soutenant l'accord de cessez-le-feu.\n\n■ Dynamiques de marché\n\n2. Les acteurs du fret : compagnies, forwarders, ports\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable\n\n3.2 Playbook stratégique\n\nCOMMERCE MONDIAL  ■  FRET MARITIME • LOGISTIQUE • SUPPLY CHAIN\n\nFret Maritime Reset\nBaltic Dry +42 %, capacité −8 % : anatomie d'un marché en recomposition structurelle\n\nPar Axel Coudassot-Berducou  —  Sentinelle Pulse   |   Mars 2026   |   OSINT & Géopolitique\n\nLe Baltic Dry Index (BDI) — le principal indicateur des taux de fret pour les vraquiers — a bondi de 42 % au T4 2025 par rapport au T4 2024, tandis que la capacité mondiale de transport maritime diminuait de 8 % sous l'effet des détournements liés aux tensions en mer Rouge et des retraits de flotte ancienne. Maersk affiche un dividend yield de 7,2 %. COSCO renoue avec la profitabilité. Les freight forwarders (Kuehne+Nagel, DSV, Flexport) voient leurs marges se reconstituer après le choc tarifaire de 2023. Cette analyse cartographie les dynamiques du marché du fret maritime, les taux sur les routes clés, et les décisions d'allocation dans un secteur qui oscille entre crise et boom.\n\n+42 %\nBaltic Dry Index T4 2025 vs T4 2024\nRebond structurel post-correction 2023 | −8 %\nCapacité maritime mondiale effective (2025)\nDétournements mer Rouge + retrait flotte ancienne | 7,2 %\nDividend yield Maersk (MAERSK-B) mars ...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 6,
    "image": "https://images.unsplash.com/photo-1494564605686-2e931f77a8e2?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "14",
    "title": "Yuan: Le Plafond de Verre monétaire",
    "excerpt": "■ Contexte & diagnostic",
    "content": "■ Contexte & diagnostic\n\n1. Une ambition claire, une réalité contredite par les chiffres\n\nLe 31 janvier 2026, Xi Jinping publiait dans Qiushi, la revue idéologique du Parti, un texte appelant à bâtir une « monnaie puissante » capable de s'imposer dans le commerce, les investissements et les marchés des changes à l'échelle planétaire. Ce signal politique est sans précédent par sa clarté. Mais les données disponibles dessinent un tableau sensiblement différent.\n\nAu troisième trimestre 2025, le yuan ne représentait que 1,93 % des réserves mondiales déclarées au FMI, loin derrière le dollar (∼57 %), l'euro (∼20 %), la livre sterling (∼4,73 %) et même le yen (∼5,82 %). Pire : depuis le pic de 2,83 % atteint au premier trimestre 2022, la part du yuan dans les réserves mondiales a reculé sur sept trimestres consécutifs — un recul d'un cinquième en deux ans. C'est un revirement sans équivoque par rapport aux premières années d'internationalisation.\n\n■ Mécanique\n\n2. La non-convertibilité : un choix souverain, pas un retard\n\nLa confusion fréquente consiste à traiter la non-convertibilité du yuan comme un retard à combler, un stade provisoire sur la route de l'internationalisation. C'est une erreur d'analyse. Le contrôle des capitaux est en Chine un outil de stabilité financière délibérément maintenu, dont les racines remontent à la crise asiatique de 1997.\n\n2.1 Le legs de 1997 : la leçon jamais oubliée\n\nLa crise asiatique de 1997--1998 a constitué pour Pekin une démonstration empirique décisive : les pays qui avaient liberalisé leur compte de capital — Thaïlande, Corée, Indonésie — ont subi des sorties massives de capitaux spéculatifs et des effondrements monétaires. La Chine et le Vietnam, deux économies à contrôle strict, ont résisté. Cette mémoire institutionnelle structure encore aujourd'hui la doctrine de la Banque populaire de Chine (PBoC).\n\n2.2 Le trilemme de Mundell appliqué au cas chinois\n\nLa Chine fait face au trilemme classique d...",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 14,
    "image": "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&q=80",
    "featured": false,
    "trending": false
  },
{
    "id": "15",
    "title": "Ukraine: 4 ans de guerre - Le bilan",
    "excerpt": "■ Bilan capacitaire — 4 ans",
    "content": "■ Bilan capacitaire — 4 ans\n\n1. La comptabilité de la guerre d'usure : pertes matérielles et humaines\n\nLa base de données Oryx — qui documente les pertes matérielles visuellement confirmées — constitue la référence la plus fiable pour évaluer le bilan matériel du conflit. Au 10 mars 2026, Oryx recense plus de 3 400 chars russes détruits, endommagés ou capturés, et environ 1 100 chars ukrainiens. Les pertes en véhicules blindés de transport et d'artillerie sont proportionnellement encore plus lourdes côté russe. Mais ces pertes ne racontent qu'une partie de l'histoire : la Russie a démontré une capacité de régénération industrielle et humaine qui a surpris les analystes occidentaux.\n\n■ La ligne de front — mars 2026\n\n2. Situation sur le terrain : une guerre d'usure qui grignote\n\nLa ligne de front en mars 2026 s'étend sur environ 1 000 kilomètres, de la région de Soumy au nord jusqu'à Kherson au sud. Les combats les plus intenses se concentrent dans trois secteurs : Pokrovsk (est — Donetsk), où la Russie contrôle désormais la majeure partie de la ville après une avancée record de 297 mètres par jour entre novembre 2025 et janvier 2026 ; Tchassiv Iar (ouest de Bakhmout), partiellement sous contrôle russe depuis l'été 2025 ; et Soumy au nord, où la Russie maintient une pression constante.\n\n■ Le dilemme démographique\n\n3. La bataille des effectifs : qui peut tenir le plus longtemps ?\n\nLe facteur le plus déterminant à moyen terme n'est pas matériel — c'est humain. L'Ukraine, avec une population de 35 millions (réduite par les déplacés), mobilize environ 800 000 soldats. Le recrutement est difficile, la mobilisation impopulaire, et les réservistes disponibles estimés à 200 000 à 300 000 en 2026. La Russie, avec 145 millions d'habitants et des millions de réservistes encore disponibles, dispose d'un avantage démographique structurel — malgré 1,2 million de pertes cumulées.\n\nSyrsky, commandant en chef ukrainien, a déclaré début 2026 que les pertes russes en 2025 avaient pour la première fois dépassé le niveau du recrutement — signal d'une pression croissante sur la régénération des forces russes. Rutte (OTAN) a confirmé que la Russie 'perd un nombre considérable de soldats en raison de la résistance acharnée de l'Ukraine'. Mais Poutine, selon l'analyse de Yann Breault (Collège militaire royal), est prêt à continuer à perdre des milliers de soldats tant que la ligne de front stagne.\n\n■ Les scénarios de sortie\n\n4. Scénarios 2026–2028 : cessez-le-feu, gel ou escalade\n\n■ Cartographie & Actions\n\n5. Cartographie actionnable\n\n5.2 Playbook stratégique\n\n■ Conclusion\n\nUkraine 2026 : la guerre qui redéfinit la sécurité européenne\n\nQuatre ans, deux millions de victimes potentielles, 660 milliards de pertes économiques, et moins de 1 % de territoire conquis supplémentaire en 2024. La guerre en Ukraine défie toutes les logiques de la stratégie militaire classique — et pourtant elle continue, portée par des positions territoriales irréconciliables et une asymétrie démographique que rien ne semble pouvoir résoudre rapidement.",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "16",
    "title": "Taiwan 2026: Le compte à rebours",
    "excerpt": "■ La coercition graduée",
    "content": "■ La coercition graduée\n\n1. La stratégie chinoise : de la coercition au blocus — la montée en pression\n\nL'exercice du 29 décembre 2025 n'est pas un incident isolé — c'est l'étape la plus récente d'une escalade méthodique. La PLA a conduit des exercices de grande ampleur en août 2022 (après la visite de Pelosi), mai 2024 (investiture de Lai Ching-te), et maintenant décembre 2025 (Suite à une vente d'armes américaines de 11,1 milliards de dollars). Chaque épisode est plus élaboré que le précédent, ciblant des scénarios spécifiques : blocus des ports, frappes de précision sur infrastructures navales, projection amphibie.\n\nL'IFRI (Marc Julienne) décrit une stratégie en trois phases potentielles : actions hybrides crescendo (désinformation, cyberattaques, sabotages), blocus naval et aérien, et ultimement assaut amphibie. Ces phases ne s'excluent pas — elles se complètent. Le Pentagone estime une invasion amphibie encore complexe à court terme : manque de ravitailleurs en vol pour la zone d'exclusion aérienne, déficits en lutte anti-sous-marine, logistique amphibie insuffisante. Mais ces lacunes se comblent méthodiquement.\n\n■ La défense asymétrique taïwanaise\n\n2. La stratégie du porc-épic : rendre l'invasion trop coûteuse\n\nFace à l'impossibilité de rivaliser symétriquement avec la PLA, Taïwan mise sur une stratégie asymétrique — la 'stratégie du porc-épic' — conçue pour infliger des pertes si élevées à une force d'invasion qu'elle est dissuadée avant même de débarquer. Le budget spécial de 40 milliards de dollars proposé pour 2026–2033 finance trois piliers : le Dôme taïwanais (réseau antimissile et anti-drones multicouche IA), les drones (200 000 aériens + 1 000 navires de surface sans équipage), et les forces de réserve renforcées pour une résistance urbaine de type ukrainien.\n\n■ L'enjeu économique mondial\n\n3. TSMC et le choc économique mondial d'un blocus taïwanais\n\nLe risque taïwanais n'est pas seulement géopolitique — c'est le risque économique systémique le plus élevé du monde. TSMC fabrique 62 % des puces mondiales de fonderie et plus de 90 % des puces les plus avancées (≤5 nm). Un blocus de 6 mois suffirait à paralyser l'ensemble de l'industrie électronique mondiale — automobiles, serveurs IA, smartphones, systèmes d'armes. Le CSIS a modélisé qu'un conflit autour de Taïwan coûterait à l'économie mondiale entre 2 000 et 3 000 milliards de dollars de PIB annuel perdu.\n\n■ Cartographie & Actions\n\n4. Cartographie actionnable\n\n4.2 Playbook stratégique",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=1200&q=80",
    "featured": false,
    "trending": false
  },
{
    "id": "17",
    "title": "Mer Rouge: Les Houthis face au monde",
    "excerpt": "■ Les Houthis — acteur non-étatique stratégique",
    "content": "■ Les Houthis — acteur non-étatique stratégique\n\n1. Les Houthis : comment un mouvement tribal est devenu une puissance maritime\n\nLes Houthis (Ansar Allah) ont démontré depuis 2023 une capacité opérationnelle maritime que peu d'analystes leur prêtaient. Leur arsenal inclut des missiles balistiques antinavires (Tankil — dérivés du Jaxim iranien), des missiles de croisière (Quds-3), des drones kamikazes (Samad-3, Shahid-136 type), et des drones navals (USV) capables de cibler des navires à plusieurs centaines de kilomètres. Cet arsenal est principalement fourni et entretenu par l'Iran, avec des composants provenant de Chine et de Corée du Nord pour les systèmes électroniques.\n\n■ EUNAVFOR Aspides\n\n2. La réponse européenne : EUNAVFOR Aspides entre ambition et limites\n\nLa mission EUNAVFOR Aspides, déployée en mars 2024 avec 23 États membres participants, constitue la première opération navale européenne de protection maritime en mer Rouge depuis des décennies. Sa mission est strictement défensive : escorter les navires commerciaux, intercepter les missiles et drones en approche, sans mandat pour frapper les bases Houthies au Yémen. Cette limitation est à la fois une force (elle évite l'escalade directe) et une faiblesse (elle ne s'attaque pas à la cause du problème).\n\nLa France, en tant que puissance navale principale de l'opération, contribue avec des frégates multimissions (FREMM) et participe à la coordination du commandement. La Marine nationale a intercepté plusieurs missiles et drones Houthis lors de ses déployements. L'opération a permis de sécuriser le transit d'environ 4 000 navires commerciaux, mais n'a pas résolu la crise fondamentale.\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 7,
    "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "18",
    "title": "Guerre Sous-Marine: Le nouveau champ de bataille",
    "excerpt": "■ La vulnérabilité des câbles sous-marins",
    "content": "■ La vulnérabilité des câbles sous-marins\n\n1. Les câbles sous-marins : l'infrastructure la plus critique et la moins protégée du monde\n\nLe monde numérique repose sur 400 câbles sous-marins qui transportent 95 % du trafic internet international et la quasi-totalité des transactions financières mondiales. Ces câbles — filiforme de quelques centimètres de diamètre, posés à des profondeurs allant jusqu'à 8 000 mètres — sont étonnamment vulnérables. La plupart ne sont protégés par aucune armure significative en eau profonde. Deux ou trois points de rupture concentrés peuvent isoler un continent entier.\n\n■ Les SNLE et la dissuasion\n\n2. Les sous-marins nucleiares : la dissuasion ultime reste sous-marine\n\nLes SNLE (Sous-marins Nucléaires Lanceurs d'Engins) constituent la composante la plus survivable de la dissuasion nucléaire — indétectables, ininterceptables, capables de frapper n'importe quel point du globe depuis leur patrouille. La France opère 4 SNLE classe Le Triomphant (missiles M51) en permanence — au moins un en patrouille en tout temps. Les États-Unis maintiennent 14 SSBN (4 déployés en permanence). La Russie opère 12 SNLE (classes Borei et Delta IV) depuis Mourmansk. La Chine accélère avec ses Type 094 et le futur Type 096 (SLBM JL-3).\n\n2.1 Les XLUUV — la prochaine révolution des profondeurs\n\nLes Extra-Large Unmanned Underwater Vehicles (XLUUV) représentent la prochaine rupture stratégique sous-marine. Ces drones sous-marins autonomes — capables de patrouiller des semaines sans équipage, transportant des charges utiles de plusieurs tonnes (torpilles, mines, capteurs) — vont transformer la compétition sous-marine. Le Boeing Orca (US Navy) a été testé en 2024. L'Extra Large Autonomous Undersea Vehicle (XAUV) russe Poseidon (drone nucléaire — capacité torpille de 100 mégatonnes) est en développement avancé. La Chine développe ses propres XLUUV pour la guerre des fonds marins en Pacifique occidental.\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 8,
    "image": "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "19",
    "title": "Chars de Combat: Le retour du roi",
    "excerpt": "■ Les leçons d'Ukraine",
    "content": "■ Les leçons d'Ukraine\n\n1. Ukraine : le char ni mort ni roi — mais transformé\n\nLa guerre en Ukraine a produit des leçons contradictoires sur le char de combat. Dans les premières semaines, des vidéos de chars russes détruits par des drones FPV à 300 dollars ont circulé mondialement, alimentant la thèse de l'obsolescence. Mais l'analyse plus fine du conflit révèle une réalité plus nuancée : les chars qui ont échoué sont ceux utilisés seuls, sans coordination interarmes, sans protection anti-drone, sans appui infanterie. Les chars intégrés dans des unités combinées (chars + infanterie + génie + défense anti-drone) continuent de jouer un rôle décisif.\n\n■ MGCS et le char du futur\n\n2. MGCS : le char franco-allemand en crise\n\nLe Main Ground Combat System (MGCS) est le programme de char de combat de 6e génération destiné à remplacer le Leclerc (France) et le Leopard 2 (Allemagne) à l'horizon 2035–2040. Porté par KNDS (la fusion Nexter + KMW), il illustre à la fois les ambitions de l'autonomie stratégique européenne et ses difficultés d'exécution. Le programme est en crise depuis 2022 : désaccords entre Nexter et Rheinmetall sur le leadership industriel, tensions franco-allemandes sur le partage des travaux, et questions sur la pertinence d'un char très lourd dans le contexte de la guerre des drones.\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 7,
    "image": "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "20",
    "title": "Artillerie & Munitions: La crise silencieuse",
    "excerpt": "■ La révolution artillerie",
    "content": "■ La révolution artillerie\n\n1. Ukraine : l'artillerie longue portée redevient décisive\n\nLa guerre en Ukraine a confirmé ce que les guerres du Golfe et d'Afghanistan avaient temporairement masqué : contre un adversaire disposant d'une défense antiaérienne robuste, l'aviation ne peut pas opérer librement. L'artillerie longue portée — moins vulnérable aux systèmes antiaériens, capable de frapper à 30–80 km avec précision — redevient l'arme de choix pour les frappes en profondeur. Le HIMARS (High Mobility Artillery Rocket System) américain a démontré une capacité de frappe de précision à 80 km avec les roquettes GMLRS, et à 300 km avec les missiles ATACMS.\n\n■ La crise des munitions 155 mm\n\n2. La grande pénurie : l'Europe ne produit pas assez\n\nLa révélation la plus brutale de la guerre en Ukraine pour les États européens est la suivante : après trente ans de dividende de la paix, l'Europe est incapable de produire les munitions en quantité suffisante pour soutenir un conflit de haute intensité. En 2022, l'Europe produisait 700 000 obus de 155 mm par an — soit environ 4 jours de consommation ukrainienne lors des phases intenses. L'objectif ambitieux de 2 millions d'ici fin 2025 n'a pas été atteint : les estimations convergent vers 1,1 à 1,3 million, révélant les goulots structurels de l'industrie des munitions.\n\n■ Cartographie & Actions\n\n3. Cartographie actionnable",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 7,
    "image": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=1200&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "21",
    "title": "Guerre Électronique: Le champ de bataille invisible",
    "excerpt": "■ La guerre invisible",
    "content": "■ La guerre invisible\n\n1. Le spectre électromagnétique comme champ de bataille\n\nLa guerre électronique se divise en trois composantes. L'attaque électronique (EA) : perturber, brouiller ou détruire les systèmes électroniques adverses — radars, communications, GPS, guidage des armes. La protection électronique (EP) : protéger ses propres systèmes contre ces attaques. Le soutien électronique (ES) : détecter, identifier et localiser les émissions électromagnétiques adverses pour les renseigner. En Ukraine, ces trois dimensions sont en jeu simultanément, créant un environnement électromagnétique d'une complexité sans précédent depuis la Guerre froide.\n\n■ Cartographie & Actions\n\n2. Cartographie actionnable",
    "category": "defense",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 6,
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    "featured": false,
    "trending": false
  }
];

export const categories = [
  { id: 'economie', name: 'Économie', color: '#059669' },
  { id: 'geopolitique', name: 'Géopolitique', color: '#7C3AED' },
  { id: 'defense', name: 'Défense', color: '#DC2626' },
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
