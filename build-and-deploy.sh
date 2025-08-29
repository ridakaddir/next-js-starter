#! /bin/bash

DB_USER="postgres"
DB_PASSWORD="Postgres%40123456"
DB_INSTANCE="demo-db"
DB_NAME="postgres"
DB_SCHEMA="public"

PROJECT_NAME="next-js-deploy-demo"

export REGION="us-central1"
export PROJECT_ID="playground-s-11-9d3cc08f"
export CONNECTION_NAME="$PROJECT_ID:$REGION:$DB_INSTANCE"
export DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost/$DB_NAME?schema=$DB_SCHEMA&host=/cloudsql/$PROJECT_ID:$REGION:$DB_INSTANCE&connection_limit=5"

gcloud builds submit \
    --tag gcr.io/$PROJECT_ID/$PROJECT_NAME \
    --project $PROJECT_ID \
    --region $REGION

gcloud run deploy $PROJECT_NAME \
    --image gcr.io/$PROJECT_ID/$PROJECT_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --add-cloudsql-instances=$CONNECTION_NAME \
    --set-env-vars DATABASE_URL=$DATABASE_URL \
    --project=$PROJECT_ID