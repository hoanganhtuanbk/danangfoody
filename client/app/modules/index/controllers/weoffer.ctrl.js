'use strict';
angular
    .module('com.module.index')
    .controller('weofferCtl', function($scope,$rootScope) {
       $scope.offerTitle = "Enjoying great food and wine is two of life's great pleasures and we sincerely hope that you experience both during your time with us ...today and always!";
        $scope.offerItem= [
            {
                title: 'WHERE',
                imgUrl: 'images/where.png',
                content: 'Embark on a journey to 5 different restaurants hidden throughout the city to sample 6-10 different authentic local dishes. These restaurants are famous by word of mouth amongst the locals, so you can hardly find them on your own.'
            },
            {
                title: 'WHAT',
                imgUrl: 'images/what.png',
                content: 'To experience Da Nang’s delicious food how the locals love them in a 3 hours. Delight your palate, immerse in new culture, make new friends, and create memories.'
            },
            {
                title: 'WHO',
                imgUrl: 'images/who.png',
                content: 'Local foody experts who speak your language (Chinese/Korean/English) taking you in a small group city-wide food tour to eat what the locals love to eat.'
            },
            {
                title: 'WHY',
                imgUrl: 'images/why.png',
                content: '“Food is a central activity of mankind and one of the single most significant trademarks of a culture.” – American Journalist/Writer Mark Kurlansky Escape the tourist traps, our food tours are designed to show you the raw, untainted cultural trademarks of Da Nang!'
            }
        ]
    });