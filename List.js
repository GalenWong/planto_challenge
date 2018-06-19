import React from 'react';
import { FlatList, Text, View, Dimensions, PixelRatio } from 'react-native';


const itemStyleGen = () => {
    var r = Math.floor(Math.random()*128 + 128);
    var g = Math.floor(Math.random()*128 + 128);
    var b = Math.floor(Math.random()*128 + 128);
    var rgb = `rgb(${r}, ${g}, ${b})`;

    const w = Dimensions.get("screen").width;
    console.log("this is width ", w);
    const marginRatio = 0.05;
    var itemStyle = {
        marginTop: 10,
        marginLeft: w*marginRatio,
        marginRight: w*marginRatio,
        borderRadius: 5,
        width: w*(1-marginRatio*2),
        backgroundColor: rgb
    }
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
        <Text>test elemtns</Text>
        <FlatList data={data} renderItem={({item}) => <Item name={item.name} amount={item.amount}></Item>} />
        </View>
    );
   } 
}

class Item extends React.Component {
    render(){
        return (
            <View style={itemStyleGen()}>
                <Text style={textStyle}>{this.props.name}</Text>
                <Text style={textStyle}>{this.props.amount}</Text>
            </View>
        );
    }
}

export default List;