<script lang="ts">
  import { fade } from 'svelte/transition'

  import { Image, SkeletonLoader } from '../../atoms'
  import { Star } from '../../atoms/icons'
  import { TooltipBottom } from '../../atoms/tooltips'
  import { LoginToFavorite } from '../../atoms/tooltipContents'

  import personStore from '../../../stores/personStore'

  $: store = $personStore
  $: loading = store.loading
  $: details = store.details
  $: error = store.error
</script>

{#if details || loading}
  <div in:fade class="container">
    {#if !error}
      {#if loading}
        <SkeletonLoader place="photo" />
        <SkeletonLoader place="name" />
        <SkeletonLoader place="desc" />
      {:else if details}
        <div in:fade={{ delay: 100 }} class="photo">
          <Image src={details.profile_path} alt="" size="large" />
        </div>
        <div in:fade={{ delay: 100 }} class="name">
          <TooltipBottom topOffset={4}>
            <h1>
              {details.name}
            </h1>
            <span slot="content">{details.name}</span>
          </TooltipBottom>
          <button aria-label={`Mark ${details.name} as favorite`} class="icon">
            <TooltipBottom topOffset={4}>
              <Star />
              <div slot="content"><LoginToFavorite /></div>
            </TooltipBottom>
          </button>
        </div>
        <div in:fade={{ delay: 100 }} tabindex="0" class="desc">
          <p>
            {details.biography}
          </p>
        </div>
      {/if}
    {:else}
      <div class="name">
        Sorry, something went wrong, please try again later.
      </div>
    {/if}
  </div>
{/if}

<!-- TODO: UPDATE When Logged in -->
<style lang="scss">
  @import '../../../styles/variables.scss';

  .container {
    grid-area: person;

    padding: 16px;

    display: grid;
    grid-template-columns: 88px 1fr;
    column-gap: 16px;
    grid-template-rows: min-content 1fr;
    row-gap: 8px;
    grid-template-areas:
      'photo name'
      'photo desc';

    border-radius: 4px;
  }

  .photo {
    grid-area: photo;
  }

  .name {
    grid-area: name;
    display: flex;
    align-items: center;
    h1 {
      max-width: 225px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: $fs-h1;
      line-height: 1.15;
      font-weight: $semibold;
      color: $colorLight;
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
    background: rgba($colorLight, 0.35);
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
