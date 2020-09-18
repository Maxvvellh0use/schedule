import React from 'react';
import { connect } from 'react-redux';
import Timezone from './Timezone';
import { changeTimezoneActCreator } from '../../../redux/reducers/timezoneReduser';

const mapStateToProps = (state) => {
  debugger
    return {
      zones: state.timezone,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
      changeTimeZone: (zone) => dispatch(changeTimezoneActCreator(zone)),
  }
}

const TimezoneContainer = connect(mapStateToProps, mapDispatchToProps)(Timezone);

export default TimezoneContainer;
