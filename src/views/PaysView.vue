<script setup>
import { ref, onMounted } from 'vue'
import CardPays from '@/components/CardPays.vue';

const listePays = ref()
const filterPays = ref()
const recherche = ref('')
const afficherImage = ref(true)

onMounted(async () => {
    listePays.value = await fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            return data
        })

    //pour trier les pays par ordre alphabétique, dans la mesure ou l'API ne propose pas de tris
    listePays.value = listePays.value.sort((a, b) => {
        return a.name.common.localeCompare(b.name.common)
    })
    filterPays.value = listePays.value

})

const filtrer = () => {
    if (recherche.value.length > 2) {
        filterPays.value = listePays.value.filter(pays => {
            return pays.name.common.toLowerCase().includes(recherche.value.toLowerCase())
        })
    }
}

const selectedPays = ref([])

const ajouterPays = (pays) => {
    console.log('pays ajouté')
    console.log(pays)

    //si pays non présent ajouter, sinon retirer
    if (selectedPays.value.includes(pays)) {
        selectedPays.value = selectedPays.value.filter(p => p !== pays)
    } else {
        selectedPays.value.push(pays)
    }
}
</script>

<template>
    <h1>Les pays</h1>
{{ selectedPays.length }} pays selectionnés
    <div>
        <form>
            <input type="text" placeholder="Rechercher un pays" v-model.trim="recherche" @keyup="filtrer" />
            {{ recherche }}
        </form>
    </div>
    <div>
        <input type="checkbox" v-model="afficherImage"> Afficher les images ?
    </div>

    <div v-if="filterPays">
        <p>Il y a {{ filterPays.length }} pays</p>
        <CardPays 
            v-for="pays in filterPays" :key="pays.cca3" 
            :pays="pays"
            :afficherImage="afficherImage"
            @pays:added="ajouterPays"
            />
        <!-- <ul>
            <li v-for="pays in listePays">
                {{ pays.name.common }}
            </li>
        </ul>
        <pre>{{ listePays }}</pre>-->
    </div>

</template>