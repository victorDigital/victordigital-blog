<script lang="ts">
    import type { PageData } from './$types';
    import SvelteMarkdown from "svelte-markdown";
    
    export let data: PageData;
    console.log(data);
    let content = data.post.content;

</script>

<div class="flex w-full justify-center">
    <div class="prose max-w-screen-md w-screen px-4 overflow-x-hidden">
        <SvelteMarkdown source={content} />
    </div>
</div>