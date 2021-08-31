export type BeverageName = string;
export type BeverageType = "energy" | "coffee" | "others";

export const beverageList: Record<
  BeverageType,
  { name: BeverageName; amount?: number }[]
> = {
  energy: [
    { name: "モンスターエナジー (355ml)", amount: 142 },
    { name: "その他エナジードリンク" },
  ],
  coffee: [
    { name: "『ワンダ』モーニングショット (180g)", amount: 60 * (185 / 100) },
    { name: "その他コーヒー" },
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
};
