<script>
    import "../app.pcss";
    import Nav from "$lib/custComp/Nav.svelte";
    import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<Nav/>
<slot/>