# Site web d'Isabelle Mousterou

---

## Stack technique :
- Typescript
- Vite
- React + react-router-dom
- TailwindCSS

---

## Lancer le site pour developper localement

```bash
npm install
npm run dev
```

--- 

## Mettre à jour le site public

Ce site est connecté à [Vercel](https://vercel.com/), le déploiement public est donc automatique à chaque mise à jour de ce repo GitHub.

---

## Ajouter des photos au portfolio

Pour ajouter des photos au portfolio, il faudra suivre ses étapes :

### 1 - Créer un dossier dans `src/assets/projects`

Les projets seront affichés dans l'ordre alphabétique de leur nom, il est donc conseillé de le préfixer d'un numéro à 2 chiffres pour modifier leur position.

> Exemple:
> ```txt
> projects/
> |  01-chaise-paille/
> |  02-fauteuil-louis-xv/
> etc..
> ```

### 2 - Ajouter les photos correspondantes dans le dossier

Mettre toutes les photos correpondantes au projet dans le dossier.

> Exemple:
> ```txt
> projects/
>  |  01-chaise-paille/
>  |    | image1.jpg
>  |    | image2.jpg
>  |  02-fauteuil-louis-xv/
>  |    | image.jpg
> etc..
> ```

### 3 - Ajouter un fichier `index.ts` dans le dossier

Créer un fichier nommé `index.ts` et le placer dans le dossier. Voici un exemple de son contenu :

```ts
// ! Ne pas toucher cette ligne
import type { Project } from '../../../projects'

// Import des différentes images présentes dans le dossier
import img1 from './image1.jpg'
import img2 from './image2.jpg'

export const project: Project = {
    // Titre du projet
    title: "Chaise en paille",
    // Description du projet
    description: "Restauration complète d'une chaise en paille.",
    // Catégorie (Réfection, Restauration, Vente, etc..)
    category: "Restauration",
    // Détails (Tissus, traitements, caractéristiques, etc..)
    details: ["Tissu : Casal", "Traitement anti tâches"],
    // Ajout des photos importées ici
    photos: [img1, img2]
}
```

> Exemple :
> ```txt
> projects/
>  |  01-chaise-paille/
>  |    | index.ts
>  |    | image1.jpg
>  |    | image2.jpg
>  |  02-fauteuil-louis-xv/
>  |    | index.ts
>  |    | image.jpg
> etc..
> ```

### C'est tout bon !

Le fichier `index.ts` sera détecté automatiquement, et le projet sera donc ajouté au portfolio au prochain lancement de l'application.
