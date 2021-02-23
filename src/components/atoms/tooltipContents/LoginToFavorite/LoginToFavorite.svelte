<script lang="ts">
</script>

<div class="container">
  <p>
    You have to
    <span> login </span>
    to be able to favorite!
  </p>
</div>

<style lang="scss">
  @import '../../../../styles/variables.scss';
  .container {
    width: 100px;

    p {
      text-align: left;
      font-size: $fs-milli;
      font-weight: $semibold;
      color: $colorPrimary;

      span {
        background-color: $colorSecondary;
        color: $colorLight;
        padding: 1px 8px;
        border-radius: 2px;
      }
    }
  }
</style>
