#!/bin/sh
echo 'build static resources'
npm run doc:build
# kill old container
if docker ps | grep -i syplatform-docs
    then
        echo 'kill old container'
        docker kill syplatform-docs
fi

# remove old container
if docker ps -a | grep -i syplatform-docs
    then
        echo 'rm old container'
        docker rm syplatform-docs
fi

# remove old images
if docker images | grep docker_syplatform-docs:latest
    then
        echo 'remove old image'
        docker rmi docker_syplatform-docs:latest
fi

echo 'build image'
docker build -f Dockerfile-docs --rm -t docker_syplatform-docs:latest .
echo 'run docker container'
docker run -p 8080:80 --name syplatform-docs -d docker_syplatform-docs:latest