import React from 'react';
import ErrorFallback from './ErrorFallback';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        hasError: false,
        role: 'USER'
      };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };  
    }
    componentDidCatch(error, errorInfo) { 
        console.log(error);  
    }

    componentDidMount(){
      const role = localStorage.getItem('role');
      this.setState({ role })
    }
    render() {
      if (this.state.hasError) {
        if(this.state.role === 'USER') return  <p className="msg">Something went wrong</p> 
        else return <ErrorFallback />
      }
      return this.props.children; 
    }
}

export default ErrorBoundary;