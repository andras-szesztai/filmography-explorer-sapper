<script lang="ts">
  import { color } from '../../../../styles/variables'
  export let fill: string = color.light
  export let size = 20
</script>

<svg viewBox="0 0 100 100" height={size}>
  <path
    d="M34.8,11.3l36.7,35.4c1.8,1.8,1.9,4.7,0.1,6.5c0,0-0.1,0.1-0.1,0.1L34.8,88.7c-1.8,1.7-4.7,1.7-6.5-0.2
			c-0.8-0.8-1.3-2-1.3-3.1V14.6c0-2.5,2.1-4.6,4.6-4.6C32.9,10,34,10.5,34.8,11.3z"
    {fill}
  />
  <rect fill="none" width="100" height="100" />
</svg>
