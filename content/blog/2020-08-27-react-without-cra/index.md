---
title: "React from without create-react-app"
date: "2020-08-27"
published: true
---

One of the best things about working with React is the ease of launching a new application thanks to Facebook's `create-react-app`. `create-react-app` builds everything you need for a modern React web application out of the box with a single terminal command. As great as this tool is, there are a couple small drawbacks I've encountered so far. The first is that I usually spend a bit of time removing boilerplate code and arraging things to my liking, and the second, more substaintial issue is that while `create-react-app` is great for stepping right in to start using React, I wanted to zoom in and understand what is happening at a lower level.

While I will definitely continue to use `create-react-app` as my main React tool, I decided to learn to build a React app from the ground up with the added bonus of being published to `npm` and downloadable via `npx @nbaugh1/scratch-react <APP NAME>`. I referenced a number of articles to learn how to do this to see if there is any variation in the process, but it looked to be pretty straight forward. The main source that I used was the <a href="https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658">article</a> linked from the offical React docs.

Creating this app first requires creating the template `index.html` file that will be used to render the webpage of the application. The first important thing particular to our React application is a `<div>` with an `id` equal to `root`, which we will later use to tell React where to insert elements into the DOM. `<div id="root"></div>` is how this line looks.
