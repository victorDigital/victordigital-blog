<script lang="ts">
    import type { PageData } from './$types';
    import SvelteMarkdown from "svelte-markdown";
    
    export let data: PageData;
    console.log(data);
    let contentWithLineBreaks = data.post.content.replace(/\\n/g, '\n');
</script>

<div class="flex w-full justify-center">
    <div class="prose">
        <SvelteMarkdown source={contentWithLineBreaks} />
    </div>
</div>