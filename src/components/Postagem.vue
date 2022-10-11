<script lang="ts">
    import { defineComponent } from 'vue'; 

    export default defineComponent({
        props: {
            post: null
        }
    });
</script>
<template>
     <div class="container-postagem">
        <p>{post?._id}</p>
     </div>
</template>

<!-- <style lang="scss" src="@/assets/styles/feed.scss" /> -->