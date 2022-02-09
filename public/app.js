window.onload = function () {
  let dataForChart = {}

  function getSkillsData() {
    fetch('/data')
      .then(response => response.text())
      .then(data => {
        dataForChart = JSON.parse(data);

      })
      .then(() => {
        updateChart()
      });
  }


  function updateChart() {
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    dataForChart.data.forEach((item) => {
      myChart.data.labels.push(item.skill);
    });


    dataForChart.data.forEach((item) => {
      myChart.data.datasets[0].data.push(item.skillId);
    });
    console.log('myChart.data.totalSkills', dataForChart.data.totalSkills)
    document.getElementById("skillsCount").innerText = dataForChart.totalSkills
    document.getElementById("usersCount").innerText = dataForChart.totalUsers
    myChart.update();
  }


  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const chartEl = document.getElementById('myChart1');
  const chartdata = {
    labels: [

    ],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: ['#1d59b1', '#009fb7', ' #fad749', '#a4243b', '#ab92bf', '#a9ffcb', '#eb4511', '#fa7921', '#d62839'],
      hoverOffset: 24
    }]
  };
  const config = {
    type: 'doughnut',
    data: chartdata,
    options: {
      backgroundColor: 'transparent',
      cutout: '45%',
      radius: '80%',
      hoverBackgroundColor: 'yellow',
      borderWidth: 0,
      borderColor: 'transparent',
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 16,
            boxHeight: 16,
            color: '#fff'
          },
          title: {
            color: '#fff'
          }
        }
      }

    }
  };
  const myChart = new Chart(chartEl, config);
  getSkillsData();
  const btn = [...document.getElementsByClassName('sendSkills')];

  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const formSection1 = document.getElementById('formSection1');
  const formSection2 = document.getElementById('formSection2');
  const formSectionSuccess = document.getElementById('formSectionSuccess');
  nextBtn.addEventListener('click', () => {

    formSection1.style.display = "none"
    formSection2.style.display = "inline-flex"
  })

  backBtn.addEventListener('click', () => {
    formSection1.style.display = "inline-flex"
    formSection2.style.display = "none"
    formSectionSuccess.style.display = "none"
  })

  let skillsInput = document.getElementById('skillsInput');
  let username = document.getElementById('username');
  let usermail = document.getElementById('usermail');
  let usercity = document.getElementById('usercity');
  btn.forEach(element => {
    element.addEventListener('click', function () {
      let skillsForm = document.querySelector('form')
      let skillsFormData = {};
      new FormData(skillsForm).forEach((value, key) => skillsFormData[key] = value);

      console.log('skillsFormData', {
        skillsFormData
      })
      postData('/skills', skillsFormData).then(getSkillsData())
        .then(data => {
          console.log(data);
          formSection1.style.display = "none"
          formSection2.style.display = "none"
          formSectionSuccess.style.display = "inline-flex"
        });

    })
  });
}