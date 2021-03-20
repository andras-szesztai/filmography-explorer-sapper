<script lang="ts">
  // import { SkeletonLoader } from '../../atoms'

  import { Bookmark } from '../../atoms/icons'
  import { DetailsTopContent, MovieDetailsBottomContent } from '../../molecules'

  import type { IMovieStore } from '../../../stores/movieStore'

  export let store: IMovieStore

  // TODO:
  // 2. Make a top details row for movies and serios separate (with genre filter)
  // 3. Make score details row for movies and series combined
  // 4. Make cast & crew details row for movies and series combined
  // 5. Make last selected movie retained too in localStorage
  $: details = store.details
  // $: credits = store.credits
  $: loading = store.loading
  $: error = store.error
</script>

{#if details || loading}
  <div class="container">
    <DetailsTopContent
      {loading}
      {error}
      title={details && ('title' in details ? details.title : details.name)}
      imageSrc={details?.poster_path}
      description={details?.overview}
      actionWhenLoggedIn="bookmark"
      icon={Bookmark}
      iconMarginRight={4}
    />
    <div class="details-container">
      <MovieDetailsBottomContent {loading} {error} {details} />
    </div>
  </div>
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    grid-area: movie;
    align-self: stretch;
    display: grid;
    width: 500px;
    grid-template-rows: max-content 1fr;
    row-gap: 16px;
  }

  .details-container {
    place-self: stretch;
    position: relative;
    background: rgba($colorLight, 0.15);
    border-radius: 3px;
  }

  ::selection {
    color: $colorPrimary;
    background: $colorSecondary;
  }
</style>
