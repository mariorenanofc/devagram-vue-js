<script lang="ts">
    import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import iconeLogin from '../assets/imagens/login.svg';
import iconeSenha from '../assets/imagens/senha.svg';
import iconeUsuario from   '../assets/imagens/usuario-ativo.svg';
import iconeAvatar from   '../assets/imagens/avatar.svg';
import InputImagem from '../components/InputImagem.vue';


    export default defineComponent({
        setup(){
            return {
                iconeLogin,
                iconeSenha,
                iconeUsuario,
                iconeAvatar
                
            }
        },
        data() {
            return {
            nome: '',
            email: "",
            senha: "",
            confirmacao: "",
            loading: false,
            erro: "",
            imagem: {} as any
        };
    },
    methods: {
        async cadastrar() {
            try {
                
            } catch (e : any) {
                console.log(e);
                if(e?.response?.data?.erro){
                    this.erro = e?.response?.data?.erro;
                }else{
                    this.erro = 'Não foi possivel cadastrar o usuário, tente novamente!';
                }
            }
            this.loading = false;
        },
        setNome(v : any){
            this.nome = v;
        },
        setEmail(v : any){
            this.email = v;
        },
        setSenha(v : any){
            this.senha = v;
        },
        setConfirmacao(v : any){
            this.confirmacao = v;
        },
        setImagem(v : any){
            this.imagem = v;
        }
    },
    computed: {
        buttonText(){
            return this.loading ? '...Carregando' : 'Cadastrar';
        }
    },
    components: { InputPublico, InputImagem }
});
</script>

<template>
    <div :class="['container-publico', 'cadastro']">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
        <form >
            <InputImagem :imagem="imagem" alt="Imagem do Usuário"  @setImagem="setImagem" />

            <p v-if="erro" class="error">{{erro}}</p>
            
            <InputPublico :icone="iconeUsuario" alt="Insira o nome do usuário" tipo="text" 
                placeholder="Nome Completo" :model-value="nome"
                @setInput="setNome" />


            <InputPublico :icone="iconeLogin" alt="Insira o Email" tipo="text" 
                placeholder="Email" :model-value="email"
                @setInput="setEmail" />

            <InputPublico :icone="iconeSenha" alt="Insira a senha" tipo="password" 
                placeholder="Senha" :model-value="senha" 
                @setInput="setSenha" />
            
                <InputPublico :icone="iconeSenha" alt="Confirmar a senha" tipo="password" 
                placeholder="Confirme sua Senha" :model-value="confirmacao" 
                @setInput="setConfirmacao" />


            <button @click.enter.prevent=" cadastrar"
            :disabled="loading">{{buttonText}}</button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <RouterLink  :to="{name : 'login'}">Faça seu Login!</RouterLink>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss" />