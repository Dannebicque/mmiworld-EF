<script setup>
import { onMounted, watch } from 'vue'


const emits = defineEmits(['pays:added'])
const props = defineProps({
    pays: Object,
    afficherImage: {
        type: Boolean
    }
})

onMounted(() => {
    console.log(`the component is now mounted.`)
})

watch(() => props.afficherImage, (newValue, oldValue) => {
    console.log(`the value of afficherImage has changed from ${oldValue} to ${newValue}`)
})

// defineProps(['pays', 'capitale'])
</script>

<template>
    <div class="card">
        <h2>{{ pays.name.common }}</h2>
        <img :src="pays.flags.png" :alt="`Drapeau de ${pays.name.common}`" width="100" v-if="afficherImage" />
        <p>La capitale est : {{ pays.capital != undefined ? pays.capital.join(', ') : '-sans-' }}</p>

        <p>
            Les langues parlées sont :
        <ul>
            <li 
            v-for="(langue, key) in pays.languages">{{ langue }} - ({{ key }})</li>
        </ul>
        </p>

<input type="checkbox" @change="$emit('pays:added', pays)"> Ajouter à la selection
        <router-link :to="{ name: 'fiche-pays', params: { pays: pays.cca3 } }">Voir la fiche du pays</router-link>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    width: 200px;
}
</style>