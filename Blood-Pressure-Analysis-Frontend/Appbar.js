import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Platform } from 'react-native';

const AppBar = () => (
    <Appbar.Header style={styles.item}>
        <Appbar.Content style={{ textColor: 'white' }} title="Blood Pressure Analysis" />
        {/* <Appbar.Action icon="magnify" onPress={() => { }} /> */}
    </Appbar.Header>
);

export default AppBar;

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#e26a00",
        textColor: "white"
    }
})