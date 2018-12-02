<template>
  <div class="card-deck mb-3">
    <user-info></user-info>
  </div>
</template>

<script>
import UserInfo from "../common/user-info";
export default {
  name: 'home',
    components: {UserInfo}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
