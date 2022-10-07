<script lang="ts">
    import router from '@/router';
import { defineComponent } from 'vue';
    import imgHomeAtivo from '../assets/imagens/home-ativo.svg';
    import imgHomeInativo from '../assets/imagens/home-inativo.svg';
    import imgPostAtivo from '../assets/imagens/post-ativo.svg';
    import imgPostInativo from '../assets/imagens/post-inativo.svg';
    import imgUserAtivo from '../assets/imagens/user-ativo.svg';
    import imgUserInativo from '../assets/imagens/user-inativo.svg';

    export default defineComponent({
    methods: {
        efetuarNavegacao(name : string){
            router.push({name});
        },
        getIcone(name : string){
            switch(name){
                case 'home':
                    if(router.currentRoute.value.name === 'home'){
                        return imgHomeAtivo
                    }
                    return imgHomeInativo;
                case 'publicacao':
                    if(router.currentRoute.value.name === 'publicacao'){
                        return imgPostAtivo
                    }
                    return imgPostInativo;
                case 'perfil':
                    if(router.currentRoute.value.name === 'perfil'){
                        return imgUserAtivo
                    }
                    return imgUserInativo;
                default: 
                    return ''; 
            }
        }
    }
});
</script>

<script />
<template>
    <nav class="container-navegacao">
        <ul>
            <li @click="efetuarNavegacao('home')">
                <img :src="getIcone ('home')"  alt="Home" class="iconeNav" />
            </li>
            <li @click="efetuarNavegacao('publicacao')">
                <img :src="getIcone ('publicacao')"  alt="Publicação" class="iconeNav" />
            </li>
            <li @click="efetuarNavegacao('perfil')">
                <img :src="getIcone ('perfil')"  alt="Perfil" class="iconeNav" />
            </li>
        </ul>
    </nav>
</template>