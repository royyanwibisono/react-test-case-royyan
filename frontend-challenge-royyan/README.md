# Frontend Challenge : News API

## Introduction
This repository contains a Frontend Challenge project that has been developed using React Typescript. The project is designed using the [Clean Architecture](https://medium.com/@rostislavdugin/the-clean-architecture-using-react-and-typescript-a832662af803) pattern and styled using [Ant Design](https://ant.design/). The components should been tested using [Jest](https://jest-everywhere.now.sh).

![Image of the screenshot](https://raw.githubusercontent.com/royyanwibisono/react-test-case-royyan/main/frontend-challenge-royyan/screenshoot.png) 

### Design Pattern
The project is based on the Clean Architecture design pattern. This pattern separates the application into different layers, each with its own responsibility. The layers in the Clean Architecture pattern are:
- Presentation Layer: This layer contains the UI components and their related logic.
- Domain Layer: This layer contains the business logic of the application.
- Data Access Layer: This layer contains the code responsible for accessing external resources, such as APIs or databases.

The Clean Architecture pattern helps to make the code more modular, easier to maintain, and testable.

### Styling
The Ant Design library has been used for styling the components. Ant Design provides a set of customizable and reusable UI components that follow a consistent design language. This makes it easy to create a visually appealing and consistent UI for the application.

### Testing
The components in the project have been tested using Jest. The tests ensure that the components are working as expected and help to prevent regression bugs.

## Work Logs
- Day 1 : setup React project using vite, deep learning about Clean Architecture design patterns, deep learning about Ant Design.
- Day 2 : implement Clean Architecture to HomeComponent.
- Day 3 : implement Clean Architecture to NewsComponent and ArticlesComponent.
- Day 4+ : Add Jest script for Components, edit UI/UX, bugfixings.

## Features
- Articles by categories : Business, Entertainment, General, Health, Science, Sports, and Technology.
- Articles by countries.
- Search articles by keywords.

## Setup 

1. Edit .env file with variable:
```
REACT_APP_NEWS_API_KEY=yournewsapikey
```

2. Run project
```
yarn install
yarn start
```

3. Run Jest testing
```
yarn test
```

## Credits
- Eigen Dev, @eigen3dev : https://github.com/eigen3dev