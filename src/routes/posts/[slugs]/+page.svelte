<script lang="ts">
    import type { PageData } from './$types';
    import SvelteMarkdown from "svelte-markdown";
    import PostHeadingRenderer from '$lib/custComp/PostHeadingRenderer.svelte';
    import CodeBlockRenderer from '$lib/custComp/codeBlockRenderer.svelte';
    import TableRenderer from '$lib/custComp/TableRenderer.svelte';
    import { smoothScroll } from '$lib/js/utils';
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import { onMount } from 'svelte';
    import type { Post } from '$lib/types/post';
    import TableBody from '$lib/components/ui/table/table-body.svelte';
    import TableBodyRenderer from '$lib/custComp/TableBodyRenderer.svelte';
    import TableHeadRenderer from '$lib/custComp/TableHeadRenderer.svelte';
  import TableCellRenderer from '$lib/custComp/TableCellRenderer.svelte';
  import TableRowRenderer from '$lib/custComp/TableRowRenderer.svelte';
    
    export let data: PageData;
    console.log(data);
    let post = data.post;

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
            <Badge variant="outline" class="{"border-"+post.topicColor+"-700"} {"dark:border-"+post.topicColor+"-500"} text-sm mb-3 mt-6">{post.topic}</Badge>
            <span class="text-sm font-light mb-3 mt-6 ml-2">{post.minToRead} min read</span>
        </div>
        <h1 class="text-5xl font-black">{post.title}</h1>
        <h2 class="text-xl font-light mb-6 mt-3">{post.subTitle}</h2>
    </div>
</div>


<div class="flex w-full justify-center mb-4">
    <div class="max-w-screen-lg w-screen lg:px-4">
        <img src={post.coverImage} class="lg:rounded-2xl object-fill mb-3" alt="">
        <div class="w-full">
            <p class="text-xs">AF</p>
            <div class="flex justify-between">
                <p>{post.author}</p>
                <p class="opacity-70">{post.date}</p>
            </div>
        </div>
        <Separator class="mb-6 mt-3" />
    </div>
</div>

<div class="flex w-full justify-center">
    <div class="prose dark:prose-invert prose-neutral max-w-screen-md w-screen px-4 overflow-x-hidden">
        <SvelteMarkdown source={post.content} renderers={
            {
                heading: PostHeadingRenderer, 
                code: CodeBlockRenderer,
                table: TableRenderer,
                tablebody: TableBodyRenderer,
                tablehead: TableHeadRenderer,
                tablecell: TableCellRenderer,
                tablerow: TableRowRenderer,
            }} 
        />
    </div>
</div>