import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import AppBar from './Appbar';
import moment from 'moment';

const BloodData = (props) => {
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2
    };
    return (
        <View
            style={{
                flexDirection: "row",
            }}
        >
            <View style={{ flex: 0.7 }}>
                <Text style={styles.data}>Highest Blood Pressure : {(props.highestRecordS)}/{(props.highestRecordD)}</Text>
                <Text style={styles.data}>Lowest Blood Pressure : {(props.lowestRecordS)}/{(props.lowestRecordD)}</Text>
                <Text style={styles.data}>Average Blood Pressure : {(props.Avg / props.Label.length).toFixed(2)}</Text>


            </View>
            <View style={{ flex: 0.6, alignContent: "center", alignItems: "center" }}>
                <Text style={{

                    fontWeight: "bold",
                    color: 'rgba(116, 213, 78, 1)',
                    paddingTop: 10, fontSize: 25
                }}>{props.Data1[props.Data1.length - 1]}/{props.Data2[props.Data2.length - 1]}</Text>
                <Text style={{
                    fontSize: 14
                }}>{moment(props.latestDate).format('Do MMM, h:mm A')} </Text>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({

    data: {
        paddingBottom: 10,
        fontSize: 13
    }
});

export default BloodData;