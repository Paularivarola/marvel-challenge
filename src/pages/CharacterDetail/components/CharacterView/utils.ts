export const extractTypeIdFromApiUrl = (apiDetailUrl?: string): string => {
  if (!apiDetailUrl) return "";
  const s = String(apiDetailUrl).trim();

  const m = s.match(/(?:^|\/)(?:api\/)?[a-z_]+\/(\d{4}-\d+)(?:[/?#]|$)/i);
  return m?.[1] ?? "";
};
