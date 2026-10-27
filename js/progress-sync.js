/* Shared unit-completion sync between Simple and Detailed versions.
   Topic-level progress remains specific to each version because topic lists differ. */
(function () {
  const STORAGE_KEY = "fcp_shared_v1";
  const PAGE_TOPIC_COUNTS = {
    simple: [4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4],
    detailed: [13, 13, 12, 7, 8, 9, 8, 5, 20, 8, 4]
  };

  function readStore() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (!value.pages) value.pages = {};
      if (!value.units) value.units = {};
      return value;
    } catch (error) {
      return { pages: {}, units: {} };
    }
  }

  function readLegacy(keys) {
    for (const key of keys) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "null");
        if (value && value.tp && typeof value.tp === "object") return value.tp;
      } catch (error) {}
    }
    return {};
  }

  function writeStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (error) {}
  }

  function load(page, legacyKeys) {
    const store = readStore();
    const pageState = store.pages[page] || { tp: null, applied: {} };
    if (!pageState.applied) pageState.applied = {};
    if (!pageState.tp) pageState.tp = readLegacy(legacyKeys);

    PAGE_TOPIC_COUNTS[page].forEach((count, index) => {
      const status = store.units[String(index)];
      const appliedAt = Number(pageState.applied[String(index)] || 0);
      if (status && Number(status.at) > appliedAt && status.source !== page) {
        for (let topic = 0; topic < count; topic++) {
          const key = `${index}-${topic}`;
          if (status.done) pageState.tp[key] = true;
          else delete pageState.tp[key];
        }
        pageState.applied[String(index)] = Number(status.at);
      }
    });

    store.pages[page] = pageState;
    writeStore(store);
    return pageState.tp;
  }

  function save(page, topicProgress, legacyKey) {
    const store = readStore();
    const pageState = store.pages[page] || { applied: {} };
    pageState.tp = topicProgress;
    if (!pageState.applied) pageState.applied = {};
    store.pages[page] = pageState;
    writeStore(store);
    try {
      const legacy = { v: page === "detailed" ? 2 : undefined, tp: topicProgress };
      localStorage.setItem(legacyKey, JSON.stringify(legacy));
    } catch (error) {}
  }

  function setUnitComplete(page, index, isComplete, topicProgress, legacyKey) {
    const store = readStore();
    const pageState = store.pages[page] || { applied: {} };
    if (!pageState.applied) pageState.applied = {};
    pageState.tp = topicProgress;
    const timestamp = Date.now();
    pageState.applied[String(index)] = timestamp;
    store.pages[page] = pageState;
    store.units[String(index)] = {
      done: Boolean(isComplete),
      at: timestamp,
      source: page
    };
    writeStore(store);
    try {
      const legacy = { v: page === "detailed" ? 2 : undefined, tp: topicProgress };
      localStorage.setItem(legacyKey, JSON.stringify(legacy));
    } catch (error) {}
  }

  window.CourseProgressSync = { load, save, setUnitComplete };
})();
