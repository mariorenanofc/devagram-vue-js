<script lang="ts">
    import { defineComponent } from 'vue';
    import HeaderAcoes from './HeaderAcoes.vue';
    
    export default defineComponent({
    props: {
        usuario: {} as any,
        title: String,
        showLeft: Boolean,
        isLeftIcon: Boolean,
        showRight: Boolean,
        isRightIcon: Boolean,
    },
    components: { HeaderAcoes }
});
</script>
<template>
    <div class="container-header-perfil" >
      <HeaderAcoes 
        :title="title"
        :showLeft="showLeft"
        :isLeftIco="isLeftIcon"
        :showRight="showRight"
        :isRightIcon="isRightIcon"    
      />
    </div>    
</template>

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />