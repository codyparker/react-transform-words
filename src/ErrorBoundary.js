import { Component } from 'react'
import styles from './Transformer.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log("ERR: ",error)
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <span className={styles.error}>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
