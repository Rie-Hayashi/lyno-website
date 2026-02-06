// lib/fetchCsv.ts
export async function fetchCsv(
  url: string,
  revalidateSec = 1800
): Promise<Record<string, string>[]> {
  if (!url) {
    console.error("[fetchCsv] URL が空です。env の設定を確認してください。");
    throw new Error("CSV URL is empty. Check your environment variables.");
  }

  let res: Response;

  try {
    res = await fetch(url, { next: { revalidate: revalidateSec } });
  } catch (err) {
    console.error("[fetchCsv] fetch に失敗しました:", err);
    throw new Error("Failed to fetch CSV (network error).");
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(
      `[fetchCsv] CSV取得に失敗しました: ${res.status} ${res.statusText}`,
      body.slice(0, 200)
    );
    throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
  }

  const rawText = await res.text();
  const text = rawText.trim();

  if (!text) {
    console.warn("[fetchCsv] CSV が空です（内容がありません）。");
    return [];
  }

  // 行分割
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length === 0) {
    console.warn("[fetchCsv] 有効な行が見つかりませんでした。");
    return [];
  }

  // 簡易CSVパーサ（カンマ区切り＋ダブルクォート対応）
  const rows = lines.map((line) => {
    const cells: string[] = [];
    let cur = "";
    let insideQuote = false;

    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      const next = line[i + 1];

      if (c === '"' && insideQuote && next === '"') {
        // "" → " に変換
        cur += '"';
        i++;
        continue;
      }
      if (c === '"') {
        insideQuote = !insideQuote;
        continue;
      }
      if (c === "," && !insideQuote) {
        cells.push(cur);
        cur = "";
        continue;
      }
      cur += c;
    }
    cells.push(cur);
    return cells;
  });

  // ヘッダー行
  let headers = rows.shift()!;
  if (!headers || headers.length === 0) {
    console.error("[fetchCsv] ヘッダー行が取得できませんでした。");
    throw new Error("CSV header row is missing.");
  }

  // BOM（\uFEFF）が付いている場合に除去
  if (headers[0].charCodeAt(0) === 0xfeff) {
    headers[0] = headers[0].slice(1);
  }

  // 行ごとのオブジェクト化
  const data = rows.map((row, rowIndex) => {
    const obj: Record<string, string> = {};

    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });

    // 行の長さがヘッダーと合ってないときは dev で警告
    if (process.env.NODE_ENV !== "production" && row.length !== headers.length) {
      console.warn(
        `[fetchCsv] 行 ${rowIndex + 2} の列数がヘッダーと一致しません: header=${headers.length}, row=${row.length}`,
        row
      );
    }

    return obj;
  });

  if (data.length === 0) {
    console.warn("[fetchCsv] データ行が0件です。CSVの中身を確認してください。");
  }

  return data;
}
