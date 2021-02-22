<script>
  import { MainSearchBar } from '../components/organisms'
  import { ExploreDashboard as Dashboard } from '../components/templates'
</script>

<svelte:head>
  <title>Filmography Explorer - Explore</title>
</svelte:head>

<MainSearchBar />
<Dashboard />

<style lang="scss">
  @import '../styles/variables.scss';
</style>
