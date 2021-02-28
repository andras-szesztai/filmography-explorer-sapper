<script lang="ts">
  import { SkeletonLoader } from '../../atoms'

  import { Bookmark } from '../../atoms/icons'
  import { DetailsTopContent } from '../../molecules'

  import type { IMovieStore } from '../../../stores/movieStore'

  export let store: IMovieStore

  $: details = store.details
  $: credits = store.credits
  $: loading = store.loading
  $: error = store.error
</script>

{#if details || loading}
  <div class="container">
    {#if details}
      <DetailsTopContent
        {loading}
        {error}
        title={'title' in details ? details.title : details.name}
        imageSrc={details.poster_path}
        description={details.overview}
        actionWhenLoggedIn="bookmark"
        icon={Bookmark}
        iconMarginRight={4}
      />
      <div class="details-container" />
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    grid-area: movie;
    width: 500px;
    display: grid;
    grid-template-rows: max-content 1fr;
    row-gap: 16px;
  }

  .details-container {
    background: rgba($colorLight, 0.15);
    border-radius: 3px;
    padding: 6px 8px;
    overflow-y: scroll;
  }

  ::selection {
    color: $colorPrimary;
    background: $colorSecondary;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba($colorLight, 0.35);
  }

  ::-webkit-scrollbar-thumb {
    background: $colorSecondary;
    border-radius: 2px;
  }
</style>
