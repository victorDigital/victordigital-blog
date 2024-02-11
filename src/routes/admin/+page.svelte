<script lang="ts">
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { LockClosed, Plus, DotsVertical, EyeOpen, EyeNone } from "radix-icons-svelte";
</script>

<div class="h-40 w-full">
    <div class="flex flex-col justify-center h-full">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-4xl font-semibold">Admin</h1>
            <div class="flex gap-4">
                <Button href="/admin/new" variant="outline" class="flex items-center gap-2">
                    <Plus class="w-4 h-4" />
                    <span>New Post</span>
                </Button>
                <Button href="/posts" variant="outline" class="flex items-center gap-2">
                    <EyeOpen class="w-4 h-4" />
                    <span>View Site</span>
                </Button>
                <Button variant="outline" class="flex items-center gap-2">
                    <DotsVertical class="w-4 h-4" />
                    <span>More</span>
                </Button>
            </div>
        </div>
        <div class="container mx-auto mt-3">
            <p class="opacity-75">
                This is the admin page. Here you can create, edit, and delete posts.
            </p>
        </div>
    </div>
</div>
<Separator />