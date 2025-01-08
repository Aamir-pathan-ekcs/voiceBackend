document.addEventListener('DOMContentLoaded', ()=>{
    async function userDetails() {
        try{
            const response = await fetch('/userDetails');
            const data = await response.json();
            // const userValue = [
            //     data.name || 0,
            //     data.email || 0,
            // ];
            const userBodyData = document.querySelector('#userData');
            if(userBodyData) {
                // let valueG = 0;
                data.forEach(element => {
                    const newRow = userBodyData.insertRow();

                    const DateName = newRow.insertCell(0);
                    const nameUser = newRow.insertCell(1);
                    const nameEmail = newRow.insertCell(2);
                    const namePromo = newRow.insertCell(3);
                    let textPromo = element.promo || '';
                    let promo = '';
                    promo = textPromo.slice(8);
                    nameUser.textContent = element.name || 'NA';
                    nameEmail.textContent = element.email || 'NA';
                    namePromo.textContent = promo || 'NA';
                    DateName.textContent = 'NA';
                });
            }
        }catch(err){
            console.error('Error fetching user Data:', err);
        }
    }
    userDetails();
})