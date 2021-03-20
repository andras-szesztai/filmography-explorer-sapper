<script lang="ts">
  import { Bookmark } from '../../atoms/icons'
  import {
    DetailsTopContent,
    MovieDetailsBottomContent,
    MovieSelectorButtons,
  } from '../../molecules'

  import type { IMovieStore } from '../../../stores/movieStore'
  import type { IPersonStore } from '../../../stores/personStore'

  export let mStore: IMovieStore
  export let pStore: IPersonStore

  // TODO:::
  // 2. Genre list + filter
  // 3. Make score details row for movies and series combined
  // 4. Make cast & crew details row for movies and series combined
  // 5. Make last selected movie retained too in localStorage
  // 6. Make movie + persson deselectable
  // 7. wire up next and previous buttons with disabled state (needs credits from personStore)

  $: personId = pStore.id
  $: movieId = mStore.id
  $: personCredits = pStore.credits

  $: details = mStore.details
  // $: credits = mStore.credits
  $: loading = mStore.loading
  $: error = mStore.error
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
    {#if personId && personCredits}
      <MovieSelectorButtons credits={personCredits} currMovieId={movieId} />
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    grid-area: movie;
    align-self: stretch;
    display: grid;
    width: 500px;
    grid-template-rows: max-content 1fr max-content;
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
