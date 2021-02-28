<script lang="ts">
  import { fade } from 'svelte/transition'

  import { SkeletonLoader } from '../../atoms'

  import { Star } from '../../atoms/icons'
  import { DetailsTopContent } from '../../molecules'

  import movieStore from '../../../stores/movieStore'

  $: store = $movieStore
  $: details = store.details
  $: credits = store.credits
  $: loading = store.loading
  $: error = store.error
</script>

{#if details || loading}
  <div in:fade class="container">
    {#if details && 'title' in details}
      <DetailsTopContent
        {loading}
        {error}
        title={details.title}
        imageSrc={details.poster_path}
        description={details.overview}
        actionWhenLoggedIn="bookmark"
        icon={Star}
      />
    {:else if details && 'name' in details}
      <DetailsTopContent
        {loading}
        {error}
        title={details.name}
        imageSrc={details.poster_path}
        description={details.overview}
        actionWhenLoggedIn="bookmark"
        icon={Star}
      />
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    grid-area: movie;
    display: grid;
    grid-template-rows: max-content 1fr;
    row-gap: 8px;
  }
  ::selection {
    color: $colorPrimary;
    background: $colorSecondary;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: lighten($colorPrimary, 10%);
  }

  ::-webkit-scrollbar-thumb {
    background: $colorSecondary;
    border-radius: 2px;
  }
</style>
