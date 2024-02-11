<script lang="ts">
    import type { PageData } from './$types';
    import SvelteMarkdown from "svelte-markdown";
    import PostHeadingRenderer from '$lib/custComp/PostHeadingRenderer.svelte';
    import CodeBlockRenderer from '$lib/custComp/codeBlockRenderer.svelte';
    import { onMount } from 'svelte';
    import { smoothScroll } from '$lib/js/utils';
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    
    export let data: PageData;
    console.log(data);
    let content = data.post.content;
    let bannerImgUrl = data.post.coverImage;
    let title = data.post.title;
    let subTitle = data.post.subTitle;
    let topic = data.post.topic;
    let topicColor = data.post.topicColor;
    let minToRead = data.post.minToRead;

    onMount(() => {
        const url = new URL(window.location.href);
        const hash = url.hash;
        if (hash) {
            smoothScroll(hash);
        }
    });

</script>

<div class="flex w-full justify-center mb-4">
    <div class="max-w-screen-md w-screen px-4">
        <div class="flex items-center gap-4">
            <Badge variant="outline" class="{"border-"+topicColor+"-700"} {"dark:border-"+topicColor+"-500"} text-sm mb-3 mt-6">{topic}</Badge>
            <span class="text-sm font-light mb-3 mt-6 ml-2">{minToRead} min read</span>
        </div>
        <h1 class="text-5xl font-black">{title}</h1>
        <h2 class="text-xl font-light mb-6 mt-3">{subTitle}</h2>
    </div>
</div>


<div class="flex w-full justify-center mb-4">
    <div class="max-w-screen-lg w-screen lg:px-4">
        <AspectRatio ratio={16 / 9} class="overflow-hidden">
            <img src={bannerImgUrl} class="lg:rounded-2xl" alt="">
        </AspectRatio>
    </div>
</div>

<div class="flex w-full justify-center">
    <div class="prose dark:prose-invert max-w-screen-md w-screen px-4 overflow-x-hidden">
        <SvelteMarkdown source={content} renderers={{heading: PostHeadingRenderer, code: CodeBlockRenderer}} />
    </div>
</div>