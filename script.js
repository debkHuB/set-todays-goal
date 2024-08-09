const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! You just completed all the goals, time for chill :D"
]

//! 2
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: {
        name: "",
        completed: false,
    },
    second: {
        name: "",
        completed: false,
    },
    third: {
        name: "",
        completed: false,
    }
};

//! For ProgressBar (Converting allGoals object into array using Object.values then filter out the completed goals from it)
//! PB 1
let completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length;


//! PB 2.1
progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
//! PB 3.1
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`;
//! 5 updating the message
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {


        const allGoalsAdded = [...inputFields].every((input) => {
            return input.value;
        })


        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle("completed");
            progressValue.style.display = "block";
            progressValue.style.display = "flex";

            //! 4
            const inputId = checkbox.nextElementSibling.id
            //* converting false to true and vice versa
            allGoals[inputId].completed = !allGoals[inputId].completed;
            //! PB 1.1
            completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length;
            //! PB 2
            progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
            //! PB 3 Updating the text in progress bar
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`;

            //! 5.1
            progressLabel.innerText = allQuotes[completedGoalsCount];

            localStorage.setItem("allGoals", JSON.stringify(allGoals));


        } else {
            errorLabel.style.display = "block";
        }


    })
})

inputFields.forEach((input) => {
    //! 3   
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
        input.parentElement.classList.add("completed");
    }

    input.addEventListener("focus", () => {
        errorLabel.style.display = "none";
    })

    //! 1
    input.addEventListener("input", (e) => {
        //! 3.1 After completing the task we cannot edit until it unchecked
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }

        allGoals[input.id].name = input.value;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));

    })
})