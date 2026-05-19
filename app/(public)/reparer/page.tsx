'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ══════════════════════════════════
   TYPES
══════════════════════════════════ */
interface Model {
  name: string;
  sub?: string;
  year?: number;
}
interface Prest {
  id: string;
  ico: string;
  name: string;
  desc: string;
  commun?: boolean;
}
interface Brand {
  id: string;
  name: string;
  models: Model[];
  gammes?: Record<string, Model[]>;
}
interface DeviceData {
  brands: Brand[];
  prests: Prest[];
}

/* ══════════════════════════════════
   BRAND LOGOS (inline SVG via CDN)
══════════════════════════════════ */
const BRAND_LOGOS: Record<string, string> = {
  apple:     `<img src="https://cdn.simpleicons.org/apple/1a1a1a" style="width:36px;height:36px;object-fit:contain;" alt="Apple">`,
  samsung:   `<img src="https://cdn.simpleicons.org/samsung/1428A0" style="width:48px;height:28px;object-fit:contain;" alt="Samsung">`,
  xiaomi:    `<img src="https://cdn.simpleicons.org/xiaomi/FF6900" style="width:36px;height:36px;object-fit:contain;" alt="Xiaomi">`,
  oppo:      `<img src="https://cdn.simpleicons.org/oppo/1D8348" style="width:48px;height:28px;object-fit:contain;" alt="Oppo">`,
  huawei:    `<img src="https://cdn.simpleicons.org/huawei/CF0A2C" style="width:36px;height:36px;object-fit:contain;" alt="Huawei">`,
  google:    `<img src="https://cdn.simpleicons.org/google/4285F4" style="width:36px;height:36px;object-fit:contain;" alt="Google">`,
  dell:      `<img src="https://cdn.simpleicons.org/dell/007DB8" style="width:48px;height:28px;object-fit:contain;" alt="Dell">`,
  hp:        `<img src="https://cdn.simpleicons.org/hp/0096D6" style="width:36px;height:36px;object-fit:contain;" alt="HP">`,
  lenovo:    `<img src="https://cdn.simpleicons.org/lenovo/E2231A" style="width:48px;height:28px;object-fit:contain;" alt="Lenovo">`,
  asus:      `<img src="https://cdn.simpleicons.org/asus/00AEEF" style="width:48px;height:28px;object-fit:contain;" alt="Asus">`,
  acer:      `<img src="https://cdn.simpleicons.org/acer/83B81A" style="width:48px;height:28px;object-fit:contain;" alt="Acer">`,
  msi:       `<img src="https://cdn.simpleicons.org/msi/FF0000" style="width:36px;height:36px;object-fit:contain;" alt="MSI">`,
  microsoft: `<img src="https://cdn.simpleicons.org/microsoft/00A4EF" style="width:36px;height:36px;object-fit:contain;" alt="Microsoft">`,
  generique: `<span style="font-size:1.8rem;">🖥</span>`,
};

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const RDATA: Record<string, DeviceData> = {
  smartphone: {
    brands: [
      {id:'apple', name:'Apple', models:[
        {name:'iPhone 17 Pro Max', sub:'2025',year:2025},{name:'iPhone 17 Pro', sub:'2025',year:2025},{name:'iPhone 17', sub:'2025',year:2025},
        {name:'iPhone 16 Pro Max', sub:'2024',year:2024},{name:'iPhone 16 Pro', sub:'2024',year:2024},{name:'iPhone 16 Plus', sub:'2024',year:2024},{name:'iPhone 16', sub:'2024',year:2024},
        {name:'iPhone 15 Pro Max', sub:'2023',year:2023},{name:'iPhone 15 Pro', sub:'2023',year:2023},{name:'iPhone 15 Plus', sub:'2023',year:2023},{name:'iPhone 15', sub:'2023',year:2023},
        {name:'iPhone 14 Pro Max', sub:'2022',year:2022},{name:'iPhone 14 Pro', sub:'2022',year:2022},{name:'iPhone 14 Plus', sub:'2022',year:2022},{name:'iPhone 14', sub:'2022',year:2022},
        {name:'iPhone 13 Pro Max', sub:'2021',year:2021},{name:'iPhone 13 Pro', sub:'2021',year:2021},{name:'iPhone 13 Mini', sub:'2021',year:2021},{name:'iPhone 13', sub:'2021',year:2021},
        {name:'iPhone 12 Pro Max', sub:'2020',year:2020},{name:'iPhone 12 Pro', sub:'2020',year:2020},{name:'iPhone 12 Mini', sub:'2020',year:2020},{name:'iPhone 12', sub:'2020',year:2020},
        {name:'iPhone SE 2022', sub:'2022',year:2022},
        {name:'iPhone 11 Pro Max', sub:'2019',year:2019},{name:'iPhone 11 Pro', sub:'2019',year:2019},{name:'iPhone 11', sub:'2019',year:2019},
        {name:'iPhone SE 2020', sub:'2020',year:2020},
        {name:'iPhone XS Max', sub:'2018',year:2018},{name:'iPhone XS', sub:'2018',year:2018},{name:'iPhone XR', sub:'2018',year:2018},{name:'iPhone X', sub:'2017',year:2017},
        {name:'iPhone 8 Plus', sub:'2017',year:2017},{name:'iPhone 8', sub:'2017',year:2017},
      ]},
      {id:'samsung', name:'Samsung', gammes:{
        'S':[
          {name:'Galaxy S26 Ultra', sub:'2025',year:2025},{name:'Galaxy S26+', sub:'2025',year:2025},{name:'Galaxy S26', sub:'2025',year:2025},
          {name:'Galaxy S25 Ultra', sub:'2025',year:2025},{name:'Galaxy S25+', sub:'2025',year:2025},{name:'Galaxy S25', sub:'2025',year:2025},
          {name:'Galaxy S24 Ultra', sub:'2024',year:2024},{name:'Galaxy S24+', sub:'2024',year:2024},{name:'Galaxy S24', sub:'2024',year:2024},
          {name:'Galaxy S23 Ultra', sub:'2023',year:2023},{name:'Galaxy S23+', sub:'2023',year:2023},{name:'Galaxy S23', sub:'2023',year:2023},
          {name:'Galaxy S22 Ultra', sub:'2022',year:2022},{name:'Galaxy S22+', sub:'2022',year:2022},{name:'Galaxy S22', sub:'2022',year:2022},
          {name:'Galaxy S21 Ultra', sub:'2021',year:2021},{name:'Galaxy S21+', sub:'2021',year:2021},{name:'Galaxy S21', sub:'2021',year:2021},
          {name:'Galaxy S20 Ultra', sub:'2020',year:2020},{name:'Galaxy S20+', sub:'2020',year:2020},{name:'Galaxy S20', sub:'2020',year:2020},{name:'Galaxy S20 FE', sub:'2020',year:2020},
          {name:'Galaxy S10+', sub:'2019',year:2019},{name:'Galaxy S10', sub:'2019',year:2019},
          {name:'Autre modèle', sub:'Préciser dans le message',year:0},
        ],
        'A':[
          {name:'Galaxy A57', sub:'2025',year:2025},{name:'Galaxy A37', sub:'2025',year:2025},{name:'Galaxy A17', sub:'2025',year:2025},
          {name:'Galaxy A56', sub:'2024',year:2024},{name:'Galaxy A36', sub:'2024',year:2024},{name:'Galaxy A16', sub:'2024',year:2024},
          {name:'Galaxy A55', sub:'2024',year:2024},{name:'Galaxy A35', sub:'2024',year:2024},{name:'Galaxy A15', sub:'2024',year:2024},
          {name:'Galaxy A54', sub:'2023',year:2023},{name:'Galaxy A34', sub:'2023',year:2023},{name:'Galaxy A14', sub:'2023',year:2023},
          {name:'Galaxy A53', sub:'2022',year:2022},{name:'Galaxy A33', sub:'2022',year:2022},{name:'Galaxy A13', sub:'2022',year:2022},
          {name:'Galaxy A52s', sub:'2021',year:2021},{name:'Galaxy A32', sub:'2021',year:2021},{name:'Galaxy A12', sub:'2021',year:2021},
          {name:'Galaxy A52', sub:'2021',year:2021},{name:'Galaxy A31', sub:'2020',year:2020},{name:'Galaxy A11', sub:'2020',year:2020},
          {name:'Galaxy A51', sub:'2019',year:2019},{name:'Galaxy A21s', sub:'2020',year:2020},{name:'Galaxy A10', sub:'2019',year:2019},
          {name:'Autre modèle', sub:'Préciser dans le message',year:0},
        ]
      }, models:[]},
      {id:'xiaomi', name:'Xiaomi', models:[
        {name:'Redmi Note 12', sub:'2023',year:2023},{name:'Redmi Note 13', sub:'2024',year:2024},{name:'Redmi 13C', sub:'2024',year:2024},
        {name:'Xiaomi 13', sub:'2023',year:2023},{name:'Xiaomi 14', sub:'2024',year:2024},{name:'Xiaomi 14T', sub:'2024',year:2024},
        {name:'POCO X6', sub:'2024',year:2024},{name:'POCO F6', sub:'2024',year:2024},
        {name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'oppo', name:'Oppo / OnePlus', models:[
        {name:'OPPO Reno 10', sub:'2023',year:2023},{name:'OPPO Reno 12', sub:'2024',year:2024},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
        {name:'OnePlus 12', sub:'2024',year:2024},{name:'OnePlus Nord 4', sub:'2024',year:2024},
      ]},
      {id:'huawei', name:'Huawei', models:[
        {name:'P30', sub:'2019',year:2019},{name:'P40', sub:'2020',year:2020},{name:'P50', sub:'2021',year:2021},
        {name:'P60', sub:'2023',year:2023},{name:'Mate 50', sub:'2022',year:2022},{name:'Nova 11', sub:'2023',year:2023},
      ]},
      {id:'google', name:'Google Pixel', models:[
        {name:'Pixel 6', sub:'2021',year:2021},{name:'Pixel 7', sub:'2022',year:2022},{name:'Pixel 7a', sub:'2023',year:2023},
        {name:'Pixel 8', sub:'2023',year:2023},{name:'Pixel 8a', sub:'2024',year:2024},{name:'Pixel 9', sub:'2024',year:2024},
      ]},
    ],
    prests:[
      {id:'ecran',ico:'🖥',name:'Remplacement écran',desc:'Écran fissuré ou tactile défaillant.'},
      {id:'batterie',ico:'🔋',name:'Remplacement batterie',desc:'Autonomie réduite ou décharge rapide.'},
      {id:'charge',ico:'⚡',name:'Connecteur de charge',desc:'Problème de charge ou connexion instable.'},
      {id:'chassis',ico:'🔧',name:'Remplacement châssis',desc:'Coque abîmée, déformée ou fendue.'},
      {id:'hautparleur',ico:'🔊',name:'Remplacement haut-parleur',desc:'Son absent, grésillements ou distorsion.'},
      {id:'diagnostic',ico:'🔍',name:'Diagnostic',desc:'Autre panne - enquête approfondie avant devis.'},
    ]
  },
  portable: {
    brands: [
      {id:'apple', name:'Apple MacBook', gammes:{
        'Air':[
          {name:'MacBook Air 15" (A3241 - M5)', sub:'2025',year:2025},
          {name:'MacBook Air 13" (A3240 - M5)', sub:'2025',year:2025},
          {name:'MacBook Air 15" (A3114 - M4)', sub:'2025',year:2025},
          {name:'MacBook Air 13" (A3113 - M4)', sub:'2025',year:2025},
          {name:'MacBook Air 15" (A2941 - M3)', sub:'2024',year:2024},
          {name:'MacBook Air 13" (A3113 - M3)', sub:'2024',year:2024},
          {name:'MacBook Air 15" (A2941 - M2)', sub:'2023',year:2023},
          {name:'MacBook Air 13" (A2681 - M2)', sub:'2022',year:2022},
          {name:'MacBook Air 13" (A2337 - M1 - 2020)', sub:'2020',year:2020},
          {name:'MacBook Air Retina 13" (A2179 - Intel - 2020)', sub:'2020',year:2020},
          {name:'MacBook Air Retina 13" (A1932 - 2019)', sub:'2019',year:2019},
          {name:'MacBook Air Retina 13" (A1932 - 2018)', sub:'2018',year:2018},
          {name:'MacBook Air 13" (A1466 - 2017)', sub:'2017',year:2017},
          {name:'MacBook Air 13" (A1466 - 2016)', sub:'2016',year:2016},
          {name:'MacBook Air 13" (A1466 - 2015)', sub:'2015',year:2015},
          {name:'MacBook Air 11" (A1465 - 2015)', sub:'2015',year:2015},
          {name:'Autre modèle', sub:'Préciser dans le message',year:0},
        ],
        'Pro':[
          {name:'MacBook Pro 16" (A3403 - M5)', sub:'2025',year:2025},
          {name:'MacBook Pro 14" (A3401 - M5)', sub:'2025',year:2025},
          {name:'MacBook Pro 16" (A3186 - M4)', sub:'2024',year:2024},
          {name:'MacBook Pro 14" (A3185 - M4)', sub:'2024',year:2024},
          {name:'MacBook Pro 16" (A2991 - M3 Pro / M3 Max - 2023)', sub:'2023',year:2023},
          {name:'MacBook Pro 14" (A2992 - M3 / M3 Pro / M3 Max - 2023)', sub:'2023',year:2023},
          {name:'MacBook Pro 16" (A2780 - M2 Pro / M2 Max - 2023)', sub:'2023',year:2023},
          {name:'MacBook Pro 14" (A2779 - M2 Pro / M2 Max - 2023)', sub:'2023',year:2023},
          {name:'MacBook Pro 16" (A2485 - M1 Pro / M1 Max - 2021)', sub:'2021',year:2021},
          {name:'MacBook Pro 14" (A2442 - M1 Pro / M1 Max - 2021)', sub:'2021',year:2021},
          {name:'MacBook Pro 13" (A2338 - M1 - 2020)', sub:'2020',year:2020},
          {name:'MacBook Pro 16" (A2141 - Intel - 2019)', sub:'2019',year:2019},
          {name:'MacBook Pro 15" (A1990 - 2019)', sub:'2019',year:2019},
          {name:'MacBook Pro 13" (A2159 - 2019)', sub:'2019',year:2019},
          {name:'MacBook Pro 15" (A1990 - 2018)', sub:'2018',year:2018},
          {name:'MacBook Pro 13" (A1989 - 2018)', sub:'2018',year:2018},
          {name:'MacBook Pro 15" (A1707 - 2017)', sub:'2017',year:2017},
          {name:'MacBook Pro 13" (A1708 / A1706 - 2017)', sub:'2017',year:2017},
          {name:'MacBook Pro 15" (A1707 - 2016)', sub:'2016',year:2016},
          {name:'MacBook Pro 13" (A1708 / A1706 - 2016)', sub:'2016',year:2016},
          {name:'MacBook Pro Retina 15" (A1398 - 2015)', sub:'2015',year:2015},
          {name:'MacBook Pro Retina 13" (A1502 - 2015)', sub:'2015',year:2015},
          {name:'Autre modèle', sub:'Préciser dans le message',year:0},
        ]
      }, models:[]},
      {id:'dell', name:'Dell', models:[
        {name:'XPS 13', sub:'9310/9315',year:2021},{name:'XPS 15', sub:'9500/9510',year:2022},{name:'XPS 17', sub:'9700',year:2022},
        {name:'Inspiron 15', sub:'3520',year:2022},{name:'Inspiron 15 5000', sub:'5515',year:2022},{name:'Inspiron 14', sub:'5420',year:2023},
        {name:'Latitude 5420', sub:'Pro',year:2021},{name:'Latitude 5520', sub:'Pro',year:2022},{name:'Latitude 7420', sub:'Pro',year:2022},
        {name:'Vostro 15', sub:'3515',year:2021},{name:'Alienware m15', sub:'Gaming',year:2022},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'hp', name:'HP', models:[
        {name:'HP Spectre x360 13', sub:'',year:2022},{name:'HP Spectre x360 14', sub:'',year:2023},{name:'HP Spectre x360 16', sub:'',year:2023},
        {name:'HP Envy 13', sub:'',year:2022},{name:'HP Envy 15', sub:'',year:2022},{name:'HP Envy x360 15', sub:'',year:2023},
        {name:'HP EliteBook 840', sub:'G8/G9',year:2022},{name:'HP EliteBook 850', sub:'G8',year:2021},{name:'HP ProBook 450', sub:'G9',year:2022},
        {name:'HP Pavilion 15', sub:'',year:2022},{name:'HP Pavilion 14', sub:'',year:2023},
        {name:'HP Omen 15', sub:'Gaming',year:2022},{name:'HP Omen 16', sub:'Gaming',year:2023},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'lenovo', name:'Lenovo', models:[
        {name:'ThinkPad X1 Carbon', sub:'Gen 10/11',year:2023},{name:'ThinkPad T14', sub:'Gen 3',year:2022},{name:'ThinkPad E15', sub:'Gen 4',year:2022},
        {name:'IdeaPad 5', sub:'15/16"',year:2023},{name:'IdeaPad Slim 5', sub:'',year:2023},{name:'IdeaPad Gaming 3', sub:'',year:2023},
        {name:'Yoga 7', sub:'14/16"',year:2023},{name:'Yoga 9', sub:'14"',year:2023},{name:'Yoga Slim 7', sub:'',year:2023},
        {name:'Legion 5', sub:'Gaming',year:2023},{name:'Legion 5 Pro', sub:'Gaming',year:2023},{name:'Legion 7', sub:'Gaming',year:2023},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'asus', name:'Asus', models:[
        {name:'ZenBook 14', sub:'',year:2023},{name:'ZenBook 15', sub:'',year:2022},{name:'ZenBook Pro 14', sub:'',year:2023},
        {name:'VivoBook 15', sub:'',year:2023},{name:'VivoBook 16', sub:'',year:2023},{name:'VivoBook S14', sub:'',year:2023},
        {name:'ROG Strix G15', sub:'Gaming',year:2022},{name:'ROG Strix G17', sub:'Gaming',year:2023},{name:'ROG Zephyrus G14', sub:'Gaming',year:2023},
        {name:'TUF Gaming A15', sub:'',year:2023},{name:'TUF Gaming F15', sub:'',year:2022},
        {name:'ExpertBook B1', sub:'Pro',year:2023},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'acer', name:'Acer', models:[
        {name:'Swift 3', sub:'',year:2023},{name:'Swift 5', sub:'',year:2023},{name:'Swift X 14', sub:'',year:2023},
        {name:'Aspire 5', sub:'',year:2023},{name:'Aspire 3', sub:'',year:2022},{name:'Aspire 7', sub:'',year:2022},
        {name:'Predator Helios 300', sub:'Gaming',year:2023},{name:'Predator Triton 500', sub:'Gaming',year:2022},
        {name:'Nitro 5', sub:'Gaming',year:2023},{name:'Nitro 16', sub:'Gaming',year:2023},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'msi', name:'MSI', models:[
        {name:'Modern 14', sub:'',year:2023},{name:'Modern 15', sub:'',year:2023},{name:'Prestige 14', sub:'',year:2023},
        {name:'GF63 Thin', sub:'Gaming',year:2023},{name:'GF65 Thin', sub:'Gaming',year:2022},
        {name:'Katana GF66', sub:'Gaming',year:2022},{name:'Stealth 15M', sub:'Gaming',year:2023},
        {name:'Raider GE76', sub:'Gaming',year:2022},{name:'Creator Z16', sub:'Workstation',year:2022},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
      {id:'microsoft', name:'Microsoft Surface', models:[
        {name:'Surface Laptop 4', sub:'13/15"',year:2021},{name:'Surface Laptop 5', sub:'13/15"',year:2022},
        {name:'Surface Laptop 6', sub:'13/15"',year:2023},{name:'Surface Laptop Go 3', sub:'12"',year:2023},
        {name:'Surface Pro 9', sub:'Tablette',year:2022},{name:'Surface Pro 10', sub:'Tablette',year:2024},{name:'Autre modèle', sub:'Préciser dans le message',year:0},
      ]},
    ],
    prests:[
      {id:'ecran',ico:'🖥',name:'Remplacement écran',desc:'Écran cassé ou rétroéclairage défaillant.'},
      {id:'batterie',ico:'🔋',name:'Remplacement batterie',desc:'Autonomie très faible ou batterie enflée.'},
      {id:'clavier',ico:'⌨️',name:'Remplacement clavier',desc:'Touches bloquées ou non fonctionnelles.'},
      {id:'trackpad',ico:'🖱',name:'Remplacement trackpad',desc:'Trackpad ne répond plus ou clique en permanence.'},
      {id:'charge',ico:'⚡',name:'Connecteur de charge',desc:'PC ne charge plus ou connexion instable.'},
      {id:'nettoyage',ico:'🧹',name:'Nettoyage',desc:'Ventilateurs bruyants, surchauffe.',commun:true},
      {id:'reinstall',ico:'💿',name:'Réinstallation système',desc:'Windows/macOS corrompu ou lenteurs graves.',commun:true},
      {id:'upgrade',ico:'⬆️',name:'Mise à niveau',desc:'Ajout RAM, SSD ou upgrade composants.',commun:true},
      {id:'topcase',ico:'🖥',name:'Remplacement topcase',desc:'Repose-mains, clavier ou coque supérieure endommagés.'},
      {id:'diag',ico:'🔍',name:'Autre panne (diagnostic)',desc:'Panne non identifiée - devis après diagnostic.'},
    ]
  },
  fixe: {
    brands:[{id:'generique',name:'PC Fixe (toute marque)',models:[{name:'PC Fixe (toute marque)',sub:'',year:0}]}],
    prests:[
      {id:'diagnostic_fixe',ico:'🔍',name:'Diagnostic',desc:'Identification de la panne - devis avant intervention.'},
      {id:'nettoyage',ico:'🧹',name:'Nettoyage',desc:'Poussière, ventilateurs, pâte thermique.',commun:true},
      {id:'reinstall',ico:'💿',name:'Réinstallation système',desc:'Windows corrompu, virus, lenteurs graves.',commun:true},
      {id:'upgrade',ico:'⬆️',name:'Mise à niveau',desc:'RAM, SSD, carte graphique, upgrade complet.',commun:true},
    ]
  }
};

const RTITLES = [
  '',
  'Quel <strong>appareil</strong> avez-vous ?',
  'Quelle <strong>marque</strong> ?',
  'Quel <strong>modèle</strong> ?',
  'Quelles <strong>prestations</strong> ?',
  'Vos <strong>coordonnées</strong>',
  '<strong>Confirmation</strong>',
];

/* ══════════════════════════════════
   STATE TYPE
══════════════════════════════════ */
interface RSState {
  step: number;
  device: string | null;
  deviceName: string;
  deviceIco: string;
  brand: string | null;
  brandName: string;
  model: string | null;
  modelName: string;
  prests: string[];
  gamme: string | null;
}

const initialRS: RSState = {
  step: 1, device: null, deviceName: '', deviceIco: '',
  brand: null, brandName: '', model: null, modelName: '',
  prests: [], gamme: null,
};

/* ══════════════════════════════════
   EMAILJS CONFIG
══════════════════════════════════ */
const EJS = {
  public_key:  'zFd-xKZE3XUM-ClwJ',
  service_id:  'lds_informatik',
  template_id: 'template_kbtdi8i',
};

/* ══════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════ */
export default function ReparezPage() {
  const [rs, setRS] = useState<RSState>(initialRS);
  const [sortModels, setSortModels] = useState<'recent' | 'az'>('recent');
  const [modelSearch, setModelSearch] = useState('');
  const [sending, setSending] = useState(false);
  const [confirmRef, setConfirmRef] = useState('');
  const [confirmDetails, setConfirmDetails] = useState('');

  // Form fields step 5
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [desc, setDesc] = useState('');

  // For dynamic panels rendered as HTML strings (brands, models, prests)
  const brandPanelRef = useRef<HTMLDivElement>(null);
  const modelPanelRef = useRef<HTMLDivElement>(null);
  const prestPanelRef = useRef<HTMLDivElement>(null);

  // ── Expose functions globally so inline HTML onclick works ──
  // (brand/model/prest panels use dangerouslySetInnerHTML with onclick)
  useEffect(() => {
    (window as any).rPickBrand = rPickBrand;
    (window as any).rPickGamme = rPickGamme;
    (window as any).rPickModel = (name: string) => rPickModel(name);
    (window as any).rRenderModels = (filter: string, sort?: 'recent' | 'az') => {
      setModelSearch(filter ?? '');
      if (sort) setSortModels(sort);
    };
    (window as any).rChangeGamme = rChangeGamme;
    (window as any).rTogglePrest = rTogglePrest;
  });

  /* ── step navigation ── */
  const goStep = useCallback((n: number) => {
    setRS(prev => ({ ...prev, step: n }));
    if (n === 3) { setModelSearch(''); setSortModels('recent'); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    setRS(prev => {
      if (prev.step <= 1) return prev;
      return { ...prev, step: prev.step - 1 };
    });
  }, []);

  /* ── device ── */
  const pickDevice = (id: string, ico: string, name: string) => {
    setRS(prev => ({
      ...prev,
      device: id, deviceIco: ico, deviceName: name,
      brand: null, brandName: '', model: null, modelName: '', prests: [], gamme: null,
    }));
  };

  /* ── brand ── */
  function rPickBrand(id: string, name: string) {
    setRS(prev => ({
      ...prev,
      brand: id, brandName: name, model: null, modelName: '', gamme: null,
    }));
  }

  /* ── gamme ── */
  function rPickGamme(gamme: string) {
    setRS(prev => {
      const data = RDATA[prev.device!];
      const brand = data?.brands.find(b => b.id === prev.brand);
      if (brand && brand.gammes) {
        brand.models = brand.gammes[gamme] || [];
      }
      return { ...prev, gamme, model: null, modelName: '' };
    });
    goStep(3);
  }

  function rChangeGamme() {
    setRS(prev => ({ ...prev, gamme: null, model: null, modelName: '' }));
    goStep(2);
  }

  /* ── model ── */
  function rPickModel(name: string) {
    setRS(prev => ({ ...prev, model: name, modelName: name }));
  }

  /* ── prests ── */
  function rTogglePrest(id: string) {
    setRS(prev => {
      const prests = prev.prests.includes(id)
        ? prev.prests.filter(x => x !== id)
        : [...prev.prests, id];
      return { ...prev, prests };
    });
  }

  /* ── step 6: confirmation + send ── */
  const sendRequest = async () => {
    setSending(true);
    const ref = 'LDS-' + Math.floor(1000 + Math.random() * 9000);
    setConfirmRef(ref);

    const data = RDATA[rs.device!];
    const all = data?.prests || [];
    const prestNames = rs.prests.map(id => {
      const p = all.find(x => x.id === id);
      return p ? p.name : id;
    }).join(', ');

    setConfirmDetails(
      `<strong>Appareil :</strong> ${rs.deviceIco} ${rs.deviceName}<br>` +
      `<strong>Marque :</strong> ${rs.brandName}<br>` +
      `<strong>Modèle :</strong> ${rs.modelName}<br>` +
      `<strong>Prestations :</strong> ${prestNames}<br>` +
      `<strong>Contact :</strong> ${prenom} · ${email} · ${tel}`
    );

    // Save to localStorage
    try {
      const key = 'lds_admin_demandes';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift({
        id: ref + '-' + Date.now().toString(36),
        type: 'reparation', status: 'nouveau', motif: '',
        nom: prenom + ' ' + nom, email, tel,
        appareil: rs.deviceName, marque: rs.brandName, modele: rs.modelName,
        prestations: rs.prests.map(id => { const p = all.find(x => x.id === id); return p ? p.name : id; }),
        message: desc, notes: '', ref,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) { /* silent */ }

    // EmailJS
    try {
      if (EJS.public_key !== 'VOTRE_PUBLIC_KEY') {
        const emailjs = (window as any).emailjs;
        if (emailjs) {
          await emailjs.send(EJS.service_id, EJS.template_id, {
            to_email:     'contact@ldsinformatik.fr,troyes@ldsinformatik.fr',
            subject:      `Réparation : nouvelle demande de devis (${ref})`,
            from_name:    `${prenom} ${nom}`,
            client_email: email,
            client_tel:   tel,
            ref,
            type:         'Réparation',
            details:      `Appareil : ${rs.deviceName}\nMarque : ${rs.brandName}\nModèle : ${rs.modelName}\nPrestations : ${prestNames}${desc ? '\nMessage : ' + desc : ''}`,
            admin_url:    'https://lds-informatik.vercel.app/admin/',
          });
        }
      }
    } catch (e) { /* silent */ }

    setSending(false);
    goStep(6);
  };

  /* ── render brand panel ── */
  const renderBrandsHTML = () => {
    if (!rs.device) return '';
    const data = RDATA[rs.device];
    if (!data) return '';
    if (rs.device === 'fixe') return '';

    let html = `<div class="rplbl">Sélectionnez la marque</div><div class="bgrid">`;
    data.brands.forEach(b => {
      const sel = rs.brand === b.id ? 'sel' : '';
      const logo = BRAND_LOGOS[b.id] || `<span style="font-size:1.8rem;">💻</span>`;
      html += `<div class="bcard ${sel}" onclick="window.rPickBrand('${b.id}','${b.name.replace(/'/g, "\\'")}')">
        <div style="height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${logo}</div>
        <div class="bnm">${b.name}</div></div>`;
    });
    html += `</div>`;

    // Samsung gamme selector
    if (rs.brand === 'samsung' && rs.device === 'smartphone' && !rs.gamme) {
      html += `<div class="rplbl" style="margin-top:20px;">Choisissez la gamme Samsung</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8px;">
          <div class="bcard" onclick="window.rPickGamme('S')" style="text-align:center;padding:24px 16px;">
            <div style="font-size:2rem;margin-bottom:8px;">🏆</div>
            <div style="font-weight:800;font-size:1.1rem;color:var(--primary);">Gamme S</div>
            <div style="font-size:12px;color:var(--gray);margin-top:4px;">Haut de gamme</div>
            <div style="font-size:11px;color:var(--gray);margin-top:2px;">S10 → S26 Ultra</div>
          </div>
          <div class="bcard" onclick="window.rPickGamme('A')" style="text-align:center;padding:24px 16px;">
            <div style="font-size:2rem;margin-bottom:8px;">📱</div>
            <div style="font-weight:800;font-size:1.1rem;color:var(--primary);">Gamme A</div>
            <div style="font-size:12px;color:var(--gray);margin-top:4px;">Milieu de gamme</div>
            <div style="font-size:11px;color:var(--gray);margin-top:2px;">A10 → A57</div>
          </div>
        </div>`;
    }

    // Apple MacBook gamme selector
    if (rs.brand === 'apple' && rs.device === 'portable' && !rs.gamme) {
      html += `<div class="rplbl" style="margin-top:20px;">Choisissez la gamme MacBook</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8px;">
          <div class="bcard" onclick="window.rPickGamme('Air')" style="text-align:center;padding:24px 16px;">
            <div style="font-size:2rem;margin-bottom:8px;">💨</div>
            <div style="font-weight:800;font-size:1.1rem;color:var(--primary);">MacBook Air</div>
            <div style="font-size:12px;color:var(--gray);margin-top:4px;">Légèreté &amp; autonomie</div>
            <div style="font-size:11px;color:var(--gray);margin-top:2px;">M1 → M5 · 2015 → 2025</div>
          </div>
          <div class="bcard" onclick="window.rPickGamme('Pro')" style="text-align:center;padding:24px 16px;">
            <div style="font-size:2rem;margin-bottom:8px;">⚡</div>
            <div style="font-weight:800;font-size:1.1rem;color:var(--primary);">MacBook Pro</div>
            <div style="font-size:12px;color:var(--gray);margin-top:4px;">Performance &amp; création</div>
            <div style="font-size:11px;color:var(--gray);margin-top:2px;">M1 → M5 · 2015 → 2025</div>
          </div>
        </div>`;
    }
    return html;
  };

  /* ── render model panel ── */
  const renderModelsHTML = () => {
    if (!rs.device || !rs.brand) return '';
    const data = RDATA[rs.device];
    if (!data) return '';
    const brand = data.brands.find(b => b.id === rs.brand);
    if (!brand) return '';

    if (rs.brand === 'samsung' && rs.device === 'smartphone' && !rs.gamme) return '';
    if (rs.brand === 'apple' && rs.device === 'portable' && !rs.gamme) return '';

    const q = modelSearch.toLowerCase();
    let models = q
      ? brand.models.filter(m => m.name.toLowerCase().includes(q))
      : [...brand.models];

    if (sortModels === 'az') models.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    else models.sort((a, b) => (b.year || 0) - (a.year || 0));

    const brandLogo = BRAND_LOGOS[rs.brand] || '';
    const hasGamme = (rs.brand === 'samsung' && rs.device === 'smartphone') || (rs.brand === 'apple' && rs.device === 'portable');
    const gammeLabel = hasGamme && rs.gamme
      ? ` · ${rs.gamme === 'Air' || rs.gamme === 'Pro' ? 'MacBook ' : 'Gamme '}${rs.gamme}`
      : '';

    const devIco = rs.device === 'smartphone' ? '📱' : rs.device === 'portable' ? '💻' : '🖥';

    let html = `
      <div class="rplbl" style="align-items:center;gap:10px;">
        <div style="height:28px;display:flex;align-items:center;">${brandLogo}</div>
        <span>Sélectionnez le modèle${gammeLabel}</span>
        ${hasGamme ? `<button onclick="window.rChangeGamme()" style="margin-left:auto;font-size:11px;padding:5px 12px;border:1.5px solid var(--border);border-radius:7px;background:#fff;color:var(--gray);cursor:pointer;">← Changer</button>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
        <div class="msearch" style="flex:1;min-width:180px;margin-bottom:0;">
          <input class="msearch-in" id="mSearch" placeholder="Rechercher un modèle…"
            oninput="window.rRenderModels(this.value)"
            value="${modelSearch.replace(/"/g, '&quot;')}">
          <button class="msearch-btn">🔍</button>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button onclick="window.rRenderModels(document.getElementById('mSearch')?.value||'','recent')"
            style="font-size:11.5px;font-weight:600;padding:8px 14px;border-radius:8px;border:1.5px solid ${sortModels === 'recent' ? 'var(--primary)' : 'var(--border)'};background:${sortModels === 'recent' ? 'var(--light)' : '#fff'};color:${sortModels === 'recent' ? 'var(--primary)' : 'var(--gray)'};cursor:pointer;transition:all .18s;">
            🕐 Plus récents
          </button>
          <button onclick="window.rRenderModels(document.getElementById('mSearch')?.value||'','az')"
            style="font-size:11.5px;font-weight:600;padding:8px 14px;border-radius:8px;border:1.5px solid ${sortModels === 'az' ? 'var(--primary)' : 'var(--border)'};background:${sortModels === 'az' ? 'var(--light)' : '#fff'};color:${sortModels === 'az' ? 'var(--primary)' : 'var(--gray)'};cursor:pointer;transition:all .18s;">
            🔤 A → Z
          </button>
        </div>
      </div>
      <div style="max-height:400px;overflow-y:auto;padding-right:4px;"><div class="mgrid">`;

    if (!models.length) {
      html += `<div style="grid-column:1/-1;font-size:13px;color:var(--gray);text-align:center;padding:20px;">Aucun modèle trouvé</div>`;
    }
    models.forEach(m => {
      const sel = rs.modelName === m.name ? 'sel' : '';
      const escaped = m.name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      html += `<div class="mcard ${sel}" onclick="window.rPickModel('${escaped}')">
        <span class="mcard-ico">${devIco}</span>
        <div class="mcard-info"><div class="mcard-name">${m.name}</div><div class="mcard-sub">${m.sub || m.year || ''}</div></div></div>`;
    });
    html += `</div></div>`;
    return html;
  };

  /* ── render prests panel ── */
  const renderPrestsHTML = () => {
    if (!rs.device) return '';
    const data = RDATA[rs.device];
    if (!data) return '';
    const specific = data.prests.filter(p => !p.commun);
    const communs = data.prests.filter(p => p.commun);

    let html = `<div class="rplbl">Sélectionnez vos prestations <span style="font-size:11px;font-weight:400;color:var(--gray);margin-left:4px;">(plusieurs choix possibles)</span></div><div class="pgrid">`;
    specific.forEach(p => {
      const sel = rs.prests.includes(p.id) ? 'sel' : '';
      html += `<div class="pcard ${sel}" onclick="window.rTogglePrest('${p.id}')">
        <div class="phead"><div class="pico">${p.ico}</div><div><div class="pnm">${p.name}</div></div><div class="pbdg">devis</div></div>
        <div class="pdesc">${p.desc}</div></div>`;
    });
    html += `</div>`;
    if (communs.length) {
      html += `<div class="ssep">Commun à tous les PC</div><div class="pgrid">`;
      communs.forEach(p => {
        const sel = rs.prests.includes(p.id) ? 'sel' : '';
        html += `<div class="pcard ${sel}" onclick="window.rTogglePrest('${p.id}')">
          <div class="phead"><div class="pico">${p.ico}</div><div><div class="pnm">${p.name}</div></div><div class="pbdg">devis</div></div>
          <div class="pdesc">${p.desc}</div></div>`;
      });
      html += `</div>`;
    }
    return html;
  };

  /* ── auto-advance step 1→2 for "fixe" ── */
  useEffect(() => {
    if (rs.device === 'fixe' && rs.step === 2) {
      setRS(prev => ({
        ...prev,
        brand: 'generique', brandName: 'PC Fixe', model: 'generique', modelName: 'PC Fixe',
      }));
      goStep(4);
    }
  }, [rs.device, rs.step, goStep]);

  /* ── step helpers ── */
  const canStep1 = !!rs.device;
  const canStep2 = !!rs.brand && !(
    (rs.brand === 'samsung' && rs.device === 'smartphone' && !rs.gamme) ||
    (rs.brand === 'apple' && rs.device === 'portable' && !rs.gamme)
  );
  const canStep3 = !!rs.model;
  const canStep4 = rs.prests.length > 0;
  const canStep5 = prenom.trim() && nom.trim() && email.trim() && tel.trim();

  /* ── recap data ── */
  const recapPrests = rs.device
    ? (RDATA[rs.device]?.prests || []).filter(p => rs.prests.includes(p.id))
    : [];

  /* ── reset ── */
  const reset = () => {
    setRS(initialRS);
    setPrenom(''); setNom(''); setEmail(''); setTel(''); setDesc('');
    setModelSearch(''); setSortModels('recent');
    setConfirmRef(''); setConfirmDetails('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ══════════════════════════════════
     RENDER
  ══════════════════════════════════ */
  return (
    <>
      {/* inline styles identical to the mockup */}
      <style>{`
        :root {
          --primary: #004AAD;
          --secondary: #162a68;
          --light: #d8e9ff;
          --white: #fff;
          --text: #1a1a1a;
          --gray: #6b7280;
          --border: #e5e7eb;
          --bg: #f7faff;
          --shadow: 0 10px 30px rgba(0,0,0,0.07);
          --radius: 20px;
          --green: #0EA66E;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }

        .rw { padding: 28px 32px 48px; }
        .rtop { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .rbk { width: 38px; height: 38px; background: #fff; border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; transition: all .18s; flex-shrink: 0; }
        .rbk:hover { border-color: var(--primary); color: var(--primary); }
        .rbk.h { opacity: 0; pointer-events: none; }
        .rtitle { font-size: 1.5rem; font-weight: 800; color: var(--text); }
        .rsteps { display: flex; align-items: center; margin-bottom: 24px; overflow-x: auto; padding-bottom: 4px; }
        .rs { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .rsd { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; border: 2px solid var(--border); color: var(--gray); background: #fff; transition: all .25s; flex-shrink: 0; }
        .rs.active .rsd { background: var(--primary); border-color: var(--primary); color: #fff; }
        .rs.done .rsd { background: var(--green); border-color: var(--green); color: #fff; }
        .rsl { font-size: 11px; font-weight: 600; color: var(--gray); transition: color .25s; white-space: nowrap; }
        .rs.active .rsl { color: var(--primary); }
        .rs.done .rsl { color: var(--green); }
        .rsline { flex: 1; height: 2px; background: var(--border); margin: 0 6px; transition: background .25s; min-width: 12px; flex-shrink: 0; }
        .rsline.done { background: var(--green); }
        .rlayout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; align-items: start; }
        .rpanel { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 22px; }
        .rplbl { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 700; color: var(--text); margin-bottom: 18px; }
        .rplbl::before { content: ''; width: 7px; height: 7px; background: var(--primary); border-radius: 50%; flex-shrink: 0; }
        .dgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        .dcard { background: #fff; border: 1.5px solid var(--border); border-radius: 14px; padding: 24px 12px; text-align: center; cursor: pointer; transition: all .2s; user-select: none; }
        .dcard:hover { border-color: var(--primary); background: #f0f6ff; }
        .dcard.sel { border-color: var(--primary); background: var(--light); box-shadow: 0 0 0 3px rgba(0,74,173,.1); }
        .dico { font-size: 2rem; margin-bottom: 10px; display: block; }
        .dnm { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--secondary); }
        .bgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        .mgrid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
        .bcard { background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 18px 12px; text-align: center; cursor: pointer; transition: all .2s; user-select: none; }
        .bcard:hover { border-color: var(--primary); background: #f0f6ff; }
        .bcard.sel { border-color: var(--primary); background: var(--light); box-shadow: 0 0 0 3px rgba(0,74,173,.1); }
        .bico { font-size: 1.5rem; margin-bottom: 6px; display: block; }
        .bnm { font-size: 12px; font-weight: 700; color: var(--secondary); }
        .mcard { background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 14px 16px; cursor: pointer; transition: all .2s; user-select: none; display: flex; align-items: center; gap: 10px; }
        .mcard:hover { border-color: var(--primary); background: #f0f6ff; }
        .mcard.sel { border-color: var(--primary); background: var(--light); }
        .mcard-ico { font-size: 1.2rem; flex-shrink: 0; }
        .mcard-info { text-align: left; }
        .mcard-name { font-size: 12.5px; font-weight: 700; color: var(--secondary); }
        .mcard-sub { font-size: 11px; color: var(--gray); margin-top: 1px; }
        .msearch { display: flex; gap: 0; margin-bottom: 14px; }
        .msearch-in { flex: 1; background: var(--bg); border: 1px solid var(--border); border-radius: 8px 0 0 8px; padding: 9px 14px; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; transition: border-color .18s; }
        .msearch-in:focus { border-color: var(--primary); background: #fff; }
        .msearch-btn { background: var(--primary); color: #fff; border: none; border-radius: 0 8px 8px 0; padding: 0 14px; cursor: pointer; font-size: 14px; }
        .pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .pcard { background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 14px; cursor: pointer; transition: all .2s; position: relative; user-select: none; }
        .pcard:hover { border-color: var(--primary); background: #f8fbff; }
        .pcard.sel { border-color: var(--primary); background: var(--light); }
        .pcard.sel::after { content: '✓'; position: absolute; top: 9px; right: 11px; font-size: 12px; font-weight: 700; color: var(--primary); }
        .phead { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .pico { width: 30px; height: 30px; background: var(--bg); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .pnm { font-size: 12.5px; font-weight: 700; color: var(--secondary); }
        .pbdg { font-size: 10px; font-weight: 600; color: var(--gray); background: var(--bg); border: 1px solid var(--border); padding: 2px 8px; border-radius: 20px; margin-left: auto; flex-shrink: 0; }
        .pdesc { font-size: 11.5px; color: var(--gray); line-height: 1.45; }
        .ssep { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--gray); margin: 16px 0 10px; padding-top: 14px; border-top: 1px solid var(--border); }
        .rsum { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 18px; position: sticky; top: 76px; }
        .rsum h3 { font-size: .95rem; font-weight: 800; color: var(--text); margin-bottom: 14px; }
        .rsum-row { background: var(--bg); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: var(--secondary); font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .rsum-empty { font-size: 12px; color: var(--gray); font-style: italic; text-align: center; padding: 12px 0; }
        .rsum-items { list-style: none; display: grid; gap: 6px; margin-bottom: 12px; }
        .rsum-item { display: flex; align-items: flex-start; justify-content: space-between; font-size: 12px; color: var(--text); gap: 6px; }
        .rsum-item-n { display: flex; align-items: center; gap: 5px; }
        .rsum-item-n::before { content: ''; width: 5px; height: 5px; background: var(--primary); border-radius: 50%; flex-shrink: 0; }
        .rsum-pr { font-weight: 600; color: var(--gray); font-size: 11px; flex-shrink: 0; }
        .rdiv { height: 1px; background: var(--border); margin: 10px 0; }
        .rsum-tot { display: flex; justify-content: space-between; align-items: center; }
        .rsum-tot-l { font-size: 12.5px; font-weight: 700; }
        .rsum-tot-v { font-size: 14px; font-weight: 800; color: var(--primary); }
        .rsum-note { font-size: 10.5px; color: var(--gray); margin-top: 8px; line-height: 1.5; }
        .rbottom { display: flex; justify-content: flex-end; margin-top: 18px; }
        .rbtn { font-size: 13px; font-weight: 700; color: #fff; background: var(--primary); border: none; padding: 12px 28px; border-radius: 12px; cursor: pointer; transition: all .2s; box-shadow: 0 6px 16px rgba(0,74,173,.2); }
        .rbtn:hover { background: var(--secondary); transform: translateY(-1px); }
        .rbtn:disabled { opacity: .4; cursor: not-allowed; transform: none; }
        .rsok { text-align: center; padding: 36px 16px; }
        .rsok-ico { font-size: 3rem; margin-bottom: 12px; }
        .rsok h2 { font-size: 1.4rem; font-weight: 800; color: var(--secondary); margin-bottom: 8px; }
        .rsok p { font-size: 13.5px; color: var(--gray); max-width: 360px; margin: 0 auto 18px; line-height: 1.7; }
        .rsok-ref { background: var(--light); border-radius: 9px; padding: 9px 16px; display: inline-block; font-size: 12.5px; font-weight: 700; color: var(--primary); margin-bottom: 18px; }
        .fl { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--primary); display: block; margin-bottom: 6px; font-weight: 600; }
        .fc { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: 'Inter', sans-serif; font-size: 13px; padding: 10px 13px; border-radius: 10px; outline: none; transition: border-color .18s; margin-bottom: 14px; }
        .fc:focus { border-color: var(--primary); background: #fff; }
        .fc::placeholder { color: var(--gray); }
        textarea.fc { height: 78px; resize: none; }

        @media (max-width: 900px) {
          .rw { padding: 16px 12px 32px; }
          .rtitle { font-size: 1.2rem; }
          .rlayout { grid-template-columns: 1fr; }
          .rsum { position: static; order: 2; margin-top: 16px; }
          .rbottom { justify-content: stretch; }
          .rbtn { width: 100%; justify-content: center; }
          .rsl { display: none; }
          .bgrid { grid-template-columns: repeat(2,1fr); }
          .mgrid { grid-template-columns: 1fr; }
          .pgrid { grid-template-columns: 1fr; }
          .rpanel { padding: 16px; }
        }
      `}</style>

      <div className="rw">
        {/* TOP BAR */}
        <div className="rtop">
          <button
            className={`rbk${rs.step === 1 ? ' h' : ''}`}
            onClick={goBack}
          >←</button>
          <div
            className="rtitle"
            dangerouslySetInnerHTML={{ __html: RTITLES[rs.step] || '' }}
          />
        </div>

        {/* STEPS BAR */}
        <div className="rsteps">
          {[1,2,3,4,5,6].map((n, i) => (
            <div key={n} style={{ display: 'contents' }}>
              <div className={`rs${rs.step === n ? ' active' : rs.step > n ? ' done' : ''}`}>
                <div className="rsd">{n}</div>
                <div className="rsl">
                  {['Appareil','Marque','Modèle','Prestations','Coordonnées','Confirmation'][i]}
                </div>
              </div>
              {n < 6 && (
                <div className={`rsline${rs.step > n ? ' done' : ''}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rlayout">
          <div>

            {/* STEP 1: APPAREIL */}
            {rs.step === 1 && (
              <div>
                <div className="rpanel">
                  <div className="rplbl">Sélectionnez votre type d&apos;appareil</div>
                  <div className="dgrid">
                    {[
                      { id: 'smartphone', ico: '📱', name: 'Smartphone' },
                      { id: 'portable', ico: '💻', name: 'PC Portable' },
                      { id: 'fixe', ico: '🖥', name: 'PC Fixe' },
                    ].map(d => (
                      <div
                        key={d.id}
                        className={`dcard${rs.device === d.id ? ' sel' : ''}`}
                        onClick={() => pickDevice(d.id, d.ico, d.name)}
                      >
                        <span className="dico">{d.ico}</span>
                        <div className="dnm">{d.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rbottom">
                  <button
                    className="rbtn"
                    disabled={!canStep1}
                    onClick={() => goStep(2)}
                  >Choisir la marque →</button>
                </div>
              </div>
            )}

            {/* STEP 2: MARQUE */}
            {rs.step === 2 && (
              <div>
                <div
                  className="rpanel"
                  dangerouslySetInnerHTML={{ __html: renderBrandsHTML() }}
                />
                <div className="rbottom">
                  <button
                    className="rbtn"
                    disabled={!canStep2}
                    onClick={() => goStep(3)}
                  >Choisir le modèle →</button>
                </div>
              </div>
            )}

            {/* STEP 3: MODÈLE */}
            {rs.step === 3 && (
              <div>
                <div
                  className="rpanel"
                  dangerouslySetInnerHTML={{ __html: renderModelsHTML() }}
                />
                <div className="rbottom">
                  <button
                    className="rbtn"
                    disabled={!canStep3}
                    onClick={() => goStep(4)}
                  >Choisir les prestations →</button>
                </div>
              </div>
            )}

            {/* STEP 4: PRESTATIONS */}
            {rs.step === 4 && (
              <div>
                <div
                  className="rpanel"
                  dangerouslySetInnerHTML={{ __html: renderPrestsHTML() }}
                />
                <div className="rbottom">
                  <button
                    className="rbtn"
                    disabled={!canStep4}
                    onClick={() => goStep(5)}
                  >Mes coordonnées →</button>
                </div>
              </div>
            )}

            {/* STEP 5: COORDONNÉES */}
            {rs.step === 5 && (
              <div>
                <div className="rpanel">
                  <div className="rplbl">Vos coordonnées</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label className="fl">Prénom *</label>
                      <input className="fc" type="text" placeholder="Jean"
                        value={prenom} onChange={e => setPrenom(e.target.value)} />
                    </div>
                    <div>
                      <label className="fl">Nom *</label>
                      <input className="fc" type="text" placeholder="Dupont"
                        value={nom} onChange={e => setNom(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="fl">Email *</label>
                    <input className="fc" type="email" placeholder="jean@email.fr"
                      value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="fl">Téléphone *</label>
                    <input className="fc" type="tel" placeholder="06 00 00 00 00"
                      value={tel} onChange={e => setTel(e.target.value)} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label className="fl">Description du problème (optionnel)</label>
                    <textarea className="fc" placeholder="Décrivez le problème rencontré…"
                      value={desc} onChange={e => setDesc(e.target.value)} />
                  </div>
                </div>
                <div className="rbottom">
                  <button
                    className="rbtn"
                    disabled={!canStep5 || sending}
                    onClick={sendRequest}
                  >{sending ? 'Envoi…' : 'Envoyer ma demande →'}</button>
                </div>
              </div>
            )}

            {/* STEP 6: CONFIRMATION */}
            {rs.step === 6 && (
              <div>
                <div className="rpanel">
                  <div className="rsok">
                    <div className="rsok-ico">✅</div>
                    <h2>Demande envoyée !</h2>
                    <p>Nous avons bien reçu votre demande de réparation, nous vous contacterons dans un délai de 2h.<br /><br />Bien cordialement,</p>
                    <div className="rsok-ref">Référence : {confirmRef}</div>
                    <div
                      style={{ textAlign: 'left', background: 'var(--bg)', borderRadius: 10, padding: '14px 18px', marginBottom: 18, fontSize: '12.5px', color: 'var(--secondary)', lineHeight: 2 }}
                      dangerouslySetInnerHTML={{ __html: confirmDetails }}
                    />
                    <button className="rbtn" onClick={reset} style={{ background: 'var(--green)' }}>
                      Nouvelle demande
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RECAP */}
          <div className="rsum">
            <h3>Récapitulatif</h3>
            {!rs.deviceName
              ? <div className="rsum-empty">Aucun appareil sélectionné</div>
              : <div className="rsum-row"><span>{rs.deviceIco}</span> {rs.deviceName}</div>
            }
            {(rs.brandName || rs.modelName) && (
              <div className="rsum-row">
                {rs.modelName
                  ? <>📦 {rs.brandName} · {rs.modelName}</>
                  : <>🏷 {rs.brandName}</>
                }
              </div>
            )}
            {recapPrests.length === 0
              ? <div className="rsum-empty">Aucune prestation</div>
              : <ul className="rsum-items">
                  {recapPrests.map(p => (
                    <li key={p.id} className="rsum-item">
                      <span className="rsum-item-n">{p.name}</span>
                      <span className="rsum-pr">Sur devis</span>
                    </li>
                  ))}
                </ul>
            }
            <div className="rdiv" />
            <div className="rsum-tot">
              <span className="rsum-tot-l">Total estimé</span>
              <span className="rsum-tot-v">Sur devis</span>
            </div>
            <p className="rsum-note">💡 Diagnostic offert. Devis confirmé avant toute intervention. Vous ne payez qu&apos;une fois la réparation effectuée.</p>
          </div>
        </div>
      </div>
    </>
  );
}
