import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
// import {robots} from "./robots";
import './App.css';

import {setSearchField} from "../actions";

const mapStateToProps = state => ({
    searchfield: state.searchRobots.searchfield
});

const mapDispatchToProps = (dispatch) => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
});

class App extends Component {
    constructor(){
        super();

        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        console.log(this.props.store.getState());
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    };

    render() {
        const {robots } = this.state;
        const { searchfield } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });

        return !robots.length ? <h1>Loading</h1> :
            (
            <div className='tc'>
                <h1 className="f1">Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);