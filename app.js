const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  selectBox(data);
  console.log(data);
};

const selectBox = (data) => {
  const selectDiv = document.querySelector(".selectDiv");
  data.forEach((country) => {
    selectDiv.innerHTML += `
        <option value="${country.name.common}">${country.name.common}</option>
    });
    `;
  });

  selectDiv.addEventListener("change", (e) => {
    updateDom(e.target.value, data);
  });
};

const updateDom = (value, data) => {

//   console.log(data[0].name.common);

  let country = data.filter((item) => {
      if(item.name.common == value){
        return item.name.common
      }

  })

  console.log(country);

  const { region, capital, unMember: member, population, flags:{svg:flag} } = country[0];
  document.querySelector(".countries").innerHTML = `
    <div class="card mx-auto mt-5" style="width: 18rem;">
    <img src="${flag}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center">${value}</h5>
      <p class="card-text"><b>Capital: </b>${capital}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>Region: </b>${region}</li>
      <li class="list-group-item"><b>Population: </b>${population}</li>
      <li class="list-group-item"><b>UN Member: </b> ${member ? "Yes":"No"}</li>
    </ul>
    
  </div>
    `;
};

window.addEventListener("load", fetchCountries);
