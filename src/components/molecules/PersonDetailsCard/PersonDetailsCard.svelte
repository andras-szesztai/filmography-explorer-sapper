<script lang="ts">
  import personStore from '../../../stores/personStore'

  $: store = $personStore
  $: loading = store.loading
  $: details = store.details
  $: error = store.error
</script>

{#if details}
  <div class="container"><span>{details.name}</span></div>
{/if}s

<style lang="scss">
  @import '../../../styles/variables.scss';

  .container {
    grid-area: person;
    background-color: $colorLight;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
