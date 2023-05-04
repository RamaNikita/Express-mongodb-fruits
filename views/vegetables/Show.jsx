const React = require("react");
const Nav = require("../components/Nav");

class Show extends React.Component {
  render() {
    const veggie = this.props.veggie;
    return (
      <div>
        <Nav link="/vegetables" text="Home" />
        <h1> Show Page </h1>
        The {veggie.name} is {veggie.color} <br />
        {veggie.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </div>
    );
  }
}

module.exports = Show;
