$( document ).ready(function() {
    // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDbgpIztMXEOvgMHeN3ox2fU-teNCmYHTQ",
        authDomain: "train-scheduler-191e0.firebaseapp.com",
        databaseURL: "https://train-scheduler-191e0.firebaseio.com",
        projectId: "train-scheduler-191e0",
        storageBucket: "",
        messagingSenderId: "1093446593566"
      };
      firebase.initializeApp(config);
    
    
    // make a var for database
     var database = firebase.database();
    
    // on click that submits user's input
    $("#addNewTrain").on("click", function(event) {
        event.preventDefault(); //so button does not reset 
    
        //set user input to variables
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        //converts user input to time
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var tFrequency = $("#tFreq").val().trim();
        
        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
         console.log(trainName);
         console.log(destination);
         console.log(firstTime);
         console.log(tFrequency);
         console.log(currentTime);
         //nothing comes up from console log except some sort of warning about Firebase
    
    
    
        //put all new info together in one variable
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: tFrequency
        };
    
    
        //upload newTrain to firebase
        database.ref().push(newTrain);
        
        //clears user inputs before adding new text
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#tFreq").val("");
    });
    
    });
    
    