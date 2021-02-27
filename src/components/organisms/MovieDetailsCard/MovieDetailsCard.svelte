<script lang="ts">
  import { fade } from 'svelte/transition'

  import { Image, SkeletonLoader } from '../../atoms'

  import movieStore from '../../../stores/movieStore'
  import { TooltipBottom } from '../../atoms/tooltips'
  import { LoginToFavorite } from '../../atoms/tooltipContents'

  // import { Image, SkeletonLoader } from '../../atoms'
  // import { Star } from '../../atoms/icons'
  // import { TooltipBottom } from '../../atoms/tooltips'
  // import { LoginToFavorite } from '../../atoms/tooltipContents'

  $: store = $movieStore
  $: details = store.details
  $: credits = store.credits
  $: loading = store.loading
  $: error = store.error

  // TODO: make two content types for medi types, fix loaders
</script>

{#if details || loading}
  <div in:fade class="container">
    {#if !error}
      <div class="title-container">
        {#if true}
          <SkeletonLoader place="photo" />
        {:else if details}
          <div in:fade={{ delay: 100 }} class="photo">
            <Image src={details.poster_path} alt="" size="large" />
            <div in:fade={{ delay: 100 }} class="title">
              <TooltipBottom topOffset={4}>
                <h1>Test</h1>
                <span slot="content">Test</span>
              </TooltipBottom>
              <button aria-label={`Mark ${'test'} as favorite`} class="icon">
                <TooltipBottom topOffset={4}>
                  <div>Favorite</div>
                  <div slot="content"><LoginToFavorite /></div>
                </TooltipBottom>
              </button>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div>Sorry, something went wrong, please try again later.</div>
    {/if}
  </div>
{/if}

<!-- TODO: UPDATE When Logged in -->
<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    grid-area: movie;
    display: grid;
    grid-template-rows: max-content 1fr;
    row-gap: 8px;
  }
  .title-container {
    display: grid;
    grid-template-columns: 108px 1fr;
    column-gap: 16px;
    grid-template-rows: max-content 1fr;
    row-gap: 8px;
    grid-template-areas:
      'photo title'
      'photo desc';

    .photo {
      grid-area: photo;
    }

    .title {
      grid-area: title;
      display: flex;
      align-items: center;
      h1 {
        max-width: 260px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: $fs-h1;
        line-height: 1.15;
        font-weight: $semibold;
        color: $colorLight;
      }
    }
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
