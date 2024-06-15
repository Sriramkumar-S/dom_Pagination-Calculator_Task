async function getJsonData() {
  let response = await fetch('./data.json');
  data = await response.json();
  dataToDisplay = data[0];
  setUserDetails();
  setPages();
}

document.body.onload = () => {
    getJsonData();
}

function setPages() {

    let page_1 = document.getElementById('page 1');
    let page_2 = document.getElementById('page 2');
    let page_3 = document.getElementById('page 3');
    let page_4 = document.getElementById('page 4');
    let page_5 = document.getElementById('page 5');
    let page_6 = document.getElementById('page 6');
    let page_7 = document.getElementById('page 7');
    let page_8 = document.getElementById('page 8');
    let page_9 = document.getElementById('page 9');
    let page_10 = document.getElementById('page 10');

    for(let i = 1; i <= 10; i++) {
        page_1.innerHTML = pagesArray[0];
        page_2.innerHTML = pagesArray[1];
        page_3.innerHTML = pagesArray[2];
        page_4.innerHTML = pagesArray[3];
        page_5.innerHTML = pagesArray[4];
        page_6.innerHTML = pagesArray[5];
        page_7.innerHTML = pagesArray[6];
        page_8.innerHTML = pagesArray[7];
        page_9.innerHTML = pagesArray[8];
        page_10.innerHTML = pagesArray[9];
    }
}
function changePage(event, action) {
  let currentId = dataToDisplay.id;
    if(action === 'first') {
        dataToDisplay = data[0];
        let difference = Math.floor(currentId/10)*10;
        difference = (difference == data.length) ? data.length-10 : (difference == (data.length-10)) ? difference-10 : difference;
        pagesArray = pagesArray.map((element) => (((+element)-difference).toString()));
        setPages();
    }
    else if(action === 'last') {
        dataToDisplay = data[data.length-1];
        let difference = data.length - (Math.ceil(currentId/10)*10);
        pagesArray = pagesArray.map((element) => (((+element)+difference).toString()));
        setPages();
    }
    else if(action === 'previous') {
        let index = data.findIndex((element) => element.id === dataToDisplay.id);
        dataToDisplay = data[index-1];

        if(!pagesArray.includes(dataToDisplay.id)) {
            pagesArray = pagesArray.map((element) => ((+element)-10).toString());
            setPages();
        }
    }
    else if(action === 'next') {
        let index = data.findIndex((element) => element.id === dataToDisplay.id);
        dataToDisplay = data[index+1];

        if(!pagesArray.includes(dataToDisplay.id)) {
            pagesArray = pagesArray.map((element) => ((+element)+10).toString());
            setPages();
        }
    }
    else {
        let moveToPage = event.target.textContent;
        data.forEach(element => {
          if(element.id === moveToPage) {
            dataToDisplay = element;
          }
        });
    }
    setUserDetails();
}

function setUserDetails() {
    const userName = document.getElementById('name');
    userName.innerHTML = dataToDisplay.name;
    const emailId = document.getElementById('email');
    emailId.innerHTML = dataToDisplay.email;
    const userId = document.getElementById('id');
    userId.innerHTML = dataToDisplay.id;

    const previous = document.getElementById('previous');
    const first = document.getElementById('first');
    const next = document.getElementById('next');
    const last = document.getElementById('last');
    if(dataToDisplay.id === '1') {
        
        previous.setAttribute('disabled', "");
        first.setAttribute('disabled', "");
        next.removeAttribute('disabled');
        last.removeAttribute('disabled');
    }
    else if(dataToDisplay.id === '100') {
        next.setAttribute('disabled', "");
        previous.removeAttribute('disabled');
        last.setAttribute('disabled', "");
        first.removeAttribute('disabled');
    }
    else {
        previous.removeAttribute('disabled');
        next.removeAttribute('disabled');
        first.removeAttribute('disabled');
        last.removeAttribute('disabled');
    }
}

  function createDivElement(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }

  function createLabel(forAttrValue, textContent) {
    const label = document.createElement('label');
    label.setAttribute('for', forAttrValue);
    label.innerHTML = textContent;
    return label;
  }

  function createSpan(idAttrValue) {
    const span = document.createElement('span');
    span.id = idAttrValue;
    return span;
  }

  function createButton(className, idAttrValue, action) {
    const button = document.createElement('button');
    button.className = className;
    button.id = idAttrValue;
    button.addEventListener('click', (event) => {
      changePage(event, action)
    })
    return button
  }

  function createLineBreak() {
    const lineBreak = document.createElement('br');
    return lineBreak;
  }


  const main_box_div = createDivElement('main-box');
  const content_div = createDivElement('content');
  const pagination_div = createDivElement('d-flex justify-content-center pagination');
  pagination_div.id = 'buttons'
  const header = document.createElement('h1');
  header.innerHTML = "User Details";
  header.id = "title"
  const details_div = createDivElement('details');
  const paragraph = document.createElement('p');
  paragraph.id = "description";
  paragraph.innerHTML = "The details of users are as follows:";
  const paragraph_line_break = createLineBreak();

  const table_div = createDivElement('table-responsive text-center');
  const table = document.createElement('table');
  table.classList = "table table-bordered";
  table.id = 'table';
  const table_head = document.createElement('thead');
  const table_body = document.createElement('tbody');
  const table_head_row = document.createElement('tr');
  const table_head_row_id = document.createElement('td');
  table_head_row_id.innerHTML = "ID";
  const table_head_row_name = document.createElement('td');
  table_head_row_name.innerHTML = "Name";
  const table_head_row_email = document.createElement('td');
  table_head_row_email.innerHTML = "Email";
  const table_body_row = document.createElement('tr');
  const table_body_row_id = document.createElement('td');
  table_body_row_id.id = "id";
  const table_body_row_name = document.createElement('td');
  table_body_row_name.id = "name";
  const table_body_row_email = document.createElement('td');
  table_body_row_email.id = "email";

  table_head_row.append(table_head_row_id, table_head_row_name, table_head_row_email);
  table_body_row.append(table_body_row_id, table_body_row_name, table_body_row_email);
  table_head.append(table_head_row);
  table_body.append(table_body_row);
  table.append(table_head, table_body);
  table_div.append(table);
  details_div.append(table_div);

  const first_button = createButton('first', 'first', 'first');
  first_button.innerHTML = "First";
  const previous_button = createButton('previous', 'previous', 'previous');
  previous_button.innerHTML = "Previous";
  const last_button = createButton('last', 'last', 'last');
  last_button.innerHTML = "Last";
  const next_button = createButton('next', 'next', 'next');
  next_button.innerHTML = "Next";

  const page_1_button = createButton('pages', 'page 1', 'page_1');
  const page_2_button = createButton('pages', 'page 2', 'page_2');
  const page_3_button = createButton('pages', 'page 3', 'page_3');
  const page_4_button = createButton('pages', 'page 4', 'page_4');
  const page_5_button = createButton('pages', 'page 5', 'page_5');
  const page_6_button = createButton('pages', 'page 6', 'page_6');
  const page_7_button = createButton('pages', 'page 7', 'page_7');
  const page_8_button = createButton('pages', 'page 8', 'page_8');
  const page_9_button = createButton('pages', 'page 9', 'page_9');
  const page_10_button = createButton('pages', 'page 10', 'page_10');

  


let pagesArray = ['1','2','3','4','5','6','7','8','9','10'];
let dataToDisplay;
let previousDisabled;
let nextDisabled;
let data = [];

content_div.append(header, paragraph, paragraph_line_break,  details_div);

pagination_div.append(first_button, previous_button, 
  page_1_button, page_2_button, page_3_button, page_4_button, page_5_button,
  page_6_button, page_7_button, page_8_button, page_9_button, page_10_button,
  next_button, last_button)

main_box_div.append(content_div, pagination_div);

document.body.append(main_box_div);

