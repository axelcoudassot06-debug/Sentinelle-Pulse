// Chart & map data injected per article ID
// Sourced from article content for ultra-professional visualization

export interface BarDataPoint {
  label: string;
  value: number;
  color?: string;
  flag?: string;
}

export interface LineDataPoint {
  year: string;
  value: number;
  label?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type?: 'milestone' | 'event' | 'warning';
}

export interface KPI {
  value: string;
  label: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ArticleChart {
  kpis?: KPI[];
  barChart?: { title: string; unit: string; data: BarDataPoint[] };
  lineChart?: { title: string; unit: string; data: LineDataPoint[] };
  timeline?: { title: string; events: TimelineEvent[] };
  mapRegions?: string[];  // ISO codes or region names to highlight
  mapTitle?: string;
}

const charts: Record<string, ArticleChart> = {
  '1': {
    kpis: [
      { value: '~400 kg', label: 'Uranium enrichi à 60 %', sub: 'AIEA mars 2026 — suffisant pour 3-4 armes nucléaires', trend: 'up' },
      { value: '5', label: 'Sites nucléaires frappés', sub: 'Natanz, Fordo, Ispahan, Bouchehr + connexes (2025-2026)', trend: 'neutral' },
      { value: '0', label: 'Inspecteurs AIEA en Iran', sub: 'Expulsés mars 2026 — programme hors de tout contrôle', trend: 'down' },
      { value: '2-4 ans', label: 'Délai de reconstruction', sub: 'Selon CIA & IISS — si centrifugeuses préservées', trend: 'neutral' },
    ],
    barChart: {
      title: 'Capacité d\'enrichissement résiduelle par site (%)',
      unit: '%',
      data: [
        { label: 'Arak (IR-40)', value: 100, color: '#6b7280' },
        { label: 'Ispahan (UCF)', value: 85, color: '#f59e0b' },
        { label: 'Fordo (FFEP)', value: 45, color: '#f59e0b' },
        { label: 'Natanz (FEP)', value: 35, color: '#ef4444' },
        { label: 'Bouchehr (BNPP)', value: 0, color: '#dc2626' },
      ],
    },
    timeline: {
      title: 'Chronologie — Programme nucléaire iranien',
      events: [
        { date: '1979', title: 'Révolution islamique', description: 'L\'Iran relance son programme nucléaire malgré le retrait des firmes occidentales', type: 'milestone' },
        { date: '2002', title: 'Révélation de Natanz', description: 'Un groupe d\'opposition révèle l\'existence du site d\'enrichissement secret de Natanz', type: 'event' },
        { date: 'Juil. 2015', title: 'JCPOA signé', description: 'Accord de Vienne — gel du programme en échange de la levée des sanctions', type: 'milestone' },
        { date: 'Mai 2018', title: 'Retrait US du JCPOA', description: 'Trump retire les États-Unis — l\'Iran reprend progressivement l\'enrichissement', type: 'warning' },
        { date: 'Juin 2025', title: 'Frappes Natanz & Fordo', description: 'GBU-57 MOP — programme dégradé mais non éliminé', type: 'warning' },
        { date: 'Mars 2026', title: 'Bouchehr frappé + AIEA expulsée', description: 'Réacteur civil touché — programme hors contrôle international', type: 'warning' },
      ],
    },
  },
  '4': {
    kpis: [
      { value: '-40 %', label: 'Distance Hambourg-Shanghai via RNE', sub: 'vs route Suez — 13 000 km contre 21 000 km', trend: 'neutral' },
      { value: '13 %', label: 'Réserves mondiales pétrole non découvertes', sub: 'USGS — Arctique recèle aussi 30 % du gaz naturel', trend: 'neutral' },
      { value: '4-5 mois', label: 'Navigabilité RNE en 2026', sub: 'vs 2 mois en 2000 — fonte accélérée x2-4', trend: 'up' },
      { value: '14', label: 'Bases militaires russes nouvelles/réactivées', sub: 'Depuis 2014 — dont Novaya Zemlya et Franz Josef Land', trend: 'up' },
    ],
    barChart: {
      title: 'Trafic maritimes — Routes comparées (Mt/an)',
      unit: 'Mt/an',
      data: [
        { label: 'Canal de Suez', value: 1200, color: '#0891b2' },
        { label: 'Route du Nord-Est', value: 35, color: '#f59e0b' },
        { label: 'Route du Nord-Ouest', value: 1, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Arctique & Route du Nord-Est',
      events: [
        { date: '2000', title: 'RNE : 2 mois de navigabilité', description: 'La fonte des glaces commence à ouvrir la route — encore marginale commercialement', type: 'event' },
        { date: '2013', title: '2 Mt transitent via la RNE', description: 'Premier trafic commercial significatif — amorce de la croissance', type: 'milestone' },
        { date: '2017', title: 'Loi russe sur la RNE', description: 'Moscou impose des escorteurs nucléaires obligatoires pour tout navire étranger — contrôle de facto', type: 'warning' },
        { date: '2022', title: 'Pause du Conseil de l\'Arctique', description: 'Boycott des 7 membres occidentaux après l\'invasion de l\'Ukraine — coopération suspendue', type: 'warning' },
        { date: '2023-2024', title: 'Finlande & Suède rejoignent l\'OTAN', description: 'Rééquilibrage majeur — l\'OTAN contrôle désormais la quasi-totalité du littoral arctique non-russe', type: 'milestone' },
        { date: '2025', title: 'Trump : projet d\'acquisition du Groenland', description: 'Terres rares groenlandaises et position géostratégique — nouvelle pression américaine documentée', type: 'event' },
      ],
    },
  },
  '5': {
    kpis: [
      { value: '9', label: 'Opérateurs télécom US compromis', sub: 'Salt Typhoon 2024 — accès aux backdoors CALEA (FBI/NSA)', trend: 'down' },
      { value: '500+', label: 'Organisations victimes de Volt Typhoon', sub: 'Infra. critiques US — eau, énergie, ports [2]', trend: 'down' },
      { value: '12 Md$', label: 'Coût moyen d\'une cyberattaque majeure', sub: 'Lloyd\'s of London 2024 — pertes directes + récupération', trend: 'neutral' },
      { value: '2016', label: 'Première coupure d\'électricité par cyberattaque', sub: 'Sandworm / GRU — Ukraine, 230 000 foyers pendant 6 heures', trend: 'down' },
    ],
    barChart: {
      title: 'Niveau de menace des APTs étatiques (score estimé)',
      unit: '/10',
      data: [
        { label: 'Salt Typhoon (CN)', value: 9.5, color: '#ef4444' },
        { label: 'Volt Typhoon (CN)', value: 9.5, color: '#ef4444' },
        { label: 'Sandworm (RU)', value: 9.0, color: '#ef4444' },
        { label: 'APT29 / Cozy Bear (RU)', value: 8.0, color: '#f59e0b' },
        { label: 'Lazarus Group (RPDC)', value: 7.5, color: '#f59e0b' },
        { label: 'IRGC APT (Iran)', value: 6.0, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Cyberguerre d\'État',
      events: [
        { date: '2010', title: 'Stuxnet découvert', description: 'Premier cyberweapon ciblant des infrastructures physiques — centrifugeuses nucléaires iraniennes', type: 'milestone' },
        { date: '2016', title: 'Ukraine blackout (Sandworm)', description: 'Première coupure d\'électricité confirmée par cyberattaque — 230 000 foyers touchés', type: 'warning' },
        { date: '2017', title: 'NotPetya (10 Md$ de dommages)', description: 'Sandworm/GRU — cyberattaque la plus coûteuse de l\'histoire, ciblant l\'Ukraine mais causant des dommages mondiaux', type: 'warning' },
        { date: '2020', title: 'SolarWinds (APT29)', description: '18 000 organisations compromises via mise à jour logicielle — espionnage massif des agences US', type: 'warning' },
        { date: 'Fév. 2024', title: 'Volt Typhoon révélé', description: 'CISA confirme le pré-positionnement chinois dans les infrastructures critiques US en vue d\'une crise Taïwan', type: 'warning' },
        { date: 'Oct. 2024', title: 'Salt Typhoon — 9 opérateurs US', description: 'Chine accède aux backdoors CALEA — écoutes de responsables US. CISA recommande Signal.', type: 'warning' },
      ],
    },
  },
  '6': {
    kpis: [
      { value: '8 %', label: 'Part du gaz russe en Europe (2026)', sub: 'vs 40 % en 2021 — transition réussie mais coûteuse', trend: 'down' },
      { value: '26', label: 'Terminaux FSRU déployés en Europe', sub: '2022-2026 — dont 4 en Allemagne, 3 aux Pays-Bas', trend: 'up' },
      { value: '91,2 Md m³', label: 'Exportations LNG américaines 2024', sub: 'N°1 mondial — Trump en fait un levier commercial vs UE', trend: 'up' },
      { value: '45 €/MWh', label: 'Prix TTF gaz naturel (mars 2026)', sub: 'vs 340 €/MWh au pic (août 2022). Stabilisation.', trend: 'neutral' },
    ],
    barChart: {
      title: 'Sources d\'approvisionnement gaz de l\'Europe (2026)',
      unit: '% du total',
      data: [
        { label: 'Norvège', value: 28, color: '#059669' },
        { label: 'États-Unis (LNG)', value: 22, color: '#0891b2' },
        { label: 'Qatar (LNG)', value: 14, color: '#f59e0b' },
        { label: 'Algérie', value: 11, color: '#6b7280' },
        { label: 'Russie (résiduel)', value: 8, color: '#ef4444' },
        { label: 'Autres', value: 17, color: '#94a3b8' },
      ],
    },
    timeline: {
      title: 'Chronologie — Transition gazière européenne',
      events: [
        { date: 'Fév. 2022', title: 'Invasion de l\'Ukraine', description: 'Déclencheur de la crise énergétique — Gazprom commence à réduire les livraisons', type: 'warning' },
        { date: 'Août 2022', title: 'TTF à 340 €/MWh — pic historique', description: 'Crise énergétique maximale — industrie européenne sous pression extrême', type: 'warning' },
        { date: 'Sept. 2022', title: 'Sabotage Nord Stream 1 & 2', description: 'Destruction des gazoducs sous-marins — fin définitive du gaz russe bon marché pour l\'Europe', type: 'warning' },
        { date: '2022-2023', title: '26 FSRU déployés en urgence', description: 'L\'Europe construit en 6-18 mois une capacité de regazéification sans précédent', type: 'milestone' },
        { date: '2024', title: 'USA : premier exportateur LNG mondial', description: '91,2 Md m³ exportés — dépassant le Qatar et l\'Australie', type: 'milestone' },
        { date: '2025', title: 'Trump : "Achetez notre LNG ou payez des tarifs"', description: 'L\'énergie devient instrument de politique commerciale américaine', type: 'event' },
      ],
    },
  },
  '7': {
    kpis: [
      { value: '58 %', label: 'Part du dollar dans les réserves mondiales (2025)', sub: 'FMI COFER — vs 71 % en 2001, -13 pts en 24 ans', trend: 'down' },
      { value: '6', label: 'Nouveaux membres BRICS admis en 2024', sub: 'Arabie Saoudite, EAU, Iran, Éthiopie, Égypte (Argentine refuse). BRICS+ = 45 % PIB PPA', trend: 'up' },
      { value: '24', label: 'Pays testant mBridge ou solutions similaires', sub: 'BRI 2025 — dont Arab Monetary Fund, Banque centrale saoudienne', trend: 'up' },
      { value: '300 Md$', label: 'Avoirs russes gelés par l\'Occident (2022)', sub: 'Catalyseur principal de la dédollarisation — alarme pour toutes les BC non-occidentales', trend: 'down' },
    ],
    barChart: {
      title: 'Part du dollar dans les réserves mondiales (%)',
      unit: '%',
      data: [
        { label: '2001', value: 71, color: '#0891b2' },
        { label: '2010', value: 62, color: '#0891b2' },
        { label: '2015', value: 66, color: '#0891b2' },
        { label: '2020', value: 59, color: '#f59e0b' },
        { label: '2025', value: 58, color: '#ef4444' },
      ],
    },
    timeline: {
      title: 'Chronologie — Dédollarisation & alternatives financières',
      events: [
        { date: '2015', title: 'CIPS lancé par la Chine', description: 'Alternative chinoise à SWIFT pour les transactions en yuan — 1 400+ institutions en 2026', type: 'milestone' },
        { date: '2017', title: 'SPFS russe opérationnel', description: 'Système de messagerie financière russe — créé après la menace d\'exclusion de SWIFT', type: 'milestone' },
        { date: 'Mars 2022', title: 'Gel des 300 Md$ d\'avoirs russes', description: 'Décision déclenchant une alarme dans toutes les banques centrales non-occidentales sur la sécurité de leurs réserves', type: 'warning' },
        { date: 'Oct. 2024', title: 'BRICS Kazan — admission de 6 membres', description: 'BRICS+ représente 45 % du PIB mondial PPA. BRICS Pay annoncé.', type: 'milestone' },
        { date: '2024', title: 'mBridge : pilote commercial BRI', description: '160 transactions pour 22 M$ — démonstration de faisabilité sans dollar ni SWIFT', type: 'milestone' },
        { date: '2023-2026', title: 'Première vente pétrole saoudien en yuan', description: 'Signal politique majeur : Aramco accepte le yuan pour des cargaisons chinoises', type: 'event' },
      ],
    },
  },
  '8': {
    kpis: [
      { value: '5 %', label: 'Objectif PIB défense OTAN 2035', sub: 'Sommet La Haye, 25 juin 2025 — 3,5 % militaire + 1,5 % cyber/infra', trend: 'up' },
      { value: '63,8 Md€', label: 'Carnet commandes Rheinmetall (déc. 2025)', sub: '+36 % sur un an — record absolu. 600 chars Leopard commandés [2]', trend: 'up' },
      { value: '25 Md$', label: 'Budget Golden Dome (Congrès US 2025)', sub: 'Défense multicouche sol/mer/air/espace du territoire américain', trend: 'neutral' },
      { value: '500 Md€', label: 'Fonds spécial défense Allemagne (2025)', sub: 'Bundestag — exemption du frein constitutionnel à l\'endettement', trend: 'up' },
    ],
    barChart: {
      title: 'Dépenses défense OTAN — sélection de pays (% PIB, 2025)',
      unit: '% PIB',
      data: [
        { label: 'Pologne', value: 4.2, color: '#ef4444' },
        { label: 'Estonie', value: 3.4, color: '#ef4444' },
        { label: 'Lettonie', value: 3.2, color: '#f59e0b' },
        { label: 'Lituanie', value: 3.0, color: '#f59e0b' },
        { label: 'Allemagne', value: 2.3, color: '#6b7280' },
        { label: 'France', value: 2.1, color: '#6b7280' },
        { label: 'Italie', value: 1.8, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Réarmement OTAN',
      events: [
        { date: 'Fév. 2014', title: 'Annexion de la Crimée', description: 'Déclencheur — sommet du Pays de Galles adopte l\'objectif des 2 % du PIB', type: 'warning' },
        { date: 'Fév. 2022', title: 'Invasion de l\'Ukraine', description: 'Accélérateur majeur du réarmement — Allemagne annonce le Zeitenwende (tournant historique)', type: 'warning' },
        { date: 'Mars 2025', title: 'Fonds spécial Allemagne 500 Md€', description: 'Bundestag vote l\'exemption du frein à l\'endettement pour la défense et les infrastructures', type: 'milestone' },
        { date: 'Juil. 2025', title: 'Golden Dome approuvé (25 Md$)', description: 'Congrès américain autorise le programme de défense antimissile du territoire américain', type: 'milestone' },
        { date: 'Juin 2025', title: 'Sommet La Haye — objectif 5 % PIB', description: '32 membres OTAN actent l\'objectif de 5 % du PIB d\'ici 2035 — rupture historique', type: 'milestone' },
        { date: 'Déc. 2025', title: 'Rheinmetall : carnet 63,8 Md€', description: '+36 % en un an — 600 Leopard commandés. Symbole du supercycle industriel de défense', type: 'milestone' },
      ],
    },
  },
  '9': {
    kpis: [
      { value: '90 %', label: 'Part de TSMC dans la production de puces < 5nm', sub: 'Un seul site à Taïwan — risque géopolitique systémique mondial [1]', trend: 'neutral' },
      { value: '1 seul', label: 'Fabricant mondial de machines EUV lithographie', sub: 'ASML (Pays-Bas) — monopole absolu, soumis aux contrôles US [2]', trend: 'neutral' },
      { value: '150 Md$', label: 'Subventions chinoises à l\'industrie des semi-conducteurs', sub: 'Big Fund I+II+III (2014-2024) — objectif autosuffisance 2030 [4]', trend: 'up' },
      { value: '52 Md$', label: 'CHIPS and Science Act — fabs domestiques US', sub: 'Intel (Ohio), TSMC (Arizona), Samsung (Texas). Objectif : 20 % prod. mondiale 2030', trend: 'up' },
    ],
    barChart: {
      title: 'Contrôle de la chaîne valeur semi-conducteurs (% marché)',
      unit: '%',
      data: [
        { label: 'TSMC (puces avancées)', value: 90, color: '#ef4444' },
        { label: 'ASML (machines EUV)', value: 100, color: '#0891b2' },
        { label: 'ARM (architecture mobile)', value: 95, color: '#f59e0b' },
        { label: 'Synopsys+Cadence (EDA)', value: 80, color: '#059669' },
        { label: 'Samsung+SK Hynix (DRAM)', value: 70, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Guerre des puces',
      events: [
        { date: '2020', title: 'Huawei blacklisté par les US', description: 'Premier tournant majeur — TSMC ne peut plus livrer Huawei. Chine accélère ses investissements', type: 'warning' },
        { date: 'Oct. 2022', title: 'Export Controls US — Contrôles avancés', description: 'Bureau of Industry and Security restreint les exportations de puces avancées et d\'équipements vers la Chine', type: 'warning' },
        { date: 'Août 2022', title: 'CHIPS and Science Act (52 Md$)', description: 'Biden signe — subventions massives pour les fabs domestiques. TSMC Arizona, Intel Ohio annoncés', type: 'milestone' },
        { date: '2023', title: 'SMIC produit une puce 7nm (Huawei Mate 60 Pro)', description: 'Contournement partiel des contrôles — mais coût 3-5x plus élevé que TSMC, rendements faibles', type: 'event' },
        { date: '2024', title: 'Big Fund III — 47 Md$ supplémentaires', description: 'Chine porte son investissement total à 150 Md$ pour l\'autosuffisance en semi-conducteurs d\'ici 2030', type: 'milestone' },
        { date: '2025', title: 'TSMC : production 2nm opérationnelle', description: 'L\'écart avec SMIC se creuse — TSMC est à 2 nm pendant que la Chine arrive difficilement à 7 nm', type: 'event' },
      ],
    },
  },
  '10': {
    kpis: [
      { value: '145 %', label: 'Tarifs US sur importations chinoises (pic 2025)', sub: '20 % fentanyl + 125 % escalade avril 2025. Chine a répondu à 125 % [1]', trend: 'up' },
      { value: '25 %', label: 'Tarifs US sur Canada et Mexique', sub: 'IEEPA (urgence économique nationale) — dérogations sectorielles négociées [2]', trend: 'up' },
      { value: '20 %', label: 'Tarifs généralisés US sur UE', sub: 'Annoncés avril 2025. Pharmaceutiques, automobiles, acier ciblés [3]', trend: 'up' },
      { value: '-3,3 %', label: 'Impact estimé sur le PIB mondial (FMI 2025)', sub: 'Réduction cumulée commerce mondial de 8-10 % si escalade complète [4]', trend: 'down' },
    ],
    barChart: {
      title: 'Tarifs Trump 2025 par partenaire commercial (%)',
      unit: '%',
      data: [
        { label: 'Chine (pic)', value: 145, color: '#ef4444' },
        { label: 'Vietnam', value: 46, color: '#f59e0b' },
        { label: 'Canada/Mexique', value: 25, color: '#f59e0b' },
        { label: 'Union Européenne', value: 20, color: '#6b7280' },
        { label: 'Japon', value: 24, color: '#6b7280' },
        { label: 'Inde', value: 26, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Guerre commerciale Trump 2025',
      events: [
        { date: 'Jan. 2025', title: 'Retour de Trump à la Maison-Blanche', description: 'Annonce immédiate de tarifs contre le Canada, le Mexique et la Chine — doctrine MAGA économique', type: 'event' },
        { date: 'Fév. 2025', title: 'Tarifs 25 % Canada et Mexique (IEEPA)', description: 'Invocation de l\'urgence économique nationale — première utilisation de l\'IEEPA pour des tarifs massifs', type: 'warning' },
        { date: 'Avr. 2025', title: 'Tarifs 20 % généralisés sur l\'UE', description: 'Pharmaceutiques, automobiles, acier — UE prépare des contre-tarifs ciblés sur les battleground states', type: 'warning' },
        { date: 'Avr. 2025', title: 'Escalade Chine : 125 % → 145 % US', description: 'Spirale d\'escalade : Chine répond à 125 %, US montent à 145 % — niveau Smoot-Hawley', type: 'warning' },
        { date: 'Jan. 2025', title: 'Chine restreint exports terres rares', description: 'Gallium, germanium, graphite — arme des matériaux critiques contre les semi-conducteurs et batteries US', type: 'warning' },
        { date: '2025', title: 'Grand bénéficiaire : Inde et Mexique', description: 'Les flux de délocalisation se détournent vers l\'Inde et le Mexique plutôt que de revenir aux États-Unis', type: 'event' },
      ],
    },
  },
  '11': {
    kpis: [
      { value: '43 %', label: 'Part de Kazatomprom dans la production mondiale d\'uranium', sub: 'Kazakhstan — lié à la Russie pour le transport et l\'enrichissement [1]', trend: 'neutral' },
      { value: '85 $/lb', label: 'Prix de l\'uranium (U3O8) en mars 2026', sub: 'Niveau le plus haut depuis 2007 — +230 % en 3 ans [5]', trend: 'up' },
      { value: '20 Md$', label: 'Investissements SMR annoncés (2023-2026)', sub: 'NuScale, TerraPower, Rolls-Royce SMR, Kairos — 1ère unité prévue 2029 [4]', trend: 'up' },
      { value: '2024', label: 'Embargo américain sur l\'uranium russe enrichi', sub: 'Mai 2024 — prohibition TENEX. Dérogations limitées jusqu\'en 2028 [3]', trend: 'down' },
    ],
    barChart: {
      title: 'Production mondiale d\'uranium par pays (% du total, 2025)',
      unit: '%',
      data: [
        { label: 'Kazakhstan', value: 43, color: '#ef4444' },
        { label: 'Canada', value: 15, color: '#059669' },
        { label: 'Namibie', value: 11, color: '#6b7280' },
        { label: 'Australie', value: 10, color: '#6b7280' },
        { label: 'Ouzbékistan', value: 7, color: '#6b7280' },
        { label: 'Russie', value: 6, color: '#ef4444' },
        { label: 'Autres', value: 8, color: '#94a3b8' },
      ],
    },
    timeline: {
      title: 'Chronologie — Renaissance nucléaire et dépendance à la Russie',
      events: [
        { date: 'Mars 2011', title: 'Fukushima — arrêt 50 réacteurs japonais', description: 'La catastrophe provoque une vague de fermetures mondiales. Allemagne annonce la sortie du nucléaire.', type: 'warning' },
        { date: '2022', title: 'Prise de conscience post-Ukraine', description: 'L\'Occident réalise sa dépendance à l\'uranium et à l\'enrichissement russes — trop tard pour une réaction rapide', type: 'warning' },
        { date: 'Mai 2024', title: 'Embargo américain sur l\'uranium russe (TENEX)', description: 'Prohibition de facto des importations TENEX. Dérogations limitées jusqu\'en 2028 pour les utilities déjà sous contrat', type: 'milestone' },
        { date: '2023', title: 'NuScale : première certification NRC', description: 'Premier SMR certifié aux États-Unis — mais aucun n\'est encore commercial en 2026', type: 'milestone' },
        { date: '2026', title: 'Uranium à 85 $/lb — niveau 2007', description: 'La pénurie anticipée d\'enrichissement fait monter les prix. Renaissance nucléaire = signal d\'achat', type: 'event' },
        { date: '2029-2031', title: 'Premiers SMR commerciaux attendus', description: 'Rolls-Royce (UK), NuScale (US), Kairos Power — si les délais sont tenus (historiquement rarement)', type: 'event' },
      ],
    },
  },
  '12': {
    kpis: [
      { value: '2 500 Md$', label: 'AUM crédit privé mondial en 2025', sub: '+5x en 10 ans — Preqin estime 3 500 Md$ en 2028 [1]', trend: 'up' },
      { value: '10-13 %', label: 'Rendement typique des prêts directs (2024-2025)', sub: 'vs 4-6 % pour les obligations HY publiques. Spread de 400-700 pb [2]', trend: 'up' },
      { value: '6,2 %', label: 'Taux de défaut crédit privé estimé pour 2026', sub: 'Moody\'s janv. 2026 — hausse vs 3,8 % en 2024. Endettement élevé + taux longs [3]', trend: 'down' },
      { value: '0', label: 'Jours de liquidité pour un investisseur voulant sortir', sub: 'Lockup de 5-10 ans. Pas de marché secondaire développé. Risque d\'illiquidité total [1]', trend: 'down' },
    ],
    barChart: {
      title: 'Croissance du marché du crédit privé (Md$ AUM)',
      unit: 'Md$',
      data: [
        { label: '2015', value: 500, color: '#059669' },
        { label: '2018', value: 900, color: '#059669' },
        { label: '2020', value: 1200, color: '#f59e0b' },
        { label: '2022', value: 1800, color: '#f59e0b' },
        { label: '2025', value: 2500, color: '#ef4444' },
        { label: '2028 (est.)', value: 3500, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Essor du crédit privé',
      events: [
        { date: '2008-2009', title: 'Crise financière mondiale', description: 'Les banques réduisent leurs prêts aux PME. Les fonds de crédit privé commencent à combler le vide.', type: 'warning' },
        { date: '2010-2013', title: 'Bâle III impose les nouvelles règles', description: 'Les banques contraintes de réduire les prêts aux entreprises à rating < BBB — le marché s\'ouvre pour le crédit privé', type: 'milestone' },
        { date: '2015', title: '500 Md$ AUM — début de l\'accélération', description: 'Le marché atteint sa première masse critique. Apollo, Ares, Blackstone dominent.', type: 'milestone' },
        { date: '2022-2023', title: 'Hausse des taux Fed (5,25-5,50 %)', description: 'Les rendements crédit privé (SOFR + 600 pb) atteignent 10-13 %. Afflux massif d\'investisseurs institutionnels.', type: 'event' },
        { date: '2024', title: 'FMI alerte sur la "contagion opaque"', description: 'Le FMI GFSR 2024 identifie les risques de contagion entre crédit privé et banques via les lignes de crédit', type: 'warning' },
        { date: '2025', title: '2 500 Md$ AUM — taux de défaut en hausse', description: 'Moody\'s estime le taux de défaut à 6,2 % pour 2026. L\'endettement élevé des emprunteurs crée des tensions.', type: 'warning' },
      ],
    },
  },
  '13': {
    kpis: [
      { value: '6 500 Md$', label: 'AUM total family offices mondiaux (2025)', sub: '+25 % en 3 ans — dont 40 % en Amérique du Nord [1]', trend: 'up' },
      { value: '10 000+', label: 'Single family offices dans le monde (2025)', sub: 'vs 5 000 en 2015. Seuil d\'entrée : 250 M$ à 1 Md$ [1]', trend: 'up' },
      { value: '35 %', label: 'Allocation moyenne en actifs alternatifs', sub: 'PE, VC, infra — vs 15 % pour les fonds de pension [2]', trend: 'neutral' },
      { value: '60 %', label: 'Family offices Moyen-Orient investis hors de leur région', sub: 'Diversification géographique post-2022 vers USA, Europe, Asie [3]', trend: 'up' },
    ],
    barChart: {
      title: 'AUM family offices par région (Md$, 2025)',
      unit: 'Md$',
      data: [
        { label: 'Amérique du Nord', value: 2500, color: '#0891b2' },
        { label: 'Moyen-Orient', value: 1200, color: '#f59e0b' },
        { label: 'Europe', value: 1100, color: '#059669' },
        { label: 'Asie (hors Chine)', value: 800, color: '#6b7280' },
        { label: 'Chine (offshore)', value: 700, color: '#ef4444' },
      ],
    },
  },
  '14': {
    kpis: [
      { value: '2030-2035', label: 'Estimation du Q-Day (ordinateur cassant RSA)', sub: 'IBM, Google, DARPA — fourchette très incertaine : certains disent 2027, d\'autres 2040+ [2]', trend: 'down' },
      { value: '2024', label: 'Standards NIST cryptographie post-quantique publiés', sub: 'FIPS 203 (CRYSTALS-Kyber), FIPS 204 (Dilithium) — migration obligatoire US avant 2030 [4]', trend: 'neutral' },
      { value: '97 %', label: 'Transactions financières mondiales protégées par RSA/ECC', sub: 'SWIFT, TLS, certificats numériques — potentiellement vulnérables au Q-Day [1]', trend: 'down' },
      { value: '10-15 ans', label: 'Durée estimée de migration vers la cryptographie PQC', sub: 'McKinsey 2024 — les institutions qui commencent maintenant seront prêtes en 2035-2038 [5]', trend: 'neutral' },
    ],
    timeline: {
      title: 'Chronologie — Menace quantique et cryptographie',
      events: [
        { date: '2019', title: 'Google : "suprématie quantique"', description: 'Sycamore effectue un calcul en 200 secondes qu\'un supercalculateur prendrait 10 000 ans. Début de l\'ère quantique.', type: 'milestone' },
        { date: '2022', title: 'NIST sélectionne les 4 premiers algorithmes PQC', description: 'CRYSTALS-Kyber, Dilithium, FALCON, SPHINCS+ — premiers standards de l\'ère post-quantique', type: 'milestone' },
        { date: 'Août 2024', title: 'NIST publie les standards FIPS 203/204/205', description: 'Migration obligatoire pour les agences fédérales US avant 2030. Les banques mondiales commencent la migration.', type: 'milestone' },
        { date: 'Déc. 2024', title: 'Google Willow : premiers avantages quantiques réels', description: 'Willow dépasse les performances classiques sur certains benchmarks — progrès concret vers le Q-Day', type: 'event' },
        { date: '2026', title: 'JPMorgan, HSBC, BNP : programmes PQC actifs', description: 'Les grandes banques mondiales ont lancé leurs migrations vers la cryptographie post-quantique', type: 'milestone' },
        { date: '2030-2035', title: 'Q-Day estimé (IBM/Google roadmap)', description: 'Fenêtre d\'incertitude la plus citée — mais la migration doit commencer maintenant pour être prête à temps', type: 'warning' },
      ],
    },
  },
  '15': {
    kpis: [
      { value: '-50 %', label: 'Trafic canal de Suez en 2024 vs 2023', sub: 'De 25 000 navires/an à ~12 000. Pertes Égypte : 6 Md$ (CNUCED) [3]', trend: 'down' },
      { value: '+7 000 km', label: 'Distance additionnelle via le Cap de Bonne-Espérance', sub: '+10-14 jours de transit. Coût additionnel 600-1 000 $/jour par navire [2]', trend: 'down' },
      { value: '300+', label: 'Attaques houthies sur navires commerciaux (2023-2026)', sub: 'Missiles antinavires, drones, torpilles. 4 navires coulés ou immobilisés [1]', trend: 'down' },
      { value: '2 Md$', label: 'Coût opération Prosperity Guardian (US-led, 2024)', sub: 'Déploiement naval US, UK, France pour protéger les routes en mer Rouge [5]', trend: 'neutral' },
    ],
    barChart: {
      title: 'Asymétrie des coûts : Houthis vs riposte occidentale (k$)',
      unit: 'k$',
      data: [
        { label: 'Missile houthi antinavire', value: 50, color: '#ef4444' },
        { label: 'Missile SM-2 pour l\'abattre', value: 2000, color: '#0891b2' },
        { label: 'Surcoût navire dérouté / jour', value: 800, color: '#f59e0b' },
      ],
    },
    timeline: {
      title: 'Chronologie — Crise de la mer Rouge',
      events: [
        { date: 'Oct. 2023', title: 'Attaque du Hamas — déclencheur régional', description: 'Le 7 octobre 2023 déclenche une escalade régionale. Les Houthis annoncent qu\'ils attaqueront les navires liés à Israël.', type: 'warning' },
        { date: 'Nov. 2023', title: 'Premières attaques houthies sur navires commerciaux', description: 'Début de la campagne contre le trafic commercial en mer Rouge. Les armateurs commencent à s\'inquiéter.', type: 'warning' },
        { date: 'Déc. 2023', title: 'Maersk, MSC, CMA CGM déroutent via le Cap', description: 'Décision des trois plus grands armateurs mondiaux — signal fort que la crise est durable', type: 'event' },
        { date: 'Jan. 2024', title: 'Opération Prosperity Guardian lancée', description: 'Coalition navale US-UK-France pour protéger les routes. Coût : 2 Md$/an. Efficacité limitée.', type: 'milestone' },
        { date: '2024', title: 'Trafic Suez -50 %. Prix fret x4.', description: 'Impact économique pleinement visible : 15 000 $/conteneur, pertes Égypte 6 Md$, inflation importations EU', type: 'warning' },
        { date: 'Mars 2026', title: 'Crise toujours active — déroutement normalisé', description: 'Les armateurs ont adapté leurs opérations pour le long terme. Le Cap de Bonne-Espérance est la nouvelle route standard.', type: 'event' },
      ],
    },
  },
  '16': {
    kpis: [
      { value: '65 €/t', label: 'Prix EUA (EU Allowance) mars 2026', sub: 'Pic à 103 €/t en 2023. Stabilisation à 60-80 €/t. Objectif EU : 150 €/t en 2030 [1]', trend: 'neutral' },
      { value: '2026', label: 'Première phase de paiement effectif CBAM', sub: 'Acier, aluminium, ciment, engrais, électricité, hydrogène — 6 secteurs ciblés [2]', trend: 'neutral' },
      { value: '750 Md€', label: 'Revenus ETS 2020-2025 pour financer la transition', sub: 'Utilisés pour les ENR, efficacité énergétique, Fonds Innovation EU [3]', trend: 'up' },
      { value: '-37 %', label: 'Réduction émissions EU ETS depuis 2005', sub: 'Secteurs couverts. Objectif : -85 % d\'ici 2040 (EU Climate Law) [4]', trend: 'down' },
    ],
    barChart: {
      title: 'Impact CBAM sur les exportateurs — surcoût estimé (% accès EU)',
      unit: '%',
      data: [
        { label: 'Turquie (acier)', value: 17, color: '#f59e0b' },
        { label: 'Russie (aluminium)', value: 22, color: '#ef4444' },
        { label: 'Inde (acier)', value: 14, color: '#f59e0b' },
        { label: 'Chine (ciment)', value: 18, color: '#ef4444' },
        { label: 'Algérie (engrais)', value: 12, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — EU ETS et CBAM',
      events: [
        { date: '2005', title: 'Lancement EU ETS — phase pilote', description: 'Premier marché carbone majeur au monde — débuts difficiles avec des prix quasi-nuls', type: 'milestone' },
        { date: '2013', title: 'Prix ETS s\'effondre à 3 €/t', description: 'Trop de quotas gratuits + récession 2008-2012 = prix insignifiant. Réforme urgente décidée.', type: 'warning' },
        { date: '2021', title: 'Réforme ETS : Market Stability Reserve', description: 'La MSR absorbe les quotas excédentaires. Prix remonte vers 50-80 €/t. Marché enfin fonctionnel.', type: 'milestone' },
        { date: 'Oct. 2023', title: 'CBAM entre en vigueur (phase transitoire)', description: 'Les importateurs doivent déclarer leurs émissions incorporées. Pas encore de paiement.', type: 'milestone' },
        { date: '2026', title: 'CBAM : première phase de paiement effectif', description: '6 secteurs soumis à la taxe carbone aux frontières. Premiers revenus CBAM pour l\'EU.', type: 'milestone' },
        { date: '2030', title: 'Objectif : 150 €/t CO2 et CBAM complet', description: 'Fin des quotas gratuits pour les secteurs couverts. CBAM pleinement opérationnel sur tous les secteurs.', type: 'event' },
      ],
    },
  },
  '2': {
    kpis: [
      { value: '58 %', label: 'Part du dollar dans les réserves', sub: 'FMI 2025 — vs 71 % en 2001, érosion de 13 pts en 24 ans', trend: 'down' },
      { value: '2023', label: 'Première vente pétrole saoudien en yuan', sub: 'Signal politique majeur à l\'OPEP et au Golfe', trend: 'neutral' },
      { value: '2 000 Md$', label: 'Réserves saoudiennes (SAMA)', sub: 'Majorité en T-bonds US — diversification lente mais réelle', trend: 'neutral' },
      { value: '1974', label: 'Accord Nixon-Fayçal', sub: '50 ans de dominance pétrodollar — fondations qui s\'érodent', trend: 'neutral' },
    ],
  },
  '3': {
    kpis: [
      { value: '20 %', label: 'Commerce pétrolier via Ormuz', sub: '17 Mb/j — fermeture = crise pétrolière mondiale immédiate', trend: 'neutral' },
      { value: '-50 %', label: 'Trafic Bab el-Mandeb 2024', sub: 'Houthis forcent les armateurs à contourner par le Cap', trend: 'down' },
      { value: '91,2 Md m³', label: 'Export LNG américain 2024', sub: 'Nº1 mondial — Trump l\'utilise comme levier commercial vs UE', trend: 'up' },
      { value: '2022', label: 'Sabotage Nord Stream 1 & 2', sub: '26 sept. 2022 — 3 des 4 pipelines détruits, enquête non résolue', trend: 'down' },
    ],
  },
  '17': {
    kpis: [
      { value: '1 045 t', label: 'Achats or banques centrales en 2024', sub: 'WGC Gold Demand Trends Q4 2024 — deuxième record consécutif', trend: 'up' },
      { value: '3 100 $', label: 'Prix de l\'or (mars 2026, once Troy)', sub: 'Record historique. +180 % en 5 ans.', trend: 'up' },
      { value: '420 t', label: 'Réserves or Pologne — 17 % des réserves', sub: 'NBP 2024. +130 t en 2024. Stratégie de sécurité nationale assumée.', trend: 'up' },
      { value: '300 Md$', label: 'Avoirs russes gelés — catalyseur de la ruée', sub: 'Mars 2022. Signal d\'alarme pour toutes les banques centrales non-occidentales.', trend: 'neutral' },
    ],
    barChart: {
      title: 'Réserves d\'or des grandes banques centrales (tonnes)',
      unit: 't',
      data: [
        { label: 'USA (Fed)', value: 8133, color: '#0891b2' },
        { label: 'Allemagne', value: 3352, color: '#0891b2' },
        { label: 'Italie', value: 2452, color: '#6b7280' },
        { label: 'Russie (CBR)', value: 2333, color: '#ef4444' },
        { label: 'Chine (PBoC)', value: 2279, color: '#ef4444' },
        { label: 'Inde (RBI)', value: 822, color: '#f59e0b' },
        { label: 'Pologne (NBP)', value: 420, color: '#059669' },
      ],
    },
    timeline: {
      title: 'Chronologie — L\'or comme arme géopolitique',
      events: [
        { date: '1971', title: 'Fin de l\'étalon-or (Nixon)', description: 'Nixon suspend la convertibilité or-dollar — début de l\'ère des réserves en devises', type: 'milestone' },
        { date: '2010', title: 'Achats nets BC redeviennent positifs', description: 'Les banques centrales redeviennent acheteuses nettes d\'or pour la première fois depuis les années 1980', type: 'milestone' },
        { date: 'Mars 2022', title: 'Gel des avoirs russes (300 Md$)', description: 'Le G7 gèle 300 Md$ d\'avoirs souverains russes — signal d\'alarme mondial sur la sécurité des réserves en devises', type: 'warning' },
        { date: '2022-2024', title: 'Chine achète 18 mois consécutifs', description: 'La PBoC accumule de l\'or pendant 18 mois consécutifs — dédollarisation discrète mais massive', type: 'event' },
        { date: '2023', title: 'Record achats BC : 1 037 t', description: 'WGC : record depuis 1967 — dominé par Chine, Pologne, Turquie, Inde', type: 'milestone' },
        { date: 'Mars 2026', title: 'Or à 3 100 $/oz — record historique', description: '+180 % en 5 ans. Demande structurelle BC + demande investissement = momentum haussier', type: 'milestone' },
      ],
    },
  },
  '18': {
    kpis: [
      { value: '4 Md', label: 'Personnes en stress hydrique sévère 1 mois/an', sub: 'WRI Aqueduct 2023. 500 M en situation permanente.', trend: 'down' },
      { value: '+40 %', label: 'Déficit offre/demande eau prévu en 2030', sub: 'UNESCO/UN-Water 2023. Sans changement de politique.', trend: 'down' },
      { value: '6 Md$', label: 'Marché droits à l\'eau en Californie (2025)', sub: 'NQH2O — premier contrat future eau listé au CME.', trend: 'up' },
      { value: '2025', label: 'Inde suspend le Traité de l\'Indus', sub: 'Suite à l\'attentat de Pahalgam. Premier précédent mondial.', trend: 'down' },
    ],
    barChart: {
      title: 'Niveau de risque hydrique par zone de tension',
      unit: '/5',
      data: [
        { label: 'Indus (Inde/Pakistan)', value: 5, color: '#ef4444' },
        { label: 'Nil / GERD', value: 4.5, color: '#ef4444' },
        { label: 'Mékong', value: 4, color: '#f59e0b' },
        { label: 'Euphrate-Tigre', value: 4, color: '#f59e0b' },
        { label: 'Colorado River', value: 2.5, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Crises hydriques mondiales',
      events: [
        { date: '1960', title: 'Traité de l\'Indus signé', description: 'Accord Inde-Pakistan sur le partage des eaux de l\'Indus — médiation Banque mondiale', type: 'milestone' },
        { date: '2011', title: 'GERD : début de construction', description: 'L\'Éthiopie commence la construction du Grand Ethiopian Renaissance Dam sur le Nil Bleu', type: 'event' },
        { date: '2020', title: 'GERD : premier remplissage', description: 'L\'Éthiopie remplit le réservoir malgré l\'opposition égyptienne — crise diplomatique majeure', type: 'warning' },
        { date: '2021', title: 'Lac Mead : niveau le plus bas depuis 1937', description: 'Sécheresse historique dans l\'Ouest américain — restriction d\'eau pour 7 États', type: 'warning' },
        { date: 'Avr. 2025', title: 'Inde suspend le Traité de l\'Indus', description: 'Premier précédent mondial de suspension d\'un traité hydrique bilatéral — escalade possible', type: 'warning' },
        { date: '2030', title: 'Déficit eau mondial attendu à +40 %', description: 'UNESCO : sans changements structurels, la demande dépassera l\'offre de 40 %', type: 'warning' },
      ],
    },
  },
  '19': {
    kpis: [
      { value: '+45 %', label: 'IDE au Mexique en 2024 vs 2022', sub: 'Record absolu. Tesla, BMW, Apple fournisseurs. Nearshoring US.', trend: 'up' },
      { value: '-30 %', label: 'Importations chinoises aux USA (2019-2025)', sub: 'De 540 Md$ (2018) à 380 Md$ (2025). Remplacées par Mexique, Vietnam, Inde.', trend: 'down' },
      { value: '1re', label: 'Mexique = 1er partenaire commercial USA (2024)', sub: 'Devant la Chine pour la première fois. USMCA = levier de nearshoring.', trend: 'up' },
      { value: '5 ans', label: 'Délai moyen pour reconstruire une supply chain', sub: 'McKinsey Global Institute, 2024. Minimum 3 ans pour les composants simples.', trend: 'neutral' },
    ],
    barChart: {
      title: 'Croissance IDE manufacturiers — nouvelles usines du monde (2024)',
      unit: '% vs 2022',
      data: [
        { label: 'Mexique', value: 45, color: '#059669' },
        { label: 'Pologne', value: 20, color: '#0891b2' },
        { label: 'Inde', value: 18, color: '#f59e0b' },
        { label: 'Vietnam', value: 15, color: '#6b7280' },
        { label: 'Chine', value: -8, color: '#ef4444' },
      ],
    },
    timeline: {
      title: 'Chronologie — Grande réorganisation des supply chains',
      events: [
        { date: '2001', title: 'Chine entre à l\'OMC', description: 'Début de la domination chinoise dans les exportations mondiales — l\'atelier du monde', type: 'milestone' },
        { date: '2020-2022', title: 'COVID : choc des supply chains', description: 'Pénuries mondiales révèlent la fragilité de la concentration en Chine — début du nearshoring', type: 'warning' },
        { date: '2022', title: 'Guerre en Ukraine : choc logistique', description: 'Fermeture espace aérien russe + sanctions = réorganisation des routes commerciales', type: 'warning' },
        { date: '2024', title: 'Mexique = 1er partenaire commercial USA', description: 'Mexique devance la Chine pour la première fois — IDE en hausse de 45 %', type: 'milestone' },
        { date: 'Avr. 2025', title: 'Tarifs Trump 2.0 : 145 % sur Chine', description: 'Accélération brutale du nearshoring — multinationales exécutent leurs plans B en urgence', type: 'warning' },
        { date: '2026-2030', title: 'Transition nearshoring en cours', description: 'Décennie de transition : Chine perd des parts, Mexique/Inde/Vietnam émergent comme alternatives', type: 'event' },
      ],
    },
  },
  '20': {
    kpis: [
      { value: '25 Md$', label: 'Budget initial Golden Dome (Congrès, juil. 2025)', sub: 'Estimation totale CBO : 175 Md$ sur 10 ans. Coût réel estimé 130-230 Md$.', trend: 'neutral' },
      { value: '175 Md$', label: 'Estimation CBO coût total sur 10 ans', sub: 'Congressional Budget Office, sept. 2025. Fourchette : 130-230 Md$.', trend: 'neutral' },
      { value: '4', label: 'Couches défensives (spatiale, haute altitude, moyenne, navale)', sub: 'Plus couche laser HEL. Architecture multicouche = redondance.', trend: 'neutral' },
      { value: '2035', label: 'Cible de déploiement opérationnel complet', sub: 'Selon le DoD. Certains composants (THAAD amélioré) déjà opérationnels.', trend: 'neutral' },
    ],
    barChart: {
      title: 'Coût estimé des couches Golden Dome (Md$)',
      unit: 'Md$',
      data: [
        { label: 'Satellite intercepteurs (KEI)', value: 60, color: '#0891b2' },
        { label: 'THAAD Next Gen + GBI', value: 45, color: '#f59e0b' },
        { label: 'PAC-3 MSE réseau dense', value: 30, color: '#f59e0b' },
        { label: 'SM-3 Block IIA maritime', value: 25, color: '#6b7280' },
        { label: 'Lasers HEL', value: 15, color: '#059669' },
      ],
    },
    timeline: {
      title: 'Chronologie — Golden Dome',
      events: [
        { date: 'Jan. 2025', title: 'Trump annonce Golden Dome', description: 'Décret présidentiel — défense antimissile multicouche pour tout le territoire américain', type: 'milestone' },
        { date: 'Juil. 2025', title: 'Congrès vote 25 Md$ initial', description: 'NDAA FY2026 — financement initial approuvé. CBO estime le coût total à 175 Md$.', type: 'milestone' },
        { date: 'Sept. 2025', title: 'Contrats Northrop, Raytheon, Lockheed', description: 'Premiers contrats de développement signés — architectures satellite et THAAD Next Gen', type: 'event' },
        { date: '2026-2030', title: 'Déploiement progressif', description: 'Composants THAAD amélioré et PAC-3 MSE dès 2026-2027. Couche spatiale KEI : 2030+', type: 'event' },
        { date: '2035', title: 'Opérabilité complète visée', description: 'Architecture multicouche complète incluant satellites intercepteurs et lasers HEL', type: 'milestone' },
      ],
    },
  },
  '21': {
    kpis: [
      { value: '37 000', label: 'Cibles générées par le système Lavender (Gaza 2023-24)', sub: 'Système IA israélien. Taux d\'erreur accepté : ~10 %. 252 opérations/jour.', trend: 'down' },
      { value: '10 %', label: 'Taux d\'erreur acceptable du système Lavender', sub: 'Sur 37 000 cibles = ~3 700 erreurs potentielles. Problème éthique central.', trend: 'down' },
      { value: '119', label: 'Pays ayant participé aux négociations sur les LAWS', sub: 'Lethal Autonomous Weapons Systems. Aucune convention contraignante adoptée.', trend: 'neutral' },
      { value: '0', label: 'Traités internationaux contraignants sur les armes autonomes', sub: 'Malgré 10 ans de négociations à l\'ONU. Les grandes puissances bloquent.', trend: 'down' },
    ],
    timeline: {
      title: 'Chronologie — IA militaire et armes autonomes',
      events: [
        { date: '2010', title: 'Premier drone autonome HARPY (Israël)', description: 'Anti-radar autonome — cherche et détruit les radars sans opérateur humain', type: 'event' },
        { date: '2014', title: 'ICRC lance le débat LAWS', description: 'Premier rapport ICRC sur les systèmes d\'armes létaux autonomes — appel à la réglementation', type: 'milestone' },
        { date: '2021', title: 'Rapport ONU Kargu-2 en Libye', description: 'Possible première utilisation d\'un drone autonome avec reconnaissance faciale en combat — rapport GGE ONU', type: 'warning' },
        { date: '2023-2024', title: 'Système Lavender en Gaza', description: '+972 Magazine révèle : 37 000 cibles générées par IA, validation humaine de 20 secondes', type: 'warning' },
        { date: '2024', title: 'LOCUST et Replicator Initiative (USA)', description: 'DoD investit dans les essaims de drones autonomes — Replicator : 1 000+ drones d\'ici 2025', type: 'event' },
        { date: '2025+', title: 'Course aux LAWS sans réglementation', description: 'Russie, Chine, USA, Israël, Turquie : développement accéléré sans convention internationale', type: 'warning' },
      ],
    },
  },
  '22': {
    kpis: [
      { value: '200 $', label: 'Coût d\'un FPV kamikaze ukrainien', sub: 'vs 4 M$ pour un char T-72/T-80. Rapport coût/destruction : 1/20 000.', trend: 'neutral' },
      { value: '2 000+', label: 'Drones perdus par jour (pic 2024, Ukraine)', sub: 'Les deux camps ensemble. Production industrielle de drones nécessaire [ISW].', trend: 'down' },
      { value: '50 $', label: 'Coût d\'un Shahed-136 iranien (estimation)', sub: 'vs Patriot PAC-2 missile intercepteur : 4 M$. Asymétrie économique totale.', trend: 'neutral' },
      { value: '10 km', label: 'Zone de danger total pour tout véhicule', sub: 'Portée typique d\'un FPV kamikaze. Frontline = zone mortelle pour chars.', trend: 'down' },
    ],
    barChart: {
      title: 'Rapport coût drone / coût contre-mesure ($)',
      unit: '$',
      data: [
        { label: 'FPV kamikaze (UA)', value: 350, color: '#059669' },
        { label: 'Shahed-136 (RU/Iran)', value: 75, color: '#ef4444' },
        { label: 'Lancet-3 (RU)', value: 35000, color: '#f59e0b' },
        { label: 'Bayraktar TB2 (TR)', value: 5000000, color: '#0891b2' },
      ],
    },
    timeline: {
      title: 'Chronologie — Guerre des drones en Ukraine',
      events: [
        { date: '2020', title: 'Karabakh : Bayraktar TB2 domine', description: 'L\'Azerbaïdjan neutralise les défenses arméniennes avec des drones turcs — premier avertissement de la révolution drone', type: 'milestone' },
        { date: 'Fév. 2022', title: 'Invasion russe — drones déployés', description: 'Ukraine utilise le Bayraktar TB2 pour détruire des colonnes russes — efficacité initiale limitée par la défense aérienne', type: 'event' },
        { date: 'Oct. 2022', title: 'Shahed-136 frappent les infrastructures', description: 'Russie déploie massivement les drones iraniens contre les centrales électriques ukrainiennes', type: 'warning' },
        { date: '2023', title: 'Guerre des FPV — révolution à 200$', description: 'Les FPV kamikazes ukrainiens rendent les chars vulnérables à 10 km de la ligne de front', type: 'milestone' },
        { date: '2024', title: '2 000 drones perdus/jour — industrialisation', description: 'Pic de consommation : production industrielle obligatoire. Course aux capteurs anti-brouillage et navigation AI', type: 'warning' },
        { date: '2025+', title: 'Replicator Initiative : 1 000+ drones US', description: 'DoD tire les leçons d\'Ukraine — programme de production de masse de drones militaires', type: 'milestone' },
      ],
    },
  },
  '23': {
    kpis: [
      { value: 'Mach 5+', label: 'Vitesse minimum des missiles hypersoniques', sub: 'Le Kinzhal atteint Mach 10. Temps de réaction défensif : <3 minutes.', trend: 'down' },
      { value: '0', label: 'Systèmes antimissile capables d\'intercepter un HGV en 2026', sub: 'THAAD et PAC-3 inefficaces contre les trajectoires HGV. Défi technologique majeur.', trend: 'down' },
      { value: '2022', label: 'Première utilisation opérationnelle — Kinzhal en Ukraine', sub: 'Mars 2022. Cible : dépôt d\'armes souterrain à Ivano-Frankivsk.', trend: 'neutral' },
      { value: '2 000 km', label: 'Portée du DF-17 chinois (HGV)', sub: 'Hypersonic Glide Vehicle. Menace directe sur les bases US au Pacifique.', trend: 'down' },
    ],
    barChart: {
      title: 'Portée des missiles hypersoniques (km)',
      unit: 'km',
      data: [
        { label: 'Avangard (RU)', value: 6000, color: '#ef4444' },
        { label: 'DF-ZF (CN)', value: 3000, color: '#ef4444' },
        { label: 'LRHW Dark Eagle (USA)', value: 2775, color: '#0891b2' },
        { label: 'DF-17 (CN)', value: 2000, color: '#f59e0b' },
        { label: 'Kinzhal (RU)', value: 2000, color: '#f59e0b' },
        { label: 'ARRW (USA)', value: 925, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Course aux hypersoniques',
      events: [
        { date: '2019', title: 'Avangard opérationnel (Russie)', description: 'Premier HGV intercontinental déployé — Mach 20+, trajectoire manœuvrante, invulnérable aux défenses actuelles', type: 'warning' },
        { date: 'Oct. 2021', title: 'Test HGV chinois (fractional orbital)', description: 'Chine teste un HGV sur trajectoire orbitale — surprise totale des services de renseignement US', type: 'warning' },
        { date: 'Mars 2022', title: 'Kinzhal utilisé en Ukraine', description: 'Première utilisation en combat d\'un missile hypersonique — dépôt souterrain à Ivano-Frankivsk', type: 'milestone' },
        { date: '2024', title: 'USA : ARRW en difficultés, LRHW en tests', description: 'Programme ARRW (B-52) revu après échecs — LRHW Dark Eagle en tests avancés pour 2026', type: 'event' },
        { date: '2025', title: 'LRHW : déploiement annoncé 2026', description: 'DoD confirme le premier déploiement opérationnel du Dark Eagle pour fin 2026', type: 'milestone' },
        { date: '2025+', title: 'Course aux contre-mesures', description: 'DARPA lance des programmes de radars hypersoniques et lasers à haute énergie — réponse à 10 ans', type: 'event' },
      ],
    },
  },
  '24': {
    kpis: [
      { value: '5 %', label: 'Objectif PIB défense OTAN 2035', sub: 'Sommet La Haye, 25 juin 2025. Record depuis la Guerre froide.', trend: 'up' },
      { value: '63 Md€', label: 'Carnet de commandes Rheinmetall (2025)', sub: '+36 % en 1 an. Record absolu. 600 chars Leopard commandés.', trend: 'up' },
      { value: '25 Md$', label: 'Budget Golden Dome (Congrès US)', sub: 'Juillet 2025. Défense multicouche du territoire américain.', trend: 'neutral' },
      { value: '500 Md€', label: 'Fonds Spécial Allemagne (Sondervermögen)', sub: 'Bundestag, mars 2025. Défense + infrastructure. Exemption Schuldenbremse.', trend: 'up' },
    ],
    barChart: {
      title: 'Dépenses de défense OTAN — pays sélectionnés (% PIB, 2025)',
      unit: '% PIB',
      data: [
        { label: 'Pologne', value: 4.2, color: '#ef4444' },
        { label: 'Pays Baltes (moy.)', value: 3.5, color: '#ef4444' },
        { label: 'USA', value: 3.4, color: '#0891b2' },
        { label: 'UK', value: 2.5, color: '#6b7280' },
        { label: 'Allemagne', value: 2.1, color: '#f59e0b' },
        { label: 'France', value: 2.0, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — Supercycle de réarmement OTAN',
      events: [
        { date: '2014', title: 'Sommet Newport : objectif 2 % PIB', description: 'Après l\'annexion de la Crimée — OTAN fixe l\'objectif de 2 % du PIB. Peu respecté à l\'époque.', type: 'milestone' },
        { date: 'Fév. 2022', title: 'Invasion Ukraine : choc sécuritaire', description: 'Déclencheur du réarmement massif — l\'Europe réalise sa dépendance au parapluie américain', type: 'warning' },
        { date: 'Mars 2025', title: 'Fonds Spécial allemand 500 Md€', description: 'Bundestag vote l\'exemption à la Schuldenbremse — rupture historique avec la doctrine de frugalité', type: 'milestone' },
        { date: 'Mars 2025', title: 'ReArm Europe — 800 Md€ sur 5 ans', description: 'Commission européenne lance le plan de défense européenne — 150 Md€ de prêts BEI', type: 'milestone' },
        { date: 'Juin 2025', title: 'Sommet La Haye : objectif 5 % PIB', description: 'OTAN relève l\'objectif à 5 % du PIB — pression américaine et menace russe combinées', type: 'milestone' },
        { date: '2028-2032', title: 'Effets industriels attendus', description: 'Les commandes de 2025-2026 produiront des capacités militaires concrètes avec 3-5 ans de délai', type: 'event' },
      ],
    },
  },
  '25': {
    kpis: [
      { value: '800 Md€', label: 'Mobilisation prévue ReArm Europe 2025-2030', sub: 'Commission Européenne, mars 2025. Dont 150 Md€ prêts BEI, reste via États membres.', trend: 'up' },
      { value: '150 Md€', label: 'Prêts BEI dédiés à la défense (SAFE)', sub: 'Instrument nouvellement créé. Première fois que la BEI finance directement la défense.', trend: 'up' },
      { value: '2 ans', label: 'Délai minimum pour observer des effets industriels concrets', sub: 'McKinsey / IISS : ramp-up industriel défense = 3-5 ans pour les systèmes complexes.', trend: 'neutral' },
      { value: '2 %', label: 'Seuil OTAN atteint par les 32 membres en 2025', sub: 'Pour la première fois depuis la création de l\'OTAN. Objectif désormais 5 %.', trend: 'up' },
    ],
    barChart: {
      title: 'Budgets défense europé ens sélectionnés (Md€, 2025)',
      unit: 'Md€',
      data: [
        { label: 'Fonds Spécial ALL', value: 500, color: '#0891b2' },
        { label: 'ReArm EU (SAFE)', value: 150, color: '#059669' },
        { label: 'Pologne (ReArm PL)', value: 58, color: '#ef4444' },
        { label: 'France (LPM)', value: 50, color: '#6b7280' },
        { label: 'UK (MoD)', value: 60, color: '#6b7280' },
        { label: 'EDIP (EU R&D)', value: 1.5, color: '#f59e0b' },
      ],
    },
    timeline: {
      title: 'Chronologie — ReArm Europe',
      events: [
        { date: 'Fév. 2022', title: 'Invasion Ukraine — choc sécuritaire', description: 'Déclencheur : l\'Europe réalise sa dépendance au parapluie américain et sa faiblesse industrielle de défense', type: 'warning' },
        { date: 'Mars 2025', title: 'Fonds Spécial allemand 500 Md€', description: 'Rupture historique : le Bundestag vote l\'exemption à la règle d\'or budgétaire (Schuldenbremse)', type: 'milestone' },
        { date: 'Mars 2025', title: 'ReArm Europe / Plan de Défense EU', description: 'Commission Européenne : 800 Md€ sur 5 ans. Création de l\'instrument SAFE (150 Md€ BEI).', type: 'milestone' },
        { date: 'Juin 2025', title: 'OTAN : 32/32 membres à 2 % PIB', description: 'Première fois depuis la création de l\'OTAN — objectif relevé à 5 % au sommet de La Haye', type: 'milestone' },
        { date: '2026', title: 'Premiers effets EDIP et SAFE', description: 'Premiers prêts BEI débloqués pour les industriels de défense européens', type: 'event' },
        { date: '2029-2032', title: 'Effets capacitaires attendus', description: 'Les commandes de 2025-2026 produiront des capacités militaires concrètes avec 3-5 ans de délai', type: 'event' },
      ],
    },
  },
  '26': {
    kpis: [
      { value: '9', label: 'Opérateurs télécom US compromis par Salt Typhoon', sub: 'AT&T, Verizon, T-Mobile, Lumen, et 5 autres. Confirmé FBI/CISA, octobre 2024.', trend: 'down' },
      { value: 'CALEA', label: 'Systèmes d\'écoute légaux compromis', sub: 'Communications Assistance for Law Enforcement Act. Backdoors légaux = porte d\'entrée chinoise.', trend: 'down' },
      { value: '18 mois', label: 'Durée estimée de la compromission avant détection', sub: '2023-2024. Accès aux communications des hauts responsables américains.', trend: 'down' },
      { value: 'Signal', label: 'Application recommandée par la CISA après Salt Typhoon', sub: 'Volte-face spectaculaire : l\'agence gouvernementale recommande le chiffrement de bout en bout.', trend: 'neutral' },
    ],
    timeline: {
      title: 'Chronologie — Salt Typhoon (APT40)',
      events: [
        { date: '2013', title: 'Snowden révèle PRISM (NSA)', description: 'La NSA surveille massivement les communications mondiales — débat sur les backdoors légaux', type: 'event' },
        { date: '2023', title: 'Salt Typhoon : accès initial', description: 'Exploitation de vulnérabilités Cisco/Juniper non patchées — compromission des systèmes d\'administration', type: 'warning' },
        { date: '2023-2024', title: 'Compromission CALEA — 18 mois non détectés', description: 'La Chine accède aux backdoors légaux d\'écoute — mêmes données que le FBI et la NSA', type: 'warning' },
        { date: 'Oct. 2024', title: 'FBI/CISA révèlent Salt Typhoon', description: '9 opérateurs télécom compromis. Cibles : équipes de campagne Trump et Harris, responsables Département d\'État', type: 'warning' },
        { date: 'Déc. 2024', title: 'CISA recommande Signal', description: 'Volte-face historique : l\'agence gouvernementale recommande le chiffrement de bout en bout', type: 'milestone' },
        { date: '2025', title: 'Débat backdoors relancé', description: 'Salt Typhoon prouve que les backdoors légaux sont dangereux — résolution empirique d\'un débat de 30 ans', type: 'event' },
      ],
    },
  },
  '27': {
    kpis: [
      { value: '1-10 MWe', label: 'Puissance cible d\'un microréacteur militaire DoD', sub: 'Project Pele (DoD + INL). Base de Fort Belvoir, Virginie.', trend: 'neutral' },
      { value: '2027', label: 'Cible déploiement premier microréacteur militaire US', sub: 'Project Pele. Tests INL Idaho réussis en 2024.', trend: 'up' },
      { value: '3', label: 'Pays AUKUS (USA, UK, Australie) — sous-marins nucléaires', sub: 'AUKUS Pillar 1 : Australie recevra 3-5 SSN Virginia class d\'ici 2030-2033.', trend: 'up' },
      { value: '2040', label: 'Horizon SMR civils commerciaux (Rolls-Royce)', sub: 'Rolls-Royce SMR : 470 MWe. Premier réacteur UK cible 2030-2035.', trend: 'neutral' },
    ],
    barChart: {
      title: 'Puissance des réacteurs militaires (MWe)',
      unit: 'MWe',
      data: [
        { label: 'RITM-200 (RU flottant)', value: 55, color: '#ef4444' },
        { label: 'SSN Virginia S9G (naval)', value: 40, color: '#0891b2' },
        { label: 'Project Pele (base avancée)', value: 5, color: '#059669' },
        { label: 'NTP DRACO (spatial)', value: 0.1, color: '#6b7280' },
      ],
    },
    timeline: {
      title: 'Chronologie — SMR militaires et nucléaire naval',
      events: [
        { date: '1954', title: 'USS Nautilus — premier sous-marin nucléaire', description: 'La propulsion nucléaire navale révolutionne la guerre sous-marine — début de l\'ère des SSN', type: 'milestone' },
        { date: '2020', title: 'Akademik Lomonosov opérationnel (Russie)', description: 'Première centrale nucléaire flottante au monde — 55 MWe pour l\'Arctique russe', type: 'milestone' },
        { date: 'Sept. 2021', title: 'AUKUS annoncé', description: 'USA-UK-Australie : transfert de technologie nucléaire navale pour sous-marins australiens', type: 'milestone' },
        { date: '2024', title: 'Project Pele : tests INL Idaho réussis', description: 'Premier microréacteur militaire transportable testé avec succès — déploiement 2027 confirmé', type: 'milestone' },
        { date: '2027', title: 'Premier microréacteur militaire déployé', description: 'Project Pele : base avancée alimentée sans convoi logistique carburant', type: 'milestone' },
        { date: '2030-2033', title: 'Premiers SSN australiens (AUKUS)', description: 'Australie reçoit 3-5 sous-marins nucléaires Virginia class — pivot Indo-Pacifique majeur', type: 'event' },
      ],
    },
  },
};

export function getArticleChart(articleId: string): ArticleChart | null {
  return charts[articleId] ?? null;
}
