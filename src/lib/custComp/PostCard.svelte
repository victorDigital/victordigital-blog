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
        <source srcset={post.coverImageLink200x600Avif} type="image/avif" />
        <source srcset={post.coverImageLink200x600Webp} type="image/webp" />
        <source srcset={post.coverImageLink200x600Png} type="image/png" />
        <img src={post.coverImageLink} alt={post.coverImageAlt} />
      </picture>
    </div>
    <h2 class="mt-2 text-2xl font-semibold">{post.title}</h2>
    <p class="opacity-75">{post.subTitle}</p>
    <div class="flex items-center gap-4 ml-3">
      <Badge
        variant="outline"
        class="{'border-' + post.topicColor + '-700'} {'dark:border-' + post.topicColor + '-500'} text-sm mb-3 mt-6"
        >{post.topic}</Badge
      >
      <span class="mt-6 mb-3 ml-2 text-sm font-light">{post.minToRead} min read</span>
    </div>
  </a>
</div>
