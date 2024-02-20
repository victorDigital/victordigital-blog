<script lang="ts">
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";
  import PostHeadingRenderer from "$lib/custComp/PostHeadingRenderer.svelte";
  import CodeBlockRenderer from "$lib/custComp/codeBlockRenderer.svelte";
  import TableRenderer from "$lib/custComp/TableRenderer.svelte";
  import { smoothScroll } from "$lib/js/utils";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { onMount } from "svelte";
  import TableBodyRenderer from "$lib/custComp/TableBodyRenderer.svelte";
  import TableHeadRenderer from "$lib/custComp/TableHeadRenderer.svelte";
  import TableCellRenderer from "$lib/custComp/TableCellRenderer.svelte";
  import TableRowRenderer from "$lib/custComp/TableRowRenderer.svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Code, Quote } from "radix-icons-svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import Button from "$lib/components/ui/button/button.svelte";
  import { outlineStore } from "$lib/js/store";
  import OutlineRenderer from "$lib/custComp/OutlineRenderer.svelte";
  
  $outlineStore = [];
  let headingsInView: Element[] = [];


  export let data: PageData;
  console.log(data);
  let post = data.post;
  let showLoadMore = true;
  let fullContent = post.content;
  let showedContent = post.content.slice(0, 3000);

  function loadMore() {
    $outlineStore = [];
    showedContent = fullContent;
    showLoadMore = false;
  }

  onMount(async () => {
    const url = new URL(window.location.href);
    const hash = url.hash;

    if (hash) {
      loadMore();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      smoothScroll(hash);
    }

    window.addEventListener("scroll", () => {
      let temp = findHeadingsInView();
      if (temp.length > 0) {
        headingsInView = temp;
      }
    });
  });

  function findHeadingsInView() {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingsInView = [];

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        headingsInView.push(heading);
      }
    }

    //filter so only the headings that have an id are left
    return headingsInView.filter((el) => el.id);
  }
</script>

<div class="flex w-full justify-center mb-4">
  <div class="max-w-screen-md w-screen px-4">
    <div class="flex items-center gap-4">
      <Badge
        variant="outline"
        class="{'border-' + post.topicColor + '-700'} {'dark:border-' + post.topicColor + '-500'} text-sm mb-3 mt-6"
        >{post.topic}</Badge
      >
      <span class="text-sm font-light mb-3 mt-6 ml-2">{post.minToRead} min read</span>
    </div>
    <h1 class="text-3xl lg:text-5xl font-black">{post.title}</h1>
    <h2 class="text-xl font-light mb-6 mt-3">{post.subTitle}</h2>
  </div>
</div>

<div class="flex w-full justify-center mb-4">
  <div class="max-w-screen-lg w-screen lg:px-4">
    <img src={post.coverImage} class="lg:rounded-2xl object-fill mb-3 [view-transition-name:postimg]" alt="" />
    <div class="w-full">
      <div class="flex justify-between items-end mx-2">
        <div class="flex flex-row items-center gap-6">
          <div>
            <p class="text-xs">AF</p>
            <p>{post.author}</p>
          </div>
          <div>
            <Tooltip.Root>
              <Tooltip.Trigger
                ><a href="/raw/{post.uid}"><Code class="text-gray-500 dark:text-gray-400 w-6 h-6" /></a
                ></Tooltip.Trigger
              >
              <Tooltip.Content>
                <p>View page source</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
          <div>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <Sheet.Root>
                  <Sheet.Trigger><Quote class="text-gray-500 dark:text-gray-400 w-6 h-6" /></Sheet.Trigger>
                  <Sheet.Content>
                    <Sheet.Header>
                      <Sheet.Title>Cite this page</Sheet.Title>
                      <Sheet.Description>
                        <div>
                          <h5 class="text-lg font-bold">APA</h5>
                          <p>Nielsen. {post.date}. <em>{post.title}</em>. {window.location.href}</p>
                        </div>
                        <div>
                          <h5 class="text-lg font-bold">BibTeX</h5>
                          <code>
                            @misc&#123;citekey, author = "Victor Nielsen", title = "{post.title}", howpublished = "{window
                              .location.href}", month = "todo", year = "todo", note = "", annote = "" &#125;
                          </code>
                        </div>
                      </Sheet.Description>
                    </Sheet.Header>
                  </Sheet.Content>
                </Sheet.Root>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Cite this page</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
        </div>
        <p class="opacity-70">{post.date}</p>
      </div>
    </div>
    <Separator class="mb-6 mt-3" />
  </div>
</div>

<div class="flex w-full justify-center">
  <div class="prose dark:prose-invert prose-neutral max-w-screen-md w-screen px-4 overflow-x-hidden">
    {#if showLoadMore}
      <SvelteMarkdown
        source={showedContent}
        renderers={{
          heading: PostHeadingRenderer,
          code: CodeBlockRenderer,
          table: TableRenderer,
          tablebody: TableBodyRenderer,
          tablehead: TableHeadRenderer,
          tablecell: TableCellRenderer,
          tablerow: TableRowRenderer,
        }}
      />
    {:else}
      <SvelteMarkdown
        source={fullContent}
        renderers={{
          heading: PostHeadingRenderer,
          code: CodeBlockRenderer,
          table: TableRenderer,
          tablebody: TableBodyRenderer,
          tablehead: TableHeadRenderer,
          tablecell: TableCellRenderer,
          tablerow: TableRowRenderer,
        }}
      />
    {/if}
  </div>
  {#if $outlineStore.length > 0}
    <OutlineRenderer inView={headingsInView} />
  {/if}
</div>
<div class="flex w-full justify-center">
  {#if showLoadMore}
    <Button variant="default" class="my-6" on:click={loadMore}>Read more</Button>
  {/if}
</div>
