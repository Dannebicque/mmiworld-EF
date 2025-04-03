<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CardPays from '@/components/CardPays.vue';

const route = useRoute();
const region = ref(route.params.region);
const data = ref();

onMounted(async () => {
    _getPaysByRegion(region.value)
})

watch(() => route.params.region, async (newRegion) => {
    region.value = newRegion
    _getPaysByRegion(region.value)
})

const _getPaysByRegion = async (region) => {
    data.value = null
    data.value = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .then(data => {
            return data
        })
}
</script>

<template>
    <transition name="fade">
        <div v-if="data">
            <h1>Les pays de la région {{ region }}</h1>
            <CardPays v-for="pays in data" :key="pays.cca3" :pays="pays" />
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</style>