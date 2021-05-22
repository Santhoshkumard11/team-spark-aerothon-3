import pickle
import re

from nltk.util import pr
from user.models import BugClassification, BugReport
from mailjet_rest import Client
# import sib_api_v3_sdk
# from sib_api_v3_sdk.rest import ApiException
import os
from pprint import pprint
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

import nltk
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
nltk.download('wordnet')
nltk.download('punkt')
nltk.download("stopwords")


model_path = "modelfinal.pkl"
vocab_path = "tfidf.pkl"
label_path = "multilabel.pkl"

# def sib_send_email_to_support(to_email, subject, body):


#     configuration = sib_api_v3_sdk.Configuration()
#     configuration.api_key['api-key'] = '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'

#     api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    
#     sender = {"name":"Spark","email":"santhoshkdhana@gmail.com"}
#     replyTo = {"name":"Sendinblue","email":"contact@sendinblue.com"}
#     html_content = f"<html><body><h1>{body}</h1></body></html>"
#     to = [{"email":f"{to_email}","name":f"Support"}]
#     params = {"parameter":"My param value","subject":"New Subject"}
#     send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to,html_content=html_content, sender=sender, subject=subject)


#     try:
#         api_response = api_instance.send_transac_email(send_smtp_email)
#         print(api_response)
#     except ApiException as e:
#         print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)

def send_email_to_support(to_email, subject, body):

    api_key = os.getenv('EMAIL_KEY')
    api_secret = os.getenv('EMAIL_SECRET')
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')
    
    data = {
            "Messages": [
                {
                    "From": {"Email": "santhoshkdhana@gmail.com", "Name": "Spark"},
                    "To": [{"Email": to_email}],
                    "Subject": subject,
                    "TextPart": f"{body}",
                    "CustomID": "AppGettingStartedTest",
                }
            ]
        }
    
    
    return mailjet.send.create(data=data)
    



def process_dialogflow_webhook(body):
    
    query_result = body['queryResult']
    
    parameters = query_result["parameters"]

    intent_name = query_result["intent"]["displayName"]

    if intent_name == "bug.reporting.init - custom":

        create_new_bug_report(parameters, query_result)
        

def vectorize(vocab_path, text):
    tf_vector = joblib.load(vocab_path)
    return tf_vector.transform(text)


def predict(text, model_path):
    ml = joblib.load(model_path)
    return ml.predict(text)

def get_label(np_array,label_path):
    label_transform = joblib.load(label_path)
    return label_transform.inverse_transform(np_array)

def text_preprocess(text):
    lemmatizer = WordNetLemmatizer()
    filter_Sentence = ''
    sentence = text.lower()
    #sentence = expand_contractions(sentence)
    #sentence = spell_check(sentence)
    sentence = re.sub(r'[^\w\s]',' ',sentence)
    sentence = re.sub(r"\d", " ", sentence)#removing digits
    sentence = re.sub(r"\s+[a-zA-Z]\s+", " ", sentence)
    sentence = re.sub(r"\s+", " ", sentence, flags=re.I)
    sentence = re.sub(r"[,@\'?\.$%_]", "", sentence, flags=re.I)
    words = nltk.word_tokenize(sentence)
    # words = [w for w in words if not w in stop_words]
    for word in words:
        #filter_Sentence = filter_Sentence + ' ' + str(word)
        filter_Sentence = filter_Sentence + ' ' + str(lemmatizer.lemmatize(word))
    return [filter_Sentence]


def utils_bug_classifier(bug_text):
    
    result = vectorize(vocab_path, [bug_text])
    
    result = predict(result, model_path)
    
    result = get_label(result, label_path)

    return result[0]

def create_new_bug_report(parameters,query_result):

    bug = BugReport.objects.create(reporter_name = parameters["name"],
                                        reporter_email = parameters["email"],
                                        reporter_phone_number = parameters["phone-number"],
                                        bug_description = query_result["queryText"])
    
    result = utils_bug_classifier(query_result["queryText"])

    bug_classification = BugClassification.objects.create(bug_report_id = bug, tags = str(result))