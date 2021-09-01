# Freelancer Dashboard

As more opportunities shift towards work from home, there is an increase in number of freelancers as well. To help all these new freelancers we are building a one stop solution called "Freelancer Dashboard" to manage clients, projects, work hours, inovices, and testimonials.  

* Date Created: 24 05 2021
* Last Modification Date: 01 08 2021
* URL: https://csci5709-group5-s21.herokuapp.com/
* Demo credentials: test@test.com | Test123**

## Authors

* [Bansi Mehta(B00875640)](bn955101@dal.ca) - (Developer)
* [Deep Patel(B00865413)](dp889845@dal.ca) - (Developer)
* [Janvi Patel (B00863421)](jn410076@dal.ca) - (Developer)
* [Sanket Shah(B00862499)](sn488207@dal.ca) - (Developer)
* [Tejaswi Chaudhary(B00858613)](tj754396@dal.ca) - (Developer)
* [Vishal Sancheti (B00877378)](vs488310@dal.ca) - (Developer)

## Getting Started

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install:

* NodeJS
* Yarn 


### Installing

##### NodeJS
NodeJS: [download and install](https://nodejs.org/en/download/)

##### Yarn via npm

It is recommended to install Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system.

Once you have npm installed you can run the following both to install and upgrade Yarn:

```
npm install --global yarn
```

Check that Yarn is installed by running:

```
yarn --version
```

### Running on Local Machine

##### Install Dependencies

Run the following command to download and install all dependencies:

```
yarn install
```

##### Start

Run the following command to start the project locally:

```
yarn start
```

## Built With

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
* [React Router](https://reactrouter.com/) - Declarative Routing for React.js
* [React Bootstrap](https://react-bootstrap.github.io/) - Twitter Bootstrap Rebuilt for React
* [React Bootstrap Drawer](https://github.com/SimpleSigner/react-bootstrap-drawer) - Sidebar drawer component for React Bootstrap.
* [React Table](https://react-table.tanstack.com/) - Lightweight and extensible data tables for React.
* [React CSV](https://github.com/react-csv/react-csv) - Generate a CSV file from given data.
* [MomentJS](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.


## Deployed With
* [Heroku](https://www.heroku.com/) - Cloud Application Platform

## Sources Used

* [ReactJS Documentation](https://reactjs.org/docs/getting-started.html) - Official ReactJS Documentation
* [React Router Web Guide](https://reactrouter.com/web/guides/quick-start) - React Router Documentation
* [Heroku DevCenter](https://devcenter.heroku.com/articles/git) - Official Heroku Documentation
* [Dev.To](https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b) - Developers Community Article
* [Mongoose](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose) - MDN documentation for MongoDB ORM

* [XML Sitemaps](www.xml-sitemaps.com) - Online - XML Sitemaps Generator
* [TermsAndConditionsGenerator](https://www.termsandconditionsgenerator.com/) - Online - Terms and Conditions Generator
* [PrivacyPolicyGenerator](https://www.termsfeed.com/privacy-policy-generator/) - Online - Privacy Policy Generator


### frontend/src/pages/Timelogs.js

*Between Lines 40 - 74*

```
const [timerState, setTimerState] = useState(0);
    const [timerStart, setTimerStart] = useState(Date.now());
    const [timerEnd, setTimerEnd] = useState(Date.now());
    const [timerString, setTimerString] = useState("00 : 00 : 00 : 00");
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        let centiseconds = ("0" + (Math.floor(timer / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timer / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timer / 3600000)).slice(-2);
        setTimerString(hours + " : " + minutes+ " : " + seconds+ " : " + centiseconds);
    });
    const startTimer = () => {
        if(timerState === 0){
            setTimerStart(Date.now() - timer);
            setTimerState (
                setInterval(() => {
                    setTimer(Date.now() - timerStart)
                }, 10)
            );
        }
    };
    const stopTimer = () => {
        setTimerEnd(Date.now());
        clearInterval(timerState);
        setTimerState(0);
        setTimer(0);
    };

```

The code above was created by adapting the code in [DevTo](https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b) as shown below: 

```
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

import './App.css';

const element = <FontAwesomeIcon icon={faClock} />

const App = () => {
  const [timer, setTimer] = useState(3595)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increment = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className="app">
      <h3>React Stopwatch {element}</h3>
      <div className='stopwatch-card'>
        <p>{formatTime()}</p>
        <div className='buttons'>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart}>Start</button>
              : (
                isPaused ? <button onClick={handlePause}>Pause</button> :
                  <button onClick={handleResume}>Resume</button>
              )
          }
          <button onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;

```

- The code in [DevTo](https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b) was implemented by Abdul Basit
- [DevTo](https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b)'s Code was used to implement a timer module which display continuously the time since a task started
- [DevTo](https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b)'s Code was modified by @sancheti

### frontend/src/pages/BusinessCard.js

*Between Lines 198 - 212*

```
<React.Fragment>
  <div>
      {
          this.state.exportSide === 'Front' ? (
              <BusinessCardFront ref={this.componentRef} apiData={this.state.profileData} />

          ) : (
              <BusinessCardBack ref={this.componentRef} apiData={this.state.testimonialData} />
          )
      }
  </div>
  <div className="export-button">
      <Button className="primary-button" onClick={() => exportComponentAsJPEG(this.componentRef)}>Export As JPEG</Button>
  </div>
</React.Fragment>

```

The above code was created using react-component-export-image adapted from [npmJS](https://www.npmjs.com/package/react-component-export-image). ReactJS library ['react-component-export-image'](https://www.npmjs.com/package/react-component-export-image) has been used.

*Between Lines 124 - 131*

```
<Flippy flipOnHover={true} style={{ display: "flex", justifyContent: "center", width: '24rem', height: '12rem' }}>
    <FrontSide>
        <BusinessCardFront apiData={this.props && this.props.data && this.props.data.profileData} />
    </FrontSide>
    <BackSide>
        <BusinessCardBack apiData={this.props && this.props.data &&  this.props.data.testimonialData} />
    </BackSide>
</Flippy>
```

The above code was created and adapted from [medium](https://kmarks2013.medium.com/flipping-components-in-react-cc7ca8a1d9f9). ReactJS library ['react-flippy'](https://www.npmjs.com/package/react-flippy) has been used.

## Contributions

| Author  |  Feature 1 |  Status |  Feature 2 |  Status |
|---|---|---|---|---|
|  [Bansi Mehta(B00875640)](bn955101@dal.ca) |  ToDo List | Done  | Business Card  | Done  |
|  [Deep Patel(B00865413)](dp889845@dal.ca) |  Testimonials | Done  | Authentication/Profile |  Done |
|  [Janvi Patel (B00863421)](jn410076@dal.ca) |  Clients | Done  | Notification  | Done  |
| [Sanket Shah(B00862499)](sn488207@dal.ca) | Projects  | Done  | Calendar  | Done  |
| [Tejaswi Chaudhary(B00858613)](tj754396@dal.ca) |  Invoice Generation  |   Done| Invoice Management   | Done   |
| [Vishal Sancheti (B00877378)](vs488310@dal.ca) |  Timelogs |  Done |  Dashboard Stats | Done  |

## Acknowledgments

* Gabriella Mosquera
* Aadesh Shah
* Yash Jaiswal
