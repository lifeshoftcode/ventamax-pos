
export function useLoadingStatus(entries) {
  // entries: Array<{ loading: boolean, tip: string }>
  const isLoading = entries.some(entry => entry.loading);
  const active = entries.find(entry => entry.loading);
  const tip = active ? active.tip : '';
  return { isLoading, tip };
}