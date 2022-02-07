window.onload = function () {
  let dataForChart = {};

  function getSkillsData() {
    fetch('http://164.92.226.113:3000/data', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }})
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
    myChart.update();
  }

  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  // postData('http://localhost:3000/skills', {
  //     answer: 42
  //   })
  //   .then(data => {  
  //     console.log(data); // JSON data parsed by `data.json()` call
  //   });
  const chartEl = document.getElementById('myChart1');
  const chartdata = {
    labels: [

    ],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: ['#1d59b1', '#009fb7',' #fad749', '#a4243b', '#ab92bf', '#a9ffcb', '#eb4511', '#fa7921', '#d62839'],
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
      padding: 40,
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
  const btn = document.querySelector('button');
  let skillsInput = document.getElementById('skillsInput');
  let username = document.getElementById('username');
  let usermail = document.getElementById('usermail');
  let usercity = document.getElementById('usercity');
  btn.addEventListener('click', function () {
    console.log(skillsInput.value);
    postData('http://164.92.226.113:3000/skills', {
        skills: skillsInput.value,
        username: username.value,
        usermail: usermail.value,
        usercity: usercity.value
      }).then(getSkillsData())
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });
  });

}
