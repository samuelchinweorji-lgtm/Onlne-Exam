// ==============================
// CHECK IF STUDENT IS LOGGED IN
// ==============================

const student = localStorage.getItem("studentID");

if (!student) {
    alert("Please login first.");
    window.location.href = "index.html";
}

// ==============================
// DISPLAY STUDENT ID
// ==============================

const welcome = document.getElementById("welcome");

if (welcome) {
    welcome.textContent = "Welcome, " + student;
}

// ==============================
// CORRECT ANSWERS
// ==============================

const answers = {
    q1: "A",
    q2: "B",
    q3: "A",
    q4: "D",
    q5: "B",
    q6: "C",
};

const totalQuestions = Object.keys(answers).length;

// ==============================
// GET FORM
// ==============================

const form = document.getElementById("examForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearInterval(countdown);

    gradeExam();
});

// ==============================
// GRADE EXAM
// ==============================

function gradeExam() {

    let score = 0;

    for (let question in answers) {

        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    // Save results
    localStorage.setItem("score", score);
    localStorage.setItem("total", totalQuestions);
    localStorage.setItem("percentage", percentage);

    // Redirect to result page
    window.location.href = "result.html";
}

// ==============================
// COUNTDOWN TIMER
// ==============================

let totalTime = 30 * 60;

const timer = document.getElementById("time");

const countdown = setInterval(function () {

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    totalTime--;

    if (totalTime < 0) {

        clearInterval(countdown);

        alert("Time is up! Your exam will now be submitted.");

        gradeExam();
    }

}, 1000);


// ==============================
// TAB SWITCH DETECTION
// ==============================

let tabWarnings = 0;
const maxWarnings = 2;

document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        tabWarnings++;

        if (tabWarnings < maxWarnings) {

            alert(
                "Warning " +
                tabWarnings +
                "/" +
                maxWarnings +
                "\nDo not leave the examination page again."
            );

        } else {

            alert(
                "You have exceeded the maximum number of warnings.\nYour exam has been submitted."
            );

            clearInterval(countdown);

            gradeExam();
        }

    }

});