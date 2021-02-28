<script lang="ts">
  import { Star } from '../../atoms/icons'
  import { DetailsTopContent } from '../../molecules'

  import type { IPersonStore } from '../../../stores/personStore'

  export let store: IPersonStore
</script>

{#if store.details || store.loading}
  <div class="card">
    <DetailsTopContent
      loading={store.loading}
      error={store.error}
      title={store.details?.name}
      imageSrc={store.details?.profile_path}
      description={store.details?.biography}
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
