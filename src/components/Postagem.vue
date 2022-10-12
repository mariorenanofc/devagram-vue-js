<script lang="ts">
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue'; 

    import imgCurtir from '../assets/imagens/curtir.svg';
    import imgCurtiu from '../assets/imagens/curtiu.svg';

    export default defineComponent({
        setup(){
            return {
                loggedUserId : localStorage.getItem(`_id`)
            }  
        },
        props: {
            post: null
        },
        methods: {
            navegarParaPerfil() {
        }   
        },
        components: { Avatar },
        computed: {
            obterIconeCurtir(){
                console.log(this.post?.likes.findIndex ((e : String) => e === this.loggedUserId ) !=-1);
                if(this.post?.like && this.post?.likes.findIndex ((e : String) => e === this.loggedUserId ) !=-1 ){
                    return imgCurtiu
                }
                return imgCurtir
        }
    }
});
</script>
<template>
     <div class="container-postagem">
        <div @click="navegarParaPerfil">
            <section class="cabecalho" >
                <Avatar :imagem="post?.usuario?.avatar" />
                <strong>{{post?.usuario?.nome}}</strong>
            </section>
        </div>

        <div class="foto">
            <img :src="post?.foto" alt="Imagem da Publicação" />
        </div>

        <div class="rotape" >
            <div class="acoes" >
                <img :src="obterIconeCurtir" alt="Icone curtir" />
                <img  src="../assets/imagens/comentario-inativo.svg" alt="Icone comentar" />
                <span class="curtidas">
                    Curtido por <strong>0{{post?.likes?.length}}</strong> pessoa{{post?.likes?.length > 1 ? 's' : ''}}
                </span>
            </div>

            <div class="descricao">
                <strong>Mário Renan{{post?.usuario?.nome}}</strong>
                <p>
                   Lorem ipsum dolor sit amet. {{post?.descricao}}
                </p>
            </div>

            <div class="comentarios">
                <div >  <!--v-for="(comentario, index) in post?.comentarios" :key="index"-->
                    <strong>Lucas Maincon{{}}</strong> <!--comentario.nome-->
                    <p>Abrobinhas 🎇{{}}</p> <!--comentario.comentario-->
                </div>
            </div>
        </div>

        <div class="container-comentario">
            <!--Implementar comentario-->
        </div>
     </div>
</template>

<!-- <style lang="scss" src="@/assets/styles/feed.scss" /> -->