from user.models import BugReport
from graph.utils import get_leaderboard
import json
from user.utils import process_dialogflow_webhook, send_email_to_support, utils_bug_classifier
from django.http.response import JsonResponse
from django.shortcuts import render
import joblib
from django.core import serializers

DIALOGFLOW_RESPONSE_TEMPLATE = {
    "fulfillmentMessages": [{"text": {"text": ["Text response from webhook"]}}]
}

def user_details(request):

    # send_email_to_support(
    #     "santhoshkdhana@gmail.com", "Demo", "Hey there!! \n just demo"
    # )
    return JsonResponse({"Team Name": "Spark"}, status=200)


def sending_email(request):

    if request.method == "POST":

        to = request.POST.get("to", "")
        subject = request.POST.get("subject")
        body = request.POST.get("body", "body")

        response = send_email_to_support(to, subject, body)
        if response.status_code == 200:

            return JsonResponse({"message": "Email sent successful"}, status=200)
        else:
            return JsonResponse({"message": "Sending Email Failed"}, status=200)
    else:

        return JsonResponse(
            {"message": "send a post request to send email"}, status=200
        )


def dialogflow_webhook(request):

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    process_dialogflow_webhook(body)

    return JsonResponse(
        {
            "fulfillmentMessages": [
                {"text": {"text": ["Thanks for reporting a bug in the Application. Our Support team will be working on that soon."]}}
            ]
        }
    )


def bug_classifier(request):
    
    bug_text = request.GET["text"]
    
    result = utils_bug_classifier(bug_text)
    
    return JsonResponse({"Bug Classifier": result})


def leaderboard(request):

    result = get_leaderboard()

    return JsonResponse({"leaderboard": f"{result}"})


def update_bug_report(request,id,status):
    
    bug_report = BugReport.objects.filter(id=id).first()
        
    bug_report.status = status
        
    bug_report.save()
    
    return JsonResponse({"message": "success"})