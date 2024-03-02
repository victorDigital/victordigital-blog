<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  export let label: string;
  export let value: string | File | number | null | undefined;
  export let type: string = "text";
  export let text: string;
  export let errors: string[] | undefined;
  export let constraints: any = {};
</script>

<div class="grid w-full items-center gap-1.5 mb-3">
  <Label for={label}>{label}</Label>
  <Input {type} bind:value id={label} name={label} placeholder={label} {...constraints} />
  {#if errors != undefined && errors.length > 0}
    <p class="text-sm text-red-500">{errors[0]}</p>
  {:else}
    <p class="text-sm text-muted-foreground">{text}</p>
  {/if}
</div>
