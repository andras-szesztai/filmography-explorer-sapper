<script lang="ts">
  import {
    PersonDetailsCard,
    MovieDetailsCard,
    MainChart,
  } from '../../organisms'
</script>

<section>
  <PersonDetailsCard />
  <MovieDetailsCard />
  <div class="filter" />
  <MainChart />
  <div class="quick" />
  <div class="info" />
</section>

<style lang="scss">
  @import '../../../styles/variables.scss';

  section {
    height: 100%;
    display: grid;
    padding: 24px;

    grid-template-columns: 1fr 444px;
    column-gap: 24px;
    grid-template-rows: repeat(2, 70px) 1fr 50px;
    row-gap: 24px;
    grid-template-areas:
      'search person'
      'filter person'
      'chart movie'
      'quick info';
  }

  div {
    border: 1px solid white;
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
