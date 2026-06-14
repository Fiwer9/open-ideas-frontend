export const formatAccountDisplayName = (fullName?: string | null): string => {
  if (!fullName?.trim()) {
    return "";
  }

  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }

  return parts[0];
};
