
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    // Listing Style

    wrapper:{
        flex:1,
        backgroundColor: globalVals.colors.green,
        justifyContent: 'flex-start',
        alignItems:'center',
        
    },
    item:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:17,
    },

    title:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:18,
        textAlign:'center',
        marginBottom:17,
    },

    image:{
        flex:1,
        width:'81%',
        height:null,
        borderWidth:7,
        borderColor:globalVals.colors.white,
        resizeMode:'contain',
    },


});
  