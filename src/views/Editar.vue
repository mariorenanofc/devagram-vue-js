<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { UsuarioServices } from '@/services/UsuarioServices';
import HeaderAcoes from '@/components/HeaderAcoes.vue';
import Avatar from '@/components/Avatar.vue';


const usuarioServices = new UsuarioServices();

export default defineComponent({
    components: { Header, Footer, HeaderAcoes, Avatar },
    data() {
        return {
            nome: localStorage.getItem('nome') as string,
            avatar: localStorage.getItem('avatar') as string,
            imagem: {} as any
        }
    },
    computed: {
        getImagem() {
            return this.imagem?.preview ? this.imagem?.preview : this.avatar;
        }
    }
});
</script>


<template>
    <Header :hide="true" />
    <div class="container-editar">
        <HeaderAcoes :showLeft="true" :showRight="true" rightLabel=" Concluir" title="Editar Perfil" />
        <Avatar :imagem="getImagem" />
        <button>Alterar Foto de Perfil</button>
        <input type="file" class="oculto" accept="image/*" ref="referenciaInput" />
        <div class="input">
            <span>Nome</span>
            <input type="text" v-model="nome" placeholder="Informe seu nome">
            <img src="../assets/imagens/limpar.svg" alt="limpar" />
        </div>
        <Footer />
    </div>

</template>

<style lang="scss" src="@/assets/styles/editar.scss" />