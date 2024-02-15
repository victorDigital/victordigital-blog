<script lang="ts">
  import type { PageData } from "./$types";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import PostCard from "$lib/custComp/PostCard.svelte";

  export let data: PageData;
  console.log(data);
</script>

<div class="h-40 w-full">
  <div class="flex flex-col justify-center h-full">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-4xl font-semibold">All Posts</h1>
      <div class="flex gap-4">
        <!--actions-->
      </div>
    </div>
    <div class="container mx-auto mt-3">
      <p class="opacity-75">View all posts here.</p>
    </div>
  </div>
</div>
<Separator class="mb-6" />

<div class="container mx-auto">
  <div class="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6">
    {#each data.posts as post}
      <PostCard {post} />
    {/each}
  </div>
</div>
