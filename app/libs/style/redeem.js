
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
        backgroundColor:globalVals.colors.green,
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
    },

    whiteText:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:20,
        textAlign:'center',
    },
    whiteTextSmall:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:16,
        textAlign:'center',
    },

    bottom:{
        flex:0.7,
        padding:17,
        justifyContent:'center',
        alignItems:'center',
    },

    already:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:16,
        textAlign:'center',
    },

    guest:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.lightGray,
        fontSize:18,
        textAlign:'center',
    },

    btnGreen:{
        backgroundColor:globalVals.colors.green,
        borderRadius:7,
        paddingTop:13,
        paddingBottom:13,
        marginTop:5,
        marginBottom:40,
        width:Dimensions.get('window').width * 0.80,
    },

    btnPurple:{
        backgroundColor:globalVals.colors.purple,
        borderRadius:7,
        paddingTop:13,
        paddingBottom:13,
        marginTop:5,
        marginBottom:10,
        width:Dimensions.get('window').width * 0.80,
    },

    btnDisable:{
        backgroundColor:'#997097'
    },
    
    btnLbl:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:20,
        textAlign:'center',
        
    },

    creditWrapper:{
        paddingTop:30,
        paddingBottom:30,
        alignItems:'center'
    },

    creditIcon:{
        height:70,
        width:70,
        resizeMode:'cover',
    },
    title:{
        fontFamily:globalVals.fonts.proximaBold,
        color:globalVals.colors.gray,
        fontSize:18,
        textAlign:'center',
    },

    codeWrapper:{
        borderRadius:5,
        borderWidth:1,
        borderColor:globalVals.colors.green,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:40,
        paddingBottom:40,
        paddingLeft:60,
        paddingRight:60,
    },
    voucherCode:{
        fontFamily:globalVals.fonts.proximaBold,
        color:globalVals.colors.purple,
        fontSize:20,
        textAlign:'center',
    }

});
  