# **DONE DEAL** Application
## Project Specifications

_- What is the problem you are trying to solve?_
_- Who is your target audience?_
_- What are your specific goals?

The tourism industry is booming, especially in Amsterdam; according to
(https://amsterdam.org/en/facts-and-figures.php) there are 5340000 tourists every year, which on average works out to around 14630 people every day.

This city has a lot of amenities to offer; according to the same source, there are 1150 Restaurants and 1515 Bars and cafes in Amsterdam. This is an overwhelming number, and it can be intimidating trying to make a decision about where to go and how to get the best value for your money.

Many of the people who visit Amsterdam will include people on holiday,
inter-railers, back packers and couch surfers, and are likely to be on a budget
but also want to enjoy themselves. For many of these people coming to Amsterdam
for the first time, it is possible that they are not familiar with the area and
they are trying to save money on food or drinks.

**This is why you should use DONE DEAL**

We are going to build a web application to make it very easily to find offers
(for example Happy Hours) at different times of day on different days of the
week. For example, a user might know that they want to go out between 19:00
and 20:00 on a Thursday evening, but are not sure where they want to go. The
user can then use **DONE DEAL** to search this block of time and our website will
return the results to the user, making it easy for them to decide where they
would like to go.

This web application is not just limited to first time visitors, in fact it can
be used by anyone. Even ex-pats and locals who will be more familiar with the
city may wish to visit new bars and restaurants and can use our application to
do so. As far as we are aware, there is nowhere that comprehensively complies
information on happy hours, special offers and discounts at certain times on
certain dates. Our web application seeks to compile that information and make
it easily accessible to everyone, free of charge.

_What is your business model? Where is your revenue coming from?_

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

The €9.99 subscription and the €99.99 subscription offer the same functionality, with the €99.99 offering a saving to the business.

_What are the costs of your business?_

Here is a breakdown of the team that we would need to eventually hire to make
this business work:

#### Full Stack Developers

- The website will need to be very user friendly and presentable, but it is
important that all of the information is being stored and processed correctly
in the back end. If we wish to try new features and ideas in the future then
these developers will be essential in order to implement them. The developers
will also be responsible for website maintenance, in order to make sure that
the site is functional.

#### Market Research and Sales Reps

- Sales reps will be responsible for going to bars and restaurants for face to face meetings with the owners/general managers etc. to gauge interest in the idea and to offer the product for one month free of charge, and if the business likes the idea of the product that we can discuss a subscription with them. We would hope that as word spreads of our application that businesses will contact us as they want to join the platform.

#### Advertising

- For the launch of the product it will be critical to ensure that customers
and businesses are made aware of its existence. This can be achieved through
the use of social media such as Twitter, Facebook, Instagram etc.

#### Website Accuracy

- It is important that all of the information on the website is correct and up to date (to avoid potential customer disappointment).

#### Customer Service

- As the number of website users grow, it is likely that we will receive more
and more queries and emails. A customer service team will be necessary to
handle all of this.

#### Market research:

_- Who is your current competition?_
_- How is your product different from currently available competitors?_
_- What is the current supply / demand for your product?_

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

## Technical Specifications:
_What data will you need to store? How will it be organized? Describe each
table, its columns, and its relationships with other tables._

     Table 'Business'

This will be a list of all of the bars and restaurants in Amsterdam.

The columns will be:
- Business Id (each business will be assigned a unique Id with a serial primary key)
- Name (the name of the business)
- Address (the address of the business)

| Business Id|        Name       |          Address              |
|------------|:-----------------:|------------------------------:|
|     1    	 |      Old Sailor   |  Oudezijds Achterburgwal 39-A |
|     2    	 |    Hanneke's Boom |                 Dijksgracht 4 |
|     3    	 |          de Prael |      Oudezijds Voorburgwal 30 |

     Table 'Time'

This will be a list of all the one hour blocks of time over the seven days of the week.

The columns will be:
- Time Id (each time will be assigned a unique Id with a serial primary key)
- Time (the one hour block of time)
- Day (the day of the week)

|Time Id (PK)    |   Time                  |   Day        |
|----------------|:-----------------------:|-------------:|
|1               |   00:00-01:00           |   Monday     |
|2               |   01:00-02:00           |   Monday     |
|3               |   02:00-03:00           |   Monday     |
|4               |   03:00-04:00           |   Monday     |
|5               |   04:00-05:00           |   Monday     |
|6               |   05:00-06:00           |   Monday     |
|7               |   06:00-07:00           |   Monday     |
|8               |   07:00-08:00           |   Monday     |
|9               |   08:00-09:00           |   Monday     |
|10              |   09:00-10:00           |   Monday     |
|11              |   10:00-11:00           |   Monday     |
|12              |   11:00-12:00           |   Monday     |
|13              |   12:00-13:00           |   Monday     |
|14              |   13:00-14:00           |   Monday     |
|15              |   14:00-15:00           |   Monday     |
|16              |   15:00-16:00           |   Monday     |
|17              |   16:00-17:00           |   Monday     |
|18              |   17:00-18:00           |   Monday     |
|19              |   18:00-19:00           |   Monday     |
|20              |   19:00-20:00           |   Monday     |
|21              |   20:00-21:00           |   Monday     |
|22              |   21:00-22:00           |   Monday     |
|23              |   22:00-23:00           |   Monday     |
|24              |   23:00-00:00           |   Monday     |
|25              |   00:00-01:00           |   Tuesday    |
|26              |   01:00-02:00           |   Tuesday    |
|27              |   02:00-03:00           |   Tuesday    |
|28              |   03:00-04:00           |   Tuesday    |
|29              |   04:00-05:00           |   Tuesday    |
|30              |   05:00-06:00           |   Tuesday    |
|31              |   06:00-07:00           |   Tuesday    |
|32              |   07:00-08:00           |   Tuesday    |
|33              |   08:00-09:00           |   Tuesday    |
|34              |   09:00-10:00           |   Tuesday    |
|35              |   10:00-11:00           |   Tuesday    |
|36              |   11:00-12:00           |   Tuesday    |
|37              |   12:00-13:00           |   Tuesday    |
|38              |   13:00-14:00           |   Tuesday    |
|39              |   14:00-15:00           |   Tuesday    |
|40              |   15:00-16:00           |   Tuesday    |
|41              |   16:00-17:00           |   Tuesday    |
|42              |   17:00-18:00           |   Tuesday    |
|43              |   18:00-19:00           |   Tuesday    |
|45              |   20:00-21:00           |   Tuesday    |
|44              |   19:00-20:00           |   Tuesday    |
|46              |   21:00-22:00           |   Tuesday    |
|47              |   22:00-23:00           |   Tuesday    |
|48              |   23:00-00:00           |   Tuesday    |
|49              |   00:00-01:00           |   Wednesday  |
|50              |   01:00-02:00           |   Wednesday  |
|51              |   02:00-03:00           |   Wednesday  |
|52              |   03:00-04:00           |   Wednesday  |
|53              |   04:00-05:00           |   Wednesday  |
|54              |   05:00-06:00           |   Wednesday  |
|55              |   06:00-07:00           |   Wednesday  |
|56              |   07:00-08:00           |   Wednesday  |
|57              |   08:00-09:00           |   Wednesday  |
|58              |   09:00-10:00           |   Wednesday  |
|59              |   10:00-11:00           |   Wednesday  |
|60              |   11:00-12:00           |   Wednesday  |
|61              |   12:00-13:00           |   Wednesday  |
|63              |   14:00-15:00           |   Wednesday  |
|62              |   13:00-14:00           |   Wednesday  |
|64              |   15:00-16:00           |   Wednesday  |
|65              |   16:00-17:00           |   Wednesday  |
|66              |   17:00-18:00           |   Wednesday  |
|67              |   18:00-19:00           |   Wednesday  |
|69              |   20:00-21:00           |   Wednesday  |
|68              |   19:00-20:00           |   Wednesday  |
|70              |   21:00-22:00           |   Wednesday  |
|71              |   22:00-23:00           |   Wednesday  |
|72              |   23:00-00:00           |   Wednesday  |
|73              |   00:00-01:00           |   Thursday   |
|74              |   01:00-02:00           |   Thursday   |
|75              |   02:00-03:00           |   Thursday   |
|76              |   03:00-04:00           |   Thursday   |
|77              |   04:00-05:00           |   Thursday   |
|78              |   05:00-06:00           |   Thursday   |
|79              |   06:00-07:00           |   Thursday   |
|80              |   07:00-08:00           |   Thursday   |
|81              |   08:00-09:00           |   Thursday   |
|82              |   09:00-10:00           |   Thursday   |
|83              |   10:00-11:00           |   Thursday   |
|84              |   11:00-12:00           |   Thursday   |
|86              |   13:00-14:00           |   Thursday   |
|85              |   12:00-13:00           |   Thursday   |
|87              |   14:00-15:00           |   Thursday   |
|88              |   15:00-16:00           |   Thursday   |
|89              |   16:00-17:00           |   Thursday   |
|90              |   17:00-18:00           |   Thursday   |
|91              |   18:00-19:00           |   Thursday   |
|92              |   19:00-20:00           |   Thursday   |
|93              |   20:00-21:00           |   Thursday   |
|94              |   21:00-22:00           |   Thursday   |
|95              |   22:00-23:00           |   Thursday   |
|96              |   23:00-00:00           |   Thursday   |
|97              |   00:00-01:00           |   Friday     |
|98              |   01:00-02:00           |   Friday     |
|99              |   02:00-03:00           |   Friday     |
|100             |   03:00-04:00           |   Friday     |
|101             |   04:00-05:00           |   Friday     |
|102             |   05:00-06:00           |   Friday     |
|103             |   06:00-07:00           |   Friday     |
|104             |   07:00-08:00           |   Friday     |
|105             |   08:00-09:00           |   Friday     |
|106             |   09:00-10:00           |   Friday     |
|107             |   10:00-11:00           |   Friday     |
|108             |   11:00-12:00           |   Friday     |
|109             |   13:00-14:00           |   Friday     |
|110             |   12:00-13:00           |   Friday     |
|111             |   14:00-15:00           |   Friday     |
|112             |   15:00-16:00           |   Friday     |
|113             |   16:00-17:00           |   Friday     |
|114             |   17:00-18:00           |   Friday     |
|115             |   18:00-19:00           |   Friday     |
|116             |   19:00-20:00           |   Friday     |
|117             |   20:00-21:00           |   Friday     |
|118             |   21:00-22:00           |   Friday     |
|119             |   22:00-23:00           |   Friday     |
|120             |   23:00-00:00           |   Friday     |
|121             |   00:00-01:00           |   Saturday   |
|122             |   01:00-02:00           |   Saturday   |
|123             |   02:00-03:00           |   Saturday   |
|124             |   03:00-04:00           |   Saturday   |
|125             |   04:00-05:00           |   Saturday   |
|126             |   05:00-06:00           |   Saturday   |
|127             |   06:00-07:00           |   Saturday   |
|128             |   07:00-08:00           |   Saturday   |
|129             |   08:00-09:00           |   Saturday   |
|130             |   09:00-10:00           |   Saturday   |
|131             |   10:00-11:00           |   Saturday   |
|132             |   11:00-12:00           |   Saturday   |
|133             |   12:00-13:00           |   Saturday   |
|134             |   13:00-14:00           |   Saturday   |
|135             |   14:00-15:00           |   Saturday   |
|136             |   15:00-16:00           |   Saturday   |
|137             |   16:00-17:00           |   Saturday   |
|138             |   17:00-18:00           |   Saturday   |
|139             |   18:00-19:00           |   Saturday   |
|140             |   19:00-20:00           |   Saturday   |
|141             |   20:00-21:00           |   Saturday   |
|142             |   21:00-22:00           |   Saturday   |
|143             |   22:00-23:00           |   Saturday   |
|144             |   23:00-00:00           |   Saturday   |
|145             |   00:00-01:00           |   Sunday     |
|146             |   01:00-02:00           |   Sunday     |
|147             |   02:00-03:00           |   Sunday     |
|148             |   03:00-04:00           |   Sunday     |
|149             |   04:00-05:00           |   Sunday     |
|150             |   05:00-06:00           |   Sunday     |
|151             |   06:00-07:00           |   Sunday     |
|152             |   07:00-08:00           |   Sunday     |
|153             |   08:00-09:00           |   Sunday     |
|154             |   09:00-10:00           |   Sunday     |
|155             |   10:00-11:00           |   Sunday     |
|156             |   11:00-12:00           |   Sunday     |
|157             |   12:00-13:00           |   Sunday     |
|159             |   14:00-15:00           |   Sunday     |
|158             |   13:00-14:00           |   Sunday     |
|160             |   15:00-16:00           |   Sunday     |
|161             |   16:00-17:00           |   Sunday     |
|162             |   17:00-18:00           |   Sunday     |
|163             |   18:00-19:00           |   Sunday     |
|164             |   19:00-20:00           |   Sunday     |
|165             |   20:00-21:00           |   Sunday     |
|166             |   21:00-22:00           |   Sunday     |
|167             |   22:00-23:00           |   Sunday     |
|168             |   23:00-00:00           |   Sunday     |

     Table 'Offer'

This table will compile all of the offers for each business that is subscribed to our service.
- This table will have a Many-to-Many relationship, as each offer can apply to more than one business and can also apply to more than one time.
- This table will have the Business Id as a Foreign Key
- This table will have the Time Id as a Foreign key

The columns will be:
- Offer Id (each offer will be assigned a unique Id with a serial primary key)
- Body (Offer Details)
- Business Id (Foreign Key)
- Time Id (Foreign Key)

|Offer Id (PK) |  Body                          |  Business Id (FK)| Time Id (FK)|
|------------ :|:------------------------------:|:----------------:|:-----------:|
|1             |  Buy 1 Get 1 Free on Heineken  |  1               |    21       |
|2             |  Buy 1 Get 1 Free on Heineken  |  1               |    45       |
|3             |  Buy 1 Get 1 Free on Heineken  |  1               |    69       |
|4             |  Buy 1 Get 1 Free on Heineken  |  1               |    93       |
|5             |  3 Corona for € 10             |  2               |    17       |
|6             |  3 Corona for € 10             |  2               |    21       |
|7             |  3 Corona for € 10             |  2               |    113      |
|8             |  3 Corona for € 10             |  2               |    117      |


(PK) = Primary Key
(FK) = Foreign Key

In the above example, if a customer searches for 20:00 - 21:00 on a Monday  (which has a Time Id of 21), this will return two matches which exist in our database:

- Buy 1 Get 1 Free on Heineken at the Old Sailor (Business Id 1)
- 3 Corona for € 10 at Hanneke's Boom (Business ID 2)

_**What does your product look like? List each view, their purpose, and how they work._

When a user searches they will be given a list of matches for their search criteria. The actual information on each bar or restaurant will include the NAME, ADDRESS, and the OFFER (and also a reminder of the time and day that they searched for).

Our web application will have a very professional look, and will be highly accessible and incredibly user friendly, The
website will have the following routes:

## **ROUTES**

### Homepage
This will be the first page the user sees.

### How It Works
This page will go into more depth to explain who we are, why people should try our site and why businesses should subscribe
to our site.

### Every Deal
This page will display every offer currently in our database.

### Deal Search
This page will allow users to search for a particular one hour block of time on a particular day, and the results will be
returned to them.

### About Us
This will tell users about who we are, why customers should use us, and why businesses should use us.

### Search Bar Results
This page will be returned when a user enters information into the search bar.

### Business Model
This page will explain the different subscription options available to businesses.

### Login
This page allows a business to login to their account.

### Sign Up

This page allows a business to sign up for an account.

### Profile

When a business logs into their account they will be brought to the profile page, and from here they can navigate to creating an offer or view all of their existing offers.

### Create Offer

This page allows a business to create an offer where they can give a description of the offer and select a time and day.

### View All Offers (My Offers)

This page allows a business to view all of its existing offers.
