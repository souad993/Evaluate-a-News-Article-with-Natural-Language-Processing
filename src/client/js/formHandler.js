import { checkURL_function } from "./checkURL";
function handleSubmit(event) {
  event.preventDefault();

  let formURL = document.getElementById("url").value;

  if (checkURL_function(formURL)) {
    console.log("This is a valid URL");
    postData("http://localhost:8081/api", { url: formURL }).then(function (
      res
    ) {
      document.getElementById(
        "polarity"
      ).innerHTML = `Polarity ${res.score_tag}`;
      document.getElementById(
        "agreement"
      ).innerHTML = `agreement ${res.agreement}`;
      document.getElementById(
        "subjectivity"
      ).innerHTML = `subjectivity ${res.subjectivity}`;
      document.getElementById(
        "confidence"
      ).innerHTML = `confidence ${res.confidence}`;
      document.getElementById("irony").innerHTML = `irony ${res.irony}`;
    });
  } else {
    alert("Wrong URL, Please Enter a valid URL again");
  }
}

//PostData Function
//TODO: post the data to /API path
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}; //end
export { handleSubmit };
