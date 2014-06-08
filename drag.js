(function($) {
	$(function() {
		var el = $('.dropHere');
		var imgBox = $('.img-box');
		//prevent Default behavior
		$(window).on("dragenter dragover drop", function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		el.on("dragover", function(e) {
			e.originalEvent.dataTransfer.dropEffect = "copy";
		});
		el.on("drop", function(e) {
			var files = e.originalEvent.dataTransfer.files;
			var length = files.length;
			var fData = new FormData();
			var fileKey = 0;
			while(length--) {
				if (files[length].type.match(/^image.*/)){
					reader = new FileReader();

					reader.onload = function(e) {
						var data = e.target.result;
						imgBox.append($('<img />').addClass('img').attr('src', data) );
					};
					
					reader.readAsDataURL(files[length]);
					fData.append(fileKey, files[length], files[length].name);
					fileKey++;
				} else {
					$(".prompt").empty().text(files[length].name + " isn't a image. ");
				}
			}
			if(fileKey){
				$(".prompt").empty();
				el.after($("<button />").addClass('up-btn').text('upload'));
				$('body').on('click', '.up-btn', fData, function(e) {
					$.ajax("/upload", {
						type: "POST",
						data: fData,
						processData: false,
						contentType: false
					}).
					done(function(data) {
						$(".up-btn").remove();
						$(".prompt").empty().text(data);
					});		
				});
			}			
			
		});

	});
})(jQuery);