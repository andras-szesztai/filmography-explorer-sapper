<script lang="ts">
  import { fade } from 'svelte/transition'
  import { IMAGE_ROOT_URL } from '../../../constants/requests'

  export let size: 'small' | 'medium' = 'medium'
  export let src: string | undefined
  export let alt: string | undefined
</script>

<div in:fade class={`placeholder ${size}`}>
  {#if src}
    <img class={`${size}`} src={`${IMAGE_ROOT_URL}${src}`} {alt} />
  {/if}
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';
  .placeholder {
    background-color: $colorTertiary;
  }
  .small {
    height: 60px;
    width: 40px;
    border-radius: 3px;
  }
</style>
