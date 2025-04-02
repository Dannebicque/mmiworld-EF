<script setup>
import { ref } from 'vue'
</script>

<template>
    <div>
        <router-link to="/">Accueil</router-link> | 
        <router-link :to="{name: 'pays'}">Les pays</router-link> | 
        <router-link :to="{name: 'recherche'}">Rechercher</router-link> | 
        <router-link :to="{name: 'fournisseurs'}">Fournisseurs</router-link> | 
        <router-link :to="{name: 'about'}">A propos</router-link> | 
    </div>

    <router-view />
    <footer>
        <p>© 2025 - Tous droits réservés</p>
    </footer>
</template>

<style scoped></style>
