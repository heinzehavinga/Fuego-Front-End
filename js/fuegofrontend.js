// The MIT License (MIT)
// 
// Copyright (c) 2013 Tubantia
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

$(function() {

	//navbar button actions
	$('.selectHours').click(function(event) {
		event.preventDefault();
		loadData(20, $(this).attr('data-hours'), true, true, false);
		$("#fuegocontent").html('<div class="col-lg-6 col-offset-3"><img src="img/loading.gif" /></div>;');
		$('.selectHours').removeClass("activeSelected");
		$(this).addClass("activeSelected");
	});

	loadData(20, 24, true, true, true);

	//Loading new data function, the last parameter is to let masonary know
	//To create an all new object or just reload
	function loadData(time, count, score, meta, reload) {
		//Laad nieuwe items
		$.getJSON('ajax/getitems.php', {
			fuegoHours : time,
			fuegoCount : count,
			fuegoScoring : score,
			fuegoMetadata : meta
		}, function(data) {

			html = "";
			if (!data) {
				html += 'The system didn\'t return any results, maybe you should select a different time scale';
			} else {

				$.each(data, function(index, value) {
					html += '<div class="col-lg-4 masonitem"><div class="masonitemcontent">';
					html += '<a href="' + value.url + '">';

					thumbnail = false;

					if (value.metadata.thumbnail_width != undefined || value.metadata.thumbnail_url != undefined) {
						if (value.metadata.thumbnail_width > 400) {
							thumbnail = true;

							html += '<img src="' + value.metadata.thumbnail_url + '" alt="' + value.metadata.title + '" />';
							html += '<div class="postmeta">';
							html += '<img class="favicon" src="' + value.metadata.provider_url + '/favicon.ico" alt="' + value.metadata.title + '" style="width:18px;" />';
							html += '<span class="provider">' + value.metadata.provider_name + ':</span> ' + value.metadata.title;
							html += '</div>';
						}
					}
					
					//If there's no thumbnail meta data, or it's to small use
					//the title instead
					if (!thumbnail) {
						html += '<div class="postmeta">';
						html += '<h3>' + value.metadata.title + '</h3>';
						html += '<img class="favicon" src="' + value.metadata.provider_url + '/favicon.ico" alt="' + value.metadata.title + '" style="width:18px;" />';
						html += '<span class="provider"> ' + value.metadata.provider_name + '</span>';
						html += '</div>';
					}

					html += '</a>';
					html += '<div class="tweetdetails">'
					html += '<div class="tweetpic"><img src="' + value.tw_profile_image_url + '" style="width:30px;" /></div>';
					html += '<div class="tweet">'
					html += '<p><a class="twitteraccount" href="' + value.tw_tweet_url + '" target="_blank">@' + value.tw_screen_name + ': </a>' + value.tw_text + '</p>';
					html += '</div></div></div></div>';
				});

				container = $('#fuegocontent');

				$("#fuegocontent").html("");

				if (reload) {
					$("#fuegocontent").append(html);
					container.imagesLoaded(function() {
						container.masonry({
							columnWidth : 200,
							itemSelector : '.masonitem'
						});
					});
					
					//The favicon is guessed right now, so if it's wrong
					//don't display it
					$(".favicon").error(function() {
						$(this).css("display", "none");
					});
					
				} else {
					container.append(html).masonry('reloadItems').masonry();
				}
			}
		});
	}

	function listAccounts(data) {
		$.each(data, function(index, value) {
		});
	}

}); 