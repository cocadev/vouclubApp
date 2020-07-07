
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    // Listing Style

    wrapper:{
        flex:1,
        flexDirection:'column',
        backgroundColor: globalVals.colors.f1f1f1,
        justifyContent: 'flex-start',
        alignItems:'center',
        padding:0,
    },
    
    listWrapper: {
        flex:1, 
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
        paddingLeft:5,
        paddingRight:5,
        
    },

    stats:{
        flexDirection:'column',
        width:'100%',
        paddingLeft:10,
        paddingRight:10,
        marginTop:10,
        marginBottom:10,
    },

    row:{
        borderBottomWidth:0.5,
        borderBottomColor:globalVals.colors.lightGray,
        flexDirection:'row',
        paddingTop:7,
        paddingBottom:7,
    },

    rowLbl:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.darkGray,
        fontSize:15,
        textAlign:'left',
        flex:1,
    },
    rowVal:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:14,
        textAlign:'right',
        flex:1,
    },

    number:{
        fontFamily:globalVals.fonts.proximaBold,
        color:globalVals.colors.darkGray,
        fontSize:20,
        textAlign:'center',
        marginTop:10,
        marginBottom:10,
    },

    whiteBox:{
        backgroundColor:globalVals.colors.white,
        padding:10,
        flexDirection:'column',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10,
        marginRight:10,
    },

    credit:{
        height:50,
        width:50,
    },

    creditLbl:{
        color:globalVals.colors.green,
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:18,
        textAlign:'center'
    },

    expLbl:{
        color:globalVals.colors.gray,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:14,
        textAlign:'center'
    },

    imageWrapper:{
        paddingTop:10,
    },

    image:{
        borderRadius:100,
        width:70,
        height:70,
    },

    transWrapper:{
        backgroundColor:globalVals.colors.white,
        padding:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        margin:10,
        width:'100%',
    },

    transIcon:{
        width:50,
        height:50,
        marginRight:14,
    },

    transTitle:{
        color:globalVals.colors.gray,
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:16,
        textAlign:'left',
        paddingTop:5,
        marginRight:70,
    },

    transInfo:{
        color:globalVals.colors.gray,
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:15,
        textAlign:'left',
        marginRight:70,
    },

    time:{
        color:globalVals.colors._cccccc,
        fontFamily:globalVals.fonts.proximaRegular,
        textAlign:'right',
        marginRight:70,
    },

    list:{
        flex:1,
    },





   

});
  