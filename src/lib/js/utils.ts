import { replaceState } from "$app/navigation";

export function smoothScroll(id : string){
    const url = new URL(window.location.href);
    url.hash = id;
    replaceState(url.href, { replace: true });
    const element = document.querySelector(id);
    element?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}