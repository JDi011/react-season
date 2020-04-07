import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './seasonDisplay';
import Spinner from './spinner';
class App extends React.Component {
    state = { lat: null, long: null, errorMessage: ''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState ({ lat: position.coords.latitude, long: position.coords.longitude }),
            (err) => this.setState({ errorMessage : err.message })
        );
    }
    
    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return(
            <div>
                Error: {this.state.errorMessage}
            </div>
            );
        }
        if(!this.state.errorMessage && this.state.lat){
            return (
                <div>
                    <SeasonDisplay 
                    lat={this.state.lat}
                    long={this.state.long}
                    />
                </div>
                );        
        }
        return <Spinner message="Please accept location request"/>;
    };

    render () {
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDom.render(
    <App />,
    document.querySelector('#root')
);