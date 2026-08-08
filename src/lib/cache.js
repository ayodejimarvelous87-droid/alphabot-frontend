const memoryCache = new Map();

export function getCached(key) {
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  try {
    const raw = localStorage.getItem(`alphabot_cache_${key}`);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    memoryCache.set(key, parsed.data);

    return parsed.data;
  } catch {
    return null;
  }
}

export function setCached(key, data) {
  memoryCache.set(key, data);

  try {
    localStorage.setItem(
      `alphabot_cache_${key}`,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    );
  } catch {
    // Ignore localStorage errors.
  }

  return data;
}

export function isCacheFresh(key, ttl) {
  try {
    const raw = localStorage.getItem(`alphabot_cache_${key}`);

    if (!raw) return false;

    const parsed = JSON.parse(raw);

    if (!parsed || !parsed.timestamp) return false;

    return Date.now() - parsed.timestamp < ttl;
  } catch {
    return false;
  }
}

export function clearCached(key) {
  memoryCache.delete(key);

  try {
    localStorage.removeItem(`alphabot_cache_${key}`);
  } catch {
    // Ignore localStorage errors.
  }
}
