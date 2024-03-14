pipeline {
    environment {
		IMAGE_TAG = "${BUILD_NUMBER}"
        IMG_APP = "web-terminal" 
        DOCKERHUB_CREDENTIALS=credentials('cred-abbassi-user5-docker-hub')
    }

    agent any

    stages {
	/*
        stage('Checkout'){
           steps {
				
                url: 'https://github.com/abbassizied/web-terminal.git',
				
                branch: 'main'
           }
        }	
	*/
        stage('Build Docker image for our mini web-app') {
            steps {
			
				echo " =========== ^^^^^^^^^^^^ Buid Docker Image.."
				
				sh 'docker build -t ${IMG_APP} .'
				
				echo " =========== ~~~~~~~~~~~~ ============ "	 
            }
        }

        stage('Tag and Push the artifacts to dockerhub') {

            steps {

                echo " =========== ^^^^^^^^^^^^ tag and push image to Repo .."

                sh "docker tag ${IMG_APP} ${DOCKERHUB_CREDENTIALS_USR}/${IMG_APP}:${BUILD_NUMBER}"

                sh "docker login -u $DOCKERHUB_CREDENTIALS_USR -p  $DOCKERHUB_CREDENTIALS_PSW"

                sh "docker push ${DOCKERHUB_CREDENTIALS_USR}/${IMG_APP}:${BUILD_NUMBER}"

                sh "docker logout"
				
				echo " =========== ~~~~~~~~~~~~ ============ "	

            }
        }


        stage('Run our image') {
            steps {
				echo " =========== ^^^^^^^^^^^^ Testing by running docker-compose .."

				sh 'docker run -d -p 3000:3000 ${IMG_APP}'
						
                echo 'check the status of containers running on the Jenkins host machine ..'
				
				sh 'docker ps'
				
				echo " =========== ~~~~~~~~~~~~ ============ "
				
				echo 'mini web-terminal url: http://jenkins-server.smart-it-partner.com:3000'
				
				echo " =========== ~~~~~~~~~~~~ ============ " 
            }
        }
    
     }

}


       
