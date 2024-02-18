<script>
  import { Separator } from "$lib/components/ui/separator";
  import Button from "$lib/components/ui/button/button.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import ModeSwitch from "./ModeSwitch.svelte";
</script>

<header
  class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 [view-transition-name:header]"
>
  <div class="container flex items-center justify-between mx-auto h-16 w-full">
    <a href="/" class="text-2xl font-bold flex items-center gap-2 [view-transition-name:logo]"
      ><span>VictorDigital</span>
      <Badge variant="outline" class="text-sm border-green-700 dark:border-green-500">BLOG</Badge></a
    >
    <div class="hidden md:flex gap-4 [view-transition-name:header-right]">
      <ModeSwitch />
      <Button href="/posts" variant="outline">Posts</Button>
      <Button href="/login" variant="link">Login</Button>
    </div>
  </div>
</header>
