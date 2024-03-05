<script lang="ts">
  import type { Post } from "$lib/types/post";
  import Badge from "$lib/components/ui/badge/badge.svelte";

  export let post: Post;
</script>

<div class="p-2 mb-6 border-2 break-inside-avoid border-secondary rounded-2xl group">
  <a href={"posts/" + post.slug}>
    <div class="aspect-[3/1] overflow-hidden rounded-xl">
      <!-- <img class="group-hover:[view-transition-name:postimg]" src={post.coverImage} alt={post.coverImageAlt}> -->
      <picture>
        <source width="600" height="200" srcset={post.coverimagelink200x600avif} type="image/avif" />
        <source width="600" height="200" srcset={post.coverimagelink200x600webp} type="image/webp" />
        <source width="600" height="200" srcset={post.coverimagelink200x600png} type="image/png" />
        <img width="600" height="200" src={post.coverimagelink} alt={post.coverimagealt} />
      </picture>
    </div>
    <h2 class="mt-2 text-2xl font-semibold">{post.title}</h2>
    <p class="opacity-75">{post.subtitle}</p>
    <div class="flex items-center gap-4 ml-3">
      <Badge
        variant="outline"
        class="{'border-' + post.topiccolor + '-700'} {'dark:border-' + post.topiccolor + '-500'} text-sm mb-3 mt-6"
        >{post.topic}</Badge
      >
      <span class="mt-6 mb-3 ml-2 text-sm font-light">{post.mintoread} min read</span>
    </div>
  </a>
</div>
