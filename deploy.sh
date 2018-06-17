#/bin/bash
ng build --prod
ssh lorbis@ssh-lorbis.alwaysdata.net 'rm -rf tuto-js'
scp -r dist lorbis@ssh-lorbis.alwaysdata.net:tuto-js
