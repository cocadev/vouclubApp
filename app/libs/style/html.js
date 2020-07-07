
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    // Listing Style

    h3:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.green,
        fontSize:18,
    },

    p:{
        color:globalVals.colors.gray,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:16,
        lineHeight:22,
        margin:0,
        padding:0,
    },

    li:{
        margin:0,
        padding:0
    }

   

});
  