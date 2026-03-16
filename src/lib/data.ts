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
    "image": "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800&q=80",
    "featured": true,
    "trending": true
  },
  {
    "id": "3",
    "title": "Guerre commerciale: Les tarifs Trump secouent l'économie mondiale",
    "excerpt": "■ Chronologie",
    "content": "■ Chronologie\n\n1. De 2018 à 2026 : l'escalade tarifaire en huit actes\n\n■ Impact sectoriel Europe\n\n2. Impact sur l'Europe : secteurs, flux et contre-mesures\n\nL'Union européenne exporte environ 500 milliards de dollars de biens vers les États-Unis par an. Avec un droit universel de 20 % et des tarifs sectoriels (25 % acier-aluminium, menace sur automobiles), l'impact potentiel est considérable. L'UE a préparé deux listes de contre-mesures représentant environ 18 milliards d'euros de droits additionnels sur les exportaciones américaines — mais ne les a pas encore déclenchées, préférant la négociation.\n\n■ Impact sur les BRICS & émergents\n\n3. Les BRICS+ : bénéficiaires involontaires ou victimes collatérales ?\n\nLa guerre commerciale US-Chine crée des effets de détournement massifs. Les pays capables de jouer le rôle d'intermédiaire — manufacturier pour la Chine ou assemblant des composants chinois — bénéficient de flux de commandes redirigés. Mais les BRICS dans leur ensemble font face à un dilemme : se rapprolier de Pékin au risque de subir des sanctions secondaires américaines, ou ménager Washington au risque d'être perçus comme des partenaires de second rang.\n\n■ Réorientation des supply chains\n\n4. Reconfiguration mondiale des chaînes de valeur\n\nLe vrai impact à long terme des tarifs Trump 2.0 n'est pas le coût direct — c'est la reconfiguration structurelle des chaînes d'approvisionnement mondiales. Les entreprises ne peuvent pas absorber indéfiniment des droits de 20 à 145 % : elles relocalisent, elles diversifient leurs fournisseurs, ou elles absorbent les marges. Cette transformation est irréversible : une fois une supply chain reconfigurée, elle ne revient pas à son état antérieur même si les tarifs disparaissent.\n\n■ Prospective\n\n5. Trois scénarios à horizon 2027\n\n■ Cartographie & Actions\n\n6. Cartographie actionnable\n\n6.2 Playbook stratégique : trois horizons\n\n■ Conclusion\n\nLa fin du libre-échange comme cadre par défaut\n...",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    "featured": false,
    "trending": true
  },
  {
    "id": "4",
    "title": "mBridge: Le système de paiement qui défie le dollar",
    "excerpt": "■ Contexte & genèse",
    "content": "■ Contexte & genèse\n\n1. Pourquoi SWIFT est devenu une arme géopolitique\n\nSWIFT — Society for Worldwide Interbank Financial Telecommunication — est le système de messagerie interbancaire qui coordonne la quasi-totalité des règlements internationaux. Créé en 1973, il connecte plus de 11 000 institutions financières dans 200 pays. Sa gouvernance est belge, mais son architecture est profondément imbriquée dans le système bancaire correspondant en dollars américains.\n\nL'exclusion de la Russie du réseau SWIFT en mars 2022 — décision sans précédent dans l'histoire du système financier international — a constitué un signal d'alarme pour toutes les puissances qui se savent potentiellement exposées aux sanctions occidentales. Elle a démontré que l'infrastructure financière internationale pouvait être utilisée comme instrument de coercition géopolitique. La réaction a été immédiate dans les capitales de Pékin, Moscou, New Delhi, Riyad et Téhéran.\n\n■ Anatomie de mBridge\n\n2. mBridge : architecture, avancement et limites\n\nmBridge (Multiple Central Bank Digital Currency Bridge) est le projet le plus avancé de règlement multidevises via thérapeutiens numériques de banques centrales (MNBC). Il a été développé sous l'égide du Centre d'Innovation de la BRI de Hong Kong, en collaboration avec la Banque populaire de Chine, la Banque centrale des ÉAU, la Banque de Thaïlande et l'Autorité monétaire de Hong Kong.\n\n2.1 L'architecture technique de mBridge\n\nmBridge repose sur une blockchain permissioned (accès contrôlé) baptisée mBridge Ledger, développée à partir de la technologie PBFT (Practical Byzantine Fault Tolerance). Chaque banque centrale participante opère un nœud. Les règlements s'effectuent en MNBC (monnaies numériques de banque centrale) — e-CNY pour la Chine, e-Dirham pour les ÉAU, CBDC-Bath pour la Thaïlande. La conversion entre devises est atomique (simultanée), éliminant le risque de règlement Herstatt qui affecte les échanges de change traditionnel...",
    "category": "geopolitique",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "featured": false,
    "trending": false
  },
  {
    "id": "7",
    "title": "LNG Europe 2027: Le gaz liquéfié change la donne",
    "excerpt": "■ La rupture 2021–2026",
    "content": "■ La rupture 2021–2026\n\n1. De la dépendance au gazoduc à la diversification forcée\n\nLa transformation de l'approvisionnement gazier européen entre 2021 et 2026 est l'un des plus grands chocs d'infrastructure énergétique de l'histoire économique récente. En l'espace de trois ans, l'Europe a réussi à se sevrer de 30 points de pourcentage de dépendance au gaz russe — un exploit logistique et financier considérable, réalisé dans l'urgence et à un coût très élevé pour les industriels et les ménages européens.\n\n■ La nouvelle géographie gazière\n\n2. La triangulaire gazière : États-Unis, Qatar, Norvège\n\nL'Europe de 2026 s'approvisionne selon une géographie radicalement différente de 2021. Trois fournisseurs dominent : les États-Unis (GNL, ~50 % des imports GNL européens), le Qatar (GNL, ~15 %), et la Norvège (gazoduc, ~30 % de la consommation totale). Le gaz russe subsiste marginalement via le TurkStream (Balkans, Turquie) et quelques contrats bilatéraux.\n\n■ La guerre des prix\n\n3. TTF vs Henry Hub : la mécanique des spreads et des arbitrages\n\nLe marché du GNL est devenu un marché mondial arbitrageable. Les cargaisons GNL se dirigent vers le marché qui offre le meilleur prix net après transport. Le spread TTF-Henry Hub (prix européen moins prix américain) est le déterminant principal de la direction des flux atlantiques. Quand le spread est élevé (>5 $/MMBtu), les exportateurs américains redirigent leurs cargaisons vers l'Europe. Quand il est faible ou négatif, elles vont vers l'Asie.\n\n■ TurkStream & gaz résiduel russe\n\n4. Le gaz russe résiduel : TurkStream et les dépendances persistantes\n\nMalgré la rupture spectaculaire de la dépendance gazière européenne, le gaz russe n'a pas complètement disparu du mix européen. Le gazoduc TurkStream (capacité 31,5 Mrd m³/an) continue d'approvisionner la Turquise, la Bulgarie, la Serbie, la Hongratie et une partie de la Slovaquie. Ces pays restent dans une zone grise : officiellement alignés sur les sanct...",
    "category": "economie",
    "author": "Axel Coudassot-Berducou",
    "date": "2026-03-16",
    "readTime": 10,
    "image": "https://images.unsplash.com/photo-1611273426728-c15a8e290037?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1561515465-9b4d8b19e3c3?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1494564605686-2e931f77a8e2?w=800&q=80",
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
    "image": "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80",
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
