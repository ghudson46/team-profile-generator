// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern extends Employee {
  constructor(name, id, email, school, getName, getId, getEmail, getSchool, getRole) {
    super(name, id, email, getName, getId, getEmail);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return 'Intern';
  }
}