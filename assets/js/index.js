let meals = document.querySelector("#meals .row");
let searchByName = document.getElementById("searchByName");
let searchByLetter = document.getElementById("searchByLetter");
let result = [];

$(document).ready(() => {
  $(".lds-roller").fadeOut(500);
  $(".inner-loading").fadeOut(300);
});
//! open-close sideBar
const sideBarWidth = $(".sideBar-content").outerWidth();
$(".sideBar-content").css({ width: `-${sideBarWidth}px`, padding: `0px` });
let sideBarStatus = false;

$(".open-close-icon").on("click", function () {
  if (sideBarStatus === false) {
    openSidebar();
  } else {
    closeSidebar();
  }
});

function openSidebar() {
  for (let i = 0; i < 5; i++) {
    $(".sideBar-list li")
      .eq(i)
      .animate({ top: `0px` }, (i + 5) * 100);
  }
  $(".sideBar-content").animate(
    { width: `${sideBarWidth}px`, padding: `24px` },
    500
  );
  $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");
  sideBarStatus = true;
}

function closeSidebar() {
  $(".sideBar-list li").animate({ top: `200px` }, 500);
  $(".sideBar-content").animate(
    { width: `-${sideBarWidth}px`, padding: `0px` },
    500
  );
  $(".open-close-icon").removeClass("fa-x").addClass("fa-align-justify");
  sideBarStatus = false;
}

//! All Meals
async function getAllMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await response.json();
  result = data.meals;
  displayAllMeals();
}
function displayAllMeals() {
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += ` <div class="col-md-3">
          <div onclick="getMealsDetails('${result[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2">
            <img src="${result[i].strMealThumb}" class="w-100" alt="">
            <div class="layer text-dark p-2 d-flex align-items-center">
              <h3>${result[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    meals.innerHTML = cartona;
  }
}
getAllMeals();

function displayMealsBy(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += ` <div class="col-md-3">
          <div onclick="getMealsDetails('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2">
            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
            <div class="layer text-dark p-2 d-flex align-items-center">
              <h3>${arr[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    meals.innerHTML = cartona;
  }
}

//! search inputs
$("#search").on("click", function () {
  meals.innerHTML = ``;
  $(".search-section").removeClass("d-none");
  closeSidebar();
});

//! search by name
searchByName.addEventListener("input", function () {
  var term = $(this).val();
  getMealByName(term);
});
async function getMealByName(term) {
  $(".inner-loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let data = await response.json();
  data = data.meals;
  displayMealsBy(data.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

//! search by letter
searchByLetter.addEventListener("input", function () {
  let term = $(this).val();
  getMealByName(term);
});
async function getMealByLetter(term) {
  $(".inner-loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let data = await response.json();
  data = data.meals;
  displayMealsBy(data.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

//! categories
$("#categories").on("click", function () {
  meals.innerHTML = ``;
  $(".search-section").addClass("d-none");
  closeSidebar();
  getCategories();
});

// //! get categories
async function getCategories() {
  $(".inner-loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  result = data.categories;
  displayCategories();
  $(".inner-loading").fadeOut(300);
}

function displayCategories() {
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += ` <div class="col-md-3">
          <div onclick="getMealsByCategory('${
            result[i].strCategory
          }')" class="inner position-relative overflow-hidden rounded-2">
            <img src="${result[i].strCategoryThumb}" class="w-100" alt="">
            <div class="layer text-dark p-2 text-center overflow-hidden">
              <h3>${result[i].strCategory}</h3>
              <p>${result[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>
        </div>`;
    meals.innerHTML = cartona;
  }
}

//! get meals by category
async function getMealsByCategory(ctg) {
  $(".inner-loading").fadeIn(300);
  let category = ctg;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  data = data.meals;
  displayMealsBy(data.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

//! area
$("#areas").on("click", function () {
  meals.innerHTML = ``;
  $(".search-section").addClass("d-none");
  closeSidebar();
  getArea();
});

// //! get area
async function getArea() {
  $(".inner-loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  result = data.meals;
  displayArea();
  $(".inner-loading").fadeOut(300);
}

function displayArea() {
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += ` <div class="col-md-3 text-center">
          <div onclick="getMealsByArea('${result[i].strArea}')" class="inner position-relative overflow-hidden rounded-2 text-white">
        <img class="w-100 mb-2" src="assets/images/area.jpg" alt="Map image">
            <h3>${result[i].strArea}</h3>
          </div>
        </div>`;
    meals.innerHTML = cartona;
  }
}

//! get meals by area
async function getMealsByArea(areaname) {
  $(".inner-loading").fadeIn(300);
  let area = areaname;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  data = data.meals;
  displayMealsBy(data.slice(0, 20));
  $(".inner-loading").fadeOut(300);
}

//! ingredients
$("#ingredients").on("click", function () {
  meals.innerHTML = ``;
  $(".search-section").addClass("d-none");
  closeSidebar();
  getIngredients();
});

// //! get ingredients
async function getIngredients() {
  $(".inner-loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  result = data.meals;
  displayIngredients();
  $(".inner-loading").fadeOut(300);
}

function displayIngredients() {
  let cartona = ``;
  for (let i = 0; i < 20; i++) {
    cartona += ` <div class="col-md-3">
          <div onclick="getMealsByIngredients('${
            result[i].strIngredient
          }')" class="inner position-relative overflow-hidden rounded-2 text-white text-center">
  <img class="w-100 mb-2" src="assets/images/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__12__20201203-indonesian-pantry-vicky-wasik-1-b827da1c26134cf18153da281f8efb19.jpg" alt="ingredient logo">
            <h3>${result[i].strIngredient}</h3>
<p>${result[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>

          </div>
        </div>`;
    meals.innerHTML = cartona;
  }
}

//! get meals by ingredients
async function getMealsByIngredients(ingredientname) {
  $(".inner-loading").fadeIn(300);
  let ingredient = ingredientname;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  data = data.meals;
  displayMealsBy(data.slice(0, 20));

  $(".inner-loading").fadeOut(300);
}

//! get details
async function getMealsDetails(id) {
  $(".inner-loading").fadeIn(300);
  closeSidebar();
  let mealId = id;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await response.json();
  result = data.meals[0];
  displayMealsDetails();
  $(".inner-loading").fadeOut(300);
}

// ! display meals details
function displayMealsDetails() {
  $(".search-section").addClass("d-none");

  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (result[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info">${
        result[`strMeasure${i}`]
      } ${result[`strIngredient${i}`]}</li>`;
    }
  }
  tags = ``;
  if (result.strTags) {
    let splitTags = result.strTags.split(",");
    for (let i = 0; i < splitTags.length; i++) {
      tags += `<li class="alert alert-danger">${splitTags[i]}</li>`;
    }
  } else {
    tags = [];
  }

  let cartona = ``;
  cartona += `<div class="col-md-4">
          <div class="inner">
            <img src="${result.strMealThumb}" class="w-100 rounded-3" alt="">
            <h2>${result.strMeal}</h2>
          </div>
         
        </div>
        <div class="col-md-8">
          <div class="inner">
            <h2>Instructions</h2>
          <p>${result.strInstructions}</p>
            <h3>Area: <span>${result.strArea}</span></h3>
            <h3>Category: <span>${result.strCategory}</span></h3>
            <h3>Recipes:</h3>
            <ul class="list-unstyled d-flex flex-wrap gap-2">
            ${ingredients}
            </ul>
            <h3>Tags: </h3>
            <ul class="list-unstyled d-flex gap-3">
              ${tags}
            </ul>
            <a href="${result.strImageSource}" target="_blank" class="btn btn-success me-2">Source</a>
            <a href="${result.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
        
          </div>
        </div>
    `;
  meals.innerHTML = cartona;
}

// ! contact
$("#contact").on("click", function () {
  meals.innerHTML = ``;
  $(".search-section").addClass("d-none");
  closeSidebar();
  showContact();
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function showContact() {
  $(".inner-loading").fadeIn(300);
  let cartona = ``;
  cartona += ` <div class="container input-container min-vh-100 w-75 d-flex justify-content-center align-items-center">
          <div class="row g-4">
            <div class="col-md-6">
              <div><input oninput="validateInputs()" type="text" id="nameInput" placeholder="Enter Your Name" class="form-control"></div>
              <div id="nameAlert" class="alert alert-danger d-none mt-3 p-3 text-center w-100">
          Special characters and numbers not allowed
        </div>
              </div>
              <div class="col-md-6">
              <div><input oninput="validateInputs()" type="email" id="emailInput" placeholder="Enter Your Email" class="form-control"></div>
              <div id="emailAlert" class="alert alert-danger d-none mt-3 p-3 text-center w-100">
          Email not valid *exemple@yyy.zzz
        </div>
              </div>
              <div class="col-md-6">
              <div><input oninput="validateInputs()" type="text" id="phoneInput" placeholder="Enter Your Phone" class="form-control"></div>
              <div id="phoneAlert" class="alert alert-danger d-none mt-3 p-3 text-center w-100">
          Enter valid Phone Number
        </div>
              </div>
              <div class="col-md-6">
              <div><input oninput="validateInputs()" type="number" id="ageInput" placeholder="Enter Your Age" class="form-control"></div>
              <div id="ageAlert" class="alert alert-danger d-none mt-3 p-3 text-center w-100">
          Enter valid age
        </div>
              </div>
              <div class="col-md-6">
              <div><input oninput="validateInputs()" type="password" id="passwordInput" placeholder="Enter Your Password" class="form-control"></div>
              <div id="passAlert" class="alert alert-danger d-none mt-3 p-3 text-center w-100">
          Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
              </div>
              <div class="col-md-6">
              <div><input oninput="validateInputs()" type="password" id="repasswordInput" placeholder="Repassword" class="form-control"></div>
              <div id="repassAlert" class="alert alert-danger d-none mt-3 p-3 text-center w-100">
          Repassword must match password
        </div>
              </div>
              <button disabled  id="submitBtn" class="btn btn-outline-danger mx-auto">submit</button>
            </div>
           
          </div>`;
  meals.innerHTML = cartona;
  $(".inner-loading").fadeOut(300);
  document.getElementById("nameInput").addEventListener("focus", function () {
    nameInputTouched = true;
  });
  document.getElementById("emailInput").addEventListener("focus", function () {
    emailInputTouched = true;
  });
  document.getElementById("phoneInput").addEventListener("focus", function () {
    phoneInputTouched = true;
  });
  document.getElementById("ageInput").addEventListener("focus", function () {
    ageInputTouched = true;
  });
  document
    .getElementById("passwordInput")
    .addEventListener("focus", function () {
      passwordInputTouched = true;
    });
  document
    .getElementById("repasswordInput")
    .addEventListener("focus", function () {
      rePasswordInputTouched = true;
    });
}

function validateName() {
  let nameRegex = /^[a-zA-Z ]+$/;
  let userName = nameInput.value;
  if (nameInputTouched) {
    if (nameRegex.test(userName) === true) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}
function validateEmail() {
  let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  let userEmail = document.getElementById("emailInput").value;
  if (emailInputTouched) {
    if (emailRegex.test(userEmail) === true) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}
function validatePhone() {
  let PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let userPhone = document.getElementById("phoneInput").value;
  if (phoneInputTouched) {
    if (PhoneRegex.test(userPhone) === true) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}
function validateAge() {
  let AgeRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  let userAge = document.getElementById("ageInput").value;
  if (ageInputTouched) {
    if (AgeRegex.test(userAge) === true) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}
function validatePassword() {
  let PasswordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  let userPassword = document.getElementById("passwordInput").value;
  if (passwordInputTouched) {
    if (PasswordRegex.test(userPassword) === true) {
      document
        .getElementById("passAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("passAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}
function validateRepassword() {
  if (rePasswordInputTouched) {
    if (
      document.getElementById("repasswordInput").value ===
      document.getElementById("passwordInput").value
    ) {
      document
        .getElementById("repassAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("repassAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}

function validateInputs() {
  validateName();
  validateEmail();
  validatePhone();
  validateAge();
  validatePassword();
  validateRepassword();
  if (
    validateName &&
    validateEmail() &&
    validatePhone() &&
    validateAge() &&
    validatePassword() &&
    validateRepassword()
  ) {
    let submitBtn = document.getElementById("submitBtn");
    $("#submitBtn").removeAttr("disabled");
  }
}
