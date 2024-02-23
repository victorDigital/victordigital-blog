<script lang="ts">
  export let text: string;
  export let lang: string;

  import { codeToHtml } from "shiki";
  import { mode } from "mode-watcher";
  import katex from "katex";
  import mermaid from "mermaid";
  import * as HoverCard from "$lib/components/ui/hover-card";

  async function codeBlockRenderer({ code, lang }: { code: string; lang: string }) {
    const html = await codeToHtml(code, {
      lang: lang,
      theme: $mode === "dark" ? "material-theme-darker" : "catppuccin-latte",
    });
    return html;
  }

  async function mathsExpression(expr: string) {
    return katex.renderToString(expr, { displayMode: true, output: "htmlAndMathml", throwOnError: false });
  }

  async function mermaidRender(expr: string) {
    mermaid.initialize({ darkMode: $mode === "dark", theme: $mode === "dark" ? "dark" : "neutral" });
    return mermaid.render("mermaid", expr);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/katex/katex.min.css" />
</svelte:head>

{#if lang === "latex"}
  {#await mathsExpression(text) then value}
    <HoverCard.Root>
      <HoverCard.Trigger class="no-underline"><div class="my-3">{@html value}</div></HoverCard.Trigger>
      <HoverCard.Content class="w-screen max-w-md break-all">
        <p class="font-mono text-sm">{text}</p>
      </HoverCard.Content>
    </HoverCard.Root>
  {/await}
{:else if lang === "mermaid"}
  {#key $mode}
    {#await mermaidRender(text) then value}
      <div class="my-3">{@html value.svg}</div>
    {/await}
  {/key}
{:else}
  {#key $mode}
    {#await codeBlockRenderer({ code: text, lang: lang })}
      <pre class="my-6 text-black bg-white dark:bg-black dark:text-white"><code>{text}</code></pre>
    {:then html}
      {@html html}
    {:catch error}
      <pre class="my-6 text-black bg-white dark:bg-black dark:text-white"><code>{text}</code></pre>
    {/await}
  {/key}
{/if}
