<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { FeedServices } from '../services/FeedServices';
import { UsuarioServices } from '../services/UsuarioServices';
import Feed from '../components/Feed.vue';
import router from '@/router';
import HeaderPerfil from '@/components/HeaderPerfil.vue';
import Loading from 'vue3-loading-overlay';


const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
    components: { Header, Footer, Feed, HeaderPerfil, Loading },
    data() {
        return {
            posts: [],
            usuario: {} as any,
            mobile: window.innerWidth <= 992,
            loading: false
        }
    },
    async mounted() {
        try {
            if (!this.$route.params?.id) {
                return router.push({ name: 'home' });
            }
            this.loading = true;
            const id = this.$route.params?.id as String;
            const usuarioResult = await usuarioServices.buscarDadosPorId(id);

            if (!usuarioResult || !usuarioResult.data) {
                return;
            }

            this.usuario = usuarioResult.data;

            const result = await feedServices.getFeedPorId(id);
            if (result && result.data) {
                const postsFinal = result.data.map((p: any) => {
                    p.usuario = usuarioResult.data;
                    return p;
                })
                this.posts = postsFinal;
            }
        } catch (e) {
            console.log(e);
        }
        this.loading = false;
    },
    computed: {
        getShowLeft() {
            return this.mobile ? true : false;
        }
    }
});
</script>


<template>
    <Loading :active="loading" :can-cancel="false" color="#5E49FF" :is-full-page="true" />
    <Header :hide="true" />
    <HeaderPerfil 
        :usuario="usuario" 
        :title="usuario?.nome" 
        :showLeft="getShowLeft" 
        :isLeftIcon="true"
        :showRight="false"
         v-if="usuario?._id" />
    <Feed :posts="posts" :temCabecalho="true" v-if="posts && posts.length > 0" /> <!--  -->
    <Footer />
</template>


