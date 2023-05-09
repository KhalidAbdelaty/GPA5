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

    // Create three table data elements for course name, credits, and grade
    const tdCourse = document.createElement("td");
    const tdCredits = document.createElement("td");
    const tdGrade = document.createElement("td");

    // Create three input elements for course name, credits, and grade
    const inputCourse = document.createElement("input");
    const inputCredits = document.createElement("input");
    const inputGrade = document.createElement("input");

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

    // Append the input elements to the table data elements
    tdCourse.appendChild(inputCourse);
    tdCredits.appendChild(inputCredits);
    tdGrade.appendChild(inputGrade);

    // Append the table data elements to the table row element
    tr.appendChild(tdCourse);
    tr.appendChild(tdCredits);
    tr.appendChild(tdGrade);

    // Return the table row element
    return tr;
}

// Define a function to create a new table body for a semester
function createSemesterBody() {
    // Create a new table body element
    const tbody = document.createElement("tbody");

    // Create a new table row element for the semester title
    const trTitle = document.createElement("tr");

    // Create a new table data element for the semester title
    const tdTitle = document.createElement("td");

    // Set the colspan attribute to span three columns
    tdTitle.setAttribute("colspan", "3");

    // Create a new heading element for the semester title
    const h3Title = document.createElement("h3");

    // Get the number of semesters in the table
    const semesterCount = gpaTable.querySelectorAll("tbody").length;

    // Set the text content of the heading element to Semester n
    h3Title.textContent = `Semester ${semesterCount + 1}`;

    // Append the heading element to the table data element
    tdTitle.appendChild(h3Title);

    // Append the table data element to the table row element
    trTitle.appendChild(tdTitle);

    // Append the table row element to the table body element
    tbody.appendChild(trTitle);

    // Create four new table row elements for four courses
    const tr1 = createCourseRow();
    const tr2 = createCourseRow();
    const tr3 = createCourseRow();
    const tr4 = createCourseRow();

    // Append the table row elements to the table body element
    tbody.appendChild(tr1);
    tbody.appendChild(tr2);
    tbody.appendChild(tr3);
    tbody.appendChild(tr4);

    // Return the table body element
    return tbody;
}

// Define a function to convert a letter grade to a numerical value
function convertLetterGrade(grade) {
    switch (grade.toUpperCase()) {
        case "A+":
            return 4.3;
        case "A":
            return 4;
        case "A-":
            return 3.7;
        case "B+":
            return 3;
        case "B":
            return 3;
        case "B-":
            return 2.7;
        case "C+":
            return 2.3;
        case "C":
            return 2;
        case "C-":
            return 1.7;
        case "D+":
            return 1.3;
        case "D":
            return 1;
        case "D-":
            return 0.7;
        case "F":
            return 0;
        default:
            return null;
    }
}

// Define a function to calculate the GPA for a semester
function calculateSemesterGpa(tbody) {
    // Get the input elements for credits and grades in the table body
    const creditsInputs = tbody.querySelectorAll("input[name='credits']");
    const gradesInputs = tbody.querySelectorAll("input[name='grade']");

    // Initialize variables to store the total credits and grade points
    let totalCredits = 0;
    let totalGradePoints = 0;

    // Loop through the input elements and calculate the grade points
    for (let i = 0; i < creditsInputs.length; i++) {
        // Get the credit and grade values from the input elements
        const credit = Number(creditsInputs[i].value);
        const grade = gradesInputs[i].value;

        // Convert the grade to a numerical value
        const gradeValue = convertLetterGrade(grade);

        // If the credit and grade values are valid, add them to the totals
        if (credit > 0 && gradeValue !== null) {
            totalCredits += credit;
            totalGradePoints += credit * gradeValue;
        }
    }

    // If the total credits are positive, calculate and return the GPA
    if (totalCredits > 0) {
        const gpa = totalGradePoints / totalCredits;
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

    // Initialize variables to store the total credits and grade points
    let totalCredits = 0;
    let totalGradePoints = 0;

    // Loop through the table body elements and calculate the grade points
    for (let i = 0; i < semesterBodies.length; i++) {
        // Get the GPA and credits for each semester
        const gpa = Number(calculateSemesterGpa(semesterBodies[i]));
        const credits = Number(getSemesterCredits(semesterBodies[i]));

        // If the GPA and credits are valid, add them to the totals
        if (gpa > 0 && credits > 0) {
            totalCredits += credits;
            totalGradePoints += credits * gpa;
        }
    }

    // Get the prior GPA and credits from the input elements
    const priorGpa = Number(priorGpaInput.value);
    const priorCredits = Number(priorCreditsInput.value);

    // If the prior GPA and credits are valid, add them to the totals
    if (priorGpa > 0 && priorCredits > 0) {
        totalCredits += priorCredits;
        totalGradePoints += priorCredits * priorGpa;
    }

    // If the total credits are positive, calculate and return the cumulative GPA
    if (totalCredits > 0) {
        const cumulativeGpa = totalGradePoints / totalCredits;
        return cumulativeGpa.toFixed(2);
    }

    // Otherwise, return null
    else {
        return null;
    }
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
    }

    // Otherwise, hide the result section
    else {
        gpaResult.style.display = "none";
    }
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