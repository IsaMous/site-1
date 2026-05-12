import p1_1 from './assets/1/1.png'
import p1_2 from './assets/1/2.png'
import p1_3 from './assets/1/3.png'
import p1_4 from './assets/1/4.png'

import p2_1 from './assets/2/1.png'
import p2_2 from './assets/2/2.png'
import p2_3 from './assets/2/3.png'
import p2_4 from './assets/2/4.png'

import p3_1 from './assets/3/1.jpg'
import p3_2 from './assets/3/2.jpg'
import p3_3 from './assets/3/3.jpg'

import p4_1 from './assets/4/1.jpg'
import p4_2 from './assets/4/2.jpg'
import p4_3 from './assets/4/3.jpg'
import p4_4 from './assets/4/4.jpg'

export interface Project {
    id: number
    title: string
    category: string
    description: string
    details: string[]
    photos: string[]
}

export const PROJECTS: Array<Project> = [
    {
        id: 1,
        title: 'Fauteuil mushroom',
        category: 'Restauration',
        description: 'Le fauteuil mushroom est un fauteuil dessiné par Pierre Paulin dans les années 60.Il est confortable et beau, c\'est un véritable chef d\'œuvre .',
        details: ['Tissu : Vidar coloris 4 de chez Kvadrat Febrik'],
        photos: [p1_1, p1_2, p1_3, p1_4],
    },
    {
        id: 2,
        title: 'Chaises années 60',
        category: 'Restauration',
        description: 'Nouvelle assise pour ces 4 chaises des années 60.',
        details: ['Tissu : Amara de chez Casal'],
        photos: [p2_1, p2_2, p2_3, p2_4],
    },
    {
        id: 3,
        title: 'Fauteuil Louis XV',
        category: 'Restauration',
        description: 'Couleur fauve pour ce fauteuil de style Louis XV.',
        details: ['Tissu : Nobilis Paris'],
        photos: [p3_1, p3_2, p3_3],
    },
    {
        id: 4,
        title: 'Chaises',
        category: 'Restauration complète',
        description: '.....',
        details: [],
        photos: [p4_1, p4_2, p4_3, p4_4],
    },
    {
        id: 5,
        title: 'Chaises de salle à manger',
        category: 'Réfection assises',
        description: 'Série de 6 chaises bistrot années 30. Assises retapissées en skaï texturé ivoire, pieds rebrossés et huilés.',
        details: ['Tissu : skaï texturé', 'Série de 6 chaises', 'Durée : 1 semaine'],
        photos: ['#e8e0d0', '#d8cebe', '#c8bcaa'],
    },
    {
        id: 6,
        title: 'Méridienne Empire',
        category: 'Restauration',
        description: 'Méridienne Empire en acajou massif. Dorures restaurées à la feuille d\'or, garnissage traditionnel au crin, soierie vert empire à rayures.',
        details: ['Tissu : soierie', 'Dorures à la feuille d\'or', 'Durée : 5 semaines'],
        photos: ['#8a9e78', '#748860', '#5e7248'],
    },
    {
        id: 7,
        title: 'Fauteuil de bureau',
        category: 'Réfection complète',
        description: 'Fauteuil de bureau directorial années 50. Mousse remplacée, cuir grainé noir repositionné, accoudoirs rechampis.',
        details: ['Tissu : cuir grainé', 'Style : années 50', 'Durée : 2 semaines'],
        photos: ['#4a4a48', '#5e5e5a', '#383835'],
    },
    {
        id: 8,
        title: 'Tête de lit capitonnée',
        category: 'Création sur-mesure',
        description: 'Tête de lit capitonnée pour chambre parentale. Format 180 cm, tissu bouclé blanc cassé, capitonnage losange avec boutons nacre.',
        details: ['Tissu : bouclé', 'Format : 180 cm', 'Durée : 3 semaines'],
        photos: ['#ede8e0', '#ddd5c8', '#ccc2b0'],
    },
    {
        id: 9,
        title: 'Fauteuil Voltaire',
        category: 'Restauration',
        description: 'Voltaire fin XIXᵉ siècle. Bois de noyer restauré, teinte d\'origine retrouvée. Tissu en laine bouillie terracotta, liseré contrastant.',
        details: ['Tissu : laine bouillie', 'Bois : noyer', 'Durée : 3 semaines'],
        photos: ['#c87848', '#b86030', '#a84820'],
    },
    {
        id: 10,
        title: 'Pouf ottoman',
        category: 'Création sur-mesure',
        description: 'Grand pouf ottoman sur-mesure. Structure en contreplaqué bouleau, garnissage mousse et duvet, tissu velours moutarde à motifs géométriques tissés.',
        details: ['Tissu : velours moutarde', 'Structure : bouleau', 'Durée : 2 semaines'],
        photos: ['#c8a830', '#b89020', '#a87810'],
    },
    {
        id: 11,
        title: 'Canapé convertible',
        category: 'Réfection complète',
        description: 'Canapé convertible scandinave des années 60. Mécanisme révisé, assise et dossier regarnis, tissu tweed gris chiné avec coutures apparentes.',
        details: ['Tissu : tweed chiné', 'Style : scandinave', 'Durée : 4 semaines'],
        photos: ['#909090', '#787878', '#606060'],
    },
    {
        id: 12,
        title: 'Chaise longue Art Déco',
        category: 'Restauration',
        description: 'Chaise longue Art Déco en laque noire et chrome. Garnissage intégral renouvelé, tissu en jacquard géométrique noir et or.',
        details: ['Tissu : jacquard', 'Style : Art Déco', 'Durée : 4 semaines'],
        photos: ['#282828', '#383830', '#484840'],
    },
]
