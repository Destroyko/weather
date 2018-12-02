<template>
    <div class="card-deck mb-3">
        <user-info/>
    </div>
</template>

<script>
    import UserInfo from "../common/user-info";
    export default {
        name: "right-side",
        components: {UserInfo}
    }
</script>

<style scoped>

</style>