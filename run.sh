#!/bin/sh
echo 'build static resources'
npm run show-build
# kill old container
if docker ps | grep -i syplatform-ui
    then
        echo 'kill old container'
        docker kill syplatform-ui
fi

# remove old container
if docker ps -a | grep -i syplatform-ui
    then
        echo 'rm old container'
        docker rm syplatform-ui
fi

# remove old images
if docker images | grep docker_syplatform-ui:latest
    then
        echo 'remove old image'
        docker rmi docker_syplatform-ui:latest
fi

echo 'build image'
docker build --rm -t docker_syplatform-ui:latest .
echo 'run docker container'
docker run -p 80:80 --name syplatform-ui -d docker_syplatform-ui:latest