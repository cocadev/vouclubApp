
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    contentWrapper:{
        flex:1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        
    },
    bgImageWrapper:{
        flex:1,
        position:'absolute',
        top:0,
        left:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    bgImage:{
        flex:1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    catWrapper:{
        flex:1,
        
    },

    searchWrapper: {
        flex:0.7, 
        flexDirection:'column',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
        paddingLeft:14,
        paddingRight:14,
        
    },

    searchBox:{
        backgroundColor:globalVals.colors.white,
        width:'100%',
        height:45,
        borderRadius:7,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
    },

    searchIcon:{
        height:30,
        width:30,
        resizeMode:'contain',
        marginRight:10,
        marginLeft:10,
        marginTop:5,
    },

    searchInput:{
        flex:1,
        fontSize:17,
        fontFamily:globalVals.fonts.proximaRegular,
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

    listItem: {
        backgroundColor:globalVals.colors.white,
        padding:7,
        marginBottom:7,
        borderRadius:5,
        width:'30%',
        height:130,
        marginRight:7,
    },

    listItemWrapper: { 
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },

    listItemLabel: {
        color:globalVals.colors.gray,
        textAlign:'center',
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:14,
        marginLeft:0,
        marginRight:0,
        width:'100%',
    },

    catIcon:{
        width:65,
        height:65,
        resizeMode:'contain'
    }
   
});
  