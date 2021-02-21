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
      <span>
        <Star />
      </span>
    </div>
    <div class="desc">
      <p>
        {details.biography}
      </p>
    </div>
  </div>
{/if}

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
      font-size: $fs-h1;
      line-height: 1.15;
      font-weight: $semibold;
      color: $colorPrimary;
    }

    span {
      margin-left: 8px;
      transform: translateY(1px);
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
