<script lang="ts">
  import { fade } from 'svelte/transition'

  import { Image } from '../../atoms'
  import { Star } from '../../atoms/icons'

  import personStore from '../../../stores/personStore'

  $: store = $personStore
  // $: loading = store.loading
  $: details = store.details
  // $: error = store.error
</script>

{#if details}
  <div in:fade class="container">
    <div class="photo">
      <Image src={details.profile_path} alt="" size="large" />
    </div>
    <div class="name">
      <h1>
        {details.name}
      </h1>
      <button aria-label={`Mark ${details.name} as favorite`} class="icon">
        <Star />
      </button>
    </div>
    <div tabindex="0" class="desc">
      <p>
        {details.biography}
      </p>
    </div>
  </div>
{/if}

<!-- TODO: UPDATE When Logged in -->
<style lang="scss">
  @import '../../../styles/variables.scss';

  .container {
    grid-area: person;
    background-color: $colorLight;

    padding: 16px;

    display: grid;
    grid-template-columns: 88px 1fr;
    column-gap: 16px;
    grid-template-rows: min-content 1fr;
    row-gap: 4px;
    grid-template-areas:
      'image name'
      'image desc';

    border-radius: 6px;
  }

  .photo {
    grid-area: image;
  }

  .name {
    grid-area: name;
    display: flex;
    align-items: center;
    h1 {
      max-width: 250px;
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
    margin-left: 12px;
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
    border-radius: 5px;
    padding: 6px 8px;
    overflow-y: scroll;

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
