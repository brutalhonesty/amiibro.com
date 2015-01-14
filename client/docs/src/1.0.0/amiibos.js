/**
 * @apiDefine public This information is publicly accessible.
 * No authentication is required.
 *
 * @apiVersion 1.0.0
 */

/**
* @api {get} /api/amiibos/identifiers Get Amiibo(s)
* @apiVersion 1.0.0
* @apiName Get Amiibo(s)
* @apiGroup Amiibos
* @apiPermission public
*
* @apiDescription Returns the basic Amiibo object used for the front-end or a more complex object if no name is specified.
*
* @apiExample Default example:
*     curl -X GET 'https://amiibro.herokuapp.com/api/amiibos/?name=mario'
*
* @apiExample Default callback example:
*     curl -X GET 'https://amiibro.herokuapp.com/api/amiibos/?name=mario&callback=foo'
*
* @apiSuccess (200 Success) {Object[]} amiibo The Amiibo object requested
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {"basic":{"title":"Mario","hasTrademark":true,"image":"//media.nintendo.com/nintendo/bin/HUsC5jjXJ53Crzxll8FFUe-6xklmNbCJ/a4SWrmW_szU_fF8OGtqfmymlF7wEkgD-.png","link":"/amiibo/mario"}}
*
*/

/**
* @api {get} /api/amiibos/identifiers Get Amiibo Identifiers
* @apiVersion 1.0.0
* @apiName Get Amiibos Identifiers
* @apiGroup Amiibos
* @apiPermission public
*
* @apiDescription Returns the minimal Amiibos object including unique product identifiers for each retailer.
*
* @apiExample Default example:
*     curl -X GET 'https://amiibro.herokuapp.com/api/amiibos/identifiers'
*
* @apiExample Default callback example:
*     curl -X GET 'https://amiibro.herokuapp.com/api/amiibos/identifiers?callback=foo'
*
* @apiSuccess (200 Success) {Object[]} amiibos The list of Amiibos
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [{"mario":{"productCode":{"na":"NVL-C-AAAA-USZ","eu":"NVL-C-AAAA-EUR-CO"},"gamestop":{"sku":104546,"online":117072},"target":{"sku":16478081,"dpci":"207-00-5001"},"bestbuy":{"sku":8883001},"amazon":{"asin":"B00N4ABMG4"},"walmart":{"sku":553266962,"online":40571988},"toysrus":{"skuId":19472202,"sku":"C50CA165","productId":46105416}},"peach":{"productCode":{"na":"NVL-C-AAAB-USZ","eu":"NVL-C-AAAB-EUR-CO"},"gamestop":{"sku":104547,"online":117071},"target":{"sku":16478078,"dpci":"207-00-5004"},"bestbuy":{"sku":8884019},"amazon":{"asin":"B00N4ABT1W"},"walmart":{"sku":553266984,"online":40571993},"toysrus":{"skuId":19472223,"sku":"E2180C89","productId":46105436}},"yoshi":{"productCode":{"na":"NVL-C-AAAC-USZ","eu":"NVL-C-AAAC-EUR-CO"},"gamestop":{"sku":104548,"online":117069},"target":{"sku":16478077,"dpci":"207-00-5005"},"bestbuy":{"sku":8884037},"amazon":{"asin":"B00N4ABT1C"},"walmart":{"sku":553267034,"online":40571994},"toysrus":{"skuId":19472330,"sku":"55BCD704","productId":46105466}},"donkeyKong":{"productCode":{"na":"NVL-C-AAAD-USZ","eu":"NVL-C-AAAD-EUR-CO"},"gamestop":{"sku":104545,"online":117070},"target":{"sku":16478076,"dpci":"207-00-5006"},"bestbuy":{"sku":8885009},"amazon":{"asin":"B00N4ABT1C"},"walmart":{"sku":553266920,"online":40571984},"toysrus":{"skuId":19472374,"sku":"9E1AB79F","productId":46105506}},"link":{"productCode":{"na":"NVL-C-AAAE-USZ","eu":"NVL-C-AAAE-EUR-CO"},"gamestop":{"sku":104549,"online":117063},"target":{"sku":16478079,"dpci":"207-00-5003"},"bestbuy":{"sku":8885018},"amazon":{"asin":"B00N4ABVOM"},"walmart":{"sku":553266951,"online":40571985},"toysrus":{"skuId":19472351,"sku":"7F6B53E1","productId":46105486}},"fox":{"productCode":{"na":"NVL-C-AAAF-USZ","eu":"NVL-C-AAAF-EUR-CO"},"gamestop":{"sku":104550,"online":117065},"target":{"sku":16478073,"dpci":"207-00-5009"},"bestbuy":{"sku":8885027},"amazon":{"asin":"B00N4ABODK"},"walmart":{"sku":553266931,"online":40571992},"toysrus":{"skuId":19472263,"sku":"102EB4FE","productId":46105456}},"samus":{"productCode":{"na":"NVL-C-AAAG-USZ","eu":"NVL-C-AAAG-EUR-CO"},"gamestop":{"sku":104551,"online":117061},"target":{"sku":16478072,"dpci":"207-00-5010"},"bestbuy":{"sku":8885036},"amazon":{"asin":"B00N49EEO2"},"walmart":{"sku":553267003,"online":40571995},"toysrus":{"skuId":19472191,"sku":"B8CF0CEC","productId":46105406}},"wiiFitTrainer":{"productCode":{"na":"NVL-C-AAAH-USZ","eu":"NVL-C-AAAH-EUR-CO"},"gamestop":{"sku":104552,"online":117064},"target":{"sku":16478070,"dpci":"207-00-5012"},"bestbuy":{"sku":8885072},"amazon":{"asin":"B00N49EERY"},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":null,"productId":null}},"villager":{"productCode":{"na":"NVL-C-AAAJ-USZ","eu":"NVL-C-AAAJ-EUR-CO"},"gamestop":{"sku":104553,"online":117059},"target":{"sku":16478074,"dpci":"207-00-5008"},"bestbuy":{"sku":8886008},"amazon":{"asin":"B00N4ABMUA"},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":"9AEA32D2","productId":46105496}},"pikachu":{"productCode":{"na":"NVL-C-AAAK-USZ","eu":"NVL-C-AAAK-EUR-CO"},"gamestop":{"sku":104554,"online":117068},"target":{"sku":16478080,"dpci":"207-00-5002"},"bestbuy":{"sku":8886017},"amazon":{"asin":"B00N4ABSLS"},"walmart":{"sku":553266994,"online":40572001},"toysrus":{"skuId":19472172,"sku":"A3E11EFA","productId":46105396}},"kirby":{"productCode":{"na":"NVL-C-AAAL-USZ","eu":"NVL-C-AAAL-EUR-CO"},"gamestop":{"sku":104555,"online":117066},"target":{"sku":16478075,"dpci":"207-00-5007"},"bestbuy":{"sku":8887007},"amazon":{"asin":"B00N4ABV10"},"walmart":{"sku":553266941,"online":40571986},"toysrus":{"skuId":19472231,"sku":"FA5A1F6B","productId":46105446}},"marth":{"productCode":{"na":"NVL-C-AAAM-USZ","eu":"NVL-C-AAAM-EUR-CO"},"gamestop":{"sku":104556,"online":117060},"target":{"sku":16478071,"dpci":"207-00-5011"},"bestbuy":{"sku":8887016},"amazon":{"asin":"B00N4ABOXU"},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":null,"productId":null}},"zelda":{"productCode":{"na":"NVL-C-AAAQ-USZ","eu":"NVL-C-AAAQ-EUR-CO"},"gamestop":{"sku":106340,"online":117862},"target":{"sku":null,"dpci":"207-00-5014"},"bestbuy":{"sku":9702117},"amazon":{"asin":"B00O92ONBM"},"walmart":{"sku":553267058,"online":40571997},"toysrus":{"skuId":19948538,"sku":"735DBC9A","productId":52097886}},"diddyKong":{"productCode":{"na":"NVL-C-AAAP-USZ","eu":"NVL-C-AAAP-EUR-CO"},"gamestop":{"sku":106346,"online":117863},"target":{"sku":null,"dpci":"207-00-5016"},"bestbuy":{"sku":9703107},"amazon":{"asin":"B00O982JSU"},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":19948458,"sku":"CE2357ED","productId":52097846}},"luigi":{"productCode":{"na":"NVL-C-AAAN-USZ","eu":"NVL-C-AAAN-EUR-CO"},"gamestop":{"sku":106342,"online":117861},"target":{"sku":null,"dpci":"207-00-5013"},"bestbuy":{"sku":9704106},"amazon":{"asin":"B00O97ZWVC"},"walmart":{"sku":553267067,"online":40571998},"toysrus":{"skuId":19948555,"sku":"946FB0E1","productId":52097896}},"littleMac":{"productCode":{"na":"NVL-C-AAAR-USZ","eu":"NVL-C-AAAR-EUR-CO"},"gamestop":{"sku":106348,"online":117860},"target":{"sku":null,"dpci":"207-00-5015"},"bestbuy":{"sku":9705105},"amazon":{"asin":"B00O97ZVJA"},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":19948481,"sku":"0DFB5AA0","productId":52097866}},"captainFalcon":{"productCode":{"na":"NVL-C-AAAU-USZ","eu":"NVL-C-AAAU-EUR-CO"},"gamestop":{"sku":106344,"online":117858},"target":{"sku":null,"dpci":"207-00-5018"},"bestbuy":{"sku":9701109},"amazon":{"asin":"B00O97ZVJ0"},"walmart":{"sku":553267077,"online":40571999},"toysrus":{"skuId":null,"sku":null,"productId":null}},"pit":{"productCode":{"na":"NVL-C-AAAS-USZ","eu":"NVL-C-AAAS-EUR-CO"},"gamestop":{"sku":106338,"online":117859},"target":{"sku":null,"dpci":"207-00-5017"},"bestbuy":{"sku":9700119},"amazon":{"asin":"B00O97ZYP6"},"walmart":{"sku":553267048,"online":40571991},"toysrus":{"skuId":null,"sku":null,"productId":null}},"rosalinaAndLuma":{"productCode":{"na":"NVL-C-AAAV-USZ","eu":"NVL-C-AAAV-EUR-CO"},"gamestop":{"sku":0,"online":null},"target":{"sku":16811585,"dpci":"207-00-5021"},"bestbuy":{"sku":null},"amazon":{"asin":null},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":null,"productId":null}},"bowser":{"productCode":{"na":"NVL-C-AAAW-USZ","eu":"NVL-C-AAAW-EUR-CO"},"gamestop":{"sku":108110,"online":118952},"target":{"sku":16811586,"dpci":"207-00-5020"},"bestbuy":{"sku":1371003},"amazon":{"asin":"B00PG6Z65M"},"walmart":{"sku":553431914,"online":41488609},"toysrus":{"skuId":null,"sku":null,"productId":null}},"lucario":{"productCode":{"na":"NVL-C-AAAT-USZ","eu":"NVL-C-AAAT-EUR-CO"},"gamestop":{"sku":null,"online":null},"target":{"sku":null,"dpci":null},"bestbuy":{"sku":null},"amazon":{"asin":null},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":null,"productId":null}},"toonLink":{"productCode":{"na":"NVL-C-AAAY-USZ","eu":"NVL-C-AAAY-EUR-CO"},"gamestop":{"sku":108116,"online":118956},"target":{"sku":16811587,"dpci":"207-00-5019"},"bestbuy":{"sku":1373001},"amazon":{"asin":"B00PG6Z9VI"},"walmart":{"sku":553431922,"online":41488610},"toysrus":{"skuId":null,"sku":null,"productId":null}},"sheik":{"productCode":{"na":"NVL-C-AAAZ-USZ","eu":"NVL-C-AAAZ-EUR-CO"},"gamestop":{"sku":108101,"online":118951},"target":{"sku":16811582,"dpci":"207-00-5024"},"bestbuy":{"sku":1376008},"amazon":{"asin":"B00PG6ZAZ8"},"walmart":{"sku":553431905,"online":41488608},"toysrus":{"skuId":null,"sku":null,"productId":null}},"kingDedede":{"productCode":{"na":"NVL-C-AABS-USZ","eu":"NVL-C-AABS-EUR-CO"},"gamestop":{"sku":108112,"online":118957},"target":{"sku":16811581,"dpci":"207-00-5025"},"bestbuy":{"sku":1377007},"amazon":{"asin":"B00PG6ZDPK"},"walmart":{"sku":553431956,"online":41488614},"toysrus":{"skuId":null,"sku":null,"productId":null}},"ike":{"productCode":{"na":"NVL-C-AABA-USZ","eu":"NVL-C-AABA-EUR-CO"},"gamestop":{"sku":108105,"online":118948},"target":{"sku":16811580,"dpci":"207-00-5026"},"bestbuy":{"sku":1374019},"amazon":{"asin":"B00PG7M95G"},"walmart":{"sku":553431937,"online":41488612},"toysrus":{"skuId":null,"sku":null,"productId":null}},"shulk":{"productCode":{"na":null,"eu":null},"gamestop":{"sku":107766,"online":118681},"target":{"sku":null,"dpci":null},"bestbuy":{"sku":null},"amazon":{"asin":null},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":null,"productId":null}},"sonic":{"productCode":{"na":null,"eu":null},"gamestop":{"sku":108118,"online":118955},"target":{"sku":16811583,"dpci":"207-00-5023"},"bestbuy":{"sku":1379005},"amazon":{"asin":"B00PG6ZBTS"},"walmart":{"sku":553431930,"online":41488611},"toysrus":{"skuId":null,"sku":null,"productId":null}},"megaMan":{"productCode":{"na":null,"eu":null},"gamestop":{"sku":108103,"online":118949},"target":{"sku":16811584,"dpci":"207-00-5022"},"bestbuy":{"sku":1378006},"amazon":{"asin":"B00PG6ZCT2"},"walmart":{"sku":553431946,"online":41488613},"toysrus":{"skuId":null,"sku":null,"productId":null}},"metaknight":{"productCode":{"na":"NVL-C-AABR-USZ","eu":"NVL-C-AABR-EUR-CO"},"gamestop":{"sku":null,"online":null},"target":{"sku":null,"dpci":null},"bestbuy":{"sku":1375009},"amazon":{"asin":null},"walmart":{"sku":null,"online":null},"toysrus":{"skuId":null,"sku":null,"productId":null}}}]
*
* @apiError (400 Bad Request) InvalidName The Amiibo name provided was not one of the allowed names.
*
* @apiErrorExample Error-Response: (Invalid Name)
*     HTTP/1.1 400 Bad Request
*     {"message":"Invalid Amiibo name.","names":["mario","peach","yoshi","donkeyKong","link","fox","samus","wiiFitTrainer","villager","pikachu","kirby","marth","zelda","diddyKong","luigi","littleMac","captainFalcon","pit","rosalinaAndLuma","bowser","lucario","toonLink","sheik","kingDedede","ike","shulk","sonic","megaMan","metaknight"]}
*
*/

/**
* @api {get} /api/amiibos/status Get Amiibos Status
* @apiVersion 1.0.0
* @apiName Get Amiibos Status
* @apiGroup Amiibos
* @apiPermission public
*
* @apiDescription Queries all the retailers for the status of the requested Amiibo as a zipcode and radius.
*
* @apiParam {String} name The name of the amiibo.
* @apiParam {Number} zip The zipcode to search.
* @apiParam {Number} [radius=10] The radius around the zipcode to search (in miles).
* @apiParam {String} [region=us] The region to search, cannot currently be changed.
* @apiParam {String} [callback] The name of the callback function.
*
* @apiExample Default example:
*     curl -X GET 'https://amiibro.herokuapp.com/api/amiibos/status?name=mario&zip=00000&radius=20'
*
* @apiExample Default callback example:
*     curl -X GET 'https://amiibro.herokuapp.com/api/amiibos/status?name=mario&zip=00000&radius=20&callback=foo'
*
* @apiSuccess (200 Success) {Object} retailers The retailers and their responses.
* @apiSuccess (200 Success) {Object} retailers.gamestop Gamestop response
* @apiSuccess (200 Success) {Object[]} retailers.gamestop.stores The list of stores that have the requested Amiibo.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.name The name of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.address The address of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.address2 The second part of the address of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.city The city of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.state The state of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.zipcode The zipcode of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.country The country of the Gamestop store, will always be US for Gamestop.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.phone The phone number of the Gamestop store.
* @apiSuccess (200 Success) {String} retailers.gamestop.stores.hours The posted hours of the Gamestop store, will always be null for Gamestop.
* @apiSuccess (200 Success) {Number} retailers.gamestop.stores.gmtOffset The offset of the hours in GMT, will always be null for Gamestop.
* @apiSuccess (200 Success) {Boolean} retailers.gamestop.stores.inStoreAvailability Whether of not the store is carrying the Amiibo, will always be true for Gamestop.
* @apiSuccess (200 Success) {Date} retailers.gamestop.stores.inStoreAvailabilityUpdateDate The last time the availability was updated, will always be null for Gamestop.
* @apiSuccess (200 Success) {Number} retailers.gamestop.stores.miles The miles away the store is from the zipcode given.
* @apiSuccess (200 Success) {Object} retailers.gamestop.item The item object, will always be null for Gamestop.
* @apiSuccess (200 Success) {Object} retailers.target Target response
* @apiSuccess (200 Success) {Object[]} retailers.target.stores The list of stores that have the requested Amiibo.
* @apiSuccess (200 Success) {String} retailers.target.stores.name The name of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.address The address of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.address2 The second part of the address of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.city The city of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.state The state of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.zipcode The zipcode of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.country The country of the Target store, will always be US for Target.
* @apiSuccess (200 Success) {String} retailers.target.stores.phone The phone number of the Target store.
* @apiSuccess (200 Success) {String} retailers.target.stores.hours The posted hours of the Target store, will always be null for Target.
* @apiSuccess (200 Success) {Number} retailers.target.stores.gmtOffset The offset of the hours in GMT, will always be null for Target.
* @apiSuccess (200 Success) {Boolean} retailers.target.stores.inStoreAvailability Whether of not the store is carrying the Amiibo.
* @apiSuccess (200 Success) {Date} retailers.target.stores.inStoreAvailabilityUpdateDate The last time the availability was updated, will always be null for Target.
* @apiSuccess (200 Success) {Number} retailers.target.stores.miles The miles away the store is from the zipcode given.
* @apiSuccess (200 Success) {Object} retailers.target.item The item object.
* @apiSuccess (200 Success) {String} retailers.target.item.id The DPCI identifier for Target.
* @apiSuccess (200 Success) {String} retailers.target.item.name The name of the product from Target's database.
* @apiSuccess (200 Success) {String} retailers.target.item.upc The UPC of the product from Target's database.
* @apiSuccess (200 Success) {String} retailers.target.item.image The image of the product from Target's database.
* @apiSuccess (200 Success) {Boolean} retailers.target.item.shipToStore Whether the product can be shipped to a store or not, will always be true for Target.
* @apiSuccess (200 Success) {Boolean} retailers.target.item.freeToShipToStore Whether the product can be shipped to a store for free or not, will always be true for Target.
* @apiSuccess (200 Success) {Boolean} retailers.target.item.availableOnline Whether the product is available for purchase online or not.
* @apiSuccess (200 Success) {String} retailers.target.item.productUrl The product URL which will lead to Target's website.
* @apiSuccess (200 Success) {String} retailers.target.item.addToCartUrl The add to cart URL which will lead to Target's website, will always be null for Target.
* @apiSuccess (200 Success) {String} retailers.target.item.mobileUrl The mobile URL which will lead to Target's website, will always be null for Target.
* @apiSuccess (200 Success) {Object} retailers.bestbuy Bestbuy response
* @apiSuccess (200 Success) {Object[]} retailers.bestbuy.stores The list of stores that have the requested Amiibo.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.name The name of the Bestbuy store.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.address The address of the Bestbuy store.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.address2 The second part of the address of the Bestbuy store, will always be null for Bestbuy.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.city The city of the Bestbuy store.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.state The state of the Bestbuy store.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.zipcode The zipcode of the Bestbuy store.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.country The country of the Bestbuy store, will always be US for Bestbuy.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.phone The phone number of the Bestbuy store.
* @apiSuccess (200 Success) {String} retailers.bestbuy.stores.hours The posted hours of the Bestbuy store.
* @apiSuccess (200 Success) {Number} retailers.bestbuy.stores.gmtOffset The offset of the hours in GMT.
* @apiSuccess (200 Success) {Boolean} retailers.bestbuy.stores.inStoreAvailability Whether of not the store is carrying the Amiibo.
* @apiSuccess (200 Success) {Date} retailers.bestbuy.stores.inStoreAvailabilityUpdateDate The last time the availability was updated.
* @apiSuccess (200 Success) {Number} retailers.bestbuy.stores.miles The miles away the store is from the zipcode given.
* @apiSuccess (200 Success) {Object} retailers.bestbuy.item The item object.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.id The SKU identifier for Bestbuy.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.name The name of the product from Bestbuy's database.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.upc The UPC of the product from Bestbuy's database.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.image The image of the product from Bestbuy's database.
* @apiSuccess (200 Success) {Boolean} retailers.bestbuy.item.shipToStore Whether the product can be shipped to a store or not.
* @apiSuccess (200 Success) {Boolean} retailers.bestbuy.item.freeToShipToStore Whether the product can be shipped to a store for free or not, will always be true for Bestbuy.
* @apiSuccess (200 Success) {Boolean} retailers.bestbuy.item.availableOnline Whether the product is available for purchase online or not.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.productUrl The product URL which will lead to Bestbuy's website.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.addToCartUrl The add to cart URL which will lead to Bestbuy's website.
* @apiSuccess (200 Success) {String} retailers.bestbuy.item.mobileUrl The mobile URL which will lead to Bestbuy's website.
* @apiSuccess (200 Success) {Object} retailers.amazon Amazon response
* @apiSuccess (200 Success) {Object[]} retailers.amazon.stores The list of stores that have the requested Amiibo, will always be null for Amazon.
* @apiSuccess (200 Success) {Object} retailers.amazon.item The item object.
* @apiSuccess (200 Success) {String} retailers.amazon.item.id The ASIN identifier for Amazon.
* @apiSuccess (200 Success) {String} retailers.amazon.item.name The name of the product from Amazon's database.
* @apiSuccess (200 Success) {String} retailers.amazon.item.upc The UPC of the product from Amazon's database.
* @apiSuccess (200 Success) {String} retailers.amazon.item.image The image of the product from Amazon's database.
* @apiSuccess (200 Success) {Boolean} retailers.amazon.item.shipToStore Whether the product can be shipped to a store or not, will always be null for Amazon.
* @apiSuccess (200 Success) {Boolean} retailers.amazon.item.freeToShipToStore Whether the product can be shipped to a store for free or not, will always be null for Amazon.
* @apiSuccess (200 Success) {Boolean} retailers.amazon.item.availableOnline Whether the product is available for purchase online or not.
* @apiSuccess (200 Success) {String} retailers.amazon.item.productUrl The product URL which will lead to Amazon's website.
* @apiSuccess (200 Success) {String} retailers.amazon.item.addToCartUrl The add to cart URL which will lead to Amazon's website, will always be null for Amazon.
* @apiSuccess (200 Success) {String} retailers.amazon.item.mobileUrl The mobile URL which will lead to Amazon's website, will always be null for Amazon.
* @apiSuccess (200 Success) {Object} retailers.walmart Walmart response
* @apiSuccess (200 Success) {Object[]} retailers.walmart.stores The list of stores that have the requested Amiibo, will always be null for Walmart.
* @apiSuccess (200 Success) {Object} retailers.walmart.item The item object.
* @apiSuccess (200 Success) {String} retailers.walmart.item.id The Item Id identifier for Walmart.
* @apiSuccess (200 Success) {String} retailers.walmart.item.name The name of the product from Walmart's database.
* @apiSuccess (200 Success) {String} retailers.walmart.item.upc The UPC of the product from Walmart's database.
* @apiSuccess (200 Success) {String} retailers.walmart.item.image The image of the product from Walmart's database.
* @apiSuccess (200 Success) {Boolean} retailers.walmart.item.shipToStore Whether the product can be shipped to a store or not.
* @apiSuccess (200 Success) {Boolean} retailers.walmart.item.freeToShipToStore Whether the product can be shipped to a store for free or not.
* @apiSuccess (200 Success) {Boolean} retailers.walmart.item.availableOnline Whether the product is available for purchase online or not.
* @apiSuccess (200 Success) {String} retailers.walmart.item.productUrl The product URL which will lead to Walmart's website.
* @apiSuccess (200 Success) {String} retailers.walmart.item.addToCartUrl The add to cart URL which will lead to Walmart's website.
* @apiSuccess (200 Success) {String} retailers.walmart.item.mobileUrl The mobile URL which will lead to Walmart's website, will always be null for Walmart.
* @apiSuccess (200 Success) {Object} retailers.toysrus ToysRUs response
* @apiSuccess (200 Success) {Object[]} retailers.toysrus.stores The list of stores that have the requested Amiibo.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.name The name of the ToysRUs store.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.address The address of the ToysRUs store.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.address2 The second part of the address of the ToysRUs store, will always be null for ToysRUs.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.city The city of the ToysRUs store.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.state The state of the ToysRUs store.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.zipcode The zipcode of the ToysRUs store.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.country The country of the ToysRUs store, will always be US for ToysRUs.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.phone The phone number of the ToysRUs store.
* @apiSuccess (200 Success) {String} retailers.toysrus.stores.hours The posted hours of the ToysRUs store.
* @apiSuccess (200 Success) {Number} retailers.toysrus.stores.gmtOffset The offset of the hours in GMT, will always be null for ToysRUs.
* @apiSuccess (200 Success) {Boolean} retailers.toysrus.stores.inStoreAvailability Whether of not the store is carrying the Amiibo.
* @apiSuccess (200 Success) {Date} retailers.toysrus.stores.inStoreAvailabilityUpdateDate The last time the availability was updated, will always be null for ToysRUs.
* @apiSuccess (200 Success) {Number} retailers.toysrus.stores.miles The miles away the store is from the zipcode given.
* @apiSuccess (200 Success) {Object} retailers.toysrus.item The item object, will always be null for ToysRUs.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {"gamestop":{"stores":[{"name":"Store Name","address":"1234 W Melon Rd","address2":"Ste 2121","city":"MyCity","state":"XX","zipcode":"00000","country":"US","phone":"(000) 000-0000","hours":null,"gmtOffset":null,"inStoreAvailability":true,"inStoreAvailabilityUpdateDate":null,"miles":"0.7"}],"item":null},"target":{"stores":[{"name":"Store Name","address":"1234 W Melon Rd","address2":"Ste 2122","city":"MyCity","state":"XX","zipcode":"00000","country":"US","phone":"(000) 000-0000","hours":null,"gmtOffset":null,"inStoreAvailability":true,"inStoreAvailabilityUpdateDate":null,"miles":"0.7"}],"item":{"id":"207-00-5001","name":"Nintendo Mario amiibo Figure","upc":"045496891657","image":"http://target.scene7.com/is/image/Target/16478081","shipToStore":true,"freeToShipToStore":true,"availableOnline":true,"productUrl":"http://www.target.com/p/nintendo-mario-amiibo-figure/-/A-16478081","addToCartUrl":null,"mobileUrl":null}},"bestbuy":{"stores":[{"name":"Store Name","address":"1234 W Melon Rd","address2":"Ste 2122","city":"MyCity","state":"XX","zipcode":"00000","country":"US","phone":"000-000-0000","hours":"Mon: 7am-12am; Tue: 7am-12am; Wed: 7am-6pm; Fri: 9am-11pm; Sat: 9am-11pm; Sun: 7am-11pm","gmtOffset":-5,"inStoreAvailability":true,"inStoreAvailabilityUpdateDate":"YYYY-MM-DDTHH:MM:SS"}],"item":{"id":8883001,"name":"amiibo Figure (Mario) - Nintendo Wii U","upc":"045496891657","image":"http://img.bbystatic.com/BestBuy_US/images/products/8883/8883001_sa.jpg","shipToStore":true,"freeToShipToStore":true,"availableOnline":true,"productUrl":"http://www.bestbuy.com/site/amiibo-figure-mario-nintendo-wii-u/8883001.p?id=1219375112983&skuId=8883001&cmp=RMX&ky=2h6WHx9l7ZVjFrm9i3MlM69RfOEkDVL9N","addToCartUrl":"http://www.bestbuy.com/site/olspage.jsp?id=pcmcat152200050035&type=category&cmp=RMX&ky=2h6WHx9l7ZVjFrm9i3MlM69RfOEkDVL9N&qvsids=8883001","mobileUrl":"http://m.bestbuy.com/r/1219375112983/8883001/"}},"amazon":{"item":{"id":"B00N4ABMG4","name":"Mario amiibo","image":"http://ecx.images-amazon.com/images/I/41ArRRNVFYL.jpg","shipToStore":null,"freeToShipToStore":null,"availableOnline":true,"productUrl":"http://www.amazon.com/Mario-amiibo-nintendo-wii-u/dp/B00N4ABMG4%3Fpsc%3D1%26SubscriptionId%3DAKIAIOVH3AYP4SZRUWPQ%26tag%3Dsp34hi34mafaf-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00N4ABMG4","addToCartUrl":null,"mobileUrl":null},"stores":[{"name":"Amazon.com","address":null,"address2":null,"city":null,"state":null,"zip":null,"phone":null,"hours":null,"gmtOffset":null,"inStoreAvailability":true,"inStoreAvailabilityUpdateDate":null,"miles":null}]},"walmart":{"item":{"id":40571988,"name":"Mario Amiibo (Wii U)","upc":"045496891657","image":"http://i.walmartimages.com/i/p/00/04/54/96/89/0004549689165_500X500.jpg","shipToStore":true,"freeToShipToStore":true,"availableOnline":true,"productUrl":"http://c.affil.walmart.com/t/api01?l=http%3A%2F%2Fwww.walmart.com%2Fip%2FMario-Amiibo-Wii-U%2F40571988%3Fveh%3Daff%26wmlspartner%3Dreadonlyapi&affp1=imPfTfr9KFbywGz_HP0uCX1pDLVyHvljE_mTPebYvBI","addToCartUrl":"http://c.affil.walmart.com/t/api01?l=http%3A%2F%2Fwww.walmart.com%2Fcatalog%2Fselect_product.gsp%3Fproduct_id%3D40571988%26add_to_cart%3D1%26qty%3D1%26veh%3Daff%26wmlspartner%3Dreadonlyapi&affp1=imPfTfr9KFbywGz_HP0uCX1pDLVyHvljE_mTPebYvBI","mobileUrl":null},"stores":null},"toysrus":{"stores":[{"name":"TOYS R US - MYCITY [0000]","address":"1234 WEST MELON ROAD","address2":null,"city":"MYCITY","state":"XX","zip":"00000","phone":"(000)000-0000","hours":"Monday : 6:00 AM - 2:00 AM Tuesday : 6:00 AM - 12:00 AM Wednesday : 12:00 AM - 9:00 PM Thursday : 12:00 AM - 12:00 AM Friday : 9:00 AM - 10:00 PM Saturday : 9:00 AM - 10:00 PM Sunday : 6:00 AM - 2:00 AM","gmtOffset":null,"inStoreAvailability":true,"inStoreAvailabilityUpdateDate":null,"miles":"3"}],"item":null}}
*
* @apiError (400 Bad Request) MissingName The Amiibo name was missing from the request
* @apiError (400 Bad Request) MissingZipcode The zipcode was missing from the request
* @apiError (400 Bad Request) InvalidName The Amiibo name provided was not one of the allowed names.
* @apiError (400 Bad Request) InvalidZipcode The zipcode provided was not 5 digits.
* @apiError (500 Internal Server Error) ServerError There was a problem getting the status of the Amiibo.
*
* @apiErrorExample Error-Response: (Missing Name)
*     HTTP/1.1 400 Bad Request
*     {"message":"Missing Amiibo name.","names":["mario","peach","yoshi","donkeyKong","link","fox","samus","wiiFitTrainer","villager","pikachu","kirby","marth","zelda","diddyKong","luigi","littleMac","captainFalcon","pit","rosalinaAndLuma","bowser","lucario","toonLink","sheik","kingDedede","ike","shulk","sonic","megaMan","metaknight"]}
*
* @apiErrorExample Error-Response: (Missing Zipcode)
*     HTTP/1.1 400 Bad Request
*     {"message":"Missing zipcode."}
*
* @apiErrorExample Error-Response: (Invalid Name)
*     HTTP/1.1 400 Bad Request
*     {"message":"Invalid Amiibo name.","names":["mario","peach","yoshi","donkeyKong","link","fox","samus","wiiFitTrainer","villager","pikachu","kirby","marth","zelda","diddyKong","luigi","littleMac","captainFalcon","pit","rosalinaAndLuma","bowser","lucario","toonLink","sheik","kingDedede","ike","shulk","sonic","megaMan","metaknight"]}
*
* @apiErrorExample Error-Response: (Invalid Zipcode)
*     HTTP/1.1 400 Bad Request
*     {"message":"Invalid zipcode, must be 5 digits and a US zipcode."}
*
* @apiErrorExample Error-Response: (Server Error)
*     HTTP/1.1 500 Internal Server Error
*     {"message":"Could not get status of [Walmart|Target|Bestbuy|Gamestop|Toys-R-Us|Amazon] data."}
*/