<script lang="ts">
    import { defineComponent } from 'vue';
import iconeAvatar from   '../assets/imagens/avatar.svg';


    export default defineComponent({
        props: {
            imagem : null,
            alt : String
        },
        methods: {
            abrirSeletor(){
                const input = this.$refs.referenciaInput as HTMLElement;
                input.click();
            },
            selecionarImagem(evento:any){
                if(evento.target.files){
                    const arquivo = evento.target.files[0];
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(arquivo)
                    fileReader.onloadend = () => {
                        const imagemCompleta = {
                            preview: fileReader.result,
                            arquivo
                        }

                        this.$emit('setImagem',  imagemCompleta);
                    }
                }
            }
        },
        computed: {
            avatarImagem(){
                return this.imagem?.preview ? this.imagem.preview : iconeAvatar;
            }
        },
    });
</script>

<template>
     <div class="container-upload-imagem" @click="abrirSeletor">
                <div>
                    <img :src="avatarImagem" :alt="alt" class="avatar" />
                </div>

                <input type="file" accept="image/*" class="oculto" ref="referenciaInput" @input="selecionarImagem" />
            </div>
</template>

<style lang="scss" src="@/assets/styles/inputImagem.scss" />