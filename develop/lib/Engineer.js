// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
  constructor(name, id, email, github, getName, getId, getEmail, getRole, getGithub, getRole) {
    super (name, id, email, getName, getEmail, getId);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return 'Engineer';
  }
}