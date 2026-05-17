// All topic trees extracted from levelyn-frontend/public/content/upsc/ and upsc-optionals/
// Structure: sections = ## headings, topics = ### headings (or the ## itself if no ### exist)

const TOPIC_TREES = {

  // ── HISTORY (GS-1) ────────────────────────────────────────────────────────
  history: { sections: [
    { id:'ancient', label:'Ancient History', topics:[
      { id:'prehistoric',     name:'Pre-Historic India' },
      { id:'ivc',             name:'Harappan Culture / IVC' },
      { id:'vedic',           name:'Vedic Culture (1500–600 BCE)' },
      { id:'philosophy',      name:'Philosophical Thoughts' },
      { id:'magadha',         name:'Magadha and Invasions' },
      { id:'maurya',          name:'Mauryan Empire (321–185 BCE)' },
      { id:'post-maurya',     name:'Post-Mauryan Period' },
      { id:'sangam',          name:'Sangam Age (300 BC–300 AD)' },
      { id:'gupta',           name:'Gupta Empire (275–600 AD)' },
      { id:'harsha',          name:'Harshavardhana (606–647 AD)' },
      { id:'south-kingdoms',  name:'South Indian Kingdoms' },
      { id:'temple-arch',     name:'Temple Architecture' },
    ]},
    { id:'medieval', label:'Medieval History', topics:[
      { id:'early-medieval',  name:'Early Medieval India' },
      { id:'delhi-sultanate', name:'Delhi Sultanate (1206–1526)' },
      { id:'spiritual-mvmt',  name:'Religious / Spiritual Movements' },
      { id:'other-kingdoms',  name:'Other Kingdoms' },
      { id:'mughal',          name:'Mughal Empire (1526–1857)' },
      { id:'marathas',        name:'Marathas (1674–1818)' },
      { id:'arch-modern',     name:'Architecture in Medieval/Modern India' },
    ]},
    { id:'modern', label:'Modern History', topics:[
      { id:'later-mughals',   name:'Later Mughals' },
      { id:'europeans',       name:'Coming of Europeans' },
      { id:'british-conquest',name:'British Conquest in India' },
      { id:'british-rule',    name:'India under the British Rule' },
      { id:'resentments',     name:'Rising Resentments against the Rule' },
      { id:'reform-mvmts',    name:'Reform Movements' },
      { id:'struggle-begins', name:'The Struggle Begins' },
      { id:'nat-mvmt-1905',   name:'National Movement (1905–1918)' },
      { id:'mass-nationalism',name:'Era of Mass Nationalism (1919–1939)' },
      { id:'freedom-partition',name:'Towards Freedom and Partition (1939–1947)' },
    ]},
    { id:'postindependent', label:'Post-Independent India', topics:[
      { id:'nehru-era',       name:'Nehruvian Era' },
      { id:'shastri-era',     name:'Lal Bahadur Shastri Era (1964)' },
      { id:'indira-era',      name:'Indira Gandhi Era' },
      { id:'post-indira',     name:'Post-Indira Governments' },
      { id:'movements-reforms',name:'Movements and Reforms' },
    ]},
    { id:'artculture', label:'Art and Culture', topics:[
      { id:'paintings',       name:'Paintings' },
      { id:'handicrafts',     name:'Handicrafts' },
      { id:'music',           name:'Music' },
      { id:'classical-dance', name:'Classical Dance Forms' },
      { id:'folk-dance',      name:'Folk Dance Forms' },
      { id:'theatres',        name:'Indian Theatres' },
      { id:'puppetry',        name:'Puppetry' },
      { id:'martial-arts',    name:'Martial Arts' },
      { id:'misc-culture',    name:'Miscellaneous Culture' },
    ]},
    { id:'worldhistory', label:'World History', topics:[
      { id:'renaissance',     name:'The Renaissance and Age of Exploration' },
      { id:'american-rev',    name:'American Revolution (1775–1783)' },
      { id:'french-rev',      name:'French Revolution (1789–1799)' },
      { id:'industrial-rev',  name:'Industrial Revolution (1760–1840)' },
      { id:'colonization',    name:'Colonization and Imperialism' },
      { id:'unification',     name:'Unification of Italy and Germany' },
      { id:'ww1',             name:'World War I (1914–1918)' },
      { id:'russian-rev',     name:'Russian Revolution (1917)' },
      { id:'fascism-nazism',  name:'Rise of Fascism and Nazism' },
      { id:'ww2',             name:'World War II (1939–1945)' },
      { id:'decolonization',  name:'Decolonization (1945–1990s)' },
      { id:'cold-war',        name:'Cold War (1947–1991)' },
      { id:'pol-philosophies',name:'Political Philosophies' },
    ]},
  ]},

  // ── POLITY (GS-2) ─────────────────────────────────────────────────────────
  polity: { sections: [
    { id:'historical-bg', label:'Historical Background', topics:[
      { id:'historical-bg', name:'Historical Background' },
    ]},
    { id:'constitution-intro', label:'Indian Constitution', topics:[
      { id:'constitution-intro', name:'Indian Constitution — Overview' },
    ]},
    { id:'preamble', label:'Preamble', topics:[
      { id:'preamble', name:'The Preamble' },
    ]},
    { id:'union-territory', label:'Union and Territory', topics:[
      { id:'union-territory', name:'Union and its Territory (Part I)' },
    ]},
    { id:'citizenship', label:'Citizenship', topics:[
      { id:'citizenship', name:'Citizenship (Part II)' },
    ]},
    { id:'fundamental-rights', label:'Fundamental Rights (Part III)', topics:[
      { id:'fr-intro',          name:'Introduction to Fundamental Rights' },
      { id:'fr-equality',       name:'Right to Equality (Art. 14–18)' },
      { id:'fr-freedom',        name:'Right to Freedom (Art. 19–22)' },
      { id:'fr-exploitation',   name:'Right Against Exploitation (Art. 23–24)' },
      { id:'fr-religion',       name:'Right to Freedom of Religion (Art. 25–28)' },
      { id:'fr-cultural-edu',   name:'Cultural and Educational Rights (Art. 29–30)' },
      { id:'fr-remedies',       name:'Right to Constitutional Remedies' },
    ]},
    { id:'dpsp', label:'DPSP', topics:[
      { id:'dpsp', name:'Directive Principles of State Policy (Part IV)' },
    ]},
    { id:'fundamental-duties', label:'Fundamental Duties', topics:[
      { id:'fundamental-duties', name:'Fundamental Duties (Part IVA)' },
    ]},
    { id:'amendment', label:'Amendment', topics:[
      { id:'amendment', name:'Amendment of the Constitution (Art. 368)' },
    ]},
    { id:'basic-structure', label:'Basic Structure', topics:[
      { id:'basic-structure', name:'Basic Structure of the Constitution' },
    ]},
    { id:'union-executive', label:'Union Executive (Part V)', topics:[
      { id:'president',   name:'President (Art. 52–62)' },
      { id:'vp',          name:'Vice-President (Art. 63–71)' },
      { id:'pm',          name:'Prime Minister' },
      { id:'com',         name:'Council of Ministers' },
      { id:'ag',          name:'Attorney General of India (Art. 76)' },
      { id:'cag',         name:'Comptroller and Auditor General (Art. 148–151)' },
    ]},
    { id:'parliament', label:'Parliament (Part V, Art. 79–122)', topics:[
      { id:'parl-org',        name:'Organisation and Composition' },
      { id:'parl-membership', name:'Membership and Presiding Officers' },
      { id:'parl-sessions',   name:'Leaders, Sessions and Proceedings' },
      { id:'parl-bills',      name:'Devices, Motions and Bills' },
      { id:'parl-budget',     name:'Budget and Funds' },
      { id:'parl-functions',  name:'Functions, Privileges and Committees' },
    ]},
    { id:'state-executive', label:'State Executive (Part VI)', topics:[
      { id:'governor',    name:'Governor (Art. 153–167)' },
      { id:'cm-state-com',name:'Chief Minister and State Council of Ministers' },
    ]},
    { id:'state-legislature', label:'State Legislature', topics:[
      { id:'state-legislature', name:'State Legislature (Part VI, Art. 168–212)' },
    ]},
    { id:'system-of-govt', label:'System of Government', topics:[
      { id:'parl-federal',    name:'Parliamentary and Federal System' },
      { id:'centre-state',    name:'Centre-State Relations' },
      { id:'inter-state',     name:'Inter-State Relations' },
      { id:'emergency',       name:'Emergency Provisions (Art. 352–360)' },
    ]},
    { id:'judiciary', label:'Judiciary', topics:[
      { id:'supreme-court', name:'Supreme Court (Art. 124–147)' },
      { id:'high-court',    name:'High Court (Art. 214–231)' },
      { id:'other-courts',  name:'Other Courts and Tribunals' },
    ]},
    { id:'elections', label:'Elections', topics:[
      { id:'elections', name:'Elections (Art. 324–329, Part XV)' },
    ]},
    { id:'local-governance', label:'Local Governance (Part IX, IXA)', topics:[
      { id:'panchayati-raj-evo', name:'Evolution of Panchayati Raj' },
      { id:'panchayati-raj',     name:'Panchayati Raj (Art. 243)' },
      { id:'municipalities',     name:'Municipalities (Art. 243P–243ZG)' },
      { id:'cooperatives',       name:'Co-operatives' },
    ]},
    { id:'ut', label:'Union Territories', topics:[
      { id:'ut', name:'Union Territories (Art. 239–241)' },
    ]},
    { id:'scheduled-tribal', label:'Scheduled & Tribal Areas', topics:[
      { id:'scheduled-tribal', name:'Scheduled and Tribal Areas (Art. 244)' },
    ]},
    { id:'constitutional-bodies', label:'Constitutional Bodies', topics:[
      { id:'constitutional-bodies', name:'Constitutional Bodies' },
    ]},
    { id:'non-constitutional-bodies', label:'Non-Constitutional Bodies', topics:[
      { id:'nhrc',    name:'National Human Rights Commission (NHRC)' },
      { id:'rti-cic', name:'Central Information Commission and RTI' },
      { id:'cbi',     name:'Central Bureau of Investigation (CBI)' },
      { id:'cvc',     name:'Central Vigilance Commission (CVC)' },
      { id:'lokpal',  name:'Lokpal and Lokayukta' },
    ]},
  ]},

  // ── ECONOMY (GS-3) ────────────────────────────────────────────────────────
  economy: { sections: [
    { id:'intro', label:'Introduction', topics:[
      { id:'intro', name:'Introduction to Economy' },
    ]},
    { id:'national-income', label:'National Income', topics:[
      { id:'national-income', name:'National Income Accounting' },
    ]},
    { id:'microeconomics', label:'Microeconomics', topics:[
      { id:'microeconomics', name:'Microeconomics' },
    ]},
    { id:'growth-dev', label:'Growth and Development', topics:[
      { id:'growth-dev', name:'Growth and Development' },
    ]},
    { id:'planning', label:'Economic Planning', topics:[
      { id:'planning', name:'Economic Planning' },
    ]},
    { id:'lpg', label:'LPG Reforms', topics:[
      { id:'lpg', name:'LPG Reforms' },
    ]},
    { id:'inflation', label:'Inflation', topics:[
      { id:'inflation', name:'Inflation' },
    ]},
    { id:'monetary-policy', label:'Monetary Policy', topics:[
      { id:'monetary-policy', name:'Monetary Policy' },
    ]},
    { id:'financial-market', label:'Financial Market', topics:[
      { id:'fin-intro',       name:'Financial Market — Introduction' },
      { id:'money-capital',   name:'Money and Capital Markets' },
      { id:'commodity-market',name:'Commodity Market' },
      { id:'sebi',            name:'Regulators — SEBI' },
      { id:'pension',         name:'Pension Schemes' },
      { id:'insurance',       name:'Insurance Schemes' },
    ]},
    { id:'banking', label:'Banking Sector', topics:[
      { id:'rbi-history',   name:'History and RBI' },
      { id:'bank-structure',name:'Structure of Banks' },
      { id:'dfi',           name:'Development Finance Institutions' },
      { id:'nbfc',          name:'NBFCs and Microfinance' },
      { id:'npa',           name:'NPAs and Resolution' },
      { id:'basel',         name:'Basel Norms' },
      { id:'payment-sys',   name:'Payment Systems' },
      { id:'fin-inclusion', name:'Financial Inclusion' },
    ]},
    { id:'public-finance', label:'Public Finance', topics:[
      { id:'public-finance', name:'Public Finance' },
    ]},
    { id:'taxation', label:'Taxation', topics:[
      { id:'taxation', name:'Taxation' },
    ]},
    { id:'agriculture', label:'Agriculture', topics:[
      { id:'farming-types',   name:'Types of Farming' },
      { id:'land-reforms',    name:'Land Reforms' },
      { id:'agri-input',      name:'Agricultural Input' },
      { id:'farming-practices',name:'Farming Practices' },
      { id:'storage-transport',name:'Storage and Transport' },
      { id:'agri-marketing',  name:'Agricultural Marketing' },
      { id:'food-processing', name:'Food Processing' },
      { id:'allied-sectors',  name:'Allied Sectors' },
      { id:'climate-trade',   name:'Climate and Trade' },
    ]},
    { id:'industries', label:'Industries and Services', topics:[
      { id:'industrial-policy',name:'Industrial Policies' },
      { id:'msme',             name:'MSME and Schemes' },
      { id:'entrepreneurship', name:'Entrepreneurship' },
      { id:'ipr',              name:'Intellectual Property Rights' },
      { id:'ease-biz',         name:'Ease of Doing Business' },
    ]},
    { id:'investment-models', label:'Investment Models', topics:[
      { id:'investment-models', name:'Investment Models' },
    ]},
    { id:'infrastructure', label:'Infrastructure', topics:[
      { id:'infra-models',    name:'Models and Zones' },
      { id:'logistics',       name:'Logistics and Transport' },
      { id:'rural-urban-dev', name:'Rural and Urban Development' },
      { id:'energy-sector',   name:'Energy Sector' },
    ]},
    { id:'external-sector', label:'External Sector', topics:[
      { id:'external-sector', name:'External Sector' },
    ]},
    { id:'intl-econ-orgs', label:'International Economic Organisations', topics:[
      { id:'intl-econ-orgs', name:'International Economic Organisations' },
    ]},
  ]},

  // ── GEOGRAPHY (GS-1) ──────────────────────────────────────────────────────
  geography: { sections: [
    { id:'geomorphology', label:'Geomorphology', topics:[
      { id:'continents-oceans',  name:'Origins of Continents and Oceans' },
      { id:'interior-earth',     name:'Interior of the Earth' },
      { id:'geomorphic-process', name:'Geomorphic Processes' },
      { id:'landforms',          name:'Landforms and their Evolution' },
      { id:'rocks',              name:'Rocks' },
      { id:'lakes-rivers',       name:'Lakes and Rivers' },
      { id:'plateau',            name:'Plateau' },
    ]},
    { id:'climatology', label:'Climatology', topics:[
      { id:'atmosphere',    name:'Atmosphere — Composition and Structure' },
      { id:'solar-rad',     name:'Solar Radiation' },
      { id:'temperature',   name:'Temperature' },
      { id:'atm-pressure',  name:'Atmospheric Pressure' },
      { id:'air-masses',    name:'Air Masses' },
      { id:'fronts',        name:'Fronts' },
      { id:'precipitation', name:'Precipitation' },
      { id:'world-climate', name:'World Climate' },
    ]},
    { id:'oceanography', label:'Oceanography', topics:[
      { id:'hydro-cycle',   name:'Hydrological Cycle' },
      { id:'ocean-relief',  name:'Ocean Relief Features' },
      { id:'ocean-temp',    name:'Temperature of Ocean Waters' },
      { id:'salinity',      name:'Salinity of Ocean Waters' },
      { id:'ocean-mvmt',    name:'Movements of Ocean Water' },
      { id:'el-nino',       name:'El-Niño, La-Niña and ENSO' },
    ]},
    { id:'world-geography', label:'World Geography', topics:[
      { id:'universe',      name:'Universe and its Origin' },
      { id:'galaxies',      name:'Galaxies and Solar System' },
      { id:'origin-earth',  name:'Origin of the Earth' },
      { id:'evolution-earth',name:'Evolution of the Earth' },
      { id:'planets',       name:'Planets' },
      { id:'earth-motions', name:'Motions of the Earth' },
    ]},
    { id:'indian-geography', label:'Indian Geography', topics:[
      { id:'india-location',  name:'India — Location' },
      { id:'rock-system',     name:'Indian Rock System' },
      { id:'tectonic-plate',  name:'Indian Tectonic Plate' },
      { id:'physiography',    name:'Structure and Physiography' },
      { id:'drainage',        name:'Drainage System of India' },
      { id:'india-climate',   name:'Climate of India' },
      { id:'vegetation',      name:'Natural Vegetation of India' },
      { id:'soils',           name:'Soils' },
    ]},
    { id:'human-geography', label:'Human Geography', topics:[
      { id:'hg-agriculture',  name:'Agriculture (Human Geography)' },
      { id:'hg-resources',    name:'Resources' },
      { id:'hg-industries',   name:'Industries' },
      { id:'hg-energy',       name:'Energy' },
    ]},
  ]},

  // ── ETHICS (GS-4) ─────────────────────────────────────────────────────────
  ethics: { sections: [
    { id:'ethics-human-interface', label:'Ethics and Human Interface', topics:[
      { id:'core-concepts',       name:'Core Concepts: Ethics and Related Terms' },
      { id:'essence-ethics',      name:'Essence of Ethics in Human Actions' },
      { id:'dimensions-ethics',   name:'Dimensions / Types of Ethics' },
      { id:'determinants',        name:'Determinants of Ethics in Human Actions' },
      { id:'consequences',        name:'Consequences of Ethics' },
      { id:'private-public',      name:'Ethics in Private and Public Relationships' },
      { id:'human-values',        name:'Human Values: Lessons from Leaders and Thinkers' },
      { id:'family-society-edu',  name:'Role of Family, Society and Educational Institutions' },
      { id:'key-distinctions',    name:'Key Distinctions (UPSC Favorites)' },
      { id:'contemporary-world',  name:'Ethics in the Contemporary World' },
    ]},
    { id:'attitude', label:'Attitude', topics:[
      { id:'attitude-def',        name:'What is Attitude — Definition and Nature' },
      { id:'attitude-structure',  name:'Structure of Attitude — CAB Model' },
      { id:'attitude-types',      name:'Types of Attitude' },
      { id:'attitude-functions',  name:'Functions of Attitude' },
      { id:'attitude-formation',  name:'Formation of Attitude' },
      { id:'attitude-behaviour',  name:'Attitude, Thought and Behaviour' },
      { id:'moral-pol-attitude',  name:'Moral and Political Attitudes' },
      { id:'social-influence',    name:'Social Influence and Persuasion' },
      { id:'attitude-change',     name:'Attitude Change — Theories and Methods' },
    ]},
    { id:'aptitude-foundational', label:'Aptitude and Foundational Values', topics:[
      { id:'aptitude-def',        name:'Aptitude — Definition and Types' },
      { id:'foundational-values', name:'Foundational Values for Civil Service' },
      { id:'integrity',           name:'Integrity — The Cornerstone Value' },
      { id:'impartiality',        name:'Impartiality and Non-Partisanship' },
      { id:'objectivity',         name:'Objectivity' },
      { id:'dedication',          name:'Dedication to Public Service' },
      { id:'empathy-tolerance',   name:'Empathy, Tolerance and Compassion' },
      { id:'voice-conscience',    name:'Voice of Conscience and Crisis of Conscience' },
      { id:'ethical-competence',  name:'Ethical Competence' },
      { id:'aptitude-distinctions',name:'Key Distinctions (Aptitude)' },
    ]},
    { id:'emotional-intelligence', label:'Emotional Intelligence', topics:[
      { id:'emotions',            name:'Understanding Emotions — The Foundation' },
      { id:'intelligence-types',  name:'Intelligence — Types and Theories' },
      { id:'what-is-ei',          name:'What is Emotional Intelligence' },
      { id:'ei-components',       name:"Components of EI — Goleman's Framework" },
      { id:'developing-ei',       name:'Developing EI — Can it be Learned?' },
      { id:'ei-civil-services',   name:'Relevance of EI in Civil Services' },
      { id:'ei-admin',            name:'EI in Administration and Governance' },
      { id:'ei-contemporary',     name:'EI in Contemporary Challenges' },
    ]},
    { id:'moral-thinkers', label:'Moral Thinkers and Philosophers', topics:[
      { id:'western-philosophy',  name:'Western Philosophical Traditions' },
      { id:'ancient-indian-phil', name:'Ancient Indian Philosophical Traditions' },
      { id:'modern-indian-leaders',name:'Modern Indian Leaders and Thinkers' },
      { id:'global-leaders',      name:'Global Leaders and Thinkers' },
      { id:'master-quote-table',  name:'Master Quote Reference Table' },
    ]},
    { id:'public-civil-service', label:'Public / Civil Service Values', topics:[
      { id:'public-admin-ethics', name:'Public Administration and Public Service Ethics' },
      { id:'governance-ethics',   name:'Governance, Good Governance and Ethical Governance' },
      { id:'ethical-concerns',    name:'Status and Problems — Ethical Concerns and Dilemmas' },
      { id:'ethical-guidance',    name:'Sources of Ethical Guidance' },
      { id:'accountability',      name:'Accountability and Ethical Governance' },
      { id:'strengthening-values',name:'Strengthening Ethical and Moral Values in Governance' },
      { id:'ethics-in-ir',        name:'Ethical Issues in International Relations' },
      { id:'corporate-governance',name:'Corporate Governance' },
    ]},
    { id:'probity', label:'Probity in Governance', topics:[
      { id:'probity-concept',     name:'Concept of Public Service and Probity' },
      { id:'probity-philosophy',  name:'Philosophical Basis of Governance and Probity' },
      { id:'transparency',        name:'Information Sharing and Transparency in Government' },
      { id:'codes-of-ethics',     name:'Codes of Ethics, Codes of Conduct and Citizen\'s Charters' },
      { id:'work-culture',        name:'Work Culture and Quality of Service Delivery' },
      { id:'public-funds',        name:'Utilization of Public Funds' },
      { id:'corruption',          name:'Challenges of Corruption' },
    ]},
    { id:'case-studies', label:'Guide to Case Studies', topics:[
      { id:'universal-framework', name:'Universal Framework — Answering Any Case Study' },
      { id:'identifying-dilemmas',name:'Identifying Ethical Dilemmas' },
      { id:'stakeholder-analysis',name:'Stakeholder Analysis' },
      { id:'generating-options',  name:'Generating Options — 3-Option Framework' },
      { id:'evaluating-options',  name:'Evaluating Options — Merits and Demerits' },
      { id:'writing-conclusion',  name:'Writing the Conclusion' },
      { id:'pyq-2025',            name:'PYQ Analysis — 2025 Case Studies' },
      { id:'pyq-2024',            name:'PYQ Analysis — 2024 Case Studies' },
      { id:'case-vocabulary',     name:'Quick Reference — Case Study Vocabulary' },
    ]},
  ]},

  // ── ENVIRONMENT (GS-3) ────────────────────────────────────────────────────
  environment: { sections: [
    { id:'basic-concepts', label:'Basic Concepts of Ecosystem', topics:[
      { id:'core-adaptations',    name:'Core Concepts and Adaptations' },
      { id:'species-interactions',name:'Species Interactions' },
      { id:'eco-components',      name:'Components of Ecosystem' },
      { id:'nutrient-cycling',    name:'Nutrient Cycling' },
      { id:'eco-succession',      name:'Ecological Succession' },
      { id:'eco-pyqs',            name:'PYQs and News (Basic Concepts)' },
    ]},
    { id:'ecosystems', label:'Ecosystems', topics:[
      { id:'eco-intro',           name:'Introduction to Ecosystems' },
      { id:'forest-ecosystem',    name:'Forest Ecosystem' },
      { id:'desertification',     name:'Desertification and Land Degradation' },
      { id:'aquatic-ecosystem',   name:'Aquatic Ecosystem' },
      { id:'mangrove',            name:'Mangrove Ecosystem' },
      { id:'wetland',             name:'Wetland Ecosystem' },
      { id:'coral',               name:'Coral Ecosystem' },
      { id:'coastal-zone',        name:'Coastal Zone Management' },
    ]},
    { id:'biodiversity', label:'Biodiversity', topics:[
      { id:'bio-measurement',     name:'Measurement and Types of Diversity' },
      { id:'biogeographic-zones', name:'Biogeographic Zones of India' },
      { id:'bio-hotspots',        name:'Biodiversity Hotspots and Conservation' },
      { id:'protected-areas',     name:'Protected Areas' },
      { id:'biosphere-reserve',   name:'Biosphere Reserve' },
      { id:'conservation-measures',name:'Measures for Conservation of Biodiversity' },
      { id:'species-projects',    name:'Projects to Save Threatened Species' },
      { id:'bio-pyqs',            name:'PYQs and Miscellaneous (Biodiversity)' },
    ]},
    { id:'pollution', label:'Pollution and Control', topics:[
      { id:'pollution-overview',  name:'Overview of Pollution' },
      { id:'air-pollution',       name:'Air Pollution' },
      { id:'noise-pollution',     name:'Noise Pollution' },
      { id:'water-pollution',     name:'Water Pollution' },
      { id:'waste-management',    name:'Waste Management' },
      { id:'pollution-pyqs',      name:'Miscellaneous and PYQs (Pollution)' },
    ]},
    { id:'climate-change', label:'Climate Change', topics:[
      { id:'cc-core',             name:'Core Concepts of Climate Change' },
      { id:'mitigation',          name:'Mitigation Strategies' },
      { id:'india-cc-policies',   name:'Indian Policies on Climate Change' },
      { id:'global-conventions',  name:'Global Conventions on Climate' },
      { id:'cc-pyqs',             name:'PYQs and News (Climate Change)' },
    ]},
    { id:'eia', label:'EIA', topics:[
      { id:'eia', name:'Environment Impact Assessment (EIA)' },
    ]},
    { id:'indian-institutions', label:'Indian Institutions', topics:[
      { id:'indian-institutions', name:'Indian Environmental Institutions' },
    ]},
    { id:'env-conventions', label:'Environment Conventions', topics:[
      { id:'env-conventions', name:'Environment Conventions' },
    ]},
  ]},

  // ── SCIENCE & TECHNOLOGY (GS-3) ───────────────────────────────────────────
  science: { sections: [
    { id:'space-tech', label:'Space Technology', topics:[
      { id:'space-india',   name:'Space Programmes in India' },
      { id:'orbits',        name:'Orbits' },
      { id:'rockets',       name:'Rockets' },
      { id:'satellites',    name:'Satellite System' },
      { id:'telescopes',    name:'Telescopes' },
      { id:'space-basics',  name:'Space Basics' },
    ]},
    { id:'energy-st', label:'Energy', topics:[
      { id:'energy-st', name:'Energy Technology' },
    ]},
    { id:'nuclear', label:'Nuclear Technology', topics:[
      { id:'nuclear', name:'Nuclear Technology' },
    ]},
    { id:'defence', label:'Defence Technology', topics:[
      { id:'defence', name:'Defence Technology' },
    ]},
    { id:'it', label:'Information Technology', topics:[
      { id:'it', name:'Information Technology' },
    ]},
    { id:'frontier-tech', label:'Frontier Technologies', topics:[
      { id:'frontier-tech', name:'Frontier Technologies (AI, Blockchain, etc.)' },
    ]},
    { id:'biology', label:'Biology', topics:[
      { id:'bio-intro',       name:'Intro to Biology' },
      { id:'biotechnology',   name:'Biotechnology' },
      { id:'nutrients',       name:'Nutrients' },
      { id:'blood',           name:'Blood' },
      { id:'plants',          name:'Plants' },
      { id:'immunity',        name:'Immunity' },
      { id:'diseases',        name:'Diseases' },
    ]},
    { id:'sci-misc', label:'Miscellaneous', topics:[
      { id:'sci-misc', name:'Science and Technology — Miscellaneous' },
    ]},
  ]},

  // ── SOCIETY & SOCIAL JUSTICE (GS-1/2) ────────────────────────────────────
  society: { sections: [
    { id:'salient-features', label:'Salient Features of Indian Society', topics:[
      { id:'social-structures', name:'Social Structures' },
      { id:'diversity-unity',   name:'Diversity and Unity' },
    ]},
    { id:'communalism', label:'Communalism', topics:[
      { id:'communalism', name:'Communalism' },
    ]},
    { id:'regionalism', label:'Regionalism', topics:[
      { id:'regionalism', name:'Regionalism' },
    ]},
    { id:'secularism', label:'Secularism', topics:[
      { id:'secularism', name:'Secularism' },
    ]},
    { id:'urbanisation', label:'Urbanisation', topics:[
      { id:'urbanisation', name:'Urbanisation' },
    ]},
    { id:'globalisation', label:'Impact of Globalisation', topics:[
      { id:'globalisation', name:'Impact of Globalisation on Indian Society' },
    ]},
    { id:'population', label:'Population and Associated Issues', topics:[
      { id:'demography',          name:'Demography and Population Growth' },
      { id:'demographic-profile', name:'India\'s Demographic Profile' },
      { id:'demographic-dividend',name:'Demographic Transition and Dividend' },
      { id:'literacy-employment', name:'Literacy and Employment' },
      { id:'population-issues',   name:'Population Issues and Policies' },
    ]},
    { id:'migration', label:'Migration', topics:[
      { id:'migration', name:'Migration' },
    ]},
    { id:'poverty-hunger', label:'Poverty, Hunger and Food', topics:[
      { id:'poverty',          name:'Poverty' },
      { id:'hunger-food-sec',  name:'Hunger and Food Security' },
    ]},
    { id:'hrd', label:'Human Resources Development', topics:[
      { id:'hrd', name:'Human Resources Development' },
    ]},
    { id:'health', label:'Health Sector', topics:[
      { id:'health', name:'Health Sector' },
    ]},
    { id:'education', label:'Education Sector', topics:[
      { id:'education', name:'Education Sector' },
    ]},
    { id:'women', label:'Role of Women', topics:[
      { id:'women-profile',     name:'Profile and Social Structures (Women)' },
      { id:'women-movements',   name:'Women\'s Movements' },
      { id:'women-legal',       name:'Constitutional and Legal Framework (Women)' },
      { id:'women-schemes',     name:'Government Schemes and Key Issues (Women)' },
    ]},
    { id:'welfare-schemes', label:'Welfare Schemes for Vulnerable Sections', topics:[
      { id:'welfare-overview',  name:'Overview of Welfare Schemes' },
      { id:'welfare-children',  name:'Children' },
      { id:'welfare-sc',        name:'Scheduled Castes' },
      { id:'welfare-st',        name:'Scheduled Tribes' },
      { id:'welfare-obc',       name:'Other Backward Classes' },
      { id:'welfare-senior',    name:'Senior Citizens / Aged' },
      { id:'welfare-disabled',  name:'Disabled Persons' },
      { id:'welfare-minorities',name:'Minorities' },
      { id:'welfare-lgbt',      name:'LGBT Community' },
    ]},
  ]},

  // ── GOVERNANCE (GS-2) ────────────────────────────────────────────────────
  governance: { sections: [
    { id:'govt-policies', label:'Government Policies and Interventions', topics:[
      { id:'gatishakti',      name:'PM GatiShakti and Multimodal Connectivity' },
      { id:'dbt',             name:'Direct Benefit Transfer' },
      { id:'css',             name:'Centrally Sponsored Schemes' },
      { id:'lpg-response',    name:'India\'s Response to LPG Reforms' },
    ]},
    { id:'dev-civil-society', label:'Development Processes and Civil Society', topics:[
      { id:'shgs',            name:'Self-Help Groups — Microfinance and Women Empowerment' },
      { id:'ngos',            name:'NGOs in Development — Role, Regulation, FCRA' },
    ]},
    { id:'transparency', label:'Transparency, Accountability and E-Governance', topics:[
      { id:'rti',             name:'Right to Information Act' },
      { id:'citizens-charter',name:'Citizen\'s Charter' },
      { id:'e-governance',    name:'E-Governance — Models, Achievements, Limitations' },
      { id:'whistleblower',   name:'Whistle-Blower Protection' },
    ]},
    { id:'civil-services', label:'Role of Civil Services in Democracy', topics:[
      { id:'civil-serv-role', name:'Civil Services — Constitutional Role and Challenges' },
      { id:'civil-serv-reforms',name:'Civil Services Reforms' },
      { id:'civil-society',   name:'Civil Society — Anti-State or Non-State?' },
    ]},
    { id:'institutions', label:'Institutional Frameworks', topics:[
      { id:'niti-aayog',      name:'NITI Aayog — From Planning to Transforming' },
      { id:'lokpal-gov',      name:'Lokpal — The Anti-Corruption Ombudsman' },
      { id:'nhrc-gov',        name:'NHRC and Human Rights Architecture' },
      { id:'participatory',   name:'Participatory Governance and Citizens' },
    ]},
  ]},

  // ── DISASTER MANAGEMENT (GS-3) ────────────────────────────────────────────
  disaster: { sections: [
    { id:'types-disasters', label:'Types of Disasters', topics:[
      { id:'hazard-profile',  name:'Natural Disasters — India\'s Hazard Profile' },
      { id:'earthquakes',     name:'Earthquakes — India\'s Seismic Vulnerability' },
      { id:'floods',          name:'Floods and Urban Flooding' },
      { id:'cyclones',        name:'Cyclones — India\'s Success Story' },
      { id:'droughts',        name:'Droughts — Slow-Onset Disaster' },
      { id:'landslides',      name:'Landslides and Cloudbursts' },
      { id:'dam-failures',    name:'Dam Failures' },
      { id:'coastal-erosion', name:'Coastal Erosion' },
      { id:'manmade-disasters',name:'Man-Made Disasters (Industrial, Chemical, Bio, Nuclear)' },
    ]},
    { id:'dm-cycle', label:'Disaster Management Cycle', topics:[
      { id:'four-phase',      name:'The Four-Phase Cycle' },
      { id:'resilience',      name:'Disaster Resilience — The New Paradigm' },
      { id:'india-shift',     name:'India\'s Shift from Reactive to Proactive' },
    ]},
    { id:'institutions-dm', label:'Institutional Framework', topics:[
      { id:'ndma',            name:'NDMA — Apex Body' },
      { id:'ndrf',            name:'NDRF — Specialized Response Force' },
      { id:'dm-amendment',    name:'DM Amendment Act 2024 — New Architecture' },
      { id:'armed-tech',      name:'Role of Armed Forces and Technology' },
    ]},
    { id:'cbdrr', label:'Community-Based Disaster Risk Reduction', topics:[
      { id:'community-first', name:'Why Communities Are the First Responders' },
      { id:'aapda-mitra',     name:'Aapda Mitra — India\'s Community Volunteer Program' },
      { id:'odisha-model',    name:'The Odisha Model' },
      { id:'ndma-cbdrr',      name:'NDMA CBDRR Guidelines 2024' },
    ]},
    { id:'climate-disaster', label:'Climate Change and Disaster Risk', topics:[
      { id:'climate-nexus',   name:'The Climate-Disaster Nexus' },
      { id:'heat-action',     name:'Heat Action Plans — India\'s Emerging Response' },
    ]},
    { id:'intl-frameworks', label:'International Frameworks', topics:[
      { id:'sendai',          name:'Sendai Framework (2015–2030)' },
      { id:'hyogo',           name:'Hyogo Framework for Action (2005–2015)' },
      { id:'sendai-hyogo',    name:'Sendai vs Hyogo — Key Differences' },
      { id:'undrr',           name:'UNDRR and India' },
    ]},
    { id:'ndm-policy', label:'National DM Policy and Act 2005', topics:[
      { id:'dm-act-2005',     name:'Disaster Management Act, 2005 — Architecture' },
    ]},
  ]},

  // ── INTERNAL SECURITY (GS-3) ──────────────────────────────────────────────
  security: { sections: [
    { id:'development-extremism', label:'Development and Extremism', topics:[
      { id:'lwe',             name:'Left Wing Extremism — Roots and Nature' },
      { id:'dev-extremism',   name:'Development-Extremism Nexus' },
      { id:'lwe-response',    name:'Government Response to LWE' },
      { id:'ne-insurgency',   name:'North-East Insurgency — Nature and Causes' },
      { id:'peace-accords',   name:'Peace Accords in North-East India' },
    ]},
    { id:'external-actors', label:'External State and Non-State Actors', topics:[
      { id:'terrorism-india', name:'Terrorism in India — Nature and Manifestations' },
      { id:'pakistan-actor',  name:'Pakistan as External State Actor' },
      { id:'china-actor',     name:'China as External State Actor' },
      { id:'narco-terrorism', name:'Narco-Terrorism' },
      { id:'radicalization',  name:'Radicalization and Online Extremism' },
    ]},
    { id:'cyber-security', label:'Communication Networks and Cyber Security', topics:[
      { id:'social-media-sec',name:'Social Media and Internal Security' },
      { id:'cyber-basics',    name:'Basics of Cyber Security' },
      { id:'cyber-arch',      name:'India\'s Cyber Security Architecture' },
      { id:'dpdpa',           name:'Digital Personal Data Protection Act 2023' },
      { id:'drones',          name:'UAVs / Drones as Security Threat' },
      { id:'money-laundering',name:'Money Laundering and Its Prevention' },
    ]},
    { id:'border-security', label:'Border Area Security and Organized Crime', topics:[
      { id:'border-landscape',name:'India\'s Border Landscape' },
      { id:'pak-border',      name:'India-Pakistan Border Challenges' },
      { id:'china-border',    name:'India-China Border Challenges' },
      { id:'bd-myan-border',  name:'India-Bangladesh and India-Myanmar Border Challenges' },
      { id:'maritime-sec',    name:'Maritime Security Challenges' },
      { id:'organized-crime', name:'Organized Crime — Terrorism Nexus' },
    ]},
    { id:'security-forces', label:'Security Forces and Agencies', topics:[
      { id:'capfs',           name:'Central Armed Police Forces (CAPFs)' },
      { id:'intelligence',    name:'Intelligence Agencies' },
      { id:'nia',             name:'National Investigation Agency (NIA)' },
      { id:'anti-terror-laws',name:'Anti-Terror Laws — UAPA and AFSPA' },
      { id:'nsc-system',      name:'National Security Council System' },
    ]},
  ]},

  // ── PSIR 1A ───────────────────────────────────────────────────────────────
  psir1a: { sections: [
    { id:'political-theory', label:'Political Theory: Meaning and Approaches', topics:[
      { id:'pt-meaning',      name:'Meaning of Political Theory' },
      { id:'pt-evolution',    name:'Evolution of Political Theory' },
      { id:'pt-approaches',   name:'Approaches to Political Theory' },
      { id:'trad-approaches', name:'Traditional Approaches' },
      { id:'contemp-approaches',name:'Contemporary Approaches' },
      { id:'behav-inst',      name:'Behavioural vs Institutional Approach' },
      { id:'other-approaches',name:'Other Approaches' },
      { id:'decline-pt',      name:'Decline of Political Theory' },
      { id:'resurgence-pt',   name:'Resurgence of Political Theory' },
    ]},
    { id:'western-pt', label:'Western Political Thought', topics:[
      { id:'socrates',        name:'Socrates (470–399 BC)' },
      { id:'plato',           name:'Plato (428–347 BC)' },
      { id:'aristotle',       name:'Aristotle (384–322 BC)' },
      { id:'machiavelli',     name:'Machiavelli (1469–1527)' },
      { id:'hobbes',          name:'Thomas Hobbes (1588–1679)' },
      { id:'locke',           name:'John Locke (1632–1704)' },
      { id:'rousseau',        name:'Rousseau (1712–1778)' },
      { id:'js-mill',         name:'J.S. Mill (1806–1873)' },
      { id:'marx',            name:'Karl Marx (1818–1883)' },
      { id:'gramsci',         name:'Gramsci (1891–1937)' },
      { id:'hannah-arendt',   name:'Hannah Arendt (1906–1975)' },
    ]},
    { id:'political-ideologies', label:'Political Ideologies', topics:[
      { id:'ideology',        name:'Ideology' },
      { id:'idealism',        name:'Idealism' },
      { id:'liberalism',      name:'Liberalism' },
      { id:'socialism',       name:'Socialism' },
      { id:'marxism-after',   name:'Marxism After Marx' },
      { id:'fascism',         name:'Fascism' },
      { id:'feminism',        name:'Feminism' },
      { id:'post-modernism',  name:'Post-Modernism' },
      { id:'post-colonialism',name:'Post-Colonialism' },
      { id:'multi-culturalism',name:'Multi-Culturalism' },
      { id:'value-pluralism', name:'Value Pluralism' },
      { id:'end-of-ideology', name:'End of Ideology and History' },
      { id:'clash-civilizations',name:'Clash of Civilizations' },
    ]},
    { id:'theories', label:'Theories', topics:[
      { id:'theories-state',  name:'Theories of State' },
      { id:'theories-power',  name:'Theories of Power: Hegemony, Ideology, Legitimacy' },
      { id:'theories-democracy',name:'Theories and Models of Democracy' },
      { id:'theories-rights', name:'Theories of Rights and Human Rights' },
      { id:'theories-justice',name:'Theories of Justice' },
      { id:'equality-freedom',name:'Equality, Freedom and Affirmative Action' },
    ]},
    { id:'indian-pt', label:'Indian Political Thought', topics:[
      { id:'ipt-intro',       name:'Intro to Indian Political Thought' },
      { id:'dharmashastra',   name:'Dharmashastra Tradition' },
      { id:'kautilya',        name:'Kautilya — Arthashastra' },
      { id:'buddhist-thought',name:'Buddhist Thought' },
      { id:'sir-syed',        name:'Sir Syed Ahmed Khan' },
      { id:'aurobindo',       name:'Aurobindo Ghosh' },
      { id:'gandhi',          name:'M.K. Gandhi' },
      { id:'ambedkar',        name:'B.R. Ambedkar' },
      { id:'mn-roy',          name:'M.N. Roy' },
    ]},
  ]},

  // ── PSIR 1B ───────────────────────────────────────────────────────────────
  psir1b: { sections: [
    { id:'indian-nationalism', label:'Indian Nationalism', topics:[
      { id:'indian-nationalism', name:'Indian Nationalism' },
    ]},
    { id:'making-constitution', label:'Making of Indian Constitution', topics:[
      { id:'making-constitution', name:'Making of Indian Constitution' },
    ]},
    { id:'salient-features', label:'Salient Features of Indian Constitution', topics:[
      { id:'preamble-psir',   name:'The Preamble' },
      { id:'fr-fd-dpsp',      name:'Fundamental Rights, Duties and DPSP' },
      { id:'ucc',             name:'Uniform Civil Code' },
      { id:'parliamentary-sys',name:'Parliamentary System' },
      { id:'judicial-sys',    name:'Judicial System' },
      { id:'constitutional-morality',name:'Constitutional Morality' },
    ]},
    { id:'principal-organs', label:'Principal Organs of Government', topics:[
      { id:'legislature',     name:'Legislature' },
      { id:'judiciary-psir',  name:'Judiciary' },
      { id:'executive',       name:'Executive' },
    ]},
    { id:'grassroots-democracy', label:'Grassroots Democracy', topics:[
      { id:'grassroots',      name:'Grassroots Democracy' },
    ]},
    { id:'federalism', label:'Federalism', topics:[
      { id:'federalism',      name:'Federalism' },
    ]},
    { id:'planning-econ-dev', label:'Planning and Economic Development', topics:[
      { id:'planning-econ',   name:'Planning and Economic Development' },
    ]},
    { id:'caste-religion', label:'Caste, Religion and Ethnicity in Politics', topics:[
      { id:'caste-politics',  name:'Role of Caste in Politics' },
      { id:'ethnicity',       name:'Ethnicity in Indian Politics' },
      { id:'religion-politics',name:'Religion in Indian Politics' },
    ]},
    { id:'party-system', label:'Party System', topics:[
      { id:'congress',        name:'Congress and Its Decline' },
      { id:'regional-parties',name:'Regional Parties' },
      { id:'ideology-parties',name:'Ideology and Political Parties' },
      { id:'coalition',       name:'Coalition Politics' },
      { id:'election-commission',name:'Election Commission and Electoral Reforms' },
      { id:'pressure-groups', name:'Pressure Groups' },
      { id:'electoral-behaviour',name:'Electoral Behaviour' },
    ]},
    { id:'social-movements', label:'Social Movements', topics:[
      { id:'social-mvmts',    name:'Social Movements' },
      { id:'civil-liberties', name:'Civil Liberties and Human Rights' },
      { id:'womens-movements',name:'Women\'s Movements' },
      { id:'env-movements',   name:'Environmental Movements' },
    ]},
  ]},

  // ── PSIR 2A ───────────────────────────────────────────────────────────────
  psir2a: { sections: [
    { id:'comparative-politics', label:'Comparative Politics', topics:[
      { id:'comp-pol-intro',  name:'Introduction to Comparative Politics' },
      { id:'systems-approach',name:'Systems Approach — David Easton' },
      { id:'structural-functional',name:'Structural Functional Approach — Almond and Powell' },
      { id:'pol-development', name:'Political Development Approach' },
      { id:'pol-modernisation',name:'Political Modernisation' },
      { id:'pol-culture',     name:'Political Culture Approach — Almond and Verba' },
      { id:'pol-economy',     name:'Political Economy Approach' },
      { id:'pol-sociology',   name:'Political Sociology Approach' },
    ]},
    { id:'state-comp-pol', label:'State in Comparative Politics', topics:[
      { id:'advanced-industrial',name:'Advanced Industrial States' },
      { id:'socialist-states',name:'Socialist States' },
      { id:'developing-countries',name:'Developing Countries' },
    ]},
    { id:'politics-representation', label:'Politics of Representation and Participation', topics:[
      { id:'political-parties-cp',name:'Political Parties' },
      { id:'party-systems',   name:'Party Systems' },
      { id:'pressure-groups-cp',name:'Pressure Groups and Interest Groups' },
      { id:'social-mvmts-cp', name:'Social Movements (Comparative)' },
    ]},
    { id:'globalization', label:'Globalization', topics:[
      { id:'glob-understanding',name:'Understanding Globalization' },
      { id:'glob-theories',   name:'Theories of Globalization' },
      { id:'glob-south',      name:'Globalization and the Global South' },
      { id:'glob-sovereignty',name:'Globalization, Sovereignty and Global Politics' },
    ]},
    { id:'approaches-ir', label:'Approaches to Study of International Relations', topics:[
      { id:'ir-study',        name:'Study of IR' },
      { id:'realist-school',  name:'Realist School' },
      { id:'liberalism-school',name:'Liberalism School' },
      { id:'marxist-school',  name:'Marxist School' },
      { id:'other-ir-theories',name:'Other Theories of IR' },
    ]},
    { id:'key-concepts-ir', label:'Key Concepts in IR', topics:[
      { id:'national-interest',name:'National Interest' },
      { id:'security-ir',     name:'Security' },
      { id:'deterrence',      name:'Deterrence' },
      { id:'balance-of-power',name:'Balance of Power' },
      { id:'transnational',   name:'Transnational Actors' },
      { id:'collective-sec',  name:'Collective Security' },
    ]},
    { id:'intl-order', label:'Changing International Political Order', topics:[
      { id:'cold-war-ir',     name:'Cold War' },
      { id:'nuclear-sec',     name:'Nuclear Security' },
      { id:'nam-ir',          name:'Non-Alignment Movement (NAM)' },
      { id:'us-hegemony',     name:'US Hegemony' },
      { id:'nato',            name:'NATO' },
    ]},
    { id:'intl-economic-sys', label:'International Economic Systems', topics:[
      { id:'bretton-woods',   name:'Bretton Woods Institutions' },
      { id:'world-bank',      name:'World Bank Group' },
      { id:'wto',             name:'World Trade Organization (WTO)' },
      { id:'nieo',            name:'New International Economic Order (NIEO)' },
    ]},
    { id:'united-nations', label:'United Nations', topics:[
      { id:'un-structure',    name:'Structure of the UN' },
      { id:'un-agencies',     name:'Specialized Agencies' },
      { id:'un-achievements', name:'Achievements of the UN' },
      { id:'un-challenges',   name:'Challenges and Reforms' },
      { id:'india-un',        name:'India and the United Nations' },
    ]},
    { id:'regionalization', label:'Regionalization of World Politics', topics:[
      { id:'regionalism',     name:'Regionalism — Concepts' },
      { id:'eu',              name:'European Union (EU)' },
      { id:'asean',           name:'ASEAN (1967)' },
      { id:'saarc',           name:'SAARC' },
      { id:'bimstec',         name:'BIMSTEC' },
      { id:'nafta-usmca',     name:'NAFTA and USMCA' },
      { id:'apec',            name:'APEC (1989)' },
    ]},
    { id:'global-concerns', label:'Contemporary Global Concerns', topics:[
      { id:'democracy-global',name:'Democracy in Global Politics' },
      { id:'human-rights-gc', name:'Human Rights' },
      { id:'environment-gc',  name:'Environment (Global)' },
      { id:'gender-justice',  name:'Gender Justice' },
      { id:'terrorism-gc',    name:'Terrorism (Global)' },
      { id:'ai-governance',   name:'AI Governance as Emerging Global Concern' },
    ]},
  ]},

  // ── PSIR 2B ───────────────────────────────────────────────────────────────
  psir2b: { sections: [
    { id:'indian-fp', label:'Indian Foreign Policy', topics:[
      { id:'fp-determinants',   name:'Determinants of India\'s Foreign Policy' },
      { id:'fp-institutions',   name:'Institutions of Policy-Making' },
      { id:'fp-phases',         name:'Phases of Indian Foreign Policy' },
      { id:'nehru-to-multi-alignment',name:'Continuity and Change — Nehruvianism to Multi-Alignment' },
    ]},
    { id:'india-nam', label:'India and the Non-Alignment Movement', topics:[
      { id:'nam-phases',        name:'NAM — India\'s Role in Different Phases' },
      { id:'non-alignment-2',   name:'Non-Alignment 2.0' },
      { id:'nam-relevance',     name:'Relevance of NAM in Contemporary World' },
    ]},
    { id:'india-south-asia', label:'India and South Asia', topics:[
      { id:'india-pak',         name:'India-Pakistan Relations' },
      { id:'india-bd',          name:'India-Bangladesh Relations' },
      { id:'india-sl',          name:'India-Sri Lanka Relations' },
      { id:'india-nepal',       name:'India-Nepal Relations' },
      { id:'india-bhutan',      name:'India-Bhutan Relations' },
      { id:'india-afg',         name:'India-Afghanistan Relations' },
      { id:'india-myanmar',     name:'India-Myanmar Relations' },
      { id:'saarc-2b',          name:'SAARC and Regional Integration' },
      { id:'look-east',         name:'India\'s Look East / Act East Policy' },
    ]},
    { id:'india-global-south', label:'India and the Global South', topics:[
      { id:'india-africa',      name:'India-Africa Relations' },
      { id:'india-latam',       name:'India-Latin America Relations' },
      { id:'india-nieo-wto',    name:'India\'s Leadership in NIEO and WTO' },
      { id:'voice-global-south',name:'Voice of the Global South' },
    ]},
    { id:'india-power-centers', label:'India and Global Centres of Power', topics:[
      { id:'india-usa',         name:'India-USA Relations' },
      { id:'india-russia',      name:'India-Russia Relations' },
      { id:'india-china',       name:'India-China Relations' },
      { id:'india-japan',       name:'India-Japan Relations' },
      { id:'india-eu',          name:'India-EU Relations' },
    ]},
    { id:'india-un', label:'India and the UN System', topics:[
      { id:'india-un-pk',       name:'India\'s Role in UN Peacekeeping' },
      { id:'unsc-seat',         name:'India\'s Demand for Permanent UNSC Seat' },
      { id:'multilateral-dip',  name:'India and Multilateral Diplomacy' },
    ]},
    { id:'india-nuclear', label:'India and the Nuclear Question', topics:[
      { id:'nuclear-evolution', name:'Evolution of India\'s Nuclear Policy' },
      { id:'nuclear-doctrine',  name:'India\'s Nuclear Doctrine' },
      { id:'nuclear-order',     name:'India and Global Nuclear Order (NPT, CTBT, NSG)' },
      { id:'indo-us-nuclear',   name:'Indo-US Nuclear Deal' },
    ]},
    { id:'recent-fp', label:'Recent Developments in Indian Foreign Policy', topics:[
      { id:'india-west-asia',   name:'India and West Asia' },
      { id:'india-israel',      name:'India-Israel Relations' },
      { id:'indo-pacific',      name:'India and the Indo-Pacific' },
      { id:'new-world-order',   name:'India\'s Vision of New World Order' },
      { id:'climate-diplomacy', name:'India and Climate Diplomacy' },
      { id:'neighbourhood-first',name:'India\'s Neighbourhood First Policy' },
    ]},
  ]},

};
