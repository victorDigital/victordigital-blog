<script lang="ts">
  export let text: string;
  export let lang: string;
  export let raw: string;

  console.log(lang);

  import { codeToHtml } from "shiki";
  import { mode } from "mode-watcher";
  import katex from 'katex';

  async function codeBlockRenderer({ code, lang }: { code: string; lang: string }) {
    const html = await codeToHtml(code, {
      lang: lang,
      //theme: 'vitesse-black'
      //theme: 'github-light'
      theme: $mode === "dark" ? "material-theme-darker" : "catppuccin-latte",
    });
    return html;
  }

  async function mathsExpression(expr: string) {
    console.log(expr);
    return katex.renderToString(expr, { displayMode: true, output: "mathml" });
  }
</script>

{#if lang === "latex"}
  {#await mathsExpression(text) then value}
  <math>
    <div class="my-3">{@html value}</div>
  </math>
  {/await}
{:else}
  {#key $mode}
    {#await codeBlockRenderer({ code: text, lang: lang })}
      <pre class="my-6 dark:bg-black dark:text-white text-black bg-white"><code>{text}</code></pre>
    {:then html}
      {@html html}
    {:catch error}
      <pre class="my-6 dark:bg-black dark:text-white text-black bg-white"><code>{text}</code></pre>
    {/await}
  {/key}
{/if}
