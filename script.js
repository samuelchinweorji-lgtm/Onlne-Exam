const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const studentID = document.getElementById("studentID").value.trim();
    const password = document.getElementById("password").value.trim();

    // Demo credentials
    if(studentID === "solace" && password === "12345"){

        // Save student's login
        localStorage.setItem("studentID", studentID);

        // Redirect to exam page
        window.location.href = "exam.html";

    }else{

        document.getElementById("message").textContent =
        "Invalid Student ID or Password.";

    }

});