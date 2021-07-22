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

## Configuration des packages sur le serveur Node

## Importation des fichiers sur votre serveur depuis le compte Github

## Ajout des variables d'environnement sur le serveur

## (Re)démarrage du serveur
