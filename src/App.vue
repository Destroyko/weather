<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <left-side></left-side>
        </div>
        <div class="col-8">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "./components/layout/left-side";
export default {
  name: 'App',
    components: {LeftSide}
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
