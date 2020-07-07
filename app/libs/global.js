module.exports = {
    appVersion:string = "1.3",
    channel:string = "ANDROID",
    // baseURL: string = 'http://10.0.1.25:8080/VoucherSkout/resource/', //Local
    // baseURL: string = 'http://test.voucherskout.com/resource/', // Staging
    baseURL: string = 'https://services.voucherskout.com/resource/', // Production
    openWeb: string = 'openWebApi/ups/',
    authWeb: string = 'ups/',
    user: any = {
      image:'',
      name:'',
      mobile:'',
      email:'',
      token:'',
      status:''
    },
    googleTrackingCode:string = "UA-124679583-1",
    clientId:string = "",
    advertisingId:string = "",
    authProvider:string = "voucher.club.login",
    appAccess:string = "Z6H9HBSUT",
    userNumber:string="",
    redeemDealId:string="",
    merchantPin:string="",
    userFavs:string="",
    savedDeals:string="",
    savedDealsCount:string="",
    lastRefreshDate:string="",
    searchKeyword:string="",
    refreshDeals:boolean=false,
    colors: {
        orange: '#C50',
        darkBlue: '#0F3274',
        lightBlue: '#6EA8DA',
        darkGray: '#3b3b3b',
        white:'#ffffff',
        brown:'#95653f',
        lightGray:'#cbcbc9',
        mediumGray:'#8b8b8d',
        f1f1f1:'#f1f1f1',
        green:'#34d486',
        darkGreen:'#38a472',
        yellow:'#ffca08',
        darkPurple:'#31002f',
        white:'#ffffff',
        gray:'#707070',
        purple:'#993094',
        _6a6a6a:'#6a6a6a',
        _b5b5b5:'#b5b5b5',
        _f9f8f8:'#f9f8f8',
        _cccccc:'#cccccc'
    },
    fonts:{
      proximaRegular:'proximaregular',
      proximaMedium:'proximamedium',
      proximaBold:'proximasemibold'
    },
  };