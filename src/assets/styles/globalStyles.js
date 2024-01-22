import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
    },
    screen: {
        width: '100%',
        height: '100%',
        paddingTop: 70,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#3257d9',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        bottom: 0,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    componentSimple: {
        width: '100%',
        backgroundColor: '#323232',
        marginBottom: 10,
        padding: 20,
        fontSize: 18,
        borderRadius: 12,
    },
    componentDouble: {
        width: '100%',
        backgroundColor: '#323232',
        marginBottom: 10,
        padding: 20,
        fontSize: 18,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default globalStyles;