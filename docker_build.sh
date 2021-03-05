echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
export TAG=0.0.$TRAVIS_BUILD_NUMBER
docker build -t $DOCKER_USERNAME/$BUILD_DIR:$TAG .
docker push $DOCKER_USERNAME/$BUILD_DIR:$TAG