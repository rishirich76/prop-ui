'use strict';
var app = angular.module('myPropApp');

app.controller('AACtrl', ['aaService', '$scope', '$log', function(aaService, $scope, $log) {
    var messageRecording = "Recording...";
    var messageCouldntHear = "Please say that again.";
    var messageSorry = "I'm sorry, I don't have the answer to that yet.";
    var btnText = "Speak";
    $scope.submit = switchRecognition;
    $scope.btnText = btnText;
    var recognition = new webkitSpeechRecognition();
    var isRecognizing = false;

    function startRecognition() {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = function(event) {
            respond(messageRecording);
            updateRec();
        };
        recognition.onresult = function(event) {
            recognition.onend = null;

            var text = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                text += event.results[i][0].transcript;
            }
            setInput(text);
            //respond(text);
            console.log(text);

            stopRecognition();
        };
        recognition.onerror = function(event) {
            console.log(event.error);
        };
        recognition.onend = function() {
            respond(messageCouldntHear);
            stopRecognition();
        };
        recognition.lang = "en-IN";
        recognition.start();
    }

    function updateRec() {
        $scope.btnText = (recognition ? "Stop" : "Speak");
    }

    function stopRecognition() {
        if (isRecognizing) {
            recognition.stop();

        }
        updateRec();
    }

    function switchRecognition() {
        console.log("Switch Recording");
        // startRecognition();
        if (true == isRecognizing) {
            stopRecognition();
            btnText = "Speak";
            isRecognizing = false;
        } else {
            isRecognizing = true;
            btnText = "Stop";
            startRecognition();
        }
    }

    function respond(val) {
        if (val == "") {
            val = messageSorry;
        }

        if (val !== messageRecording) {
            var msg = new SpeechSynthesisUtterance();
            msg.voiceURI = "native";
            msg.text = val;
            msg.lang = "en-IN";
            window.speechSynthesis.speak(msg);
        }
    }

    function setInput(text) {
        $scope.pnrVal = text;
        console.log("Input is : " + text);
        send();

    }

    function send() {
        var text = $scope.pnrVal;
        var respons = aaService.getSpeechResults(text, function cb(res) {
            var text = res.resolvedtext.result.fulfillment.speech;
            respond(text);
            console.log("xx respons == " + respons);
        }); 
        // if (undefined ==  respons) {
        //     // respond("Some error occured at server, hope you won't mind");
        //     $scope.pnrVal = "Some error occured at server, hope you won't mind";
        // }
        // console.log("Respose from aaServictexte :  "  + respons);
        // $.ajax({
        //     type: "POST",
        //     url: baseUrl + "query",
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     headers: {
        //         "Authorization": "Bearer " + accessToken
        //     },
        //     data: JSON.stringify({
        //         query: text,
        //         lang: "en",
        //         sessionId: "yaydevdiner"
        //     }),

        //     success: function(data) {
        //         prepareResponse(data);
        //     },
        //     error: function() {
        //         respond(messageInternalError);
        //     }
        // });
    }

    function prepareResponse(val) {
        var debugJSON = JSON.stringify(val, undefined, 2),
            spokenResponse = val.result.speech;
        respond(spokenResponse);
    }
}])