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

const Chart = (props) => {
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2
    };
    return (
        <LineChart
            data={{
                labels: props.Label.length == 0 ? ["Jan", "Feb", "Mar", "Apr"] : props.Label.map((e) => e),
                datasets: [
                    {
                        data: props.Data1.length == 0 ? [1, 2, 3, 4] : props.Data1.map((e) => e),
                        color: (opacity = 1) => `rgba(116,213,78,${opacity})`,
                        strokeWidth: 2,
                    },
                    {
                        data: props.Data2.length == 0 ? [1, 2, 3, 4] : props.Data2.map((e) => e),
                        color: (opacity = 1) => `rgba(97,64,248,${opacity})`,
                        strokeWidth: 2,
                    },
                    {
                        data: props.Data3.length == 0 ? [1, 2, 3, 4] : props.Data3.map((e) => e),
                        color: (opacity = 1) => `rgba(248,69,115,${opacity})`,
                        strokeWidth: 2,
                    }


                ],
                legend: ['Systolic', 'Diastolic', "MAP"],
            }}
            verticalLabelRotation={30} width={Dimensions.get("window").width} // from react-native
            height={400}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
    );
}

export default Chart;