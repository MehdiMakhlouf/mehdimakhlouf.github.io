#/bin/bash
ng build --prod
echo "password:"
read pswd
ssh lorbis@ssh-lorbis.alwaysdata.net 'rm -rf tuto-js' < $pswd
scp -r dist lorbis@ssh-lorbis.alwaysdata.net:tuto-js < $pswd
