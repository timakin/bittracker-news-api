"use strict";

class News {
	constructor(props) {
		this.title 		= props.title;
        this.url 		= props.url;
        this.origin 	= props.origin;
        this.image_uri 	= props.image_uri;
        this.created_at = props.created_at;
	}

	toObject() {
		return {
			title: 		this.title,
	        url: 		this.url,
	        origin: 	this.origin,
	        image_uri: 	this.image_uri,
	        created_at: this.created_at
		};
	}
};

module.exports = News;