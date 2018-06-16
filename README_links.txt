[Artigos Leituras]
http://hyperledger-fabric.readthedocs.io/
https://ibm-blockchain.github.io/develop/installing/development-tools.html
https://blog.selman.org/2017/07/08/getting-started-with-blockchain-development/
https://media.readthedocs.org/pdf/hyperledger-fabric/latest/hyperledger-fabric.pdf


######MACOS
NODEJS
brew uninstall node
brew update
brew upgrade
brew cleanup
brew install node
sudo chown -R $(whoami) /usr/local
brew link --overwrite node
brew postinstall node

####To remove NODEJS:
brew uninstall node; 
# or `brew uninstall --force node` which removes all versions
brew prune;
rm -f /usr/local/bin/npm /usr/local/lib/dtrace/node.d;
rm -rf ~/.npm;

#####To install NODEJS:
brew install node;
which node # => /usr/local/bin/node
export NODE_PATH='/usr/local/lib/node_modules' # <--- add this ~/.bashrc
You can run brew info node for more details regarding your node installs.

######consider using NVM instead of brew
NVM (node version manager) is a portable solution for managing multiple versions of node

https://github.com/creationix/nvm
> nvm uninstall v4.1.0
> nvm install v8.1.2
> nvm use v8.1.2
> nvm list
         v4.2.0
         v5.8.0
        v6.11.0
->       v8.1.2
         system

#####Boleto Case

1 - [Installing component composer]

npm install -g composer-cli
npm install -g composer-rest-server
npm install -g generator-hyperledger-composer
npm install -g yo

[NodeVersion]
nvm install 8.9.0
nvm use 8.9.0
npm install -g composer-cli

****************************************
**Somente se a linha acima não funcionar
*****************************************

I had the same issues. And I solved it.

 1.1 follow the instructions in Installing pre-requisites.**Very Important**
The link is below(I am using mac) : - 
https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html

Follow each step.

 1.2 After completing the above step **destroy a previous setup**

https://hyperledger.github.io/composer/latest/installing/development-tools.html#appendix

or 
    docker kill $(docker ps -q)
    docker rm $(docker ps -aq)
    docker rmi $(docker images dev-* -q)

run the above command.

 1.3 After this:- 

Uninstalling the CLI tools ( 4 commands ):

$ npm uninstall composer-cli 
$ npm uninstall composer-rest-server 
$ npm uninstall -g generator-hyperledger-composer
$ npm uninstall -g yo

and installing them again 

$ npm install -g composer-cli@0.19.0
$ npm install -g composer-rest-server
$ npm install -g generator-hyperledger-composer
$ npm install -g yo


After that all, check 

composer -v.

You will get the required version of a composer. And the continue with the steps mentioned in 
https://hyperledger.github.io/composer/latest/installing/development-tools.html
**************************

2 - [Playground local]
//npm install -g composer-playground
//composer-playground
// http://localhost:8080/login
//PeerAdmin@hlfv1 card - createPeerAdminCard

3- [Set up your IDE]
https://code.visualstudio.com/download
Plugin Hyperledger Composer

4 - [Install Hyperledger Fabric]

mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz

cd ~/fabric-dev-servers
./downloadFabric.sh (Docker started)

5 - [Starting and stopping Hyperledger Fabric]

cd ~/fabric-dev-servers
./startFabric.sh
./createPeerAdminCard.sh

~/fabric-dev-servers/stopFabric.sh
~/fabric-dev-servers/teardownFabric.sh (precisa recria PeerAdminCard)

6 - [Killl instances Docker]
    
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)


7 - Create a skeleton business network using Yeoman. This command will require a business network name, description, author name, author email address, license selection and namespace.

yo hyperledger-composer:businessnetwork

8 - Enter boleto-network for the network name, and desired information for description, author name, and author email.

8.1 - Select Apache-2.0 as the license.

8.2 - Select org.boleto.model as the namespace.

8.3 - Select No when asked whether to generate an empty network or not.

9 - Definir business network copy files (.cto, logic.js, permissions.acl, query.qry)

10 - Gerar .bna

composer archive create -t dir -n .

11 - Deploying business network
To install the business network, from the boleto-network directory:

composer network install --card PeerAdmin@hlfv1 --archiveFile boleto-network@0.0.1.bna

12 - To start the business network, run the following command:

composer network start --networkName boleto-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

13 - To import the network administrator identity as a usable business network card, run the following command.

composer card import --file networkadmin.card

The composer card import command requires the filename specified in composer network start to create a card.

14 - To check that the business network has been deployed successfully, run the following command to ping the network:
composer network ping --card admin@boleto-network

15 - The composer network ping command requires a business network card to identify the network to ping.

16 - To create the REST API, navigate to the tutorial-network directory and run the following command:

composer-rest-server

16.1 - Enter admin@boleto-network as the card name.

16.2 - Select never use namespaces when asked whether to use namespaces in the generated API.

16.3 - Select No when asked whether to secure the generated API.

16.4 - Select Yes when asked whether to enable event publication.

16.5 - Select No when asked whether to enable TLS security.

16.6 - Access http://localhost:3000 and http://localhost:3000/explorer 

17 - To create your Angular 4 application, navigate to boleto-network directory and run the following command:

yo hyperledger-composer:angular

17.1 - Select Yes when asked to connect to running business network.

17.2 - Enter standard package.json questions (project name, description, author name, author email, license)

17.3 - Enter admin@boleto-network for the business network card.

17.4 - Select Connect to an existing REST API

17.5 - Enter http://localhost for the REST server address.

17.6 - Enter 3000 for server port.

17.7 - Select Namespaces are not used

The Angular generator will then create the scaffolding for the project and install all dependencies. To run the application, navigate to your angular project directory and run npm start . This will fire up an Angular 4 application running against your REST API at http://localhost:4200 .

18 - (opcional Queries) ver https://ibm-blockchain.github.io/develop/tutorials/queries



