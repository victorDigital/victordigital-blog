<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { markdown } from "@codemirror/lang-markdown";
  import type { PageData } from "./$types";
  import { materialDark } from '@uiw/codemirror-theme-material';

  export let data: PageData;
  const content = data.post.content;

  let value = content;

</script>
<CodeMirror bind:value lang={markdown()} theme={materialDark} lineWrapping readonly/>
