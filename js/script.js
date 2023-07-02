// Get the elements from the HTML document
const gpaForm = document.getElementById("gpa-form");
const gpaTable = document.getElementById("gpa-table");
const addCourseBtn = document.getElementById("add-course");
const addSemesterBtn = document.getElementById("add-semester");
const priorGpaInput = document.getElementById("prior-gpa-input");
const priorCreditsInput = document.getElementById("prior-credits-input");
const calculateGpaBtn = document.getElementById("calculate-gpa");
const gpaResult = document.getElementById("gpa-result");
const semesterGpaSpan = document.getElementById("semester-gpa");
const cumulativeGpaSpan = document.getElementById("cumulative-gpa");

// Define a function to create a new table row for a course
function createCourseRow() {
    // Create a new table row element
    const tr = document.createElement("tr");

    // Create four table data elements for course name, credits, grade, and points
    const tdCourse = document.createElement("td");
    const tdCredits = document.createElement("td");
    const tdGrade = document.createElement("td");
    const tdPoints = document.createElement("td");

    // Create four input elements for course name, credits, grade, and points
    const inputCourse = document.createElement("input");
    const inputCredits = document.createElement("input");
    const inputGrade = document.createElement("input");
    const inputPoints = document.createElement("input");

    // Set the attributes and placeholders for the input elements
    inputCourse.setAttribute("type", "text");
    inputCourse.setAttribute("name", "course");
    inputCourse.setAttribute("placeholder", "Enter course name");

    inputCredits.setAttribute("type", "number");
    inputCredits.setAttribute("name", "credits");
    inputCredits.setAttribute("placeholder", "Enter credits");

    inputGrade.setAttribute("type", "text");
    inputGrade.setAttribute("name", "grade");
    inputGrade.setAttribute("placeholder", "Enter letter grade");

    inputPoints.setAttribute("type", "number"); // Allow any numeric value
    inputPoints.setAttribute("name", "points");
    inputPoints.setAttribute("placeholder", "Enter points");

    // Append the input elements to the table data elements
    tdCourse.appendChild(inputCourse);
    tdCredits.appendChild(inputCredits);
    tdGrade.appendChild(inputGrade);
    tdPoints.appendChild(inputPoints);

    // Append the table data elements to the table row element
    tr.appendChild(tdCourse);
    tr.appendChild(tdCredits);
    tr.appendChild(tdGrade);
    tr.appendChild(tdPoints);

    // Return the table row element
    return tr;
}



// Define a function to create a new table body for a semester
function createSemesterBody() {
    // Create a new table body element
    const tbody = document.createElement('tbody');

    // Create a new table row element for the semester header
    const trHeader = document.createElement('tr');
    const tdHeader = document.createElement('td');
    tdHeader.setAttribute('colspan', '4');
    tdHeader.innerHTML = `<h3>Semester ${gpaTable.querySelectorAll('tbody').length + 1}</h3>`;
    trHeader.appendChild(tdHeader);
    tbody.appendChild(trHeader);

    // Create a new table row element for a course
    const newCourseRow = createCourseRow();
    tbody.appendChild(newCourseRow);

    // Return the table body element
    return tbody;
}

// Define a function to convert a letter grade to a numerical value
function convertLetterGrade(grade) {
    switch (grade.toUpperCase()) {
        case "A":
            return 5;
        case "B":
            return 3.4;
        case "C":
            return 2.4;
        case "D":
            return 1.4;
        case "F":
            return 0;
        default:
            return null;
    }
}

// Define a function to calculate the GPA for a semester
function calculateSemesterGpa(tbody) {
    // Get the input elements for credits and points in the table body
    const creditsInputs = tbody.querySelectorAll("input[name='credits']");
    const pointsInputs = tbody.querySelectorAll("input[name='points']");

    // Initialize variables to store the total credits and credit points
    let totalCredits = 0;
    let totalCreditPoints = 0;

    // Loop through the input elements and calculate the credit points
    for (let i = 0; i < creditsInputs.length; i++) {
        // Get the credit and points values from the input elements
        const credit = Number(creditsInputs[i].value);
        const points = Number(pointsInputs[i].value);

        // If the credit and points values are valid, add them to the totals
        if (credit > 0 && points > 0) {
            totalCredits += credit;
            totalCreditPoints += credit * points;
        }
    }

    // If the total credits are positive, calculate and return the GPA
    if (totalCredits > 0) {
        const gpa = totalCreditPoints / totalCredits;
        return gpa.toFixed(2);
    }

    // Otherwise, return null
    else {
        return null;
    }
}



// Define a function to calculate the cumulative GPA
function calculateCumulativeGpa() {
    // Get the table body elements for each semester
    const semesterBodies = gpaTable.querySelectorAll("tbody");

    // Initialize variables to store the GPAs for the first and second semesters
    let firstSemesterGpa = 0;
    let secondSemesterGpa = 0;

    // Loop through the table body elements and get the GPAs for the first and second semesters
    for (let i = 0; i < semesterBodies.length; i++) {
        // Get the GPA for each semester
        const gpa = Number(calculateSemesterGpa(semesterBodies[i]));

        // If this is the first semester, store its GPA
        if (i === 0) {
            firstSemesterGpa = gpa;
        }
        // If this is the second semester, store its GPA
        else if (i === 1) {
            secondSemesterGpa = gpa;
        }
    }

    // Calculate and return the average of the GPAs for the first and second semesters
    const cumulativeGpa = (firstSemesterGpa + secondSemesterGpa) / 2;
    return cumulativeGpa.toFixed(2);
}

// Define a function to get the total credits for a semester
function getSemesterCredits(tbody) {
    // Get the input elements for credits in the table body
    const creditsInputs = tbody.querySelectorAll("input[name='credits']");

    // Initialize a variable to store the total credits
    let totalCredits = 0;

    // Loop through the input elements and add the credit values to the total
    for (let i = 0; i < creditsInputs.length; i++) {
        // Get the credit value from the input element
        const credit = Number(creditsInputs[i].value);

        // If the credit value is positive, add it to the total
        if (credit > 0) {
            totalCredits += credit;
        }
    }

    // Return the total credits
    return totalCredits;
}

// Define a function to display the GPA results
function displayGpaResult() {
    // Get the GPA values for the current semester and the cumulative GPA
    const semesterGpa = calculateSemesterGpa(
        gpaTable.querySelector("tbody:last-child")
    );
    const cumulativeGpa = calculateCumulativeGpa();

    // If the GPA values are not null, display them in the result section
    if (semesterGpa !== null && cumulativeGpa !== null) {
        semesterGpaSpan.textContent = semesterGpa;
        cumulativeGpaSpan.textContent = cumulativeGpa;
        gpaResult.style.display = "block";

        // If the cumulative GPA is above 3.5, show balloons
        if (cumulativeGpa > 3.5) {
            showBalloons();
        }
    }

    // Otherwise, hide the result section
    else {
        gpaResult.style.display = "none";
    }
}

function showBalloons() {
    // Set the number of balloons to create
    const numBalloons = 10;

    // Set the colors for the balloons
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

    // Loop through and create each balloon
    Array(numBalloons).fill().forEach(() => {
        // Create a new balloon element
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");

        // Set the background color of the balloon
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        balloon.style.backgroundColor = color;

        // Set the initial position of the balloon
        const x = Math.random() * window.innerWidth;
        balloon.style.left = `${x}px`;
        balloon.style.bottom = "-100px";

        // Append the balloon to the body
        document.body.appendChild(balloon);

        // Animate the balloon
        setTimeout(() => {
            balloon.style.bottom = `${window.innerHeight + 100}px`;
            balloon.style.opacity = 0;
        }, 10);

        // Remove the balloon after the animation is complete
        balloon.addEventListener("transitionend", () => {
            document.body.removeChild(balloon);
        });
    });
}




// Add an event listener to the add course button
addCourseBtn.addEventListener("click", function() {
    // Get the last table body element in the table
    const lastTbody = gpaTable.querySelector("tbody:last-child");

    // Create a new table row element for a course
    const newCourseRow = createCourseRow();

    // Append the new table row element to the last table body element
    lastTbody.appendChild(newCourseRow);
});

// Add an event listener to the add semester button
addSemesterBtn.addEventListener("click", function() {
    // Create a new table body element for a semester
    const newSemesterBody = createSemesterBody();

    // Append the new table body element to the table
    gpaTable.appendChild(newSemesterBody);
});

// Add an event listener to the calculate GPA button
calculateGpaBtn.addEventListener("click", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Display the GPA result
    displayGpaResult();
});

const typed = new Typed("#element", {
    strings: ["GPA Calculator", "Khalid Abdelaty"],
    typeSpeed: 160,
    backSpeed: 200,
    backDelay: 1000,
    loop: true
});