<script lang="ts">
  import personStore from '../../../stores/personStore'

  $: console.log($personStore.details)
</script>

<div>PersonDetailsCard</div>
