# install nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
# restart your shell with nvm enabled
source ~/.bashrc
# install the latest Node.js
nvm install 0.12
# ensure server default version
nvm alias default 0.12
# install various packages, particularly for git
yum groupinstall "Development Tools" -y
yum install gettext-devel openssl-devel perl-CPAN perl-devel zlib-devel -y
yum install git -y
# Move to shared folder, clone and start server
cd /vagrant
git clone https://github.com/sandro-pasquali/express-webhook
cd express-webhook
npm i; npm start
