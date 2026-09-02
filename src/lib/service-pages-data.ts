import type { AreaId } from "@/lib/car-selector-data";

export { WHATSAPP_NUMBER } from "@/lib/whatsapp";
export const BRAND = "AUTO EXPRESS 76";
export const SIGNATURE = "Vous montrez. On s'occupe du reste.";
export const PROMISE = "Votre problème auto, identifié en quelques clics.";
export const DISCLAIMER =
  "Ces informations sont données à titre indicatif. Seul un contrôle du véhicule permet d'identifier précisément l'origine d'une panne.";

export type ServiceComponent = {
  slug: string;
  name: string;
  /** À quoi sert cette pièce ? */
  role: string;
  /** Pourquoi est-elle importante ? */
  importance: string;
  commonSymptoms: string[];
  commonCauses: string[];
  otherPossibleCauses: string[];
  relatedService: string;
  /** position du hotspot dans le viewBox 980x430 */
  x: number;
  y: number;
  /** décalage du label */
  dx: number;
  dy: number;
};

export type CauseFamily = { title: string; text: string };

export type PageSymptom = {
  id: string;
  label: string;
  service: string;
  causeFamilies: CauseFamily[];
};

export type ServicePage = {
  /** segment de route, ex: "freinage-le-havre" */
  slug: string;
  /** nom court pour breadcrumb / liens */
  shortName: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** zone du véhicule mise en avant */
  area: AreaId;
  focus: { x: number; y: number; scale: number };
  /** service par défaut transmis à l'atelier */
  service: string;
  components: ServiceComponent[];
  symptoms: PageSymptom[];
  sections: { h2: string; body: string; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  related: { slug: string; label: string; note: string }[];
};

const c = (v: ServiceComponent) => v;

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "freinage-le-havre": {
    slug: "freinage-le-havre",
    shortName: "Freinage",
    h1: "Freinage au Havre",
    title: "Freinage au Havre | Auto Express 76",
    description:
      "Freins qui grincent, vibrations ou témoin allumé ? Découvrez les principaux signes d'usure et demandez un contrôle de votre freinage chez Auto Express 76 au Havre.",
    intro:
      "Des freins qui grincent, une pédale inhabituelle ou des vibrations ? Auto Express 76 vous aide à identifier les premiers signes avant de contrôler votre véhicule.",
    area: "braking",
    focus: { x: 268, y: 300, scale: 1.85 },
    service: "freinage",
    components: [
      c({
        slug: "plaquettes",
        name: "Plaquettes de frein",
        role: "Les plaquettes viennent serrer le disque pour ralentir la roue. C'est la pièce d'usure principale du système de freinage.",
        importance:
          "Une garniture trop fine réduit l'efficacité du freinage et peut endommager le disque, ce qui augmente fortement le coût de la réparation.",
        commonSymptoms: [
          "Grincement ou sifflement au freinage",
          "Bruit métallique continu",
          "Témoin d'usure allumé au tableau de bord",
        ],
        commonCauses: ["Usure normale liée au kilométrage", "Conduite urbaine avec freinages fréquents"],
        otherPossibleCauses: [
          "Étrier qui ne se relâche pas complètement",
          "Poussière ou corrosion entre la plaquette et son support",
        ],
        relatedService: "freinage",
        x: 274,
        y: 284,
        dx: 84,
        dy: -34,
      }),
      c({
        slug: "disques",
        name: "Disques de frein",
        role: "Le disque est la surface sur laquelle les plaquettes frottent. Il évacue aussi la chaleur produite au freinage.",
        importance:
          "Un disque usé, marqué ou déformé dégrade la stabilité du véhicule au freinage et allonge la distance d'arrêt.",
        commonSymptoms: [
          "Vibrations dans le volant ou la pédale au freinage",
          "Freinage irrégulier",
          "Bruit sourd à basse vitesse",
        ],
        commonCauses: ["Usure et perte d'épaisseur", "Échauffement répété (descente, charge, remorque)"],
        otherPossibleCauses: ["Corrosion après une immobilisation prolongée", "Serrage inégal lors d'un montage de roue"],
        relatedService: "freinage",
        x: 240,
        y: 306,
        dx: -6,
        dy: 88,
      }),
      c({
        slug: "etriers",
        name: "Étriers",
        role: "L'étrier applique la pression hydraulique sur les plaquettes lorsque vous appuyez sur la pédale.",
        importance:
          "Un étrier qui coince peut provoquer une usure asymétrique, un échauffement anormal et une sensation de véhicule qui tire.",
        commonSymptoms: [
          "Le véhicule tire d'un côté au freinage",
          "Odeur de chaud après un trajet",
          "Une roue nettement plus chaude que l'autre",
        ],
        commonCauses: ["Grippage des colonnettes ou du piston", "Corrosion liée à l'humidité et au sel"],
        otherPossibleCauses: ["Flexible de frein en fin de vie", "Défaut d'entretien du système hydraulique"],
        relatedService: "freinage",
        x: 284,
        y: 332,
        dx: 88,
        dy: 34,
      }),
      c({
        slug: "liquide-de-frein",
        name: "Liquide de frein",
        role: "Le liquide transmet l'effort de la pédale jusqu'aux étriers. Il est hygroscopique : il absorbe l'humidité avec le temps.",
        importance:
          "Un liquide chargé en eau perd en performance à chaud et peut donner une pédale molle ou plus longue.",
        commonSymptoms: ["Pédale spongieuse ou qui s'enfonce", "Témoin de frein allumé", "Freinage moins mordant à chaud"],
        commonCauses: ["Vieillissement du liquide", "Intervalle d'entretien dépassé"],
        otherPossibleCauses: ["Fuite sur un flexible ou un raccord", "Air présent dans le circuit"],
        relatedService: "freinage",
        x: 196,
        y: 258,
        dx: -78,
        dy: -38,
      }),
    ],
    symptoms: [
      {
        id: "grincement",
        label: "Un grincement au freinage",
        service: "freinage",
        causeFamilies: [
          { title: "Usure des garnitures", text: "Une plaquette en fin de vie peut notamment provoquer un sifflement métallique." },
          { title: "Dépôt ou corrosion", text: "Après quelques jours sans rouler, un film de rouille peut être à l'origine du bruit." },
          { title: "Mauvais contact plaquette / support", text: "Un jeu ou un manque de lubrification des points de contact peut être en cause." },
        ],
      },
      {
        id: "vibrations",
        label: "Des vibrations quand je freine",
        service: "freinage",
        causeFamilies: [
          { title: "Géométrie du disque", text: "Un disque déformé peut notamment provoquer des vibrations dans le volant." },
          { title: "Échauffement", text: "Des freinages longs et répétés peuvent être liés à un voile thermique." },
          { title: "Fixation des roues", text: "Un serrage irrégulier peut également générer des vibrations. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "pedale",
        label: "Une pédale inhabituelle",
        service: "freinage",
        causeFamilies: [
          { title: "Circuit hydraulique", text: "De l'air ou un liquide vieilli peut être lié à une pédale spongieuse." },
          { title: "Fuite", text: "Une baisse de niveau peut notamment provoquer une pédale plus longue." },
          { title: "Assistance de freinage", text: "Un défaut d'assistance peut rendre la pédale dure. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "distance",
        label: "Une distance de freinage plus importante",
        service: "freinage",
        causeFamilies: [
          { title: "Usure généralisée", text: "Plaquettes et disques en fin de vie figurent parmi les causes possibles." },
          { title: "Étrier partiellement bloqué", text: "Un piston grippé peut réduire l'efficacité d'une roue." },
          { title: "Adhérence des pneus", text: "Des pneus usés peuvent aussi allonger la distance d'arrêt." },
        ],
      },
      {
        id: "voyant",
        label: "Un voyant de frein allumé",
        service: "freinage",
        causeFamilies: [
          { title: "Niveau de liquide", text: "Une baisse de niveau peut notamment déclencher le témoin." },
          { title: "Capteur d'usure", text: "Le contacteur de plaquette peut être à l'origine de l'alerte." },
          { title: "Frein de stationnement", text: "Un frein mal desserré ou un capteur défaillant peut aussi être en cause." },
        ],
      },
    ],
    sections: [
      {
        h2: "Quand faire contrôler son freinage ?",
        body: "Il n'existe pas d'intervalle universel : tout dépend de votre usage. Un véhicule qui roule majoritairement au Havre, entre feux, ronds-points et côtes, sollicite bien plus ses freins qu'un véhicule autoroutier.",
        bullets: [
          "Au moindre bruit ou changement de sensation à la pédale",
          "Avant un long trajet ou un départ en vacances",
          "Avant le contrôle technique",
          "Lors du montage de pneus, l'accès aux disques est facilité",
        ],
      },
    ],
    faq: [
      {
        q: "Un grincement signifie-t-il forcément que mes plaquettes sont mortes ?",
        a: "Non. Un bruit au freinage peut être lié à l'usure, mais aussi à de la corrosion de surface ou à un point de contact mal lubrifié. Seul un contrôle permet de confirmer.",
      },
      {
        q: "Faut-il toujours changer les disques avec les plaquettes ?",
        a: "Pas systématiquement. L'épaisseur et l'état de surface du disque sont mesurés : s'ils restent dans les tolérances constructeur, seules les plaquettes sont remplacées.",
      },
      {
        q: "Puis-je continuer à rouler avec un voyant de frein allumé ?",
        a: "C'est déconseillé. Le témoin peut signaler une baisse de niveau de liquide, donc une fuite possible. Faites contrôler le véhicule rapidement.",
      },
    ],
    related: [
      { slug: "pneus-le-havre", label: "Pneumatiques", note: "L'adhérence conditionne directement votre distance d'arrêt." },
      { slug: "suspension-le-havre", label: "Suspension", note: "Un amortisseur fatigué modifie le comportement au freinage." },
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Un témoin allumé mérite une lecture des défauts." },
    ],
  },

  "pneus-le-havre": {
    slug: "pneus-le-havre",
    shortName: "Pneumatiques",
    h1: "Pneumatiques au Havre",
    title: "Pneus au Havre | Auto Express 76",
    description:
      "Usure irrégulière, vibrations, perte de pression ou véhicule qui tire ? Comprenez les signes liés à vos pneus et faites contrôler votre train roulant chez Auto Express 76 au Havre.",
    intro:
      "Une usure qui n'est pas régulière, des vibrations à vitesse stabilisée ou une pression qui baisse ? Auto Express 76 vous aide à repérer ce qui se joue au niveau de vos roues avant tout contrôle.",
    area: "front-wheel",
    focus: { x: 250, y: 300, scale: 1.9 },
    service: "pneumatiques",
    components: [
      c({
        slug: "pneumatique",
        name: "Pneumatique",
        role: "Seul point de contact entre votre véhicule et la route, sur une surface équivalente à peine à quatre cartes postales.",
        importance:
          "L'état de la bande de roulement conditionne le freinage, la tenue de route et le comportement sur chaussée mouillée — fréquente en bord de mer.",
        commonSymptoms: ["Usure irrégulière", "Bruit de roulement", "Adhérence dégradée sous la pluie"],
        commonCauses: ["Pression mal adaptée", "Kilométrage et vieillissement de la gomme"],
        otherPossibleCauses: ["Géométrie déréglée", "Amortisseur fatigué qui fait sautiller la roue"],
        relatedService: "pneumatiques",
        x: 254,
        y: 240,
        dx: 74,
        dy: -44,
      }),
      c({
        slug: "valve",
        name: "Valve et capteur de pression",
        role: "La valve maintient l'air dans le pneu ; sur beaucoup de véhicules, elle intègre un capteur de pression (TPMS).",
        importance: "Une valve fatiguée peut être à l'origine d'une perte de pression lente, difficile à repérer à l'œil.",
        commonSymptoms: ["Perte de pression régulière sur une seule roue", "Témoin de pression allumé"],
        commonCauses: ["Vieillissement du caoutchouc de valve", "Corrosion sur valve métallique"],
        otherPossibleCauses: ["Pile de capteur TPMS en fin de vie", "Micro-perforation dans la bande de roulement"],
        relatedService: "pneumatiques",
        x: 216,
        y: 330,
        dx: -78,
        dy: 40,
      }),
      c({
        slug: "jante",
        name: "Jante",
        role: "La jante porte le pneu et assure son étanchéité au niveau du talon.",
        importance: "Une jante voilée ou fissurée peut notamment provoquer des vibrations et une perte de pression progressive.",
        commonSymptoms: ["Vibrations à vitesse stabilisée", "Dégonflement lent après un choc de trottoir"],
        commonCauses: ["Choc contre un trottoir ou un nid-de-poule", "Corrosion sur jante alliage"],
        otherPossibleCauses: ["Masse d'équilibrage perdue", "Montage mal équilibré"],
        relatedService: "pneumatiques",
        x: 196,
        y: 272,
        dx: -80,
        dy: -28,
      }),
      c({
        slug: "geometrie",
        name: "Géométrie du train roulant",
        role: "La géométrie définit les angles des roues (parallélisme, carrossage) par rapport à la route et au châssis.",
        importance:
          "Un réglage hors tolérance peut notamment provoquer une usure prématurée d'un seul côté de la bande de roulement.",
        commonSymptoms: ["Le véhicule tire d'un côté", "Volant décentré en ligne droite", "Usure sur un bord du pneu"],
        commonCauses: ["Choc de trottoir ou nid-de-poule", "Usure des éléments de liaison au sol"],
        otherPossibleCauses: ["Pressions déséquilibrées", "Déformation après remplacement d'une pièce de suspension"],
        relatedService: "géométrie",
        x: 300,
        y: 316,
        dx: 84,
        dy: 44,
      }),
    ],
    symptoms: [
      {
        id: "usure-irreguliere",
        label: "Une usure irrégulière de mes pneus",
        service: "pneumatiques",
        causeFamilies: [
          { title: "Réglage du train roulant", text: "Un parallélisme hors tolérance peut notamment provoquer une usure sur un seul bord." },
          { title: "Pression", text: "Un sous-gonflage use les épaules, un surgonflage use le centre." },
          { title: "Liaison au sol", text: "Un amortisseur ou une rotule fatiguée figure parmi les causes possibles." },
        ],
      },
      {
        id: "vibrations-pneus",
        label: "Des vibrations en roulant",
        service: "pneumatiques",
        causeFamilies: [
          { title: "Équilibrage", text: "Une masse perdue peut être liée à une vibration apparaissant vers 90-110 km/h." },
          { title: "Déformation", text: "Jante voilée ou hernie sur le flanc peuvent également être en cause." },
        ],
      },
      {
        id: "perte-pression",
        label: "Une perte de pression",
        service: "pneumatiques",
        causeFamilies: [
          { title: "Valve", text: "Une valve fatiguée peut provoquer une fuite lente et régulière." },
          { title: "Corps étranger", text: "Vis ou clou peuvent être à l'origine d'une micro-fuite." },
          { title: "Étanchéité jante / pneu", text: "La corrosion du talon de jante figure parmi les causes possibles." },
        ],
      },
      {
        id: "tire-cote",
        label: "Le véhicule tire d'un côté",
        service: "géométrie",
        causeFamilies: [
          { title: "Géométrie", text: "Un parallélisme déréglé peut notamment provoquer une dérive constante." },
          { title: "Pressions inégales", text: "Un écart entre deux roues d'un même essieu peut suffire." },
          { title: "Freinage", text: "Un étrier partiellement bloqué peut aussi tirer le véhicule. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "bruit-roulement",
        label: "Un bruit de roulement",
        service: "pneumatiques",
        causeFamilies: [
          { title: "Usure en dents de scie", text: "Une bande de roulement irrégulière peut générer un ronflement." },
          { title: "Roulement de roue", text: "Un bruit qui varie en courbe peut être lié au roulement." },
        ],
      },
    ],
    sections: [
      {
        h2: "Rouler au Havre : ce qui use vos pneus",
        body: "Entre les côtes, les pavés de certains quartiers et l'air marin, les pneumatiques travaillent beaucoup. Une vérification mensuelle de la pression à froid reste le geste le plus rentable.",
        bullets: [
          "Témoins d'usure : limite légale à 1,6 mm sur la bande de roulement",
          "Contrôler la pression à froid, y compris la roue de secours",
          "Surveiller l'âge du pneu (code DOT) même à faible kilométrage",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il changer les pneus par deux ou par quatre ?",
        a: "Le remplacement se fait au minimum par essieu, avec des pneus de mêmes dimensions et indices. Les pneus les plus neufs sont généralement montés à l'arrière pour la stabilité.",
      },
      {
        q: "Un contrôle de géométrie est-il nécessaire après un changement de pneus ?",
        a: "Ce n'est pas systématique, mais il est recommandé si vous avez constaté une usure irrégulière, une dérive du véhicule ou un choc récent.",
      },
    ],
    related: [
      { slug: "suspension-le-havre", label: "Suspension", note: "Une usure irrégulière est souvent liée au train roulant." },
      { slug: "freinage-le-havre", label: "Freinage", note: "Pneus et freins forment un même ensemble de sécurité." },
      { slug: "revision-vidange-le-havre", label: "Révision", note: "Contrôle complet des points d'usure." },
    ],
  },

  "suspension-le-havre": {
    slug: "suspension-le-havre",
    shortName: "Suspension",
    h1: "Suspension et train roulant au Havre",
    title: "Suspension au Havre | Auto Express 76",
    description:
      "Bruits sur les bosses, rebonds ou tenue de route inhabituelle ? Comprenez le rôle des amortisseurs, ressorts et silentblocs et faites contrôler votre suspension au Havre.",
    intro:
      "Des bruits sur les dos-d'âne, un véhicule qui rebondit ou une tenue de route qui a changé ? Auto Express 76 vous aide à situer ce qui se passe sous votre voiture avant contrôle.",
    area: "suspension",
    focus: { x: 600, y: 292, scale: 1.95 },
    service: "suspension",
    components: [
      c({
        slug: "amortisseur",
        name: "Amortisseur",
        role: "Il maîtrise les oscillations du ressort pour garder la roue en contact avec la route.",
        importance:
          "Un amortisseur fatigué allonge la distance de freinage et dégrade la stabilité, particulièrement sur route mouillée.",
        commonSymptoms: ["Rebonds après une bosse", "Tenue de route flottante", "Usure irrégulière des pneus"],
        commonCauses: ["Usure liée au kilométrage", "Fuite d'huile de la tige"],
        otherPossibleCauses: ["Coupelle supérieure dégradée", "Butée de suspension en fin de vie"],
        relatedService: "suspension",
        x: 600,
        y: 262,
        dx: -8,
        dy: -56,
      }),
      c({
        slug: "ressort",
        name: "Ressort de suspension",
        role: "Il supporte le poids du véhicule et absorbe les irrégularités de la chaussée.",
        importance: "Un ressort cassé modifie la hauteur de caisse et peut endommager le pneu ou la carrosserie.",
        commonSymptoms: ["Le véhicule s'affaisse d'un côté", "Claquement sec au passage d'un trou"],
        commonCauses: ["Corrosion (sel, air marin)", "Fatigue du métal"],
        otherPossibleCauses: ["Choc violent contre un obstacle", "Surcharge répétée"],
        relatedService: "suspension",
        x: 626,
        y: 296,
        dx: 82,
        dy: -18,
      }),
      c({
        slug: "triangle",
        name: "Triangle de suspension",
        role: "Il relie la roue au châssis et guide ses mouvements verticaux.",
        importance: "Un triangle avec du jeu peut être lié à une direction imprécise et à une usure accélérée des pneus.",
        commonSymptoms: ["Claquement en manœuvre", "Direction imprécise", "Vibrations à basse vitesse"],
        commonCauses: ["Usure de la rotule", "Silentblocs détériorés"],
        otherPossibleCauses: ["Déformation après un choc", "Corrosion des fixations"],
        relatedService: "suspension",
        x: 574,
        y: 318,
        dx: -84,
        dy: 38,
      }),
      c({
        slug: "silentbloc",
        name: "Silentbloc",
        role: "Petite pièce en caoutchouc qui filtre les vibrations entre les éléments métalliques.",
        importance: "Un silentbloc craquelé laisse passer bruits et vibrations et modifie la précision du train roulant.",
        commonSymptoms: ["Bruit sourd sur les bosses", "Vibrations transmises dans l'habitacle"],
        commonCauses: ["Vieillissement du caoutchouc", "Écarts de température et projections routières"],
        otherPossibleCauses: ["Contact avec des fluides (huile, liquide)", "Contrainte anormale après un choc"],
        relatedService: "suspension",
        x: 556,
        y: 288,
        dx: -84,
        dy: -34,
      }),
      c({
        slug: "train-roulant",
        name: "Train roulant",
        role: "L'ensemble des pièces qui relient les roues au véhicule : rotules, biellettes, barre stabilisatrice, roulements.",
        importance: "C'est l'ensemble qui détermine la trajectoire et la stabilité. Un jeu à un seul point se ressent partout.",
        commonSymptoms: ["Véhicule qui tire", "Bruits variés en virage", "Volant qui vibre"],
        commonCauses: ["Usure normale", "Chocs de trottoir répétés"],
        otherPossibleCauses: ["Géométrie déréglée", "Roulement de roue bruyant"],
        relatedService: "suspension",
        x: 660,
        y: 320,
        dx: 82,
        dy: 40,
      }),
    ],
    symptoms: [
      {
        id: "bruit-bosses",
        label: "Un bruit sur les bosses",
        service: "suspension",
        causeFamilies: [
          { title: "Éléments filtrants", text: "Silentblocs ou butées dégradés peuvent notamment provoquer un bruit sourd." },
          { title: "Articulations", text: "Rotule ou biellette avec du jeu figurent parmi les causes possibles." },
          { title: "Amortisseur", text: "Une coupelle ou une tige fatiguée peut aussi claquer." },
        ],
      },
      {
        id: "rebonds",
        label: "La voiture rebondit",
        service: "suspension",
        causeFamilies: [
          { title: "Amortisseurs", text: "Une perte d'efficacité hydraulique peut être liée à ces oscillations." },
          { title: "Ressorts", text: "Une fatigue de ressort peut également modifier le comportement." },
        ],
      },
      {
        id: "tenue-route",
        label: "Une tenue de route inhabituelle",
        service: "suspension",
        causeFamilies: [
          { title: "Liaison au sol", text: "Un jeu dans le train roulant peut notamment provoquer un flottement." },
          { title: "Géométrie", text: "Des angles déréglés figurent parmi les causes possibles." },
          { title: "Pneumatiques", text: "Pression ou usure inadaptées peuvent aussi être en cause." },
        ],
      },
      {
        id: "affaissement",
        label: "Le véhicule s'affaisse",
        service: "suspension",
        causeFamilies: [
          { title: "Ressort", text: "Une rupture peut provoquer un affaissement visible d'un seul côté." },
          { title: "Suspension pilotée ou pneumatique", text: "Une fuite ou un défaut de compresseur peut être en cause selon l'équipement." },
        ],
      },
    ],
    sections: [
      {
        h2: "Pourquoi la suspension s'use vite en Normandie",
        body: "Humidité, sel et voirie irrégulière accélèrent la corrosion des ressorts et le vieillissement des caoutchoucs. Un contrôle visuel régulier permet souvent d'anticiper avant que le confort ne se dégrade franchement.",
      },
    ],
    faq: [
      {
        q: "À quel kilométrage change-t-on des amortisseurs ?",
        a: "Il n'y a pas de règle absolue. L'usure dépend de la route, de la charge et du style de conduite. C'est l'état constaté au contrôle qui décide, pas uniquement le compteur.",
      },
      {
        q: "Un amortisseur se change-t-il par paire ?",
        a: "Oui, par essieu. Remplacer un seul côté crée un déséquilibre de comportement entre les deux roues.",
      },
    ],
    related: [
      { slug: "pneus-le-havre", label: "Pneumatiques", note: "L'usure des pneus raconte l'état du train roulant." },
      { slug: "freinage-le-havre", label: "Freinage", note: "Stabilité et freinage sont directement liés." },
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Pour les suspensions pilotées et leurs capteurs." },
    ],
  },

  "embrayage-le-havre": {
    slug: "embrayage-le-havre",
    shortName: "Embrayage",
    h1: "Embrayage au Havre",
    title: "Embrayage au Havre | Auto Express 76",
    description:
      "Patinage, rapports difficiles à passer ou point de patinage inhabituel ? Comprenez les signes d'usure de votre embrayage et faites contrôler votre véhicule au Havre.",
    intro:
      "Un moteur qui monte dans les tours sans que la voiture accélère, des vitesses plus dures à enclencher ? Auto Express 76 vous aide à décrire précisément ce que vous ressentez avant contrôle.",
    area: "transmission",
    focus: { x: 392, y: 292, scale: 1.95 },
    service: "embrayage",
    components: [
      c({
        slug: "disque-embrayage",
        name: "Disque d'embrayage",
        role: "Il transmet le couple du moteur à la boîte de vitesses par friction, et permet de couper cette liaison à la pédale.",
        importance: "C'est la pièce d'usure du système : sa garniture s'amincit à chaque démarrage et changement de rapport.",
        commonSymptoms: ["Patinage en accélération", "Odeur de brûlé après une côte", "Point de patinage très haut"],
        commonCauses: ["Usure liée à l'usage urbain", "Conduite avec le pied posé sur la pédale"],
        otherPossibleCauses: ["Fuite d'huile venant du moteur ou de la boîte", "Mécanisme qui ne relâche pas correctement"],
        relatedService: "embrayage",
        x: 356,
        y: 292,
        dx: -84,
        dy: 40,
      }),
      c({
        slug: "mecanisme",
        name: "Mécanisme (plateau de pression)",
        role: "Il plaque le disque contre le volant moteur avec une pression calibrée.",
        importance: "Un mécanisme fatigué peut notamment provoquer un patinage même avec un disque en bon état.",
        commonSymptoms: ["Pédale dure ou irrégulière", "À-coups au démarrage", "Patinage sous charge"],
        commonCauses: ["Fatigue du diaphragme", "Échauffement répété"],
        otherPossibleCauses: ["Déformation après une surchauffe", "Commande hydraulique défaillante"],
        relatedService: "embrayage",
        x: 388,
        y: 286,
        dx: -10,
        dy: -54,
      }),
      c({
        slug: "butee",
        name: "Butée d'embrayage",
        role: "Elle transmet l'effort de la pédale au mécanisme pour désaccoupler moteur et boîte.",
        importance: "Une butée usée est une source fréquente de bruit et impose souvent une dépose complète pour être remplacée.",
        commonSymptoms: ["Sifflement pédale enfoncée", "Bruit qui disparaît pédale relâchée"],
        commonCauses: ["Usure mécanique", "Maintien prolongé de la pédale à l'arrêt"],
        otherPossibleCauses: ["Butée hydraulique en fuite", "Défaut d'alignement à la repose"],
        relatedService: "embrayage",
        x: 424,
        y: 300,
        dx: 84,
        dy: 40,
      }),
      c({
        slug: "volant-moteur",
        name: "Volant moteur",
        role: "Il stocke l'inertie du moteur et sert de surface d'appui au disque. Souvent bimasse sur les motorisations récentes.",
        importance: "Un volant bimasse fatigué peut être lié à des vibrations au ralenti et à des bruits au démarrage.",
        commonSymptoms: ["Vibrations au ralenti", "Cliquetis à la coupure du moteur", "Tremblements au démarrage"],
        commonCauses: ["Usure du système d'amortissement interne", "Kilométrage élevé"],
        otherPossibleCauses: ["Défaut d'injection générant des à-coups", "Support moteur détérioré"],
        relatedService: "embrayage",
        x: 336,
        y: 262,
        dx: -84,
        dy: -34,
      }),
    ],
    symptoms: [
      {
        id: "patinage",
        label: "Le moteur monte dans les tours sans accélérer",
        service: "embrayage",
        causeFamilies: [
          { title: "Garniture d'embrayage", text: "Une usure avancée peut notamment provoquer ce patinage." },
          { title: "Mécanisme", text: "Une perte de pression du plateau figure parmi les causes possibles." },
          { title: "Pollution par huile", text: "Une fuite venant du moteur ou de la boîte peut aussi être en cause." },
        ],
      },
      {
        id: "rapports-durs",
        label: "Des rapports difficiles à passer",
        service: "embrayage",
        causeFamilies: [
          { title: "Commande d'embrayage", text: "Câble ou circuit hydraulique peuvent être liés à un débrayage incomplet." },
          { title: "Boîte de vitesses", text: "Synchros usés figurent parmi les causes possibles. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "bruit-embrayage",
        label: "Un bruit à l'appui sur la pédale",
        service: "embrayage",
        causeFamilies: [
          { title: "Butée", text: "Une butée usée peut notamment provoquer un sifflement pédale enfoncée." },
          { title: "Volant bimasse", text: "Un jeu interne peut générer un bruit métallique au ralenti." },
        ],
      },
      {
        id: "point-patinage",
        label: "Un point de patinage inhabituel",
        service: "embrayage",
        causeFamilies: [
          { title: "Usure du disque", text: "Le point remonte progressivement à mesure que la garniture s'amincit." },
          { title: "Réglage de commande", text: "Un jeu mal réglé ou de l'air dans le circuit peut aussi déplacer le point." },
        ],
      },
    ],
    sections: [
      {
        h2: "Ce qui use un embrayage plus vite",
        body: "L'usage urbain, les démarrages en côte et les manœuvres répétées sollicitent fortement la garniture. Au Havre, les trajets courts et vallonnés font partie des usages les plus exigeants pour cette pièce.",
        bullets: [
          "Éviter de garder le pied posé sur la pédale",
          "Ne pas maintenir l'embrayage en côte : utiliser le frein",
          "Faire contrôler dès les premiers signes de patinage",
        ],
      },
    ],
    faq: [
      {
        q: "Peut-on rouler avec un embrayage qui patine ?",
        a: "C'est risqué : le patinage s'aggrave rapidement et peut endommager le volant moteur, ce qui augmente le coût de l'intervention.",
      },
      {
        q: "Change-t-on toujours le volant moteur avec l'embrayage ?",
        a: "Non. Son état est vérifié à la dépose : s'il est dans les tolérances, il peut être conservé. Sur un bimasse fatigué, le remplacement est souvent conseillé pour éviter une seconde intervention.",
      },
    ],
    related: [
      { slug: "boite-automatique-le-havre", label: "Boîte automatique", note: "Autre famille de transmission, autres symptômes." },
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Pour distinguer un défaut moteur d'un défaut de transmission." },
      { slug: "revision-vidange-le-havre", label: "Révision", note: "Contrôle des fuites et des niveaux." },
    ],
  },

  "boite-automatique-le-havre": {
    slug: "boite-automatique-le-havre",
    shortName: "Boîte automatique",
    h1: "Boîte automatique au Havre",
    title: "Boîte automatique au Havre | Auto Express 76",
    description:
      "À-coups, passages lents ou comportement inhabituel de votre boîte automatique ? Comprenez les signes possibles et faites contrôler votre transmission au Havre chez Auto Express 76.",
    intro:
      "Des à-coups entre deux rapports, des passages qui tardent ou un comportement qui a changé ? Auto Express 76 vous aide à décrire précisément le fonctionnement de votre boîte avant contrôle.",
    area: "transmission",
    focus: { x: 430, y: 292, scale: 1.9 },
    service: "boîte automatique",
    components: [
      c({
        slug: "boite",
        name: "Boîte de vitesses automatique",
        role: "Elle sélectionne seule le rapport adapté à la vitesse, à la charge et à votre demande d'accélération.",
        importance: "C'est un ensemble mécanique, hydraulique et électronique : un symptôme peut venir de l'une ou l'autre de ces briques.",
        commonSymptoms: ["Passages lents", "À-coups", "Mode dégradé (rapport bloqué)"],
        commonCauses: ["Huile de transmission en fin de vie", "Usure interne liée au kilométrage"],
        otherPossibleCauses: ["Défaut électronique de commande", "Capteur de régime ou de température en défaut"],
        relatedService: "boîte automatique",
        x: 398,
        y: 286,
        dx: -12,
        dy: -54,
      }),
      c({
        slug: "huile-transmission",
        name: "Huile de transmission",
        role: "Elle lubrifie, refroidit et transmet la pression hydraulique nécessaire aux passages de rapports.",
        importance: "Contrairement à une idée répandue, elle n'est pas toujours « à vie » : son état influence directement la qualité des passages.",
        commonSymptoms: ["Passages plus brutaux à froid", "À-coups en circulation dense"],
        commonCauses: ["Vieillissement du fluide", "Usage urbain et remorquage"],
        otherPossibleCauses: ["Niveau incorrect", "Fuite au carter ou au radiateur d'huile"],
        relatedService: "boîte automatique",
        x: 372,
        y: 312,
        dx: -86,
        dy: 40,
      }),
      c({
        slug: "convertisseur",
        name: "Convertisseur de couple",
        role: "Il remplace l'embrayage : il transmet le couple par un couplage hydraulique entre moteur et boîte.",
        importance: "Un défaut de verrouillage du convertisseur peut notamment provoquer des vibrations à vitesse stabilisée.",
        commonSymptoms: ["Vibrations à allure stabilisée", "Régime moteur qui s'emballe légèrement", "Patinage à la reprise"],
        commonCauses: ["Usure de la garniture de pontage", "Fluide dégradé"],
        otherPossibleCauses: ["Défaut de commande électro-hydraulique", "Encrassement du circuit"],
        relatedService: "boîte automatique",
        x: 458,
        y: 296,
        dx: 86,
        dy: -18,
      }),
      c({
        slug: "commande",
        name: "Système de commande",
        role: "Calculateur, électrovannes et capteurs pilotent les passages de rapports en temps réel.",
        importance: "Beaucoup de comportements inhabituels viennent de la partie pilotage, pas forcément d'une usure mécanique.",
        commonSymptoms: ["Mode dégradé", "Voyant boîte allumé", "Rapport bloqué"],
        commonCauses: ["Électrovanne encrassée", "Capteur en défaut"],
        otherPossibleCauses: ["Faisceau électrique détérioré", "Mise à jour logicielle nécessaire"],
        relatedService: "diagnostic",
        x: 494,
        y: 316,
        dx: 84,
        dy: 42,
      }),
    ],
    symptoms: [
      {
        id: "a-coups",
        label: "Des à-coups entre les rapports",
        service: "boîte automatique",
        causeFamilies: [
          { title: "État du fluide", text: "Une huile dégradée peut notamment provoquer des passages irréguliers." },
          { title: "Pilotage hydraulique", text: "Une électrovanne encrassée figure parmi les causes possibles." },
          { title: "Convertisseur", text: "Un pontage capricieux peut aussi générer des à-coups." },
        ],
      },
      {
        id: "passages-lents",
        label: "Des passages de rapports lents",
        service: "boîte automatique",
        causeFamilies: [
          { title: "Pression hydraulique", text: "Un niveau ou une pression insuffisante peut être liée à ce retard." },
          { title: "Capteurs", text: "Une information erronée transmise au calculateur peut modifier la stratégie de passage." },
        ],
      },
      {
        id: "mode-degrade",
        label: "La boîte s'est mise en sécurité",
        service: "diagnostic",
        causeFamilies: [
          { title: "Défaut mémorisé", text: "Le calculateur peut figer un rapport pour protéger la mécanique. Une lecture des défauts est nécessaire." },
          { title: "Température", text: "Une surchauffe du fluide peut aussi déclencher ce mode." },
        ],
      },
      {
        id: "bruit-boite",
        label: "Un bruit inhabituel",
        service: "boîte automatique",
        causeFamilies: [
          { title: "Lubrification", text: "Un niveau bas peut notamment provoquer un bruit de pompe." },
          { title: "Usure interne", text: "Roulements ou trains épicycloïdaux figurent parmi les causes possibles." },
        ],
      },
    ],
    sections: [
      {
        h2: "Entretenir une boîte automatique",
        body: "Un remplacement du fluide selon les préconisations constructeur reste le meilleur moyen de préserver une boîte automatique. En usage urbain, l'intervalle recommandé est souvent réduit.",
      },
    ],
    faq: [
      {
        q: "Une vidange de boîte automatique est-elle risquée sur un véhicule à fort kilométrage ?",
        a: "Cela dépend de l'historique et de l'état du fluide. Le véhicule est contrôlé au cas par cas avant toute intervention, sans généralisation.",
      },
      {
        q: "Mon voyant boîte s'est allumé puis éteint, dois-je m'inquiéter ?",
        a: "Un défaut peut rester mémorisé même après extinction du témoin. Une lecture électronique permet de savoir ce qui s'est passé.",
      },
    ],
    related: [
      { slug: "embrayage-le-havre", label: "Embrayage", note: "Pour les boîtes manuelles et robotisées." },
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Lecture des défauts et des paramètres en temps réel." },
      { slug: "revision-vidange-le-havre", label: "Révision", note: "Contrôle des niveaux et des fuites." },
    ],
  },

  "nettoyage-fap-le-havre": {
    slug: "nettoyage-fap-le-havre",
    shortName: "Nettoyage FAP",
    h1: "Nettoyage FAP au Havre",
    title: "Nettoyage FAP au Havre | Auto Express 76",
    description:
      "Voyant FAP, perte de puissance ou fumée à l'échappement ? Comprenez le fonctionnement du filtre à particules et faites contrôler votre véhicule au Havre chez Auto Express 76.",
    intro:
      "Un voyant FAP, une perte de puissance ou des régénérations qui reviennent trop souvent ? Auto Express 76 vous aide à documenter la situation avant de contrôler la ligne d'échappement.",
    area: "exhaust",
    focus: { x: 836, y: 306, scale: 2 },
    service: "nettoyage FAP",
    components: [
      c({
        slug: "filtre-a-particules",
        name: "Filtre à particules (FAP)",
        role: "Il retient les particules de suie issues de la combustion, puis les brûle lors de phases de régénération.",
        importance:
          "Un FAP saturé peut notamment provoquer une perte de puissance et un passage en mode dégradé pour protéger le moteur.",
        commonSymptoms: ["Voyant FAP allumé", "Perte de puissance", "Régénérations très fréquentes"],
        commonCauses: ["Trajets courts qui empêchent la régénération", "Encrassement progressif"],
        otherPossibleCauses: ["Capteur de pression différentielle en défaut", "Défaut d'injection en amont"],
        relatedService: "nettoyage FAP",
        x: 862,
        y: 302,
        dx: 46,
        dy: -46,
      }),
      c({
        slug: "echappement",
        name: "Ligne d'échappement",
        role: "Elle évacue les gaz brûlés, réduit le bruit et porte les éléments de dépollution.",
        importance: "Une fuite ou une corrosion en amont du FAP peut fausser les mesures et perturber la régénération.",
        commonSymptoms: ["Bruit d'échappement plus fort", "Odeur de gaz dans l'habitacle", "Vibrations"],
        commonCauses: ["Corrosion (humidité, air marin)", "Fixation ou silentbloc cassé"],
        otherPossibleCauses: ["Joint de collecteur fatigué", "Choc sous caisse"],
        relatedService: "échappement",
        x: 792,
        y: 318,
        dx: -34,
        dy: 48,
      }),
      c({
        slug: "capteurs",
        name: "Capteurs associés",
        role: "Sondes de température, capteur de pression différentielle et sonde lambda informent le calculateur de l'état du filtre.",
        importance:
          "Une information erronée peut déclencher un voyant alors que le filtre est en bon état : un contrôle permet de confirmer.",
        commonSymptoms: ["Voyant allumé sans perte de performance", "Régénérations déclenchées à tort"],
        commonCauses: ["Encrassement de la prise de pression", "Vieillissement du capteur"],
        otherPossibleCauses: ["Faisceau ou connecteur oxydé", "Défaut mémorisé dans le calculateur"],
        relatedService: "diagnostic",
        x: 820,
        y: 286,
        dx: -40,
        dy: -46,
      }),
    ],
    symptoms: [
      {
        id: "voyant-fap",
        label: "Un voyant FAP allumé",
        service: "nettoyage FAP",
        causeFamilies: [
          { title: "Saturation du filtre", text: "Une accumulation de suie peut notamment déclencher l'alerte." },
          { title: "Information capteur", text: "Un capteur de pression encrassé figure parmi les causes possibles." },
          { title: "Régénération interrompue", text: "Des trajets trop courts peuvent empêcher le cycle d'aller à son terme." },
        ],
      },
      {
        id: "perte-puissance-fap",
        label: "Une perte de puissance",
        service: "nettoyage FAP",
        causeFamilies: [
          { title: "Contre-pression d'échappement", text: "Un filtre chargé peut limiter volontairement les performances." },
          { title: "Mode dégradé", text: "Le calculateur peut brider le moteur pour le protéger." },
          { title: "Alimentation en air ou carburant", text: "Turbo, vanne EGR ou injection peuvent aussi être en cause." },
        ],
      },
      {
        id: "fumee",
        label: "De la fumée à l'échappement",
        service: "nettoyage FAP",
        causeFamilies: [
          { title: "Régénération en cours", text: "Une odeur et une fumée légère peuvent accompagner un cycle normal." },
          { title: "Combustion incomplète", text: "Un défaut d'injection figure parmi les causes possibles." },
        ],
      },
      {
        id: "regen-frequentes",
        label: "Des régénérations trop fréquentes",
        service: "nettoyage FAP",
        causeFamilies: [
          { title: "Usage du véhicule", text: "Beaucoup de trajets courts peuvent empêcher une régénération complète." },
          { title: "État du filtre", text: "Un taux de cendres élevé peut réduire la capacité utile du FAP." },
        ],
      },
    ],
    sections: [
      {
        h2: "Rouler en ville et FAP : le point de friction",
        body: "Le filtre a besoin de température pour se régénérer. Des trajets courts, typiques d'un usage urbain au Havre, ne permettent pas toujours d'atteindre ces conditions. Un roulage plus long à régime soutenu fait parfois partie des recommandations, mais ne remplace pas un contrôle.",
      },
    ],
    faq: [
      {
        q: "Un nettoyage FAP remplace-t-il un changement de filtre ?",
        a: "Pas toujours. Selon le taux de cendres et l'état du filtre, un nettoyage peut suffire ou non. Le contrôle permet d'orienter la décision.",
      },
      {
        q: "Peut-on supprimer un FAP ?",
        a: "Non. La suppression d'un dispositif de dépollution est interdite et entraîne un refus au contrôle technique. Nous n'effectuons pas ce type d'intervention.",
      },
    ],
    related: [
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Lecture des défauts et des paramètres du FAP." },
      { slug: "revision-vidange-le-havre", label: "Révision", note: "Une huile adaptée limite la production de cendres." },
      { slug: "garage-le-havre", label: "Le garage", note: "Découvrir toutes nos prestations." },
    ],
  },

  "batterie-demarrage-le-havre": {
    slug: "batterie-demarrage-le-havre",
    shortName: "Batterie & démarrage",
    h1: "Batterie et démarrage au Havre",
    title: "Batterie et démarrage au Havre | Auto Express 76",
    description:
      "Démarrage difficile, clic au démarreur ou voyant batterie ? Comprenez le rôle de la batterie, de l'alternateur et du démarreur et faites contrôler votre véhicule au Havre.",
    intro:
      "Un démarrage laborieux, un simple clic en tournant la clé ou un éclairage qui faiblit ? Auto Express 76 vous aide à cerner l'origine possible avant un contrôle du circuit de charge.",
    area: "battery",
    focus: { x: 214, y: 272, scale: 2.2 },
    service: "batterie",
    components: [
      c({
        slug: "batterie",
        name: "Batterie",
        role: "Elle stocke l'énergie nécessaire au démarrage et alimente les équipements moteur coupé.",
        importance:
          "Sa capacité chute avec le froid et l'âge. Sur les véhicules Start & Stop, une batterie spécifique est indispensable.",
        commonSymptoms: ["Démarrage lent", "Éclairage faible", "Batterie qui se décharge en quelques jours"],
        commonCauses: ["Vieillissement (souvent 4 à 6 ans)", "Trajets courts insuffisants pour recharger"],
        otherPossibleCauses: ["Consommation résiduelle anormale", "Cosses oxydées ou desserrées"],
        relatedService: "batterie",
        x: 214,
        y: 276,
        dx: 6,
        dy: -48,
      }),
      c({
        slug: "alternateur",
        name: "Alternateur",
        role: "Il recharge la batterie et alimente le véhicule dès que le moteur tourne.",
        importance: "Un alternateur défaillant vide progressivement la batterie, même neuve.",
        commonSymptoms: ["Voyant batterie allumé en roulant", "Éclairage qui varie avec le régime", "Panne après quelques kilomètres"],
        commonCauses: ["Usure des charbons ou du régulateur", "Courroie d'accessoires détendue"],
        otherPossibleCauses: ["Poulie débrayable en défaut", "Connexion de puissance corrodée"],
        relatedService: "batterie",
        x: 172,
        y: 294,
        dx: -78,
        dy: 38,
      }),
      c({
        slug: "demarreur",
        name: "Démarreur",
        role: "Il lance le moteur en entraînant le volant moteur au moment de la mise en route.",
        importance: "Un démarreur fatigué donne souvent un symptôme très typé : un clic, ou un lancement mou malgré une batterie chargée.",
        commonSymptoms: ["Clic unique au démarrage", "Lancement mou", "Démarrage aléatoire à chaud"],
        commonCauses: ["Usure du solénoïde ou des balais", "Corrosion des connexions"],
        otherPossibleCauses: ["Masse moteur défectueuse", "Tension insuffisante venant de la batterie"],
        relatedService: "batterie",
        x: 250,
        y: 294,
        dx: 80,
        dy: 38,
      }),
    ],
    symptoms: [
      {
        id: "demarrage-difficile",
        label: "Un démarrage difficile",
        service: "batterie",
        causeFamilies: [
          { title: "Capacité de la batterie", text: "Une batterie en fin de vie peut notamment provoquer un lancement mou." },
          { title: "Circuit de charge", text: "Un alternateur qui ne recharge plus figure parmi les causes possibles." },
          { title: "Démarreur", text: "Un lancement irrégulier peut aussi venir du démarreur. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "clic",
        label: "Un clic au démarrage",
        service: "batterie",
        causeFamilies: [
          { title: "Tension insuffisante", text: "Une batterie trop faible peut produire ce clic caractéristique." },
          { title: "Solénoïde du démarreur", text: "Un contacteur fatigué peut être à l'origine du symptôme." },
          { title: "Connexions", text: "Cosses oxydées ou masse défectueuse peuvent aussi être en cause." },
        ],
      },
      {
        id: "voyant-batterie",
        label: "Un voyant batterie allumé",
        service: "batterie",
        causeFamilies: [
          { title: "Charge insuffisante", text: "Un défaut d'alternateur peut notamment déclencher ce témoin." },
          { title: "Entraînement", text: "Une courroie d'accessoires détendue ou cassée figure parmi les causes possibles." },
        ],
      },
      {
        id: "decharge",
        label: "La batterie se décharge sans raison",
        service: "diagnostic",
        causeFamilies: [
          { title: "Consommation résiduelle", text: "Un équipement qui reste alimenté peut vider la batterie en quelques jours." },
          { title: "Usage du véhicule", text: "Des trajets trop courts peuvent ne pas suffire à recharger." },
        ],
      },
    ],
    sections: [
      {
        h2: "Le climat havrais et votre batterie",
        body: "L'humidité favorise l'oxydation des cosses et le froid réduit temporairement la capacité disponible. Un contrôle de charge avant l'hiver évite bon nombre d'immobilisations au petit matin.",
        bullets: [
          "Faire tester la batterie et l'alternateur, pas seulement la tension au repos",
          "Vérifier l'état et le serrage des cosses",
          "Adapter la batterie à l'équipement du véhicule (Start & Stop, AGM/EFB)",
        ],
      },
    ],
    faq: [
      {
        q: "Ma batterie est neuve mais le problème persiste, est-ce normal ?",
        a: "Cela arrive : si l'alternateur ne recharge pas ou si une consommation résiduelle vide le circuit, une batterie neuve ne règle pas la cause.",
      },
      {
        q: "Combien de temps dure une batterie ?",
        a: "Souvent quatre à six ans, mais l'usage et le climat font varier cette durée. Un test de charge donne une information plus fiable que l'âge seul.",
      },
    ],
    related: [
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Pour rechercher une consommation résiduelle." },
      { slug: "revision-vidange-le-havre", label: "Révision", note: "Contrôle de la courroie d'accessoires." },
      { slug: "garage-le-havre", label: "Le garage", note: "Toutes nos prestations au Havre." },
    ],
  },

  "revision-vidange-le-havre": {
    slug: "revision-vidange-le-havre",
    shortName: "Révision & vidange",
    h1: "Révision et vidange au Havre",
    title: "Révision et vidange au Havre | Auto Express 76",
    description:
      "Vidange, filtres et contrôle des points d'usure : préparez l'entretien préventif de votre véhicule au Havre avec Auto Express 76 et gardez une mécanique saine plus longtemps.",
    intro:
      "L'entretien courant est le meilleur moyen d'éviter les pannes coûteuses. Auto Express 76 vous aide à voir clair sur ce qui compose une révision et sur ce qui mérite d'être surveillé.",
    area: "engine",
    focus: { x: 172, y: 254, scale: 1.9 },
    service: "révision et entretien général",
    components: [
      c({
        slug: "huile-moteur",
        name: "Huile moteur",
        role: "Elle lubrifie, refroidit, nettoie et protège les pièces internes du moteur.",
        importance:
          "Une huile en fin de vie perd ses propriétés : c'est le poste d'entretien préventif le plus déterminant pour la longévité du moteur.",
        commonSymptoms: ["Voyant d'entretien", "Niveau qui baisse", "Bruit moteur plus présent à froid"],
        commonCauses: ["Intervalle de vidange dépassé", "Usage urbain intensif"],
        otherPossibleCauses: ["Consommation liée à l'usure moteur", "Fuite au joint ou au carter"],
        relatedService: "vidange",
        x: 132,
        y: 276,
        dx: -66,
        dy: 40,
      }),
      c({
        slug: "filtre-a-huile",
        name: "Filtre à huile",
        role: "Il retient les particules en suspension dans l'huile pour préserver les portées et les turbos.",
        importance: "Remplacé à chaque vidange, il évite qu'une huile neuve ne se recharge immédiatement en impuretés.",
        commonSymptoms: ["Aucun symptôme direct la plupart du temps"],
        commonCauses: ["Remplacement systématique à la vidange"],
        otherPossibleCauses: ["Colmatage prématuré sur moteur encrassé"],
        relatedService: "vidange",
        x: 164,
        y: 288,
        dx: -18,
        dy: 60,
      }),
      c({
        slug: "filtre-a-air",
        name: "Filtre à air",
        role: "Il protège le moteur des poussières aspirées avec l'air d'admission.",
        importance: "Un filtre colmaté peut être lié à une consommation en hausse et à une réponse moteur plus molle.",
        commonSymptoms: ["Reprise moins franche", "Consommation en hausse"],
        commonCauses: ["Encrassement normal", "Environnement poussiéreux"],
        otherPossibleCauses: ["Entrée d'air non étanche", "Débitmètre encrassé"],
        relatedService: "révision et entretien général",
        x: 208,
        y: 240,
        dx: 76,
        dy: -34,
      }),
      c({
        slug: "filtres-vehicule",
        name: "Filtres du véhicule",
        role: "Filtre à carburant et filtre d'habitacle complètent l'entretien courant.",
        importance:
          "Le filtre carburant protège le circuit d'injection ; le filtre d'habitacle influence directement la qualité de l'air que vous respirez.",
        commonSymptoms: ["À-coups moteur", "Odeur ou buée persistante dans l'habitacle"],
        commonCauses: ["Intervalle d'entretien dépassé", "Humidité ambiante"],
        otherPossibleCauses: ["Carburant de mauvaise qualité", "Circuit de climatisation à contrôler"],
        relatedService: "révision et entretien général",
        x: 100,
        y: 250,
        dx: -60,
        dy: -46,
      }),
      c({
        slug: "fluides",
        name: "Fluides et niveaux",
        role: "Liquide de refroidissement, liquide de frein, lave-glace : chacun a un rôle et un intervalle propre.",
        importance: "Un niveau qui baisse est un signal : il indique souvent une fuite ou une usure ailleurs.",
        commonSymptoms: ["Témoin de niveau", "Traces au sol après stationnement", "Température moteur inhabituelle"],
        commonCauses: ["Vieillissement des fluides", "Évaporation lente"],
        otherPossibleCauses: ["Durite ou joint poreux", "Radiateur endommagé"],
        relatedService: "révision et entretien général",
        x: 118,
        y: 240,
        dx: -20,
        dy: -52,
      }),
    ],
    symptoms: [
      {
        id: "entretien-du",
        label: "Mon entretien est dû ou dépassé",
        service: "vidange",
        causeFamilies: [
          { title: "Intervalle constructeur", text: "L'indicateur d'entretien se base sur le kilométrage et le temps écoulé." },
          { title: "Usage réel", text: "Trajets courts et ville peuvent justifier un intervalle raccourci." },
        ],
      },
      {
        id: "voyant-entretien",
        label: "Un voyant d'entretien allumé",
        service: "révision et entretien général",
        causeFamilies: [
          { title: "Rappel programmé", text: "Un simple compteur d'échéance peut être à l'origine du témoin." },
          { title: "Niveau ou qualité d'huile", text: "Certains véhicules surveillent la dégradation de l'huile en temps réel." },
        ],
      },
      {
        id: "niveau-baisse",
        label: "Un niveau qui baisse",
        service: "révision et entretien général",
        causeFamilies: [
          { title: "Consommation", text: "Une consommation d'huile peut être normale ou excessive selon le moteur." },
          { title: "Fuite", text: "Joint, durite ou carter figurent parmi les causes possibles. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "avant-trajet",
        label: "Je prépare un long trajet",
        service: "révision et entretien général",
        causeFamilies: [
          { title: "Points d'usure", text: "Freins, pneus et éclairage sont les premiers éléments à vérifier." },
          { title: "Fluides", text: "Un contrôle des niveaux évite les mauvaises surprises sur autoroute." },
        ],
      },
      {
        id: "controle-technique",
        label: "Je prépare le contrôle technique",
        service: "révision et entretien général",
        causeFamilies: [
          { title: "Points de refus fréquents", text: "Éclairage, freinage, pneumatiques et pollution reviennent le plus souvent." },
          { title: "Anticipation", text: "Une pré-vérification permet de corriger avant la contre-visite." },
        ],
      },
    ],
    sections: [
      {
        h2: "L'entretien préventif, poste par poste",
        body: "Une révision n'est pas une simple vidange. C'est l'occasion de faire un point complet sur les éléments d'usure et de repérer tôt ce qui deviendrait coûteux plus tard.",
        bullets: [
          "Vidange moteur et remplacement du filtre à huile",
          "Contrôle et remplacement des filtres selon échéance",
          "Vérification des niveaux et recherche de fuites",
          "Contrôle visuel du freinage, des pneumatiques et de l'éclairage",
        ],
      },
      {
        h2: "Quel intervalle pour votre véhicule ?",
        body: "L'intervalle dépend du carnet constructeur, de la motorisation et de votre usage réel. Deux véhicules identiques peuvent avoir des besoins différents selon qu'ils roulent en ville ou sur route.",
      },
    ],
    faq: [
      {
        q: "Une révision en garage indépendant fait-elle perdre la garantie constructeur ?",
        a: "Non, à condition de respecter le plan d'entretien et d'utiliser des pièces de qualité équivalente à l'origine, conformément à la réglementation européenne.",
      },
      {
        q: "Faut-il vidanger tous les ans même en roulant peu ?",
        a: "L'huile vieillit aussi avec le temps. Sur un faible kilométrage, l'échéance en durée devient souvent le critère déterminant.",
      },
    ],
    related: [
      { slug: "freinage-le-havre", label: "Freinage", note: "Contrôlé à chaque révision." },
      { slug: "batterie-demarrage-le-havre", label: "Batterie", note: "Test de charge lors de l'entretien." },
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "En cas de témoin allumé." },
    ],
  },

  "diagnostic-auto-le-havre": {
    slug: "diagnostic-auto-le-havre",
    shortName: "Diagnostic",
    h1: "Diagnostic automobile au Havre",
    title: "Diagnostic auto au Havre | Auto Express 76",
    description:
      "Voyant moteur, perte de puissance ou fonctionnement irrégulier ? Comprenez ce que révèle — et ne révèle pas — une lecture électronique, et faites contrôler votre véhicule au Havre.",
    intro:
      "Un voyant s'est allumé, le moteur a un comportement inhabituel ? Auto Express 76 vous aide à réunir les bonnes informations. Un code défaut oriente la recherche : il ne désigne jamais à lui seul la pièce en cause.",
    area: "engine",
    focus: { x: 200, y: 258, scale: 1.8 },
    service: "diagnostic",
    components: [
      c({
        slug: "calculateur",
        name: "Calculateur moteur",
        role: "Il pilote l'injection, l'allumage et la dépollution à partir des informations des capteurs.",
        importance:
          "Il mémorise les défauts détectés. Ces codes sont un point de départ d'investigation, pas une conclusion.",
        commonSymptoms: ["Voyant moteur", "Mode dégradé", "Comportement irrégulier"],
        commonCauses: ["Défaut mémorisé par un capteur", "Valeur hors plage attendue"],
        otherPossibleCauses: ["Connectique ou faisceau détérioré", "Mise à jour logicielle nécessaire"],
        relatedService: "diagnostic",
        x: 208,
        y: 236,
        dx: 78,
        dy: -36,
      }),
      c({
        slug: "capteurs-moteur",
        name: "Capteurs moteur",
        role: "Débitmètre, sondes lambda, capteurs de pression et de température alimentent le calculateur en données.",
        importance: "Un capteur qui dérive fait prendre de mauvaises décisions au moteur sans forcément tomber en panne franche.",
        commonSymptoms: ["Consommation en hausse", "Ralenti instable", "Perte de puissance progressive"],
        commonCauses: ["Encrassement", "Vieillissement du capteur"],
        otherPossibleCauses: ["Fuite d'air non mesurée", "Problème mécanique en amont"],
        relatedService: "diagnostic",
        x: 168,
        y: 246,
        dx: -30,
        dy: -50,
      }),
      c({
        slug: "circuit-electrique",
        name: "Circuit électrique",
        role: "Faisceaux, masses et connecteurs relient l'ensemble des organes électroniques du véhicule.",
        importance: "L'humidité et la corrosion sont des causes fréquentes de défauts intermittents, particulièrement en bord de mer.",
        commonSymptoms: ["Défauts intermittents", "Équipements capricieux", "Voyants multiples"],
        commonCauses: ["Corrosion des connecteurs", "Masse défectueuse"],
        otherPossibleCauses: ["Batterie faible perturbant les calculateurs", "Accessoire mal installé"],
        relatedService: "diagnostic",
        x: 236,
        y: 282,
        dx: 78,
        dy: 36,
      }),
      c({
        slug: "circuit-air",
        name: "Circuit d'air et dépollution",
        role: "Turbo, vanne EGR et FAP conditionnent la combustion et le traitement des gaz.",
        importance: "Beaucoup de pertes de puissance viennent de cet ensemble plutôt que du moteur lui-même.",
        commonSymptoms: ["Perte de puissance", "Fumée", "Bruit d'admission"],
        commonCauses: ["Encrassement EGR", "Contre-pression liée au FAP"],
        otherPossibleCauses: ["Durite d'admission fissurée", "Géométrie de turbo grippée"],
        relatedService: "diagnostic",
        x: 132,
        y: 264,
        dx: -76,
        dy: 40,
      }),
    ],
    symptoms: [
      {
        id: "voyant-moteur",
        label: "Un voyant moteur allumé",
        service: "diagnostic",
        causeFamilies: [
          { title: "Dépollution", text: "Sonde lambda, EGR ou FAP figurent parmi les causes possibles." },
          { title: "Injection ou allumage", text: "Un défaut de combustion peut notamment déclencher le témoin." },
          { title: "Capteur ou connectique", text: "Une information incohérente peut suffire à allumer le voyant. Un contrôle permet de confirmer." },
        ],
      },
      {
        id: "perte-puissance-diag",
        label: "Une perte de puissance",
        service: "diagnostic",
        causeFamilies: [
          { title: "Mode dégradé", text: "Le calculateur peut brider le moteur pour le protéger." },
          { title: "Circuit d'air", text: "Turbo, EGR ou filtre à particules peuvent être en cause." },
          { title: "Alimentation carburant", text: "Filtre colmaté ou pression insuffisante font partie des pistes." },
        ],
      },
      {
        id: "bruit-moteur",
        label: "Un bruit inhabituel",
        service: "diagnostic",
        causeFamilies: [
          { title: "Accessoires entraînés", text: "Courroie, galet ou poulie peuvent générer un bruit permanent." },
          { title: "Mécanique interne", text: "Un bruit qui suit le régime moteur nécessite un contrôle sans délai." },
        ],
      },
      {
        id: "irregulier",
        label: "Un fonctionnement irrégulier",
        service: "diagnostic",
        causeFamilies: [
          { title: "Combustion", text: "Un raté sur un cylindre peut notamment provoquer des à-coups au ralenti." },
          { title: "Alimentation en air", text: "Une entrée d'air non mesurée peut déstabiliser le ralenti." },
        ],
      },
      {
        id: "electronique",
        label: "Des problèmes électroniques",
        service: "diagnostic",
        causeFamilies: [
          { title: "Alimentation électrique", text: "Une batterie faible peut provoquer des défauts multiples et incohérents." },
          { title: "Connectique", text: "Corrosion et masses défectueuses figurent parmi les causes possibles." },
        ],
      },
    ],
    sections: [
      {
        h2: "Ce qu'un diagnostic électronique apporte réellement",
        body: "La lecture des codes défaut est une première étape. Elle est complétée par l'analyse des paramètres en temps réel et par des vérifications physiques sur le véhicule. C'est cette combinaison qui permet de conclure.",
        bullets: [
          "Lecture des défauts mémorisés sur les calculateurs",
          "Analyse des valeurs mesurées en fonctionnement",
          "Vérifications mécaniques et électriques ciblées",
          "Restitution claire de ce qui est constaté",
        ],
      },
    ],
    faq: [
      {
        q: "Un code défaut indique-t-il la pièce à changer ?",
        a: "Non. Un code signale un symptôme électronique, pas une pièce défaillante. Remplacer une pièce sur la seule base d'un code conduit souvent à une dépense inutile.",
      },
      {
        q: "Le voyant s'est éteint tout seul, faut-il quand même contrôler ?",
        a: "Oui, si possible. Le défaut reste généralement mémorisé et permet de comprendre ce qui s'est produit.",
      },
    ],
    related: [
      { slug: "nettoyage-fap-le-havre", label: "Nettoyage FAP", note: "Cause fréquente de perte de puissance." },
      { slug: "batterie-demarrage-le-havre", label: "Batterie", note: "Une tension faible génère des défauts multiples." },
      { slug: "boite-automatique-le-havre", label: "Boîte automatique", note: "Défauts de transmission et mode dégradé." },
    ],
  },

  "garage-le-havre": {
    slug: "garage-le-havre",
    shortName: "Garage au Havre",
    h1: "Garage automobile au Havre",
    title: "Garage automobile au Havre | Auto Express 76",
    description:
      "Auto Express 76, garage automobile au Havre : entretien, freinage, pneus, embrayage, diagnostic et FAP. Montrez-nous la zone concernée et transmettez votre demande à l'atelier.",
    intro:
      "Auto Express 76 accompagne les automobilistes du Havre et de l'agglomération. Sélectionnez la partie du véhicule concernée, décrivez ce que vous constatez, et transmettez tout à l'atelier en quelques clics.",
    area: "general",
    focus: { x: 490, y: 220, scale: 1 },
    service: "révision et entretien général",
    components: [],
    symptoms: [
      {
        id: "hub-bruit",
        label: "Un bruit",
        service: "diagnostic",
        causeFamilies: [
          { title: "Liaison au sol", text: "Suspension, train roulant ou pneumatiques peuvent notamment être en cause." },
          { title: "Freinage", text: "Un bruit qui n'apparaît qu'au freinage oriente vers les plaquettes ou les disques." },
          { title: "Moteur et accessoires", text: "Un bruit qui suit le régime moteur relève d'un contrôle spécifique." },
        ],
      },
      {
        id: "hub-voyant",
        label: "Un voyant",
        service: "diagnostic",
        causeFamilies: [
          { title: "Dépollution", text: "FAP, EGR ou sondes figurent parmi les causes possibles." },
          { title: "Circuit de charge", text: "Un témoin batterie oriente vers l'alternateur ou la courroie." },
          { title: "Sécurité", text: "Freinage, ABS ou pression des pneus demandent un contrôle rapide." },
        ],
      },
      {
        id: "hub-comportement",
        label: "Un comportement inhabituel",
        service: "diagnostic",
        causeFamilies: [
          { title: "Transmission", text: "Patinage ou à-coups orientent vers l'embrayage ou la boîte." },
          { title: "Tenue de route", text: "Une dérive ou des rebonds relèvent du train roulant." },
        ],
      },
      {
        id: "hub-entretien",
        label: "Un entretien à prévoir",
        service: "révision et entretien général",
        causeFamilies: [
          { title: "Échéance kilométrique", text: "Vidange et filtres suivent le plan d'entretien constructeur." },
          { title: "Contrôle technique", text: "Une pré-vérification limite le risque de contre-visite." },
        ],
      },
    ],
    sections: [
      {
        h2: "Une approche différente : vous montrez, on s'occupe du reste",
        body: "Décrire une panne au téléphone est difficile. Notre sélecteur véhicule vous permet de pointer la zone concernée, de choisir ce que vous constatez, puis d'envoyer une demande complète à l'atelier. Vous gagnez du temps, nous préparons mieux votre passage.",
      },
      {
        h2: "Nos prestations au Havre",
        body: "Chaque prestation dispose de sa page dédiée, avec les composants concernés et les signes qui doivent alerter.",
      },
    ],
    faq: [
      {
        q: "Faut-il prendre rendez-vous ?",
        a: "C'est préférable pour réduire l'attente et préparer les pièces éventuelles. Vous pouvez transmettre votre demande directement depuis le site.",
      },
      {
        q: "Le site peut-il diagnostiquer ma panne ?",
        a: "Non. Le site vous aide à qualifier et à décrire votre besoin. Seul un contrôle du véhicule permet d'identifier précisément l'origine d'une panne.",
      },
    ],
    related: [
      { slug: "revision-vidange-le-havre", label: "Révision & vidange", note: "Entretien préventif complet." },
      { slug: "freinage-le-havre", label: "Freinage", note: "Plaquettes, disques, étriers." },
      { slug: "diagnostic-auto-le-havre", label: "Diagnostic", note: "Voyant allumé ou comportement inhabituel." },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);

export const SERVICE_NAV: { slug: string; label: string }[] = [
  { slug: "garage-le-havre", label: "Garage au Havre" },
  { slug: "revision-vidange-le-havre", label: "Révision & vidange" },
  { slug: "freinage-le-havre", label: "Freinage" },
  { slug: "pneus-le-havre", label: "Pneumatiques" },
  { slug: "embrayage-le-havre", label: "Embrayage" },
  { slug: "boite-automatique-le-havre", label: "Boîte automatique" },
  { slug: "diagnostic-auto-le-havre", label: "Diagnostic" },
  { slug: "nettoyage-fap-le-havre", label: "Nettoyage FAP" },
  { slug: "suspension-le-havre", label: "Suspension" },
  { slug: "batterie-demarrage-le-havre", label: "Batterie & démarrage" },
];

/** Chemins typés pour les <Link> internes */
export const SERVICE_ROUTES = {
  "garage-le-havre": "/garage-le-havre",
  "revision-vidange-le-havre": "/revision-vidange-le-havre",
  "freinage-le-havre": "/freinage-le-havre",
  "pneus-le-havre": "/pneus-le-havre",
  "embrayage-le-havre": "/embrayage-le-havre",
  "boite-automatique-le-havre": "/boite-automatique-le-havre",
  "diagnostic-auto-le-havre": "/diagnostic-auto-le-havre",
  "nettoyage-fap-le-havre": "/nettoyage-fap-le-havre",
  "suspension-le-havre": "/suspension-le-havre",
  "batterie-demarrage-le-havre": "/batterie-demarrage-le-havre",
} as const;

export type ServiceSlug = keyof typeof SERVICE_ROUTES;
