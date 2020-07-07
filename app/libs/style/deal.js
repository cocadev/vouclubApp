
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const globalVals = require ('../global');

export default StyleSheet.create({

    // Listing Style

    contentWrapper:{
        flex:1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        
    },
    bgImageWrapper:{
        flex:1,
        position:'absolute',
        top:0,
        left:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    
    dealWrapper:{
        flex:1,
        flexDirection:'column',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
    },
   
    dealImage:{
        height:125,
        resizeMode:'cover',
        borderWidth:1,
        borderTopLeftRadius:7,
        borderTopRightRadius:7
    },

    dealInfo:{
        backgroundColor:globalVals.colors.white,
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        borderWidth:1,
        borderTopWidth:0,
        borderColor:globalVals.colors.lightGray,
        padding:7,

    },

    dealTitle:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.darkGray,
        fontSize:16,
    },

    dealDesc: {
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:14,
    },

    infoGroup:{
        flexDirection:'row',
        borderTopWidth:.5,
        borderColor:globalVals.colors.lightGray,
        marginTop:10,
        paddingTop:10,
        paddingBottom:5,
    },

    otherInfo:{
        flex:1,
        borderRightWidth:.5,
        borderColor:globalVals.colors.lightGray,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },

    otherInfoNoBorder:{
        borderRightWidth:0,
    },

    infoValue:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.green,
        fontSize:14,
    },

    infoLabel:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.lightGray,
        fontSize:12,
    },

    // Deal Details Style

    tabBar:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },

    tabBtnActive:{
        flex:1,
        backgroundColor:globalVals.colors.white,
        justifyContent:'center',
        alignItems:'center',
        height:60,
    },

    tabBtn:{
        flex:1,
        backgroundColor:globalVals.colors._b5b5b5,
        justifyContent:'center',
        alignItems:'center',
        height:60,
    },

    tabLbl:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:16,
        
    },
    tabLblActive:{
        color:globalVals.colors.green,
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:16,
        
    },

    tab:{
        backgroundColor:globalVals.colors.white,
        padding:15,
    },

    cntBox:{
        borderBottomWidth:0.5,
        borderBottomColor:globalVals.colors.lightGray,
        paddingBottom:15,
        paddingTop:15,
    },

    cntBoxNoBorder:{
        borderBottomWidth:0,
    },

    cntLbl:{
        fontFamily:globalVals.fonts.proximaBold,
        color:globalVals.colors.gray,
        fontSize:18,
        paddingBottom:7,
    },

    cnt:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:16,
        lineHeight:22,
    },
    
    cntTitle:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.purple,
        fontSize:16,
        fontStyle:'italic',
    },
    
    bullet:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        fontSize:16,
        marginRight:10,
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },

    tcItem:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },

    weekDays:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },

    weekDay:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.white,
        backgroundColor:globalVals.colors.mediumGray,
        marginRight:5,
        paddingRight:7,
        paddingLeft:7,
        paddingTop:5,
        paddingBottom:5,
    },

    weekDayActive:{
        backgroundColor:globalVals.colors.green,
    },

    expWrapper:{
        flexDirection:'row',
        backgroundColor:globalVals.colors._f9f8f8,
        paddingTop:10,
        paddingBottom:10,
    },

    expBox:{
        flex:1,
        flexDirection:'column',
        borderRightWidth:.5,
        borderColor:globalVals.colors.lightGray,
        justifyContent:'center',
        alignItems:'center',
    },

    expBoxNoBorder:{
        borderRightWidth:0,
    },

    expIcon:{
        width:25,
        height:25,
    },

    expLbl:{
        fontFamily:globalVals.fonts.proximaRegular,
        fontSize:12,
        marginTop:5,
        marginBottom:2,
    },

    expValue:{
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:14,
        color:globalVals.colors.green
    },

    galleryItem:{
        width:null,
        height:170,
        resizeMode:'cover',
    },

    ohItem:{
        flexDirection:'row',
        marginBottom:7,
    },

    ohDay:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.gray,
        borderWidth:0.5,
        borderColor:globalVals.colors.green,
        width:40,
        paddingTop:5,
        paddingBottom:5,
        marginRight:10,
        textAlign:'center',
    },

    ohDayActive:{
        fontFamily:globalVals.fonts.proximaRegular,
        color:globalVals.colors.white,
        borderWidth:0,
        backgroundColor:globalVals.colors.green,
        width:40,
        paddingTop:5,
        paddingBottom:5,
        marginRight:10,
        textAlign:'center',
    },

    ohTime:{
        fontFamily:globalVals.fonts.proximaMedium,
        color:globalVals.colors.gray,
        textAlignVertical:'center',
        fontSize:15,
        paddingTop:5,
        paddingBottom:5,
    },

    boxWrapper:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:10,
    },

    box:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:0.5,
        borderRightColor:globalVals.colors.lightGray,

    },

    boxNoRightBorder:{
        borderRightWidth:0,
    },

    iconDirection:{
        height:25,
        width:25,
    },

    directionLbl :{
        color:globalVals.colors.green,
        fontFamily:globalVals.fonts.proximaMedium,
        fontSize:16,
    },
    
    footer:{
        height:100,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        
    },

    footerBar:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:globalVals.colors.white,
        paddingTop:10,
        paddingBottom:10,
    },

    footerBtn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    footerIcon:{
        width:27,
        height:27,
    },

    purpleBtn:{
        marginLeft:17,
        marginRight:17,
    },

    insiderWrapper:{
        flex:1,
        flexDirection:'column',
    },
    insiderItem:{
        flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomColor:globalVals.colors._b5b5b5,
        paddingTop:10,
        paddingBottom:10,
    },
    insiderLabel:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaBold
    },
    insiderValue:{
        color:globalVals.colors.white,
        fontFamily:globalVals.fonts.proximaMedium
    },
    insiderIcon:{
        width:20,
        height:20,
        resizeMode:'contain',
        marginRight:15,
    },
    insiderTitle:{
        color:globalVals.colors.white,
        fontSize:20,
        fontFamily:globalVals.fonts.proximaMedium,
        borderBottomWidth:2,
        borderBottomColor:globalVals.colors.white,
        textAlign:'center',
        paddingBottom:5,
        marginBottom:10,
    },
    insiderButton:{
        padding:15,
        backgroundColor:globalVals.colors.green,
    },
    insiderButtonLabel:{
        fontFamily:globalVals.fonts.proximaBold,
        fontSize:18,
        color:globalVals.colors.white,
        textAlign:'center'
    },



});
  