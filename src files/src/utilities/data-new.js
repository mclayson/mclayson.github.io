import {DAILY_WORK_HOURS, WEEKEND} from '../config/account-settings'

export const DataTypes = {

  Task: {
    id: "task id",
    name: "name",
    description: "description",
    location: "address",
    assigned_user: "assigned user id",
    subscribers: [],
    start_date: "scheduled start date",
    deadline: "deadline",
    completed_date: "",
    status: "",
    parent_project: "project id",
    parent_job: "job id",
    blob_uri: ""
  },

  Job: {
    id: "job id",
    name: "name",
    description: "description",
    location: "address",
    assigned_users: [],
    tasks: [],
    subscribers: [],
    appointments: [
      {
        start_date: "",
        end_date: ""
      }
    ],
    completed_date: "",
    progress: "",
    parent_project: "project id",
    blob_uri: ""
  },

  Project: {
    id: "project id",
    name: "name",
    description: "description",
    location: "address",
    assigned_pm: "user id",
    customer: "user id",
    tasks: [],
    jobs: [],
    subscribers: [],
    start_date: "scheduled start date",
    end_date: "scheduled end date",
    completed_date: "",
    progress: "",
    status: "",
    blob_uri: ""
  },

  Contact: {
    id: "contact id",
    name: "",
    type: "",
    description: "",
    location: "",
    phones: [],
    emails: [],
    sm_uris: []
  },

  User: {
    id: "user id",
    name: "",
    type: "",
    description: "",
    contact: "contact id",
    // roles: [],
    tasks: [],
    jobs: [],
    projects: [],
    // subscriptions: []
  },

  Lead: {
    id: "lead id",
    contact: "contact id",
    source: "",
    company: "",
    type: "",
    description: "",
    tasks: []
  },

  Customer: {
    user_id: "user id",
    billing_id: "billing id",
    lead_id: "lead id",
    description: "",
    tasks: []
  }

};



let PickedColors = {};
const RandomColors = [
  "#1abc9c",
  "#16a085",
  "#27ae60",
  "#3498db",
  "#2980b9",
  "#4a69bd",
  "#6a89cc",
  "#60a3bc",
  "#079992",
  "#3c6382",
  "#d35400",
  "#e74c3c",
  "#e15f41",
  "#e77f67",
  "#c0392b"
];
export function GenerateRandomColor () {
  const color = RandomColors[Math.round(Math.random()*(RandomColors.length-1))];
  if (!PickedColors[color]) {
    PickedColors[color] = true;
    return color;
  }
  return GenerateRandomColor();
}


export const TradeDistributor = [0,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9];

export const Trades = [
  "Project Manager",
  "Operations Manager",
  "Plumber",
  "Technician",
  "Electrician",
  "Laborer",
  "Dry Wall Installer",
  "Tile Setter",
  "Hardwood Installer",
  "Framer"
];

const JobDefaultTrades = {
  "Sign Contract": "Customer",
  "Pre Deposit": "Customer",
  "Estimation": "Project Manager",
  "Demolition": "Laborer",
  "Protection": "Laborer",
  "Tile Installation": "Tile Setter",
  "Hardwood Installation": "Hardwood Installer",
  "Plumbing": "Plumber",
  "Clean Up": "Laborer",
  "Inspection": "Project Manager",
  "Final Payment": "Customer"
};

const JobDefaultTasks = {
  "Sign Contract": ["Sign contract"],
  "Pre Deposit": ["Recieve pre deposit"],
  "Estimation": ["Complete Estimation"],
  "Demolition": ["Break it down"],
  "Protection": ["Lay down plastic", "Tape up walls"],
  "Tile Installation": ["Put the tile in"],
  "Hardwood Installation": ["Put the hardwood in"],
  "Plumbing": ["Fix the pipes"],
  "Clean Up": ["Clean up mess"],
  "Inspection": ["Complete Inspection"],
  "Final Payment": ["Reviece final payment"],
};

const JobIcons = {
  "Sign Contract": "fas fa-file-signature",
  "Pre Deposit": "fas fa-dollar-sign",
  "Estimation": "fas fa-balance-scale",
  "Demolition": "fas fa-hammer",
  "Protection": "fas fa-tape",
  "Tile Instalation": "fas fa-toolbox",
  "Plumbing": "fas fa-tint",
  "Clean Up": "fas fa-broom",
  "Inspection": "fas fa-clipboard-list",
  "Final Payment": "fas fa-dollar-sign"
};
const DefaultJobIcon = "fas fa-toolbox";

export function GenerateTasks (name, scheduled, progress) {
  let tasks = [];
  if (JobDefaultTasks[name]) {
    for (let t=0; t<JobDefaultTasks[name].length; t++) {
      tasks.push({
        name: JobDefaultTasks[name][t],
        completed: scheduled && progress ? !!(Math.round(Math.random()*100)%5) : false,
        id: Math.random()+""
      });
    }
  }
  return tasks;
}

let job_iterator = 0;
export function GenerateJob (project, name, date, scheduled, progress) {
  job_iterator++;
  var start_time = 6+(Math.random()*DAILY_WORK_HOURS/4);
  var end_time = Math.max(1,start_time+Math.random()*DAILY_WORK_HOURS);
  var id = "t"+job_iterator+"p"+project.id;
  //var scheduled = Math.round(Math.random()*100) % 4;
  let default_trade = JobDefaultTrades[name];
  let user;
  if (scheduled && default_trade && UsersByTrade[default_trade]) {
    if (default_trade === "Customer") {
      for (var u=0; u<UsersByTrade[default_trade].length; u++) {
        if (project.id === UsersByTrade[default_trade][u].visible_projects[0]) {
          user = UsersByTrade[default_trade][u];
        }
      }
      if (!user) {
        scheduled = false;
      }
    } else {
      user = UsersByTrade[default_trade][Math.floor(Math.random()*UsersByTrade[default_trade].length)];
    }
  } else {
    scheduled = false;
  }

  let tasks = GenerateTasks(name, scheduled, progress);

  progress = 0;
  for (let t=0; t<tasks.length; t++) {
    if (tasks[t].completed) {
      progress++;
    }
  }

  var job = {
    start_date: scheduled ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), start_time ) : null,
    end_date: scheduled ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), end_time, -Math.round(Math.random()*10) ) : null,
    assigned_user: scheduled ? user.user_id : null,
    project_id: project.id,
    project_color: project.color,
    project_name: project.name,
    default_trade: default_trade,
    name: name,
    icon: JobIcons[name] || DefaultJobIcon,
    progress: scheduled ? Math.round(100*(progress / tasks.length)) || 0 : 0,//scheduled ? Math.min(Math.round(Math.random()*200),100) : 0,
    id: id,
    tasks: tasks
  };
  if (user) {
    user.jobs.push(job.id);
  }

  return job;
}

export let JobsByMonth = {
};

export let JobsById = {
};

export let UsersById = {
};

export let UsersByTrade = {
  Customer:[]
};

export function CreateCustomerUser (project) {
  const user = {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"",
  	"last_name": project.name.substr(0,project.name.indexOf(' ')),
  	"trade_name": "Customer",
    visible_projects: [project.id]
  };

  UsersByTrade["Customer"].push(user);
  Users.push(user);
}

export function GenerateProjectJobs () {
  const today = new Date();
  let weekend_ref = {};
  for (let w=0; w<WEEKEND.length; w++) {
    weekend_ref[WEEKEND[w]] = true;
  }
  for (let u=0; u<Users.length; u++) {
    const user = Users[u];
    UsersByTrade[user.trade_name] = UsersByTrade[user.trade_name] || [];
    UsersByTrade[user.trade_name].push(user);
  }
  for (let p=0; p<ProjectList.length; p++) {
    let project = ProjectList[p];
    let start_date = new Date(today.getFullYear(), today.getMonth(), today.getDate()-(p*2));//Math.round(project.temp_progress*2));
    let weekend_adjuster = 0;

    CreateCustomerUser(project);

    for (let t=0; t<project.temp_jobs.length; t++) {

      let date = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate()+t+weekend_adjuster);
      let progress = t < p ? 100 :
                      t === p ? Math.min(Math.round(Math.random()*100),100) : 0;
      while (weekend_ref[date.getDay()]) {
        weekend_adjuster++;
        date = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate()+t+weekend_adjuster);
      }
      const job = GenerateJob(
        project,
        project.temp_jobs[t],
        date,
        (progress === 0 ? !!Math.round(Math.random()*100%4) : true),
        progress
      );
      project.jobs.push(job.id);
      if (!JobsByMonth[date.getFullYear() + "_" + date.getMonth()]) {
        JobsByMonth[date.getFullYear() + "_" + date.getMonth()] = [];
      }
      JobsByMonth[date.getFullYear() + "_" + date.getMonth()].push(job);
      JobsById[job.id] = job;
    }
  }
}


export let ProjectList = [
  {
    name: "Scott Livingroom Remodel",
    color: GenerateRandomColor(),//"hsl("+GenerateRandomColor()+", 80%, 40%)",
    id: 100,
    jobs:[],
    temp_progress: Math.round(Math.random()*100) % 5,
    temp_jobs: [
      "Sign Contract",
      "Pre Deposit",
      "Estimation",
      "Demolition",
      "Protection",
      "Tile Installation",
      "Clean Up",
      "Inspection",
      "Final Payment"
    ]
  },
  {
    name: "Johnson Kitchen Remodel",
    color: GenerateRandomColor(),//"hsl("+GenerateRandomColor()+", 80%, 40%)",
    id: 200,
    jobs:[],
    temp_progress: Math.round(Math.random()*100) % 5,
    temp_jobs: [
      "Sign Contract",
      "Pre Deposit",
      "Estimation",
      "Demolition",
      "Protection",
      "Tile Installation",
      "Plumbing",
      "Clean Up",
      "Inspection",
      "Final Payment"
    ]
  },
  {
    name: "Smith Bathroom Remodel",
    color: GenerateRandomColor(),//"hsl("+GenerateRandomColor()+", 80%, 40%)",
    id: 300,
    jobs:[],
    temp_progress: Math.round(Math.random()*100) % 5,
    temp_jobs: [
      "Sign Contract",
      "Pre Deposit",
      "Estimation",
      "Demolition",
      "Protection",
      "Tile Installation",
      "Plumbing",
      "Clean Up",
      "Inspection",
      "Final Payment"
    ]
  },
  {
    name: "Osborn Kitchen Tile",
    color: GenerateRandomColor(),//"hsl("+GenerateRandomColor()+", 80%, 40%)",
    id: 400,
    jobs:[],
    temp_progress: Math.round(Math.random()*100) % 5,
    temp_jobs: [
      "Sign Contract",
      "Pre Deposit",
      "Estimation",
      "Demolition",
      "Protection",
      "Hardwood Installation",
      "Plumbing",
      "Clean Up",
      "Inspection",
      "Final Payment"
    ]
  },
  {
    name: "Harmon Home Exterior",
    color: GenerateRandomColor(),//"hsl("+GenerateRandomColor()+", 80%, 40%)",
    id: 500,
    jobs:[],
    temp_progress: Math.round(Math.random()*100) % 5,
    temp_jobs: [
      "Sign Contract",
      "Pre Deposit",
      "Estimation",
      "Demolition",
      "Protection",
      "Tile Installation",
      "Clean Up",
      "Inspection",
      "Final Payment"
    ]
  },
  {
    name: "Burke Bathroom Remodel",
    color: GenerateRandomColor(),//"hsl("+GenerateRandomColor()+", 80%, 40%)",
    id: 600,
    jobs:[],
    temp_progress: Math.round(Math.random()*100) % 5,
    temp_jobs: [
      "Sign Contract",
      "Pre Deposit",
      "Estimation",
      "Demolition",
      "Protection",
      "Tile Installation",
      "Plumbing",
      "Clean Up",
      "Inspection",
      "Final Payment"
    ]
  },
];



export const Users = [
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Tmc Builders Inc",
    "last_name":"",
    "trade_name":"Contractor,Plumber"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Wood N'Things Llc",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Cabinet Pros",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Gilman Contractors Inc",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Crowne Closets & Cabinetry",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"The Structures Group Southwest Inc",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"B Smith Construction Inc",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Turner CO",
    "last_name":"",
    "trade_name":"Contractor"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Tower Mechanical Sv",
    "last_name":"",
    "trade_name":"Contractor"
  },


  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Rice",
  	"last_name": "Werthmann",
  	"trade_name": Trades[6]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Ollen",
  	"last_name": "Hampshire",
  	"trade_name": Trades[5]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Michael",
  	"last_name": "Goermar",
  	"trade_name": Trades[4]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Dianne",
  	"last_name": "Rossini",
  	"trade_name": Trades[3]+",Plumber"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Marjan",
  	"last_name": "Berishaj",
  	"trade_name": Trades[2]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Robert",
  	"last_name": "Hudson",
  	"trade_name": Trades[1]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Jeremy",
  	"last_name": "Tilton",
  	"trade_name": Trades[0]+",Plumber"
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Lance",
  	"last_name": "Keever",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Manuel",
  	"last_name": "Patridge",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Herbert",
  	"last_name": "Baylor",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Jorge",
  	"last_name": "Brzezinski",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Calvin",
  	"last_name": "Youngquist",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Richard",
  	"last_name": "Sturtz",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Hugh",
  	"last_name": "Raymond",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Adrian",
  	"last_name": "Beutel",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Samuel",
  	"last_name": "Manwaring",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Tony",
  	"last_name": "Hallowell",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Randy",
  	"last_name": "Drumm",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Tim",
  	"last_name": "Geist",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Glen",
  	"last_name": "Lotz",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Jamie",
  	"last_name": "Bare",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Adrian",
  	"last_name": "Cabana",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Albert",
  	"last_name": "Mossman",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Richard",
  	"last_name": "Spikes",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Alexander",
  	"last_name": "Tanksley",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Earl",
  	"last_name": "Rutledge",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Leon",
  	"last_name": "Blasi",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Jerome",
  	"last_name": "Deegan",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Edgar",
  	"last_name": "Christine",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Thomas",
  	"last_name": "Alvardo",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  },
  {
    "jobs":[],
    "user_id": Math.random(),
    "first_name":"Alexander",
  	"last_name": "Guidi",
  	"trade_name": Trades[TradeDistributor[Math.floor(Math.random()*TradeDistributor.length)]]
  }
];



GenerateProjectJobs();
