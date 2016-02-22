'use strict';

var Observable = require("data/observable").Observable;
var dataProvider = require("../dataProviders/everlive");
var enums = require("ui/enums");

function NewDeal() {
    var currentTime = new Date();

    var viewModel = new Observable({
        title: "",
        description: "",
        day: currentTime.getDate(),
        month: currentTime.getMonth()+1,
        year: currentTime.getFullYear(),
        picture: "",
        pictureUrl: "",
        regularPrice: 0,
        promoPrice: 0,
        hotRating: 0,
        coldRating: 0,
        realReportsCount: 0,
        fakeReportsCount: 0,
        isLoading: false
    });

    viewModel.addItem = function() {
        return new Promise(function(resolve, reject) {
            viewModel.isLoading = true;

            var file = {
                "Filename": Math.random().toString(36).substring(2, 15) + ".jpg",
                "ContentType": "image/jpeg",
                "base64": viewModel.get('picture').toBase64String(enums.ImageFormat.jpeg, 100)
            };

            dataProvider.Files.create(file,
                function(data) {
                    viewModel.set('pictureUrl', data.result.Uri);
                    console.log(viewModel.get('pictureUrl'));
                    console.log(JSON.stringify(data));

                    var table = dataProvider.data('Deals');
                    table.create({
                            'Title': viewModel.get("title"),
                            'Description': viewModel.get("description"),
                            'ValidUntil': new Date(viewModel.get("year"), viewModel.get("month"), viewModel.get("day")),
                            'PictureUrl': viewModel.get('pictureUrl'),
                            'RegularPrice': viewModel.get('regularPrice'),
                            'PromoPrice': viewModel.get('promoPrice'),
                            'HotRating': viewModel.get('hotRating'),
                            'ColdRating': viewModel.get('coldRating'),
                            'RealReportsCount': viewModel.get('realReportsCount'),
                            'FakeReportsCount': viewModel.get('fakeReportsCount')
                        },
                        function(data) {
                            viewModel.isLoading = false;

                            //clear the fields after success
                            viewModel.set('title', '');
                            viewModel.set('description', '');
                            viewModel.set('day', '');
                            viewModel.set('month', '');
                            viewModel.set('year', '');
                            viewModel.set('pictureUrl', '');
                            viewModel.set('regularPrice', '');
                            viewModel.set('promoPrice', '');
                            viewModel.set('hotRating', '');
                            viewModel.set('coldRating', '');
                            viewModel.set('realReportsCount', '');
                            viewModel.set('fakeReportsCount', '');
                            resolve();
                        },
                        function(error) {
                            viewModel.isLoading = false;
                            reject(error.message);
                        });


                },
                function(error) {
                    console.log(JSON.stringify(error));
                    viewModel.isLoading = false;
                });

            console.log(viewModel.get("title"));
            console.log(viewModel.get("description"));


        });
    };

    return viewModel;
}

module.exports = NewDeal;