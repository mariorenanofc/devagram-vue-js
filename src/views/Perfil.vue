<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { FeedServices } from '../services/FeedServices';
import Feed from '../components/Feed.vue';
import router from '@/router';
import HeaderPerfil from '@/components/HeaderPerfil.vue';
import { UsuarioServices } from '@/services/UsuarioServices';
import Loading from 'vue3-loading-overlay';

const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
    components: { Header, Footer, Feed, HeaderPerfil, Loading },
    data() {
        return {
            posts: [],
            usuario: {} as any,
            loading: false
        }
    },
    async mounted() {
        try {
            const loggedId = localStorage.getItem('_id');
            const id = loggedId as String;
            const resultUsuario = await usuarioServices.buscarDadosPorId();

            if (!resultUsuario || !resultUsuario.data) {
                return;
            }

            this.usuario = resultUsuario.data;
            this.loading= true;
            const result = await feedServices.getFeedPorId(id);
            if (result && result.data) {
                const postFinal = result.data.map((p: any) => {
                    p.usuario = resultUsuario.data;
                    return p;
                })
                this.posts = postFinal;
            }
        } catch (e) {
            console.log(e);
        }
        this.loading= false;
    }
});
</script>


<template>
    <Loading :active="loading" :can-cancel="false" color="#5E49FF" :is-full-page="true" />
    <Header :hide="true" />
    <HeaderPerfil :usuario="usuario" :showLeft="false" :showRight="true" :isRightIcon="true" :title="usuario?.nome"
        v-if="usuario?._id" />
    <Feed :posts="posts" :temCabecalho="true" v-if="posts && posts.length > 0" /> <!--  -->
    <Footer />
</template>