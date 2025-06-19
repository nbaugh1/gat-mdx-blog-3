3:I[4707,[],""]
5:I[6423,[],""]
6:I[2972,["972","static/chunks/972-fe008c56cc430895.js","931","static/chunks/app/page-536f575daef6a041.js"],""]
4:["slug","2020-09-10-react-without-cra","d"]
0:["FGJzCzu0zyJo5OttkLQvH",[[["",{"children":["blog",{"children":[["slug","2020-09-10-react-without-cra","d"],{"children":["__PAGE__?{\"slug\":\"2020-09-10-react-without-cra\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["blog",{"children":[["slug","2020-09-10-react-without-cra","d"],{"children":["__PAGE__",{},[["$L1","$L2",null],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/2ba819eb02ab4417.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":["$","body",null,{"className":"__className_e8ce0c","children":["$","div",null,{"className":"min-h-screen bg-white","children":[["$","header",null,{"className":"border-b border-gray-200","children":["$","div",null,{"className":"max-w-4xl mx-auto px-4 py-6","children":["$","div",null,{"className":"flex items-center justify-between","children":["$","div",null,{"children":[["$","h1",null,{"className":"text-2xl font-bold text-gray-900","children":["$","a",null,{"href":"/","className":"hover:text-gray-700","children":"NPB Dev Blog"}]}],["$","p",null,{"className":"text-gray-600 text-sm mt-1","children":"by Nick Baughman, a software developer who works with Ruby and JavaScript"}]]}]}]}]}],["$","main",null,{"className":"max-w-4xl mx-auto px-4 py-8","children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":["$","div",null,{"className":"text-center py-12","children":[["$","h1",null,{"className":"text-4xl font-bold text-gray-900 mb-4","children":"404"}],["$","h2",null,{"className":"text-2xl font-semibold text-gray-700 mb-4","children":"Page Not Found"}],["$","p",null,{"className":"text-gray-600 mb-8","children":"The page you're looking for doesn't exist."}],["$","$L6",null,{"href":"/","className":"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors","children":"Go Home"}]]}],"notFoundStyles":[]}]}],["$","footer",null,{"className":"border-t border-gray-200 mt-12","children":["$","div",null,{"className":"max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm","children":["© ",2025," Nick Baughman. Built with Next.js."]}]}]]}]}]}]],null],null],["$L7",null]]]]
8:T1420,<p>One of the best things about working with React is the ease of launching
a new application thanks to Facebook's <code>create-react-app</code>. <code>create-react-app</code>
builds everything you need for a modern React web application out of the box
with a single terminal command. As great as this tool is, there are a couple
small drawbacks I've encountered so far. The first is that I usually spend a
bit of time removing boilerplate code and arraging things to my liking, and
the second, more substaintial issue is that while <code>create-react-app</code> is great
for stepping right in to start using React, I wanted to zoom in and understand
what is happening at a lower level.</p>
<p>While I will definitely continue to use <code>create-react-app</code> as my main React tool,
I decided to learn to build a React app from the ground up with the added bonus
of being published to <code>npm</code> and downloadable via <code>npx @nbaugh1/scratch-react &#x3C;APP NAME></code>.
I referenced a number of articles to learn how to do this to see if there is any
variation in the process, but it looked to be pretty straight forward. The
main source that I used was the article (https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)
linked from the offical React docs. I won't cover every line of code written since its
all in the linked artice, this will be more of a high level overview of what's happening.</p>
<p>Creating this app first requires creating the template <code>index.html</code> file
that will be used to render the webpage of the application. The first important
thing particular to our React application is a <code>&#x3C;div></code> with an <code>id</code> equal to <code>root</code>,
which we will later use to tell React where to insert elements into the DOM.
<code>&#x3C;div id="root">&#x3C;/div></code> is how this line looks. The second important thing about our
<code>index.html</code> file is a tag pointing to the location of all of our sweet JavaScript.
We'll add a <code>script</code> tag pointing to <code>bundle.js</code> which is what we'll name the file
to be output by Webpack - <code>&#x3C;script src="../dist/bundle.js">&#x3C;/script></code>.</p>
<p>Since we're working with React, which means using JSX, and writing ES6 JavaScript, we
need to use Babel to transiple our JavaScript down to a browser compatable version. To
do this, we need to create a <code>.babelrc</code> file where we will configure the needed babel plugins.
The plugins needed for this project are <code>preset-env</code> for the ES6 and <code>preset-react</code> for our
React code.</p>
<p>Next we need to setup the all important Webpack. We'll do this in a file placed in our root
directory called <code>webpack.config.js</code>. This will be a node.js file which exports a JavaScript
object containing all of our requiered configuation settings. A lot of important things happen
based on the settings in this object. Its where we'll define our <code>entry</code> to the app (<code>index.js</code>),
the mode in which we will be working (development), the rules that will define which files
are compiled by webpack, the details of where the output file should be located and what it is
named, the settings for our localhost development server, and finally enabling HotModuleReplacement
to see live changes to our app without manual reloading.</p>
<p>Within the <code>rules</code> we configure for webpack, we set it to use babel to load all of our <code>.js</code>
and <code>.jsx</code> files (excluding <code>node_modules</code>) via the presets we set up in our <code>.babelrc</code> file.
We setup our <code>bundle.js</code> file's output path by defining a <code>publicPath</code> and a <code>filename</code>. We
also setup our development server to serve content from that the output file, a publicPath and
port from which it will be accessable (localhost:3000 usually).</p>
<p>Finally, we need to use React to tell our app exactly where to render what we've built. To do
this we use the <code>ReactDOM.render()</code> function provided by React. Into this function we pass our
App component and the HTML element to apend it to <code>document.getElementById("root")</code>. From this
we get the familiar line of <code>ReactDOM.render(&#x3C;App />, document.getElementById("root"));</code> in
our index.js file. We then use our App.js component to then start building our our applicaiton.
Lastly, we need to export our App.js component as a <code>hot</code> module using <code>react-hot-loader</code>, <code>export default hot(module)(App);</code></p>
<p>And thats about it. We use React to write our independent declaritave component based UI, using
JSX and ES6 JavaScript. We then use webpack to bundle all of the javascript modules included
in our app, using babel to transiple our code in to browser compatable script, and then provide
the output bundle to be delivered by our development server.</p>
<p>For a more detailed walkthrough, please see: https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658</p>
<p>Source code for this project here: https://github.com/nbaugh1/scratch-react</p>
2:["$","article",null,{"className":"max-w-3xl mx-auto","children":[["$","header",null,{"className":"mb-8","children":[["$","h1",null,{"className":"text-4xl font-bold text-gray-900 mb-4","children":"React From Scratch Without create-react-app"}],["$","time",null,{"className":"text-gray-500 text-sm","children":"September 9, 2020"}]]}],["$","div",null,{"className":"prose prose-lg max-w-none","children":["$","div",null,{"dangerouslySetInnerHTML":{"__html":"$8"}}]}],["$","footer",null,{"className":"mt-12 pt-8 border-t border-gray-200","children":["$","div",null,{"className":"flex justify-between items-center","children":["$","div",null,{"className":"text-sm text-gray-600","children":["$","p",null,{"children":["Written by ",["$","strong",null,{"children":"Nick Baughman"}],", a software developer who works with Ruby and JavaScript."]}]}]}]}]]}]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"React From Scratch Without create-react-app | NPB Dev Blog"}],["$","meta","3",{"name":"description","content":"One of the best things about working with React is the ease of launching\na new application thanks to Facebook's `create-react-app`. `create-react-app`\nbuilds ev..."}],["$","link","4",{"rel":"author","href":"https://npb-dev-blog.netlify.app"}],["$","meta","5",{"name":"author","content":"Nick Baughman"}],["$","meta","6",{"name":"creator","content":"Nick Baughman"}],["$","meta","7",{"property":"og:title","content":"React From Scratch Without create-react-app"}],["$","meta","8",{"property":"og:description","content":"One of the best things about working with React is the ease of launching\na new application thanks to Facebook's `create-react-app`. `create-react-app`\nbuilds ev..."}],["$","meta","9",{"property":"og:type","content":"article"}],["$","meta","10",{"property":"article:published_time","content":"2020-09-10"}],["$","meta","11",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","12",{"name":"twitter:title","content":"React From Scratch Without create-react-app"}],["$","meta","13",{"name":"twitter:description","content":"One of the best things about working with React is the ease of launching\na new application thanks to Facebook's `create-react-app`. `create-react-app`\nbuilds ev..."}],["$","meta","14",{"name":"next-size-adjust"}]]
1:null
