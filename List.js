import React from 'react';
import { FlatList, 
    Text, 
    View, 
    Dimensions, 
    Animated, 
    Easing, 
    TouchableWithoutFeedback, 
    Button } from 'react-native';

import { connect } from 'react-redux';
import { getFact } from './reducer';

const mapStateToProps = state => {
    return {
        ...state
    };
};

const mapDispatchToProps = {
    getFact
};

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const marginRatio = 0.06;

const itemStyle = {
    marginTop: 25,
    marginLeft: SCREEN_WIDTH*marginRatio,
    marginRight: SCREEN_WIDTH*marginRatio,
    borderRadius: 10,
    shadowRadius: 6,
    shadowOffset: {
        width: 0,
        height: 1000 
    },
    shadowOpacity: 0.3,
    width: SCREEN_WIDTH*(1-marginRatio*2),
};

const titleStyle = {
    textAlign: 'left',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10
}

const contentStyle = {
    margin: 10,
    marginBottom: 15
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.props.getFact();
    }
    _keyExtrator = (item, index) => item._id;
    render(){
    return(
        <View>
        <Text style={{textAlign: 'center', marginTop: SCREEN_HEIGHT* 0.1, fontSize: 50}}>Some Cat Facts</Text>
        <Button title="Give Me New Facts!" onPress={this.props.getFact}/>
        <FlatList data={this.props.facts}  
        renderItem={({item, index}) => <Item idNum={index + 1} fact={item.text} />} 
        keyExtractor = {this._keyExtrator}
        />
        </View>
    );
   } 
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        const i = this.props.idNum;
        var r = Math.floor(Math.random()*128 + 128);
        var g = Math.floor(Math.random()*128 + 128);
        var b = Math.floor(Math.random()*128 + 128);
        var rgb = `rgb(${r}, ${g}, ${b})`;
        this.state = {
            yPos: new Animated.Value(i*i*SCREEN_HEIGHT* 0.05+ SCREEN_HEIGHT),
            color: rgb,
            numLines: 3
        }
    }
    componentDidMount(){
        Animated.timing(
            this.state.yPos,
            { toValue: 0,
                easing: Easing.out(Easing.cubic),
                duration: 800,
                delay: 800
            },
        ).start();
    }
    componentDidUpdate(){
        Animated.timing(
            this.state.yPos,
            { toValue: 0,
                easing: Easing.out(Easing.cubic),
                duration: 800,
                delay: 800
            },
        ).start(); 
    }

    expand(){
        this.setState({numLines: this.state.numLines==-1?3:-1});
    }


    render(){
        return (
            <TouchableWithoutFeedback onPress={this.expand.bind(this)}>
            <Animated.View style={{...itemStyle, backgroundColor: this.state.color ,
             transform: [
                {translateY: this.state.yPos}
            ]}}> 
     
                <Text style={titleStyle}>Cat Fact {this.props.idNum}</Text>
                <Text style={contentStyle} numberOfLines={this.state.numLines}>{this.props.fact}</Text>
            </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);