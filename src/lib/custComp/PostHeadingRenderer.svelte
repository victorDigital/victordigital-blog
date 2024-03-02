<script lang="ts">
  export let depth: number;
  export let text: string;
  export let raw: string;

  import { Link2 as Link } from "radix-icons-svelte";
  import { smoothScroll } from "$lib/js/utils";
  import { outlineStore } from "$lib/js/store";
  import { replaceState } from "$app/navigation";

  // the id of the heading is the text in lower case with spaces replaced by hyphens
  let id = "a" + encodeURIComponent(text.toLowerCase()).replace(/%20/g, "-").replace(/%/g, "-").replace(/\./g, "");

  if (depth <= 2) {
    $outlineStore = [...($outlineStore as []), { id, text }];
  }

  function setUrlParam(id: string) {
    return () => {
      const url = new URL(window.location.href);
      url.hash = id;
      replaceState(url.href, { replace: true });
      smoothScroll("#" + id);
    };
  }
</script>

{#if depth === 1}
  <div class="flex flex-row items-baseline gap-4 group">
    <h1 {id}>{text}</h1>
    <button on:click={setUrlParam(id)}>
      <Link class="hidden w-4 h-4 group-hover:flex"></Link>
    </button>
  </div>
{:else if depth === 2}
  <div class="flex flex-row items-baseline gap-4 group">
    <h2 {id}>{text}</h2>
    <button on:click={setUrlParam(id)}>
      <Link class="hidden w-4 h-4 group-hover:flex"></Link>
    </button>
  </div>
{:else if depth === 3}
  <div class="flex flex-row items-baseline gap-4 group">
    <h3 {id}>{text}</h3>
    <button on:click={setUrlParam(id)}>
      <Link class="hidden w-4 h-4 group-hover:flex"></Link>
    </button>
  </div>
{:else if depth === 4}
  <div class="flex flex-row items-baseline gap-4 group">
    <h4 {id}>{text}</h4>
    <button on:click={setUrlParam(id)}>
      <Link class="hidden w-4 h-4 group-hover:flex"></Link>
    </button>
  </div>
{:else if depth === 5}
  <div class="flex flex-row items-baseline gap-4 group">
    <h5 {id}>{text}</h5>
    <button on:click={setUrlParam(id)}>
      <Link class="hidden w-4 h-4 group-hover:flex"></Link>
    </button>
  </div>
{:else if depth === 6}
  <div class="flex flex-row items-baseline gap-4 group">
    <h6 {id}>{text}</h6>
    <button on:click={setUrlParam(id)}>
      <Link class="hidden w-4 h-4 group-hover:flex"></Link>
    </button>
  </div>
{:else}
  {raw}
{/if}
