document.addEventListener('turbo:load', function() {

  if(document.querySelector("#amount-block")){
    var amount_block = document.getElementById("amount-block");
    var amount_edit = amount_block.querySelector("#amount-edit");
    var amount_edit_finish;
    var value = parseInt(amount_block.querySelector("#amount-value").innerText);
    amount_edit.addEventListener('click', showAmountInputField);
  }

  function showAmountInputField(){
    amount_block.innerHTML = `
    <h4>金額</h4>
    <div class="d-flex justify-content-between align-items-center">
      <input class="form-control" id="amount-field" type="number" value=${value}></input>
      <div class="og-button ms-3" id="amount-edit-finish">
        <i class="fa-solid fa-check" style="font-size: 24px;"></i>
      </div>
    </div>
    `;
    amount_edit_finish = amount_block.querySelector("#amount-edit-finish");
    amount_edit_finish.addEventListener('click', clearAmountInputField);
  };

  function clearAmountInputField(){
    value = amount_block.querySelector("#amount-field").value || 0

    updateAmount();

    amount_block.innerHTML = `
    <h4>金額</h4>
    <div class="d-flex justify-content-between align-items-center">
      <p class="display-4 text-success mb-0" id="amount-value">
        ${value}
      </p>
      <div class="og-button" id="amount-edit">
        <i class="fas fa-pen-to-square" style="font-size: 24px;"></i>
      </div>
    </div>
    `
    amount_edit = amount_block.querySelector("#amount-edit");
    amount_edit.addEventListener('click', showAmountInputField)
  };

  function updateAmount(){
    const url = location.href;
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    const recordId = segments[2]; 

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({ amount: value, record_id: recordId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        console.log('success update')
      } else {
        console.log('failed update')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
});