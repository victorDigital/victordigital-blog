<script lang="ts">
  import type { PageData } from "./$types";
  import Separator from "$lib/components/ui/separator/separator.svelte";

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
<Separator class="mb-6"/>

<div class="container mx-auto">
  {#each data.posts as post}
    <a class="flex flex-col gap-2" href="/posts/{post.slug}">
      <h1 class="text-xl font-bold">{post.title}</h1>
      <p>{post.subTitle}</p>
      <p class="opacity-70 text-xs">{post.date}</p>
      <Separator class="my-4" />
    </a>
  {/each}
</div>