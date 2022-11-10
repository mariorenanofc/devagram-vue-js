<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import HeaderAcoes from '@/components/HeaderAcoes.vue';
import Avatar from '@/components/Avatar.vue';
import router from '../router'
import {PublicacaoServices} from "../services/PublicacaoServices";

const publicacaoServices =   new PublicacaoServices();

export default defineComponent({
    components: { Header, Footer, HeaderAcoes, Avatar },
    data() {
        return {
            descricao: '',
            imagem: {} as any,
            mobile: window.innerWidth <= 992,
            avancar: false
        }
    },
    computed: {
        getTitle(){
            return this.mobile? "Nova Publicação"  : "Criar nova Publicação"
        },
        getAcaoLabel(){
            return  this.avancar ? "Compartilhar" : "Avançar"
        },
        getButtonText(){
            return this.mobile ? "Selecionar foto" : "Selecionar no computador"
        }
    },
    methods: {
        abrirSeletor(){
            const input = this.$refs.referenciaInput! as HTMLAnchorElement;
            input.click();
        },
        selecionarImagem(event : any){
            if(event?.target?.files && event?.target?.files.length > 0){
                const arquivo = event?.target?.files[0];
                this.obterImagemPreview(arquivo);
            }
        },
        dropImagem(event : any){
            if(event?.dataTransfer?.files && event?.dataTransfer?.files.length > 0){
                const arquivo = event?.dataTransfer?.files[0];
                this.obterImagemPreview(arquivo);
            }    
        },
        obterImagemPreview(arquivo : any){
            const fileReader = new FileReader();
                fileReader.readAsDataURL(arquivo);
                fileReader.onloadend = () => {
                    const imagemFinal = {
                        preview : fileReader.result,
                        arquivo
                    }

                    this.imagem = imagemFinal;
                }
        },
        doAvancar(){
            this.avancar = true
        },
        async compartilhar(){
            try {
                if(!this.descricao && this.imagem.arquivo){
                    return;
                }

                const requisicaoBody = new FormData();
                if(this.descricao){
                    requisicaoBody.append('descricao', this.descricao);
                
                }
                if(this.imagem.arquivo){
                    requisicaoBody.append('file', this.imagem.arquivo);
                
                }

                await publicacaoServices.publicar(requisicaoBody);
                return router.push({name : 'home'});

            } catch (e : any) {
                if(e?.response?.data?.erro){
                    console.log(e?.response?.data?.erro);
                }else{
                    console.log('Não foi possível efetuar as alterações, tente novamente!', e);
                }
            }
        }
    }
});
</script>


<template>
    <Header :hide="true" />
    <div class="container-publicacao" :class="{'not-preview' : mobile && !imagem?.preview}">
        <HeaderAcoes :showLeft="mobile" :showRight="imagem?.preview" 
            :rightLabel="getAcaoLabel" :title="getTitle" 
            @acoesCallback="avancar ? compartilhar() : doAvancar() " />

        <div class="form" v-if="!imagem?.preview" @dragover.prevent @drop.prevent="dropImagem">
            <img src="../assets/imagens/selecionar.svg" alt="selecionar Imagem" />
            <span>Arraste sua foto aqui!</span>
            <button @click="abrirSeletor"> {{getButtonText}} </button>
            <input type="file" class="oculto" accept="image/*" ref="referenciaInput" @input="selecionarImagem">
        </div>

        <img :src="imagem.preview" v-if="imagem.preview && !avancar" />

        <div class="concluir" v-if="avancar">
            <img :src="imagem.preview" />
            <textarea v-model="descricao" placeholder="Escreva  uma legenda" />


        </div>
    </div>
    <Footer />
</template>

<style lang="scss" src="@/assets/styles/publicacao.scss" />