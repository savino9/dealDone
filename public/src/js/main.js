$( document ).ready(function() {
	var vid = document.getElementById('video');

	$('#myBtn').click(function() {
		console.log(vid.paused); // true
		if (vid.paused == false) {
			$(vid).get(0).pause();
			$('#myBtn').html("Play");
		} else {
			$(vid).get(0).play();
			$('#myBtn').html("Pause");
		}
	});
});
