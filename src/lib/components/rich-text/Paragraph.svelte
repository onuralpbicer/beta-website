<script lang="ts">
    import type {CustomBlockComponentProps} from '@portabletext/svelte'
    import type {Snippet} from "svelte";

    interface Props {
        portableText: CustomBlockComponentProps
        children: Snippet
    }

    let {portableText, children}: Props = $props()

</script>

<p class="my-8">
    {@render children()}
</p>
