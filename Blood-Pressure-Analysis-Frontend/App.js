
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
import Chart from './Charts';
import BloodData from './BloodData';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [Loading, setLoading] = useState(false);
  const [Data1, setData1] = useState([]);
  const [Data2, setData2] = useState([]);
  const [Data3, setData3] = useState([]);
  const [Label, setLabel] = useState([]);
  const [Avg, setAvg] = useState(0.0);
  const [highestRecordS, sethighestRecordS] = useState(0);
  const [lowestRecordS, setlowestRecordS] = useState(0);
  const [highestRecordD, sethighestRecordD] = useState(0);
  const [lowestRecordD, setlowestRecordD] = useState(0);
  const [latestDate, setlatestDate] = useState(new Date())
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    function getData() {
      axios.get("http://192.168.1.5:5000/get-data")
        .then(response => {
          console.log('getting data from axios', response.data);
          var sum = 0;
          var high1 = 0;
          var low1 = 1000;
          var high2 = 0;
          var low2 = 1000;
          setData1((d) => []);
          setData2((d) => []);
          setData3((d) => []);
          setLabel((d) => []);

          setLoading(current => !current)
          response.data.result.map((e, idx) => {
            var systolic = parseFloat(e.systolic, 10);
            var diastolic = parseFloat(e.diastolic, 10);

            sum += parseFloat(e.systolic, 10);
            if (parseFloat(e.systolic, 10) > high1) {
              high1 = parseFloat(e.systolic, 10);
            }
            if (parseFloat(e.systolic, 10) < low1) {
              low1 = parseInt(e.systolic, 10);
            }
            if (parseInt(e.diastolic, 10) > high2) {
              high2 = parseInt(e.diastolic, 10);
            }
            if (parseInt(e.systolic, 10) < low2) {
              low2 = parseInt(e.diastolic, 10);
            }

            setData1((d) => [
              ...d,
              parseFloat(e.systolic, 10),
            ]);
            setData2((d) => [
              ...d,
              parseFloat(e.diastolic, 10),
            ]);
            setData3((d) => [
              ...d,
              parseFloat(e.systolic, 10) + parseFloat(e.diastolic, 10),
            ]);
            var utcDate = e.date;  // ISO-8601 formatted date returned from server
            var localDate = new Date(utcDate);
            console.log(idx + "-" + response.data.length - 1);
            if (idx == response.data.result.length - 1) {
              setlatestDate(localDate);
            }
            setLabel((d) => [
              ...d,
              moment(localDate).format('h:mm:ss a'),
            ]);
          })

          setAvg(sum);
          sethighestRecordS(high1);
          setlowestRecordS(low1);
          sethighestRecordD(high2);
          setlowestRecordD(low2);
        })
        .catch(error => {
          console.log(error);
        });
    }


    setLoading(current => !current)
    getData();
  }, [])

  return (

    <SafeAreaView style={backgroundStyle}>
      <AppBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {Loading ? <View style={styles.loadingView}><ActivityIndicator size="large" color="#0c9" />
          <Text>Fetching Data</Text>
        </View> :
          <View
            style={{
              paddingLeft: 8,
              paddingTop: 4
            }}>
            <Text style={styles.title}>Blood Pressure </Text>
            <BloodData highestRecordS={highestRecordS} lowestRecordS={lowestRecordS} highestRecordD={highestRecordD} lowestRecordD={lowestRecordD} Data1={Data1} Data2={Data2} Label={Label} Avg={Avg} latestDate={latestDate} />

            <Chart Label={Label} Data1={Data1} Data2={Data2} Data3={Data3} />
          </View>}
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  loadingView: {
    width: Dimensions.get("window").width, // from react-native
    height: Dimensions.get("window").height,
    justifyContent: 'center',
    alignItems: 'center'
  }, title: {
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10, fontSize: 20
  }
});

export default App;