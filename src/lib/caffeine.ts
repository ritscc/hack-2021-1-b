import firebase from "firebase";

export type BeverageName = string;
export type BeverageType = "energy" | "coffee" | "others";

export const beverageList: Record<
  BeverageType,
  { name: BeverageName; amount?: number }[]
> = {
  energy: [
    { name: "モンスターエナジー (355ml)", amount: 142 },
    { name: "モンスターエナジー (500ml)", amount: 200 },
    { name: "モンスターエナジー M3", amount: 142 },
    { name: "レッドブル (185ml)", amount: 79.92 },
    { name: "レッドブル (330ml)", amount: 105.6 },
    { name: "ZONE", amount: 150 },
    { name: "その他のエナドリ" },
  ],
  coffee: [
    { name: "『ワンダ』モーニングショット (180ml)", amount: 60 * (185 / 100) },
    { name: "ドリップコーヒーの平均(140ml)", amount: 84 },
    { name: "エスプレッソ", amount: 212 },
    { name: "その他のコーヒー" },
  ],
  others: [
    { name: "伊右衛門 (525ml)", amount: 10 * (525 / 100) },
    { name: "その他コーヒー" },
  ],
};

export type Caffeine = {
  /**
   * カフェイン量 (mg)
   */
  amount: number;

  /**
   * 飲み物の名前
   */
  beverage: BeverageName;

  /**
   * 飲んだ日時
   */
  time: firebase.firestore.Timestamp;
};
