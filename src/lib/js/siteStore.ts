import { writable } from "svelte/store";

export const siteStore = (startingVal: any) => {
  const { subscribe, set, update } = writable(startingVal);
  return {
    subscribe,
    set,
    update,
  };
};
