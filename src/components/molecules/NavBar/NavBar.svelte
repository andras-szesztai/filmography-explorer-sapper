<script lang="ts">
  import { NavLink } from '../../atoms'

  // export let segment: string
</script>

<nav>
  <ul>
    <NavLink href="/" />
    <NavLink href="my-favorites" />
    <NavLink href="about" />
  </ul>
</nav>

<style lang="scss">
  @import '../../../styles/variables.scss';

  nav {
    border-bottom: 1px solid $colorLight;
    font-weight: $normal;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>
