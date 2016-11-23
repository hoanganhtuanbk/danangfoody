(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name loopbackApp
   * @description
   * # loopbackApp
   *
   * Main module of the application.
   */
  angular
    .module('loopbackApp', [
      'angular-loading-bar',
      'angular.filter',
      'angularBootstrapNavTree',
      'angularFileUpload',
      'stripe.checkout',
      'btford.markdown',
      'oitozero.ngSweetAlert',
      'config',
      'formly',
      'formlyBootstrap',
      'lbServices',
      'monospaced.elastic',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'ui.codemirror',
      'ui.gravatar',
      'ui.grid',
      'ui.router',
      'toasty',
      'autofields',
      'gettext',
      'angular-underscore/filters',
      'schemaForm',
      'ui.select',
      'com.module.core',
      'com.module.about',
      'com.module.files',
      'com.module.posts',
      'com.module.booking',
      'com.module.products',
      'com.module.sandbox',
      'com.module.settings',
      'com.module.users',
      'com.module.index',
      'pascalprecht.translate'
    ])
    .config(['$translateProvider', function ($translateProvider) {
      var translationsEN = {
        HEADER: {
          CALLUS: 'Call Us',
          MAIL: 'Mail',
          HOME: 'HOME',
          STORIES: '7 STORIES ',
          TOUR: 'TOUR',
          BOOKING: 'BOOKING NOW'
        },
        SLIDE: {
          DISHES: 'DISHES',
          STORIES: 'STORIES',
          DESCIPTION: 'DANANGS STORY BEGIN HERE',
          WALKING: 'WALKING',
          CYCLO: 'CYCLO',
          TAXI: 'TAXI',
          WPRICE: '25$/1 person',
          CPRICE: '35$/person',
          TPRICE: '45$/1 person'
        },
        INFO: {
          TITLE: 'FOODY STORY TOUR',
          DESCRIPTION: '(IN CHINESE/KOREAN/ENGLISH)',
          CONTENT1: 'Here is an interesting question: how many Vietnamese dishes do you think are out there? The answer is more than 3,000. Most people are amiliar with just a few, maybe Pho, Banh My and Salad Roll…',
          CONTENT2: 'Did you know many Vietnamese cuisines include five fundamental tastes to representing the Five Elements (Wu Xing) of Balance in ancient Asian astrology and philosophy? Spiciness represents metal, sourness for wood, bitterness symbolizes fire, saltiness signifies water, and sweetness is for Earth.',
          CONTENT3: 'If your palate desires a true local foody adventure instead of settling for the “tourist food” at restaurants reviewed on travel websites by other tourists; If your curiosity craves for a deeper and immersed experience about history, culture, and the people of Vietnam, then the FOODY STORY TOUR is the tour designed for you. In this 4-hour tour, our local foody ambassador will showcase to you 7 dishes, and the 7 stories behind them.',
          PS: 'THE STORY BEGINS HERE...'
        },
        TOUR: {
          WCONTENT: 'Our signature FOODY STORY TOUR for those who are not afraid to put some mileage on their flip flops, who wish to walk off some extra calories from indulging in the 7 sinfully delicious dishes.',

          CCONTENT: 'How about a piece of Vietnamese history and some interesting photo ops while enjoying your FOODY STORY TOUR ? Cyclo is a three-wheeled bicycle taxi that will bring you back to the French colonial times. You will enjoy the tour in a truly colonial fashion',

          TCONTENT: 'Have a group of friends or your hotel is far from the city center? FOODY STORY TOUR by taxi offers door-to-door pickup and drop off service for those who desire comfort while enjoying the show.',
          BTN: 'BOOKING'
        }
      };
      var translationsKR = {
        HEADER: {
          CALLUS: '연락처',
          MAIL: '이메일',
          HOME: 'HOME',
          STORIES: '7 가지 이야기',
          TOUR: 'TOUR',
          BOOKING: '예약'
        },
        SLIDE: {
          DISHES: '가지 음식과',
          STORIES: '가지 이야기',
          DESCIPTION: '다낭의 이야기는 여기서 시작됩니다...',
          WALKING: '도보',
          CYCLO: '모터 사이클',
          TAXI: '택시',
          WPRICE: '25$/사람',
          CPRICE: '35$/사람',
          TPRICE: '45$/사람'
        },
        INFO: {
          TITLE: 'FOODY STORY TOUR',
          DESCRIPTION: '(중국어/한국어/영어)',

          CONTENT1: '여기 흥미로운 질문이 하나 있습니다 : 베트남음식이 얼마나 많다고 생각하시나요? 답은 3,000가지 이상입니다. 여러분들께서는 쌀국수, 반마이, 월남쌈과 같은 몇 가지 음식들만 접해 보셨을 겁니다.',
          CONTENT2: '베트남 음식들이 고대 아시아의 철학과 점성술을 대표하는 다섯가지 균형요소의 맛을 나타낸다는 것을 알고 계신 가요? 향신료를 넣는 것은 금속을, 신맛은 나무를, 쓴맛은 불을, 짠맛은 물을, 단 맛은 지구를 나타낸답니다.',
          CONTENT3: '만약 여러분들께서 여행사사이트에 나와있는 레스토랑의 흔한 ‘여행객 음식’을 맛보는 대신에 실제 현지 음식을 경험해보고 싶으시다면, 또한, 베트남의 역사, 문화, 그리고 사람들에 대한 보다 자세한 경험을 하고 싶으시다면, FOODY STORY TOUR가 바로 여러분을 위한 투어입니다. 투어의 소요시간은 4시간이며 베트남 현지 식품대사가 여러분들께 7가지의 음식을 소개 시켜 드리고 그에 따른 이야기를 들려드릴 것입니다.',
          PS: '이야기의 내용은 이렇습니다...'
        },
        TOUR: {
          WCONTENT: '저희 FOODY STORY TOUR는 어떠한 식재료나 조리법에도 거부를 표하시지 않으시며 해당음식을 드신 후에는 높은 칼로리를 소모 시키기 위해 걸어 다니시는 것을 선호하시는 분들께 추천합니다.',

          CCONTENT: 'FOODY STORY TOUR와 베트남 문화, 사진촬영까지 동시에 즐기는 건 어떠 세요? CYCLO는 여러분을 베트남이 프랑스의 식민지였던 때로 이동시켜줄 삼륜 모터 사이클입니다. 여러분은 베트남 사람들이 식민지배 시절에 어떻게 생활하였는지 그대로 느낄 수 있습니다. (호텔 왕복 교통편은 포함되지 않습니다)',

          TCONTENT: '그룹이나 친구가 있으세요? 호텔이 도심에서 멀리 떨어져 있나요? FOODY STORY TOUR는 여러분들의 편의를 위해 택시로 출발지에서 도착지까지 태워드리고 내려드리는 서비스를 제공합니다.',
          BTN: '예약'

        }
      };
      var translationsCN = {
        HEADER: {
          CALLUS: '联系我们',
          MAIL: '邮件',
          HOME: '主页',
          STORIES: ' 7 个故事',
          TOUR: '游览',
          BOOKING: '预订'
        },
        SLIDE: {
          DISHES: '道佳肴',
          STORIES: '个故事',
          DESCIPTION: '岘港的故事从这里说起...',
          WALKING: '步行',
          CYCLO: ' CYCLO',
          TAXI: ' 出租车',
          WPRICE: '25美元/人',
          CPRICE: '35美元/人',
          TPRICE: '45美元/人'
        },
        INFO: {
          TITLE: '岘港美食家的故事”之旅',
          DESCRIPTION: '(英文/中文/韩语)',
          CONTENT1: '一个有趣的问题：请猜猜越南一共有多少道美味佳肴？答案是3000多种。不过，大多数游客可能只熟悉其中的几道： 比如越南河粉，越式法国面包，和沙拉卷等...',
          CONTENT2: '大部分越南美食包涵着五个基本口味，分别代表着五行中的金、木、水、火、土：辣味代表金，酸味意味着木，咸味表示水，苦味象征火， 而甜味则是土.',
          CONTENT3: '“岘港美食家的故事” 将带您拜访旅游网上找不到但却深受本地人喜爱的餐厅。通过四个小时的游历，在当地美食大使的带领下，通过7道美食和7个故事，替您揭开越南岘港的面纱，带您进入其真实的历史、文化和传统。 让我们从美食开始一段有趣有意义的旅程吧！',
          PS: '故事从这里说起...'
        },
        TOUR: {
          WCONTENT: '“岘港美食家的故事”之旅步行版让您享受口腹的满足，陶醉于其美妙的文化，同时又通过散步让您完全不必担心这些绝对值得添加的卡路里.',

          CCONTENT: 'Cyclo是一种三轮自行车，是法国殖民时代发明的交通工具。在您享受““岘港美食家的故事”之旅的同时，可以选择Cyclo来更深一步地体会越南殖民时代的历史，再拍下一些有趣的照片为您的旅程留下难忘的回忆。来一次有历史性又时尚的游历吧（不包括酒店接送，需要在市中心集合）',

          TCONTENT: '您有几个朋友或者您居住的酒店远离市中心吗？不必担心，“岘港美食家的故事”之旅出租车版提供上门接送服务，让您可以更轻松舒适享受这次旅程。',
          BTN: '预订'
        }
      };
      // add translation tables
      $translateProvider.translations('en', translationsEN);
      $translateProvider.translations('kr', translationsKR);
      $translateProvider.translations('ch', translationsCN);

      $translateProvider.preferredLanguage('en');
    }])
    .run(function ($rootScope, $cookies, gettextCatalog) {

      $rootScope.locales = {
        'de': {
          lang: 'de',
          country: 'DE',
          name: gettextCatalog.getString('German')
        },
        'en': {
          lang: 'en',
          country: 'US',
          name: gettextCatalog.getString('English')
        },
        'es_MX': {
          lang: 'es_MX',
          country: 'MX',
          name: gettextCatalog.getString('Spanish')
        },
        'fr': {
          lang: 'fr',
          country: 'FR',
          name: gettextCatalog.getString('Français')
        },
        'nl': {
          lang: 'nl',
          country: 'NL',
          name: gettextCatalog.getString('Dutch')
        },
        'pt-BR': {
          lang: 'pt_BR',
          country: 'BR',
          name: gettextCatalog.getString('Portuguese Brazil')
        },
        'ru_RU': {
          lang: 'ru_RU',
          country: 'RU',
          name: gettextCatalog.getString('Russian')
        },
        'zh_CN': {
          lang: 'zh_CN',
          country: 'CN',
          name: gettextCatalog.getString('Chinese')
        }
      };

      var lang = $cookies.lang || navigator.language || navigator.userLanguage;

      $rootScope.locale = $rootScope.locales[lang];

      if (angular.isUndefined($rootScope.locale)) {
        $rootScope.locale = $rootScope.locales[lang];
        if (angular.isUndefined($rootScope.locale)) {
          $rootScope.locale = $rootScope.locales['en'];
        }
      }

      gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

    })
    .run(function (formlyConfig) {
      /*
       ngModelAttrs stuff
       */
      var ngModelAttrs = {};

      function camelize(string) {
        string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
          return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function (match, chr) {
          return chr ? chr.toLowerCase() : '';
        });
      }

      /*
       timepicker
       */
      ngModelAttrs = {};

      // attributes
      angular.forEach([
        'meridians',
        'readonly-input',
        'mousewheel',
        'arrowkeys'
      ], function (attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
      });

      // bindings
      angular.forEach([
        'hour-step',
        'minute-step',
        'show-meridian'
      ], function (binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
      });

      formlyConfig.setType({
        name: 'timepicker',
        template: '<timepicker ng-model="model[options.key]"></timepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            timepickerOptions: {}
          }
        }
      });

      formlyConfig.setType({
        name: 'datepicker',
        template: '<datepicker ng-model="model[options.key]" ></datepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            datepickerOptions: {}
          }
        }
      });

    });

//  change language

})();
