const element = document.querySelector(".contain-flex");
const gridInput = document.querySelector("#grid-num");
const btn = document.querySelector(".grid-maker");
const clear = document.querySelector(".clear");

const rainbow = document.querySelector(".rainbow");
const shade = document.querySelector(".shade");

shade.addEventListener("click", (e) => {
  shade.classList.toggle("grayscale");
  rainbow.classList.remove("RGB");
});

rainbow.addEventListener("click", () => {
  rainbow.classList.toggle("RGB");
  shade.classList.remove("grayscale");
});

gridInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addGrid();
  }
});

//initial grid
function grid(n) {
  for (let i = 1; i <= n * n; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    element.appendChild(cell);

    cell.addEventListener("mouseover", color);

    function color(e) {
      cell.style.backgroundColor = "black";

      //change to rgb mode
      if (rainbow.classList.contains("RGB")) {
        cell.style.backgroundColor = `hsl(${Math.random() * 360}, 85%, 55%)`;
      }

      //change to grayscale opacity
      if (shade.classList.contains("grayscale")) {
        cell.style.opacity = ".2";
        cell.style.backgroundColor = "black";

        cell.addEventListener("mouseover", () => {
          let currentOpacity = parseFloat(cell.style.opacity) || 0.2; // If there is no opacity, starts in 0.2

          if (currentOpacity < 1) {
            cell.style.opacity = currentOpacity + 0.1; // Increments 0.1
          }
        });
      }
    }

    //clear grid colors
    clear.addEventListener("click", () => {
      cell.style.backgroundColor = "white";
      cell.style.opacity = 1;
    });
  }

  document.documentElement.style.setProperty("--rowN", n);
  document.documentElement.style.setProperty("--colN", n);
}
grid(16);

//listen for custom grid size
btn.addEventListener("click", addGrid);

function addGrid() {
  let gridNumber = Number(gridInput.value);

  if (gridNumber !== 0 && gridNumber <= 100) {
    element.innerHTML = "";

    //create new grid
    function grid(n) {
      for (let i = 1; i <= n * n; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");

        element.appendChild(cell);

        cell.addEventListener("mouseover", color);

        //fill cell with colors
        function color(e) {
          //default color
          e.target.style.backgroundColor = "black";

          //RGB mode
          if (rainbow.classList.contains("RGB")) {
            e.target.style.backgroundColor = `hsl(${
              Math.random() * 360
            }, 85%, 55%)`;
          }

          //change to grayscale opacity
          if (shade.classList.contains("grayscale")) {
            cell.style.opacity = "0.2";
            cell.style.backgroundColor = "black";

            cell.addEventListener("mouseover", () => {
              let currentOpacity = parseFloat(cell.style.opacity) || 0.2; // If there is no opacity, starts in 0.2

              if (currentOpacity < 1) {
                cell.style.opacity = currentOpacity + 0.1; //Increments 0.1
              }
            });
          }
        }

        //clear grid colors
        clear.addEventListener("click", () => {
          cell.style.backgroundColor = "white";
          cell.style.opacity = 1;
        });

        document.documentElement.style.setProperty("--rowN", n);
        document.documentElement.style.setProperty("--colN", n);
      }
    }
    grid(gridNumber);
  } else {
    alert("please enter grid value between 1 and 100 only");
  }

  gridInput.value = "";
}
