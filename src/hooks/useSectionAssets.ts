"use client";

import { useEffect, useMemo, useState } from "react";
import {
  mergeSectionAssets,
  readSectionAssetOverrides,
  removeSectionAsset,
  upsertSectionAsset,
  writeSectionAssetOverrides,
} from "../lib/section-asset-overrides";
import type {
  EditableSectionAsset,
  SectionAssetOverridesMap,
  SectionKey,
} from "../types/sectionAssets";

export function useSectionAssets<T extends { slug: string }>(
  section: SectionKey,
  baseAssets: T[]
) {
  const [overrides, setOverrides] = useState<SectionAssetOverridesMap>({
    air: [],
    space: [],
    land: [],
    naval: [],
  });

  useEffect(() => {
    setOverrides(readSectionAssetOverrides());
  }, []);

  const assets = useMemo(() => {
    return mergeSectionAssets(baseAssets, overrides[section] ?? []);
  }, [baseAssets, overrides, section]);

  function saveAsset(asset: EditableSectionAsset) {
    setOverrides((prev) => {
      const next = upsertSectionAsset(prev, section, asset);
      writeSectionAssetOverrides(next);
      return next;
    });
  }

  function removeAsset(slug: string) {
    setOverrides((prev) => {
      const next = removeSectionAsset(prev, section, slug);
      writeSectionAssetOverrides(next);
      return next;
    });
  }

  return {
    assets,
    saveAsset,
    removeAsset,
    overrides: overrides[section] ?? [],
  };
}
