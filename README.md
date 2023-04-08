![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg)
![REPO SIZE](https://img.shields.io/github/repo-size/heidign/plantful.svg)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/heidign/plantful.svg)

--- 
# Plantful

## Description
_Duration: 2 Week Sprint_


Plantful is a full stack app for all things plants -- primarily for care-tracking and for learning about species-specific details, while also being a tool to facilitate the exchange of plants among the community (like circularity for houseplants!) Never overwater a plant or have an abundance of propagations again. 

---

| Plantful |
|:---:|
| |
| Plant Collection |
| The user can see a view of their plant profile with tasks for today, and in three and seven days. |
![profile-view-mobile](https://user-images.githubusercontent.com/98715838/229975814-4f4eacf8-229c-4b13-aa0e-5b80f0599e3d.png)
| |
| Add a Plant |
| Search thousands of plants to start learning about your plant. Select the plant, give it a nickname, enter care details and add to your collection. |
|![Mobile Search View](https://user-images.githubusercontent.com/98715838/229014964-4b487f8d-3e5f-41b0-966f-ab7e251cf415.png)|
| |
| View More Details |
| Tap on your plant to view more details, tap the `Add Care or Offer` button to update the task schedule, notes, name or offer the plant up to the community. |
|![details-view-mobile](https://user-images.githubusercontent.com/98715838/229991974-69746855-1198-4ccb-966a-d984693e02eb.png)|
|![api-details](https://user-images.githubusercontent.com/98715838/229018886-10c0ed71-c274-4ab6-8936-4e1e05e40a3a.png)|
| |
| Delete a Plant |
| Tap `Delete` to permanently delete from collection (RIP sad plant). |
|![delete-view](https://user-images.githubusercontent.com/98715838/229020507-c7048998-3f07-44c5-8c22-edccbde4d439.png)|
| Offer Gallery |
| Check out the gallery of plants offered, view its details and perhaps some helpful notes. Claim the plant now, coordinate the rest later! |
|![Offer-Gallery-View](https://user-images.githubusercontent.com/98715838/229994006-f331a38f-dcd8-4b4d-80eb-6bd52f5e1d8a.png)|
|![Offer-Details-View](https://user-images.githubusercontent.com/98715838/229994238-57e9f656-e881-4945-99e3-83757cef2414.png)|


---
## **Table of Contents:**
1. [Prerequisites](#prerequisites)
1. [Installation & Setup](#installation--setup)
1. [Usage](#usage)
1. [Built With](#built-with)
1. [Acknowledgement](#acknowledgement)
1. [License](#license)
1. [Connect With Me](#connect-with-me)


---
## Prerequisites
1. To install the dependencies, be sure to have at lease version 18 of node installed
* node
  ```sh
  npm install node@v18.13.0
  ````
1. Install Postgres  
* [PostrgeSQL](https://www.postgresql.org/)

 
## Installation & Setup
1. Fork and clone the repo
   ```sh
   git clone https://github.com/heidign/plantful.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Make a `.env` file and create a secret server session. This should be a randomly generated string of at least 16 characters.
   ```js
   SERVER_SESSION_SECRET = '<random string of characters>';  
1. Start postgres if not running alreadt by using `brew services start postgresql`(database name: `plantful`)
1. `npm run server` in your terminal
1. `npm run client` in a second terminal. 
1. Navigate to localhost:3000

---

## Usage

1. Create an account and login.
1. Click the add icon or the `add plant` tab to search a plant and add it to your collection.
1. View your profile to see care task reminders. 
1. Click on the plant to view more details specific to plant type.
1. Click `add care or offer` to update the care schedule, delete the plant, or mark it `offered`. 
1. Visit the offers page to view offers and claim plant.

---

## Built With

* [![Node.js][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![React][React.js]][React-url]
* [![Perenual API][perenual-shield]][perenual-url]
* [![Redux][Redux]][Redux-url]
* [![Redux-Saga][Reduxsaga]][Reduxsaga-url]
* [![Postgres][postgres]][postgres-url]
* ![MaterialUI][mui-shield]
* [![Heroku][heroku]][heroku-url]

---
## Acknowledgement
Special thanks to [Prime Digital Academy](www.primeacademy.io) and my instructor Dane, with the co-instruction of Edan, Key, Kris, Matt, and the additional support of Vada, along with my friends and family for their continued support, the Amethyst cohort (meow!), my mentors, and to the Vonnegut & Shawl cohorts — thank you all, y'all rule! 

---

## License
[MIT](LICENSE.md)

---

## Connect with me

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0077B5
[linkedin-url]: https://linkedin.com/in/heidign

___

<img align="left" alt="JavaScript" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="padding-right:10px;" />

<img align="left" alt="React" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="padding-right:10px;" />

<img align="left" alt="Redux" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="padding-right:10px;" />

<img align="left" alt="Node" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" style="padding-right:10px;"/>

<img align="left" alt="Nodejs" width="32px" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" style="padding-right:10px;" />

<img align="left" alt="Postgres" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="padding-right:10px;" />
          
<img align="left" alt="MUI" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" style="padding-right:10px;" />

<img align="left" alt="HTML5" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style="padding-right:10px;" />

<img align="left" alt="CSS3" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style="padding-right:10px;" />

<img align="left" alt="Git" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="padding-right:10px;" />

<img align="left" alt="GitHub" width="26px" src="https://user-images.githubusercontent.com/3369400/139447912-e0f43f33-6d9f-45f8-be46-2df5bbc91289.png" style="padding-right:10px;" />

<img align="left" alt="Visual Studio Code" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" style="padding-right:10px;" />

<!-- Links & Icons -->
[perenual-shield]: https://img.shields.io/badge/perenual-api-2cbc9e?style=for-the-badge&
[perenual-url]: https://perenual.com/api/
[linkedin-shield2]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/heidign
[Node.js]: https://img.shields.io/badge/Node.js-30333a?style=for-the-badge&logo=nodedotjs&logoColor=4FA34D
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-30333a?style=for-the-badge&logo=express&logoColor=36CAFC
[Express-url]: https://expressjs.com/
[postgres]: https://img.shields.io/badge/Postgres-20232A?style=for-the-badge&logo=postgresql&logoColor=2C6790
[postgres-url]: https://www.postgresql.org/
[Redux]: https://img.shields.io/badge/Redux-30333a?style=for-the-badge&logo=redux&logoColor=7747BA
[Redux-url]: https://redux.js.org/
[Reduxsaga]: https://img.shields.io/badge/Redux-Sagas-30333a?style=for-the-badge&logo=reduxsaga&logoColor=82D473
[Reduxsaga-url]: https://redux-saga.js.org/
[heroku]: https://img.shields.io/badge/Heroku-20232a?style=for-the-badge&logo=heroku&logoColor=604888
[heroku-url]: https://www.heroku.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[mui-shield]:
https://img.shields.io/badge/material-ui-007FFF?style=for-the-badge&logo=mui
[mul-url]:
(https://mui.com/)
[Net]: https://img.shields.io/badge/%2ENET-20232A?style=for-the-badge&logo=dotnet&logoColor=61DAFB
[Net-url]: https://dotnet.microsoft.com/en-us/
<!-- [![linkedin-shield2]][linkedin-url] -->
