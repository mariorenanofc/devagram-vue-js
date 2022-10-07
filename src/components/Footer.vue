<script lang="ts">
    import { defineComponent } from 'vue';
    import Navegacao from './Navegacao.vue';

    export default defineComponent({
        components: { Navegacao }
    });
</script>
<template>
    <footer class="container-footer" >
        <Navegacao />
    </footer>    
</template>

<style lang="scss" src="@/assets/styles/footer.scss" />