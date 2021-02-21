<script lang="ts">
  import { PersonDetailsCard } from './../../molecules'
</script>

<section>
  <PersonDetailsCard />
  <div class="filter" />
  <div class="movie" />
  <div class="chart" />
  <div class="quick" />
  <div class="info" />
</section>

<style lang="scss">
  @import '../../../styles/variables.scss';

  section {
    height: 100%;
    padding: 24px;
    display: grid;

    grid-template-columns: 1fr 444px;
    column-gap: 32px;
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

  .chart {
    grid-area: chart;
  }

  .movie {
    grid-area: movie;
  }

  .quick {
    grid-area: quick;
  }

  .info {
    grid-area: info;
  }
</style>
