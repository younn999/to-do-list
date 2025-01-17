const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const taskList = [];
const tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
const underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  // underLine은 포함시키지 않는다.
  tabs[i].addEventListener("click", (event) => {
    // console.log(event);
    filter(event);
  });
}

taskInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    addTask();
    taskInput.value = "";
  }
});

// 할 일 추가
function addTask() {
  if (taskInput.value == "") {
    alert("할 일을 입력해주세요");
    return;
  }

  const task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  console.log(taskList);
  taskInput.value = "";
  render();
}

// 목록 그리기
function render() {
  let list = "";
  // tab의 상태에 따라 list를 다르게 보여준다.
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
  <div class="task-done">${list[i].taskContent}</div>
  <div class="button-area">
    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right" style="color: #f3656f;"></i></button>
    <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can" style="color: #f3656f;"></i></button>
  </div>
</div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div class="button-area">
      <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color: #f3656f;"></i></button>
      <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can" style="color: #f3656f;"></i></button>
    </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

// 완료 처리
function toggleComplete(id) {
  // console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

// 삭제 처리
function deleteTask(id) {
  // console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

// 할 일 필터링
function filter(event) {
  filterList = [];

  if (event) {
    mode = event.target.id;
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
