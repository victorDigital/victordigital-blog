<script>
  import "../app.pcss";
  import Nav from "$lib/custComp/Nav.svelte";
  import { ModeWatcher } from "mode-watcher";

  import { onNavigate } from "$app/navigation";

  onNavigate((navigation) => {
    // @ts-ignore
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      // @ts-ignore
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<ModeWatcher />
<Nav />
<slot />

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(30px);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-30px);
    }
  }

  :root::view-transition-old(root) {
    animation:
      90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation:
      210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }

  ::view-transition-old(postimg),
  ::view-transition-new(postimg) {
    /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
    animation: none;
    /* Use normal blending,
  so the new view sits on top and obscures the old view */
    mix-blend-mode: normal;
    /* Make the height the same as the group,
  meaning the view size might not match its aspect-ratio. */
    height: 100%;
    /* Clip any overflow of the view */
    overflow: clip;
  }

  /* The old view is the thumbnail */
  ::view-transition-old(postimg) {
    /* Maintain the aspect ratio of the view,
  by shrinking it to fit within the bounds of the element */
    object-fit: contain;
  }

  /* The new view is the full image */
  ::view-transition-new(postimg) {
    /* Maintain the aspect ratio of the view,
  by growing it to cover the bounds of the element */
    object-fit: cover;
  }
</style>
