<script lang="ts">
  import { color } from '../../../../styles/variables'
  export let fill: string = color.light
  export let size = 20
</script>

<svg viewBox="0 0 100 100" height={size}>
  <path
    d="M65.2,88.7L28.5,53.3c-1.8-1.8-1.9-4.7-0.1-6.5c0,0,0.1-0.1,0.1-0.1l36.7-35.4c1.8-1.7,4.7-1.7,6.5,0.2
    c0.8,0.8,1.3,2,1.3,3.1v70.9c0,2.5-2.1,4.6-4.6,4.6C67.2,90,66,89.5,65.2,88.7z"
    {fill}
  />
  <rect fill="none" width="100" height="100" />
</svg>
