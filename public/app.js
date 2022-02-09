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
  let skillsInput = document.getElementById('skillsInput');
  let username = document.getElementById('username');
  let usermail = document.getElementById('usermail');
  let usercity = document.getElementById('usercity');
  let step2 = false
  nextBtn.addEventListener('click', () => {
    if (skillsInput.validity.valid && usercity.validity.valid) {
      formSection1.style.display = "none"
      formSection2.style.display = "inline-flex"
      skillsInput.setCustomValidity("");
      usercity.setCustomValidity("");
      step2 = true
      usermail.setAttribute('required', 'true')
    } else {
      if (skillsInput.validity.valid == false) {
        skillsInput.setCustomValidity("Спочатку розкажи, що ти вмієш");
        skillsInput.reportValidity();
        skillsInput.setCustomValidity("");
      }
      if (usercity.validity.valid == false) {
        usercity.setCustomValidity("Вкажи своє місто!");
        usercity.reportValidity();
        usercity.setCustomValidity("");
      }
    }
  })

  backBtn.addEventListener('click', () => {
    formSection1.style.display = "inline-flex"
    formSection2.style.display = "none"
    formSectionSuccess.style.display = "none"
    usermail.removeAttribute('required')
    skillsInput.value = ''
  })


  btn.forEach(element => {
    element.addEventListener('click', function () {
      let skillsForm = document.querySelector('form')
      let skillsFormData = {};
      if (step2 === true) {
        //check second pair  only
        if (username.validity.valid && usermail.validity.valid) {

          usermail.setCustomValidity("");
          username.setCustomValidity("");
          
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
        } else {
          if (username.validity.valid == false) {
            username.setCustomValidity("Вкажи ім'я!");
            username.reportValidity();
            username.setCustomValidity("");
          }
          if (usermail.validity.valid == false) {
            usermail.setCustomValidity("Вкажи своє місто!");
            usermail.reportValidity();
            usermail.setCustomValidity("");
          }
        }
      } else {
        //check first part only
        if (skillsInput.validity.valid && usercity.validity.valid) {
          formSection1.style.display = "none"
          formSection2.style.display = "inline-flex"
          skillsInput.setCustomValidity("");
          usercity.setCustomValidity("");
          step2 = true
        } else {
          if (skillsInput.validity.valid == false) {
            skillsInput.setCustomValidity("Спочатку розкажи, що ти вмієш");
            skillsInput.reportValidity();
            skillsInput.setCustomValidity("");
          }
          if (usercity.validity.valid == false) {
            usercity.setCustomValidity("Вкажи своє місто!");
            usercity.reportValidity();
            usercity.setCustomValidity("");
          }
        }
      }




    })
  });
}