/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Label, setLabel] = useState([]);
  const [Avg, setAvg] = useState(0.0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    function getData() {
      axios.get("http://192.168.1.5:5000/get-data")
        .then(response => {
          console.log('getting data from axios', response.data);
          // console.log(isLoading);
          var sum = 0;
          setData((d) => []);
          setLabel((d) => []);

          setLoading(current => !current)
          response.data.result.map((e) => {
            sum += parseFloat(e.BloodPressure, 10);
            console.log(parseFloat(e.BloodPressure, 10));
            setData((d) => [
              ...d,
              parseFloat(e.BloodPressure, 10),
            ]);
            setLabel((d) => [
              ...d,
              e.date.split("T")[1].split(".")[0],
            ]);
          })
          // sum = sum / Label.length;
          console.log(sum);
          setAvg(sum);
          // setTimeout(() => {
          // this.setState({
          //   loading: false,
          //   axiosData: response.data
          // })
          // }, 5000)
          console.log(Data);
        })
        .catch(error => {
          console.log(error);
        });
      // fetch('http://localhost:8080/get-data')
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     print(responseJson);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }


    setLoading(current => !current)
    // console.log("MyData" + Loading);
    getData();
  }, [])
  // useEffect(() => {
  //   console.log(Loading);
  // }, [Loading]);
  var sum = 0;
  return (

    <SafeAreaView style={backgroundStyle}>
      <AppBar />
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
             alignItems: 'center'
           }}> */}
        {/* {/* {Loading ? <ActivityIndicator size="large" color="#0c9" />
             : <Text>Fetched Data</Text>} */}
        {/* <Text>{Loading ? "Loading..." : null} */}
        {/* </Text> */}
        {/* <Header /> */}
        {/* <Text>Hello World</Text> */}
        {/* <Text>{isLoading}</Text> */}
        {Loading ? <View style={{
          width: Dimensions.get("window").width, // from react-native
          height: Dimensions.get("window").height,
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          justifyContent: 'center',
          alignItems: 'center'
        }}><ActivityIndicator size="large" color="#0c9" />
          <Text>Fetching Data</Text>
        </View> :
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              paddingLeft: 8,
              paddingTop: 12
              // alignItems: 'center'
            }}>

            {/* {
               Data.map((e) => <Text>{e + 1}</Text>)
               // < Text > {Data}</Text>
               // <Text>{Data}</Text>
               // console.console.log(sum);
             } */}
            {
              <Text style={{
                fontWeight: "bold",
                paddingBottom: 10,
                fontSize: 15
              }}>Average Blood Pressure : {(Avg / Label.length).toFixed(2)}</Text>
            }
            {/* <Text>{Label.map((e) => (e + " "))}</Text>
            <Text>{Data.map((e) => (e + " "))}</Text> */}
            {/* {[
               Math.random(),
               Math.random() * 100,
               Math.random() * 100,
               Math.random() * 100,
             ].map((e) => <Text>{e}</Text>)} */}
            <LineChart
              data={{
                labels: Label.length == 0 ? ["Jan", "Feb", "Mar", "Apr"] : Label.map((e) => e),
                datasets: [
                  {
                    data: Data.length == 0 ? [1, 2, 3, 4] : Data.map((e) => e)

                  }
                ]
              }}
              width={Dimensions.get("window").width * 0.96} // from react-native
              height={300}
              // yAxisLabel="$"
              yAxisSuffix="Pa"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>}
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;