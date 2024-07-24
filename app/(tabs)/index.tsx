import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Icon } from "react-native-elements";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Card } from "react-native-paper";

const defaultRegion: Region = {
  latitude: 22.3193,
  longitude: 114.1694,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const handleStartDateChange = (
    _: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => setFiltersVisible(!filtersVisible)}>
            <Icon name="filter-list" size={30} />
          </TouchableOpacity>
          {filtersVisible && (
            <View style={styles.filters}>
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Start Date"
                  value={startDate.toDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}
              <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="End Date"
                  value={endDate.toDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={handleEndDateChange}
                />
              )}
            </View>
          )}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={defaultRegion}
            showsUserLocation={true}
            zoomControlEnabled={true}
          >
            <Marker
              coordinate={{ latitude: 22.3193, longitude: 114.1694 }}
              title="Hong Kong"
              description="Hong Kong Marker"
            />
          </MapView>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
  },
  card: {
    flex: 1,
    padding: 0,
  },
  filters: {
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 8,
  },
  map: {
    height: 400,
    width: "100%",
  },
});

export default MapPage;
