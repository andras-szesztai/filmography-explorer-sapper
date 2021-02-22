<div class="relative-container">
  <slot />
  <div class="absolute-container">Absolte content</div>
</div>

<style lang="scss">
  .relative-container {
    position: relative;
    display: inline;
  }

  .relative-container {
    position: absolute;
    background: red;
    width: 10px;
    height: 10px;
  }
</style>
