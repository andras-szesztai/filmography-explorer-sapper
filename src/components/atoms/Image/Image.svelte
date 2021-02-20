<script lang="ts">
  import { IMAGE_ROOT_URL } from '../../../constants/requests'

  export let size: 'small' | 'medium' = 'medium'
  export let src: string | undefined
  export let alt: string | undefined
</script>

{#if src}
  <img class={`${size}`} src={`${IMAGE_ROOT_URL}${src}`} {alt} />
{:else}
  <div class={`placeholder ${size}`} />
{/if}

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
