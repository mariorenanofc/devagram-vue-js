<script lang="ts">
    import { defineComponent } from 'vue';
    import Postagem from './Postagem.vue';
    
    export default defineComponent({
    props: {
        posts: Array
    },
    components: { Postagem }
});
</script>
<template>
     <div class="container-feed">
        <Postagem  /> <!--:post="item" v-for="item in posts"-->
     </div>
</template>

<style lang="scss" src="@/assets/styles/feed.scss" />