<script lang="ts">
    import type { Post } from "$lib/types/post";
    import Badge from "$lib/components/ui/badge/badge.svelte";

    export let post: Post;
</script>

<div class="break-inside-avoid mb-6 border-secondary border-2 p-2 rounded-2xl">
    <a href={"posts/"+post.slug}>
        <div class="aspect-[21/9]  overflow-hidden rounded-xl">
            <img class="" src={post.coverImage} alt={post.coverImageAlt}>
        </div>
        <h2 class="text-2xl font-semibold mt-2">{post.title}</h2>
        <p class="opacity-75">{post.subTitle}</p>
        <div class="flex items-center gap-4 ml-3">
            <Badge variant="outline" class="{"border-"+post.topicColor+"-700"} {"dark:border-"+post.topicColor+"-500"} text-sm mb-3 mt-6">{post.topic}</Badge>
            <span class="text-sm font-light mb-3 mt-6 ml-2">{post.minToRead} min read</span>
        </div>
    </a>
</div>