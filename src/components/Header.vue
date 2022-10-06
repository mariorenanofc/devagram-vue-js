<script lang="ts">
    import { defineComponent } from 'vue';
    import { LoginServices } from '../services/LoginServices';
    import router from '../router';


    export default defineComponent({
        data(){
            return{
                resultado : []
            }
        }
    });
</script>

<script />
<template>
    <header class="container-header">
        <div class="principal">
            <img src ="../assets/imagens/logo-horizontal.svg" alt="logo devagram"  />
            <div class="group">
                <div class="pesquisa">
                    <img src ="../assets/imagens/pesquisar.svg" alt="pesquisar" layout="fill" class="icon " />
                    <input type="text" placeholder="Pesquisar"  />
                </div>

                <!--Navegação-->
            </div>
        </div>
        <div class="resultado" v-if="resultado.length > 0" >
            <!--Resultado de busca-->
        </div>
    </header>
</template>

<style lang="scss" src="@/assets/styles/header.scss" />