export TAG=0.0.$TRAVIS_BUILD_NUMBER


deploy_to_kubernetes()
{
	MODULE=$1
	IMAGE=$DOCKER_USERNAME/$MODULE:$TAG
	MANIFEST=deployment/$MODULE.yaml
	kubectl --kubeconfig=/dev/null  --server=$KUBERNETES_SERVER  --certificate-authority=cert.crt --token=$KUBERNETES_TOKEN -n udagramdev apply -f $MANIFEST
	kubectl --kubeconfig=/dev/null  --server=$KUBERNETES_SERVER  --certificate-authority=cert.crt --token=$KUBERNETES_TOKEN -n udagramdev set image deployment/$MODULE $MODULE=$IMAGE
}

deploy_to_kubernetes udagram-reverseproxy
deploy_to_kubernetes udagram-frontend
deploy_to_kubernetes udagram-users-api
deploy_to_kubernetes udagram-feeds-api