import {View, StyleSheet, Image, Text} from "react-native";

const Event = () => {
    return (
        <View style={style.eventContainer}>
            <View style={style.infoContainer}>
                {/*<Image source={require('img')} />*/}
                <View style={style.textContainer}>
                    <Text style={style.title}></Text>
                    <Text style={style.description}></Text>
                </View>
            </View>
            <View style={style.actionContainer}>
                <View style={style.dateContainer}>
                    <Text style={style.dateTime}></Text>
                    <Text style={style.dateTime}></Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    eventContainer: {
        flex: 1,
        padding: 16,
        height: 148,
        flexDirection: 'column',
        gap: 10,
        borderRadius: 8,
        alignSelf: 'stretch',
        backgroundColor: 'red'
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    imageContainer: {
        width: 72,
        height: 72,
        borderRadius: '50%'
    },
    textContainer: {
        height: 72,
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8
    },
    title: {
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 400,
    },
    description: {
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: 400,
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    dateContainer: {
        alignItems: 'center',
        gap: 8
    },
    dateTime: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
})

export default Event