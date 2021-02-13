<script lang="ts">
  import type { TLinkNames, TPathNames } from '../../../types/links'

  import { currPath } from '../../../stores/pathname'

  export let href: TPathNames
  export let text: TLinkNames
  export let noMargin: boolean = false

  $: isActive = $currPath === href
</script>

<li>
  <a on:click {href} class:margin-right={!noMargin} class:active={isActive}
    >{text}</a
  >
</li>

<style lang="scss">
  @import '../../../styles/variables.scss';

  li {
    display: block;
    float: left;
  }

  a {
    text-decoration: none;
    font-weight: $normal;
    font-size: $fs-h6;
    padding: 1em 0.5em;
    display: block;
    transition: color 0.2s ease;

    color: $colorLight;

    &:hover {
      color: $colorSecondary;
    }
  }

  .margin-right {
    margin-right: 16px;
  }

  .active {
    color: $colorSecondary;
  }
</style>
