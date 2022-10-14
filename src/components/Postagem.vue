<script lang="ts">
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue'; 

    import imgCurtir from '../assets/imagens/curtir.svg';
    import imgCurtiu from '../assets/imagens/curtiu.svg';
    import { FeedServices }  from '../services/FeedServices';

    const feedServices = new FeedServices();
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
            },
            async togglCurtir(){
                try{
                    await feedServices.togglCurtir(this.post?._id);
                    const index = this.post?.likes?.findIndex((e : string) => e === this.loggedUserId);
                    if  (index != -1){
                        this.post?.likes?.splice(index, 1);
                    }else {
                        this.post?.likes?.push(this.loggedUserId)
                    }
                }catch(e){
                    console.log(e);
                }
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
                <strong> Mario Renan{{post?.usuario?.nome}}</strong>
            </section>
        </div>

        <div class="foto">
            <img src="../assets/imagens/Icon_perfil-min.png" alt="Imagem da Publicação" /> <!--:src="post?.foto"-->
        </div>  

        <div class="rodape" >
            <div class="acoes" >
                <img :src="obterIconeCurtir" alt="Icone curtir" class="feedIcone" @click="togglCurtir" />
                <img  src="../assets/imagens/comentario-inativo.svg" alt="Icone comentar" class="feedIcone" />
                <span class="curtidas">
                    Curtido por <strong>0{{post?.likes?.length}}</strong> pessoa{{post?.likes?.length > 1 ? 's' : ''}}
                </span>
            </div>

            <div class="descricao">
                <strong>Mário Renan{{post?.usuario?.nome}}</strong>

                <p>Lorem ipsum dolor sit amet. {{post?.descricao}}
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

<style lang="scss" src="@/assets/styles/postagem.scss" /> 