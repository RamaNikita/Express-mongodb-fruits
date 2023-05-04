const React = require("react");
const Nav = require("../components/Nav");

class New extends React.Component {
  render() {
    return (
      <div>
        <Nav link="/vegetables" text="Home" />
        <h1>Create a New Vegetable!</h1>
        <form action="/vegetables" method="POST">
          Name: <input type="text" name="name" />
          Color: <input type="text" name="color" />
          Is Ready To Eat:
          <input type="checkbox" name="readyToEat" />
          <input type="submit" value="Create Veggie" />
        </form>
      </div>
    );
  }
}

module.exports = New;
