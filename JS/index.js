function getable(link = `https://gorest.co.in/public-api/users?page=${myInput.value}` ) {
if(navigator.onLine){
    fetch(link)
        .then(response => {
            
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        })
        .then((resp) => {
            let dataArr = Array.isArray(resp.data)? resp.data : [resp.data]
            //console.log(dataArr)
            let stringing = JSON.stringify(dataArr);
            localStorage.setItem("userslist", stringing);
            
                        //console.log(resp.data);
            if (resp.data.length > 0) {
                let UList = resp.data;
                showtable(UList);
            }else{
                throw Error('Data array is empty!');
            }
        })
        .catch((err) => {
            console.log(err);
        })
      }else {
        show();
      }
      
    }



function search(link = `https://gorest.co.in/public-api/users/${myId.value}`) {

  fetch(link)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject('something went wrong!')
      }
    })
    .then((resp) => {
      console.log(resp.data);
      if (resp.data.length > 0) {
        let UList = resp.data;
        showtable(UList);
      } else {
        throw Error('Data array is empty!');
      }
    })
    .catch((err) => {
      console.log(err);
    })
}


let showtable = (UList) => {
    // console.log(UList);
    const Uhead = UList.map((user, key) => {

        if (key == 0) {
            let tableHead = Object.keys(user);

            return `<tr>
				<th>${tableHead[0].toUpperCase()}</th>
        <th>${tableHead[1].toUpperCase()}</th>
				<th>${tableHead[2].toUpperCase().replace(/_/g, " ")}</th>
				<th>${tableHead[3].toUpperCase().replace(/_/g, " ")}</th>
				<th>${tableHead[4].toUpperCase()}</th>
        
				<th>Actions</th>
				</tr>`;
        }
    }).join("");

    const Urow = UList.map((user) => {

        return `<tr>
    	  <td>${user.id}</td>
		  <td>${user.name}</td>
		  <td>${user.email}</td>
		  <td>${user.gender}s</td>
		  <td>${user.status}</td>
   
		  <td><button id ="ubtn" data-id ="${user.id}" class="update_button" onclick="updat(${user.id})">Update</button><button id ="dbtn" data-id ="${user.id}" class="delete_button"onclick="del(${user.id})">Delete</button></td></tr>`;
          

    }).join("");

    document.getElementById("x").innerHTML = Uhead;
    document.getElementById("y").innerHTML = Urow;

};



//getable()

// function loadFromCache() {
//   let res = localStorage.getItem('resp');
//   let obj = JSON.parse(res);
//   console.log(res)
// }

function show()
{
let table;
let cachelist = localStorage.getItem("userslist");

let getlist = JSON.parse(cachelist);
console.log(getlist.data)
for (let theuser of getlist) { 
table += `<tr> 
  <td id="tid">${theuser.id}</td> 
  <td>${theuser.name}</td> 
  <td>${theuser.email}</td> 
  <td>${theuser.gender}</td>
  <td>${theuser.status}</td>
 </tr>`; 

}
document.getElementById("list").innerHTML = table
}

function adder(link = 'https://gorest.co.in/public-api/users') {

    let Name = document.getElementById("name").value;
    let Email = document.getElementById("email").value;
    let Gender = document.getElementById("gender").value;
    let Status = document.getElementById("status").value;
    //let Status = document.getElementById("status").value;
    fetch((link), {
        method: 'POST',
        headers: {
            'Authorization': "Bearer 79ac8ef728330a699fee8c5dfd3cfc7b7d165960e8320ba002ea299e14f14a7e",
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: Name,
            email: Email,
            gender: Gender,
            status: Status
        })
    })
        .then((res) => res.json())
        .then((dataa) => {
            console.log(dataa.data)
        })

}


function del(id) {
    console.log(id);
    let link = `https://gorest.co.in/public-api/users/${id}`
    fetch((link), {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer 79ac8ef728330a699fee8c5dfd3cfc7b7d165960e8320ba002ea299e14f14a7e",
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }

    })
 
}

function updat(id) {
    let link = `https://gorest.co.in/public-api/users/${id}`
    //let uid = document.getElementById('id').value
    let NewName = document.getElementById("name").value;
    let NewEmail = document.getElementById("email").value;
    let NewGender = document.getElementById("gender").value;
    let NewStatus = document.getElementById("status").value;
    fetch((link), {
        method: 'PATCH',
        headers: {
            'Authorization': "Bearer 79ac8ef728330a699fee8c5dfd3cfc7b7d165960e8320ba002ea299e14f14a7e",
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: NewName,
            email: NewEmail,
            gender: NewGender,
            status: NewStatus
        })
    }).then(res => res.json())
        .then((res) => console.log(res));
        
/*  var table = document.getElementById('userList');

  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function() {

      document.getElementById("uid").value = this.cells[0].innerHTML;
      document.getElementById("newname").value = this.cells[1].innerHTML;
      document.getElementById("newemail").value = this.cells[2].innerHTML;
      document.getElementById("newgender").value = this.cells[3].innerHTML;
      document.getElementById("newstatus").value = this.cells[4].innerHTML;

    };
  }
    */    
        
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function Find(x) {
  // Declare variables
  var input;
  input = document.getElementById('myInput');
  x = myInput.value;
  (myInput.value) = Number(myInput.value);
  getable();
  
}

function nexfun() {
  if (isNaN(myInput.value) || myInput.value > 800) {
  	alert("Bad Input")
  } else {
  	let x = Number(myInput.value)+1;
    console.log(x);
    }
  (myInput.value) = Number(myInput.value)+1;
	getable();
  }

function prefun() {
	
  if (isNaN(myInput.value) || myInput.value < 2 || myInput.value > 80) {
  	alert("Bad Input")
  } else {
    let x = Number(myInput.value)+1;
    console.log(x);
    }
  (myInput.value) = Number(myInput.value)-1;
	getable();
}

function Finduser(y) {
  
  var input;
  input = document.getElementById('myId');
  myId.value = Number(myId.value);
  y = myId.value;
  //console.log(y);
  search();
	}

 