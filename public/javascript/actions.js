function deleteOneReview(id) {
	var review = document.getElementById(id);
	var myRequest = new XMLHttpRequest();
	myRequest.onreadystatechange = function(id) {
		if(myRequest.readyState == 4 && myRequest.status == 204) {
			review.remove();
		}
	}
	myRequest.open('DELETE', '/reviews/'+id);
	myRequest.send();
	location.reload();
}