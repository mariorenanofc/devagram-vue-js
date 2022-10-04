<script lang="ts">
    import { defineComponent } from 'vue';


    export default defineComponent({
        data(){
            return {
                login: '',
                senha: '',
                loading: false,
                erro : ''
            }
        },
        methods: {
            efetuarLogin(){
                if(!this.login && !this.senha){
                    this.erro = 'Favor inserir dados!🙄';
                    return;
                }

                alert('Login efetuado: ' + this.login + ", " + this.senha);
            }
        }
});
</script>

<template>
    <div class="container-publico">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
        <form >
            <p v-if="erro" class="error">{{erro}}</p>
            <div class="input">
                <img src="../assets/imagens/login.svg" alt="Insira Login" />
                <input type="text" v-model="login" />
            </div>
            <div class="input">
                <img src="../assets/imagens/senha.svg" alt="Insira a senha" />
                <input type="password" v-model="senha" />
            </div>
            <button @click.enter.prevent=" efetuarLogin">Login</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss" />