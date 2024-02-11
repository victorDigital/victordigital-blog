<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { LockClosed, Plus, DotsVertical, EyeOpen, EyeNone } from "radix-icons-svelte";

  import * as Form from "$lib/components/ui/form";
  import type { PageData } from "./$types";
  import { formSchema } from "./schema";
  import { onMount } from "svelte";
  import { SuperFormError } from "sveltekit-superforms";
  export let data: PageData;
  let form = data.form;
  console.log(form);

  // prefill the boring stuff
  form.data.date = new Date().toISOString().split("T")[0];
  form.data.author = "Victor";
  form.data.authorUUID = "victorUUID";
  //uid is 4 random characters a-z and 1-9
  form.data.uid = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 3);
</script>

<div class="h-40 w-full">
  <div class="flex flex-col justify-center h-full">
    <div class="container mx-auto flex justify-between items-center">
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
<Separator />

<div class="container mx-auto my-4">
  <Form.Root method="POST" {form} schema={formSchema} let:config enctype="multipart/form-data">
    <div class="grid-cols-2 grid gap-8">
      <div>
        <Form.Field {config} name="content">
          <Form.Item>
            <Form.Label>Content</Form.Label>
            <Form.Textarea class="min-h-[1100px]" />
            <Form.Description>Enter the content of the post here. Markdown supported</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
      </div>
      <div>
        <Form.Field {config} name="title">
          <Form.Item>
            <Form.Label>Title</Form.Label>
            <Form.Input />
            <Form.Description>Enter the title of the post here.</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <Form.Field {config} name="subTitle">
          <Form.Item>
            <Form.Label>Sub Title</Form.Label>
            <Form.Input />
            <Form.Description>Enter the sub title of the post here.</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <div class="flex w-full gap-4">
          <Form.Field {config} name="slug">
            <Form.Item class="w-2/3">
              <Form.Label>Slug</Form.Label>
              <Form.Input />
              <Form.Description>Enter the slug of the post here.</Form.Description>
              <Form.Validation />
            </Form.Item>
          </Form.Field>
          <Form.Field {config} name="uid">
            <Form.Item class="w-1/3">
              <Form.Label>UID</Form.Label>
              <Form.Input />
              <Form.Description>Enter the uid of the post here.</Form.Description>
              <Form.Validation />
            </Form.Item>
          </Form.Field>
        </div>
        <div class="flex w-full gap-4">
          <Form.Field {config} name="topic">
            <Form.Item class="w-2/3">
              <Form.Label>Topic</Form.Label>
              <Form.Input />
              <Form.Description>Enter the topic of the post here.</Form.Description>
              <Form.Validation />
            </Form.Item>
          </Form.Field>
          <Form.Field {config} name="topicColor">
            <Form.Item class="w-1/3">
              <Form.Label>Topic Color</Form.Label>
              <Form.Input />
              <Form.Description>Enter the topic color of the post here.</Form.Description>
              <Form.Validation />
            </Form.Item>
          </Form.Field>
        </div>
        <Form.Field {config} name="minToRead">
          <Form.Item>
            <Form.Label>Min To Read</Form.Label>
            <Form.Input type="number" />
            <Form.Description>Enter the time to read the post in minutes here.</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <Form.Field {config} name="coverImage">
          <Form.Item>
            <Form.Label>Cover image</Form.Label>
            <Form.Input type="file" accept=".jpeg, .jpg, .png" />
            <Form.Description>Pick an image to be the cover of the post</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <div class="flex flex-col px-4">
          <Form.Field {config} name="coverImageAlt">
            <Form.Item>
              <Form.Label>Cover Image Alt</Form.Label>
              <Form.Input />
              <Form.Description>Enter the alt text for the cover image here.</Form.Description>
              <Form.Validation />
            </Form.Item>
          </Form.Field>
          <Form.Field {config} name="coverImageCaption">
            <Form.Item>
              <Form.Label>Cover Image Caption</Form.Label>
              <Form.Input />
              <Form.Description>Enter the caption for the cover image here.</Form.Description>
              <Form.Validation />
            </Form.Item>
          </Form.Field>
          <div class="flex w-full gap-4">
            <Form.Field {config} name="coverImageCredit">
              <Form.Item class="w-2/3">
                <Form.Label>Cover Image Credit</Form.Label>
                <Form.Input />
                <Form.Description>Enter the credit for the cover image here.</Form.Description>
                <Form.Validation />
              </Form.Item>
            </Form.Field>
            <Form.Field {config} name="coverImageCreditLink">
              <Form.Item class="w-1/3">
                <Form.Label>Cover Image Credit Link</Form.Label>
                <Form.Input />
                <Form.Description>Enter the credit link for the cover image here.</Form.Description>
                <Form.Validation />
              </Form.Item>
            </Form.Field>
          </div>
        </div>
        <Form.Field {config} name="author">
          <Form.Item>
            <Form.Label>Author</Form.Label>
            <Form.Input />
            <Form.Description>Enter the author of the post here.</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <Form.Field {config} name="authorUUID">
          <Form.Item>
            <Form.Label>Author UUID</Form.Label>
            <Form.Input />
            <Form.Description>Enter the author UUID of the post here.</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
        <Form.Field {config} name="date">
          <Form.Item>
            <Form.Label>Published At</Form.Label>
            <Form.Input type="date" />
            <Form.Description>Enter the date the post was published here.</Form.Description>
            <Form.Validation />
          </Form.Item>
        </Form.Field>
      </div>
    </div>
    <Form.Button>Post</Form.Button>
  </Form.Root>
</div>
