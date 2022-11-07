<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import HeaderAcoes from '@/components/HeaderAcoes.vue';
import Avatar from '@/components/Avatar.vue';




export default defineComponent({
    components: { Header, Footer, HeaderAcoes, Avatar },
    data() {
        return {
            descricao: '',
            imagem: {} as any,
            mobile: window.innerWidth <=992,
            avancar: false
        }
    },
    computed: {
        getTitle(){
            return this.mobile? "Nova Publicação"  : "Criar nova Publicação"
        },
        getAcaoLabel(){
            return  this.avancar ? "Concluir" : "Avançar"
        },
        getButtonText(){
            return this.mobile? "Selecionar foto" : "Selecionar no computador"
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
                const fileReader = new FileReader();
                fileReader.readAsDataURL(arquivo);
                fileReader.onloadend = () => {
                    const imagemFinal = {
                        preview : fileReader.result,
                        arquivo
                    }

                    this.imagem = imagemFinal;
                }
            }
        },
       
    }
});
</script>


<template>
    <Header :hide="true" />
    <div class="container-publicacao">
        <HeaderAcoes :showLeft="mobile" :showRight="imagem?.preview" 
            :rightLabel="getAcaoLabel" :title="getTitle" />

        <div class="form" v-if="!imagem?.preview">
            <img src="../assets/imagens/selecionar.svg" alt="selecionar Imagem" />
            <span>Arraste sua foto aqui!</span>
            <button @click="abrirSeletor">{{getButtonText}}</button>
            <input type="file" class="oculto" accept="image/*" ref="referenciaInput">
        </div>
    </div>
    <Footer />
</template>

<style lang="scss" src="@/assets/styles/publicacao.scss" />