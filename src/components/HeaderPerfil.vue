<script lang="ts">
    import router from '@/router';
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue';
    import HeaderAcoes from './HeaderAcoes.vue';
    import {UsuarioServices} from '../services/UsuarioServices';
    const usuarioServices = new UsuarioServices();
    
    export default defineComponent({
    setup(){
      return {
        loggedId: localStorage.getItem('_id')
      }
    },
    props: {
        usuario: {} as any,
        title: String,
        showLeft: Boolean,
        isLeftIcon: Boolean,
        showRight: Boolean,
        isRightIcon: Boolean,
    },
    components: { HeaderAcoes, Avatar },
    computed: {
      obterTextoBotaoPrincipal(){
        if(this.usuario?._id === this.loggedId){
          return "Editar Perfil";
        }else if(!this.usuario?.segueEsseUsuario){
          return "Seguir";
        }
        return "Deixar de seguir";
      }
    },
    methods: {
      async acaoBotao(){
        if(this.usuario?._id === this.loggedId){
          return router.push({name: 'editar'});
        }

        try {
          await usuarioServices.togglFollow(this.usuario?._id);
          this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario;
          if(this.usuario.segueEsseUsuario){
            this.usuario.seguidores +=1;
          }else {
            this.usuario.seguidores -=1;
          }

        } catch (e) {
          console.log(e);
        }
      }
    }
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

          <button :class="{principal: !usuario?.segueEsseUsuario ?? false}" @click="acaoBotao" >{{obterTextoBotaoPrincipal}}</button>
        </div>
      </div>
    </div>    
</template>

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />