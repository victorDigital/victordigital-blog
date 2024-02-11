<script lang="ts">
    import type { PageData } from './$types';
    import SvelteMarkdown from "svelte-markdown";
    import PostHeadingRenderer from '$lib/custComp/PostHeadingRenderer.svelte';
    import { onMount } from "svelte";
    import { smoothScroll } from '$lib/js/utils';
    
    export let data: PageData;
    console.log(data);
    let content = data.post.content;

    onMount(() => {
        const url = new URL(window.location.href);
        const hash = url.hash;
        if (hash) {
            smoothScroll(hash);
        }
    });

</script>

<div class="flex w-full justify-center">
    <div class="prose max-w-screen-md w-screen px-4 overflow-x-hidden">
        <SvelteMarkdown source={content} renderers={{heading: PostHeadingRenderer}} />
    </div>
</div>