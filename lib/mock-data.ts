export type DemoProduct = {
  id: string;
  playerName: string;
  team: string;
  year: number;
  name: string;
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "SUPER_RARE" | "ULTRA_RARE";
  price: number;
  stock: number;
  imageUrl: string;
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "1",
    playerName: "陳偉殷",
    team: "洋基",
    year: 2023,
    name: "2023 Topps 金色簽名卡",
    rarity: "ULTRA_RARE",
    price: 28000,
    stock: 1,
    imageUrl:
      "https://images.pexels.com/photos/159550/baseball-foul-ball-hit-baseball-bat-159550.jpeg?cs=srgb&dl=pexels-pixabay-159550.jpg&fm=jpg",
  },
  {
    id: "2",
    playerName: "王建民",
    team: "洋基",
    year: 2006,
    name: "2006 Topps Chrome 新秀卡",
    rarity: "SUPER_RARE",
    price: 15800,
    stock: 2,
    imageUrl:
      "https://images.pexels.com/photos/17724058/pexels-photo-17724058.jpeg?cs=srgb&dl=pexels-israwmx-17724058.jpg&fm=jpg",
  },
  {
    id: "3",
    playerName: "林子偉",
    team: "紅襪",
    year: 2022,
    name: "2022 Bowman 前景卡",
    rarity: "RARE",
    price: 3200,
    stock: 5,
    imageUrl:
      "https://images.pexels.com/photos/17724027/pexels-photo-17724027.jpeg?cs=srgb&dl=pexels-israwmx-17724027.jpg&fm=jpg",
  },
  {
    id: "4",
    playerName: "郭泓志",
    team: "道奇",
    year: 2010,
    name: "2010 Upper Deck 特別版",
    rarity: "RARE",
    price: 4500,
    stock: 3,
    imageUrl:
      "https://images.pexels.com/photos/11822930/pexels-photo-11822930.jpeg?cs=srgb&dl=pexels-bryce-carithers-11680701-11822930.jpg&fm=jpg",
  },
  {
    id: "5",
    playerName: "胡金龍",
    team: "道奇",
    year: 2009,
    name: "2009 Bowman 胡金龍 新秀卡",
    rarity: "UNCOMMON",
    price: 1200,
    stock: 8,
    imageUrl:
      "https://images.pexels.com/photos/163209/baseball-baseball-umpire-baseball-catcher-baseball-player-163209.jpeg?cs=srgb&dl=pexels-pixabay-163209.jpg&fm=jpg",
  },
  {
    id: "6",
    playerName: "陳冠宇",
    team: "洋基",
    year: 2020,
    name: "2020 Topps 陳冠宇 基礎卡",
    rarity: "COMMON",
    price: 350,
    stock: 20,
    imageUrl:
      "https://images.pexels.com/photos/7924648/pexels-photo-7924648.jpeg?cs=srgb&dl=pexels-bryce-carithers-11680701-7924648.jpg&fm=jpg",
  },
  {
    id: "7",
    playerName: "宋文華",
    team: "紅人",
    year: 2018,
    name: "2018 Topps Heritage",
    rarity: "UNCOMMON",
    price: 980,
    stock: 6,
    imageUrl:
      "https://images.pexels.com/photos/163408/baseball-baseball-umpire-baseball-catcher-baseball-player-163408.jpeg?cs=srgb&dl=pexels-pixabay-163408.jpg&fm=jpg",
  },
  {
    id: "8",
    playerName: "陳偉殷",
    team: "馬林魚",
    year: 2015,
    name: "2015 Stadium Club 珍藏版",
    rarity: "SUPER_RARE",
    price: 8800,
    stock: 1,
    imageUrl:
      "https://images.pexels.com/photos/17724043/pexels-photo-17724043.jpeg?cs=srgb&dl=pexels-israwmx-17724043.jpg&fm=jpg",
  },
];

export type DemoMarketplaceListing = {
  id: string;
  title: string;
  playerName: string;
  team: string;
  year: number;
  rarity: DemoProduct["rarity"];
  price: number;
  condition: "MINT" | "NEAR_MINT" | "EXCELLENT" | "GOOD" | "FAIR";
  seller: string;
  imageUrl: string;
  priceChangePct: number;
  tradesToday: number;
  heat: "HOT" | "RISING" | "LOW";
};

export const DEMO_MARKETPLACE_LISTINGS: DemoMarketplaceListing[] = [
  {
    id: "1",
    title: "2023 Topps Sapphire Signature",
    playerName: "陳偉殷",
    team: "洋基",
    year: 2023,
    rarity: "SUPER_RARE",
    price: 12000,
    condition: "MINT",
    seller: "Card_Master",
    imageUrl:
      "https://images.pexels.com/photos/17724038/pexels-photo-17724038.jpeg?cs=srgb&dl=pexels-israwmx-17724038.jpg&fm=jpg",
    priceChangePct: 12,
    tradesToday: 14,
    heat: "HOT",
  },
  {
    id: "2",
    title: "2006 Chrome Rookie Silver",
    playerName: "王建民",
    team: "洋基",
    year: 2006,
    rarity: "RARE",
    price: 5800,
    condition: "NEAR_MINT",
    seller: "LegendCards",
    imageUrl:
      "https://images.pexels.com/photos/17724012/pexels-photo-17724012.jpeg?cs=srgb&dl=pexels-israwmx-17724012.jpg&fm=jpg",
    priceChangePct: 7,
    tradesToday: 9,
    heat: "RISING",
  },
  {
    id: "3",
    title: "2022 Bowman Prospect Base",
    playerName: "林子偉",
    team: "紅襪",
    year: 2022,
    rarity: "UNCOMMON",
    price: 800,
    condition: "EXCELLENT",
    seller: "BaseballFan",
    imageUrl:
      "https://images.pexels.com/photos/8320554/pexels-photo-8320554.jpeg?cs=srgb&dl=pexels-mark-milbert-67886347-8320554.jpg&fm=jpg",
    priceChangePct: -3,
    tradesToday: 2,
    heat: "LOW",
  },
];

export type HeroFloatingCard = {
  id: number;
  playerName: string;
  team: string;
  year: number;
  rarity: DemoProduct["rarity"];
  color: string;
  rotate: string;
  delay: string;
  position: string;
  scale: number;
  imageUrl: string;
};

export const HERO_FLOATING_CARDS: HeroFloatingCard[] = [
  {
    id: 1,
    playerName: "陳偉殷",
    team: "洋基",
    year: 2023,
    rarity: "ULTRA_RARE",
    color: "#f59e0b",
    rotate: "-8deg",
    delay: "0s",
    position: "left-[5%] top-[20%]",
    scale: 1,
    imageUrl:
      "https://images.pexels.com/photos/159550/baseball-foul-ball-hit-baseball-bat-159550.jpeg?cs=srgb&dl=pexels-pixabay-159550.jpg&fm=jpg",
  },
  {
    id: 2,
    playerName: "王建民",
    team: "洋基",
    year: 2006,
    rarity: "SUPER_RARE",
    color: "#a855f7",
    rotate: "5deg",
    delay: "1s",
    position: "right-[8%] top-[15%]",
    scale: 0.9,
    imageUrl:
      "https://images.pexels.com/photos/17724058/pexels-photo-17724058.jpeg?cs=srgb&dl=pexels-israwmx-17724058.jpg&fm=jpg",
  },
  {
    id: 3,
    playerName: "郭泓志",
    team: "道奇",
    year: 2010,
    rarity: "RARE",
    color: "#3b82f6",
    rotate: "-3deg",
    delay: "2s",
    position: "right-[22%] bottom-[10%]",
    scale: 0.8,
    imageUrl:
      "https://images.pexels.com/photos/17724027/pexels-photo-17724027.jpeg?cs=srgb&dl=pexels-israwmx-17724027.jpg&fm=jpg",
  },
];

export type DemoGachaPoolItem = {
  name: string;
  player: string;
  team: string;
  rarity: DemoProduct["rarity"];
  weight: number;
  imageUrl: string;
};

export const DEMO_GACHA_POOL_BY_MACHINE: Record<string, DemoGachaPoolItem[]> = {
  "1": [
    {
      name: "2023 Topps 金色簽名卡",
      player: "陳偉殷",
      team: "洋基",
      rarity: "ULTRA_RARE",
      weight: 2,
      imageUrl:
        "https://images.pexels.com/photos/159550/baseball-foul-ball-hit-baseball-bat-159550.jpeg?cs=srgb&dl=pexels-pixabay-159550.jpg&fm=jpg",
    },
    {
      name: "2006 Topps Chrome 新秀卡",
      player: "王建民",
      team: "洋基",
      rarity: "SUPER_RARE",
      weight: 8,
      imageUrl:
        "https://images.pexels.com/photos/17724058/pexels-photo-17724058.jpeg?cs=srgb&dl=pexels-israwmx-17724058.jpg&fm=jpg",
    },
    {
      name: "2022 Bowman 前景卡",
      player: "林子偉",
      team: "紅襪",
      rarity: "RARE",
      weight: 20,
      imageUrl:
        "https://images.pexels.com/photos/17724027/pexels-photo-17724027.jpeg?cs=srgb&dl=pexels-israwmx-17724027.jpg&fm=jpg",
    },
    {
      name: "2010 Upper Deck 特別版",
      player: "郭泓志",
      team: "道奇",
      rarity: "UNCOMMON",
      weight: 30,
      imageUrl:
        "https://images.pexels.com/photos/11822930/pexels-photo-11822930.jpeg?cs=srgb&dl=pexels-bryce-carithers-11680701-11822930.jpg&fm=jpg",
    },
    {
      name: "2023 Topps 基礎卡",
      player: "陳冠宇",
      team: "洋基",
      rarity: "COMMON",
      weight: 40,
      imageUrl:
        "https://images.pexels.com/photos/7924648/pexels-photo-7924648.jpeg?cs=srgb&dl=pexels-bryce-carithers-11680701-7924648.jpg&fm=jpg",
    },
  ],
};
