	var ogTitle = document.createElement('meta');
	var ogDesc = document.createElement('meta');
	fetch('https://jsonplaceholder.typicode.com/posts/1')
		.then(response => response.json())
		.then(
		json => {
		  	console.log(json)
		  	ogTitle.setAttribute('property', 'og:title')
		  	ogTitle.content = json.title
		  	ogDesc.setAttribute('property', 'og:description')
		  	ogDesc.content = json.body
		}
	)
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(ogTitle)
	head.appendChild(ogDesc)
	console.log(head);