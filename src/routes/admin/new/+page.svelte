<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { LockClosed, Plus, DotsVertical, EyeOpen, EyeNone } from "radix-icons-svelte";
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import FormInput from "$lib/custComp/FormInput.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { onDestroy, onMount } from "svelte";
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;

  export let data: PageData;
  const { form, errors, constraints, enhance } = superForm(data.form, {
    clearOnSubmit: "none",
    dataType: "json",
  });

  onMount(async () => {
    $form.date = new Date().toISOString().split("T")[0];
    $form.authorUUID = "1234";
    $form.author = "Victor";
    $form.uid = Math.random().toString(36).substring(2, 7);

    // Import our 'monaco.ts' file here
    // (onMount() will only be executed in the browser, which is what we want)
    monaco = (await import("./monaco")).default;

    // Your monaco instance is ready, let's display some code!
    const editor = monaco.editor.create(editorContainer);
    const model = monaco.editor.createModel($form.content, "markdown");
    monaco.editor.setTheme("vs-dark");

    //get the editor text and update the form
    editor.onDidChangeModelContent(() => {
      $form.content = editor.getValue();
    });
    editor.setModel(model);
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });

  $: if ($form.title) {
    $form.slug = $form.title.toLowerCase().replace(/ /g, "-");
  }
</script>

<div class="w-full h-40">
  <div class="flex flex-col justify-center h-full">
    <div class="container flex items-center justify-between mx-auto">
      <h1 class="text-4xl font-semibold">New Post</h1>
      <div class="flex gap-4">
        <!--actions-->
      </div>
    </div>
    <div class="container mx-auto mt-3">
      <p class="opacity-75">Create a new post here.</p>
    </div>
  </div>
</div>
<Separator class="mb-3" />

<form method="POST" use:enhance enctype="multipart/form-data">
  <div class="flex gap-3">
    <div class="w-1/2">
      <Label>Content</Label>
      <div>
        <div class="h-screen" bind:this={editorContainer} />
      </div>
      <p class="text-sm text-muted-foreground">
        Not to worry, <Badge variant="outline">Markdown Supported</Badge>
      </p>
    </div>
    <div class="w-1/2">
      <FormInput
        label="Title"
        bind:value={$form.title}
        errors={$errors.title}
        text="Enter the post title"
        constraints={$constraints.title}
      />
      <FormInput
        label="Slug"
        bind:value={$form.slug}
        errors={$errors.slug}
        text="Enter the post slug"
        constraints={$constraints.slug}
      />
      <FormInput
        label="Sub Title"
        bind:value={$form.subTitle}
        errors={$errors.subTitle}
        text="Enter the post sub title"
        constraints={$constraints.subTitle}
      />
      <FormInput
        label="Cover Image"
        bind:value={$form.coverImageFile}
        errors={$errors.coverImageFile}
        text="Upload the post cover image"
        type="file"
        constraints={$constraints.coverImageFile}
      />
      <FormInput
        label="Cover Image Link"
        bind:value={$form.coverImageLink}
        errors={$errors.coverImageLink}
        text="Enter the post cover image link"
        constraints={$constraints.coverImageLink}
      />
      <FormInput
        label="Cover Image Alt"
        bind:value={$form.coverImageAlt}
        errors={$errors.coverImageAlt}
        text="Enter the post cover image alt"
        constraints={$constraints.coverImageAlt}
      />
      <FormInput
        label="Topic"
        bind:value={$form.topic}
        errors={$errors.topic}
        text="Enter the post topic"
        constraints={$constraints.topic}
      />
      <FormInput
        label="Topic Color"
        bind:value={$form.topicColor}
        errors={$errors.topicColor}
        text="Enter the post topic color"
        constraints={$constraints.topicColor}
      />
      <FormInput
        label="Author"
        bind:value={$form.author}
        errors={$errors.author}
        text="Enter the post author"
        constraints={$constraints.author}
      />
      <FormInput
        label="Author UUID"
        bind:value={$form.authorUUID}
        errors={$errors.authorUUID}
        text="Enter the post author UUID"
        constraints={$constraints.authorUUID}
      />
      <FormInput
        label="UID"
        bind:value={$form.uid}
        errors={$errors.uid}
        text="Enter the post UID"
        constraints={$constraints.uid}
      />
      <FormInput
        label="date"
        bind:value={$form.date}
        errors={$errors.date}
        text="Enter the post date"
        constraints={$constraints.date}
        type="date"
      />
      <FormInput
        label="Min To Read"
        bind:value={$form.minToRead}
        errors={$errors.minToRead}
        text="Enter the post time to read in minutes"
        constraints={$constraints.minToRead}
        type="number"
      />
    </div>
  </div>

  <Button type="submit">
    <Plus class="w-5 h-5" />
    <span>Create Post</span>
  </Button>
</form>
