<script lang="ts">
    export let depth: number;
    export let text: string;
    export let raw: string;

    import { Link2 as Link } from "radix-icons-svelte";
    import { smoothScroll } from "$lib/js/utils";
    import { replaceState } from "$app/navigation";

    // the id of the heading is the text in lower case with spaces replaced by hyphens
    let id = encodeURIComponent(text.toLowerCase()).replace(/%20/g, "-").replace(/%/g, "-");


    function setUrlParam(id: string) {
        return () => {
            const url = new URL(window.location.href);
            url.hash = id;
            replaceState(url.href, { replace: true });
            smoothScroll(id);
        };
    }
</script>

{#if depth === 1}
    <div class="flex flex-row gap-4 items-baseline group">
        <h1 id="{id}">{text}</h1>
        <button on:click={setUrlParam(id)}>
            <Link class="group-hover:flex hidden w-4 h-4"></Link>
        </button>
    </div>
{:else if depth === 2}
    <div class="flex flex-row gap-4 items-baseline group">
        <h2 id="{id}">{text}</h2>
        <button on:click={setUrlParam(id)}>
            <Link class="group-hover:flex hidden w-4 h-4"></Link>
        </button>
    </div>
{:else if depth === 3}
    <div class="flex flex-row gap-4 items-baseline group">
        <h3 id="{id}">{text}</h3>
        <button on:click={setUrlParam(id)}>
            <Link class="group-hover:flex hidden w-4 h-4"></Link>
        </button>
    </div>
{:else if depth === 4}
    <div class="flex flex-row gap-4 items-baseline group">
        <h4 id="{id}">{text}</h4>
        <button on:click={setUrlParam(id)}>
            <Link class="group-hover:flex hidden w-4 h-4"></Link>
        </button>
    </div>
{:else if depth === 5}
    <div class="flex flex-row gap-4 items-baseline group">
        <h5 id="{id}">{text}</h5>
        <button on:click={setUrlParam(id)}>
            <Link class="group-hover:flex hidden w-4 h-4"></Link>
        </button>
    </div>
{:else if depth === 6}
    <div class="flex flex-row gap-4 items-baseline group">
        <h6 id="{id}">{text}</h6>
        <button on:click={setUrlParam(id)}>
            <Link class="group-hover:flex hidden w-4 h-4"></Link>
        </button>
    </div>
{:else}
  {raw}
{/if}