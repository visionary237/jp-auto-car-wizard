# JP AUTO Vehicle Selector

Nous allons créer l'élément principal et différenciant du nouveau site de JP AUTO : un sélecteur automobile 2D interactif permettant de qualifier le besoin du client dès le Hero.

CONTEXTE

JP AUTO est un garage automobile situé au Havre, spécialisé notamment dans les véhicules Land Rover, Range Rover et Jaguar.

L'objectif du nouveau site est de diminuer les appels téléphoniques inutiles en permettant aux clients de préqualifier leur besoin directement en ligne avant de demander un rendez-vous.

Le sélecteur automobile ne doit pas prétendre effectuer un diagnostic mécanique. Il sert à orienter le client vers le service approprié.

HERO

Créer une hero section premium avec une composition desktop en deux colonnes.

À gauche :

Sur-titre :
"GARAGE AUTOMOBILE • LE HAVRE"

Titre :
"Un problème avec votre voiture ?"

Deuxième ligne particulièrement mise en avant :
"Montrez-nous où."

Description :
"Sélectionnez une zone de votre véhicule. Nous vous orientons vers la prise en charge adaptée et vous pouvez demander votre rendez-vous en quelques clics."

Ajouter une petite indication :
"Cliquez sur une zone du véhicule"

Ajouter également un lien secondaire :
"Je ne sais pas d'où vient le problème"

À droite :

Créer une grande illustration vectorielle 2D d'un SUV automobile moderne vu de profil.

L'illustration doit être premium, minimaliste et technique, dans un style blueprint automobile contemporain.

Ne pas reproduire exactement un modèle ou une marque automobile existante.

La carrosserie doit rester principalement neutre, graphite / gris foncé.

INTERACTIVITÉ

Construire la voiture sous forme de SVG avec différentes zones cliquables indépendantes.

Créer les zones :

Moteur / avant

Roue et frein avant

Roue et frein arrière

Suspension

Transmission

Échappement / FAP

Véhicule entier / entretien général

Chaque zone doit posséder :

hover state

cursor pointer

animation légère

tooltip

état sélectionné

Au hover :

faire apparaître subtilement la zone mécanique correspondante avec la couleur accent du site.

Afficher également un petit label proche de la zone.

Exemple :

"Moteur & entretien"

"Freinage & pneus"

"Suspension"

"Boîte & transmission"

"Échappement & FAP"

Au clic :

la zone doit rester sélectionnée.

Faire apparaître un panneau contextuel élégant à proximité de la voiture ou sous celle-ci.

Exemple lorsque l'utilisateur clique sur une roue :

Titre :
"Roues & freinage"

Question :
"Que constatez-vous ?"

Choix :

"Mes freins font du bruit"
"La voiture vibre au freinage"
"Mes pneus sont usés"
"J'ai un voyant"
"Autre problème"
"Je ne sais pas"

Ajouter un bouton :

"Continuer"

IMPORTANT

Chaque sélection doit être stockée dans le state React afin de pouvoir être réutilisée ensuite dans le formulaire de demande de rendez-vous.

Prévoir des variables de type :

selectedArea
selectedSymptom
selectedService

Créer une structure de données centralisée permettant de faire correspondre :

zone → symptômes → service

Par exemple :

engine → diagnostic, entretien, distribution, vidange

wheels → freinage, pneumatiques

suspension → suspension

transmission → embrayage, boîte automatique, boîte manuelle

exhaust → nettoyage FAP

general → révision et entretien général

PARCOURS ALTERNATIF

Lorsque l'utilisateur clique sur :

"Je ne sais pas d'où vient le problème"

remplacer temporairement le sélecteur de zone par une question :

"Qu'est-ce que vous constatez ?"

Afficher sous forme de grandes cartes :

"Un bruit"
"Un voyant"
"Des vibrations"
"Une fuite"
"Perte de puissance"
"Surchauffe"
"Fumée"
"Problème de tenue de route"
"Entretien / révision"
"Autre"

La sélection doit elle aussi alimenter selectedSymptom.

Après sélection, proposer :

"Continuer ma demande"

MOBILE

L'expérience doit fonctionner parfaitement sur smartphone.

Ne pas dépendre du hover.

Sur mobile :

conserver la voiture

agrandir les zones tactiles invisibles

permettre de sélectionner les zones par tap

afficher également sous la voiture une liste compacte des catégories pour des raisons d'accessibilité

Les catégories doivent donc pouvoir être sélectionnées soit sur la voiture soit depuis la liste.

DESIGN

Direction artistique :

premium automobile
garage indépendant
proximité
expertise
technologie
élégance

Éviter complètement :

style tuning
néons
carbone
gaming
rouge agressif
design de concession automobile générique

Palette :

anthracite profond
ivoire / blanc cassé
gris technique
accent orange brûlé utilisé uniquement pour les interactions et CTA

Animations sobres et fluides.

Le résultat doit donner l'impression d'un outil digital conçu sur mesure pour JP AUTO et non d'un template de garage.

Ne modifie pas encore le reste du site.

Concentre-toi uniquement sur :

navbar + hero + voiture interactive + logique de sélection.

Nous construirons ensuite les sections suivantes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1cce41c4-ea79-45b4-8e52-b5d0dd0dc0f0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
