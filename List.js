import React from 'react';
import { FlatList, Text, View, Dimensions, Animated, Easing } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const itemStyleGen = () => {
    var r = Math.floor(Math.random()*128 + 128);
    var g = Math.floor(Math.random()*128 + 128);
    var b = Math.floor(Math.random()*128 + 128);
    var rgb = `rgb(${r}, ${g}, ${b})`;

    const marginRatio = 0.05;
    var itemStyle = {
        marginTop: 10,
        marginLeft: SCREEN_WIDTH*marginRatio,
        marginRight: SCREEN_WIDTH*marginRatio,
        borderRadius: 5,
        width: SCREEN_WIDTH*(1-marginRatio*2),
        backgroundColor: rgb
    };
    return itemStyle;
}
const textStyle = {
    textAlign: 'left'
}
class List extends React.Component {
    render(){
    const data = [
        { key: '1', name: 'Python', amount: '3000 lines' },
        { key: '2', name: 'Node', amount: '200 lines' },
        { key: '3', name: 'Go', amount: '300 lines' },
        { key: '4', name: 'JavaScript', amount: '200 lines' },
    ];
    return(
        <View>
        <Text style={{textAlign: 'center', marginTop: SCREEN_HEIGHT* 0.1, fontSize: 55}}>Some Cat Facts</Text>
        <FlatList data={data} renderItem={({item}) => <Item idNum={item.key} name={item.name} amount={item.amount}></Item>} />
        </View>
    );
   } 
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        const i = this.props.idNum;
        this.state = {
            yPos: new Animated.Value(i*i*SCREEN_HEIGHT* 0.05+ SCREEN_HEIGHT)
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.yPos,
            { toValue: 0,
                easing: Easing.out(Easing.quad),
                duration: 800,
                delay: 800
            },
        ).start();
   }
    render(){
        return (
            <Animated.View style={{...itemStyleGen(), transform: [
                {translateY: this.state.yPos}
            ]}}>
                <Text style={textStyle}>{this.props.name}</Text>
                <Text style={textStyle}>{this.props.amount}</Text>
            </Animated.View>
        );
    }
}

export default List;