<script lang="ts">
    import { defineComponent } from 'vue';
    
    export default defineComponent({
        props: {
            usuario: {} as any,
            title: String,
            rightLabel: String,
            showLeft: Boolean,
            isLeftIcon: Boolean,

        }
    });
</script>
<template>
    <div class="container-acoes" >
      <img src="../assets/imagens/voltar.svg" alt="voltar" v-if="showLeft &&isLeftIcon" />
      <span v-else-if="showLeft && !isLeftIcon" >Cancelar</span>
      <strong>{{title}}</strong>
      <img src="../assets/imagens/sair-ativo.svg" alt="sair" />
      <span class="principal" >{{rightLabel}}</span>
    </div>    
</template>

<style lang="scss" src="@/assets/styles/headerAcoes.scss" />