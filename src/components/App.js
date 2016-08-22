import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux'

class App extends React.Component {
    render () {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool
};


// add a listenner to the reducers
// everytime a action have ocurred this will handled that part of the state and re-set
function mapStateToProps (state,ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    }
}

//export default App;
export default connect(mapStateToProps)(App);