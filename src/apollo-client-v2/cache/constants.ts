export enum LocalCacheName {
  COMMON = 'Common',
}

export enum LocalCacheId {
  COMMON = '0',
}

export const LocalField = new Set([
  `${LocalCacheName.COMMON}:${LocalCacheId.COMMON}`,
])
