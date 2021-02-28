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
  export let iconMarginRight = 0
  export let icon: typeof SvelteComponent
</script>

<div class="container">
  {#if !error}
    {#if !loading}
      <div class="photo">
        <Image src={imageSrc} alt="" size="large" />
      </div>
      <div class="title">
        <TooltipBottom topOffset={4}>
          <h1>
            {title}
          </h1>
          <span slot="content">{title}</span>
        </TooltipBottom>
        <button
          style="margin-right: {iconMarginRight}px"
          aria-label="Mark {title} as {actionWhenLoggedIn}"
          class="icon"
        >
          <TooltipBottom topOffset={4}>
            <svelte:component this={icon} />
            <div slot="content"><LoginToFavorite {actionWhenLoggedIn} /></div>
          </TooltipBottom>
        </button>
      </div>
      <div tabindex="0" class="desc">
        <p>
          {description}
        </p>
      </div>
    {/if}
    <SkeletonLoader {loading} place="photo" />
    <SkeletonLoader {loading} place="title" />
    <SkeletonLoader {loading} place="desc" />
  {:else if error && !loading}
    <div transition:fade={{ delay: 100 }} class="error">
      Sorry, something went wrong
    </div>
  {/if}
</div>

<!-- TODO: UPDATE When Logged in -->
<style lang="scss">
  @import '../../../styles/variables.scss';
  .container {
    position: relative;
    display: grid;
    grid-template-columns: 108px 1fr;
    column-gap: 16px;
    grid-template-rows: 36px 116px;
    row-gap: 12px;
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
        max-width: 335px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: $fs-h2;
        line-height: 1.15;
        font-weight: $semibold;
        color: $colorLight;
      }
    }

    .icon {
      margin-left: 4px;
      transform: translateY(1px);
      border: none;
      background: transparent;
      cursor: not-allowed;

      &:focus-visible {
        border: 1px solid $colorSecondary;
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
        border: 2px solid $colorSecondary;
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
    .error {
      position: absolute;
      font-size: $fs-h2;
      line-height: 1.15;
      font-weight: $semibold;
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
    background: rgba($colorLight, 0.35);
  }

  ::-webkit-scrollbar-thumb {
    background: $colorSecondary;
    border-radius: 2px;
  }
</style>
