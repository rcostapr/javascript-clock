import React, { Component } from 'react';
import Canvas from './Canvas';
import Digital from './Digital';

class AnalogClock extends Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();

        this.state = {
            dataini: new Date(),
        };

        if (props.params && props.params.date) {
            this.state.dataini = new Date(props.params.date);
        }

        this.setDataini = this.setDataini.bind(this);
        this.getDataini = this.getDataini.bind(this);
    }

    setDataini = (newdate) => {
        this.setState({ dataini: newdate });
    };

    getDataini = () => {
        return this.state.dataini;
    };

    render() {
        return (
            <div>
                <ClockTitle {...this.props} />
                <Canvas {...this.props} />
                <Digital {...this.props} />
            </div>
        );
    }
}

function ClockTitle(props) {
    if (props.params && props.params.title) {
        return <div className="text-center">{props.params.title}</div>;
    }
    return '';
}

export default AnalogClock;
