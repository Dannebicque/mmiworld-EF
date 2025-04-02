<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const code = route.params.pays;
const data = ref();

onMounted(async () => {
    data.value = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then(response => response.json())
        .then(data => {
            return data[0]
        })
})

</script>

<template>
    <div v-if="data">
        <h1>Fiche du pays : {{ data.name.common }}</h1>
        <img :src="data.flags.png" :alt="data.name.common" />
    </div>
    <router-link :to="{ name: 'pays' }">Retour à la liste des pays</router-link>
</template>