// lib/data/menu.ts
import { fetchCsv } from "./fetchCsv";

export type MenuCategory = "Coffee" | "Tea Latte" | "Others" | "Option";

type RawMenuRow = {
  id: string;
  name_ja: string;
  name_en?: string;
  category: string;
  price?: string;
  seasonal?: string;
  desc_ja?: string;
  desc_en?: string;
  visible?: string;
};

export type MenuItem = {
  id: string;
  name_ja: string;
  name_en?: string;
  category: MenuCategory;
  /** "ASK" や "650" など、表示用の文字列 */
  price: string;
  seasonal: boolean;
  desc_ja?: string;
  desc_en?: string;
};

const CATEGORIES: MenuCategory[] = [
  "Coffee",
  "Tea Latte",
  "Others",
  "Option",
] as const;

function normalizeCategory(raw: string): MenuCategory {
  const trimmed = (raw || "").trim();
  if (CATEGORIES.includes(trimmed as MenuCategory)) {
    return trimmed as MenuCategory;
  }
  // 想定外の値が来たときは Others に逃がす
  return "Others";
}

export async function getMenu(): Promise<MenuItem[]> {
  const url = process.env.MENU_SHEET_CSV_URL!;
  const raw = (await fetchCsv(url, 1800)) as RawMenuRow[];

  return raw
    .filter((i) => (i.visible || "").toLowerCase() === "true")
    .map((i) => ({
      id: i.id,
      name_ja: i.name_ja,
      name_en: i.name_en,
      category: normalizeCategory(i.category),
      // ASK をシートにそのまま書いておく想定（空なら "" に）
      price: (i.price || "").trim(),
      seasonal: (i.seasonal || "").toLowerCase() === "true",
      desc_ja: i.desc_ja,
      desc_en: i.desc_en,
    }));
}