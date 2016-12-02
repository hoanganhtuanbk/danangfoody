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
      'pascalprecht.translate',
      'tmh.dynamicLocale'
    ])
    .config(function (tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('fonts/i18n/angular-locale_{{locale}}.js');
    })
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
          DESCIPTION: "DANANG'S STORY BEGIN HERE",
          WALKING: 'WALKING',
          CYCLO: 'CYCLO',
          TAXI: 'TAXI',
          WPRICE: '$30/person',
          CPRICE: '$40/person',
          TPRICE: '$45/person'
        },
        INFO: {
          TITLE: 'FOODY STORY TOUR',
          DESCRIPTION: '( IN CHINESE/KOREAN/ENGLISH )',
          CONTENT2: 'Did you know many Vietnamese cuisines include five fundamental tastes to representing the Five Elements (Wu Xing) of Balance in ancient Asian astrology and philosophy? Spiciness represents metal, sourness for wood, bitterness symbolizes fire, saltiness signifies water, and sweetness is for Earth.',
          CONTENT3: 'If your palate desires a true local foody adventure instead of settling for the “tourist food” at restaurants reviewed on travel websites by other tourists; If your curiosity craves for a deeper and immersed experience about history, culture, and the people of Vietnam, then the <strong>FOODY STORY TOUR</strong> is the tour designed for you. In this 3-hour tour, our local foody ambassador will showcase to you 7 dishes, and the 7 stories behind them.',
          PS: 'THE STORY BEGINS HERE...'
        },
        TOUR: {
          WCONTENT: 'Our signature <strong>FOODY STORY TOUR</strong> for those who are not afraid to put some mileage on their flip flops, who wish to walk off some extra calories from indulging in the 7 sinfully delicious dishes.',

          CCONTENT: 'How about a piece of Vietnamese history and some interesting photo ops while enjoying your <strong>FOODY STORY TOUR</strong>? Cyclo is a three-wheeled bicycle taxi that will bring you back to the French colonial times. You will enjoy the tour in a truly colonial fashion.',

          TCONTENT: 'Have a group of friends or your hotel is far from the city center? <strong>FOODY STORY TOUR</strong> by taxi offers door-to-door pickup and drop off service for those who desire comfort while enjoying the show.',
          BTN: 'Booking',
          WPRICE: '$30',
          CPRICE: '$40',
          TPRICE: '$45',
          PERSON: 'PERSON'
        },

        DISHES: {
          DES1: 'Same Same But Different. What Makes You Different?...',
          DES2: 'A Romance between East and West...',
          DES3: 'To capture a man’s heart is through his stomach...',
          DES4: 'A piece of Cham...',
          DES5: 'Every man can be a King, Every woman can be a Queen...',
          DES6: 'Happiness belongs to the self-sufficient...',
          DES7: 'Good Things Come to Those Who Wait...'
        },
        MODAL: {

          DAY: 'CHOOSE A DAY',
          SELECTTIME: 'SELECT A TIME',
          TIME1: '10:00AM-1:00PM',
          TIME2: '5:00PM-8:00PM',
          TRANSPORT: 'TRANSPORT TYPE',
          TICKET: 'HOW MANY TICKET YOU WILL NEED.',
          PRICE: 'Total price: ',
          CURRENCY: '$',
          STEP: 'Step',
          OF: 'of',
          CONTINUE: 'Continue',
          BILLING: 'BILLING INFORMATION',
          PNAME: "Purchaser's name",
          ADDRESS: 'Address',
          COUNTRY: 'Country',
          CITY: 'City',
          EMAIL: 'Email',
          DEMAIL: '(Your Ticket will be sent here)',
          CEMAIL: 'Confirm email',
          PHONE: 'Cell Phone',
          CODE: 'Zip/Postal Code',
          DPHONE: '(In Case of Emergency)',
          HELP1: 'To help us serve you better, please tell us more about your party.',
          HELP2: 'If you don’t have some names or email addresses, no problem. Your tickets will still be valid for entry.',
          BACK: 'Back',
          FINISH: 'Finish',
          METHOD: 'PAYMENT DETAIL',
          ALIPAY: 'Alipay account',
          STRIPE: 'Stripe credit card',
          PAYPAL: 'Paypal account',
          PARTY: 'Your Party',
          GNAME: 'Guest Names:',
          GEMAIL: 'Email Addresses:',
          FINALMEG: 'Click finish to start payment.\n Thank you for using our service',
          DETAIL: 'PAYMENT DETAIL',
          CARDNAME: 'Cardholder name',
          CARDNUM: 'Card number',
          EXPIRY: 'Expiry',
          CVV: 'CVV',
          WALKING: 'Walking',
          CYCLO: 'Cyclo',
          TAXI: 'Taxi'

        },
        STORIES: {

          DAY: 'CHOOSE A DAY',
          SELECTTIME: 'SELECT A TIME',
          TIME1: '10:00AM-1:00PM',
          TIME2: '5:00PM-8:00PM',
          TRANSPORT: 'TRANSPORT TYPE',
          TICKET: 'HOW MANY TICKET YOU WILL NEED.',
          PRICE: 'Total price: ',
          CURRENCY: '$',
          STEP: 'Step',
          OF: 'of',
          CONTINUE: 'Continue',
          BILLING: 'BILLING INFORMATION',
          PNAME: "Purchaser's name",
          ADDRESS: 'Address',
          COUNTRY: 'Country',
          CITY: 'City',
          EMAIL: 'Email',
          DEMAIL: '(Your Ticket will be sent here)',
          CEMAIL: 'Confirm email',
          PHONE: 'Cell Phone',
          CODE: 'Zip/Postal Code',
          DPHONE: '(In Case of Emergency)',
          HELP1: 'To help us serve you better, please tell us more about your party.',
          HELP2: 'If you don’t have some names or email addresses, no problem. Your tickets will still be valid for entry.',
          BACK: 'Back',
          FINISH: 'Finish',
          METHOD: 'PAYMENT DETAIL',
          ALIPAY: 'Alipay account',
          STRIPE: 'Stripe credit card',
          PAYPAL: 'Paypal account',
          PARTY: 'Your Party',
          GNAME: 'Guest Names:',
          GEMAIL: 'Email Addresses:',
          FINALMEG: 'Click finish to start payment.\n Thank you for using our service',
          DETAIL: 'PAYMENT DETAIL',
          CARDNAME: 'Cardholder name',
          CARDNUM: 'Card number',
          EXPIRY: 'Expiry',
          CVV: 'CVV',
          WALKING: 'Walking',
          CYCLO: 'Cyclo',
          TAXI: 'Taxi'

        }

      };
      var translationsKR = {
        HEADER: {
          CALLUS: '전화 주세요',
          MAIL: '이메일',
          HOME: '거주지',
          STORIES: '7 가지 이야기',
          TOUR: '여행',
          BOOKING: '지금 예약하세요'
        },
        SLIDE: {
          DISHES: '가지 음식과',
          STORIES: '가지 이야기',
          DESCIPTION: '다낭의 이야기는 이렇게 시작합니다',
          WALKING: '도보',
          CYCLO: '오토바이 택시',
          TAXI: '택시',
          WPRICE: '$30/명당',
          CPRICE: '$40/명당',
          TPRICE: '$45/명당'
        },
        INFO: {
          TITLE: '음식과 함께 하는 여행',
          DESCRIPTION: '( 중국어/한국어/영어로 진행 )',
          CONTENT2: '베트남 음식들이 고대 아시아의 철학과 점성술을 대표하는 다섯가지 균형요소의 맛을 나타낸다는 것을 알고 계신 가요? 향신료를 넣는 것은 금속을, 신맛은 나무를, 쓴맛은 불을, 짠맛은 물을, 단 맛은 지구를 나타낸답니다.',
          CONTENT3: '만약 여러분들께서 여행사사이트에 나와있는 레스토랑의 흔한 ‘여행객 음식’을 맛보는 대신에 실제 현지 음식을 경험해보고 싶으시다면, 또한, 베트남의 역사, 문화, 그리고 사람들에 대한 보다 자세한 경험을 하고 싶으시다면, <strong>FOODY STORY TOUR</strong>가 바로 여러분을 위한 투어입니다. 투어의 소요시간은 3시간이며 베트남 현지 식품대사가 여러분들께 7가지의 음식을 소개 시켜 드리고 그에 따른 이야기를 들려드릴 것입니다.',
          PS: '이야기의 내용은 이렇습니다...'
        },
        TOUR: {
          WCONTENT: '저희 <strong>FOODY STORY TOUR</strong> 는 어떠한 식재료나 조리법에도 거부를 표하시지 않으시며 해당음식을 드신 후에는 높은 칼로리를 소모 시키기 위해 걸어 다니시는 것을 선호하시는 분들께 추천합니다.',

          CCONTENT: '<strong>FOODY STORY TOUR</strong> 와 베트남 문화, 사진촬영까지 동시에 즐기는 건 어떠 세요? 오토바이 택시는 여러분을 베트남이 프랑스의 식민지였던 때로 이동시켜줄 3륜 택시 입니다. 여러분은 베트남 사람들이 식민지배 시절에 어떻게 생활하였는지 그대로 느낄 수 있습니다.',

          TCONTENT: '그룹이나 친구가 있으세요? 호텔이 도심에서 멀리 떨어져 있나요? <strong>FOODY STORY TOUR</strong> 는 여러분들의 편의를 위해 택시로 출발지에서 도착지까지 태워드리고 내려드리는 서비스를 제공합니다.',
          BTN: '지금 예약하세요',
          WPRICE: '$30',
          CPRICE: '$40',
          TPRICE: '$45',
          PERSON: '명당'

        },
        DISHES: {
          DES1: '비슷비슷하면서 다른. 어떤 것이 여러분을 다르게 만드나요?...',
          DES2: '동양과 서양의 시간을 초월한 로맨스...',
          DES3: '남자의 마음을 사로잡는 법은 맛있는 음식을 제공하는 것...',
          DES4: '참족의 놀라운 이야기...',
          DES5: '누구든지 왕이 되어볼 수 있고 또한 여왕도 되어 볼 수 있습니다...',
          DES6: '행복이라는 것은 곧 자립하는 것 입니다...',
          DES7: '좋은 일은 기다릴 줄 아는 사람에게 온답니다...'
        },
        MODAL: {

          DAY: '날짜를 선택하세요',
          SELECTTIME: '시간을 선택하세요',
          TIME1: '10:00AM-1:00PM',
          TIME2: '5:00PM-8:00PM',
          TRANSPORT: '이동 수단을 선택하세요',
          TICKET: '몇 개의 티켓이 필요하신가요?',
          PRICE: '총 가격: ',
          CURRENCY: '$',
          STEP: '',
          OF: '/',
          CONTINUE: '계속',
          BILLING: '청구서 내역',
          PNAME: "구매자 성함",
          ADDRESS: '주소',
          COUNTRY: '국가',
          CITY: '도시',
          EMAIL: '이메일 주소',
          DEMAIL: '(티켓을 보내드릴 주소입니다)',
          CEMAIL: '일메일 주소 확인',
          PHONE: '비상 연락처',
          CODE: '우편번호',
          DPHONE: '',
          HELP1: '더 나은 서비스 제공을 위해, 여러분의 단체에 대하여 알려주세요!',
          HELP2: '성함이나 이메일 주소를 기재하지 않으셔도 괜찮습니다. 티켓은 현장 수령도 가능합니다.',
          BACK: '뒤로가기',
          FINISH: '완료',
          METHOD: '지불 방식',
          ALIPAY: 'Alipay account',
          STRIPE: 'Stripe credit card',
          PAYPAL: 'Paypal account',
          PARTY: '단체',
          GNAME: '투숙객 이름:',
          GEMAIL: '이메일 주소:',
          FINALMEG: '지불을 완료하기 위해 눌러주세요. 이용해 주셔서 감사합니다. ',
          DETAIL: '구매내역',
          CARDNAME: '카드소지자 이름',
          CARDNUM: '카드 번호',
          EXPIRY: '만료일',
          CVV: 'CVV',
          WALKING: '도보',
          CYCLO: '오토바이 택시',
          TAXI: '택시'
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
          DESCIPTION: '岘港的故事从这里说起',
          WALKING: '步行',
          CYCLO: ' 三轮车',
          TAXI: ' 出租车',
          WPRICE: '30美元/人',
          CPRICE: '40美元/人',
          TPRICE: '45美元/人'
        },
        INFO: {
          TITLE: "''岘港美食家的故事''之旅",
          DESCRIPTION: '( 英文/中文/韩语 )',
          CONTENT2: '大部分越南美食包涵着五个基本口味，分别代表着五行中的金、木、水、火、土：辣味代表金，酸味意味着木，咸味表示水，苦味象征火， 而甜味则是土.',
          CONTENT3: '“<strong>岘港美食家的故事</strong>” 将带您拜访旅游网上找不到但却深受本地人喜爱的餐厅。通过三个小时的游“<strong>岘港美食家的故事</strong>”之旅历，在当地美食大使的带领下，通过7道美食和7个故事，替您揭开越南岘港的面纱，带您进入其真实的历史、文化和传统。 让我们从美食开始一段有趣有意义的旅程吧！',
          PS: '故事从这里说起...'
        },
        TOUR: {
          WCONTENT: '“<strong>岘港美食家的故事</strong>”之旅步行版让您享受口腹的满足，陶醉于其美妙的文化，同时又通过散步让您完全不必担心这些绝对值得添加的卡路里.',

          CCONTENT: '三轮车是一种三轮自行车，是法国殖民时代发明的交通工具。在您享受“<strong>岘港美食家的故事</strong>”之旅的同时，可以选择三轮车来更深一步地体会越南殖民时代的历史，再拍下一些有趣的照片为您的旅程留下难忘的回忆。来一次有历史性又时尚的游历吧（不包括酒店接送，需要在市中心集合）.',

          TCONTENT: '您有几个朋友或者您居住的酒店远离市中心吗？ 不必担心，“<strong>岘港美食家的故事</strong>”之旅出租车版提供上门接送服务，让您可以更轻松舒适享受这次旅程.',
          BTN: '预订',
          WPRICE: '30美元',
          CPRICE: '40美元',
          TPRICE: '45美元',
          PERSON: '人'
        },
        DISHES: {
          DES1: '相同但不同, 是什么让你与众不同?...',
          DES2: '一段穿越时间的东西方浪漫...',
          DES3: '抓住男人的心先要抓住男人胃...',
          DES4: '一小片占族的历史...',
          DES5: '每个男人都可以是一个国王，每个女人都可以是皇后...',
          DES6: '幸福在于自给自足...',
          DES7: '好吃多磨...'
        },
        MODAL: {
          DAY: '选择日期',
          SELECTTIME: '选择时间',
          TIME1: '10:00AM-1:00PM',
          TIME2: '5:00PM-8:00PM',
          TRANSPORT: '版本选择',
          TICKET: '人数.',
          PRICE: '总额: ',
          CURRENCY: '$',
          STEP: '',
          OF: '/',
          CONTINUE: '继续',
          BILLING: '付费人信息',
          PNAME: "姓名",
          ADDRESS: '住址',
          COUNTRY: '国家',
          CITY: '城市',
          CODE: '邮政编码',
          EMAIL: '电邮',
          DEMAIL: '（订购票将发送到这个邮址）',
          CEMAIL: '确认电邮',
          PHONE: '手机号',
          DPHONE: '（紧急联系方式）',
          HELP1: '为了帮助我们更好地为您服务，请告诉我们更多关于您的团队.',
          HELP2: '如果你没有所有参加人名字和邮址，没有问题，您的票将仍然有效.',
          BACK: '上一步',
          FINISH: '完成',
          METHOD: '付款方式',
          ALIPAY: '支付宝',
          STRIPE: '信用卡 (Stripe)',
          PAYPAL: 'Paypal',
          PARTY: '您的团队',
          GNAME: '参加者姓名:',
          GEMAIL: '电邮:',
          FINALMEG: '点击完成即可完成付款.\n 谢谢选择我们的服务.',
          DETAIL: '付款详情',
          CARDNAME: '持卡人姓名',
          CARDNUM: '信用卡号码',
          EXPIRY: '到期日',
          CVV: '信用卡验证码 (CVV)',
          WALKING: '步行',
          CYCLO: '三轮车',
          TAXI: '出租车'

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
