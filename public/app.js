const output = document.getElementById("output");
const userInput = document.getElementById("userInput");

userInput.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    // Check for Enter key
    const command = this.value.trim();
    this.value = ""; // Clear input after enter

    // Simulate basic commands (modify as needed)

    let data = { command }; // post body data

    // pass request object to `fetch()`
    fetch("/execute", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(res => res.json())
    .then((res) => {
      console.log("Request complete!");

      if (res.error) {
        console.log("===> With error:", res.error);
        output.textContent += `\n> ${command}\nError: ${res.error}`;
      } else {
        console.log("===> With response:", res.output);
        output.textContent += `\n> ${command}\n${res.output}`;
      }
      output.scrollTop = output.scrollHeight;
    });
  }
});
