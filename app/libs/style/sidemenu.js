
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    wrapper:{
        flex:1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingTop:30
    },
    
    vslogo: {
        height:25,
        resizeMode:'contain'
    },

    footer:{
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    menu:{
        padding:15,
    },
    menuItem:{
        color:globalVals.colors.white,
        fontSize:18,
        fontFamily:globalVals.fonts.proximaRegular,
        paddingTop:13,
        paddingBottom:13,
    },
    header: {
        padding:15,
        paddingBottom:27,
        borderBottomWidth:1,
        borderBottomColor:globalVals.colors._6a6a6a
    },
    welcome:{
        color:globalVals.colors.white,
        fontSize:18,
        fontFamily:globalVals.fonts.proximaBold,
    },
    userProfile:{
        height:80,
        width:80,
        resizeMode:'contain',
        marginBottom:15,
    }

});
  