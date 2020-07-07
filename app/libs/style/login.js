
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
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:19,
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

    form:{
        flexDirection:'row',
        padding:17,
    },

    cntCode:{
        color:globalVals.colors.white,
        width:65,
        fontSize:18,
        textAlign:'center',
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderBottomColor:globalVals.colors.white,
        textAlignVertical:'center',
        marginRight:10,
    },
    mobile:{
        color:globalVals.colors.white,
        flex:1,
        fontSize:18,
        textAlign:'left',
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderBottomColor:globalVals.colors.white,
        textAlignVertical:'center',
    },

    checkbox:{
        backgroundColor:globalVals.colors.white,
        width:25,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        marginRight:17,
    }

});
  