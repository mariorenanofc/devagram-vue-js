<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import {FeedServices} from '../services/FeedServices';
    import Feed from '../components/Feed.vue';
    import Loading from 'vue3-loading-overlay';

    const feedServices = new FeedServices();
    
    export default defineComponent({
        components: { Header, Footer, Feed, Loading },
        data(){
            return {
                posts: [],
                loading: false
            }
        },
        async mounted() {
            try{
                this.loading = true;
               const result = await feedServices.getFeedPrincipal();
                if(result && result.data){
                    this.posts = result.data;
                }
            }catch(e){
                console.log(e);
            }
            this.loading = false;
        }
    });
</script>


<template>
    <Loading :active="loading" :can-cancel="false" color="#5E49FF" :is-full-page="true" />
    <Header />
    <Feed  :posts="posts" v-if="posts && posts.length > 0" /> 
    <Footer />
</template>