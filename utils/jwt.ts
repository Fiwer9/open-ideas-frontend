export const getUserIdFromAccessToken = (
  token?: string | null
): number | null => {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");

    if (parts.length < 2) {
      return null;
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64)) as Record<string, unknown>;
    const rawId =
      payload.user_id ?? payload.sub ?? payload.id ?? payload.userId;
    const id = Number(rawId);

    return Number.isFinite(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
};
