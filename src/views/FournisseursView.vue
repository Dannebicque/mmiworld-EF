<script setup>
import { ref, onMounted } from 'vue';

const data = ref({})

onMounted(async () => {
    await _updateListeFournisseurs();
});

const fournisseur = ref({
    libelle: '',
    adresse: {
        rue: '',
        codepostal: '',
        ville: ''
    }
});

const ajouterFournisseur = async () => {

    if (id.value !== null) {
        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs/${id.value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
            body: JSON.stringify(fournisseur.value),
        });

        if (response.ok) {
        
            await _updateListeFournisseurs();
            fournisseur.value = {
                libelle: '',
                adresse: {
                    rue: '',
                    codepostal: '',
                    ville: ''
                }
            };
            id.value = null;
        } else {
            console.error('Erreur lors de la mise à jour du fournisseur');
        }
    } else {
        const response = await fetch('http://symfony.mmi-troyes.fr:8319/api/fournisseurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
            },
            body: JSON.stringify(fournisseur.value),
        });

        if (response.ok) {
            const newFournisseur = await response.json();
            console.log('Nouveau fournisseur ajouté:', newFournisseur);
            // data.value.push(newFournisseur);
            //ou
            await _updateListeFournisseurs();
            fournisseur.value = {
                libelle: '',
                adresse: {
                    rue: '',
                    codepostal: '',
                    ville: ''
                }
            };
        } else {
            console.error('Erreur lors de l\'ajout du fournisseur');
        }
    }
};

const supprimer = async (id) => {
    const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/fournisseurs/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Fournisseur supprimé');
        await _updateListeFournisseurs();
    } else {
        console.error('Erreur lors de la suppression du fournisseur');
    }
};

const id = ref(null);
const modifier = async (_fournisseur) => {

    fournisseur.value = _fournisseur;
    id.value = _fournisseur.id;
};

const _updateListeFournisseurs = async () => {
    const response = await fetch('http://symfony.mmi-troyes.fr:8319/api/fournisseurs').then(res => res.json());
    data.value = response['member'];
};

</script>

<template>
    <h1>Fournisseurs</h1>
    <div v-if="data">
        <ul>
            <li v-for="fournisseur in data" :key="fournisseur.id">
                {{ fournisseur.libelle }} ({{ fournisseur.adresse ? fournisseur.adresse.ville : 'Pas d\'adresse' }})

                <button @click="supprimer(fournisseur.id)">Supprimer</button>
                <button @click="modifier(fournisseur)">Modifier</button>
            </li>
        </ul>
    </div>

    <form @submit.prevent="ajouterFournisseur">
        <h2>Ajouter un fournisseur</h2>
        <label for="libelle">Libellé</label>
        <input type="text" id="libelle" name="libelle" v-model="fournisseur.libelle" />

        <label for="Rue">Rue</label>
        <input type="text" id="Rue" name="Rue" v-model="fournisseur.adresse.rue" />

        <label for="codepostal">codepostal</label>
        <input type="text" id="codepostal" name="codepostal" v-model="fournisseur.adresse.codepostal" />

        <label for="ville">ville</label>
        <input type="text" id="ville" name="ville" v-model="fournisseur.adresse.ville" />

        <button type="submit">Ajouter</button>
    </form>
</template>