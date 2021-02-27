<script lang="ts">
  import {
    PersonDetailsCard,
    MovieDetailsCard,
    MainChart,
  } from '../../organisms'

  import personStore from '../../../stores/personStore'

  $: store = $personStore
</script>

<section>
  <PersonDetailsCard />
  <MovieDetailsCard />
  <div class="filter" />
  <MainChart data={store.credits} />
  <div class="quick" />
  <div class="info" />
</section>

<style lang="scss">
  @import '../../../styles/variables.scss';

  section {
    height: 100%;
    display: grid;
    padding: 24px;

    grid-template-columns: 1fr 420px;
    column-gap: 24px;
    grid-template-rows: repeat(2, 70px) 1fr 50px;
    row-gap: 24px;
    grid-template-areas:
      'search person'
      'filter person'
      'chart movie'
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
