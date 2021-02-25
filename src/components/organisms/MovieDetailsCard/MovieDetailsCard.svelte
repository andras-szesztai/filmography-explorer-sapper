<script lang="ts">
  import { fade } from 'svelte/transition'

  import { Image, SkeletonLoader } from '../../atoms'
  import { Star } from '../../atoms/icons'
  import { TooltipBottom } from '../../atoms/tooltips'
  import { LoginToFavorite } from '../../atoms/tooltipContents'

  import personStore from '../../../stores/personStore'

  $: currPerson = $personStore.details
  // $: loading = store.loading
  // $: details = store.details
  // $: error = store.error
</script>

<div in:fade class="container">
  <div>MovieCard</div>
</div>

<!-- TODO: UPDATE When Logged in -->
<style lang="scss">
  @import '../../../styles/variables.scss';

  .container {
    grid-area: movie;
    background-color: $colorLight;

    padding: 16px;
    border-radius: 4px;

    /* display: grid;
    grid-template-columns: 88px 1fr;
    column-gap: 16px;
    grid-template-rows: min-content 1fr;
    row-gap: 8px;
    grid-template-areas:
      'photo name'
      'photo desc'; */
  }

  /* .photo {
    grid-area: photo;
  } */

  /* .name {
    grid-area: name;
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
      color: $colorPrimary;
    }
  }

  .icon {
    margin-left: 8px;
    transform: translateY(1px);
    border: none;
    background: transparent;
    cursor: not-allowed;

    &:focus-visible {
      border: 1px solid darken($colorSecondary, 5%);
    }
    &:focus {
      outline: none;
    }
  }

  .desc {
    grid-area: desc;
    background: $colorPrimary;
    border-radius: 3px;
    padding: 6px 8px;
    overflow-y: scroll;

    &:focus-visible {
      border: 2px solid darken($colorSecondary, 5%);
    }
    &:focus {
      outline: none;
    }

    p {
      font-size: $fs-milli;
      font-weight: $light;
      color: $colorLight;
    }
  } */

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
