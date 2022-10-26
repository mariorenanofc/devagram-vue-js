<script lang="ts">
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue';
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
    components: { HeaderAcoes, Avatar }
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

      <div class="perfil" >
        <Avatar :imagem="usuario?.avatar" />
        <div class="infos">
          <div class="dados" >
            <div class="status">
              <strong>{{usuario?.publicacoes}}</strong>
              <span> Publicações</span>
            </div>
            <div class="status">
              <strong>10{{usuario?.seguidores}}mil</strong>
              <span> Seguidores</span>
            </div>
            <div class="status">
              <strong>{{usuario?.seguindo}}</strong>
              <span> Seguindo</span>
            </div>
          </div>

          <button>Seguir</button>
        </div>
      </div>
    </div>    
</template>

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />