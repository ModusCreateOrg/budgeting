import React from 'react';
import ItemDetails from 'components/ItemDetails';
import {connect} from 'react-redux';

class ItemDetailsContainer extends React.Component<{}>{
    static defaultProps = {
        id : null
    }

    render (){
        return (<ItemDetails id={this.props.id}/>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        id : ownProps.match.params.id
    };
}

export default connect(mapStateToProps)(ItemDetailsContainer);
