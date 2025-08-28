#! /bin/bash

export DATABASE_URL="postgresql://postgres:Postgres@123456@localhost:5432/mydb?schema=public"
export PROJECT_ID="playground-s-11-1ecadc32"
export REGION="us-central1"
export CONNECTION_NAME="playground-s-11-1ecadc32:us-central1:demo-db"

gcloud builds submit \
    --tag gcr.io/$PROJECT_ID/next-js-deploy-demo \
    --project $PROJECT_ID \
    --region $REGION

gcloud run deploy next-js-deploy-demo \
    --image gcr.io/$PROJECT_ID/next-js-deploy-demo \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --add-cloudsql-instances=$CONNECTION_NAME \
    --project=$PROJECT_ID