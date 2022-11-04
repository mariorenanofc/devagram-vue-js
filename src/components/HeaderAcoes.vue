<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import { LoginServices } from '../services/LoginServices'

const loginServices = new LoginServices();

 export default defineComponent({
    props: {
        title: String,
        rightLabel: String,
        showLeft: Boolean,
        isLeftIcon: Boolean,
        showRight: Boolean,
        isRightIcon: Boolean,

    },
    methods: {
        goBack() {
            router.back();
        },
        logout() {
            loginServices.logout();
            router.push({ name: 'login' });
        }
    }
});
</script>
<template>
    <div class="container-acoes">
        <img src="../assets/imagens/voltar.svg" alt="voltar" v-if="showLeft && isLeftIcon" @click="goBack" />
        <span v-else-if="showLeft && !isLeftIcon">Cancelar</span>
        <strong>{{ title }}</strong>
        <img src="../assets/imagens/sair-ativo.svg" alt="sair" v-if="showRight && isRightIcon" @click="logout" />
        <span class="principal" v-else-if="showRight && !isRightIcon"
            @click="$emit('acoesCallback')">{{ rightLabel }}</span>
    </div>
</template>



<style lang="scss" src="@/assets/styles/headerAcoes.scss" />