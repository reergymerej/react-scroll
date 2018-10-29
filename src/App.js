import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Scrollable extends Component {
  constructor(props) {
    super(props)
    this.timer = setInterval(this.tick, 1000)
    this.state = {
      ticks: [],
    }

    this.messagesEnd = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldScroll && !prevProps.shouldScroll) {
      this.scrollToBottom()
      this.props.onScrollComplete()
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }

  tick = () => {
    this.setState(prev => {
      const ticks = [...prev.ticks]
      ticks.push(Date.now())
      return {
        ticks,
      }
    })
  }

  render(){
    return (
      <div>
        I am scrollable
        <ul>
          { this.state.ticks.map(x => <li>{x}</li>) }
        </ul>
        <div ref={this.messagesEnd} />
      </div>
    )
  }
}

class App extends Component {
  state = {
    scrollToBottom: false,
  }

  handleClick = () => {
    this.setState({ scrollToBottom: true })
  }

  handleScroll = () => {
    this.setState({ scrollToBottom: false })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>scroll it</button>
        <Scrollable
          shouldScroll={this.state.scrollToBottom}
          onScrollComplete={this.handleScroll}
        />
      </div>
    );
  }
}

export default App;
