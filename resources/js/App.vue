<template>
    <div class="app-container">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
.app-container {
    width: 100%;
    min-height: 100vh;
}
</style>