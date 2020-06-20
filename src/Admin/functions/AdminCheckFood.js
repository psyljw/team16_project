//This code was written by Lawrence Warren

import React from "react";
import "../css/subPage.css";

class AdminCheckFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  /**Fetches from the server, build's the table header and body from fetched data*/
  async componentDidMount() {
    await this.fetchFromServer();
    //If data could be fetched from the server, render the table
    if (this.state.details.length) {
      this.buildTableHeader();
      this.buildTableBody();
    } else {
      //Leave a notice saying no data could be fetched
      document.getElementById("message").innerText =
        "No information could be fetched from the database!";
    }
  }

  /**Fetches the eateries data from the database, populates this.state.details[] with this data*/
  async fetchFromServer() {
    console.log("EateriesCMS: Fetching from server...");
    try {
      const res = await fetch("/foodReq");
      if (res.status >= 400) {
        throw new Error("There was an error in the HTTP request.");
      }

      const food = await res.json();
      this.setState({ details: food });
      console.log("EateriesCMS: Data from the server has been received!");
    } catch (err) {
      console.error("EateriesCMS: " + err);
    }
  }

  /**Builds the head of the table */
  buildTableHeader() {
    //Variables used
    var row, cell, head;
    var titles = [
      "Name",
      "Address",
      "Type",
      "Price",
      "Link",
      "Image",
      "Edit",
      "Delete",
    ];

    //Creates a new row, appends that row to the table
    head = document.createElement("thead");
    row = document.createElement("tr");
    document.getElementById("eateriesInfo").appendChild(head);
    head.appendChild(row);

    //Creates each column in the head
    titles.forEach((title) => {
      cell = document.createElement("th");
      cell.appendChild(document.createTextNode(title));
      row.appendChild(cell);
    });
  }

  /**Builds the body of the table*/
  buildTableBody() {
    let row, cell, img, body, rowValues, self;

    self = this; //Needed for functions within objects
    body = document.createElement("tbody");
    document.getElementById("eateriesInfo").appendChild(body);

    /**Loops through each element in state.details,
     * and populates a new row in the table with
     *      the values from state.details        */
    this.state.details.forEach((eatery, i) => {
      row = document.createElement("tr");
      body.appendChild(row);

      //Defines an array to store the values of the current element
      //of state.details, to be looped through
      rowValues = [
        eatery.name,
        eatery.address,
        eatery.type,
        eatery.price,
        eatery.link,
        eatery.image,
        {
          innerText: "Edit entry", //Defines text for the button
          function: function (i) {
            self.editEntry(i); //Defines a function for the button click
          },
        },
        {
          innerText: "Delete entry", //Defines text for the button
          function: function (i) {
            self.deleteEntry(i); //Defines a function for the button click
          },
        },
      ];

      //Looping through the above array
      for (let j = 0; j <= 7; j++) {
        cell = document.createElement("td");

        //For the first 5 elements, create regular text variables
        if (j <= 4) {
          cell.appendChild(document.createTextNode(rowValues[j]));
        }
        //For the 6th element, display an image
        else if (j === 5) {
          img = document.createElement("img");
          img.setAttribute("src", rowValues[j]);
          cell.appendChild(img);
        }
        //For the final two elements, display buttons
        else {
          let button = document.createElement("button");
          button.innerText = rowValues[j].innerText;
          button.addEventListener("click", () => {
            rowValues[j].function(i);
          });

          cell.appendChild(button);
        }

        row.appendChild(cell);
      }
    });
  }

  /**Delete entry i from the array & visually remove from the table
   * @param i the integer value of the database entry to be deleted.
   */
  deleteEntry(i) {
    //Creates a DELETE request, sends the delete request
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/foodReq/${this.state.details[i]._id}`, true); //Param 2 is the URL to delete
    //TODO: refactor to use AXIOS?
    xhr.send();

    //If the state of the request changes, call processRequest()
    xhr.onreadystatechange = () => {
      this.processStateChange(xhr.readyState, xhr.status);
    };
  }

  /**Edit entry i in the database
   * @param i the integer value of the database entry to be deleted.
   */
  editEntry(i) {
    //TODO: look at how Contact.js uses AXIOS to post
    console.log(`Edit entry ${i}`);
  }

  /**Add an entry to the database*/
  addEntry() {
    //TODO: work
    console.log(`Add new entry!`);
  }

  /**Process's the state of our DELETE request, when it changes.
   * @param requestState the state of the request (4 means the request has completed)
   * @param httpStatus the returned httpStatus for the request
   */
  processStateChange(requestState, httpStatus) {
    //The request has completed successfully
    if (requestState === 4 && httpStatus === 200) {
      document.getElementById("eateriesInfo").innerHTML = ""; //Clear the table
      this.componentDidMount();
    } else if (httpStatus !== 200) {
      console.error("EateriesCMS: An error occurred, nothing was deleted.");
    }
  }

  /**Renders the page */
  render() {
    /* jshint ignore:start */
    return (
      <div>
        <h1>Contact Information</h1>
        <table id="eateriesInfo" border="1"></table>
        <p id="message"></p>
      </div>
    );
    /* jshint ignore:end */
  }
}

export default AdminCheckFood;
