export function smoothScroll(id: string) {
  const element = document.querySelector(id);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
}
