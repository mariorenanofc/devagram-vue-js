<script lang="ts">
    import { defineComponent } from 'vue';
    import  avatarImg from '../assets/imagens/avatar.svg'
    export default defineComponent({
        props: {
            imagem : String
        },
        computed: {
            escolherAvatar() : string {
                return this.imagem ? this.imagem : avatarImg;
            }
        }
    });
</script>
<template>
    <img :src="escolherAvatar" alt="foto de Usuario" class="avatar"  />
</template>

<!--<style lang="scss" src="@/assets/styles/footer.scss" /> -->