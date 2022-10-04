<script lang="ts">
    import { defineComponent } from 'vue';
    

    export default defineComponent({
        props: {
            icone: String,
            alt: String,
            tipo: String,
            placeholder: String,
            modelValue: String
        },
        data(){
            return {
                inputFocus: false
            }
        },
        methods: {
            setFocus(v : boolean){
                this.inputFocus = v;
            }
        },
        computed: {
            model: {
                get(){
                    return this.modelValue;
                },
                set(v : any){
                    this.$emit('setInput', v);
                }
            }
        }
    });
</script>

<template>
   <div class="container-input-customizado" :class="{  focus: inputFocus }">
                <img :src="icone" :alt="alt" />
                <input :type="tipo"  :placeholder="placeholder" 
                    v-model="model"
                    @focus="setFocus(true)"
                    @blur="setFocus(false)"
                
                />
            </div>
</template>

<script />

<style lang="scss" src="@/assets/styles/inputPublico.scss" />