<script lang="ts">
  export let href: '/' | 'my-favorites' | 'about'
</script>

<li>
  <a {href}>About</a>
</li>

<style lang="scss">
  @import '../../../styles/variables.scss';

  li {
    display: block;
    float: left;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>
