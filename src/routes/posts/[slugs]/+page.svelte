<script lang="ts">
    import type { PageData } from './$types';
    import SvelteMarkdown from "svelte-markdown";
    
    export let data: PageData;
    console.log(data);
</script>

<SvelteMarkdown source={data.post.content} />