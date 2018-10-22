# Done Deal Application
## Project Specifications

- What is the problem you are trying to solve? 
- Who is your target audience?
- What are your specific goals?

The tourism industry is booming, especially in Amsterdam; according to
https://amsterdam.org/en/facts-and-figures.php there are 5340000 tourists every
year, which on average works out to around 14630 people every day.

This city has a lot of amenities to offer; according to the same source, there
are 1150 Restaurants and 1515 Bars and cafes in Amsterdam. This is an
overwhelming number, and it can be intimidating trying to make a decision about
where to go and how to get the best value for your money.

Many of the people who visit Amsterdam will include people on holiday,
inter-railers, back packers and couch surfers, and are likely to be on a budget
but also want to enjoy themselves. For many of these people coming to Amsterdam
for the first time, it is possible that they are not familiar with the area and
they are trying to save money on food or drinks.

__This is why you should use Done Deal©__

We are going to build a web application to make it very easily to find offers
(for example Happy Hours) at different times of day on different days of the
week. For example, a user might know that they want to go out between 19:00
and 20:00 on a Thursday evening, but are not sure where they want to go. The
user can then use Done Deal to search this block of time and our website will
return the results to the user, making it easy for them to decide where they
would like to go.

This web application is not just limited to first time visitors, in fact it can
be used by anyone. Even ex-pats and locals who will be more familiar with the
city may wish to visit new bars and restaurants and can use our application to
do so. As far as we are aware, there is nowhere that comprehensively complies
information on happy hours, special offers and discounts at certain times on
certain dates. Our web application seeks to compile that information and make
it easily accessible to everyone, free of charge.

- What is your business model? Where is your revenue coming from?

Our business model will operate under the principle of being completely free
for people to use the search functionality. Anyone can go onto the website and
select a block of time and a date and the results will be returned to them. The
site will be completely free of charge for users, and we will not ask for any
kind of payment to use the site like this. Furthermore, we will also compile
information on all bars and restaurants in Amsterdam, free of charge. We realize
that this will be an incredibly large undertaking, and would start with a small
sample area, in order to determine how long it takes to gather this information
and to better determine how long it would take to do this for businesses city
wide.

If a bar or restaurant is interested then we will offer the first month of
being part of our service completely for free. This month will allow the
business to add information on their offers (making it easier for us to compile
the data). We want to convince businesses that our idea is so strong and will
generate them more revenue and get them more customers, that if they are willing
to pay for the monthly plan or yearly plan, that in return this will generate
even more business and customers for them.

We will offer two options to businesses, either a monthly subscription for
€9.99 or a yearly subscription for €99.99

The €9.99 subscription and the €99.99 subscription offer the same functionality,
with the €99.99 offering a saving to the business.

- What are the costs of your business?

Here is a breakdown of the team that we would need to eventually hire to make
this business work:

- **Full Stack Developers** 

- The website will need to be very user friendly and presentable, but it is
important that all of the information is being stored and processed correctly
in the back end. If we wish to try new features and ideas in the future then
these developers will be essential in order to implement them. The developers
will also be responsible for website maintenance, in order to make sure that
the site is functional.

### Market Research and Sales Reps

- Sales reps will be responsible for going to bars and restaurants for face to
face meetings with the owners/general managers etc to gauge interest in the
idea and to offer the product for one month free of charge, and if the business
likes the idea of the product that we can discuss a subscription with them. We
would hope that as word spreads of our application that businesses will contact
us as they want to join the platform.

### Advertising

- For the launch of the product it will be critical to ensure that customers
and businesses are made aware of its existence. This can be achieved through
the use of social media such as Twitter, Facebook, Instagram etc.

### Website Accuracy

- It is important that all of the information on the website is correct and up
to date (to avoid potential customer disappointment)

### Customer Service

- As the number of website users grow, it is likely that we will receive more
and more queries and emails. A customer service team will be necessary to
handle all of this

- **Market research:**

- Who is your current competition?
- How is your product different from currently available competitors?
- What is the current supply / demand for your product?

A similar idea was attempted by a company called Bar Doggy, which failed due to
the company trying to upscale too quickly. See this link for full details:
https://www.sprout.nl/artikel/startups/tim-de-kraker-bardoggy-ik-heb-klassieke-ondernemersfouten-gemaakt

At the moment there is no comprehensive list of bars and restaurants with all
of their offers. We believe that by keeping our idea focused this will help to
ensure success, and it will be important to not try to advance too quickly.
We should set realistic goals and try to stick to them.

As previously discussed, there is an incredibly large potential customer base
of users and businesses, and after conducting more thorough market research, we
can try to better determine the demand for the product.

Technical Specifications:
- What data will you need to store? How will it be organized? Describe each
table, its columns, and its relationships with other tables.

     Table 'Business'

This will be a list of all of the bars and restaurants in Amsterdam. The
columns will be:

Business Id (each business will be assigned a unique Id with a serial primary key)
Name
Address

| BusinessId |        Name       |          Address         |
|------------|:-----------------:|-------------------------:|
|     1    	 |      Old Sailor   |  Oudezijds Achterburgwal |
|     2    	 |    Hanneke's Boom |              Dijksgracht |
|     3    	 |          de Prael |    Oudezijds Voorburgwal |

     Table 'Time'

This will be a list of all the one hour blocks of time over the seven days of
the week.
The following example only covers specific hours on Monday and Tuesday.
The columns will be
Time Id (each time will be assigned a unique Id with a serial primary key)
Time (the one hour block of time)

|   TimeId   |        Name       |          Address         |
|------------|:-----------------:|-------------------------:|
|     1    	 |   16:00 - 17:00   |                 Monday   |
|     2    	 |   17:00 - 18:00   |                 Monday   |
|     3    	 |   19:00 - 20:00   |                 Monday   |

     Table 'Offer'

This table will compile all of the offers for each business that is subscribed
to our service.
This table will have a Many-to-Many relationship, as each offer can apply to
more than one business and can also apply to more than one time.
This table will have the Business Id as a Foreign Key
This table will have the Time Id as a Foreign key
The columns will be:
Offer Id (each offer will be assigned a unique Id with a serial primary key)
Offer Details
Business Id
Time Id

|   OfferId  |             Offer Details       |   BusinessId    |
|------------|:-------------------------------:|----------------:|
|     1    	 |    Buy 1 Get 1 Free on Heineken |  							 |
|     2    	 |    Buy 1 Get 1 Free on Heineken |  							 |
|     3   	 |    Buy 1 Get 1 Free on Heineken |  							 |
        

(PK) = Primary Key
(FK) = Foreign Key

In the above example, if a customer searches for 20:00 - 21:00 on a Monday,
this will return two matches which exist in our database:
Buy 1 Get 1 Free on Heineken at the Old Sailor
3 Corona for € 10 at Hanneke's Boom

- **What does your product look like? List each view, their purpose, and how they work.**

When a user searches they will be given a list of matches for their search
criteria. The actual information on each bar or restaurant will include the
NAME, ADDRESS, and the OFFER.

Our web application will have a very professional look, and will be highly
accessible and incredibly user friendly, The website will have the following
routes:

-**ROUTE** 
### Homepage
This will be the first page the user sees. There will be a carousel that
explains the core values of the application and encourages the user to explore
more and try it out.

### Drinks Search
This page will allow users to search for a particular one hour block of time on
a particular day, and the results will be returned to them.

### Food Search
This page will allow users to search for a particular one hour block of time on
a particular day, and the results will be returned to them.

### About Us
This page will go into more depth to explain who we are, why people should try
our site and why businesses should subscribe to our site.

### How It Works
This will explain to users how to use the search function.

### Business Model
This page will explain our business model and try to convince businesses to
give our service a try and if they like it to sign up to a subscription

### Business Login Page
This page will allow a business to sign in

### Add / Update offers
After logging in a business can add or update the offers which appear on our
site.

----STILL NEED TO WRITE THIS----------

- Describe any complex business logic that is happening in your application. For
example, how does data flow through your application

----STILL NEED TO WRITE THIS----------

Have a timeline of milestones to reach, including deadlines:
- Create milestones that represent the discrete blocks of functionality.
- Give an estimate for how long each will take per engineer.
- Determine whether things can be built concurrently.
- Come up with a timeline of goals to stick to.

Milestones

< 3 months

- Compile all of the bars and restaurants in a sample area of Amsterdam into
the database
- Users can query the database and this will return the results to them

6 months

- Product launch

12 months

- Explore the possibility of expanding into other cities
