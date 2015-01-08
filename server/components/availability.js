'use strict';

var request = require('request').defaults({jar: true});
var qs = require('querystring');
var url = require('url');
var cheerio = require('cheerio');
var aws2 = require('aws2');
var parser = require('xml2json');
var config = require('../config/environment');

function _parseWalmartBody(body, callback) {
  var item = body.items[0];
  var resp = {
    id: item.itemId,
    name: item.name,
    upc: item.upc,
    image: item.largeImage,
    shipToStore: item.shipToStore,
    freeToShipToStore: item.freeShipToStore,
    availableOnline: item.availableOnline,
    productUrl: item.productUrl,
    addToCartUrl: item.addToCartUrl,
    mobileUrl: null
  };
  return callback(null, {item: resp, stores: null});
}

function _parseBestBuyBody(body, callback) {
  var resp = {};
  resp.stores = [];
  var stores = body.stores;
  for (var i = 0; i < stores.length; i++) {
    var newStore = {};
    var store = stores[i];
    newStore = {
      name: store.name,
      address: store.address,
      address2: null,
      city: store.city,
      state: store.region,
      zipcode: store.postalCode,
      country: store.country,
      phone: store.phone,
      hours: store.hoursAmPm,
      gmtOffset: store.gmtOffset,
      inStoreAvailability: store.products[0].inStoreAvailability,
      inStoreAvailabilityUpdateDate: store.products[0].inStoreAvailabilityUpdateDate,
      miles: store.distance
    };
    resp.stores.push(newStore);
  }
  if(stores.length === 0) {
    return callback(null, {item: null, stores: null});
  }
  var item = stores[0].products[0];
  resp.item = {
    id: item.sku,
    name: item.name,
    upc: item.upc,
    image: item.largeFrontImage,
    shipToStore: item.inStorePickup,
    freeToShipToStore: true,
    availableOnline: item.onlineAvailability,
    productUrl: item.url,
    addToCartUrl: item.addToCartUrl,
    mobileUrl: item.mobileUrl
  };
  return callback(null, resp);
}

function _parseGamestopBody(body, callback) {
  var noResults = body.split('|')[3];
  noResults = noResults.trim().replace(/(\n\r|\n|\r)/gm, '').replace(/\t/g," ").replace(/\s+/g, ' ');
  var $ = cheerio.load(noResults,  {
    normalizeWhitespace: true,
    xmlMode: false,
    decodeEntities: true
  });
  var noResultsDivLength = $('div').children('div#no_stores_near_zip').children().length;
  if(noResultsDivLength > 0) {
    return callback(null, {item: null, stores: null});
  } else {
    var results = body.split('|')[7];
    results = results.trim().replace(/(\n\r|\n|\r)/gm, '').replace(/\t/g," ").replace(/\s+/g, ' ');
    $ = cheerio.load(results, {
      normalizeWhitespace: true,
      xmlMode: false,
      decodeEntities: true
    });
    var milesArr = [];
    $('table#searchResults tbody tr th strong span').each(function (index) {
      milesArr.push($(this).text());
    });
    var addresses = [];
    $('table#searchResults tbody tr td.store_address dl.address').each(function (index) {
      var address = {
        name:  $(this).find('span[id*="MallLabel"]').text(),
        address: $(this).find('span[id*="Address1Label"]').text(),
        address2: $(this).find('span[id*="Address2Label"]').text() ? $(this).find('span[id*="Address2Label"]').text() : null,
        city: $(this).find('span[id*="CityLabel"]').text(),
        state: $(this).find('span[id*="StateLabel"]').text(),
        zipcode: $(this).find('span[id*="ZipLabel"]').text(),
        country: "US",
        phone: $(this).find('span[id*="PhoneLabel"]').text(),
        hours: null,
        gmtOffset: null,
        inStoreAvailability: true,
        inStoreAvailabilityUpdateDate: null,
        miles: milesArr[index]
      };
      addresses.push(address);
    });
    return callback(null, {stores: addresses, item: null});
  }
}

function _parseToysRUs(body, callback) {
  var results = body.trim().replace(/(\n\r|\n|\r)/gm, '').replace(/\t/g," ").replace(/\s+/g, ' ');
  var $ = cheerio.load(results, {
    normalizeWhitespace: true,
    xmlMode: false,
    decodeEntities: true
  });
  var addresses = []
  $('table.locations tbody tr').each(function (index) {
    var availabilityText = $(this).find('td.instock span').text();
    var availability = null;
    if(availabilityText === 'unavailable') {
      availability = false;
    }
    if(availabilityText === 'in-stock') {
      availability = true;
    }
    var addrObj = $(this).find('td.location span.storeAddress').text().trim().split(', ');
    var hours = '';
    $(this).find('td.location span.store_link.hours span.content span.middle').each(function (index) {
      hours = $(this).text().trim().split('STORE HOURS ')[1];
    });
    var storeName = $(this).find('td.location span.storeName strong').text();
    var address = {
      name: storeName.substring(0, storeName.length -1),
      address: addrObj[0],
      address2: null,
      city: addrObj[1],
      state: addrObj[2].split(' ')[0],
      zipcode: addrObj[2].split(' ')[1],
      country: "US",
      phone: $(this).find('td.location span.storePhone strong').text(),
      hours: hours,
      gmtOffset: null,
      inStoreAvailability:  availability,
      inStoreAvailabilityUpdateDate: null,
      miles: $(this).find('td.location span.storeDistance strong').text().split(' miles')[0],
    };
    addresses.push(address);
  });
  if(addresses.length === 0) {
    addresses = null;
  }
  return callback(null, {stores: addresses, item: null});
}

function _parseTargetBody(storeBody, itemBody, callback) {
  var newStores = [];
  for (var i = 0; i < storeBody.products[0].stores.length; i++) {
    var store = storeBody.products[0].stores[i];
    var addrObj = store.formatted_store_address.split(', ');
    var newStore = {};
    if(addrObj.length === 3) {
      newStore = {
        name: store.store_name,
        address: addrObj[0],
        address2: null,
        city: addrObj[1],
        state: addrObj[2].split(' ')[0],
        zipcode: addrObj[2].split(' ')[1],
        country: "US",
        phone: store.store_main_phone,
        hours: null,
        gmtOffset: null,
        inStoreAvailability: store.onhand_quantity > 0 ? true : false,
        inStoreAvailabilityUpdateDate: null,
        miles: store.distance,
      };
    } else {
      newStore = {
        name: store.store_name,
        address: addrObj[0],
        address2: addrObj[1],
        city: addrObj[2],
        state: addrObj[3].split(' ')[0],
        zipcode: addrObj[3].split(' ')[1],
        country: "US",
        phone: store.store_main_phone,
        hours: null,
        gmtOffset: null,
        inStoreAvailability: store.onhand_quantity > 0 ? true : false,
        inStoreAvailabilityUpdateDate: null,
        miles: store.distance,
      };
    }
    newStores.push(newStore);
  }
  var item = itemBody['CatalogEntryView'][0];
  var newItem = {
    id: item['DPCI'],
    name: item['title'],
    upc: item['UPC'],
    image: item['Images'][0]['PrimaryImage'][0]['image'],
    shipToStore: true,
    freeToShipToStore: true,
    availableOnline: item['inventoryStatus'] === 'in stock' ? true: false,
    productUrl: item['dynamicKitURL'],
    addToCartUrl: null,
    mobileUrl: null
  };
  return callback(null, {stores: newStores, item: newItem});
}

function _parseAmazonBody(body, callback) {
  if(!body['ItemLookupResponse']['Items']['Request']['IsValid']) {
    return callback(null, {item: null, stores: null});
  }
  var item = body['ItemLookupResponse']['Items']['Item'];
  var newItem = {
    id: item['ASIN'],
    name: item['ItemAttributes']['Title'],
    upc: item['ItemAttributes']['UPC'],
    image: item['LargeImage']['URL'],
    shipToStore: null,
    freeToShipToStore: null,
    availableOnline: item['Offers']['TotalOffers'] > 0 ? true : false,
    productUrl: item['DetailPageURL'],
    addToCartUrl: null,
    mobileUrl: null
  };
  return callback(null, {item: newItem, stores: null});
}

// https://api.walmartlabs.com/v1/items?ids=41488612,41488614,41488611,41488613,40571997,41488608,41488610,41488609,40571996&apiKey=<MY API KEY>
exports.walmart = function (amiibo, callback) {
  var baseUrl = 'https://api.walmartlabs.com/v1/items';
  var id = amiibo.online;
  if(id === null) {
    return callback(null, {});
  }
  var apiKey = config.walmart.apiKey;
  var parameters = qs.stringify({
    ids: id,
    apiKey: apiKey
  });
  var URL = baseUrl + '?' + parameters;
  request.get(URL, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode !== 200) {
      console.log(body);
      return callback(null, {item: null, stores: null});
    }
    body = JSON.parse(body);
    _parseWalmartBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};

// https://api.remix.bestbuy.com/v1/stores(area(85251,100))+products(sku%20in%20(1371003,1373001,1376008,1379005,1377007,1375009,8886008,8885072,8887016,9700119,7522006,1378006,1374019,1375009,9703107,9701109,9705105))?apiKey=<MY API KEY>&format=json
exports.bestbuy = function (amiibo, zip, radius, callback) {
  var baseUrl = 'https://api.remix.bestbuy.com/v1';
  var id = amiibo.sku;
  if(id === null) {
    return callback(null, {});
  }
  var apiKey = config.bestbuy.apiKey;
  var paramUrl = '/stores(area(' + zip + ', ' + radius + '))+products(sku in(' + id + '))';
  var parameters = qs.stringify({
    apiKey: apiKey,
    format: 'json'
  });
  var URL = baseUrl + paramUrl + '?' + parameters;
  request.get(URL, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode !== 200) {
      console.log(body);
      return callback(null, {item: null, stores: null});
    }
    body = JSON.parse(body);
    if(body.totalPages > 1) {
      // TODO Get the other pages from the Bestbuy API request
    }
    _parseBestBuyBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};

exports.gamestop = function (amiibo, zip, callback) {
  var baseUrl = 'http://www.gamestop.com/browse/storesearch.aspx';
  var id = amiibo.sku;
  if(id === null) {
    return callback(null, {});
  }
  var parameters = qs.stringify({
    sku: id
  });
  var URL = baseUrl + '?' + parameters;
  request.post(URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
      'X-MicrosoftAjax': 'Delta=true'
    },
    form: {
    'ctl00$ctl00$ScriptManager1': 'ctl00$ctl00$ScriptManager1|ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$FindZipButton',
    'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$EnterZipTextBox': zip,
    'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$StoreSavedModalPopup$PopupTargetControl': '',
    'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$NoStoresFoundModalPopup$PopupTargetControl': '',
    '__EVENTTARGET': 'ctl00$ctl00$BaseContentPlaceHolder$mainContentPlaceHolder$StoreSearchControl$FindZipButton',
    '__EVENTARGUMENT': '',
    '__LASTFOCUS': '',
    '__VIEWSTATE': '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YWluQ29udGVudFBsYWNlSG9sZGVyJFN0b3JlU2VhcmNoQ29udHJvbCRTdG9yZUxpc3RVc2VyQ29udHJvbCRTdG9yZXNSZXBlYXRlciRjdGwwMCRTdG9yZUluZm9Db250cm9sJFN0b3JlU2VsZWN0Vmlld3MPD2RmZAWYAWN0bDAwJGN0bDAwJEJhc2VDb250ZW50UGxhY2VIb2xkZXIkbWFpbkNvbnRlbnRQbGFjZUhvbGRlciRTdG9yZVNlYXJjaENvbnRyb2wkU3RvcmVMaXN0VXNlckNvbnRyb2wkU3RvcmVzUmVwZWF0ZXIkY3RsMDIkU3RvcmVJbmZvQ29udHJvbCRTdG9yZVNlbGVjdFZpZXdzDw9kZmQFmAFjdGwwMCRjdGwwMCRCYXNlQ29udGVudFBsYWNlSG9sZGVyJG1haW5Db250ZW50UGxhY2VIb2xkZXIkU3RvcmVTZWFyY2hDb250cm9sJFN0b3JlTGlzdFVzZXJDb250cm9sJFN0b3Jlc1JlcGVhdGVyJGN0bDA1JFN0b3JlSW5mb0NvbnRyb2wkU3RvcmVTZWxlY3RWaWV3cw8PZGZkBZgBY3RsMDAkY3RsMDAkQmFzZUNvbnRlbnRQbGFjZUhvbGRlciRtYWluQ29udGVudFBsYWNlSG9sZGVyJFN0b3JlU2VhcmNoQ29udHJvbCRTdG9yZUxpc3RVc2VyQ29udHJvbCRTdG9yZXNSZXBlYXRlciRjdGwwMyRTdG9yZUluZm9Db250cm9sJFN0b3JlU2VsZWN0Vmlld3MPD2RmZAWYAWN0bDAwJGN0bDAwJEJhc2VDb250ZW50UGxhY2VIb2xkZXIkbWFpbkNvbnRlbnRQbGFjZUhvbGRlciRTdG9yZVNlYXJjaENvbnRyb2wkU3RvcmVMaXN0VXNlckNvbnRyb2wkU3RvcmVzUmVwZWF0ZXIkY3RsMDQkU3RvcmVJbmZvQ29udHJvbCRTdG9yZVNlbGVjdFZpZXdzDw9kZmQFmAFjdGwwMCRjdGwwMCRCYXNlQ29udGVudFBsYWNlSG9sZGVyJG1haW5Db250ZW50UGxhY2VIb2xkZXIkU3RvcmVTZWFyY2hDb250cm9sJFN0b3JlTGlzdFVzZXJDb250cm9sJFN0b3Jlc1JlcGVhdGVyJGN0bDAxJFN0b3JlSW5mb0NvbnRyb2wkU3RvcmVTZWxlY3RWaWV3cw8PZGZkNMNRXSWlSq1DTK/Akvxn0VpOz2c=',
    '__VIEWSTATEGENERATOR': '91AC1DA8',
    '__ASYNCPOST': 'true'
  }}, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode !== 200) {
      console.log(body);
      return callback(null, {item: null, stores: null});
    }
    _parseGamestopBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};

exports.toysrus = function (amiibo, zip, radius, callback) {
  var baseUrl = 'http://www.toysrus.com/storefrontsearch/stores.jsp';
  var productId = amiibo.productId;
  var id = amiibo.skuId;
  if(id === null) {
    return callback(null, {});
  }
  var URL = baseUrl;
  request.post(URL, {
    headers: {
      'Cookie': 'hl_p=2981b471-9956-40ee-8cff-cde478fbc8c3; StackLocation=slc2prd; __g_u=129508311129368_1_0.5_1_5_1419820466659_0; mbox=check#true#1419388526|session#1419388465955-873476#1419390326|PC#1419388465955-873476.19_23#1420598067; ClrCSTO=T; ClrSSID=1419388467197-10401; ClrOSSID=1419388467197-10401; ClrSCD=1419388467197; s_ppv=42; s_cc=true; s_vs=1; s_cpm=%5B%5B\'Direct%2520Load\'%2C\'1419388467249\'%5D%5D; s_nr=1419388467250; s_previousPageName=en_US%3A%20TRU%3A%20Home%20Page; s_sq=%5B%5BB%5D%5D; RES_TRACKINGID=9105980476488391; ResonanceSegment=; RES_SESSIONID=74784011476488391; JSESSIONID=xG5cJhmTkH8xzmQQ45ynyQsSy5DLJlt7Bkh6cbJDTL3c6TyC2351!-292345710; browser_id=234714068658; s_vi=[CS]v1|2A4D13198519343C-4000060560000111[CE]; utag_main=v_id:014a7a2539a3000932e387b3ed4b0807800380700093c$_sn:1$_ss:1$_pn:1%3Bexp-session$_st:1419390267619$ses_id:1419388467619%3Bexp-session; __g_c=c%3A129508311129368%7Cd%3A1%7Ca%3A1%7Cb%3A2%7Ce%3A0.5%7Cf%3A1%7Ch%3A0%7Cr%3A%7Cg%3A1; pUserId=140ce986-27f7-4e79-91c3-7805b70fbe83; fsr.s={"v2":-2,"v1":1,"rid":"de358f9-93468937-a714-1f16-19bd2","to":3,"c":"http://www.toysrus.com/shop/index.jsp","pv":1,"lc":{"d3":{"v":1,"s":false}},"cd":3}; __utmt=1; __utma=136881205.1534508923.1419388469.1419388469.1419388469.1; __utmb=136881205.1.10.1419388469; __utmc=136881205; __utmz=136881205.1419388469.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); PrefID=143-1150870479',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
      'X-Prototype-Version': '1.6.0',
      'X-Requested-With': 'XMLHttpRequest'
    },
    form: {
      skuId: id,
      quantity: 1,
      postalCode: zip,
      latitude: '33.4986286',
      longitude: '-111.9224398',
      productId: productId,
      startIndexForPagination: 0,
      searchRadius: radius,
      pageType: 'product',
      ispu_or_sts: 'null',
      _: 'Response Headersview source'
    }
  }, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    if(resp.statusCode !== 200) {
      console.log(body);
      return callback(null, {item: null, stores: null});
    }
    _parseToysRUs(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};

exports.target = function (amiibo, zip, radius, callback) {
  var baseUrl = 'http://api.target.com/products/v3/saleable_quantity_by_location';
  var id = amiibo.dpci;
  if(id === null) {
    return callback(null, {});
  }
  var parameters = qs.stringify({
    key: config.target.apiKey
  });
  var URL = baseUrl + '?' + parameters;
  request.post(URL, {
    json: {
      products:[{
        product_id: id,
        desired_quantity: 1
      }],
      nearby: zip,
      radius: radius,
      multichannel_options: [{
        multichannel_option: "none"
      }]
    }
  }, function (error, resp, storeBody) {
    if(error) {
      console.log(error);
      return callback(null, {item: null, stores: null});
    }
    if(resp.statusCode !== 200) {
      console.log(storeBody);
      return callback(null, {item: null, stores: null});
    }
    var baseUrl = 'http://tws.target.com/productservice/services/item_service/v1/by_itemid';
    var id = amiibo.dpci;
    var parameters = qs.stringify({
      id: id,
      idType: 'DPCI',
      alt: 'json'
    });
    var URL = baseUrl + '?' + parameters;
    var req = request.get(URL, {
      headers: {
        'Accept': '*/*',
        'Host':'tws.target.com',
        'DNT': '1',
        'Cookie':'twsakalb=scs',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
      }
    }, function (error, resp, itemBody) {
      if(error) {
        console.log(error);
        return callback(null, {item: null, stores: null});
      }
      if(resp.statusCode !== 200) {
        console.log(itemBody);
        return callback(null, {item: null, stores: null});
      }
      itemBody = JSON.parse(itemBody);
      _parseTargetBody(storeBody, itemBody, function (error, resp) {
        if(error) {
          return callback(error);
        }
        return callback(null, resp);
      });
    });
  });
};

// https://webservices.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemLookup&ItemId=<ASIN>&MerchantId=Amazon&ResponseGroup=Large&AssociateTag=foobar
exports.amazon = function (amiibo, zip, radius, callback) {
  var urlObject = url.parse('https://webservices.amazon.com');
  var baseUrl = urlObject.href;
  var id = amiibo.asin;
  if(id === null) {
    return callback(null, {});
  }
  var path = '/onca/xml';
  var parameters = qs.stringify({
    Service: 'AWSECommerceService',
    Operation: 'ItemLookup',
    ItemId: id,
    MerchantId: 'Amazon',
    ResponseGroup: 'Large',
    AssociateTag: 'sp34hi34mafaf-20'
  });
  var options = {
    host: urlObject.host,
    path: path + '?' + parameters
  };
  aws2.sign(options, {
    accessKeyId: config.amazon.accessKeyId,
    secretAccessKey: config.amazon.secretAccessKey
  });
  request.get(baseUrl + options.path, {
    headers: {
      'Accept': 'application/xml'
    }
  }, function (error, resp, body) {
    if(error) {
      return callback(error);
    }
    body = parser.toJson(body);
    body = JSON.parse(body);
    if(resp.statusCode !== 200) {
      return callback(body);
    }
    _parseAmazonBody(body, function (error, resp) {
      if(error) {
        return callback(error);
      }
      return callback(null, resp);
    });
  });
};