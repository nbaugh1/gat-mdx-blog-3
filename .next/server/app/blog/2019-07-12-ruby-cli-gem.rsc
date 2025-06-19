3:I[4707,[],""]
5:I[6423,[],""]
6:I[2972,["972","static/chunks/972-fe008c56cc430895.js","931","static/chunks/app/page-536f575daef6a041.js"],""]
4:["slug","2019-07-12-ruby-cli-gem","d"]
0:["FGJzCzu0zyJo5OttkLQvH",[[["",{"children":["blog",{"children":[["slug","2019-07-12-ruby-cli-gem","d"],{"children":["__PAGE__?{\"slug\":\"2019-07-12-ruby-cli-gem\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["blog",{"children":[["slug","2019-07-12-ruby-cli-gem","d"],{"children":["__PAGE__",{},[["$L1","$L2",null],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/2ba819eb02ab4417.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":["$","body",null,{"className":"__className_e8ce0c","children":["$","div",null,{"className":"min-h-screen bg-white","children":[["$","header",null,{"className":"border-b border-gray-200","children":["$","div",null,{"className":"max-w-4xl mx-auto px-4 py-6","children":["$","div",null,{"className":"flex items-center justify-between","children":["$","div",null,{"children":[["$","h1",null,{"className":"text-2xl font-bold text-gray-900","children":["$","a",null,{"href":"/","className":"hover:text-gray-700","children":"NPB Dev Blog"}]}],["$","p",null,{"className":"text-gray-600 text-sm mt-1","children":"by Nick Baughman, a software developer who works with Ruby and JavaScript"}]]}]}]}]}],["$","main",null,{"className":"max-w-4xl mx-auto px-4 py-8","children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":["$","div",null,{"className":"text-center py-12","children":[["$","h1",null,{"className":"text-4xl font-bold text-gray-900 mb-4","children":"404"}],["$","h2",null,{"className":"text-2xl font-semibold text-gray-700 mb-4","children":"Page Not Found"}],["$","p",null,{"className":"text-gray-600 mb-8","children":"The page you're looking for doesn't exist."}],["$","$L6",null,{"href":"/","className":"bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors","children":"Go Home"}]]}],"notFoundStyles":[]}]}],["$","footer",null,{"className":"border-t border-gray-200 mt-12","children":["$","div",null,{"className":"max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm","children":["© ",2025," Nick Baughman. Built with Next.js."]}]}]]}]}]}]],null],null],["$L7",null]]]]
8:T23d0,<p>For our first end of portfolio project we have been assigned to create a Ruby CLI Data Gem.
I wanted the subject matter of my project to be somewhat original and to be something that I find interesting and useful. Being the political junkie that I am, I immediately thought of the huge field of Democratic candidates running for president in the 2020 election. I decided it would be useful to write an app that presents the user with information about the individual candidate’s campaigns.</p>
<p>Since this project requires that we scrape data from a web page, I set out to find a web page that displays this information in a condensed and concise format. It didn’t take me too long to land on Ballotpedia.org as my data source. This page provided an easy to navigate list of candidates, each hyperlinked to a seperate profile page with relavent details about the candidate’s campaign.</p>
<p>From here I had to decide what information I wanted to show the user and how to scrape it from the web pages. Based on the information provided on the profile pages I decided that a quote from the candidate explaining why they are running, a more detailed summary of their campaign platform and experience, and a handful of recent news blurbs about the candidate would be appropriate.</p>
<p>First I set out to build my Scraper Class and methods. I decided I needed one to first build my Candidate instances. I decided that I should iterate through the list of candidates and build instances of a Candidate object with a name and a profile URL slug (to be used by a second method to scrape their profile page). I did so by using Nokogiri and Open-URI with the following code:</p>
<p>BASE_URL = "https://ballotpedia.org"</p>
<pre><code>def self.name_list_page
    Nokogiri::HTML(open("#{BASE_URL}/Democratic_presidential_nomination,_2020"))
end

def self.scrape_names_and_profile_pages
    name_list_page.css("div.mobile-columns ul li b a").each do |candidate|
        Dems2020::Candidate.new(candidate.text, candidate.attribute('href').value)
    end
end
</code></pre>
<p>At the outset of building the project I stored this data in an array of hashes, because I felt that my biggest first obstacle would be figuring out which CSS selectors I would need to use and how to iterate through them to properly scrape and store them. Later on I refactored my code use Objects for this instead. To scrape the data from the individual profile pages I used this method:</p>
<p>def self.add_campaign_info
Dems2020::Candidate.all.each do |candidate|
candidate_info_page = Nokogiri::HTML(open("#{BASE_URL}#{candidate.info_page_url}"))
candidate.quote = candidate_info_page.css("td")[3].text
candidate.summary = candidate_info_page.css("p")[9..11].text
candidate.news1 = candidate_info_page.css("li.panel ul")[0].text
candidate.news2 = candidate_info_page.css("li.panel ul")[1].text
candidate.news3 = candidate_info_page.css("li.panel ul")[2].text
end
end
Here I iterate through an array containing all of my Candidate instances and add a short quote, a campaign summary and 3 recent news headlines. One item on my TODO list is to try and refactor this code in such a way that the data is written to each candidate instance by a Candidate class method rather than by the scraper itself. Also I think that the news headlines can be stored in a better way such as in an array or maybe as objects themselves. Another TODO item.</p>
<p>The code for my Candidate class object is pretty short currently. It contains an initialize method, a method called find_by_index which is used by the CLI object to find a particular Candidate instance within the array of all candidates based on the user selection, and a method called all to access that array.</p>
<p>class Dems2020::Candidate
attr_accessor :name, :info_page_url, :quote, :summary, :news1, :news2, :news3</p>
<pre><code>@@all = []

def initialize (name = nil, info_page_url = nil, quote = nil, summary = nil, news1 = nil, news2 = nil, news3 = nil)
    @@all &#x3C;&#x3C; self
    @name = name
    @info_page_url = info_page_url
    @quote = quote
    @summary = summary
    @news1 = news1
    @news2 = news2
    @news3 = news3
end

def self.all
    @@all
end

def self.find_by_index(input_number)
    Dems2020::Candidate.all[input_number - 1]
end
</code></pre>
<p>end</p>
<p>Lastly I needed to build a CLI object. This is where I present the user with a list of candidates, ask them to make a selection, and then show the the information about the selected candidate. There were a lot of different ways that I thought about doing this in different formats and with various levels of interactivity, but because I’m working on a tight schedule since I also work full-time, I decided the best way would be the most simple and straight-forward way would be to show all of the information after the user makes a selection. I plan on doing plenty of refactoring later but I’m currently satisfied with having the app just meet the requirement of going one level deep.</p>
<p>Initially I wrote one giant block of code that formatted and displayed the information in the way that I wanted. I’ve sense broken it up into methods in order to make DRY. This is still a work in progress. Things on my TODO list include making sure that the user input is valid and presenting them with a message telling them to try again. Currently the app errors out if the input is a number outside of the possible range of options, and also does not deal with non-integer inputs correctly. This is the code for my CLI class (still needs to work):</p>
<p>class Dems2020::Cli</p>
<pre><code>@@selected_candidate = nil

def self.list_candidates
    Dems2020::Candidate.all.each_with_index do |candidate, index|
        puts "#{index + 1}. #{candidate.name}"
        
    end
end

def self.start
    system 'clear'
    puts ""
    puts ""
    puts "2020 DEMOCRATIC CANDIDATES FOR PRESIDENT"
    puts ""
    puts "========================================"
    Dems2020::Cli.list_candidates
    puts "========================================"
    puts ""
    puts "Please enter the number of the candidate which you like to learn more about: "
    get_candidate
    print_candidate_info
    list_or_exit
end

def self.get_candidate
    input_number = gets.to_i 
    @@selected_candidate = Dems2020::Candidate.find_by_index(input_number)
end

def self.list_or_exit
    puts ""
    puts "================================================================"
    puts ""
    puts "To return to the candidate list enter 'list'"
    puts "To exit enter 'exit'"
    input = gets.strip
    if input == 'list'
        start
    elsif input == 'exit'
        puts "Thanks! Goodbye"
    else
        puts "Sorry, I didn't understand that"
        list_or_exit
    end
end

def self.print_candidate_info
    system 'clear'
    puts ""
    puts ""
    puts "You have chosen to learn more about -#{@@selected_candidate.name}-"
    puts "================================================================"
    puts ""
    puts "#{@@selected_candidate.name}'s reason for running for president in 2020:"
    puts ""
    puts "'#{@@selected_candidate.quote}' -#{@@selected_candidate.name}"
    puts ""
    puts "================================================================"
    puts ""
    puts "Summary of #{@@selected_candidate.name}'s campaign platform and experience:"
    puts ""
    puts @@selected_candidate.summary
    puts ""
    puts "================================================================"
    puts ""
    puts "Recent news about #{@@selected_candidate.name}:"
    puts ""
    puts @@selected_candidate.news1
    puts ""
    puts @@selected_candidate.news2
    puts ""
    puts @@selected_candidate.news3
end
</code></pre>
<p>end</p>
<p>There are also still a couple of things I’d like to do like removing citation markers form the text and also removing a couple of bugs due to inconsistent formatting on the web pages, as well as making everything a bit prettier in the CLI, but right now this is what the app looks like when run:</p>
<p>Warren 2020!
One downside to this project is that it will seem less and less useful as time goes on and people drop out of the race, but for now it works for my assignment. The code should also be easily refactored to be applied to other elections, as long as ballotpedia doesn’t change things up too much.</p>
<p>UPDATE 7/13/19: I went ahead and moved some methods out of my sScraper class and into the Candidate class. Now all that the Scraper class does is scrape data rather than scrape data AND build candidate objects. I also refactored a bit and now rather than building all of the Candidate objects and adding their information upon running the app, only the basic Candidate objects with names and URLs are built and put into an array. The extra candidate info is scraped and added to the object instance after the user selects which candidate they’d like to read about. This has greatly decreased the amount of time it takes for the app to load since it only has to scrape data from one page upon running, rather than 24 separate pages.</p>
<p>github >> https://github.com/nbaugh1/candidates-app</p>
2:["$","article",null,{"className":"max-w-3xl mx-auto","children":[["$","header",null,{"className":"mb-8","children":[["$","h1",null,{"className":"text-4xl font-bold text-gray-900 mb-4","children":"Project 1: Ruby CLI Gem"}],["$","time",null,{"className":"text-gray-500 text-sm","children":"July 11, 2019"}]]}],["$","div",null,{"className":"prose prose-lg max-w-none","children":["$","div",null,{"dangerouslySetInnerHTML":{"__html":"$8"}}]}],["$","footer",null,{"className":"mt-12 pt-8 border-t border-gray-200","children":["$","div",null,{"className":"flex justify-between items-center","children":["$","div",null,{"className":"text-sm text-gray-600","children":["$","p",null,{"children":["Written by ",["$","strong",null,{"children":"Nick Baughman"}],", a software developer who works with Ruby and JavaScript."]}]}]}]}]]}]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Project 1: Ruby CLI Gem | NPB Dev Blog"}],["$","meta","3",{"name":"description","content":"For our first end of portfolio project we have been assigned to create a Ruby CLI Data Gem. \nI wanted the subject matter of my project to be somewhat original a..."}],["$","link","4",{"rel":"author","href":"https://npb-dev-blog.netlify.app"}],["$","meta","5",{"name":"author","content":"Nick Baughman"}],["$","meta","6",{"name":"creator","content":"Nick Baughman"}],["$","meta","7",{"property":"og:title","content":"Project 1: Ruby CLI Gem"}],["$","meta","8",{"property":"og:description","content":"For our first end of portfolio project we have been assigned to create a Ruby CLI Data Gem. \nI wanted the subject matter of my project to be somewhat original a..."}],["$","meta","9",{"property":"og:type","content":"article"}],["$","meta","10",{"property":"article:published_time","content":"Thu Jul 11 2019 20:00:00 GMT-0400 (Eastern Daylight Time)"}],["$","meta","11",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","12",{"name":"twitter:title","content":"Project 1: Ruby CLI Gem"}],["$","meta","13",{"name":"twitter:description","content":"For our first end of portfolio project we have been assigned to create a Ruby CLI Data Gem. \nI wanted the subject matter of my project to be somewhat original a..."}],["$","meta","14",{"name":"next-size-adjust"}]]
1:null
