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
    $("#trainInfoBtn").on("click", function(event) {
        event.preventDefault(); //no button reset
    
        //set user input values to variables
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        //converts user input to time
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var frequency = $("#freq").val().trim();
        
        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
         console.log(trainName);
         console.log(destination);
         console.log(firstTime);
         console.log(frequency);
         console.log(currentTime);
    
    
    
        //put all new info together in one variable
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        };
    
    
        //upload newTrain to firebase
        database.ref().push(newTrain);
        
        //clears user inputs before adding new text
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");
    
        //supposed to prevent from moving to a new page... idk how
        return false;
    
    });
    
    //figure out what this does
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
            console.log(childSnapshot.val());
            //store in variables
            var trainName = childSnapshot.val().train;
            var destination =childSnapshot.val().trainGoing;
            var firstTime = childSnapshot.val().trainComing;
            var frequency = childSnapshot.val().everyXMin;
    
    	    console.log(trainName);
    		console.log(destination);
    	    console.log(firstTime);
        	console.log(frequency);
    
            //makes first train time neater
            var trainTime = moment.unix(firstTime).format("hh:mm");
            //calculate difference between times
            var difference =  moment().diff(moment(trainTime),"minutes");
    
            //time apart(remainder)
            var trainRemain = difference % frequency;
    
            //minutes until arrival
            var minUntil = frequency - trainRemain;
    
            //next arrival time
            var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
    
            //adding in the DOM Stuff
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    
    });
    });
    
    