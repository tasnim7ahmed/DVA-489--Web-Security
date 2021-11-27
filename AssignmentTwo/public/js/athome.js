

let lights = {
    'kitchen_lights_stove': '/kitchen/lights/stove',
    'kitchen_lights_ceiling': '/kitchen/lights/ceiling',
    'livingroom_lights_sofa': '/livingroom/lights/sofa',
    'livingroom_lights_ceiling': '/livingroom/lights/ceiling',
    'bedroom_lights_bed': '/bedroom/lights/bed',
    'bedroom_lights_ceiling': '/bedroom/lights/ceiling'
  }
  
  let temps = {
    'kitchen_temperature': '/kitchen/temperature',
    'livingroom_temperature': '/livingroom/temperature',
    'bedroom_temperature': '/bedroom/temperature'
  }
  
  
  function refresh() {
    for (let id in lights) {
      const path = "http://localhost:8000/" + id;
      $.getJSON('../config.json',(states)=>{
        $('#' + id).attr('class',states[id])
      })
    }
  
    // for (let id in temps) {
    //     let path = 'http://localhost:8000' + temps[id];
    //     $.getJSON(path, data => {
    //         $('#' + id).text(data + 'C');
    //     } )
    // };
  }
  
  setInterval(refresh, 1000);
  
  function clickLight(id) {    
    const path = "http://localhost:8000/" + id;
    $.post(path, res => {      
      let currentClass = $('#' + id).attr('class')
      if(currentClass=='btn btn btn-secondary btn-sm btn-sm'){
        
        $('#' + id).attr('class','btn btn btn-warning btn-sm btn-sm')
      }
      else{
        
        $('#' + id).attr('class','btn btn btn-secondary btn-sm btn-sm')
      }
    });
  
  }