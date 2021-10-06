<p align="center">
<img width="50%" src="https://github.com/beesona/api-practical/blob/master/assets/nelnet.svg?raw=true" />
</p>


Hey there! Thanks for taking the time to get to know us, and let us get to know you! This application is a simple real-world example of one of our RESTful APIs. Before we begin, let's look the prerequisites we need to square away and then cover today's objectives.

# Prerequisites
Let's make sure you have the following installed or available on your machine.

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
	 - If you don't have git installed, make sure you are comfortable downloading and uncompressing a zip file for the solution we will be working with today.
 - [ ] [Node Runtime / NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
	 - While today's exercise won't need the lates version, we recommend something > v14.2
 - [ ] An IDE you are familiar with
	 - This could literally be anything from Vim to [Visual Studio Code](https://code.visualstudio.com/download) (We as a group tend prefer the latter).

# The Ask
A small team has dug up an API repository they want to repurpose for using in a new application. The application is a web API using the [Node Runtime](https://nodejs.org/en/), implemented with the standard [Express](https://expressjs.com/) framework. The team wants to clean up some of the mess left by whomever last touched the solution and implement some enhancements needed to meet the requirements of their latest feature request. The major features we need to build are the following:
- The UsersV1Router needs to be updated to handle basic CRUD operations on a set of Users. Specifically a **GET all, GET by ID, POST, PUT, and DELETE**.
- The UserManager needs to be updated to handle the application logic of the CRUD requests from the router.
- We need to build a logger and implement some rudimentary logging that can be later replaced.
- currently exceptions are handled pretty inconsistently or not at all; we need to implement some try catches and a consistent pattern (or Error Event) for throwing them to the user or logs.
- We want to implement linting in a meaningful way, or at least get it installed so the next person to work on this solution can lint their files and keep everything consistent.
- We should expand on the existing Unit Tests; At least get started with one for another one of our CRUD operations.
	> **note**: The above is a high level that we will be walking through. Feel free to ask any questions after you review The Ask then see the code. Additionally, riddled throughout the app are **TODO** comment markers; use those to guide yourself from change to change.

## There Is No One Way
Through this exercise we hope to have the chance to get to know about how you solve the problems presented with this ask. The enhancements and fixes are no major algorithms nor are they meant to be a test; if something stumps you, or just isn't working, feel free to move on to something else. Additionally, tackle the requests in your own order. The only thing we care about is getting the chance to see how you tackle problems in front of you.
## Use Real-World Resources
Like solving a problem in your normal day job, use the resources available to you. The solution is riddled with README.md files that contain example code you can rely on to implement your own solutions to the problems. You can use your team of interviewers like your actual team; ask questions, get clarification, or even straight up ask for help with the problems in front of you. Lastly use the API documentation of [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html), [Node](https://nodejs.org/dist/latest-v14.x/docs/api/), or [Express](http://expressjs.com/en/api.html) to try to get answers. There's even a great website called [StackOverflow](https://stackoverflow.com/) that if you've never heard of, has tons of right (and wrong) suggestions for problem solving (does sarcasm come through in README text?).

# Ok, Let's Go
- [ ] Perform a git clone of this repository and branch off of the **feature** branch.
		<div>
			<ul>
				<li>`git clone git@github.com:beesona/api-practical.git`</li>
				<li>`git checkout feature`</li>
				<li>`git checkout -b YOURNAME-feature`</li>
			</ul>
		</div>

	> **note**: The `master` branch contains a mostly finished version of the application. The exercise will be based on your work against the `feature` branch so ensure that is the branch your are branching off of.
- [ ] Perform the following to ensure the app is can compile.
		- `npm install`
		- `npm run build`
	> **note**: `npm run build` will fail. That's expected; here's where we start troubleshooting!
- [ ] Troubleshoot the application to get it running. Consider the following:
		- package.json issues; are the node_modules good to go? Is the scripts section configured properly?
		- tsconfig.json settings; is this thing ready for building?
		- Typescript code issues; review the build output to determine if there are any code issues checked into the `feature` branch that might be causing issues.
- [ ] Implement the Application Logic for the CRUD operations in the UsersManager.
	- [ ] GetAll
	- [ ] GetById
	- [ ] Create
	- [ ] Update
	- [ ] Delete
- [ ] Implement the router logic for the CRUD operations handled by the UsersManager.
	- [ ] **GET** Users
		- [ ] Enhance with Pagination
	- [ ] **GET** User
		- Get by ID
		- [ ] Add validator for UUID provided in request.
	- [ ] **POST** User
	- [ ] **PUT** User
	- [ ] **DELETE** User
- [ ] Create a LoggingManager that logs to console and implement an interface that exposes methods to log the following:
	- [ ] Info
	- [ ] Debug
	- [ ] Error
- [ ] Add a Unit Test for one of the CRUD endpoints above of your choice.
- [ ] TODO hunting: find any TODO comments that arent for anything above to work through.

# Conclusion
<p align="center">
<img width="50%" src="https://github.com/beesona/api-practical/blob/master/assets/frodo.jpeg?raw=true" />
</p>

Thank you for spending time with us today! If you have any questions on the exercise, or feedback, we'd love to hear it. Thanks again!
