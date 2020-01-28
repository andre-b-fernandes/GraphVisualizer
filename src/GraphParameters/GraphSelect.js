import {Component} from 'react'

export default class GraphSelect extends Component{
    constructor(props){
        super(props);
        this.keyName = props.keyName;
    }
    
    updateSelected(sel){
        this.setState({ selected: sel }, () => {
            this.props.updateParameterInformation(this.keyName, this.state.selected);
        })
    }
}