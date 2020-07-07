
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
        flex:0.7,
        padding:17,
        backgroundColor:globalVals.colors.green,
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
    },

    whiteText:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:20,
        textAlign:'center',
    },
    
    whiteTextSmall:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:16,
        textAlign:'center',
    },

    credit:{
        height:90,
        width:90,
        marginBottom:10,
    },
    bottom:{
        flex:1,
        padding:17,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:globalVals.colors.f1f1f1,
    },

    note:{
        color:globalVals.colors.gray,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:14,
        textAlign:'center',
        lineHeight:22,
    },

    itemWrapper:{
        flex:1,
        flexDirection:'column',
        width:Dimensions.get('window').width,
        paddingLeft:10,
        paddingRight:10,
    },

    item:{
        flexDirection:'row',
        backgroundColor:globalVals.colors.white,
        padding:10,
        width:'100%',
    },
    packWrapper:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
    },
    packName:{
        color:globalVals.colors.darkGray,
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:16,
        textAlign:'left',
    },

    packMsg:{
        color:globalVals.colors.gray,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:16,
        textAlign:'left',
    },

    priceWrapper:{
        backgroundColor:globalVals.colors.purple,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },

    packPrice:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:16,
        textAlign:'center',
    },
    creditWrapper:{
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,

    }



});
  