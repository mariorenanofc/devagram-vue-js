<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { UsuarioServices } from '@/services/UsuarioServices';
import HeaderAcoes from '@/components/HeaderAcoes.vue';
import Avatar from '@/components/Avatar.vue';
import router from '@/router'


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
    },
    methods: {
        limpar(){
            this.nome = '';
        },
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
        async concluirEdicao(){
            try {
                if(!this.nome && this.imagem.arquivo){
                    return;
                }

                const requisicaoBody = new FormData();
                if(this.nome){
                    requisicaoBody.append('nome', this.nome);
                
                }
                if(this.imagem.arquivo){
                    requisicaoBody.append('file', this.imagem.arquivo);
                
                }

                await usuarioServices.atualizar(requisicaoBody);

                
                if(this.nome){
                    localStorage.setItem('nome', this.nome);
                
                }
                if(this.imagem.arquivo){
                    localStorage.setItem('avatar', this.imagem.arquivo);
                
                }
                return router.back();
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
    <div class="container-editar">
        <HeaderAcoes :showLeft="true" :showRight="true" 
            rightLabel=" Concluir" title="Editar Perfil"  
            @acoesCallback="concluirEdicao"/>
        <Avatar :imagem="getImagem" />
        <button @click="abrirSeletor">Alterar Foto de Perfil</button>
        <input type="file" class="oculto" accept="image/*" ref="referenciaInput" @input="selecionarImagem" />
        <div class="input">
            <span>Nome</span>
            <input type="text" v-model="nome" placeholder="Informe seu nome">
            <img src="../assets/imagens/limpar.svg" alt="limpar" @click="limpar" v-if="nome" />
        </div>
        <Footer />
    </div>

</template>

<style lang="scss" src="@/assets/styles/editar.scss" />