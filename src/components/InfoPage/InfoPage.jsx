import React from "react";
import { Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <div
        style={{
          fontFamily: "Dangwa",
          fontSize: 40,
          color: "#d1dde5",
          // color: "#dc445c",
          borderRadius: "1em 0 1em 0",
          backgroundColor: "#375379",
          padding: "7vh",
          margin: "1vh",
        }}
      >
        Thank you!
        <Typography
          variant="subtitle2"
          style={{
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#fffae6",
            marginTop: 1,
          }}
        >
          Friends & family, Dane Smith, Amethyst Cohort, Prime Digital Academy
        </Typography>
      </div>

      <div
        style={{
          fontFamily: "Dangwa",
          fontSize: 35,
          // color: "#23422a",
          color: "#dc445c",
          borderRadius: "1em 0 1em 0",
          // backgroundColor: "#d1dde5",
          backgroundColor: "#375379",
          padding: "7vh",
          margin: "1vh",
        }}
      >
        Languages & Technologies Used:
        {/* list of tech */}
        <h4
          style={{
            fontFamily: "Roboto",
            color: "#375379",
            fontSize: 20,
            marginLeft: 1,
            color: "#d1dde5",
          }}
        >
          <li>React.js</li>
          <li>Perenual API</li>
          <li>Redux</li>
          <li>Redux-Saga</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>PostgreSQL</li>
          <li>Postico</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Material UI</li>
          <li>Material Design Icons</li>
          <li>Sweet Alert 2</li>
          <li>Figma</li>
        </h4>
      </div>
      <div
        style={{
          fontFamily: "Dangwa",
          fontSize: 28,
          // color: "#23422a",
          color: "#ffecec",
          borderRadius: "1em 0 1em 0",
          // backgroundColor: "#d1dde5",
          backgroundColor: "#375379",
          padding: "7vh",
          margin: "1vh",
        }}
      >
        Connect with me
        <Typography
          variant="subtitle2"
          style={{
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#ffecec",
            marginTop: 1,
          }}
        >
          {/* style={{
                  fontFamily: "Roboto",
                  color: "#375379",
                  fontSize: 16,
                  marginLeft: 1,
                  color: "#d1dde5",
                  borderRadius: "1em 0 1em 0",
                  backgroundColor: "#375379",
                  // backgroundColor: "#f8f1e4",
                  padding: "7vh",
                  margin: "1vh",
                }} */}
          <img
            alt="GitHub"
            // align="center"
            width="14px"
            src="https://user-images.githubusercontent.com/3369400/139447912-e0f43f33-6d9f-45f8-be46-2df5bbc91289.png"
            // src="https://user-images.githubusercontent.com/3369400/139448065-39a229ba-4b06-434b-bc67-616e2ed80c8f.png"
            style={{ paddingRight: 4 }}
          />
          <img
            // align="center"
            width="14px"
            // src="https://user-images.githubusercontent.com/98715838/228615593-7949201a-b7e8-49b6-a6a2-7412839631a6.png"
            src="https://user-images.githubusercontent.com/98715838/228616815-4f12afdf-77ab-404f-9878-12f379e8f4ca.png"
            style={{ paddingRight: 5 }}
          />
          heidign
        </Typography>
      </div>
      <footer>&copy;Heidi Ganac Nicholson</footer>
    </div>
  );
}

export default InfoPage;
