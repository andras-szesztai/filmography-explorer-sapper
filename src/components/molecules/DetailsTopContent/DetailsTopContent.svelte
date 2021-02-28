<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { SvelteComponent } from 'svelte'

  import { Image, SkeletonLoader } from '../../atoms'
  import { TooltipBottom } from '../../atoms/tooltips'
  import { LoginToFavorite } from '../../atoms/tooltipContents'

  export let loading: boolean
  export let error: string
  export let title: string | undefined
  export let imageSrc: string | undefined
  export let description: string | undefined
  export let actionWhenLoggedIn: string
  export let icon: typeof SvelteComponent
</script>

{#if !error}
  <div class="container">
    {#if loading}
      <SkeletonLoader place="photo" />
      <SkeletonLoader place="title" />
      <SkeletonLoader place="desc" />
    {:else if imageSrc}
      <div in:fade={{ delay: 100 }} class="photo">
        <Image src={imageSrc} alt="" size="large" />
      </div>
      <div in:fade={{ delay: 100 }} class="title">
        <TooltipBottom topOffset={4}>
          <h1>
            {title}
          </h1>
          <span slot="content">{title}</span>
        </TooltipBottom>
        <button aria-label="Mark {title} as {actionWhenLoggedIn}" class="icon">
          <TooltipBottom topOffset={4}>
            <svelte:component this={icon} />
            <div slot="content"><LoginToFavorite {actionWhenLoggedIn} /></div>
          </TooltipBottom>
        </button>
      </div>
      <div in:fade={{ delay: 100 }} tabindex="0" class="desc">
        <p>
          {description}
        </p>
      </div>
    {/if}
  </div>
{:else}
  <div>Sorry, something went wrong, please try again later.</div>
{/if}

<!-- TODO: UPDATE When Logged in -->
<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    display: grid;
    grid-template-columns: 108px 1fr;
    column-gap: 16px;
    grid-template-rows: 42px 115px;
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
      background: rgba($colorLight, 0.15);
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
