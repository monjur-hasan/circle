
# Circle

## Overview

Finding people with similar interestes to discuss a certain topic can be difficult. Circle is a web application which will address this problem, and streamline the process of bringing together people with shared interests. Users can easily search a topic, create new topics, and start a converstion anonymously.

## Data Model

The application will store Users, Topics and Comments.

* Topics can have multiple comments (by embedding)
* Each comment will have only one user.

An Example User:

```javascript
{
  username: "iamhungry",
  hash: // a password hash
}
```

An Example Topic with Embedded Comments:

```javascript
{
	title: string,
	description: string,
	comments: [Comment],
	username: string,
	createdAt: // timestamp
}
```

An example of comment:

```javascript
{
	description: string,
	username: string,
	createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/blob/master/circle/db.js) 

## Wireframes

/profile/john-doe - user profile showing all the threads with a link to the thread/topic

![](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/blob/master/images/Image-1.jpeg)

/topic/ait - showing a topic page with all the comments and option to add a new comment.

![](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/blob/master/images/Image-2.jpeg)

/new-topic - form to create a new topic

![](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/blob/master/images/Image-3.jpeg)

/search-result - page showing result of search

![](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/blob/master/images/Image-5.jpeg)


## Site map

![](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/blob/master/images/Image-6.jpeg)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new topic
4. as a user, I can view my activity log
5. as a user, I can add comments to a topic
6. as a user, I can search topics, and relevant results will be shown (based on thread title and description).

## Research Topics

* (2 points) I will use bootstrap throughout my site
* (3) I will use a new templating engine for rendering pages: ejs
* (3 points) Unit testing with JavaScript

8 points total out of 8 required points

## [Link to Initial Main Project File](https://github.com/nyu-csci-ua-0480-008-spring-2019/monjur-hasan-final-project/tree/master/circle) 

## Annotations / References Used

1. [Bootstrap Docs](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
2. [tutorial on ejs](https://ejs.co/#docs)
3. [Unit testing](https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/)
