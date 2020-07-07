
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    // Listing Style

    wrapper:{
        flex:1,
        backgroundColor: globalVals.colors.white,
        justifyContent: 'flex-start',
        alignItems:'center',
        padding:17,
    },
    
    que:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.green,
        fontSize:16,
        marginBottom:10,
    },
    
    ans:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:16,
        marginBottom:10,
        lineHeight:24,
    }



});
  