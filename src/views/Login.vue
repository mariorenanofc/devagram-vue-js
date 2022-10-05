<script lang="ts">
    import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import iconeLogin from '../assets/imagens/login.svg';
import iconeSenha from '../assets/imagens/senha.svg';
import { LoginServices } from '../services/LoginServices';
import router from '../router';

const loginService = new LoginServices();

    export default defineComponent({
        setup(){
            return {
                iconeLogin,
                iconeSenha,
                loginService
            }
        },
        data() {
            return {
            login: "",
            senha: "",
            loading: false,
            erro: ""
        };
    },
    methods: {
        async efetuarLogin() {
            try {
                if (!this.login && !this.login.trim() 
                    && !this.senha && !this.senha.trim()) {
                this.erro = "Favor inserir dados!🙄";
                return;
                }
                this.loading = true;
                await loginService.login({login: this.login, senha: this.senha});
                router.push({name : 'home'});
            } catch (e : any) {
                console.log(e);
                if(e?.response?.data?.erro){
                    this.erro = e?.response?.data?.erro;
                }else{
                    this.erro = 'Não foi possivel efetuar o login, tente novamente!';
                }
            }
            this.loading = false;
        },
        setLogin(v : any){
            this.login = v;
        },
        setSenha(v : any){
            this.senha = v;
        }
    },
    computed: {
        buttonText(){
            return this.loading ? '...Carregando' : 'Login';
        }
    },
    components: { InputPublico }
});
</script>

<template>
    <div class="container-publico">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
        <form >
            <p v-if="erro" class="error">{{erro}}</p>
            
            <InputPublico :icone="iconeLogin" alt="Insira o login" tipo="text" 
                placeholder="Usuário" :model-value="login"
                @setInput="setLogin" />

            <InputPublico :icone="iconeSenha" alt="Insira a senha" tipo="password" 
                placeholder="Senha" :model-value="senha" 
                @setInput="setSenha" />


            <button @click.enter.prevent=" efetuarLogin"
            :disabled="loading">{{buttonText}}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss" />