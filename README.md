# Fondation Email Signature

Outil web pour générer et copier les signatures e-mail officielles de la **Fondation Charles-Albert Frère**.

Chaque collaborateur sélectionne son nom, prévisualise sa signature, puis la copie pour la coller dans Apple Mail, Outlook ou Gmail.

## Fonctionnalités

- Liste des personnes de la Fondation
- Aperçu fidèle de la signature (nom, titre, logo + adresse)
- Copie HTML compatible **Apple Mail**, **Outlook** et **Gmail**
- Instructions d’installation par client de messagerie (vouvoiement)
- Prêt pour déploiement sur **GitHub Pages**

## Lancer en local

Depuis la racine du projet :

```bash
python3 -m http.server 3847
```

Puis ouvrez [http://127.0.0.1:3847](http://127.0.0.1:3847).

> **Important :** pour que le logo s’affiche correctement une fois la signature collée dans un client e-mail, l’outil doit être servi via une URL publique (GitHub Pages). En local, l’aperçu fonctionne, mais l’image collée pointera vers `localhost`.

## Déployer sur GitHub Pages

1. Créez un dépôt GitHub et poussez ce projet.
2. Dans **Settings → Pages**, choisissez la branche `main` (dossier `/` racine).
3. Après publication, l’outil sera disponible à l’adresse du type :
   `https://<votre-org>.github.io/<nom-du-repo>/`
4. Partagez cette URL avec les collaborateurs.

Les signatures copiées utilisent une URL **absolue** vers `assets/fondation-logo.png`, afin que le logo reste chargé chez les destinataires.

## Structure de la signature

1. **Nom** — Helvetica / Arial, gras  
2. **Titre** — Helvetica / Arial, italique  
3. Espace  
4. **Logo Fondation** (tréfle + « Fondation Charles-Albert Frère » + adresse)

Le HTML est construit avec des **tableaux imbriqués** et des styles inline, pour une meilleure compatibilité e-mail.

## Personnes incluses

| Nom | Titre |
| --- | --- |
| Cedric Frère | Administrateur Trésorier |
| Charlotte Friling | Présidente du Conseil d’Administration |
| William Frère | Administrateur |
| Margaret Frère | Administrateur |
| Victor Delloye | Administrateur Délégué |
| Christelle Bonnenge | Secrétariat |
| Patrick De Coster | Administrateur |
| Philippe Bossard | Administrateur |
| Ségolène Gallienne | Vice-présidente du Conseil d’Administration |

## Poids de l’image (logo)

Le logo optimisé (`assets/fondation-logo.png`) fait environ **10 Ko** (PNG-8, 600×144 px, affiché à 420 px de large). C’est léger pour une signature e-mail : inutile de compresser davantage, sauf si vous remplacez le fichier par une version plus lourde.

## Personnalisation

- Personnes : modifier le tableau `PEOPLE` dans `js/app.js`
- Logo : remplacer `assets/fondation-logo.png` (garder un PNG léger, idéalement &lt; 50 Ko)
- Largeur d’affichage du logo : constantes `LOGO_WIDTH` / `LOGO_HEIGHT` dans `js/app.js`
