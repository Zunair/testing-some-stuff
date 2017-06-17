intouch Development
===================

This is the first iteration of a new microservice architecture
for intouch. 


Install
-------

First clone the repo

.. code-block:: bash

    $ https://github.com/Duroktar/testing-some-stuff.git
    $ cd testing-some-stuff


Test Database Access
--------------------

The database URL **CANNOT NOT BE UPLOADED TO GIT**. This means
before you can run the app you must manually enter the database URL string 
into the `config/default.json` files in all services. This will eventually
be done by pulling in ENV variables so for now this is only a temporary 
inconvenience. 

*If you need help with this step please ask Zunair or I.*


Usage
-----

**Node must be installed and in your PATH for this to work**

First run the install script to install each service's node dependancies

.. code-block:: bat

    C:\> install.bat

or for linux

.. code-block:: bash

    $ ./install


Then to start the server run

.. code-block:: bat

    C:\> start.bat

or for linux

.. code-block:: bash

    $ ./start

Then in your browser navigate to `http://localhost:3030`


**Please let me know of any errors along the way so I can fix them. Thanks**

Available Endpoints
-------------------

I recommend using Postman for making requests to the test server. You can
download Postman from https://www.getpostman.com/. it's available 
for Windows, Mac and Linux. Once installed import the `InTouch-API-calls.postman_collection.json`
API call pack into Postman. From there you can use the included CURL requests,
or add your own (if you need help with this, please ask me).

This is just a proof of concept. More endpoints will obviously be added
as the project comes together.

- `localhost:3030/users`
- `localhost:3002/messages`


What's where
------------

- **intouch-main-app** : The main controller for intouch microservices

  - **public/index.html** : This is the page you see when you navigate to `http://localhost:3030`

  - **public/app.js** : Business logic for the `index.html` file.

  - **config/default.json** : You'll need to manually enter the test database url here. (See Zun or Scott)

- **intouch-messages-service** : Messages service for testing.
  
  - **public/index.html** : Not served
  
  - **config/default.json** : You'll need to manually enter the test database url here. (See Zun or Scott)


Thoughts
--------

Each microservice can be created as a simple feathers app with a service attached to it.
It can also be as simple as a node package with one file handling the service logic.
An example of this can be found within the `intouch-test-service` folder. But I don't know
if one way is necessarily better than the other.. By generating a new feathers app with
a single service (like `intouch-messages-service`) we have more options available to 
the us, like hooks & middleware.. But more testing will need to be done before I can
which is the most appropriate.


Todo
----

We need to figure out how to incorporate UI work into the services. My ideas would be

1 - Create the view alongside the service.
    Each service comes with a basic index.html in the public folder. Can this be used?

2 - Keep the views inside the main service.
    Since the main app is aware of whats happening amongst the services, maybe it's 
    best to keep the views somewhere inside there.

Gonna need to talk with the UI guys and get their opinion on the matter. They've
obviously done this sort of thing before so their input would be really helpful.


*This also needs to be mocked up into a diagram showing the overall architecture of the 
app.*
