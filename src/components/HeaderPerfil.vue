<script lang="ts">
    import { defineComponent } from 'vue';
    import HeaderAcoes from './HeaderAcoes.vue';
    
    export default defineComponent({
    props: {
        usuario: {} as any
    },
    components: { HeaderAcoes }
});
</script>
<template>
    <div class="container-header-perfil" >
      <HeaderAcoes />
    </div>    
</template>

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />