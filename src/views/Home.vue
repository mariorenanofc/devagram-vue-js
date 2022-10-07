<script lang="ts">
    import { defineComponent } from 'vue';
    /*import { LoginServices } from '../services/LoginServices';
    import router from '../router';*/
import Header from '../components/Header.vue';

/*const loginService = new LoginServices();*/

    export default defineComponent({
    components: { Header }
});
</script>

<script />
<template>

    <!-- <div>
        <button @click="sair">Sair</button> 
    </div> -->
    <Header />
</template>