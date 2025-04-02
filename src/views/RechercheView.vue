<script setup>
import { ref } from 'vue'
import CardPays from '@/components/CardPays.vue';

const filterPays = ref()
const recherche = ref('')

const filtrer = async () => {
    if (recherche.value.length > 2) {
        filterPays.value = ''
        filterPays.value = await fetch('https://restcountries.com/v3.1/name/' + recherche.value)
        .then(response => response.json())
        .then(data => {
            return data
        })
    }
}
</script>

<template>
    <h1>Rechercher</h1>
    <div>
        <form>
            <input type="text" placeholder="Rechercher un pays" v-model.trim="recherche" @keyup="filtrer" />
            {{ recherche }}
        </form>
    </div>

    <div v-if="filterPays">
        <p>Il y a {{ filterPays.length }} pays</p>
        <CardPays v-for="pays in filterPays" :key="pays.cca3" :pays="pays" />
    </div>
</template>