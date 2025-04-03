<script setup>

const regions = [
    { nom: 'Afrique', key: 'Africa' },
    { nom: 'Amérique', key: 'Americas' },
    { nom: 'Asie', key: 'Asia' },
    { nom: 'Europe', key: 'Europe' },
    { nom: 'Océanie', key: 'Oceania' }
]

</script>

<template>
    <h1>Regions</h1>
    <ul>
        <li v-for="region in regions" :key="region.key">
            <router-link :to="{
                name: 'fiche-region',
                params: { region: region.key }
            }">{{ region.nom }}</router-link>
        </li>
    </ul>
    <!-- Ce router view accueille la route enfant -->
    <div>
        Les pays de la régions
        
            <RouterView />
    </div>
</template>

