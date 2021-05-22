# Spark - Konnex

## Prerequisites:
  1. Python 3.*+
  2. Node 14.*+
  3. React 16.* +
  4. google account for dialog-flow
  5. flutter and firebase access

## Dialog-flow setup:
  1. Create and dialogflow ES agent on https://dialogflow.cloud.google.com/
  2. Go to dialogflow settings and click on `Export and Import`.
  3. Click on 'Import from zip' and upload Airbus-Support.zip
  4. Go to the Integrations and click on web demo.
  5. Copy the demo url or copy iframe code to integrate it on different place.
  6. Follow same process from 1 to 5 for Airbus-Konnex.zip
  7. for Airbus-Konnex bug-reporting bot go to fulfillments and enable webhook with django server URL

## Djange setup:
  1. Clone repo from github and goto django-server
  2. Install packages through
     ```
        pip install -r requirements.txt
     ```
  3. To run server just run the command
    ```
      python manage.py runserver
    ```
   4. Open Multi_Label_Bug_Classifier.ipynb  in Google Colab - Classifier Training and model creation
   
## React Setup:
  1. Go to React Client
  2. Run ``` npm install ``` to install packages.
  3. Run ``` npm start ``` to run project
  
## Android setup:
  1. Download .apk file from drive using URL provided in Presentation
      https://drive.google.com/drive/folders/1dWwUBcKN4nSeaaRV__bQsiR6DiIcUBW_?usp=sharing
