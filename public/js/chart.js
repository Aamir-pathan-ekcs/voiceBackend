document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById("loader");
    const dashboard = document.getElementById("dashboard");
    async function fetchCount() {
         try {
            loader.classList.remove('hidden');
            const response = await fetch('/promoCodeCount');
            const data = await response.json();

            await new Promise((resolve) => setTimeout(resolve, 500));
            populateDashboard(data);
            loader.classList.add('hidden');
            dashboard.classList.remove('hidden');
     
            } catch (error) {
                loader.classList.remove('hidden');
                dashboard.classList.add('hidden');
               console.error('Error fetching count:', error);
             return 0;
         }
}
function populateDashboard(data) {
    var percentages = {};
    const getVl = [
        data.five || 0,
        data.ten|| 0,
        data.twenty || 0,
        data.thirty || 0,
    ];
    // console.log(getVl);
    const rows = ['row1', 'row2', 'row3', 'row4'];
    let valueGet = 0;
    function updateCell(){
        for(let tdindex = 0; tdindex < 2; tdindex++){
            rows.forEach((rowId)=>{
                const row = document.querySelector(`#${rowId}`);
                if(row){
                    const cell = row.cells[tdindex + 1];
                    if(cell && valueGet < getVl.length){
                        cell.textContent = getVl[valueGet];
                        //let tt =+ getVl[valueGet];
                        // getValue(tt);
                        valueGet++
                    }
                }
            });
            if(valueGet >= getVl.length){
                break;
            }
        }
       const totalNumber = getVl.reduce((sum, count) => sum + count, 0);
       rows.forEach( rows =>{
        const row = document.querySelector(`#${rows}`);
        if(row){
            let sum = 0;
            for(let i = 1; i <= row.cells.length-1; i++){
                const cell = row.cells[i];
                if(cell){
                    const valueGet = parseFloat(cell.textContent);
                    if(!isNaN(valueGet)){
                        sum += valueGet;
                    }

                }
            }
                const percentage = ((sum / totalNumber) * 100).toFixed(1);
                percentages[rows] = parseFloat(percentage);
            //     lastTd.textContent = percentage + '%';
          
        }
       });
       drawChart();
    }
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Task', 'Percentage'],
        ['Discount 5%', percentages['row1'] || 0],
        ['Discount 10%', percentages['row2'] || 0],
        ['Discount 20%', percentages['row3'] || 0],
        ['Discount 30%', percentages['row4'] || 0],
      ]);

      var options = {
        title: 'Activities',
        'width':550,
        'height':550,
        sliceVisibilityThreshold: 0,
        pieSliceText: 'both',
        //pieSliceText: 'label', // Ensure labels are shown
        //legend: { position: 'labeled' }, // Display labels in the legend
        is3D: true,
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(data, options);
    }
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(updateCell);
  }
fetchCount();
});
