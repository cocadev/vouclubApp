
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({
  
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width:null,
      height:null,
      backgroundColor:'rgba(0,0,0,0)',
      padding:17
    },
    
    containerNoPadding: {
      flex: 1,
    },
    
    headerBar:{
      backgroundColor:globalVals.colors.green,
      height:64,
      paddingTop:20,
    },

    headerBarText:{
      color:globalVals.colors.white,
      fontFamily:globalVals.fonts.proximaRegular,
      fontSize:20,
      marginTop:Platform.OS === 'ios' ? 10 : 0,
      alignSelf:'center',
    },

    backButton:{
      color:globalVals.colors.white,
      fontSize:26,
      paddingLeft:5
    },

    navButton:{
      color:globalVals.colors.white,
      fontSize:16,
      paddingLeft:5,
      paddingRight:10,
      fontFamily:globalVals.fonts.lato
    },

    footerBar:{
      backgroundColor:globalVals.colors.white,
      height:50,
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      borderTopWidth:1,
      borderTopColor:'rgba(0,0,0,.1)'
    },

    noRecordsWrapper: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'stretch',
      
    },
    loaderWrapper: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'stretch',
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
      backgroundColor:'rgba(255,255,255,0.5)'
    },

    noRecords: {
      fontFamily:globalVals.fonts.proximaMedium,
      fontSize:22,
      color:globalVals.colors.green
    },

    noRecordsMsg:{
      fontFamily:globalVals.fonts.proximaRegular,
      fontSize:18,
      color:globalVals.colors.gray,
      textAlign:'center',
      marginLeft:20,
      marginRight:20,
      lineHeight:24,
    },

    listWrapper: {
        flex:1, 
        alignSelf:'stretch'
    },
    pdfViewer: {
      flex:1,
      width:Dimensions.get('window').width,
    },
    menuIcon: {
      height:20,

    },
    footerIcon: {
       width:25,
       height:25,
       resizeMode:'contain',
    },

    listWrapper: {
        flex:1, 
        alignSelf:'stretch'
    },



    popupWrapper:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"transparent",
    },

    popup:{
      backgroundColor:globalVals.colors.white,
      padding:17,
      justifyContent:'center',
      alignItems:'center',
      width:'90%',
    },

    popupIcon:{
      height:50,
      width:50,
      
    },

    popupTitle:{
      fontFamily:globalVals.fonts.proximaBold,
      color:globalVals.colors.gray,
      fontSize:18,
      marginBottom:20,
      marginTop:20,
    },

    popupMsg:{
      fontFamily:globalVals.fonts.proximaRegular,
      color:globalVals.colors.gray,
      fontSize:16,
      textAlign:'center',
      lineHeight:22,
    },

    popupBtn:{
      backgroundColor:globalVals.colors.purple,
      borderRadius:5,
      paddingTop:10,
      paddingBottom:10,
      marginTop:20,
      width:'100%'
    },

    popupBtnLbl:{
      fontFamily:globalVals.fonts.proximaRegular,
      color:globalVals.colors.white,
      fontSize:16,
      textAlign:'center'
    },

    footerBtn:{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
      justifyContent:'center',
      alignItems:'center',
      paddingLeft:17,
      paddingRight:17,
      paddingBottom:17,
    },

    btnPurple:{
      backgroundColor:globalVals.colors.purple,
      paddingTop:15,
      paddingBottom:15,
      width:'100%'
      
    },
    btnPurpleLbl:{
      fontFamily:globalVals.fonts.proximaBold,
      color:globalVals.colors.white,
      fontSize:17,
      textAlign:'center'
      
    },
    bugWrapper:{
      paddingTop:54,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    bugTitleGreen: {
      fontFamily:globalVals.fonts.proximaMedium,
      fontSize:24,
      color:globalVals.colors.green,
      textAlign:'center',
      paddingTop:10,
      paddingBottom:10
    },
    bugTitle: {
      fontFamily:globalVals.fonts.proximaMedium,
      fontSize:20,
      color:globalVals.colors.darkGray,
      textAlign:'center',
    },

    bugText:{
      fontFamily:globalVals.fonts.proximaRegular,
      fontSize:18,
      color:globalVals.colors.gray,
      textAlign:'center',
      marginLeft:20,
      marginRight:20,
      lineHeight:24,
      textAlign:'center',
      paddingTop:10,
      paddingBottom:10
    },
    bugBtn: {
      backgroundColor:globalVals.colors.green,
      width:170,
      height:170,
      justifyContent:'center',
      alignItems:'center',
      marginTop:54
    },
    myClusterStyle: {
      height:40,
      width:35,
      paddingTop:8,
      alignItems:'center',
    },
    myClusterTextStyle:{
      fontFamily:globalVals.fonts.proximaMedium,
      color:globalVals.colors.white,
      textAlign:'center'
    },

    mapPopup:{
      
      justifyContent:'flex-end',
      alignItems:'stretch',
      backgroundColor:globalVals.colors.white,
      height:263,
    },


  });
  