
const Engineer = require("../develop/lib/Engineer");
const Intern = require("../develop/lib/Intern");
const Manager = require("../develop/lib/Manager");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("../develop/lib/Employee");
const { Console } = require("console");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamArr = [];

function employeeQuestions() {
inquirer
  .prompt([
    {
      type: "input",
      name: 'name',
      message: "'What is the employee's full name?"
    },
    {
      type: "list",
      name: 'role',
      message: 'What is their job title?',
      choices: ["Engineer", "Intern", "Manager"]
    },
    {
      type: "input",
      name: "email",
      message: "What is the employee's email address?"
    },
    {
      type: "input",
      name: 'id',
      message: "'What is the employee's ID number?"
    }
  ])
  .then((response) => {
    if (response.role === "Engineer") {
      engineerQuestions(response);
    } else if (response.role === "Manager") {
      managerQuestions(response);
    } else {
      internQuestions(response);
    }
  })
};

function engineerQuestions(originalAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "github",
        message: "What is the employee's github username?"
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "All done! Do you want to add another team member?"
      }
    ])
    .then(response => {
      const newEngineer = new Engineer(originalAnswers.name, originalAnswers.id, originalAnswers.email, response.github);
      teamArr.push(newEngineer);
      console.log(teamArr);

      if (response.addAnother === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log('Team Built');
      }
    })
}

function internQuestions(originalAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "school",
        message: "What school did this intern go to?"
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "All done! Do you want to add another team member?"
      }
    ])
    .then(response => {
      const newIntern = new Intern (originalAnswers.name, originalAnswers.id, originalAnswers.email, response.school);
      teamArr.push(newIntern);
      console.log(teamArr);
      if (response.addAnother === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log('team built!');
      }
    })
}

function managerQuestions(originalAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "What is this manager's office number"
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "All done! Do you want to add another team member?"
      }
    ])
    .then(response => {
      const newManager = new Manager (originalAnswers.name, originalAnswers.id, originalAnswers.email, response.officeNumber);
      teamArr.push(newManager);
      console.log(teamArr);
      if (response.addAnother === true) {
        employeeQuestions();
      } else {
        buildTeam();
        console.log('team built!');
      }
    })
}

    function buildTeam() {
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      } 
      fs.writeFileSync(outputPath, render(teamArr));
    }

    employeeQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
