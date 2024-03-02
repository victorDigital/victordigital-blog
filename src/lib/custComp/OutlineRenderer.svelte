<script lang="ts">
  import { outlineStore } from "$lib/js/store";
  import { smoothScroll } from "$lib/js/utils";
  import { onMount } from "svelte";

  export let inView: Element[] = [];

  function idInView(id: string) {
    return inView.some((el) => el.id === id);
  }

  let ready = false;
  onMount(() => {
    ready = true;
  });
</script>

<div class="flex-col hidden gap-4 ml-4 lg:flex max-w-64">
  <div class="sticky top-20">
    <h3 class="sticky text-xl font-bold">In This Post</h3>
    <div class="flex flex-col">
      {#if ready}
        {#key inView}
          {#each $outlineStore as { id, text, depth }, i}
            <button
              class="text-sm font-light
                text-muted-foreground hover:text-primary text-left py-1 border-green-700 dark:border-green-500
                {idInView(id) ? 'border-l-2 pl-[10px]' : 'border-l-0 pl-3'}"
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
