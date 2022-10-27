<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { FeedServices } from '../services/FeedServices';
import { UsuarioServices } from '../services/UsuarioServices';
import Feed from '../components/Feed.vue';
import router from '@/router';
import HeaderPerfil from '@/components/HeaderPerfil.vue';


const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
    components: { Header, Footer, Feed, HeaderPerfil },
    data() {
        return {
            posts: [],
            usuario: {} as any,
            mobile: window.innerWidth <= 992,
        }
    },
    async mounted() {
        try {
            if (!this.$route.params?.id) {
                return router.push({ name: 'home' });
            }
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
    },
    computed: {
        getShowLeft() {
            return this.mobile ? true : false;
        }
    }
});
</script>


<template>
    <Header :hide="true" />
    <HeaderPerfil :usuario="usuario" :title="usuario?.nome" :showLeft="getShowLeft" :isLeftIcon="true"
        :showRight="false" v-if="usuario?._id" />
    <Feed :posts="posts" :temCabecalho="true" /> <!--  -->
    <Footer />
</template>


