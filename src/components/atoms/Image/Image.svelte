<script lang="ts">
  import { IMAGE_ROOT_URL } from '../../../constants/requests'

  export let size: 'small' | 'medium' | 'large' = 'medium'
  export let src: string | undefined
  export let alt: string | undefined
</script>

{#if src}
  <img class={`${size} image`} src={`${IMAGE_ROOT_URL}${src}`} {alt} />
{:else}
  <div class={`placeholder ${size} image`} />
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';

  .image {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  .placeholder {
    background-color: $colorTertiary;
  }
  .small {
    height: 60px;
    width: 40px;
    border-radius: 2px;
  }

  .medium {
    height: 112px;
    width: 74px;
    border-radius: 3;
  }

  .large {
    height: 164px;
    width: 108px;
    border-radius: 3px;
  }
</style>
