<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <left-side></left-side>
        </div>
        <div class="col">
          <right-side></right-side>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "./components/layout/left-side";
import RightSide from "./components/layout/right-side";

export default {
  name: 'App',
  components: {RightSide, LeftSide}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
