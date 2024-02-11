<script lang="ts">

    export let text: string;
    export let lang: string;
    export let raw: string;

    import { codeToHtml } from 'shiki';
    import { mode } from 'mode-watcher';
    async function codeBlockRenderer({ code, lang }: { code: string, lang: string }) {
        const html = await codeToHtml(code, {
            lang: lang,
            //theme: 'vitesse-black'
            //theme: 'github-light'
            theme: $mode === 'dark' ? 'material-theme-darker' : 'github-light'
        })
        return html;
    }
</script>


{#key $mode}
    {#await codeBlockRenderer({ code: text, lang: lang })}
        <pre class="my-6 dark:bg-black dark:text-white text-black bg-white"><code>{text}</code></pre>
    {:then html}
        {@html html}
    {:catch error}
        <pre class="my-6 dark:bg-black dark:text-white text-black bg-white"><code>{text}</code></pre>
    {/await}
{/key}