    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDbgpIztMXEOvgMHeN3ox2fU-teNCmYHTQ",
      authDomain: "train-scheduler-191e0.firebaseapp.com",
      databaseURL: "https://train-scheduler-191e0.firebaseio.com",
      projectId: "train-scheduler-191e0",
      storageBucket: "train-scheduler-191e0.appspot.com",
      messagingSenderId: "1093446593566",
      appId: "1:1093446593566:web:c7d3982b886e97b1"
    };
    
    firebase.initializeApp(config);
    
    
    // make a var for database
     var trainData = firebase.database();
    
    // on click that submits user's input
    $("#add-train-btn").on("click", function() {

      //grabs users input
      var trainName = $("train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrain = $("#first-train-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      //creates local 'temporary' object for holding train data
      var newTrain = {

        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
      };

      //uploads train data to the database
      trainData.ref().push(newTrain);

      //logs everything to the console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTrain);
      console.log(newTrain.frequency);

      //Alert
      alert("Train successfully added");
      
      //clears all the text boxes
      $("#train-name-input").val("");
      $("destination-input").val("");
      $("first-train-input").val("");
      $("frequency-input").val("");

      //determine when the next train arrives
      return false;
    });

    //create firebase event for adding trains to the database and a new row in html page when user adds an entry
    trainData.ref().on("child_added", function(childSnapshot, preChildKey){

      console.log(childSnapshot.val());

      //Store everything into a variable
      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().firstTrain;

      var timeArr = tFirstTrain.split(":");
      var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), trainTime);
      var tMinutes;
      var tArrival;

      //If the first train is later than the current time, sent arrival to the first train time
      if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
      } else {

        //calculate the mintues until arrival using maths
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        // to calculate the arrival time, add the tMintes to the current time
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
      }

      console.log("tMinutes:", tMinutes);
      console.log("tArrival:", tArrival);

      //add each trains' data into the table
      $("train-table > tbody").append("<tr><td>" + tName +"</td><td>" + tDestination + "</td><td>" +
          tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
    });    
    
    