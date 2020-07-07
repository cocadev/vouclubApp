
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    // Listing Style

    wrapper:{
        flex:1,
        flexDirection:'column',
        backgroundColor: globalVals.colors.white,
        justifyContent: 'flex-start',
        alignItems:'center',
        padding:0,
    },
    
    top:{
        flex:1,
        padding:17,
        backgroundColor:globalVals.colors.white,
        width:"100%",
        justifyContent:'flex-start',
        alignItems:'center',
    },

    title:{
        fontFamily:globalVals.fonts.proximaBold,
        color:globalVals.colors.gray,
        fontSize:18,
    },

    textSmall:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:14,      
    },
    
    text:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:16,      
    },

    number:{
        fontFamily:globalVals.fonts.proximaBold,
        color:globalVals.colors.green,
        fontSize:18,
        marginBottom:20,
        marginTop:10,
    },

    pinBox:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:15,
    },

    pin:{
        borderWidth:1.5,
        borderColor:globalVals.colors.green,
        width:55,
        height:55,
        marginRight:10,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',

    },
    keypad:{
        marginTop:30,
        marginBottom:20,
    },
    keypadrow:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:10,
    },

    key:{
        borderWidth:1,
        borderColor:globalVals.colors.green,
        width:65,
        height:65,
        marginRight:15,
        borderRadius:0,
        justifyContent:'center',
        alignItems:'center',
    },

    keyLbl:{
        fontSize:22,
        fontFamily:globalVals.fonts.proximaBold
    },
    noBorder:{
        borderWidth:0,
    },

    backspace:{
        width:35,
        height:35,
        resizeMode:'contain',
    },

    bullet:{
        backgroundColor:globalVals.colors.gray,
        width:15,
        height:15,
    }





});
  