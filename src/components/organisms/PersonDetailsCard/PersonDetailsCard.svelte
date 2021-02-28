<script lang="ts">
  import { fade } from 'svelte/transition'

  import { Star } from '../../atoms/icons'
  import { DetailsTopContent } from '../../molecules'

  import personStore from '../../../stores/personStore'

  $: store = $personStore
  $: loading = store.loading
  $: details = store.details
  $: error = store.error
</script>

{#if details || loading}
  <div in:fade class="card">
    <DetailsTopContent
      {loading}
      {error}
      title={details?.name}
      imageSrc={details?.profile_path}
      description={details?.biography}
      actionWhenLoggedIn="favorite"
      icon={Star}
    />
  </div>
{/if}

<style lang="scss">
  .card {
    grid-area: person;
  }
</style>
