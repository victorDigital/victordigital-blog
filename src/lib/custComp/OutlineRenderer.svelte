<script lang="ts">
  import { outlineStore } from "$lib/js/store";
  import { smoothScroll } from "$lib/js/utils";
  import { onMount } from "svelte";

  export let inView: Element[] = [];

  function idInView(id: string) {
    console.log("ran");
    return inView.some((el) => el.id === id);
  }

  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

<div class="hidden lg:flex flex-col gap-4 ml-4 max-w-64">
  <div class="sticky top-20">
    <h3 class="text-xl font-bold sticky">In This Post</h3>
    <div class="flex flex-col">
      {#if ready}
        {#key inView}
          {#each $outlineStore as { id, text, depth }, i}
            <button
              class="text-sm font-light
                {'px-' + (depth - 1) * 2} 
                text-muted-foreground hover:text-primary text-left py-1 pr-0 border-green-700 dark:border-green-500 
                {idInView(id)
                ? 'border-l-2'
                : 'border-l-0'}"
              on:click={() => smoothScroll("#" + id)}
            >
              {text}
            </button>
          {/each}
        {/key}
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
  </div>
</div>
