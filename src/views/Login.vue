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
                    this.erro = 'Favor conferir dados!🙄';
                    return;
                }

                alert('Login efetuado: ' + this.login + ", " + this.senha);
            }
        }
});
</script>

<template>
    <div>
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" />
        <form >
            <p v-if="erro">{{erro}}</p>
            <div>
                <img src="../assets/imagens/login.svg" alt="Insira Login" />
                <input type="text" v-model="login" />
            </div>
            <div>
                <img src="../assets/imagens/senha.svg" alt="Insira a senha" />
                <input type="password" v-model="senha" />
            </div>
            <button @click.enter.prevent=" efetuarLogin">Login</button>
            <div>
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!!</a>
            </div>
        </form>
    </div>
</template>