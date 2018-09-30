document.addEventListener("DOMContentLoaded",
    function (event) {


        //check email is realistic
        function emailCheck(email) {
            var emailExp = /\S+@\S+\.\S+/;
            return emailExp.test(email);
        };

        //check if human
        var rand1 = Math.floor(Math.random() * 9 + 1);
        var rand2 = Math.floor(Math.random() * 9 + 1);
        var answer = rand1 + rand2;
        console.log(rand1);
        console.log(rand2);
        console.log(answer);
        document.getElementById("sum").placeholder = (parseInt(rand1) + " + " + parseInt(rand2) + " = ");

        
        function newSubscriber(event) {

            var email =
                document.getElementById("email").value;
            var name =
                " " + document.getElementById("name").value;
            var diff = 
                document.getElementById("diff").value;
            var sum =
                document.getElementById("sum").value;


            if (!emailCheck(email)) {
                var message = "Try again. The email is invalid.";
            } else if (diff<0 || diff>3 || !Number.isInteger(Number(diff))){
                var message = "Try again. Difficulty should be a whole number 0-3.";
            } else if (sum != answer) {
                var message = "Try again. The sum is not correct.";
            } else {
                var message = "Thank you for subscribing" + name + "!";

                alert(message);

                // var mysql = require('mysql');

                // var con = mysql.createConnection({
                //   host: "it.isp.cz",
                //   user: "root",
                //   password: "password"
                // });

                // var sql = "USE sudokulynx; INSERT INTO Subscribers(Name,Email,Difficulty) VALUES('"+name+"','"+email+"',"+diff+");";

                // con.connect(function(err) {
                //   if (err) throw err;
                //   console.log("Connected!");
                //   con.query(sql, function (err, result) {
                //     if (err) throw err;
                //     console.log("Result: " + result);
                //   });
                // });

                //ENTER INTO DATABASE

            };


            document.getElementById("thanks").textContent = message;

        };

        // Unobtrusive event binding
        document.querySelector(".content button")
            .addEventListener("click", newSubscriber);
        




    }
);