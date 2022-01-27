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
      axios.get("http://192.168.1.4:5000/get-data")
        .then(response => {
          console.log('getting data from axios', response.data);
          // console.log(isLoading);
          var sum = 0;
          setLoading(current => !current)
          response.data.result.map((e) => {
            sum += parseFloat(e.BloodPressure, 10);

            setData((d) => [
              ...d,
              parseFloat(e.BloodPressure, 10),
            ]);
            setLabel((d) => [
              ...d,
              e.date.split("T")[1].split(".")[0],
            ]);
          })
          setAvg(sum);
          setTimeout(() => {
            // this.setState({
            //   loading: false,
            //   axiosData: response.data
            // })
          }, 5000)
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
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          alignItems: 'center'
        }}><ActivityIndicator size="large" color="#0c9" />
          <Text>Fetching Data</Text>
        </View> :
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              alignItems: 'center'
            }}>
            {

              < Text > {sum}</Text>
              // console.console.log(sum);
            }
            <LineChart
              data={{
                labels: Label,
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ]
                  }
                ]
              }}
              width={Dimensions.get("window").width * 0.96} // from react-native
              height={300}
              // yAxisLabel="$"
              // yAxisSuffix="k"
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
