<script lang="ts">
  import {
    PersonDetailsCard,
    MovieDetailsCard,
    MainChart,
  } from '../../organisms'

  import personStore from '../../../stores/personStore'
  import movieStore from '../../../stores/movieStore'

  $: pStore = $personStore
  $: mStore = $movieStore
</script>

<section class:only-movie={!!mStore.id && !pStore.id}>
  <PersonDetailsCard store={pStore} />
  <MainChart data={pStore.credits} />
  <MovieDetailsCard store={mStore} />
  {#if pStore.id}
    <div class="filter" />
  {/if}
  <div class="quick" />
  <div class="info" />
</section>

<style lang="scss">
  @import '../../../styles/variables.scss';

  section {
    height: 100%;
    display: grid;
    padding: 24px;

    grid-template-columns: 1fr 500px;
    column-gap: 48px;
    grid-template-rows: repeat(2, 70px) 1fr 50px;
    row-gap: 32px;

    grid-template-areas:
      'search person'
      'filter person'
      'chart movie'
      'quick info';
  }
  .only-movie {
    grid-template-areas:
      'search person'
      'movie person'
      'movie chart'
      'quick info';
  }
  .filter {
    grid-area: filter;
  }

  .quick {
    grid-area: quick;
  }

  .info {
    grid-area: info;
  }
</style>
