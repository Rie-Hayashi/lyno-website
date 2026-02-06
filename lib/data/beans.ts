// lib/data/beans.ts
import { fetchCsv } from "./fetchCsv";

type RawBean = {
  id: string;
  name: string;
  origin: string;
  variety?: string;
  process: string;
  roast: string;
  flavor?: string;
  notes_ja?: string;
  notes_en?: string;
  price_drip?: string;
  price_40?: string;
  price_100?: string;
  roaster?: string;
  in_stock?: string;
  visible?: string;
};

export type Bean = {
  id: string;
  name: string;
  origin: string;
  variety?: string;
  process: string;
  roast: string;
  flavor?: string;
  notes_ja?: string;
  notes_en?: string;

  // 価格まわり
  priceDrip?: string;   // "650" / "ASK" など文字列のまま
  price40?: number;     // 40g の価格（数値）
  price100?: number;    // 100g の価格（数値）

  roaster?: string;

  in_stock: boolean;
  visible: boolean;
};

const toBool = (v?: string): boolean =>
  (v || "").toLowerCase() === "true";

const toNumberOrUndefined = (v?: string): number | undefined => {
  if (!v) return undefined;
  const trimmed = v.trim();
  if (!trimmed) return undefined;
  const n = Number(trimmed);
  return Number.isNaN(n) ? undefined : n;
};

export async function getBeans(): Promise<Bean[]> {
  const url = process.env.BEANS_SHEET_CSV_URL!;
  const raw = (await fetchCsv(url, 1800)) as RawBean[];

  return raw
    .filter((b) => toBool(b.visible))
    .map((b) => ({
      id: b.id,
      name: b.name,
      origin: b.origin,
      variety: b.variety,
      process: b.process,
      roast: b.roast,
      flavor: b.flavor,
      notes_ja: b.notes_ja,
      notes_en: b.notes_en,

      priceDrip: b.price_drip?.trim() || undefined,
      price40: toNumberOrUndefined(b.price_40),
      price100: toNumberOrUndefined(b.price_100),

      roaster: b.roaster?.trim() || undefined,

      in_stock: toBool(b.in_stock),
      visible: toBool(b.visible),
    }));
}