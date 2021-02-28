<script lang="ts">
  export let actionWhenLoggedIn: string
</script>

<div class="container">
  <p>
    You have to
    <span> login </span>
    to be able to {actionWhenLoggedIn}
  </p>
</div>

<style lang="scss">
  @import '../../../../styles/variables.scss';
  .container {
    width: 120px;

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
