//JSON workout data
// Organized by body part (each item has name + equipment requirement)
const workoutData = {
  full: [
    { name: "Jumping Jacks", equipment: "none" },
    { name: "Burpees", equipment: "none" },
    { name: "Push-ups", equipment: "none" },
    { name: "Squat to Press", equipment: "dumbbells" },
    { name: "Band Rows", equipment: "band" }
  ],
  arms: [
    { name: "Bicep Curls", equipment: "dumbbells" },
    { name: "Hammer Curls", equipment: "dumbbells" },
    { name: "Tricep Dips", equipment: "none" },
    { name: "Overhead Tricep Extension", equipment: "dumbbells" },
    { name: "Band Pull-Aparts", equipment: "band" }
  ],
  legs: [
    { name: "Bodyweight Squats", equipment: "none" },
    { name: "Lunges", equipment: "none" },
    { name: "Glute Bridges", equipment: "none" },
    { name: "Goblet Squats", equipment: "dumbbells" },
    { name: "Band Side Steps", equipment: "band" }
  ],
  core: [
    { name: "Plank", equipment: "none" },
    { name: "Crunches", equipment: "none" },
    { name: "Russian Twists", equipment: "none" },
    { name: "Dead Bug", equipment: "none" },
    { name: "Band Pallof Press", equipment: "band" }
  ]
};

/* ---------- Helpers ---------- */
function $(id){ return document.getElementById(id); }
function enable(el, on=true){ el.disabled = !on; }

/* ---------- Elements ---------- */
const bodyPartSel = $("bodyPart");
const equipSel    = $("equipment");
const countSel    = $("count");
const durSel      = $("duration");

const planList    = $("planList");
const currentEl   = $("currentExercise");
const timerEl     = $("countdown");
const infoEl      = $("timerInfo");

const btnGenerate = $("btnGenerate");
const btnStart    = $("btnStart");
const btnPause    = $("btnPause");
const btnNext     = $("btnNext");
const btnReset    = $("btnReset");

/* ---------- State ---------- */
let plan = [];          // array of exercise strings
let idx = 0;            // which exercise we are on
let secs = 0;           // seconds remaining for current exercise
let timerId = null;     // setInterval id
let paused = false;

//Build plan from JSON 

btnGenerate.addEventListener("click", () => {
  // read selections
  const part = bodyPartSel.value;          // arms / legs / core / full
  const want = equipSel.value;             // any / none / dumbbells / band
  const howMany = parseInt(countSel.value, 10);

  // pick list for body part
  let pool = workoutData[part] || [];

  // filter by equipment if user specified one
  if (want !== "any") {
    pool = pool.filter(x => x.equipment === want);
  }

  // if pool became too small, fall back to the original part list
  if (pool.length === 0) pool = workoutData[part].slice();

  // shuffle simple
  pool.sort(() => Math.random() - 0.5);

  // slice to count
  const chosen = pool.slice(0, howMany);

  // build text list for UI
  plan = chosen.map(x => `${x.name} (${x.equipment})`);

  // render list
  planList.innerHTML = "";
  plan.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    planList.appendChild(li);
  });

  // reset timer state
  stopTimer();
  currentEl.textContent = plan.length ? "Ready!" : "No exercise";
  timerEl.textContent = durSel.value;
  infoEl.textContent = plan.length
    ? "Click Start Routine to begin."
    : "No exercises available. Try a different equipment option.";

  // buttons
  enable(btnStart, plan.length > 0);
  enable(btnPause, false);
  enable(btnNext, false);
});

/* ---------- Timer controls ---------- */
btnStart.addEventListener("click", () => {
  if (!plan.length) return;
  if (idx >= plan.length) idx = 0; // safety

  // start current exercise
  startExercise(idx);
  enable(btnStart, false);
  enable(btnPause, true);
  enable(btnNext, true);
});

btnPause.addEventListener("click", () => {
  if (!timerId) return;
  if (paused) {
    // resume
    paused = false;
    infoEl.textContent = "Running…";
  } else {
    // pause
    paused = true;
    infoEl.textContent = "Paused";
  }
});

btnNext.addEventListener("click", nextExercise);
btnReset.addEventListener("click", () => {
  stopTimer();
  idx = 0;
  currentEl.textContent = "No exercise";
  timerEl.textContent = "0";
  infoEl.textContent = "";
  enable(btnStart, plan.length > 0);
  enable(btnPause, false);
  enable(btnNext, false);
});

/* ---------- Core timer functions ---------- */
function startExercise(i){
  currentEl.textContent = plan[i];
  secs = parseInt(durSel.value, 10);
  timerEl.textContent = secs;
  infoEl.textContent = "Running…";

  if (timerId) clearInterval(timerId);
  paused = false;

  timerId = setInterval(() => {
    if (paused) return;
    secs--;
    timerEl.textContent = secs;

    if (secs <= 0){
      nextExercise();
    }
  }, 1000);
}

function nextExercise(){
  clearInterval(timerId);
  timerId = null;

  idx++;
  if (idx >= plan.length){
    // finished
    currentEl.textContent = "Done! 🎉";
    timerEl.textContent = "0";
    infoEl.textContent = "Great job—plan complete.";
    enable(btnStart, true);
    enable(btnPause, false);
    enable(btnNext, false);
    idx = 0; // ready to restart
    return;
  }

  // go to the next
  startExercise(idx);
}

function stopTimer(){
  if (timerId) clearInterval(timerId);
  timerId = null;
  paused = false;
}
