# INSTALLATION

## Réservation d'un hébergement (serveur managé) et d'un nom de domaine

> Il faut un serveur managé utilisant Node.js afin de faire tourner le site.

> Plusieurs hébergeurs proposent ce type de service.

> Nous avons pour notre part hébergé le site chez Infomaniak, le temps des tests.

> Chez Infomaniak, ils proposent la solution de ["Serveur Cloud managé"](https://shop.infomaniak.com/order/select/vps_only).

> Lors de la commande du serveur managé, vous aurez également la possibilité de réserver un nom de domaine. C'est la solution à privilégier car vraiment plus simple!

> Si vous disposez déjà d'un nom de domaine (non-utilisé chez un autre hébergeur), vous pouvez soit le [transférer chez Infomaniak](https://www.infomaniak.com/fr/support/faq/1814/nom-de-domaine-transferer-vers-infomaniak-code-dautorisation-requis), soit [configurer la gestion des DNS](https://www.infomaniak.com/fr/support/faq/2023/trouverafficher-les-dns-le-a-record-et-le-mx-record) entre Infomaniak et votre registrar, mais c'est un peu plus sportif...

> Si quelque chose ne vous semble pas clair, n'hésitez pas à consulter leur [base de connaissances](https://www.infomaniak.com/fr/support/faq/admin2), elle est très bien faite.

## Ouverture d'un terminal Web SSH

> Afin de démarrer l'installation du site, il va vous falloir ouvrir un terminal SSH.

> Pour ce faire, connectez-vous à votre [manager Infomaniak](https://manager.infomaniak.com/)

> Rendez-vous dans la section "Serveur Cloud"

!["Serveur Cloud"](/src/assets/img/installation/cloud.JPG)

> Cliquez sur "Hébergements Web" dans le menu à gauche.

![Hébergements Web](/src/assets/img/installation/menu_cloud.JPG)

> Cliquez ensuite sur le nom de domaine que vous avez réservé

> Une fois sur la page de votre hébergement, cliquez sur "FTP/SSH" dans le menu à gauche.

![FTP/SSH](/src/assets/img/installation/ftp_ssh.JPG)

> Cliquez sur le bouton "Web SSH" et le terminal s'ouvre dans un nouvel onglet

![Web SSH](/src/assets/img/installation/btn_ssh.JPG)

## Importation des fichiers sur votre serveur depuis le compte Github

> Ouvrez un terminal WEB SSH comme indiqué au point précédent et rendez vous dans le répertoire dans lequel vous souhaitez installer le site (cd repertoire/sous-repertoire)

> Exécutez la commande suivante:

git clone https://github.com/DegimbeLaurent/Projet-client_Carolographie.git

## Configuration des packages sur le serveur Node

> Toujours dans ce même répertoire, installez les packages node via la commande suivante :
> npm install --save express http-server parcel-bundler socket.io dotenv

## Ajout des variables d'environnement sur le serveur

> Ouvrez le gestionnaire de fichiers en cliquant sur le bouton "WEB FTP" situé à gauche du bouton "WEB SSH" (voir ouverture terminal ci-dessus)

> Rendez vous dans le répertoire "src" et créer un fichier texte nommé "env.txt"

> Ajouter les variables d'environnement suivantes et prenant bien soin de remplacer les "xxx" par les données qui vous aurons été communiquées séparément:

API_KEY=xxx

API_USERNAME=xxx

API_PASSWORD=xxx

> Sauvegardez puis renommez le fichier en ".env"

## (Re)démarrage du serveur

> Ouvrez un terminal WEB SSH et installez l'application "forever" en tapant la commande suivante:

npm install forever -g

> Pour (re)lancer le serveur, rendez vous dans le répertoire de votre site et tapez la commande suivante:

forever start src/server.js

## Lien vers le site

> Afin d'accéder à votre site, tapez simplement votre nom de domaine suivi de ":3000"

> Par exemple: https://www.ma-visite-virtuelle.be:3000
